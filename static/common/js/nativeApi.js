export default {
  closeWebviewWithResult: function(result) {
    if (typeof AndroidNativeAPI === 'object' &&
      typeof AndroidNativeAPI.closeWebviewWithResult === 'function') {
      let jsonStr = JSON.stringify(result)
      AndroidNativeAPI.closeWebviewWithResult(jsonStr)
    } else if (typeof IOSNativeAPI === 'object' &&
      typeof IOSNativeAPI.closeWebviewWithResult === 'function') {
      IOSNativeAPI.closeWebviewWithResult(result)
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
      return false
    } else if (typeof IOSNativeAPI === 'object' &&
      typeof IOSNativeAPI.isMediaSourceTypeAvailable === 'function') {
      return IOSNativeAPI.isMediaSourceTypeAvailable(type) == 1
    } else {
      console.error('native function isMediaSourceTypeAvailable is not available')
    }
    return false
  },

  pickAvatarFrom: function(type, callback) {
    if (typeof AndroidNativeAPI === 'object' &&
      typeof AndroidNativeAPI.pickAvatarFrom === 'function') {
    } else if (typeof IOSNativeAPI === 'object' &&
      typeof IOSNativeAPI.pickAvatarFromCallback === 'function') {
      IOSNativeAPI.pickAvatarFromCallback(type, callback) 
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
}