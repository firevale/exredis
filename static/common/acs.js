import './date'
import {guid} from './utils'

export const getAppId = _ => {
  return window.acsConfig.appId
    ? window.acsConfig.appId
    : 'account-center'
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
  if (window.acsConfig.accessToken.length < 10) {
    window.location.href = '/login?redirectUri=' + btoa(window.location.href);
  } else {
    callback()
  }
}

export const getQuillToolbarConfig = _ => {
  switch (window.acsConfig.platform) {
    case 'ios':
    case 'android':
    case 'wp8':
      return false;

    default:
      return [
        [
          {
            'size': ['small', false, 'large', 'huge',]
          }
        ], // custom dropdown
        [
          'bold',
          'italic', {
            'color': []
          },
        ], // toggled buttons
        [
          'code-block', 'link', 'image',
        ],
        [
          {
            'list': 'ordered'
          }, {
            'list': 'bullet'
          },
        ],
        [
          {
            'indent': '-1'
          }, {
            'indent': '+1'
          },
        ],,
      ] // outdent/indent
  }
}
