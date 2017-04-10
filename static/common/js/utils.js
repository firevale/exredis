import './date'

let emailRegex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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