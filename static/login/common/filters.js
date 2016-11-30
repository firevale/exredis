const urlParser = document.createElement('a')

function domain(url) {
  urlParser.href = url
  return urlParser.hostname
}

/**
 * 千位分割数字-格式化
 * @param str
 * @returns {string}
 */
function formatNum(str) {
  var str = str + '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(str)) {
    str = str.replace(rgx, '$1' + ',' + '$2');
  }
  return str;
}

/**
 * 与当前日期对比-格式化
 * @param dateTimeStamp
 * @returns {string}
 */
function formatDateDiff(dateTimeStamp) {
  var result = '';
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;

  if (diffValue < 0) {
    return '';
  }

  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;

  if (monthC >= 1) {
    result = '' + parseInt(monthC) + '月前';
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC) + '周前';
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC) + '天前';
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前';
  } else if (minC >= 1) {
    result = '' + parseInt(minC) + '分钟前';
  } else {
    result = '刚刚';
  }
  return result;
}

function getDateTimeStamp(dateStr) {
  return Date.parse(dateStr.replace(/-/gi, '/'));
}

function appendQueryParam(link, key, value) {
  if (typeof(link) === 'object') {
    var query = link.query || {}
    query[key] = value
    link.query = query
  } else if (typeof(link) === 'string') {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (link.match(re)) {
      link = link.replace(re, '$1' + key + "=" + value + '$2');
    } else {
      link = link + separator + key + "=" + value;
    }
  }

  return link
}

function stringIsNotEmpty(str) {
  return typeof(str) === 'string' && str.length > 0
}

function getReadableDownloadCounter(counter) {
  if (counter > 10000) {
    return Math.round(counter / 10000) + '万人下载'
  } else {
    return counter + '人下载'
  }
}

function downLoadSpeedStr( val ) {
  let resStr = ''
  let bytCount = parseInt( val );
  if( !isNaN(bytCount) ){
    if(bytCount > 1024*1024*1024){
      resStr = (bytCount /= 1024*1024*1024).toFixed(2) + 'G'
    }else if(bytCount > 1024*1024){
      resStr = (bytCount /= 1024*1024).toFixed(2) + 'M'
    }else if(bytCount > 1024){
      resStr = (bytCount /= 1024).toFixed(2) + 'KB'
    }else{
      resStr = bytCount + 'B'
    }
  }
  return resStr+'/s';
}

export default {
  formatNum,
  formatDateDiff,
  appendQueryParam,
  domain,
  stringIsNotEmpty,
  getReadableDownloadCounter,
  downLoadSpeedStr,
}