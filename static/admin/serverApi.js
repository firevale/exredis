import {
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

const processResponse = async(Vue, response, successMessage) => {
  let result = await response.json()

  if (!result.success) {
    processAjaxError(result)
  }
  else if (result.success && successMessage) {
    openNotification({
      title: Vue.t('admin.notification.title.success'),
      message: successMessage,
      type: 'success',
      duration: 4500,
    })
  }

  return result
}

const post = async(Vue, uri, params, successMessage) => {
  try {
    let response = await Vue.http.post(uri, params)
    return processResponse(Vue, response, successMessage)
  } catch (_) {
    openNotification({
      title: Vue.t('admin.notification.title.failed'),
      message: Vue.t('admin.notification.message.unknownError'),
      type: 'danger',
      duration: 4500,
    })
    return { success: false }
  }
}

export default {
  install: function(Vue, options) {
    Vue.prototype.$acs = {
      updateAppInfo(params, successMessage) {
        return post(Vue, '/admin_actions/update_app_info', params, successMessage)
      },

      updateAppSdkInfo(params, successMessage) {
        return post(Vue, '/admin_actions/update_app_sdk_info', params, successMessage)
      },

      updateAppGoodsInfo(params, successMessage) {
        return post(Vue, '/admin_actions/update_app_goods_info', params, successMessage)
      },

      updateAppGoodsProductId(params, successMessage) {
        return post(Vue, '/admin_actions/update_app_goods_product_id', params, successMessage)
      },

      deleteAppGoods(params, successMessage) {
        return post(Vue, '/admin_actions/delete_app_goods', params, successMessage)
      },

      generateDummySdkInfo(params) {
        return post(Vue, '/admin_actions/generate_dummy_sdk_info', params)
      },

      getPagedNews(app_id, group, page, records_per_page) {
        return post(Vue, '/admin_actions/get_paged_news_admin', {
          app_id,
          group,
          page,
          records_per_page
        })
      },

      getPagedQuestions(app_id, page, records_per_page) {
        return post(Vue, '/customer_service_actions/get_paged_questions', {
          app_id,
          page,
          records_per_page
        })
      },

      updateQuestion(id, answer, active, is_hot) {
        return post(Vue, '/customer_service_actions/update_question', {
          id,
          answer,
          active,
          is_hot
        })
      },

      getNewsDetail(news_id) {
        return post(Vue, '/admin_actions/get_news_detail', { news_id })
      },

      updateNews(news_id, app_id, title, content, group, is_top) {
        return post(Vue, '/admin_actions/update_news', {
          news_id,
          app_id,
          title,
          content,
          group,
          is_top
        })
      },

      toggleStatus(news_id) {
        return post(Vue, '/admin_actions/toggle_news_status', { news_id })
      },

    }
  }
}