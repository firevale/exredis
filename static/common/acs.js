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

export const getQuillToolbarConfig = _ => {
  switch (window.acsConfig.platform) {
    case 'ios':
    case 'android':
    case 'wp8':
      return false;

    default:
      return [
        [
          'bold', 'italic', 'underline', 'strike',
        ], // toggled buttons
        [
          'blockquote', 'code-block',
        ],
        [
          {
            'header': 1
          }, {
            'header': 2
          },
        ], // custom button values
        [
          {
            'list': 'ordered'
          }, {
            'list': 'bullet'
          },
        ],
        [
          {
            'script': 'sub'
          }, {
            'script': 'super'
          },
        ], // superscript/subscript
        [
          {
            'indent': '-1'
          }, {
            'indent': '+1'
          },
        ], // outdent/indent
        [
          {
            'direction': 'rtl'
          }
        ], // text direction

        [
          {
            'size': ['small', false, 'large', 'huge',]
          }
        ], // custom dropdown
        [
          {
            'header': [
              1,
              2,
              3,
              4,
              5,
              6,
              false,
            ]
          }
        ],

        [
          {
            'color': []
          }, {
            'background': []
          },
        ], // dropdown with defaults from theme
        [
          {
            'font': []
          }
        ],
        [
          {
            'align': []
          }
        ],

        ['clean'],
      ]
  }
}
