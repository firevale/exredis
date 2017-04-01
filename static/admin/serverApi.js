import message from './components/message'

const processResponse = async(Vue, response) => {
  let result = await response.json()

  if (result.success) {
    return result
  } else {
    console.log("-------------------error")
    if (result.i18n_message) {
      message.showMsg(Vue.t(result.i18n_message, result.i18n_message_object))
    } else if (result.message) {
      message.showMsg(result.message)
    }
    return { success: false }
  }
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
        return post(Vue, '/admin_actions/get_paged_news_admin', { app_id, group, page,
          records_per_page })
      },
      getPagedQuestions(app_id, page, records_per_page) {
        return post(Vue, '/customer_service_actions/get_paged_questions', {
          app_id,
          page,
          records_per_page
        })
      },

      getNewsDetail(news_id) {
        return post(Vue, '/admin_actions/get_news_detail', { news_id })
      },

      updateNews(news_id, app_id, title, content, group, is_top) {
        return post(Vue, '/admin_actions/update_news', { news_id, app_id, title, content, group,
          is_top })
      },

      toggleStatus(news_id) {
        return post(Vue, '/admin_actions/toggle_news_status', { news_id })
      },

    }
  }
}