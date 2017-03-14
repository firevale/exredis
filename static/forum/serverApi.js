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
      getPagedPost(page, records_per_page, order, section_id, forum_id) {
        return post(Vue, '/forum_actions/get_paged_post', {
          page,
          records_per_page,
          order,
          section_id,
          forum_id,
        })
      },

      getForumInfo(forum_id) {
        return post(Vue, '/forum_actions/get_forum_info', {forum_id})
      },

      addPost(forum_id, section_id, title, content) {
        return post(Vue, '/forum_actions/add_post', {forum_id, section_id, title, content,})
      },

      addComment(post_id, content) {
        return post(Vue, '/forum_actions/add_comment', {post_id, content,})
      },

      getPostDetail(post_id) {
        return post(Vue, '/forum_actions/get_post_detail', {post_id})
      },

      deleteComment(comment_id) {
        return post(Vue, '/forum_actions/delete_comment', {comment_id})
      },

      togglePostFavorite(post_id) {
        return post(Vue, '/forum_actions/toggle_post_favorite', {post_id})
      },

      togglePostStatus(params) {
        return post(Vue, '/forum_actions/toggle_post_status', params)
      },

      getPostComments(post_id, page, records_per_page) {
        return post(Vue, '/forum_actions/get_post_comments', {post_id, page, records_per_page,})
      },
    }
  }
}
