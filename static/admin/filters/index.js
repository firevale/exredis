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

Date.prototype.Format = function(fmt) { //author: meizz 
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

export const formatServerDateTime = val => {
  if (val) {
    let date = new Date(`${val}+0800`)
    return date.Format('yyyy-MM-dd hh:mm:ss')
  } else {
    return ''
  }
}