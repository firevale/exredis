import './date'

export const isValidEmail = val => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(val)
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

export const emailMask = val => {
  return val.replace(/^([^<>()\[\]\\,;:\s@"]{2})[^@]*@/g, '$1***@')
}

export const mobileMask = val => {
  return val.replace(/^(\d{3})\d{6}(\d{2})/g, '$1******$2')
}

export const guid = _ => {
  const s4 = _ => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export const getNowFormatDate = _ => {
  var date = new Date();
  return date.Format('yyyy-MM-dd hh:mm:ss')
}