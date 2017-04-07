import {
  processAjaxError
} from 'admin/miscellaneous'

const processResponse = async(Vue, response) => {
  let result = await response.json()

  if (!result.success) {
    processAjaxError(result)
  }

  return result
}

const post = async(Vue, uri, params) => {
  try {
    let response = await Vue.http.post(uri, params)
    return processResponse(Vue, response)
  } catch (_) {
    message.showMsg(Vue.t('admin.error.networkError'))
    return { success: false }
  }
}

export default {
  install: function(Vue, options) {
    Vue.prototype.$acs = {
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