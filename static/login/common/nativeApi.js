import utils from './utils'

export default {
  getAppId: function() {
    // if in sdk's webview'
    if (window.acsConfig.inApp) {
      switch (window.acsConfig.platform) {
        case 'ios':
          if (typeof IOSNativeAPI === 'object' && typeof IOSNativeAPI.getAppId === 'function') {
            return IOSNativeAPI.getAppId()
          }
          break;

        case 'android':
          if (typeof AndroidNativeAPI === 'object' && typeof AndroidNativeAPI.getAppId === 'function') {
            return AndroidNativeAPI.getAppId()
          }
          break;

        default:
          break;
      }
    }

    return null
  },

  getDeviceId: function() {
    // if in sdk's webview'
    if (window.acsConfig.inApp) {
      switch (window.acsConfig.platform) {
        case 'ios':
          if (typeof IOSNativeAPI === 'object' && typeof IOSNativeAPI.getDeviceId === 'function') {
            return IOSNativeAPI.getDeviceId()
          }
          break;

        case 'android':
          if (typeof AndroidNativeAPI === 'object' && typeof AndroidNativeAPI.getDeviceId === 'function') {
            return AndroidNativeAPI.getDeviceId()
          }
          break;

        default:
          break;
      }
    }

    let deviceId = localStorage.getItem('__acs_device_id__')

    if (!deviceId) {
      deviceId = `${window.acsConfig.platform}.${utils.guid()}`
      localStorage.setItem('__acs_device_id__', deviceId)
    }

    return deviceId
  }
}