import Toast from 'common/components/toast'
import { i18n } from './vue-i18n'

import axios from 'axios'

const processResponse = (result) => {
  if (result.success) {
    return result
  } else {
    if (result.i18n_message) {
      Toast.show(i18n.t(result.i18n_message, result.i18n_message_object))
    } else if (result.message) {
      Toast.show(result.message)
    }

    switch (result.action) {
      case 'login':
        window.location = `/login?redirect_uri=${btoa(window.location.href)}`
        break;

      default:
        break;
    }

    return Promise.resolve({
      success: false,
      i18n_message: result.i18n_message,
      i18n_message_object: result.i18n_message_object,
      message: result.message
    })
  }
}

const post = (uri, params, onProgress, cancelToken) => {
  return axios.post(uri, params, {
    onUploadProgress(e) {
      if (e.lengthComputable) {
        if (typeof onProgress === 'function') {
          onProgress(Math.abs(e.loaded / e.total))
        }
      }
    },
    cancelToken,
  }).then(response => processResponse(response.data)).catch(e => {
    if (axios.isCancel(e)) {
      console.log(`Request canceled, uri: ${uri}`)
    } else {
      Toast.show(i18n.t('error.server.networkError'))
    }
    return Promise.resolve({
      success: false
    })
  })
}

export default {
  install: function(Vue, options) {
    Vue.prototype.$acs = {
      tokens: {},

      getPagedForums() {
        return post('/forum_actions/get_paged_forums', {})
      },

      cancelGetPagedPost: function() {
        if (typeof this.tokens.getPagedPost === 'function') {
          this.tokens.getPagedPost()
        }
      },

      getPagedPost: function(params) {
        let cancelToken = new axios.CancelToken(c => this.tokens.getPagedPost = c)
        return post('/forum_actions/get_paged_post', params, undefined, cancelToken)
      },

      getForumInfo(forum_id) {
        return post('/forum_actions/get_forum_info', {
          forum_id
        })
      },

      addPost(params) {
        return post('/forum_actions/add_post', params)
      },

      addComment(params) {
        return post('/forum_actions/add_comment', params)
      },

      getPostDetail(post_id) {
        return post('/forum_actions/get_post_detail', {
          post_id
        })
      },

      deleteComment(comment_id, forum_id) {
        return post('/forum_actions/delete_comment', {
          comment_id,
          forum_id
        })
      },

      togglePostFavorite(post_id) {
        return post('/forum_actions/toggle_post_favorite', {
          post_id
        })
      },

      togglePostStatus(params) {
        return post('/forum_actions/toggle_post_status', params)
      },

      getPostComments(post_id, page, author_id, records_per_page) {
        return post('/forum_actions/get_post_comments', {
          post_id,
          page,
          author_id,
          records_per_page
        })
      },

      getUserPostCount(forum_id) {
        return post('/forum_actions/get_user_post_count', {
          forum_id
        })
      },

      cancelGetUserPagedPost: function() {
        if (typeof this.tokens.getUserPagedPost === 'function') {
          this.tokens.getUserPagedPost()
        }
      },

      getUserPagedPost: function(forum_id, page, records_per_page) {
        let cancelToken = new axios.CancelToken(c => this.tokens.getUserPagedPost = c)
        return post('/forum_actions/get_user_paged_post', {
          forum_id,
          page,
          records_per_page
        }, undefined, cancelToken)
      },

      cancelGetUserPostComments: function() {
        if (typeof this.tokens.getUserPostComments === 'function') {
          this.tokens.getUserPostComments()
        }
      },

      getUserPostComments: function(forum_id, page, records_per_page) {
        let cancelToken = new axios.CancelToken(c => this.tokens.getUserPostComments = c)
        return post('/forum_actions/get_user_post_comments', {
          forum_id,
          page,
          records_per_page
        }, undefined, cancelToken)
      },

      cancelGetUserPostFavorites: function() {
        if (typeof this.tokens.getUserPostFavorites === 'function') {
          this.tokens.getUserPostFavorites()
        }
      },

      getUserPostFavorites: function(forum_id, page, records_per_page) {
        let cancelToken = new axios.CancelToken(c => this.tokens.getUserPostFavorites = c)
        return post('/forum_actions/get_user_favorites', {
          forum_id,
          page,
          records_per_page
        }, undefined, cancelToken)
      },

      cancelGetPagedBanPost: function() {
        if (typeof this.tokens.getPagedBanPost === 'function') {
          this.tokens.getPagedBanPost()
        }
      },

      getPagedBanPost: function(forum_id, page, records_per_page) {
        let cancelToken = new axios.CancelToken(c => this.tokens.getPagedBanPost = c)
        return post('/forum_actions/get_paged_ban_post', {
          forum_id,
          page,
          records_per_page
        }, undefined, cancelToken)
      },

      search(forum_id, keyword, page, records_per_page) {
        return post('/forum_actions/search', {
          forum_id,
          keyword,
          page,
          records_per_page
        })
      },

      addContact(app_id, title) {
        return post('/customer_service_actions/add_contact', {
          app_id,
          title
        })
      },

      alipayRedirect(payment_order_id, merchant_url, callback_url) {
        return post('/api/pay/alipay/redirect', {
          payment_order_id,
          merchant_url,
          callback_url
        })
      },

      alipayMallRedirect(payment_order_id, merchant_url, callback_url, notify_url) {
        return post('/api/pay/alipay/mall_redirect', {
          payment_order_id,
          merchant_url,
          callback_url,
          notify_url
        })
      },

      wechatPrepay(payment_order_id) {
        return post('/api/pay/wechat/prepay', {
          payment_order_id
        })
      },

      wechatMallPrepay(payment_order_id) {
        return post('/api/pay/wechat/mallprepay', {
          payment_order_id
        })
      },

      getPagedNews(app_id, group, page, records_per_page) {
        return post('/games_actions/get_paged_news', {
          app_id,
          group,
          page,
          records_per_page
        })
      },

      getNewsDetail(news_id) {
        return post('/games_actions/get_news_detail', {
          news_id
        })
      },

      getTopNews(app_id, limit) {
        return post('/games_actions/get_top_news', {
          app_id,
          limit
        })
      },

      getApps() {
        return post('/games_actions/list_thin_apps', {})
      },

      cancelGetServicePaged: function() {
        if (typeof this.tokens.getServicePaged === 'function') {
          this.tokens.getServicePaged()
        }
      },

      getServicePaged: function(app_id, page, records_per_page) {
        let cancelToken = new axios.CancelToken(c => this.tokens.getServicePaged = c)
        return post('/customer_service_actions/get_paged_services', {
          app_id: app_id,
          page,
          records_per_page
        }, undefined, cancelToken)
      },

      getCommonIssues(app_id) {
        return post('/customer_service_actions/get_common_issues', {
          app_id: app_id
        })
      },

      cancelSearchQuestion: function() {
        if (typeof this.tokens.searchQuestion === 'function') {
          this.tokens.searchQuestion()
        }
      },

      searchQuestion: function(app_id, keyword, page, records_per_page) {
        let cancelToken = new axios.CancelToken(c => this.tokens.searchQuestion = c)
        return post('/customer_service_actions/search', {
          app_id,
          keyword,
          page,
          records_per_page
        }, undefined, cancelToken)
      },

      getAppDetail(app_id) {
        return post('/customer_service_actions/get_app_detail', {
          app_id: app_id
        })
      },

      cancelGetActiveGoodsPaged: function() {
        if (typeof this.tokens.getActiveGoodsPaged === 'function') {
          this.tokens.getActiveGoodsPaged()
        }
      },

      getActiveGoodsPaged: function(app_id, page, records_per_page) {
        let cancelToken = new axios.CancelToken(c => this.tokens.getActiveGoodsPaged = c)
        return post('/mall_actions/get_active_goods_paged', {
          app_id,
          page,
          records_per_page
        }, undefined, cancelToken)
      },


      getMallDetail(app_id) {
        return post('/mall_actions/get_mall_detail', {
          app_id
        })
      },

      getGoodsDetail(goods_id) {
        return post('/mall_actions/get_mall_goods_detail', {
          goods_id
        })
      },

      sendBindMobileVerifyCode(mobile) {
        return post("/send_mobile_bind_verify_code", { mobile })
      },

      createMallOrder(goods_id, quantity, pay_type, address) {
        return post('/mall_actions/create_mall_order', {
          goods_id,
          quantity,
          pay_type,
          address
        })
      },

      updateUserMobileNumber(params) {
        return post("/user/update_mobile", params)
      },

      sendBindEmailVerifyCode(email) {
        return post("/send_email_bind_verify_code", { email })
      },

      updateUserEmail(params) {
        return post("/user/update_email", params)
      },

      updateUserNickname(params) {
        return post("/user/update_nickname", params)
      },

      updateUserResidentInfo(params) {
        return post("/user/update_resident_info", params)
      },

      updateUserAvatar(params, onProgress) {
        return post("/user/update_avatar", params, onProgress)
      },

      uploadPostImage(params, onProgress) {
        return post("/forum_actions/upload_post_image", params, onProgress)
      },

      uploadCommentImage(params, onProgress) {
        return post("/forum_actions/upload_comment_image", params, onProgress)
      },

      cancelfetchMyOrders: function() {
        if (typeof this.tokens.fetchMyOrders === 'function') {
          this.tokens.fetchMyOrders()
        }
      },

      fetchMyOrders: function(type, page, records_per_page) {
        let cancelToken = new axios.CancelToken(c => this.tokens.fetchMyOrders = c)
        return post('/mall_actions/fetch_my_orders', {
          type,
          page,
          records_per_page
        }, undefined, cancelToken)
      },

      confirmRecieved(params) {
        return post('/mall_actions/confirm_recieved', params)
      },

      getMallOrder(params) {
        return post('/mall_actions/get_fat_mall_order', params)
      },

      getGoodsStock(goods_id) {
        return post('/mall_actions/get_goods_stock', { goods_id })
      },

      getUserAddresses() {
        return post('/mall_actions/get_user_addresses', {})
      },

      deleteAddress(address_id) {
        return post('/mall_actions/delete_address', {
          address_id
        })
      },

      setDefaultAddress(address_id) {
        return post('/mall_actions/set_default_address', {
          address_id
        })
      },

      getAddressDetail(address_id) {
        return post('/mall_actions/get_address_detail', {
          address_id
        })
      },

      getDefaultAddress() {
        return post('/mall_actions/get_default_address', {})
      },

      insertAddress(params) {
        return post('/mall_actions/insert_address', params)
      },

      updateAddress(params) {
        return post('/mall_actions/update_address', params)
      },
    }
  }
}