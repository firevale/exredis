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