import './date'

let emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

let firevaleEmailRegex = /^\w+@firevale\.com$/

export const isValidEmail = val => {
  return emailRegex.test(val)
}

export const isValidFirevaleEmail = val => {
  return firevaleEmailRegex.test(val)
}

export const isValidMobileNumber = val => {
  return /^1[34578]\d{9}$/.test(val)
}

export const isValidAccountName = val => {
  if (window.acsConfig.isMobileAccountSupported) {
    return this.isValidEmail(val) || this.isValidMobileNumber(val)
  } else {
    return this.isValidEmail(val)
  }
}

export const isValidResidentId = residentId => {
  if (typeof residentId !== 'string') return false
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  }

  let birthday = residentId.substr(6, 4) + '/' +
    Number(residentId.substr(10, 2)) + '/' + Number(residentId.substr(12, 2))
  let d = new Date(birthday)
  let newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate())
  let currentTime = new Date().getTime()
  let time = d.getTime()
  let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  let sum = 0
  let i
  let residue

  if (!/^\d{17}(\d|x)$/i.test(residentId)) return false
  if (city[residentId.substr(0, 2)] === undefined) return false
  if (time >= currentTime || birthday !== newBirthday) return false
  for (i = 0; i < 17; i++) {
    sum += residentId.substr(i, 1) * arrInt[i];
  }
  residue = arrCh[sum % 11];
  if (residue !== residentId.substr(17, 1)) return false

  return true
}

export const emailMask = val => {
  return val.replace(/^([^<>()\[\]\\,;:\s@"]{2})[^@]*@/g, '$1***@')
}

export const mobileMask = val => {
  return val.replace(/^(\d{3})\d{4}(\d{4})/g, '$1****$2')
}

export const guid = _ => {
  const s4 = _ => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export const nowFromServer = _ => {
  return new Date().Format('yyyy-MM-ddThh:mm:ss.000000')
}

export const chunkify = (a, n, balanced) => {
  if (n < 2)
    return [a];

  var len = a.length,
    out = [],
    i = 0,
    size;

  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(a.slice(i, i += size));
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, i += size));
    }
  } else {

    n--;
    size = Math.floor(len / n);
    if (len % size === 0)
      size--;
    while (i < size * n) {
      out.push(a.slice(i, i += size));
    }
    out.push(a.slice(size * n));
  }

  return out;
}

export const formatEmojiChars = val => {
  return val.replace(/\ud83d[\ude00-\ude4f]/g, match => encodeURIComponent(match))
}

export const removeEmojiChars = val => {
  return val.replace(/\ud83d[\ude00-\ude4f]/g, '')
}

export const minLength = length => {
  return val => {
    let cleanVal = removeEmojiChars(val)
    let m = encodeURIComponent(cleanVal).match(/%[89ABab]/g)
    let l = cleanVal.length + (m ? m.length : 0)
    return l >= length
  }
}

export const maxLength = length => {
  return val => {
    let cleanVal = removeEmojiChars(val)
    let m = encodeURIComponent(cleanVal).match(/%[89ABab]/g)
    let l = cleanVal.length + (m ? m.length : 0)
    return l <= length
  }
}