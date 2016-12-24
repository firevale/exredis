import utils from './utils'

export default {
  closeLoginDialog: function(result) {
    if (typeof AndroidNativeAPI === 'object' && typeof AndroidNativeAPI.closeLoginDialog === 'function') {
      AndroidNativeAPI.closeLoginDialog(result)
    } else if (typeof IOSNativeAPI === 'object' && typeof IOSNativeAPI.closeLoginDialog === 'function') {
      IOSNativeAPI.closeLoginDialog(result)
    } else {
      console.error('dont know how to close login dialog')
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