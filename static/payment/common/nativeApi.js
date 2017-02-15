import utils from './utils'

export default {
  closeWebviewWithResult: function(result) {
    if (typeof AndroidNativeAPI === 'object' && typeof AndroidNativeAPI.closeWebviewWithResult === 'function') {
      let jsonStr = JSON.stringify(result)
      AndroidNativeAPI.closeWebviewWithResult(jsonStr)
    } else if (typeof IOSNativeAPI === 'object' && typeof IOSNativeAPI.closeWebviewWithResult === 'function') {
      IOSNativeAPI.closeWebviewWithResult(result)
    } else if (window.acsConfig.platform == 'wp8') {
      let jsonStr = JSON.stringify(result)
      window.external.notify(jsonStr)
    } else {
      console.error('dont know how to close webview dialog')
    }
  },

  showAlertDialog: function(title, message, cancelBtnTitle, okBtnTitle, callback) {
    if (typeof AndroidNativeAPI === 'object' && typeof AndroidNativeAPI.showAlertDialog === 'function') {
      AndroidNativeAPI.showAlertDialog(title, message, cancelBtnTitle, okBtnTitle, callback)
    } else if (typeof IOSNativeAPI === 'object' && typeof IOSNativeAPI.showAlertDialogMessageCancelTitleOkTitleCallback === 'function') {
      IOSNativeAPI.showAlertDialogMessageCancelTitleOkTitleCallback(title, message, cancelBtnTitle, okBtnTitle, callback)
    } else {
      console.error('dont know how to show alert dialog')
    }
  },

  getActiveSession: function() {
    if (typeof AndroidNativeAPI === 'object' && typeof AndroidNativeAPI.getActiveSession === 'function') {
      return AndroidNativeAPI.getActiveSession()
    } else if (typeof IOSNativeAPI === 'object' && typeof IOSNativeAPI.getActiveSession === 'function') {
      return IOSNativeAPI.getActiveSession()
    } else {
      return undefined
    }
  },

}