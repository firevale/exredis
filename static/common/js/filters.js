import './date'
// import * as filter from './keywordFilter'

import { emailMask, mobileMask, concatAndResolveUrl } from './utils'

export { emailMask, mobileMask }

export const humanReadableDownloadSpeed = val => {
  let resStr = ''
  let bytes = parseInt(val)
  if (!isNaN(bytes)) {
    if (bytes > 1024 * 1024 * 1024) {
      resStr = (bytes /= 1024 * 1024 * 1024).toFixed(2) + 'G'
    } else if (bytes > 1024 * 1024) {
      resStr = (bytes /= 1024 * 1024).toFixed(2) + 'M'
    } else if (bytes > 1024) {
      resStr = (bytes /= 1024).toFixed(2) + 'KB'
    } else {
      resStr = bytes + 'B'
    }
  }
  return resStr + '/S';
}

export const humanReadableSize = val => {
  let resStr = ''
  let bytes = parseInt(val)
  if (!isNaN(bytes)) {
    if (bytes > 1024 * 1024 * 1024) {
      resStr = (bytes /= 1024 * 1024 * 1024).toFixed(0) + 'G'
    } else if (bytes > 1024 * 1024) {
      resStr = (bytes /= 1024 * 1024).toFixed(0) + 'M'
    } else if (bytes > 1024) {
      resStr = (bytes /= 1024).toFixed(0) + 'KB'
    } else {
      resStr = bytes + 'B'
    }
  }
  return resStr;
}

export const bytesToSize = bytes => {
  if (bytes === 0) return '0 B';
  var k = 1024;
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));　　
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

export const formatServerDateTime = val => {
  if (val) {
    let a = val.split(/[^0-9]/)
    let m = parseInt(a[1]) - 1
    let date = new Date(Date.UTC(a[0], m, a[2], a[3], a[4], a[5]))
    return date.Format('yyyy-MM-dd hh:mm:ss')
  } else {
    return ''
  }
}

export const formatServerDate = val => {
  if (val) {
    let a = val.split(/[^0-9]/)
    let m = parseInt(a[1]) - 1
    let date = new Date(Date.UTC(a[0], m, a[2], a[3], a[4], a[5]))
    return date.Format('yyyy-MM-dd')
  } else {
    return ''
  }
}

export const convertServerDateTime = val => {
  if (val) {
    let a = val.split(/[^0-9]/)
    let m = parseInt(a[1]) - 1
    let date = new Date(Date.UTC(a[0], m, a[2], a[3], a[4], a[5]))
    return date.toString()
  } else {
    return ''
  }
}

export const formatPrice = val => {
  if (val)
    return parseFloat(val / 100).toFixed(2)
  else
    return 0
}

// export const filterKeyword = val => {
//   if (val) {
//     return filter.replaceKeyword(val, '*')
//   } else {
//     return ''
//   }
// }

const isWebpSupported = (window.acsConfig.browser == 'chrome' || window.acsConfig.platform ==
  'android')

export const imageStaticUrl = val => {
  if (typeof val === 'string' && !/^https?:\/\//.test(val)) {
    let base = window.acsConfig.imagesUrl
    let url = /^https?:\/\//.test(base) ? concatAndResolveUrl(base, val.replace(/^\/?img/, '')) :
      val
    // return isWebpSupported ? `${url}.webp` : url
    return url
  }

  return val
}

export const imageLowQualityUrl = val => {
  return val.replace(/\.jpg((\.webp)?(\?.*)?)$/, '.lq.jpg$1')
}