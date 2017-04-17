import Toast from 'common/components/toast'

const processResponse = async(Vue, response) => {
  let result = await response.json()

  if (result.success) {
    return result
  } else {
    if (result.i18n_message) {
      Toast.show(Vue.t(result.i18n_message, result.i18n_message_object))
    } else if (result.message) {
      Toast.show(result.message)
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

    return {
      success: false
    }
  }
}

const post = async(Vue, uri, params) => {
  try {
    let response = await Vue.http.post(uri, params)
    return processResponse(Vue, response)
  } catch (_) {
    Toast.show(Vue.t('error.server.networkError'))
    return {
      success: false
    }
  }
}

export default {
  install: function(Vue, options) {
    Vue.prototype.$acs = {
      getPagedForums() {
        return post(Vue, '/forum_actions/get_paged_forums', {})
      },

      getPagedPost(page, records_per_page, order, section_id, forum_id) {
        return post(Vue, '/forum_actions/get_paged_post', {
          page,
          records_per_page,
          order,
          section_id,
          forum_id
        })
      },

      getForumInfo(forum_id) {
        return post(Vue, '/forum_actions/get_forum_info', {
          forum_id
        })
      },

      addPost(forum_id, section_id, title, content) {
        return post(Vue, '/forum_actions/add_post', {
          forum_id,
          section_id,
          title,
          content
        })
      },

      addComment(post_id, content) {
        return post(Vue, '/forum_actions/add_comment', {
          post_id,
          content
        })
      },

      getPostDetail(post_id) {
        return post(Vue, '/forum_actions/get_post_detail', {
          post_id
        })
      },

      deleteComment(comment_id, forum_id) {
        return post(Vue, '/forum_actions/delete_comment', {
          comment_id,
          forum_id
        })
      },

      togglePostFavorite(post_id) {
        return post(Vue, '/forum_actions/toggle_post_favorite', {
          post_id
        })
      },

      togglePostStatus(params) {
        return post(Vue, '/forum_actions/toggle_post_status', params)
      },

      getPostComments(post_id, page, records_per_page) {
        return post(Vue, '/forum_actions/get_post_comments', {
          post_id,
          page,
          records_per_page
        })
      },

      getUserPostCount(forum_id) {
        return post(Vue, '/forum_actions/get_user_post_count', {
          forum_id
        })
      },

      getUserPagedPost(forum_id, page, records_per_page) {
        return post(Vue, '/forum_actions/get_user_paged_post', {
          forum_id,
          page,
          records_per_page
        })
      },

      getUserPostComments(forum_id, page, records_per_page) {
        return post(Vue, '/forum_actions/get_user_post_comments', {
          forum_id,
          page,
          records_per_page
        })
      },

      getUserPostFavorites(forum_id, page, records_per_page) {
        return post(Vue, '/forum_actions/get_user_favorites', {
          forum_id,
          page,
          records_per_page
        })
      },

      search(forum_id, keyword, page, records_per_page) {
        return post(Vue, '/forum_actions/search', {
          forum_id,
          keyword,
          page,
          records_per_page
        })
      },

      addContact(app_id, title) {
        return post(Vue, '/customer_service_actions/add_contact', {
          app_id,
          title
        })
      },

      alipayRedirect(payment_order_id, merchant_url, callback_url) {
        return post(Vue, '/api/pay/alipay/redirect', {
          payment_order_id,
          merchant_url,
          callback_url
        })
      },

      wechatPrepay(payment_order_id) {
        return post(Vue, '/api/pay/wechat/prepay', {
          payment_order_id
        })
      },

      getPagedNews(app_id, group, page, records_per_page) {
        return post(Vue, '/games_actions/get_paged_news', {
          app_id,
          group,
          page,
          records_per_page
        })
      },

      getNewsDetail(news_id) {
        return post(Vue, '/games_actions/get_news_detail', {
          news_id
        })
      },

      getTopNews(app_id, limit) {
        return post(Vue, '/games_actions/get_top_news', {
          app_id,
          limit
        })
      },

      getApps() {
        return post(Vue, '/games_actions/fetch_apps', {})
      },

      getServicePaged(app_id, page, records_per_page) {
        return post(Vue, '/customer_service_actions/get_paged_services', {
          app_id: app_id,
          page,
          records_per_page
        })
      },

      getCommonIssues(app_id) {
        return post(Vue, '/customer_service_actions/get_common_issues', {
          app_id: app_id
        })
      },

      searchQuestion(app_id, keyword, page, records_per_page) {
        return post(Vue, '/customer_service_actions/search', {
          app_id,
          keyword,
          page,
          records_per_page
        })
      },

      getAppDetail(app_id) {
        return post(Vue, '/customer_service_actions/get_app_detail', {
          app_id: app_id
        })
      },

      getActiveGoodsPaged(app_id, page, records_per_page) {
        return post(Vue, '/mall_actions/get_active_goods_paged', {
          app_id,
          page,
          records_per_page
        })
      },

      getMallDetail(app_id) {
        return post(Vue, '/mall_actions/get_mall_detail', {
          app_id
        })
      },

      getGoodsDetail(goods_id) {
        return post(Vue, '/mall_actions/get_goods_detail', {
          goods_id
        })
      },

      sendBindMobileVerifyCode(mobile) {
        return post(Vue, "/send_mobile_bind_verify_code", { mobile })
      },

      updateUserMobileNumber(params) {
        return post(Vue, "/user/update_mobile", params)
      },

      sendBindEmailVerifyCode(email) {
        return post(Vue, "/send_email_bind_verify_code", { email })
      },

      updateUserEmail(params) {
        return post(Vue, "/user/update_email", params)
      },

    }
  }
}