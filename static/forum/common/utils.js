export default {
  isValidEmail: function (val) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
  },

  isValidMobileNumber: function (val) {
    return /^1[34578]\d{9}$/.test(val);
  },

  isValidAccountName: function (val) {
    if (window.acsConfig.isMobileAccountSupported) {
      return this.isValidEmail(val) || this.isValidMobileNumber(val)
    } else {
      return this.isValidEmail(val)
    }
  },

  emailMask: function (val) {
    return val.replace(/^([^<>()\[\]\\,;:\s@"]{2})[^@]*@/g, '$1***@')
  },

  mobileMask: function (val) {
    return val.replace(/^(\d{3})\d{6}(\d{2})/g, '$1******$2')
  },

  guid: function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  },

  getAppId: function () {
    return window.acsConfig.appId ? window.acsConfig.appId : 'account-center'
  },

  getDeviceId: function () {
    let deviceId = window.acsConfig.deviceId

    if (!deviceId) {
      deviceId = localStorage.getItem('__acs_device_id__')

      if (!deviceId) {
        deviceId = `${window.acsConfig.platform}.${this.guid()}`
        localStorage.setItem('__acs_device_id__', deviceId)
      }
    }

    return deviceId
  },

  getNowFormatDate: function() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
      " " + date.getHours() + seperator2 + date.getMinutes() +
      seperator2 + date.getSeconds();
    return currentdate;
  }

}