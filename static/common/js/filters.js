import './date'
import * as filter from './keywordFilter'

import {emailMask, mobileMask} from './utils'

export {emailMask, mobileMask}

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

export const filterKeyword = val => {
  if (val) {
    return filter.replaceKeyword(val, '*')
  } else {
    return ''
  }
}
