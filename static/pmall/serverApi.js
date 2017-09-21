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
      cancel(tokenName) {
        if (this.tokens[tokenName] && typeof this.tokens[tokenName] === 'function') {
          this.tokens[tokenName]()
        }
      },

      getUserInfo() {
        return post('/pmall_actions/get_user_info')
      },
      list_index() {
        return post("/pmall_actions/list_index")
      },
      listMyPoints(params) {
        let cancelToken = new axios.CancelToken(c => this.tokens.listMyPoints = c)
        return post('/pmall_actions/list_my_points', params, undefined, cancelToken)
      },
      listMyExchanges(params) {
        let cancelToken = new axios.CancelToken(c => this.tokens.listMyExchanges = c)
        return post('/pmall_actions/list_my_exchanges', params, undefined, cancelToken)
      },
      sendBindMobileVerifyCode(mobile) {
        return post("/send_mobile_bind_verify_code", { mobile })
      },
      bindMobile(mobile, verify_code) {
        return post("/pmall_actions/bind_mobile", { mobile, verify_code })
      },
    }
  }
}