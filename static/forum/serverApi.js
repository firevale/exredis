import message from './components/message'

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

    switch (result.action) {
      case 'login':
        Vue.nextTick(_ => {
          window.location = `/login?redirect_uri=${btoa(window.location.href)}`
        });
        break;
      default:
        break;
    }

    return {success: false}
  }
}

const post = async(Vue, uri, params) => {
  try {
    let response = await Vue.http.post(uri, params)
    return processResponse(Vue, response)
  } catch (_) {
    message.showMsg(Vue.t('forum.error.networkError'))
    return {success: false}
  }
}

export default {
  install : function(Vue, options) {
    Vue.prototype.$acs = {
      async getPagedPost(page, records_per_page, order, section_id, forum_id) {
        return await post(Vue, '/forum_actions/get_paged_post', {
          page,
          records_per_page,
          order,
          section_id,
          forum_id,
        })
      },

      async getForumInfo(forum_id) {
        return await post(Vue, '/forum_actions/get_forum_info', {forum_id})
      },

      async addPost(forum_id, section_id, title, content) {
        return await post(Vue, '/forum_actions/add_post', {forum_id, section_id, title, content,})
      },

      async getPostDetail(post_id) {
        return await post(Vue, '/forum_actions/get_post_detail', {post_id})
      },

      async deleteCommon(common_id) {
        return await post(Vue, '/forum_actions/delete_comment', {common_id})
      },

      async togglePostFavorite(post_id) {
        return await post(Vue, '/forum_actions/toggle_post_favorite', {post_id})
      },

      async setPostStatus(post_id, status) {
        return await post(Vue, '/forum_actions/set_post_status', {post_id, status,})
      },

      async getPostCommons(post_id, page, records_per_page) {
        return await post(Vue, '/forum_actions/get_post_comments', {post_id, page, records_per_page,})
      },
    }
  }
}
