import utils from './utils'

export default {
  closeLoginDialog: function(result) {
    if (typeof AndroidNativeAPI === 'object' && typeof AndroidNativeAPI.closeLoginDialog === 'function') {
      AndroidNativeAPI.closeLoginDialog(result)
    } else if (typeof IOSNativeAPI === 'object' && typeof IOSNativeAPI.closeLoginDialog === 'function') {
      IOSNativeAPI.closeLoginDialog(result)
    }
    else {
      console.error('dont know how to close login dialog')
    }
  },
}