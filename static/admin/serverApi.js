import {
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

const processResponse = async(Vue, response, successMessage) => {
  let result = await response.json()

  if (!result.success) {
    processAjaxError(result)
  } else if (successMessage) {
    openNotification({
      title: Vue.t('admin.notification.title.success'),
      message: successMessage,
      type: 'success',
      duration: 4500,
    })
  }
  else if (result.i18n_message) {
    openNotification({
      title: Vue.t('admin.notification.title.success'),
      message: Vue.t(result.i18n_message, result.i18n_message_object),
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

      fetchOrders(params) {
        return post(Vue, '/admin_actions/fetch_orders', params)
      },

      searchOrders(params) {
        return post(Vue, '/admin_actions/search_orders', params)
      },

      updateForumInfo(params, successMessage) {
        return post(Vue, '/admin_actions/update_forum_info', params, successMessage)
      },

      updateForumSectionInfo(params, successMessage) {
        return post(Vue, '/admin_actions/update_section_info', params, successMessage)
      },

      getSetting(params) {
        return post(Vue, '/admin_actions/get_setting', params)
      },

      getSettingsByGroup(params) {
        return post(Vue, '/admin_actions/get_settings_by_group', params)
      },

      updateSettingByName(params, successMessage) {
        return post(Vue, '/admin_actions/update_setting_by_name', params, successMessage)
      },

      deleteSettingByName(params, successMessage) {
        return post(Vue, '/admin_actions/delete_setting', params, successMessage)
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

      updateQuestion(params, successMessage) {
        return post(Vue, '/customer_service_actions/update_question', params, successMessage)
      },

      deleteQuestion(params, successMessage) {
        return post(Vue, '/customer_service_actions/delete_question', params, successMessage)
      },

      getNewsDetail(news_id) {
        return post(Vue, '/admin_actions/get_news_detail', { news_id })
      },

      updateNews(params) {
        return post(Vue, '/admin_actions/update_news', params)
      },

      toggleStatus(params, successMessage) {
        return post(Vue, '/admin_actions/toggle_news_status', params, successMessage)
      },

      updateMallInfo(params, successMessage) {
        return post(Vue, '/admin_actions/update_mall_info', params, successMessage)
      },

      fetchGoods(params) {
        return post(Vue, '/admin_actions/fetch_goods', params)
      },

      updateGoods(params) {
        return post(Vue, '/admin_actions/update_goods', params)
      },

      toggleGoodsStatus(params) {
        return post(Vue, '/admin_actions/toggle_goods_status', params)
      },

      deleteGoods(params) {
        return post(Vue, '/admin_actions/delete_goods', params)
      },

    }
  }
}