import './date'
import { guid } from './utils'

export const getAppId = _ => {
  return window.acsConfig.appId ?
    window.acsConfig.appId :
    'account-center'
}

export const getDeviceId = _ => {
  let deviceId = window.acsConfig.deviceId

  if (!deviceId) {
    deviceId = localStorage.getItem('__acs_device_id__')

    if (!deviceId) {
      deviceId = `${window.acsConfig.platform}.${guid()}`
      localStorage.setItem('__acs_device_id__', deviceId)
    }
  }

  return deviceId
}

export const checkIsLogin = (callback) => {
  if (!window.acsConfig.accessToken || window.acsConfig.accessToken.length < 10) {
    window.location.href = '/login?redirect_uri=' + btoa(window.location.href);
  } else {
    callback()
  }
}

export const checkMallIsLogin = (callback) => {
  if (!window.acsConfig.acsSessionUserId) {
    window.location.href = '/login?redirect_uri=' + btoa(window.location.href);
  } else {
    callback()
  }
}