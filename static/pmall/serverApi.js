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
      getGoods(params) {
        return post('/pmall_actions/get_goods_detail', params)
      },
      listMyPointLogs(params) {
        let cancelToken = new axios.CancelToken(c => this.tokens.listMyPointLogs = c)
        return post('/pmall_actions/list_my_point_logs', params, undefined, cancelToken)
      },
      listMyExchangePointLogs(params) {
        let cancelToken = new axios.CancelToken(c => this.tokens.listMyExchangePointLogs = c)
        return post('/pmall_actions/list_my_point_exchange_logs', params, undefined, cancelToken)
      },
      takeAward(params){
        return post("/pmall_actions/take_award", params)
      },
      exchange(params) {
        return post("/pmall_actions/exchange", params)
      },
      updateAddress(params) {
        return post("/pmall_actions/update_address", params)
      },
      sendBindMobileVerifyCode(mobile) {
        return post("/send_mobile_bind_verify_code", { mobile })
      },
      bindMobile(mobile, verify_code) {
        return post("/pmall_actions/bind_mobile", { mobile, verify_code })
      },
      sign() {
        return post("/pmall_actions/sign")
      },
      getSignInfo() {
        return post("/pmall_actions/get_sign_info")
      },
      getSignUsers(params) {
        return post("/pmall_actions/get_sign_users",params)
      },
      getDefaultAddress(params) {
        return post('/pmall_actions/get_default_address', params)
      },
      insertAddress(params) {
        return post('/pmall_actions/insert_address', params)
      },
      getDailyQuestion() {
        return post("/pmall_actions/get_daily_question")
      },
      answerQuestion(id, correct) {
        return post("/pmall_actions/answer_question", { id, correct })
      },
      luckDraw() {
        return post("/pmall_actions/luck_draw")
      },
      updateDrawAddress(params) {
        return post("/pmall_actions/update_draw_address", params)
      },
      getDrawInfo() {
        return post("/pmall_actions/get_draw_info")
      },
    }
  }
}