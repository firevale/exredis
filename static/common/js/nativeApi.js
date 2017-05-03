export default {
  closeWebviewWithResult: function(result) {
    if (typeof AndroidNativeAPI === 'object' &&
      typeof AndroidNativeAPI.closeWebviewWithResult === 'function') {
      let jsonStr = JSON.stringify(result)
      AndroidNativeAPI.closeWebviewWithResult(jsonStr)
    } else if (typeof IOSNativeAPI === 'object' &&
      typeof IOSNativeAPI.closeWebviewWithResult === 'function') {
      IOSNativeAPI.closeWebviewWithResult(result)
    } else if (typeof window.webkit.messageHandlers.IOSNativeAPI === 'object') {
      window.webkit.messageHandlers.IOSNativeAPI.postMessage({ method: 'closeWebviewWithResult', params: result })
    } else if (window.acsConfig.platform == 'wp8') {
      let jsonStr = JSON.stringify(result)
      window.external.notify(jsonStr)
    } else {
      console.error('dont know how to close webview dialog')
    }
  },

  isMediaSourceTypeAvailable: function(type) {
    if (typeof AndroidNativeAPI === 'object' &&
      typeof AndroidNativeAPI.isMediaSourceTypeAvailable === 'function') {
      return Promise.resolve(false)
    } else if (typeof IOSNativeAPI === 'object' &&
      typeof IOSNativeAPI.isMediaSourceTypeAvailable === 'function') {
      return Promise.resolve(IOSNativeAPI.isMediaSourceTypeAvailable(type) == 1)
    } else if (typeof window.webkit.messageHandlers.IOSNativeAPI === 'object') {
      window.webkit.messageHandlers.IOSNativeAPI.postMessage({ method: 'isMediaSourceTypeAvailable', params: type })
      return new Promise(function(resolve, reject) {
        window.acsConfig.isMediaSourceTypeAvailableCallback = (result) => {
          window.acsConfig.isMediaSourceTypeAvailableCallback = null
          resolve(result)
        }
      })
    } else {
      console.error('native function isMediaSourceTypeAvailable is not available')
    }
    return Promise.resolve(false)
  },

  pickAvatarFrom: function(type, callback) {
    if (typeof AndroidNativeAPI === 'object' &&
      typeof AndroidNativeAPI.pickAvatarFrom === 'function') {} else if (typeof IOSNativeAPI === 'object' &&
      typeof IOSNativeAPI.pickAvatarFromCallback === 'function') {
      IOSNativeAPI.pickAvatarFromCallback(type, callback)
    } else {
      console.error('native function isMediaSourceTypeAvailable is not available')
    }
  },

  pickImageFrom: function(type, callback) {
    if (typeof AndroidNativeAPI === 'object' &&
      typeof AndroidNativeAPI.pickImageFrom === 'function') {} else if (typeof IOSNativeAPI === 'object' &&
      typeof IOSNativeAPI.pickImageFromCallback === 'function') {
      IOSNativeAPI.pickImageFromCallback(type, callback)
    } else {
      console.error('native function isMediaSourceTypeAvailable is not available')
    }
  },

  showAlertDialog: function(title, message, cancelBtnTitle, okBtnTitle, callback) {
    if (typeof AndroidNativeAPI === 'object' && typeof AndroidNativeAPI.showAlertDialog === 'function') {
      window.showAlertDialogCallback = callback
      AndroidNativeAPI.showAlertDialog(title, message, cancelBtnTitle, okBtnTitle)
    } else if (typeof IOSNativeAPI === 'object' &&
      typeof IOSNativeAPI.showAlertDialogMessageCancelTitleOkTitleCallback === 'function') {
      IOSNativeAPI.showAlertDialogMessageCancelTitleOkTitleCallback(title,
        message, cancelBtnTitle, okBtnTitle, callback)
    } else if (typeof window.webkit.messageHandlers.IOSNativeAPI === 'object') {
      window.acsConfig.showAlertDialogCallback = result => {
        window.acsConfig.showAlertDialogCallback = null
        callback(result)
      }
      window.webkit.messageHandlers.IOSNativeAPI.postMessage({
        method: 'showAlertDialog',
        params: {
          title,
          message,
          cancelBtnTitle,
          okBtnTitle
        }
      })
    } else {
      console.error('dont know how to show alert dialog')
    }
  },

  getActiveSession: function() {
    if (typeof AndroidNativeAPI === 'object' &&
      typeof AndroidNativeAPI.getActiveSession === 'function') {
      return JSON.parse(AndroidNativeAPI.getActiveSession())
    } else if (typeof IOSNativeAPI === 'object' &&
      typeof IOSNativeAPI.getActiveSession === 'function') {
      return IOSNativeAPI.getActiveSession()
    } else {
      return undefined
    }
  },

  isWechatPaySupport: function() {
    if (typeof AndroidNativeAPI === 'object' && typeof AndroidNativeAPI.isWechatPaySupport === 'function') {
      return AndroidNativeAPI.isWechatPaySupport()
    } else if (typeof IOSNativeAPI === 'object' && typeof IOSNativeAPI.getActiveSession === 'function') {
      return false
    } else {
      return false
    }
  },

  isGGPlayPaySupported: function() {
    if (typeof AndroidNativeAPI === 'object' && typeof AndroidNativeAPI.isGGPlayPaySupported === 'function') {
      return AndroidNativeAPI.isGGPlayPaySupported()
    } else if (typeof IOSNativeAPI === 'object' && typeof IOSNativeAPI.getActiveSession === 'function') {
      return false
    } else {
      return false
    }
  },

  openWechatPay: function(payinfo) {
    if (typeof AndroidNativeAPI === 'object' && typeof AndroidNativeAPI.isWechatPaySupport === 'function') {
      return AndroidNativeAPI.openWechatPay(payinfo)
    } else if (typeof IOSNativeAPI === 'object' && typeof IOSNativeAPI.getActiveSession === 'function') {
      return false
    } else {
      return false
    }
  },

  openWechatPayWithCallback: function(payinfo, callback) {
    if (typeof AndroidNativeAPI === 'object' && typeof AndroidNativeAPI.isWechatPaySupport === 'function') {
      window.acsConfig.showSuccessCallback = callback
      return AndroidNativeAPI.openWechatPay(payinfo)
    } else if (typeof IOSNativeAPI === 'object' && typeof IOSNativeAPI.getActiveSession === 'function') {
      return false
    } else {
      return false
    }
  },
}