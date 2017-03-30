
const processResponse = async(Vue, response) => {
  let result = await response.json()

  if (result.success) {
    return result
  } else {
    if (result.i18n_message) {
      message.showMsg(Vue.t(result.i18n_message, result.i18n_message_object))
    } else if (result.message) {
      message.showMsg(result.message)
    }
    return {success: false}
  }
}

const post = async(Vue, uri, params) => {
  try {
    let response = await Vue.http.post(uri, params)
    return processResponse(Vue, response)
  } catch (_) {
    message.showMsg(Vue.t('admin.error.networkError'))
    return {success: false}
  }
}

export default {
  install : function(Vue, options) {
    Vue.prototype.$acs = {
      getPagedNews(forum_id, group, page, records_per_page) {
        return post(Vue, '/admin_actions/get_paged_news', {forum_id, group, page, records_per_page})
      },

    }
  }
}
