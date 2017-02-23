import './date'

export const humanReadableDownloadSpeed = val => {
  let resStr = ''
  let bytCount = parseInt(val);
  if (!isNaN(bytCount)) {
    if (bytCount > 1024 * 1024 * 1024) {
      resStr = (bytCount /= 1024 * 1024 * 1024).toFixed(2) + 'G'
    } else if (bytCount > 1024 * 1024) {
      resStr = (bytCount /= 1024 * 1024).toFixed(2) + 'M'
    } else if (bytCount > 1024) {
      resStr = (bytCount /= 1024).toFixed(2) + 'KB'
    } else {
      resStr = bytCount + 'B'
    }
  }
  return resStr + '/S';
}

export const formatServerDateTime = val => {
  if (val) {
    let a = val.split(/[^0-9]/)
    let date = new Date(a[0], a[1], a[2], a[3], a[4], a[5])
    return date.Format('yyyy-MM-dd hh:mm:ss')
  } else {
    return ''
  }
}