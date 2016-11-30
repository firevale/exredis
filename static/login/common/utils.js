export default {
  isValidEmail: function(val) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
  },

  isValidMobileNumber: function(val) {
    return /^1[34578]\d{9}$/.test(val);
  },

  isValidAccountName: function(val) {
    if (window.acsConfig.isMobileAccountSupported) {
      return this.isValidEmail(val) || this.isValidMobileNumber(val)
    } else {
      return this.isValidEmail(val)
    }
  },

  emailMask: function(val) {
    return val.replace(/^([^<>()\[\]\\,;:\s@"]{2})[^@]*@/g, '$1***@')
  },

  mobileMask: function(val) {
    return val.replace(/^(\d{3})\d{6}(\d{2})/g, '$1******$2')
  },

  guid: function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  },

}