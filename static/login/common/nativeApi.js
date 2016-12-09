import utils from './utils'

export default {
  closeLoginDialog: function() {
    if (typeof AndroidNativeAPI === 'object' && typeof AndroidNativeAPI.closeLoginDialog === 'function') {
      AndroidNativeAPI.closeLoginDialog()
    } else if (typeof IOSNativeAPI === 'object' && typeof IOSNativeAPI.closeLoginDialog === 'function') {
      IOSNativeAPI.closeLoginDialog()
    }
    else {
      console.error('dont know how to close login dialog')
    }
  },
}