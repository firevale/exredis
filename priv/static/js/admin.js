webpackJsonp([0],Array(27).concat([
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return isValidEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return isValidFirevaleEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return isValidMobileNumber; });
/* unused harmony export isValidAccountName */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return isValidResidentId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return emailMask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return mobileMask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return guid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return nowFromServer; });
/* unused harmony export chunkify */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return formatEmojiChars; });
/* unused harmony export removeEmojiChars */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return minLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return maxLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return concatAndResolveUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return updateQueryStringParameter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__date__);
var _this = this;



var emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;

var firevaleEmailRegex = /^\w+@firevale\.com$/;

var isValidEmail = function isValidEmail(val) {
  return emailRegex.test(val);
};

var isValidFirevaleEmail = function isValidFirevaleEmail(val) {
  return firevaleEmailRegex.test(val);
};

var isValidMobileNumber = function isValidMobileNumber(val) {
  return (/^1\d{10}$/.test(val)
  );
};

var isValidAccountName = function isValidAccountName(val) {
  if (window.acsConfig.isMobileAccountSupported) {
    return _this.isValidEmail(val) || _this.isValidMobileNumber(val);
  } else {
    return _this.isValidEmail(val);
  }
};

var isValidResidentId = function isValidResidentId(residentId) {
  if (typeof residentId !== 'string') return false;
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
  };

  var birthday = residentId.substr(6, 4) + '/' + Number(residentId.substr(10, 2)) + '/' + Number(residentId.substr(12, 2));
  var d = new Date(birthday);
  var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
  var currentTime = new Date().getTime();
  var time = d.getTime();
  var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  var sum = 0;
  var i = void 0;
  var residue = void 0;

  if (!/^\d{17}(\d|x)$/i.test(residentId)) return false;
  if (city[residentId.substr(0, 2)] === undefined) return false;
  if (time >= currentTime || birthday !== newBirthday) return false;
  for (i = 0; i < 17; i++) {
    sum += residentId.substr(i, 1) * arrInt[i];
  }
  residue = arrCh[sum % 11];
  if (residue !== residentId.substr(17, 1)) return false;

  return true;
};

var emailMask = function emailMask(val) {
  return val.replace(/^([^<>()\[\]\\,;:\s@"]{2})[^@]*@/g, '$1***@');
};

var mobileMask = function mobileMask(val) {
  return val.replace(/^(\d{3})\d{4}(\d{4})/g, '$1****$2');
};

var guid = function guid(_) {
  var s4 = function s4(_) {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

var nowFromServer = function nowFromServer(_) {
  return new Date().Format('yyyy-MM-ddThh:mm:ss.000000');
};

var chunkify = function chunkify(a, n, balanced) {
  if (n < 2) return [a];

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
    if (len % size === 0) size--;
    while (i < size * n) {
      out.push(a.slice(i, i += size));
    }
    out.push(a.slice(size * n));
  }

  return out;
};

var formatEmojiChars = function formatEmojiChars(val) {
  return val.replace(/\ud83d[\ude00-\ude4f]/g, function (match) {
    return encodeURIComponent(match);
  });
};

var removeEmojiChars = function removeEmojiChars(val) {
  return val.replace(/\ud83d[\ude00-\ude4f]/g, '');
};

var minLength = function minLength(length) {
  return function (val) {
    if (typeof val === 'string') {
      var cleanVal = removeEmojiChars(val);
      var m = encodeURIComponent(cleanVal).match(/%[89ABab]/g);
      var l = cleanVal.length + (m ? m.length : 0);
      return l >= length;
    } else {
      return false;
    }
  };
};

var maxLength = function maxLength(length) {
  return function (val) {
    if (typeof val === 'string') {
      var cleanVal = removeEmojiChars(val);
      var m = encodeURIComponent(cleanVal).match(/%[89ABab]/g);
      var l = cleanVal.length + (m ? m.length : 0);
      return l <= length;
    } else {
      return false;
    }
  };
};

var concatAndResolveUrl = function concatAndResolveUrl(url, concat) {
  var url1 = url.replace(/\/$/, '').split('/');
  var url2 = concat.replace(/^\//, '').split('/');
  var url3 = [];
  for (var i = 0, l = url1.length; i < l; i++) {
    if (url1[i] == '..') {
      url3.pop();
    } else if (url1[i] == '.') {
      continue;
    } else {
      url3.push(url1[i]);
    }
  }
  for (var _i = 0, _l = url2.length; _i < _l; _i++) {
    if (url2[_i] == '..') {
      url3.pop();
    } else if (url2[_i] == '.') {
      continue;
    } else {
      url3.push(url2[_i]);
    }
  }
  return url3.join('/');
};

var updateQueryStringParameter = function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  } else {
    return uri + separator + key + "=" + value;
  }
};

/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);

var toast = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(439));

var instance = void 0;

/* harmony default export */ __webpack_exports__["a"] = ({
  show: function show(msg) {
    if (!instance) {
      instance = new toast({
        el: document.createElement('div'),
        propsData: {
          message: msg
        }
      });
    } else {
      instance.message = msg;
    }
    instance.visible = true;
    __WEBPACK_IMPORTED_MODULE_0_vue___default.a.nextTick(function () {
      setTimeout(function () {
        instance.visible = false;
      }, 2000);
    });
  }
});

/***/ }),
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return openNotification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return processAjaxError; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_i18n__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_bulma_notification__ = __webpack_require__(1517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_bulma_notification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_bulma_notification__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_dialog_messageBox__ = __webpack_require__(80);
var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




var NotificationComponent = __WEBPACK_IMPORTED_MODULE_1_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_2_vue_bulma_notification___default.a);


var openNotification = function openNotification() {
  var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    title: '',
    message: '',
    type: '',
    direction: '',
    duration: 4500,
    container: '.notifications'
  };

  return new NotificationComponent({
    i18n: __WEBPACK_IMPORTED_MODULE_0__vue_i18n__["a" /* i18n */],
    el: document.createElement('div'),
    propsData: propsData
  });
};

var processAjaxError = function processAjaxError(e) {
  var message = __WEBPACK_IMPORTED_MODULE_0__vue_i18n__["a" /* i18n */].t('admin.notification.message.unknownError');
  if (e.message) {
    message = e.message;
  } else if (e.i18n_message) {
    message = __WEBPACK_IMPORTED_MODULE_0__vue_i18n__["a" /* i18n */].t(e.i18n_message, e.i18n_message_object);
  }

  if (e.action == 'login') {
    window.location = '/login?redirect_uri=' + btoa(window.location.href);
  } else if (e.action == 'forbiddenAccess') {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_admin_components_dialog_messageBox__["a" /* showMessageBox */])({
      visible: true,
      title: __WEBPACK_IMPORTED_MODULE_0__vue_i18n__["a" /* i18n */].t('admin.titles.warning'),
      message: message,
      type: 'danger',
      onOK: function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  window.location = '/login?redirect_uri=' + btoa(window.location.href);

                case 1:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function onOK(_x2) {
          return _ref.apply(this, arguments);
        };
      }()
    });
  } else {
    openNotification({
      title: __WEBPACK_IMPORTED_MODULE_0__vue_i18n__["a" /* i18n */].t('admin.notification.title.failed'),
      message: message,
      type: 'danger',
      duration: 6000
    });
  }
};

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return getAppId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getDeviceId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return checkIsLogin; });
/* unused harmony export isRestrictLogin */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isInApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return csrfToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return locale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return obtainCodeUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isMobileAccountSupported; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return showLogout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(27);



var appId = window.acsConfig.appId ? window.acsConfig.appId : 'account-center';
var acsDeviceId = window.acsConfig.deviceId;

var getAppId = function getAppId(_) {
  return appId;
};

var getDeviceId = function getDeviceId(_) {
  var deviceId = acsDeviceId;

  if (!deviceId) {
    deviceId = localStorage.getItem('__acs_device_id__');

    if (!deviceId) {
      deviceId = window.acsConfig.platform + '.' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* guid */])();
      localStorage.setItem('__acs_device_id__', deviceId);
    }
  }

  return deviceId;
};

var checkIsLogin = function checkIsLogin(callback) {
  if (!window.acsConfig.accessToken || window.acsConfig.accessToken.length < 10) {
    window.location.href = '/login?redirect_uri=' + btoa(window.location.href);
  } else {
    callback();
  }
};

var isRestrictLogin = window.acsConfig.isRestrictLogin || false;
var isInApp = window.acsConfig.inApp || false;
var csrfToken = window.acsConfig.csrfToken;
var locale = window.acsConfig.locale || 'zh-hans';
var obtainCodeUrl = window.acsConfig.obtainCodeUrl || '';
var isMobileAccountSupported = window.acsConfig.isMobileAccountSupported || false;
var showLogout = window.acsConfig.show_logout || false;

/***/ }),
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "humanReadableDownloadSpeed", function() { return humanReadableDownloadSpeed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "humanReadableSize", function() { return humanReadableSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytesToSize", function() { return bytesToSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatServerDateTime", function() { return formatServerDateTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatServerDate", function() { return formatServerDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertServerDateTime", function() { return convertServerDateTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatPrice", function() { return formatPrice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "secondFormatHour", function() { return secondFormatHour; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "imageStaticUrl", function() { return imageStaticUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "imageLowQualityUrl", function() { return imageLowQualityUrl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(27);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "emailMask", function() { return __WEBPACK_IMPORTED_MODULE_1__utils__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mobileMask", function() { return __WEBPACK_IMPORTED_MODULE_1__utils__["f"]; });

// import * as filter from './keywordFilter'





var humanReadableDownloadSpeed = function humanReadableDownloadSpeed(val) {
  var resStr = '';
  var bytes = parseInt(val);
  if (!isNaN(bytes)) {
    if (bytes > 1024 * 1024 * 1024) {
      resStr = (bytes /= 1024 * 1024 * 1024).toFixed(2) + 'G';
    } else if (bytes > 1024 * 1024) {
      resStr = (bytes /= 1024 * 1024).toFixed(2) + 'M';
    } else if (bytes > 1024) {
      resStr = (bytes /= 1024).toFixed(2) + 'KB';
    } else {
      resStr = bytes + 'B';
    }
  }
  return resStr + '/S';
};

var humanReadableSize = function humanReadableSize(val) {
  var resStr = '';
  var bytes = parseInt(val);
  if (!isNaN(bytes)) {
    if (bytes > 1024 * 1024 * 1024) {
      resStr = (bytes /= 1024 * 1024 * 1024).toFixed(0) + 'G';
    } else if (bytes > 1024 * 1024) {
      resStr = (bytes /= 1024 * 1024).toFixed(0) + 'M';
    } else if (bytes > 1024) {
      resStr = (bytes /= 1024).toFixed(0) + 'KB';
    } else {
      resStr = bytes + 'B';
    }
  }
  return resStr;
};

var bytesToSize = function bytesToSize(bytes) {
  if (bytes === 0) return '0 B';
  var k = 1024;
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
};

var formatServerDateTime = function formatServerDateTime(val) {
  if (val) {
    var a = val.split(/[^0-9]/);
    var m = parseInt(a[1]) - 1;
    var date = new Date(Date.UTC(a[0], m, a[2], a[3], a[4], a[5]));
    return date.Format('yyyy-MM-dd hh:mm:ss');
  } else {
    return '';
  }
};

var formatServerDate = function formatServerDate(val) {
  if (val) {
    var a = val.split(/[^0-9]/);
    var m = parseInt(a[1]) - 1;
    var date = new Date(Date.UTC(a[0], m, a[2], a[3], a[4], a[5]));
    return date.Format('yyyy-MM-dd');
  } else {
    return '';
  }
};

var convertServerDateTime = function convertServerDateTime(val) {
  if (val) {
    var a = val.split(/[^0-9]/);
    var m = parseInt(a[1]) - 1;
    var date = new Date(Date.UTC(a[0], m, a[2], a[3], a[4], a[5]));
    return date.toString();
  } else {
    return '';
  }
};

var formatPrice = function formatPrice(val) {
  if (val) return parseFloat(val / 100).toFixed(2);else return 0;
};

var secondFormatHour = function secondFormatHour(val) {
  if (val) return parseFloat(val / 3600).toFixed(1);else return 0;
};

// export const filterKeyword = val => {
//   if (val) {
//     return filter.replaceKeyword(val, '*')
//   } else {
//     return ''
//   }
// }

var isWebpSupported = window.acsConfig.browser == 'chrome' || window.acsConfig.platform == 'android';

var imageStaticUrl = function imageStaticUrl(val) {
  if (typeof val === 'string' && !/^https?:\/\//.test(val)) {
    var base = window.acsConfig.imagesUrl;
    var url = /^https?:\/\//.test(base) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["g" /* concatAndResolveUrl */])(base, val.replace(/^\/?img/, '')) : val;
    // return isWebpSupported ? `${url}.webp` : url
    return url;
  }

  return val;
};

var imageLowQualityUrl = function imageLowQualityUrl(val) {
  return val.replace(/\.jpg((\.webp)?(\?.*)?)$/, '.lq.jpg$1');
};

/***/ }),
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */
/***/ (function(module, exports) {

Date.prototype.Format = function (fmt) {
    //author: meizz
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
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }return fmt;
};

Date.prototype.DateAdd = function (strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's':
            return new Date(Date.parse(dtTmp) + 1000 * Number);
        case 'n':
            return new Date(Date.parse(dtTmp) + 60000 * Number);
        case 'h':
            return new Date(Date.parse(dtTmp) + 3600000 * Number);
        case 'd':
            return new Date(Date.parse(dtTmp) + 86400000 * Number);
        case 'w':
            return new Date(Date.parse(dtTmp) + 86400000 * 7 * Number);
        case 'q':
            return new Date(dtTmp.getFullYear(), dtTmp.getMonth() + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm':
            return new Date(dtTmp.getFullYear(), dtTmp.getMonth() + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y':
            return new Date(dtTmp.getFullYear() + Number, dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
};

Date.prototype.DateDiff = function (strInterval, dtEnd) {
    var dtStart = this;
    if (typeof dtEnd == 'string') {
        dtEnd = StringToDate(dtEnd);
    }
    switch (strInterval) {
        case 's':
            return parseInt((dtEnd - dtStart) / 1000);
        case 'n':
            return parseInt((dtEnd - dtStart) / 60000);
        case 'h':
            return parseInt((dtEnd - dtStart) / 3600000);
        case 'd':
            return parseInt((dtEnd - dtStart) / 86400000);
        case 'w':
            return parseInt((dtEnd - dtStart) / (86400000 * 7));
        case 'm':
            return dtEnd.getMonth() + 1 + (dtEnd.getFullYear() - dtStart.getFullYear()) * 12 - (dtStart.getMonth() + 1);
        case 'y':
            return dtEnd.getFullYear() - dtStart.getFullYear();
    }
};

Date.prototype.toString = function (showWeek) {
    var myDate = this;
    var str = myDate.toLocaleDateString();
    if (showWeek) {
        var Week = ['日', '一', '二', '三', '四', '五', '六'];
        str += ' 星期' + Week[myDate.getDay()];
    }
    return str;
};

function StringToDate(DateStr) {
    var converted = Date.parse(DateStr);
    var myDate = new Date(converted);
    if (isNaN(myDate)) {
        //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';  
        var arys = DateStr.split('-');
        myDate = new Date(arys[0], --arys[1], arys[2]);
    }
    return myDate;
}

/***/ }),
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return showMessageBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var MessageBox = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(1366));

var showMessageBox = function showMessageBox() {
  var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    visible: true
  };

  var instance = new MessageBox({
    el: document.createElement('div'),
    propsData: propsData
  });
};

/***/ }),
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(886),
  /* template */
  __webpack_require__(1677),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/Pagination.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Pagination.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c1422300", Component.options)
  } else {
    hotAPI.reload("data-v-c1422300", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return i18n; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_i18n__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__i18n__ = __webpack_require__(790);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_i18n__["a" /* default */]);

var i18n = new __WEBPACK_IMPORTED_MODULE_1_vue_i18n__["a" /* default */]({
  locale: window.acsConfig.locale || 'zh-hans',
  messages: __WEBPACK_IMPORTED_MODULE_2__i18n__["a" /* default */]
});

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return showImageUploadDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var ImageUploadDialog = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(436));

var showImageUploadDialog = function showImageUploadDialog(i18n) {
  var propsData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    visible: true
  };

  var instance = new ImageUploadDialog({
    i18n: i18n,
    el: document.createElement('div'),
    propsData: propsData
  });

  return instance;
};

/***/ }),
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return showProgress; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_progress__ = __webpack_require__(401);


__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1__vue_progress__["a" /* default */]);

var Progress = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(437));

var showProgress = function showProgress() {
  var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    visible: true
  };

  var instance = new Progress({
    el: document.createElement('div'),
    propsData: propsData
  });

  return instance;
};

/***/ }),
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "main", function() { return main; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "app", function() { return app; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sdks", function() { return sdks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "goods", function() { return goods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "device", function() { return device; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sidebar", function() { return sidebar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "effect", function() { return effect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "menuitems", function() { return menuitems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indexMenuitems", function() { return indexMenuitems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mallList", function() { return mallList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mallHash", function() { return mallHash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adminLevel", function() { return adminLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "myLoginCodes", function() { return myLoginCodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wcpParams", function() { return wcpParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "latestOnlineData", function() { return latestOnlineData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "briefStats", function() { return briefStats; });
var main = function main(state) {
  return state.main;
};
var app = function app(state) {
  return state.apps.app;
};
var latestOnlineData = function latestOnlineData(state) {
  return state.apps.latestOnlineData;
};
var briefStats = function briefStats(state) {
  return state.apps.briefStats;
};
var myLoginCodes = function myLoginCodes(state) {
  return state.apps.myLoginCodes;
};
var sdks = function sdks(state) {
  return state.apps.sdks;
};
var goods = function goods(state) {
  return state.apps.goods;
};
var device = function device(state) {
  return state.main.device;
};
var sidebar = function sidebar(state) {
  return state.main.sidebar;
};
var effect = function effect(state) {
  return state.main.effect;
};
var indexMenuitems = function indexMenuitems(state) {
  return state.menu.indexItems;
};
var mallList = function mallList(state) {
  return state.mall.list;
};
var mallHash = function mallHash(state) {
  return state.mall.hash;
};
var adminLevel = function adminLevel(state) {
  return state.main.adminLevel;
};
var wcpParams = function wcpParams(state) {
  return state.wcp.wcpParams;
};

var menuitems = function menuitems(state) {
  var has_mall = state.apps.app && state.apps.app.has_mall;
  var has_forum = state.apps.app && state.apps.app.has_forum;
  var restrict_login = state.apps.app && state.apps.app.restrict_login;

  var result = [];

  state.menu.items.forEach(function (element) {
    switch (element.meta.must) {
      case 'has_forum':
        if (has_forum) result.push(element);
        break;

      case 'has_mall':
        if (has_mall) result.push(element);
        break;

      // case 'restrict_login':
      //   if (restrict_login) {
      //     element.meta.expanded = false
      //     result.push(element);
      //   }
      //   break;

      default:
        result.push(element);
        break;
    }
  });

  return result;
};



/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return TOGGLE_DEVICE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TOGGLE_SIDEBAR; });
/* unused harmony export SET_APPID */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return SET_APP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return SET_MY_LOGIN_CODES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EXPAND_MENU; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return SWITCH_EFFECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return UPDATE_SDKS; });
/* unused harmony export UPDATE_FORUMS */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return UPDATE_ADMIN_LEVEL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return ADD_FORUM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return UPDATE_MALLS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ADD_MALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return UPDATE_WCP_PARAMS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return JOIN_APP_CHANNEL; });
/* unused harmony export SET_APP_ONLINE_CHART */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return SET_APP_BRIEF_STATS; });
var TOGGLE_DEVICE = 'TOGGLE_DEVICE';
var TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';
var SET_APPID = 'SET_APPID';
var SET_APP = 'SET_APP';
var SET_MY_LOGIN_CODES = 'SET_MY_LOGIN_CODES';
var EXPAND_MENU = 'EXPAND_MENU';
var SWITCH_EFFECT = 'SWITCH_EFFECT';
var UPDATE_SDKS = 'UPDATE_SDKS';
var UPDATE_FORUMS = 'UPDATE_FORUMS';
var UPDATE_ADMIN_LEVEL = 'UPDATE_ADMIN_LEVEL';
var ADD_FORUM = 'ADD_FORUM';
var UPDATE_MALLS = 'UPDATE_MALLS';
var ADD_MALL = 'ADD_MALL';
var UPDATE_WCP_PARAMS = 'UPDATE_WCP_PARAMS';
var JOIN_APP_CHANNEL = 'JOIN_APP_CHANNEL';
var SET_APP_ONLINE_CHART = 'SET_APP_ONLINE_CHART';
var SET_APP_BRIEF_STATS = 'SET_APP_BRIEF_STATS';

/***/ }),
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  pageTitle: '糟糕， 出错了',
  invalidImage: '外链图片',

  // errors replied from acs server
  server: {
    networkError: '网络错误，请稍后再试',
    badRequestParams: '请求参数错误',

    userNameTooLong: '用户名超长',
    accountInUse: '账号已被使用',
    mobileInUse: '手机号码已被其他账号使用',
    emailInUse: '电子邮箱已被其他账号使用',
    nicknameInUse: '昵称已被其他用户使用',
    accountNotExist: '用户名或密码错误',
    invalidVerifyCode: '验证码输入有误',
    passwordNotMatch: '用户名或密码错误',
    tooManyFails: '您已经多次输错密码，请稍后再试',
    sendSmsFailed: '验证短信发送失败, 请稍后再试',
    sendSmsCooldown: '一分钟内不能发送多次验证码',
    sendEmailFailed: '验证邮件发送失败，请稍后再试',
    sendEmailCooldown: '一分钟内不能发送多次验证码',
    accountNotFound: '账号不存在',
    accountIdChanged: '账号被修改',
    imageSize128x128: '图片的尺寸必须为128x128',
    imageSize400x400: '图片的尺寸必须为400x400',
    imageSize640x260: '图片的尺寸必须为640x260',
    imageFormatPNG: '图片格式必须为PNG文件',
    illegal: '没有权限',
    goodsNotFound: '未找到商品',
    appNameExists: '应用名称【{app_name}】已被其他应用使用',
    emptyGoodsId: '商品ID不能为空',
    emptyGoodsName: '商品名称不能为空',
    emptyGoodsDescription: '商品简介不能为空',
    invalidGoodsPrice: '商品价格不能为负数',
    emptySectionTitle: '版块标题不能为空',
    emptyForumId: '版块所属论坛编号不能为空',
    forumNotFound: '未找到论坛',
    mallNotFound: '未找到商城',
    newsNotFound: '未找到该内容',
    addressNotFound: '未找到该地址',
    newsContentRequired: '内容不能为空',
    newsTitleMinLength: '标题至少4个字',
    newsTitleMaxLength: '标题不能超过30个字',
    forumNotExist: '论坛不存在',
    postNotExist: '帖子不存在',
    commentNotFound: '评论不存在',
    needLogin: '需要登录',
    userNotExist: '用户不存在',
    emojiCharsInParam: '提交的参数不能包含表情符号',
    invalidImageRatio: '上传图片的比例不符合要求',
    loginCodeNotExist: '您输入的激活码不存在',
    loginCodeUsed: '您输入的激活码已被使用',
    notLogin: '请先登录',
    configNotFound: '配置记录没有找到',
    assignTooManyCodes: '每个管理员最多只能给自己分配500个激活码'
  },

  // errors generated by form validator
  validation: {
    requireAccountId: '请输入您的手机号码/电子邮箱',
    requireMobile: '请输入您的手机号码',
    requireEmail: '请输入您的电子邮箱',
    requirePassword: '请输入密码',
    requireVerifyCode: '请输入验证码',
    requireLoginCode: '激活码不能为空',
    requireNickname: '请输入昵称',
    requireResidentName: '请输入您的真实姓名',
    requireResidentId: '请输入您的身份证号码',
    invalidAccountId: '请输入正确的手机号码／电子邮箱',
    invalidMobileNumber: '请输入正确的手机号码',
    invalidEmailAddress: '请输入正确的电子邮箱',
    invalidNickname: '昵称不能包含字符"%"',
    invalidVerifyCodeLength: '验证码长度4~6位',
    invalidLoginCodeLength: '激活码长度6~10位',
    invalidResidentId: '您必须输入自己的身份证号码',
    emojiPostTitle: '帖子标题不能包含表情文字',
    emojiNickname: '昵称不能包含表情文字',
    minPasswordLength: '密码太短了',
    maxPasswordLength: '密码太长了',
    mobileNotChanged: '当前已绑定此手机号码',
    minNicknameLength: '昵称太短了',
    maxNicknameLength: '昵称太长了',
    minResidentNameLength: '姓名至少两个字',
    maxResidentNameLength: '姓名太长了',
    minResidentIdLength: '身份证号码至少15位',
    maxResidentIdLength: '身份证号码最长18位',
    minAddressLength: '地址太短了',
    maxAddressLength: '地址太长了',
    emailNotChanged: '当前已绑定此电子邮箱',
    postContentRequired: '帖子内容不能为空',
    postTitleMinLength: '标题文字太短了',
    postTitleMaxLength: '标题文字太长了',
    commentContentRequired: '回帖内容最少5个字',
    responseRequired: '回复内容不能为空'
  },

  sdks: {
    netease: {
      checkPass: '检测结果：通过',
      checkNotPass: '检测结果：不通过',
      label100: '色情',
      label110: '性感',
      label200: '广告',
      label210: '二维码',
      label300: '暴恐',
      label400: '违禁',
      label600: '谩骂',
      label700: '灌水'
    }
  }
});

/***/ }),
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return showFileUploadDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var FileUploadDialog = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(1479));

var showFileUploadDialog = function showFileUploadDialog(i18n) {
  var propsData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    visible: true
  };

  var instance = new FileUploadDialog({
    i18n: i18n,
    el: document.createElement('div'),
    propsData: propsData
  });

  return instance;
};

/***/ }),
/* 399 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Vue-Quill-Editor
 * @author Surmon.me
 */

window.Quill = __webpack_require__(165);
var quillEditor = __webpack_require__(438);
var VueQuillEditor = {
  Quill: Quill,
  quillEditor: quillEditor,
  install: function install(Vue) {
    Vue.component('quill-editor', quillEditor);
  }
};

module.exports = VueQuillEditor;

/***/ }),
/* 400 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LINE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CIRCLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PATH; });
var LINE = 'line';
var CIRCLE = 'circle';
var PATH = 'path';

/***/ }),
/* 401 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Progress__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Progress___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Progress__);


var VueProgress = {
  install: function install(Vue, options) {
    Vue.component('progress-bar', __WEBPACK_IMPORTED_MODULE_0__Progress___default.a);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (VueProgress);

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueProgress);
}

/***/ }),
/* 402 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return extend; });
var extend = function extend(target, source) {
  for (var key in source) {
    target[key] = source[key];
  }
  return target;
};

/***/ }),
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_bulma_modal__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_upload_component__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_upload_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_upload_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_js_filters__ = __webpack_require__(52);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






var pica = __webpack_require__(430)();





function checkFileType(accepts, fileType) {
  return accepts.split(',').reduce(function (acc, accept) {
    return acc || new RegExp(accept.trim().replace('*', '(.*)')).test(fileType);
  }, false);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    callback: {
      type: Function,
      default: undefined
    },
    name: {
      type: String,
      default: 'file'
    },
    title: {
      type: String,
      default: ''
    },
    extensions: {
      default: function _default() {
        return [];
      }
    },
    postAction: {
      type: String
    },
    headers: {
      type: Object,
      default: function _default() {}
    },
    data: {
      type: Object,
      default: function _default() {}
    },
    maxFileSize: {
      type: Number,
      default: 512 * 1024
    },
    maxLength: {
      type: Number,
      default: undefined
    },
    width: {
      type: Number,
      default: undefined
    },
    height: {
      type: Number,
      default: undefined
    },
    destFormat: {
      type: String,
      default: 'image/png'
    },
    destQuality: {
      type: Number,
      default: 100
    }
  },

  data: function data() {
    var _this = this;

    return {
      file: undefined,
      upload: undefined,
      active: false,
      progress: 0,
      blob: undefined,
      errorMessage: '',
      uploadEvents: {
        add: function add(file) {
          _this.file = undefined;
          _this.upload.$el.style.backgroundImage = '';

          if (!checkFileType('image/png, image/jpeg, image/jpg', file.file.type)) {
            _this.errorMessage = _this.$t('upload.invalidFileType', {
              fileType: file.file.type
            });
            _this.upload.clear();
          } else {
            _this.errorMessage = '';

            var reader = new FileReader();

            reader.onloadend = function (f) {
              console.log('read file: ', f);

              var img = new Image();
              img.onload = function (_) {
                if (_this.width && img.width < _this.width) {
                  _this.errorMessage = _this.$t('upload.imgWidthShouldGreaterThan', {
                    minWidth: _this.width
                  });
                  _this.upload.clear();
                  return;
                }

                if (_this.height && img.height < _this.height) {
                  _this.errorMessage = _this.$t('upload.imgHeightShouldGreaterThan', {
                    minHeight: _this.height
                  });
                  _this.upload.clear();
                  return;
                }

                if (_this.width && _this.height) {
                  var ratio = _this.height / _this.width;
                  if (Math.abs(img.height / img.width - ratio) > 0.01) {
                    _this.errorMessage = _this.$t('upload.invalidImageRatio', {
                      ratio: (img.height / img.width).toFixed(2),
                      requiredRatio: ratio.toFixed(2)
                    });
                    _this.upload.clear();
                    return;
                  }
                }

                var destWidth = _this.width || img.width;
                var destHeight = _this.height || img.height;

                if (_this.maxLength) {
                  if (img.width > _this.maxLength && img.width > img.height) {
                    destHeight = Math.round(_this.maxLength / img.width * img.height);
                    destWidth = _this.maxLength;
                  } else if (img.height > _this.maxLength && img.height > img.width) {
                    destWidth = Math.round(_this.maxLength / img.height * img.width);
                    destHeight = _this.maxLength;
                  }
                }

                var canvas = document.createElement('canvas');
                canvas.width = destWidth;
                canvas.height = destHeight;

                pica.resize(img, canvas, {
                  quality: 3,
                  unsharpAmount: 100,
                  unsharpRadius: 2,
                  unsharpThreshold: 220,
                  alpha: _this.destQuality == 'image/png'
                }).then(function (result) {
                  var imageUrl = result.toDataURL();
                  _this.upload.$el.style.backgroundImage = 'url(' + imageUrl + ')';
                  return pica.toBlob(result, _this.destFormat, 100);
                }).then(function (blob) {
                  if (blob.size > _this.maxFileSize) {
                    _this.errorMessage = _this.$t('upload.fileIsTooLarge', {
                      maxFileSize: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_common_js_filters__["humanReadableSize"])('' + _this.maxFileSize)
                    });
                    _this.upload.clear();
                  } else {
                    _this.blob = blob;
                    _this.file = file;
                  }
                });
              };
              img.src = reader.result;
            };
            reader.readAsDataURL(file.file);
          }
        }
      }
    };
  },

  methods: {
    uploadBlob: function uploadBlob() {
      var _this2 = this;

      this.active = true;
      this.progress = 0;
      var fd = new FormData();
      Object.keys(this.data).forEach(function (key) {
        fd.append(key, _this2.data[key]);
      });
      fd.append('file', this.blob);
      __WEBPACK_IMPORTED_MODULE_3_axios___default.a.post(this.postAction, fd, {
        onUploadProgress: function onUploadProgress(e) {
          if (e.lengthComputable) {
            _this2.progress = Math.abs(e.loaded / e.total * 100);
          }
        }
      }).then(function (response) {
        if (typeof _this2.callback == 'function') {
          _this2.$nextTick(function (_) {
            _this2.callback(response.data);
          });
        }
        _this2.file = undefined;
        _this2.active = false;
        _this2.visible = false;
      }).catch(function (e) {
        console.error(e);
        _this2.$nextTick(function (_) {
          _this2.callback({ success: false });
        });
      });
    }
  },

  mounted: function mounted() {
    this.upload = this.$refs.upload;
    if (!this.title) {
      this.title = this.$t('upload.hint');
    }
  },

  components: {
    FileUpload: __WEBPACK_IMPORTED_MODULE_2_vue_upload_component___default.a,
    Modal: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_modal__["a" /* Modal */]
  }
});

/***/ }),
/* 408 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: Boolean
  },

  data: function data() {
    return {
      show: this.visible,
      options: {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 400,
        text: {
          autoStyleContainer: false
        },
        from: {
          color: '#FFEA82',
          width: 1
        },
        to: {
          color: '#ED6A5A',
          width: 4
        },
        // Set default step function for all animate calls
        step: function step(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);
          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value);
          }
        }
      }
    };
  },
  mounted: function mounted() {
    document.body.appendChild(this.$el);
  },


  methods: {
    setProgress: function setProgress(progress) {
      this.$refs.circle.animate(progress);
    },
    close: function close() {
      document.body.removeChild(this.$el);
    }
  }
});

/***/ }),
/* 409 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_quill__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_quill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_quill__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




__webpack_require__(419);
__webpack_require__(418);

if (!window.Quill) {
  window.Quill = __WEBPACK_IMPORTED_MODULE_0_quill___default.a;
}
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'quill-editor',
  data: function data() {
    return {
      _content: '',
      defaultModules: {
        toolbar: '#toolbar',
        history: {
          delay: 2000,
          maxStack: 100,
          userOnly: true
        }
      }
    };
  },

  props: {
    content: String,
    value: String,
    fullFeatured: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      required: false,
      default: function _default() {
        return {};
      }
    }
  },
  mounted: function mounted() {
    this.initialize();
  },
  beforeDestroy: function beforeDestroy() {
    // 作者说了，等垃圾回收，不必显式清理
    this.quillEditor = null;
  },

  methods: {
    initialize: function initialize() {
      if (this.$refs.quill) {
        var self = this;
        self.quillEditor = new __WEBPACK_IMPORTED_MODULE_0_quill___default.a(self.$refs.quill, Object.assign({
          modules: self.defaultModules,
          placeholder: this.placeholder,
          readOnly: false,
          theme: 'snow',
          strict: false
        }, self.config || {}));

        // set editor content
        if (self.value || self.content) {
          self.quillEditor.pasteHTML(self.value || self.content);
        }

        // mark model as touched if editor lost focus
        self.quillEditor.on('selection-change', function (range) {
          if (!range) {
            self.$emit('blur', self.quillEditor);
          } else {
            self.$emit('focus', self.quillEditor);
          }
        });

        // update model if text changes
        self.quillEditor.on('text-change', function (delta, oldDelta, source) {
          var html = self.$refs.quill.children[0].innerHTML;
          var text = self.quillEditor.getText();
          if (html === '<p><br></p>') html = '';
          self._content = html;
          self.$emit('input', self._content);
          self.$emit('change', {
            editor: self.quillEditor,
            html: html,
            text: text
          });
        });

        // 广播事件
        self.$emit('ready', self.quillEditor);
      }
    }
  },
  watch: {
    'content': function content(newVal, oldVal) {
      console.log('quill content', newVal, oldVal);
      if (this.quillEditor) {
        if (!!newVal && newVal !== this._content) {
          console.log('set content', newVal);
          this._content = newVal;
          this.quillEditor.pasteHTML(newVal);
        } else if (!newVal) {
          this.quillEditor.setText('');
        }
      }
    },
    'value': function value(newVal, oldVal) {
      if (this.quillEditor) {
        if (!!newVal && newVal !== this._content) {
          console.log('quill content', newVal, oldVal);
          this._content = newVal;
          this.quillEditor.pasteHTML(newVal);
        } else if (!newVal) {
          this.quillEditor.setText('');
        }
      }
    }
  }
});

/***/ }),
/* 410 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    message: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  mounted: function mounted() {
    document.body.appendChild(this.$el);
  }
});

/***/ }),
/* 411 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_progressbar_js__ = __webpack_require__(432);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_progressbar_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_progressbar_js__);
//
//
//
//
//





var RE_FLOAT = /^\d+(\.\d+)?$/;
var RE_INT = /^\+?[1-9][0-9]*$/;

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    type: {
      type: String,
      default: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* LINE */],
      validator: function validator(val) {
        return val === __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* LINE */] || val === __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CIRCLE */] || val === __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* PATH */];
      }
    },
    color: {
      type: String,
      default: '#555'
    },
    strokeWidth: {
      type: [Number, String],
      default: 1.0,
      validator: function validator(val) {
        return RE_FLOAT.test(val);
      }
    },
    trailColor: {
      type: String,
      default: '#eee'
    },
    trailWidth: {
      type: [Number, String],
      default: 0.5,
      validator: function validator(val) {
        return RE_FLOAT.test(val);
      }
    },
    duration: {
      type: [Number, String],
      default: 800,
      validator: function validator(val) {
        return RE_INT.test(val);
      }
    },
    easing: {
      type: String,
      default: 'linear'
    },
    svgStyle: Object,
    text: Object,
    fill: String,
    from: Object,
    to: Object,
    step: Function,
    options: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },

  data: function data() {
    return {
      progress: undefined
    };
  },
  mounted: function mounted() {
    this.init();
  },
  destroyed: function destroyed() {
    if (this.progress) this.progress.destroy();
  },


  methods: {
    init: function init() {
      var _options = {
        color: this.color,
        strokeWidth: parseFloat(this.strokeWidth),
        trailColor: this.trailColor,
        trailWidth: parseFloat(this.trailWidth),
        duration: parseInt(this.duration),
        easing: this.easing
      };

      if (this.svgStyle) _options.svgStyle = this.svgStyle;
      if (this.text) _options.text = this.text;
      if (this.fill) _options.fill = this.fill;
      if (this.from) _options.from = this.from;
      if (this.to) _options.to = this.to;
      if (this.step) _options.step = this.step;

      var options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* extend */])(_options, this.options || {});

      switch (this.type) {
        case __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CIRCLE */]:
          this.progress = new __WEBPACK_IMPORTED_MODULE_2_progressbar_js__["Circle"](this.$el, options);
          break;
        case __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* PATH */]:
          var paths = this.$el.querySelectorAll('path');
          if (paths.length === 0) throw new Error('[VueProgress Error] Path not found in slot svg.');
          this.progress = new __WEBPACK_IMPORTED_MODULE_2_progressbar_js__["Path"](paths[paths.length - 1], options);
          break;
        default:
          this.progress = new __WEBPACK_IMPORTED_MODULE_2_progressbar_js__["Line"](this.$el, options);
      }
    },


    // Reference to SVG element where progress bar is drawn.
    svg: function svg() {
      return this.progress.svg;
    },


    // Reference to SVG path which presents the actual progress bar.
    path: function path() {
      return this.progress.path;
    },


    // Reference to SVG path which presents the trail of the progress bar. Returns null if trail is not defined.
    trail: function trail() {
      return this.progress.trail;
    },


    // Reference to p element which presents the text label for progress bar. Returns null if text is not defined.
    getText: function getText() {
      return this.progress.text;
    },
    animate: function animate(progress, options, cb) {
      this.progress.animate(progress, options, cb);
    },


    // Sets progress instantly without animation. Clears all animations for path.
    setProgress: function setProgress(progress) {
      this.progress.set(progress);
    },


    // Stops animation to its current position.
    stop: function stop() {
      this.progress.stop();
    },


    // Returns current shown progress from 0 to 1. This value changes when animation is running.
    value: function value() {
      return this.progress.value();
    },


    // Sets text to given a string. If you need to dynamically modify the text element, see .text attribute.
    setText: function setText(text) {
      this.progress.setText(text);
    }
  }
});

/***/ }),
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 421 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 422 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(420)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(407),
  /* template */
  __webpack_require__(444),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/common/components/imageUpload/dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-10f65053", Component.options)
  } else {
    hotAPI.reload("data-v-10f65053", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 437 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(422)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(408),
  /* template */
  __webpack_require__(448),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/common/components/progress/progress.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] progress.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4b1a7b27", Component.options)
  } else {
    hotAPI.reload("data-v-4b1a7b27", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 438 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(409),
  /* template */
  __webpack_require__(451),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/common/components/quillEditor/editor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] editor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7644f6a2", Component.options)
  } else {
    hotAPI.reload("data-v-7644f6a2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 439 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(421)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(410),
  /* template */
  __webpack_require__(445),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-121ae797",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/common/components/toast/toast.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] toast.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-121ae797", Component.options)
  } else {
    hotAPI.reload("data-v-121ae797", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 440 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(411),
  /* template */
  __webpack_require__(450),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/common/components/vue-progress/Progress.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Progress.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-53128380", Component.options)
  } else {
    hotAPI.reload("data-v-53128380", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('modal', {
    attrs: {
      "visible": _vm.visible
    }
  }, [_c('div', {
    staticClass: "tile box is-ancestor is-vertical file-upload-modal has-text-centered",
    staticStyle: {
      "padding": "10px",
      "margin": "0"
    }
  }, [_c('div', {
    staticClass: "tile is-parent is-full is-vertical"
  }, [_c('article', {
    staticClass: "tile is-child file-upload-container"
  }, [_c('file-upload', {
    ref: "upload",
    staticClass: "file-upload",
    class: _vm.file ? 'file-selected' : '',
    attrs: {
      "name": _vm.name,
      "title": _vm.title,
      "drop": true,
      "accept": "image/png, image/jpeg, image/jpg",
      "multiple": false,
      "headers": _vm.headers,
      "data": _vm.data,
      "size": _vm.maxFileSize,
      "timeout": 60000,
      "postAction": _vm.postAction,
      "extensions": ['png', 'jpg', 'jpeg'],
      "events": _vm.uploadEvents
    }
  })], 1)]), _vm._v(" "), (_vm.file) ? _c('div', {
    staticClass: "columns is-full is-gapless is-multiline is-mobile",
    staticStyle: {
      "margin-bottom": "0.5rem"
    }
  }, [_c('div', {
    staticClass: "column has-text-right is-2",
    staticStyle: {
      "margin-right": "0.5rem"
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('upload.filename')) + ":")])]), _vm._v(" "), _c('div', {
    staticClass: "column has-text-left is-9"
  }, [_c('label', {
    staticClass: "field-label"
  }, [_vm._v(_vm._s(_vm.file.name))])]), _vm._v(" "), (_vm.blob) ? _c('div', {
    staticClass: "column has-text-right is-2",
    staticStyle: {
      "margin-right": "0.5rem"
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('upload.filesize')) + ":")])]) : _vm._e(), _vm._v(" "), (_vm.blob) ? _c('div', {
    staticClass: "column has-text-left is-9"
  }, [_c('label', {
    staticClass: "field-label"
  }, [_vm._v(_vm._s(_vm._f("humanReadableSize")(_vm.blob.size)))])]) : _vm._e(), _vm._v(" "), (_vm.active) ? [_c('div', {
    staticClass: "column has-text-right is-2",
    staticStyle: {
      "margin-right": "0.5rem"
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('upload.progress')) + ":")])]), _vm._v(" "), _c('div', {
    staticClass: "column has-text-left is-9"
  }, [_c('div', {
    staticClass: "control",
    staticStyle: {
      "padding-top": "0.375em"
    }
  }, [_c('progress', {
    staticClass: "progress is-small is-info",
    staticStyle: {
      "margin-top": "0.375em"
    },
    attrs: {
      "value": _vm.progress,
      "max": "100"
    }
  }, [_vm._v("\n              " + _vm._s(_vm.progress) + "%\n            ")])])])] : _vm._e()], 2) : _vm._e(), _vm._v(" "), _c('p', {
    staticClass: "is-danger"
  }, [_vm._v(_vm._s(this.errorMessage))]), _vm._v(" "), _c('div', {
    staticClass: "tile is-child is-full has-text-centered"
  }, [_c('a', {
    staticClass: "button is-info",
    class: {
      'is-disabled': !_vm.blob, 'is-loading': _vm.active
    },
    attrs: {
      "disabled": !_vm.blob
    },
    on: {
      "click": _vm.uploadBlob
    }
  }, [_c('span', {
    staticClass: "icon image-icon icon-upload"
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('upload.title')))])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-10f65053", module.exports)
  }
}

/***/ }),
/* 445 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.visible) ? _c('div', {
    staticClass: "fv-toast-wrapper"
  }, [_c('div', {
    staticClass: "fv-toast-body"
  }, [_c('span', [_vm._v(_vm._s(_vm.message))])])]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-121ae797", module.exports)
  }
}

/***/ }),
/* 446 */,
/* 447 */,
/* 448 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "-progress-box-container"
  }, [_c('div', {
    staticClass: "-progress-box-mask"
  }), _vm._v(" "), _c('div', {
    staticClass: "-progress-box"
  }, [_c('progress-bar', {
    ref: "circle",
    attrs: {
      "type": "circle",
      "options": _vm.options
    }
  })], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4b1a7b27", module.exports)
  }
}

/***/ }),
/* 449 */,
/* 450 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._t("svg")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-53128380", module.exports)
  }
}

/***/ }),
/* 451 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    attrs: {
      "id": "toolbar"
    }
  }, [_c('button', {
    staticClass: "ql-bold"
  }), _vm._v(" "), _c('button', {
    staticClass: "ql-italic"
  }), _vm._v(" "), (_vm.fullFeatured) ? [_c('button', {
    staticClass: "ql-underline"
  }), _vm._v(" "), _c('button', {
    staticClass: "ql-strike"
  }), _vm._v(" "), _c('button', {
    staticClass: "ql-indent",
    attrs: {
      "value": "+1"
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "ql-indent",
    attrs: {
      "value": "-1"
    }
  })] : _vm._e(), _vm._v(" "), (_vm.fullFeatured) ? [_vm._m(0), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm._m(2), _vm._v(" "), _c('button', {
    staticClass: "ql-list",
    attrs: {
      "value": "ordered"
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "ql-list",
    attrs: {
      "value": "bullet"
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "ql-script",
    attrs: {
      "value": "sub"
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "ql-script",
    attrs: {
      "value": "super"
    }
  })] : _vm._e(), _vm._v(" "), _c('button', {
    staticClass: "fv-ql-image",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$emit('image', _vm.quillEditor)
      }
    }
  }, [_c('svg', {
    attrs: {
      "viewBox": "0 0 18 18"
    }
  }, [_c('rect', {
    staticClass: "ql-stroke",
    attrs: {
      "height": "10",
      "width": "12",
      "x": "3",
      "y": "4"
    }
  }), _vm._v(" "), _c('circle', {
    staticClass: "ql-fill",
    attrs: {
      "cx": "6",
      "cy": "7",
      "r": "1"
    }
  }), _vm._v(" "), _c('polyline', {
    staticClass: "ql-even ql-fill",
    attrs: {
      "points": "5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
    }
  })])])], 2), _vm._v(" "), _c('div', {
    ref: "quill",
    staticClass: "quill-editor"
  })])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('select', {
    staticClass: "ql-size"
  }, [_c('option', {
    attrs: {
      "value": "small"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "selected": ""
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "large"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "huge"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('select', {
    staticClass: "ql-header"
  }, [_c('option', {
    attrs: {
      "value": "1"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "2"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "3"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "4"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "5"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "6"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "selected": ""
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('select', {
    staticClass: "ql-color"
  }, [_c('option', {
    attrs: {
      "selected": "selected"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#e60000"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#ff9900"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#ffff00"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#008a00"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#0066cc"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#9933ff"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#ffffff"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#facccc"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#ffebcc"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#ffffcc"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#cce8cc"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#cce0f5"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#ebd6ff"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#bbbbbb"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#f06666"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#ffc266"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#ffff66"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#66b966"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#66a3e0"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#c285ff"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#888888"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#a10000"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#b26b00"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#b2b200"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#006100"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#0047b2"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#6b24b2"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#444444"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#5c0000"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#663d00"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#666600"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#003700"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#002966"
    }
  }), _vm._v(" "), _c('option', {
    attrs: {
      "value": "#3d1466"
    }
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7644f6a2", module.exports)
  }
}

/***/ }),
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  ok: '确认',
  cancel: '取消',
  add: '添加',
  delete: '删除',
  close: '关闭',
  save: '保存',
  update: '修改',
  return: '返回',
  tip: '提示',

  bind: '绑定',
  camera: '拍照',
  photoLib: '从照片库选取',
  upload: '上传',
  noMoreData: '没有更多数据啦',
  confirmDelete: '是否确认删除'
});

/***/ }),
/* 485 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  filename: '文件名',
  filesize: '文件大小',
  progress: '上传进度',
  speed: '上传速率',
  title: '上传',
  hint: '点击, 或拖动图片至此处',
  fileIsTooLarge: '文件太大了，图片文件不能超过{maxFileSize}',
  invalidFileType: '错误的文件类型: {fileType}',
  imgShouldBeSquare: '图片必须为正方形',
  imgWidthShouldGreaterThan: '图片的宽度不得小于{minWidth}',
  invalidImageRatio: '图片的长宽比为: {ratio}, 要求的长宽比为: {requiredRatio}',
  uploadImage: '上传图片'
});

/***/ }),
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mutation_types__ = __webpack_require__(184);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var state = {
  indexItems: [{
    path: '/admin/index',
    meta: {
      icon: 'fa-bars',
      level: '1,2,3,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.appList')
    }
  }, {
    path: '/admin/settings',
    meta: {
      icon: 'fa-cog',
      level: '1,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.settings')
    }
  }],
  items: [{
    path: '/admin/app/:appId/dashboard',
    meta: {
      icon: 'fa-tachometer',
      level: '1,2,3,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.dashboard')
    }
  }, {
    path: '/admin/app/:appId/config/',
    meta: {
      icon: 'fa-bars',
      level: '1,2,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.appConfig')
    }
  }, {
    meta: {
      must: 'restrict_login',
      icon: 'fa-flag',
      level: '1,2,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.stats'),
      expanded: false
    },

    children: [{
      name: 'StatsByDay',
      path: '/admin/app/:appId/statsByDay',
      meta: {
        icon: 'fa-sun-o',
        level: '1,2,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.statsByDay')
      }
    }, {
      name: 'StatsRetained',
      path: '/admin/app/:appId/statsRetained',
      meta: {
        icon: 'fa-retweet',
        level: '1,2,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.statsRetained')
      }
    }, {
      name: 'StatsDevice',
      path: '/admin/app/:appId/statsDevice',
      meta: {
        icon: 'fa-retweet',
        level: '1,2,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.statsDevice')
      }
    }, {
      name: 'StatsTiming',
      path: '/admin/app/:appId/statsTiming',
      meta: {
        icon: 'fa-clock-o',
        level: '1,2,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.statsTiming')
      }
    }]
  }, {
    path: '/admin/app/:appId/users',
    meta: {
      icon: 'fa-user',
      level: '1,2,3,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.userManage')
    }
  }, {
    meta: {
      must: 'restrict_login',
      icon: 'fa-registered',
      level: '1,2,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.loginCode'),
      expanded: false
    },

    children: [{
      name: 'LoginCodes',
      path: '/admin/app/:appId/loginCodes',
      meta: {
        icon: 'fa-registered',
        level: '1,2,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.loginCodeManage')
      }
    }, {
      name: 'MyLoginCodes',
      path: '/admin/app/:appId/myLoginCodes',
      meta: {
        icon: 'fa-registered',
        level: '1,2,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.myLoginCodes')
      }
    }]
  }, {
    meta: {
      must: 'restrict_login',
      icon: 'fa-wechat',
      level: '1,2,3,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.wechatPublic'),
      expanded: false
    },

    children: [{
      name: 'WcpParams',
      path: '/admin/app/:appId/wcpParams',
      meta: {
        icon: 'fa-registered',
        level: '1,2,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.wcpConfig')
      }
    }, {
      name: 'WcpMenu',
      path: '/admin/app/:appId/wcpMenu',
      meta: {
        level: '1,2,3,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.wcpMenu')
      }
    }, {
      name: 'WcpRules',
      path: '/admin/app/:appId/wcpRules',
      meta: {
        level: '1,2,3,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.wcpRules')
      }
    }, {
      name: 'WcpMessages',
      path: '/admin/app/:appId/wcpMessages',
      meta: {
        level: '1,2,3,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.wcpMessages')
      }
    }]
  }, {
    path: '/admin/app/:appId/orders',
    meta: {
      icon: 'fa-money',
      level: '1,2,3,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.orderManage')
    }
  }, {
    path: '/admin/app/:appId/editforum',
    meta: {
      must: 'has_forum',
      icon: 'fa-twitch',
      level: '1,2,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.forumManage')
    }
  }, {
    path: '/admin/app/:appId/editmall',
    meta: {
      must: 'has_mall',
      icon: 'fa-shopping-bag',
      level: '1,2,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.appMalls')
    }
  }, {
    meta: {
      must: 'has_mall',
      icon: 'fa-shopping-bag',
      level: '1,2,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.pointsMall'),
      expanded: false
    },
    children: [{
      name: 'PointLog',
      path: '/admin/app/:appId/pointLog',
      meta: {
        level: '1,2,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.pointLog')
      }
    }, {
      name: 'PointGoods',
      path: '/admin/app/:appId/pointGoods',
      meta: {
        level: '1,2,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.pointGoods')
      }
    }, {
      name: 'PointOrder',
      path: '/admin/app/:appId/pointOrder',
      meta: {
        level: '1,2,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.pointOrder')
      }
    }]
  }, {
    meta: {
      must: 'has_mall',
      icon: 'fa-tasks',
      level: '1,2,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.pointTasks'),
      expanded: false
    },
    children: [{
      name: 'PointSetting',
      path: '/admin/app/:appId/pointSetting',
      meta: {
        icon: 'fa-registered',
        level: '1,2,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.pointSetting')
      }
    }, {
      name: 'PointTaskbar',
      path: '/admin/app/:appId/pointTaskbar',
      meta: {
        level: '1,2,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.pointTaskbar')
      }
    }, {
      name: 'PointDaySign',
      path: '/admin/app/:appId/pointDaySign',
      meta: {
        level: '1,2,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.pointDaySign')
      }
    }, {
      name: 'PointDayQuestion',
      path: '/admin/app/:appId/pointDayQuestion',
      meta: {
        level: '1,2,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.pointDayQuestion')
      }
    }, {
      name: 'PointRoulette',
      path: '/admin/app/:appId/pointRoulette',
      meta: {
        level: '1,2,',
        label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.pointRoulette')
      }
    }]
  }, {
    path: '/admin/app/:appId/activity',
    meta: {
      icon: 'fa-joomla',
      level: '1,2,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.activityInfo')
    }
  }, {
    path: '/admin/app/:appId/notice',
    meta: {
      icon: 'fa-bullhorn',
      level: '1,2,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.noticeInfo')
    }
  }, {
    path: '/admin/app/:appId/news',
    meta: {
      icon: 'fa-newspaper-o',
      level: '1,2,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.newsInfo')
    }
  }, {
    path: '/admin/app/:appId/faq/',
    meta: {
      icon: 'fa-comments',
      level: '1,2,3,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.customerService')
    }
  }, {
    path: '/admin/app/:appId/setting',
    meta: {
      icon: 'fa-cog',
      level: '1,2,',
      label: __WEBPACK_IMPORTED_MODULE_0_admin_vue_i18n__["a" /* i18n */].t('admin.menu.settings')
    }
  }]
};

var mutations = _defineProperty({}, __WEBPACK_IMPORTED_MODULE_1__mutation_types__["b" /* EXPAND_MENU */], function (state, menuItem) {
  if (menuItem.index > -1) {
    if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
      state.items[menuItem.index].meta.expanded = menuItem.expanded;
    }
  } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
    menuItem.item.meta.expanded = menuItem.expanded;
  }
});

/* harmony default export */ __webpack_exports__["a"] = ({
  state: state,
  mutations: mutations
});

/***/ }),
/* 564 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HorizontalBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Pie; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__);


var HorizontalBar = __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["HorizontalBar"].extend({
  props: ['data', 'options'],
  mounted: function mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options);
  },

  watch: {
    'data': function data(val) {
      this._chart.data = val;
      this._chart.update();
    }
  }
});

var Bar = __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["Bar"].extend({
  props: ['data', 'options'],
  mounted: function mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options);
  },

  watch: {
    'data': function data(val) {
      this._chart.data = val;
      this._chart.update();
    }
  }
});

var Pie = __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["Pie"].extend({
  props: ['data', 'options'],
  mounted: function mounted() {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options);
  },

  watch: {
    'data': function data(val) {
      this._chart.data = val;
      this._chart.update();
    }
  },
  methods: {
    update: function update() {
      this._chart.update();
    }
  }
});



/***/ }),
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */,
/* 602 */,
/* 603 */,
/* 604 */,
/* 605 */,
/* 606 */,
/* 607 */,
/* 608 */,
/* 609 */,
/* 610 */,
/* 611 */,
/* 612 */,
/* 613 */,
/* 614 */,
/* 615 */,
/* 616 */,
/* 617 */,
/* 618 */,
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */,
/* 623 */,
/* 624 */,
/* 625 */,
/* 626 */,
/* 627 */,
/* 628 */,
/* 629 */,
/* 630 */,
/* 631 */,
/* 632 */,
/* 633 */,
/* 634 */,
/* 635 */,
/* 636 */,
/* 637 */,
/* 638 */,
/* 639 */,
/* 640 */,
/* 641 */,
/* 642 */,
/* 643 */,
/* 644 */,
/* 645 */,
/* 646 */,
/* 647 */,
/* 648 */,
/* 649 */,
/* 650 */,
/* 651 */,
/* 652 */,
/* 653 */,
/* 654 */,
/* 655 */,
/* 656 */,
/* 657 */,
/* 658 */,
/* 659 */,
/* 660 */,
/* 661 */,
/* 662 */,
/* 663 */,
/* 664 */,
/* 665 */,
/* 666 */,
/* 667 */,
/* 668 */,
/* 669 */,
/* 670 */,
/* 671 */,
/* 672 */,
/* 673 */,
/* 674 */,
/* 675 */,
/* 676 */,
/* 677 */,
/* 678 */,
/* 679 */,
/* 680 */,
/* 681 */,
/* 682 */,
/* 683 */,
/* 684 */,
/* 685 */,
/* 686 */,
/* 687 */,
/* 688 */,
/* 689 */,
/* 690 */,
/* 691 */,
/* 692 */,
/* 693 */,
/* 694 */,
/* 695 */,
/* 696 */,
/* 697 */,
/* 698 */,
/* 699 */,
/* 700 */,
/* 701 */,
/* 702 */,
/* 703 */,
/* 704 */,
/* 705 */,
/* 706 */,
/* 707 */,
/* 708 */,
/* 709 */,
/* 710 */,
/* 711 */,
/* 712 */,
/* 713 */,
/* 714 */,
/* 715 */,
/* 716 */,
/* 717 */,
/* 718 */,
/* 719 */,
/* 720 */,
/* 721 */,
/* 722 */,
/* 723 */,
/* 724 */,
/* 725 */,
/* 726 */,
/* 727 */,
/* 728 */,
/* 729 */,
/* 730 */,
/* 731 */,
/* 732 */,
/* 733 */,
/* 734 */,
/* 735 */,
/* 736 */,
/* 737 */,
/* 738 */,
/* 739 */,
/* 740 */,
/* 741 */,
/* 742 */,
/* 743 */,
/* 744 */,
/* 745 */,
/* 746 */,
/* 747 */,
/* 748 */,
/* 749 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(908),
  /* template */
  __webpack_require__(1672),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/setting/basicInfoEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] basicInfoEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bc109818", Component.options)
  } else {
    hotAPI.reload("data-v-bc109818", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 750 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(918),
  /* template */
  __webpack_require__(1639),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/adminUsers.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] adminUsers.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-74d9c56a", Component.options)
  } else {
    hotAPI.reload("data-v-74d9c56a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 751 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1183)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(919),
  /* template */
  __webpack_require__(1623),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/config/basicInfoEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] basicInfoEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-689d2a8e", Component.options)
  } else {
    hotAPI.reload("data-v-689d2a8e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 752 */,
/* 753 */,
/* 754 */,
/* 755 */,
/* 756 */,
/* 757 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_vue_i18n__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_axios__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_nprogress__ = __webpack_require__(1696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_nprogress___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vue_nprogress__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuex_router_sync__ = __webpack_require__(1697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuex_router_sync___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_vuex_router_sync__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vue_i18n__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vuelidate__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vuelidate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_vuelidate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_vue_dragula__ = __webpack_require__(1355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_vue_dragula___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_vue_dragula__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_vue_js_toggle_button__ = __webpack_require__(1356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_vue_js_toggle_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_vue_js_toggle_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_vue_clipboard2__ = __webpack_require__(1354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_vue_clipboard2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_vue_clipboard2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_element_ui__ = __webpack_require__(1142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_element_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_element_ui_lib_theme_default_index_css__ = __webpack_require__(1156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_element_ui_lib_theme_default_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_element_ui_lib_theme_default_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__App_vue__ = __webpack_require__(1357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__router__ = __webpack_require__(808);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__store__ = __webpack_require__(811);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__serverApi__ = __webpack_require__(809);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_common_js_date__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_common_js_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_common_js_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_common_js_filters__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__store_mutation_types__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_common_components_quillEditor__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_common_components_quillEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21_common_components_quillEditor__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




























__webpack_require__(1158);

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_7_vue_i18n__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_8_vuelidate___default.a);
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_4_vue_axios___default.a, __WEBPACK_IMPORTED_MODULE_3_axios___default.a);
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_5_vue_nprogress___default.a);
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_17__serverApi__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_9_vue_dragula___default.a);
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_21_common_components_quillEditor___default.a);
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_10_vue_js_toggle_button___default.a);
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_11_vue_clipboard2___default.a);
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_12_element_ui___default.a);

__WEBPACK_IMPORTED_MODULE_3_axios___default.a.defaults.headers.common['x-csrf-token'] = window.acsConfig.csrfToken;

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_vuex_router_sync__["sync"])(__WEBPACK_IMPORTED_MODULE_16__store__["a" /* default */], __WEBPACK_IMPORTED_MODULE_15__router__["a" /* default */]);

var nprogress = new __WEBPACK_IMPORTED_MODULE_5_vue_nprogress___default.a({ parent: '.nprogress-container' });
var state = __WEBPACK_IMPORTED_MODULE_16__store__["a" /* default */].state;


__WEBPACK_IMPORTED_MODULE_15__router__["a" /* default */].beforeEach(function (route, redirect, next) {
  if (state.main.device.isMobile && state.main.sidebar.opened) {
    __WEBPACK_IMPORTED_MODULE_16__store__["a" /* default */].commit(__WEBPACK_IMPORTED_MODULE_20__store_mutation_types__["a" /* TOGGLE_SIDEBAR */], false);
  }
  if (route.params && route.params.appId) {
    __WEBPACK_IMPORTED_MODULE_3_axios___default.a.defaults.headers.common['acs-app-id'] = route.params.appId;
  } else if (__WEBPACK_IMPORTED_MODULE_3_axios___default.a.defaults.headers.common['acs-app-id']) {
    delete __WEBPACK_IMPORTED_MODULE_3_axios___default.a.defaults.headers.common['acs-app-id'];
  }
  next();
});

Object.keys(__WEBPACK_IMPORTED_MODULE_19_common_js_filters__).forEach(function (key) {
  console.log('add filter: ' + key);
  __WEBPACK_IMPORTED_MODULE_1_vue___default.a.filter(key, __WEBPACK_IMPORTED_MODULE_19_common_js_filters__[key]);
});

var app = new __WEBPACK_IMPORTED_MODULE_1_vue___default.a(_extends({
  i18n: __WEBPACK_IMPORTED_MODULE_2_admin_vue_i18n__["a" /* i18n */],
  router: __WEBPACK_IMPORTED_MODULE_15__router__["a" /* default */],
  store: __WEBPACK_IMPORTED_MODULE_16__store__["a" /* default */],
  nprogress: nprogress
}, __WEBPACK_IMPORTED_MODULE_14__App_vue___default.a));

app.$mount('#app');

/***/ }),
/* 758 */,
/* 759 */,
/* 760 */,
/* 761 */,
/* 762 */,
/* 763 */,
/* 764 */,
/* 765 */,
/* 766 */,
/* 767 */,
/* 768 */,
/* 769 */,
/* 770 */,
/* 771 */,
/* 772 */,
/* 773 */,
/* 774 */,
/* 775 */,
/* 776 */,
/* 777 */,
/* 778 */,
/* 779 */,
/* 780 */,
/* 781 */,
/* 782 */,
/* 783 */,
/* 784 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__);


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["Bar"].extend({
  props: {
    options: {
      default: {}
    },
    width: {
      default: '100%',
      type: String
    }
  },

  mounted: function mounted() {
    this.gradient = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);
    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(145, 67, 204, 0.46)");

    this.gradient2 = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);
    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

    this.renderChart({
      labels: [],
      datasets: [{
        label: '',
        borderColor: '#05CBE1',
        pointBackgroundColor: 'white',
        pointBorderColor: 'white',
        borderWidth: 1,
        backgroundColor: this.gradient2,
        data: []
      }]
    }, this.options);
  },

  methods: {
    updateChart: function updateChart(data) {
      if (this._chart) {
        this._chart.data.labels = data.labels;
        for (var i = 0; i <= 1; ++i) {
          if (data.datasets[i]) {
            this._chart.data.datasets[i].label = data.datasets[i].label;
            this._chart.data.datasets[i].data = data.datasets[i].data;
          }
        }
        this._chart.update();
      }
    }
  }
}));

/***/ }),
/* 785 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__);


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["Line"].extend({
  props: {
    options: {
      default: {}
    },
    width: {
      default: '100%',
      type: String
    }
  },

  mounted: function mounted() {
    this.gradient = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);
    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(145, 67, 204, 0.46)");

    this.gradient2 = this.$refs.canvas.getContext("2d").createLinearGradient(0, 0, 0, 450);
    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

    this.renderChart({
      labels: [],
      datasets: [{
        label: '',
        borderColor: '#FC2525',
        pointBackgroundColor: 'white',
        borderWidth: 1,
        pointBorderColor: 'white',
        backgroundColor: this.gradient,
        data: []
      }, {
        label: '',
        borderColor: '#05CBE1',
        pointBackgroundColor: 'white',
        pointBorderColor: 'white',
        borderWidth: 1,
        backgroundColor: this.gradient2,
        data: []
      }]
    }, this.options);
  },

  methods: {
    updateChart: function updateChart(data) {
      if (this._chart) {
        this._chart.data.labels = data.labels;
        for (var i = 0; i <= 1; ++i) {
          if (data.datasets[i]) {
            this._chart.data.datasets[i].label = data.datasets[i].label;
            this._chart.data.datasets[i].data = data.datasets[i].data;
          }
        }
        this._chart.update();
      }
    }
  }
}));

/***/ }),
/* 786 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_chartjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__);


/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue_chartjs__["Line"].extend({
  props: {
    options: {
      default: function _default() {
        return {};
      }
    },
    width: {
      default: '100%',
      type: String
    }
  },

  mounted: function mounted() {
    this.renderChart({
      labels: [],
      datasets: [{
        label: '',
        borderColor: '#FC2525',
        borderWidth: 1,
        pointStyle: 'cross',
        pointRadius: 1,
        pointHitRadius: 2,
        data: []
      }, {
        label: '',
        borderColor: '#05CBE1',
        pointRadius: 1,
        pointHitRadius: 2,
        pointStyle: 'cross',
        borderWidth: 1,
        data: []
      }, {
        label: '',
        borderColor: '#56E437',
        pointRadius: 1,
        pointHitRadius: 2,
        pointStyle: 'cross',
        borderWidth: 1,
        data: []
      }]
    }, this.options);
  },

  methods: {
    updateChart: function updateChart(data) {
      if (this._chart) {
        this._chart.data.labels = data.labels;
        for (var i = 0; i <= 2; ++i) {
          if (data.datasets[i]) {
            this._chart.data.datasets[i].label = data.datasets[i].label;
            this._chart.data.datasets[i].data = data.datasets[i].data;
          }
        }
        this._chart.update();
      }
    },

    addData: function addData(label, data, n) {
      if (this._chart && this._chart.data && this._chart.data.labels) {
        if (this._chart.data.labels[this._chart.data.labels.length - 1] != label) {
          this._chart.data.labels.push(label);
          if (this._chart.data.labels.length > n) {
            this._chart.data.labels.shift();
          }
          for (var i = 0; i < data.length; ++i) {
            if (this._chart.data.datasets[i]) {
              this._chart.data.datasets[i].data.push(data[i]);
              if (this._chart.data.datasets[i].data.length > n) {
                this._chart.data.datasets[i].data.shift();
              }
            }
          }
          this._chart.update();
        }
      }
    }
  }
}));

/***/ }),
/* 787 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return showTipBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var TipBox = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(1368));

var showTipBox = function showTipBox() {
  var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    visible: true
  };

  var instance = new TipBox({
    el: document.createElement('div'),
    propsData: propsData
  });
};

/***/ }),
/* 788 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Navbar_vue__ = __webpack_require__(1374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Navbar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Navbar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Sidebar_vue__ = __webpack_require__(1375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Sidebar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Sidebar_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppMain_vue__ = __webpack_require__(1371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AppMain_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__AppMain_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FooterBar_vue__ = __webpack_require__(1372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__FooterBar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__FooterBar_vue__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Navbar_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__Sidebar_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__AppMain_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__FooterBar_vue___default.a; });










/***/ }),
/* 789 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);

var detail = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(1381));

/* harmony default export */ __webpack_exports__["a"] = ({
  show: function show(id) {
    new detail({
      el: document.createElement('div'),
      propsData: {
        visible: true,
        id: id
      }
    });
  }
});

/***/ }),
/* 790 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__zh_hans__ = __webpack_require__(807);


/* harmony default export */ __webpack_exports__["a"] = ({
  'zh-hans': __WEBPACK_IMPORTED_MODULE_0__zh_hans__["a" /* default */]
});

/***/ }),
/* 791 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  basicInfo: '应用配置',
  sdkInfo: 'SDK接入',
  goodsInfo: '商品配置',
  linkInfo: '应用链接',
  add: '添加新应用',
  loginCodeds: '激活码管理',
  wechatPub: '公众号管理',
  dau: '日活跃用户数',
  dad: '日活跃设备',
  danu: '新增用户数',
  dand: '新增设备',
  dapu: '日付费用户数',
  danpu: '新增付费用户',
  totalFee: '充值流水',
  paidUserNumber: '付费用户数',

  totalCodes: '已生成',
  availableCodes: '剩余',
  assignedCodes: '已分配',
  usedCodes: '已使用',
  genCodes: '生成',
  delCodes: '删除',
  assignCodes: '分配',
  searchCodes: '搜索',
  searchCodesPlaceholder: '输入激活码',
  myLoginCodes: '我的激活码',

  goods: {
    icon: '商品图片',
    id: '商品ID',
    name: '商品名称',
    description: '商品简介',
    price: '商品价格',
    productIds: '产品ID',
    productId: '产品ID',
    add: '添加新商品'
  },

  message: {
    appIconUpdated: '应用『{appName}』图标更新成功',
    goodsIconUpdated: '商品『{goodsName}』图标更新成功',
    tooSmallCodesGenNumber: '生成激活码个数不得小于100个',
    invalidLoginCodesDelNumber: '删除的激活码个数必须在0~{max}范围之内',
    invalidLoginCodesAssignNumber: '分配的激活码个数必须在0~{max}范围之内, 每个管理员账户最多只能分配100个激活码',
    genLoginCodesSuccess: '已成功生成{number}个激活码!',
    delLoginCodesSuccess: '已成功删除{number}个激活码!',
    assignLoginCodesSuccess: '已成功为您分配{number}个激活码!'
  }
});

/***/ }),
/* 792 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  tabTitle: '问题反馈',
  questionField: {
    id: '编号',
    avatar: '头像',
    nickname: '用户昵称',
    title: '反馈问题',
    answer: '是否回复',
    isHot: '是否热门',
    active: '是否显示',
    insertedAt: '添加时间',
    replyAt: '回复时间'
  },
  replyForm: {
    name: '编辑回复',
    replyPlaceholder: '请输入回复内容'
  },
  messages: {
    confirmDeleteQuestion: '您确定要删除『{title}』么?',
    questionDeleted: '问题『{title}』已成功删除'
  }
});

/***/ }),
/* 793 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  enterForum: '论坛配置',
  basicInfo: '基本信息',
  sectionInfo: '版块配置',

  id: '编号',
  title: '标题',
  content: '内容',
  pic: '题图',
  edit: '修改',
  delete: '删除',
  created_at: '创建时间',
  active: '是否启用',
  not_open: '论坛尚未开通, 请联系系统管理员',

  section: {
    title: '版块名称',
    sort: '版块排序',
    add: '添加新版块'
  }
});

/***/ }),
/* 794 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sdks__ = __webpack_require__(802);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app__ = __webpack_require__(791);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__news__ = __webpack_require__(797);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu__ = __webpack_require__(796);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__forum__ = __webpack_require__(793);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mall__ = __webpack_require__(795);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__user__ = __webpack_require__(805);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routes__ = __webpack_require__(801);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__setting__ = __webpack_require__(803);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__operateLog__ = __webpack_require__(799);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__stats__ = __webpack_require__(804);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__customerService__ = __webpack_require__(792);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__notification__ = __webpack_require__(798);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__wcp__ = __webpack_require__(806);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__point__ = __webpack_require__(800);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_common_i18n_zh_hans_error__ = __webpack_require__(391);

















/* harmony default export */ __webpack_exports__["a"] = ({
  admin: '管理后台',
  firevalePlatform: '火谷平台',
  showDetail: '查看详情',
  enterManage: '进入管理',
  edit: '编辑',
  editConfig: '修改配置',
  submit: '提交修改',
  cancel: '取消',
  next: '下一页',
  previous: '上一页',
  operateSuccess: '操作成功',
  switchOn: '开启',
  switchOff: '关闭',
  copy: '拷贝',

  label: {
    appId: '应用ID(APP ID)',
    appKey: '应用秘钥(APP KEY)',
    appName: '应用名称',
    appManager: '应用管理员',
    appCustomerService: '应用客服',
    appHasForum: '是否启用论坛',
    appHasMall: '是否启用商城',
    appRestrictLogin: '激活码登录',
    appCanAssignCode: '激活码领取',
    wcpDownloadEnabled: '公众号下载',
    currency: '商品定价货币',
    chaoxinGroupId: '超信运营群号',
    paymentCallbackUrl: '充值回调地址',
    obtainCodeUrl: '激活码领取地址',
    publicWeixinName: '微信公众号名称',
    publicWeixinUrl: '微信公众号链接',
    weiboName: '微博名称',
    weiboUrl: '微博链接',
    baiduTiebaName: '百度贴吧名称',
    baiduTiebaUrl: '百度贴吧链接',
    forumName: '论坛名称',
    forumUrl: '论坛链接',
    websiteName: '主页名称',
    websiteUrl: '主页链接',
    csPhoneNumber: '客服电话',
    cpOrderId: 'CP订单号',
    transactionId: '交易ID',
    userId: '用户ID',
    createdAt: '创建时间',
    paidAt: '支付时间',
    deliveredAt: '发货时间',
    forumId: '论坛ID',
    forumAppId: '应用ID(APP ID)',
    forumTitle: '论坛名称',
    forumActive: '是否启用',
    forumCreatedAt: '创建时间',
    keyword: '敏感词'
  },

  currency: {
    CNY: '人民币',
    HKD: '港币',
    USD: '美元',
    undefined: '货币未设置'
  },

  status: {
    TRUE: '启用',
    FALSE: '禁用'
  },

  titles: {
    upload: '拖拽文件以上传',
    selectSdk: '请选择要添加的SDK:',
    editSdkInfo: '编辑{sdk}接入参数',
    editGoodsInfo: '编辑应用『{appName}』商品信息',
    editSectionInfo: '编辑论坛版块信息',
    editSettingInfo: '编辑配置信息',
    addAppManager: '添加应用管理员',
    addAppCustomerService: '添加应用客服',
    deleteSuccess: '删除成功',
    uploadGoodsIcon: '拖动正方形PNG图片到此(边长 >= 128)',
    uploadAppIcon: '拖动正方形PNG图片到此(边长 >= 128)',
    uploadForumIcon: '修改论坛『{forumName}』的图标',
    uploadMallIcon: '修改商城『{mallName}』的图标',
    editGoodsProductId: '编辑商品『{goodsName}』在『{sdk}』渠道的产品ID',
    ok: '确认',
    cancel: '取消',
    warning: '警告',
    searchOrders: '输入用户ID/订单号搜索',
    searchMallOrders: '输入用户ID/订单号/用户姓名/手机号搜索',
    searchGoods: '搜索商品名称',
    searchUsers: '输入用户ID/昵称、APP用户ID/角色名',
    searchAdminUsers: '输入火谷邮件账号(如: xxx@firevale.com)搜索',
    oops: '哦噢。。。',
    noOrderToDisplay: '当前没有任何可以显示的订单',
    noGoodsToDisplay: '当前没有任何商品',
    noUserToDisplay: '当前没有任何可以显示的用户',
    loading: '正在加载数据...',
    editActivityInfo: '编辑活动信息',
    editNoticeInfo: '编辑公告信息',
    editNewsInfo: '编辑新闻信息',
    uploadNewsPic: '修改题图(640X260, JPG或PNG)',
    uploadGoodsPic: '修改商品题图(400X400大小的png图)',
    yes: '是',
    no: '否',
    noData: '暂无数据',
    noMoreData: '没有更多数据啦',
    uploadWcpFile: '上传验证文件'
  },

  messages: {
    confirmDeleteGoods: '您确定要删除商品『{goodsName}』么?',
    confirmDeleteSection: '您确定要禁用该论坛版块么?',
    confirmDeleteSetting: '您确定要删除该配置项么?',
    confirmDeleteNews: '您确定要删除该内容么?',
    confirmPublishNews: '您确定要发布该内容么?',
    confirmUnPublishNews: '您确定要取消发布该内容么?',
    confirmDeleteMallGoods: '您确定要删除该商品么?',
    confirmPublishGoods: '您确定要发布该商品么?',
    confirmUnPublishGoods: '您确定要下架该商品么?',
    confirmDeleteAppManager: '您确定要删除应用管理员『{nickName}』么?',
    confirmDeleteCustomerService: '您确定要删除应用客服『{nickName}』么?',
    copyClipboardSuccess: '已拷贝到剪贴板',
    confirmDeleteRule: '您确定要删除自定义回复么?',
    confirmDeleteMessage: '您确定要删除消息记录么?'
  },

  serverSuccess: {
    updated: '更新成功',
    appUpdated: '应用更新成功',
    forumUpdated: '论坛更新成功',
    mallUpdated: '商城更新成功'
  },

  app: __WEBPACK_IMPORTED_MODULE_1__app__["a" /* default */],
  routes: __WEBPACK_IMPORTED_MODULE_7__routes__["a" /* default */],
  menu: __WEBPACK_IMPORTED_MODULE_3__menu__["a" /* default */],
  forum: __WEBPACK_IMPORTED_MODULE_4__forum__["a" /* default */],
  mall: __WEBPACK_IMPORTED_MODULE_5__mall__["a" /* default */],
  user: __WEBPACK_IMPORTED_MODULE_6__user__["a" /* default */],
  news: __WEBPACK_IMPORTED_MODULE_2__news__["a" /* default */],
  sdks: __WEBPACK_IMPORTED_MODULE_0__sdks__["a" /* default */],
  setting: __WEBPACK_IMPORTED_MODULE_8__setting__["a" /* default */],
  operateLog: __WEBPACK_IMPORTED_MODULE_9__operateLog__["a" /* default */],
  stats: __WEBPACK_IMPORTED_MODULE_10__stats__["a" /* default */],
  wcp: __WEBPACK_IMPORTED_MODULE_13__wcp__["a" /* default */],
  point: __WEBPACK_IMPORTED_MODULE_14__point__["a" /* default */],
  customerService: __WEBPACK_IMPORTED_MODULE_11__customerService__["a" /* default */],
  notification: __WEBPACK_IMPORTED_MODULE_12__notification__["a" /* default */],
  error: __WEBPACK_IMPORTED_MODULE_15_common_i18n_zh_hans_error__["a" /* default */]
});

/***/ }),
/* 795 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  basicInfo: '基本信息',
  goodsInfo: '商品管理',
  orderInfo: '订单管理',
  not_open: '商城尚未开通, 请联系系统管理员',

  id: '编号',
  title: '标题',
  appId: 'APP编号',
  pic: '题图',
  edit: '修改',
  delete: '删除',
  created_at: '创建时间',
  active: '是否启用',
  addSuccess: '添加成功',
  updateSuccess: '更新成功',
  notExist: '商品不存在',
  sameGoodsIdExist: '商品编号已存在，请重新输入',
  soldCanNotDelete: '该商品已销售不可删除',

  goods: {
    edit: '编辑',
    delete: '删除',
    publish: '发布',
    unPublish: '下架',
    save: '保存',
    id: '编号',
    name: '名称',
    add: '添加新商品',
    pic: '商品图片',
    description: '商品详情',
    price: '单价',
    postage: '邮费',
    stock: '库存',
    currency: '货币',
    is_virtual: '虚拟商品',
    time: '时间',
    begin_time: '开始时间',
    end_time: '结束时间',
    pleaseFill: '请完整填写各项内容',
    pleaseUpPic: '请上传商品图片',
    picPlaceholder: '图片为正方形，支持jpg、png格式，大小不超过500k；',
    namePlaceholder: '不超过50个字节',
    descPlaceholder: '文字不超过8000个字节，图片支持jpg,png格式，大小不超过200k;',
    priceList: '单价：{price} / 邮费: {postage}',
    stockList: '库存：{stock} / 销量: {sold}',
    saveFirst: '请先保存商品',
    up: '已上架',
    down: '已下架'
  },
  order: {
    buttons: {
      viewDetail: '查看详情',
      payed: '己付款',
      refund: '取消并退款'
    },
    messages: {
      opSuccess: '操作成功',
      opFailed: '操作失败',
      onlyCancelOrUnpay: '仅订单状态为「取消」或者「待支付」可操作',
      onlyRecieving: '仅订单状态为「待收货」可操作',
      refundMoneyOut: '退款金额不能大于用户支付价格',
      stockOut: '商品库存不足',
      confirmOrderPayed: '您确定订单:{orderId}状态修改为已付款',
      confirmRefundOrder: '您确定订单:{orderId}己线下处理好退款'
    },
    fields: {
      id: '订单号',
      postage: '邮费',
      total: '合计',
      status: '订单状态',
      inserted_at: '下单时间',
      email: '用户帐号',
      paid_type: {
        label: '支付渠道',
        wechat: '微信',
        alipay: '支付宝'
      },
      transaction_id: '支付单号',
      address: {
        name: '姓名',
        mobile: '电话',
        address: '地址'
      },
      refundMoney: '退款金额'
    },
    status: {
      '-3': '已退款',
      '-2': '已退货',
      '-1': '已关闭',
      '0': '待支付',
      '1': '已支付',
      '2': '待收货',
      '3': '待确认',
      '4': '已完成'

    }
  },
  op_logs: {
    label: '历史记录',
    inserted_at: '操作时间',
    op_user: '操作账号',
    op_admin: '管理员',
    content: '操作内容',
    transaction_id: '支付单号',
    refundMoney: '退款金额',
    change_to: '更改为'
  }
});

/***/ }),
/* 796 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _dashboard$appConfig$;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* harmony default export */ __webpack_exports__["a"] = (_dashboard$appConfig$ = {
  dashboard: '概况',
  appConfig: '修改配置',
  settings: '系统设置',
  adminUserManage: '角色管理',
  loginCode: '激活码',
  loginCodeManage: '激活码管理',
  myLoginCodes: '我的激活码',
  userManage: '查询用户',
  orderManage: '订单管理',
  forumManage: '论坛管理',
  customerServiceManage: '客服管理',
  adminUsers: '管理员账户管理',
  appMalls: '商城管理',
  appEdit: '修改配置',
  appOrders: '订单管理',
  appStats: '统计信息'
}, _defineProperty(_dashboard$appConfig$, 'settings', '系统设置'), _defineProperty(_dashboard$appConfig$, 'appList', '我的应用'), _defineProperty(_dashboard$appConfig$, 'activityInfo', '活动管理'), _defineProperty(_dashboard$appConfig$, 'noticeInfo', '公告管理'), _defineProperty(_dashboard$appConfig$, 'newsInfo', '新闻管理'), _defineProperty(_dashboard$appConfig$, 'customerService', '问题反馈'), _defineProperty(_dashboard$appConfig$, 'wechatPublic', '公众号'), _defineProperty(_dashboard$appConfig$, 'wcpConfig', '参数配置'), _defineProperty(_dashboard$appConfig$, 'wcpMessages', '消息记录'), _defineProperty(_dashboard$appConfig$, 'wcpRules', '自定义回复'), _defineProperty(_dashboard$appConfig$, 'wcpMenu', '自定义菜单'), _defineProperty(_dashboard$appConfig$, 'stats', '统计分析'), _defineProperty(_dashboard$appConfig$, 'statsByDay', '每日统计'), _defineProperty(_dashboard$appConfig$, 'statsRetained', '留存统计'), _defineProperty(_dashboard$appConfig$, 'statsDevice', '设备终端'), _defineProperty(_dashboard$appConfig$, 'statsTiming', '使用时长'), _defineProperty(_dashboard$appConfig$, 'pointsMall', '积分商城'), _defineProperty(_dashboard$appConfig$, 'pointSetting', '积分配置'), _defineProperty(_dashboard$appConfig$, 'pointLog', '积分纪录'), _defineProperty(_dashboard$appConfig$, 'pointGoods', '商品管理'), _defineProperty(_dashboard$appConfig$, 'pointOrder', '订单管理'), _defineProperty(_dashboard$appConfig$, 'pointTasks', '积分任务'), _defineProperty(_dashboard$appConfig$, 'pointTaskbar', '任务栏'), _defineProperty(_dashboard$appConfig$, 'pointDaySign', '日常签到'), _defineProperty(_dashboard$appConfig$, 'pointDayQuestion', '每日问答'), _defineProperty(_dashboard$appConfig$, 'pointRoulette', '大轮盘'), _dashboard$appConfig$);

/***/ }),
/* 797 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  activityInfo: '活动管理',
  noticeInfo: '公告管理',
  newsInfo: '新闻管理',

  id: '编号',
  title: '标题',
  content: '内容',
  pic: '题图',
  edit: '修改',
  publishEd: '已发布',
  unPublish: '未发布',
  publishOk: '发布成功',
  unPublishOK: '取消发布成功',
  delete: '删除',
  deleteOk: '删除成功',
  created_at: '创建时间',
  active: '是否启用',
  operate: '操作',
  addSuccess: '添加成功',
  picNeed: '请添加题图～～',
  titlePlaceholder: '请填写标题～～',
  textAreaPlaceHolder: '请填写内容～～',
  requireTitleContent: '请输入标题和内容',

  activity: {
    add: '添加新活动'
  },

  notice: {
    add: '添加新公告'
  },

  news: {
    add: '添加新闻'
  }
});

/***/ }),
/* 798 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  title: {
    success: '耶，成功了',
    failed: '糟糕，失败了'
  },
  message: {
    unknownError: '未知错误，请联系管理员',
    forbidden: '操作权限不足',
    sdkInfoUpdated: '{sdk}接入参数的修改已成功保存',
    appInfoUpdated: '{appName}配置已成功更新',
    goodsInfoUpdated: '商品『{goodsName}』信息已成功更新',
    goodsDeleted: '商品『{goodsName}』已成功删除',
    mallGoodsDeleted: '商品已成功删除',
    goodsProductIdUpdated: '商品『{goodsName}』在『{sdk}』渠道的产品ID已成功更新',
    sectionInfoUpdated: '论坛版块信息已成功更新',
    forumInfoUpdated: '论坛信息已成功更新',
    mallInfoUpdated: '商城信息已成功更新',
    configUpdated: '系统设置{configName}已成功更新',
    configDeleted: '系统设置{configName}已成功删除',
    sensitiveWordsUpdated: '系统敏感词库已成功更新',
    appManagerDeleted: '应用管理员『{nickName}』已成功删除',
    appCustomerServiceDeleted: '应用客服『{nickName}』已成功删除',
    wcpParamsUpdated: '公众号参数已成功更新',
    pointUpdated: '积分纪录已成功添加'
  }
});

/***/ }),
/* 799 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  id: '编号',
  user: '操作人',
  type: '类型',
  log: '日志',
  adddate: '时间'
});

/***/ }),
/* 800 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  add: '加减积分',
  id: '编号',
  log_type: '积分类型',
  point: '积分',
  memo: '备注',
  inserted_at: '积分时间',
  user_id: '用户ID',
  user: '用户',

  task: {
    add: '添加新任务',
    taskbar: '任务栏'

  }
});

/***/ }),
/* 801 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  Index: '我的应用',
  Home: '首页',
  AppDashboard: '概况',
  AppConfig: '修改应用配置',
  AdminUsers: '账号管理',
  LoginCodes: '激活码管理',
  MyLoginCodes: '我的激活码',
  Users: '用户管理',
  Orders: '订单管理',
  Forums: '论坛管理',
  Malls: '商城管理',
  Faq: '问题反馈',
  Setting: '系统设置',
  Settings: '系统设置',
  AppInfo: '应用基本信息',
  NewApp: '添加新应用',
  EditApp: '修改应用配置',
  AppGoods: '应用商品管理',
  AppOrders: '应用订单管理',
  AppStats: '应用统计数据',
  EditForum: '修改论坛配置',
  EditMall: '商城管理',
  EditGoods: '商品详情',
  EditPointGoods: '商品详情',
  MallOrderInfo: '订单详情',
  NewNews: '添加新内容',
  EditNews: '修改内容',
  settings: '系统设置',
  Activity: '活动管理',
  Notice: '公告管理',
  News: '新闻管理',
  undefined: '',
  null: '',
  WcpParams: '微信公众号--参数配置',
  WcpMessages: '微信公众号--消息记录',
  WcpRules: '微信公众号--自定义回复',
  WcpMenu: '微信公众号--自定义菜单',
  WcpEditRule: '编辑自定义回复',
  StatsByDay: '每日统计',
  StatsRetained: '留存统计',
  StatsDevice: '设备终端',
  StatsTiming: '使用时长',
  PointSetting: '积分配置',
  PointLog: '积分纪录',
  PointGoods: '商品管理',
  PointOrder: '订单管理',
  PointTaskbar: '任务栏',
  PointDaySign: '日常签到',
  PointDayQuestion: '每日问答',
  PointRoulette: '大轮盘'
});

/***/ }),
/* 802 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _applestore$ggplay$an;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* harmony default export */ __webpack_exports__["a"] = (_applestore$ggplay$an = {
  applestore: 'iTunes Connect',
  ggplay: '谷歌商店',
  anzhi: '安智',
  baidu: '百度',
  cc: '虫虫',
  coolpad: '酷派',
  downjoy: '当乐',
  gfan: '机锋市场',
  huawei: '华为',
  iyouxi: '爱游戏',
  lenovo: '联想',
  mumayi: '木蚂蚁',
  oppo: 'OPPO',
  qh360: '360',
  qxz: '七匣子',
  htc: 'HTC聚乐',
  sogou: '搜狗',
  uc: 'UC',
  vivo: 'VIVO',
  yyh: '应用汇',
  youku: '优酷',
  xiaomi: '小米',
  wdj: '豌豆荚'
}, _defineProperty(_applestore$ggplay$an, 'ggplay', 'Google Play'), _defineProperty(_applestore$ggplay$an, 'facebook', 'Facebook'), _defineProperty(_applestore$ggplay$an, 'haima', '海马助手'), _defineProperty(_applestore$ggplay$an, 'i4', '爱思助手'), _defineProperty(_applestore$ggplay$an, 'iiapple', 'I苹果'), _defineProperty(_applestore$ggplay$an, 'itools', 'Itools助手'), _defineProperty(_applestore$ggplay$an, 'ky', '快用助手'), _defineProperty(_applestore$ggplay$an, 'meizu', '魅族'), _defineProperty(_applestore$ggplay$an, 'ndcom', '91助手'), _defineProperty(_applestore$ggplay$an, 'pp', 'PP助手'), _defineProperty(_applestore$ggplay$an, 'qq', '腾讯QQ'), _defineProperty(_applestore$ggplay$an, 'tbt', '同步推'), _defineProperty(_applestore$ggplay$an, 'xy', 'XY助手'), _defineProperty(_applestore$ggplay$an, 'wechat', '微信'), _defineProperty(_applestore$ggplay$an, 'assigned', '分配的'), _defineProperty(_applestore$ggplay$an, 'add', '添加'), _defineProperty(_applestore$ggplay$an, 'keys', {
  key: 'Key',
  app_id: 'App Id',
  app_uid: '应用ID（APP UID)',
  app_key: 'App Key',
  app_secret: 'App Secret',
  pay_key: 'Pay Key',
  pay_pub_key: '支付公钥',
  pay_priv_key: '支付私钥',
  pay_id: '支付id[PAY ID]',
  pub_key: '公钥',
  priv_key: '私钥',
  game_code: '游戏ID[Game Code]',
  rsa_key: 'RSA 秘钥',
  client_id: '客户端ID[Client ID]',
  client_secret: '客户端秘钥[Client Secret]',
  cp_id: 'CP ID',
  cp_key: 'CP KEY',
  signature: '签名',
  package_name: '包名',
  partnerid: "商户号",
  sign_key: "签名Key"
}), _applestore$ggplay$an);

/***/ }),
/* 803 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  basicInfo: '基本信息',
  operateLog: '操作日志',
  keywordInfo: '敏感词配置',
  notFound: '配置项没有找到',
  id: '配置编号',
  configName: '配置名',
  configValue: '配置值',
  configGroup: '分组',
  active: '是否启用',
  add: '添加新配置',
  edit: '修改',
  delete: '删除',
  memo: '备注',

  groups: {
    basicInfo: '基本信息',
    keyword: '敏感词'
  },

  keyword: {
    edit: '修改',
    tip: '请输入敏感词'
  }
});

/***/ }),
/* 804 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  selectDate: '请选择统计日期',
  addTab: '自定义'
});

/***/ }),
/* 805 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  fields: {
    id: '用户编号',
    avatar: '头像',
    nickname: '昵称',
    email: '账号',
    password: '密码',
    mobile: '移动电话',
    gender: '性别',
    age: '年龄',
    active: '是否启用',
    insertedAt: '添加时间',
    appUserName: '角色名'
  },
  gender: {
    male: '男',
    famale: '女'
  },
  messages: {
    opSuccess: '操作成功',
    opFailed: '操作失败',
    appAccountExists: '账号已添加到应用中'
  }
});

/***/ }),
/* 806 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  appId: '开发者ID(AppId)',
  appKey: '开发者密码(AppSecret)',
  token: '令牌(Token)',
  aesKey: '消息加解密密钥(EncodingAESKey)',
  menu: '自定义菜单',

  subscribedResponse: '关注公众号时回复',
  scanResponse: '扫码回复消息',
  defaultResponse: '默认回复消息',
  newCodeTemplate: '获取新激活码模版(用户获取到激活码时回复内容，输入#code代表激活码)',
  ownedCodeTemplate: '获取已有激活码模版(用户已经获取过激活码时回复内容，输入#code代表激活码)',
  noCodeTemplate: '没有激活码时回复消息',
  closedTemplate: '未开启领取时回复消息',

  download_disabled_template: '公众号下载未开启时回复消息',
  android_download_template: '点击安卓下载时回复消息',
  ios_download_template: '点击IOS下载时回复消息',
  tf_download_template: '点击IOS(TestFlight)下载时回复消息',
  tf_download_no_login_code_template: 'TestFlight下载时用户没有激活码回复消息',
  tf_download_email_received_template: '用户点击TestFlight下载后发送email时的回复消息',
  tf_invalid_email_template: '用户点击TestFlight下载后发送非法email时的回复消息',
  tf_email_used_template: '用户点击TestFlight下载后添加用户发送的email已经被其他用户使用时回复的消息',
  tf_already_invited_template: '用户点击TestFlight下载后发送的email已经加过了的时的回复消息',
  new_tf_email_template: '用户点击TestFlight下载后发送的email被成功添加时的回复消息',
  tf_invite_failed_template: '用户点击TestFlight下载后添加用户发送的email出错时的回复消息',
  update_tf_email_template: '用户点击TestFlight下载后添加用户发送的email覆盖旧的email时的回复消息',
  tf_tester_full_template: '用户点击TestFlight下载后TestFlight配额已用光时回复的消息',

  id: '编号',
  verifyFile: '验证文件',
  keywords: '关键词',
  response: '回复内容',
  createdAt: '创建时间',
  view: '查看',
  edit: '修改',
  operate: '操作',
  addRule: '添加自定义回复',
  downloadReply: '下载消息',

  keywordsPlaceholder: '请填写关键词',
  responsePlaceholder: '请填写回复内容',
  btnTitle: '保 存',
  btnGetMenu: '获取当前菜单',
  btnUpdateMenu: '更新到服务器',
  keywordsRequired: '关键词必填',
  operateSuccess: '操作成功',
  basicInfo: '基本参数',
  replyInfo: '消息配置',
  replyModel: '激活码消息',
  serverHost: '服务器域名(URL)',
  userLoginCode: '发放激活码',

  msgId: '编号',
  msgFrom: '发送人',
  msgTo: '接收人',
  msgType: '消息类型',
  msgContent: '消息内容',
  msgTime: '创建时间',

  searchTip: '输入发送人，接收人或消息内容',

  menus: {
    params: '按钮其他参数',
    name: '名称',
    type: '类型',
    key: 'Key',
    url: 'Url',
    tip: '如果有下级菜单请忽略上述类型和Key、Url等参数。',
    tip2: '二级菜单点击事件必须设置Key值，访问网页必须设置Url值，否则会自动被忽略',
    getSuccess: '菜单获取成功',
    updateSuccess: '菜单更新成功'
  }
});

/***/ }),
/* 807 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__admin__ = __webpack_require__(794);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_i18n_zh_hans_upload__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_i18n_zh_hans_common__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_i18n_zh_hans_error__ = __webpack_require__(391);





/* harmony default export */ __webpack_exports__["a"] = ({
  admin: __WEBPACK_IMPORTED_MODULE_0__admin__["a" /* default */],
  upload: __WEBPACK_IMPORTED_MODULE_1_common_i18n_zh_hans_upload__["a" /* default */],
  common: __WEBPACK_IMPORTED_MODULE_2_common_i18n_zh_hans_common__["a" /* default */],
  error: __WEBPACK_IMPORTED_MODULE_3_common_i18n_zh_hans_error__["a" /* default */]
});

/***/ }),
/* 808 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_modules_menu__ = __webpack_require__(563);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  mode: 'history', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'is-active',
  scrollBehavior: function scrollBehavior() {
    return {
      y: 0
    };
  },
  routes: [{
    path: '/admin',
    component: __webpack_require__(1428),
    children: [{
      path: 'index',
      name: 'Index',
      component: __webpack_require__(1386)
    }, {
      path: 'settings',
      name: 'Settings',
      component: __webpack_require__(1387)
    }, {
      path: 'new_app',
      name: 'NewApp',
      component: __webpack_require__(1429)
    }, {
      path: 'app/:appId([a-zA-Z0-9]+)/',
      component: __webpack_require__(1401),
      children: [{
        path: 'dashboard',
        name: 'AppDashboard',
        component: __webpack_require__(1392)
      }, {
        path: 'setting',
        name: 'Setting',
        component: __webpack_require__(1416)
      }, {
        name: 'AppConfig',
        path: 'config',
        component: __webpack_require__(1390)
      }, {
        name: 'AdminUsers',
        path: 'adminusers',
        component: __webpack_require__(750)
      }, {
        name: 'Users',
        path: 'users',
        component: __webpack_require__(1421)
      }, {
        name: 'Orders',
        path: 'orders',
        component: __webpack_require__(1406)
      }, {
        name: 'EditForum',
        path: 'editforum',
        component: __webpack_require__(1394)
      }, {
        name: 'EditNews',
        path: 'news/edit',
        component: __webpack_require__(1396)
      }, {
        name: 'EditMall',
        path: 'editmall',
        component: __webpack_require__(1403)
      }, {
        name: 'EditGoods',
        path: 'mall/edit_goods',
        component: __webpack_require__(1402)
      }, {
        name: 'MallOrderInfo',
        path: 'malls/order/:orderId',
        component: __webpack_require__(1404)
      }, {
        name: 'Activity',
        path: 'activity',
        component: __webpack_require__(1395)
      }, {
        name: 'Notice',
        path: 'notice',
        component: __webpack_require__(1398)
      }, {
        name: 'News',
        path: 'news',
        component: __webpack_require__(1397)
      }, {
        name: 'Faq',
        path: 'faq',
        component: __webpack_require__(1393)
      }, {
        name: 'LoginCodes',
        path: 'loginCodes',
        component: __webpack_require__(1399)
      }, {
        name: 'MyLoginCodes',
        path: 'myLoginCodes',
        component: __webpack_require__(1400)
      }, {
        name: 'WcpParams',
        path: 'wcpParams',
        component: __webpack_require__(1424)
      }, {
        name: 'WcpRules',
        path: 'wcpRules',
        component: __webpack_require__(1426)
      }, {
        name: 'WcpEditRule',
        path: 'wcpEditRule',
        component: __webpack_require__(1425)
      }, {
        name: 'WcpMessages',
        path: 'wcpMessages',
        component: __webpack_require__(1423)
      }, {
        name: 'WcpMenu',
        path: 'wcpMenu',
        component: __webpack_require__(1422)
      }, {
        name: 'StatsByDay',
        path: 'statsByDay',
        component: __webpack_require__(1417)
      }, {
        name: 'StatsRetained',
        path: 'statsRetained',
        component: __webpack_require__(1419)
      }, {
        name: 'StatsDevice',
        path: 'statsDevice',
        component: __webpack_require__(1418)
      }, {
        name: 'StatsTiming',
        path: 'statsTiming',
        component: __webpack_require__(1420)
      }, {
        name: 'PointLog',
        path: 'pointLog',
        component: __webpack_require__(1409)
      }, {
        name: 'PointGoods',
        path: 'pointGoods',
        component: __webpack_require__(1408)
      }, {
        name: 'PointOrder',
        path: 'pointOrder',
        component: __webpack_require__(1410)
      }, {
        name: 'PointSetting',
        path: 'pointSetting',
        component: __webpack_require__(1414)
      }, {
        name: 'PointTaskbar',
        path: 'pointTaskbar',
        component: __webpack_require__(1415)
      }, {
        name: 'PointDaySign',
        path: 'pointDaySign',
        component: __webpack_require__(1412)
      }, {
        name: 'PointDayQuestion',
        path: 'pointDayQuestion',
        component: __webpack_require__(1411)
      }, {
        name: 'PointRoulette',
        path: 'pointRoulette',
        component: __webpack_require__(1413)
      }, {
        name: 'EditPointGoods',
        path: 'pointMall/edit_goods',
        component: __webpack_require__(1407)
      }]
    }, {
      path: '*',
      redirect: 'index'
    }]
  }]
}));

/***/ }),
/* 809 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_i18n__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);





var processResponse = function processResponse(result, successMessage) {
  if (!result.success) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_admin_miscellaneous__["b" /* processAjaxError */])(result);
  } else if (successMessage) {
    console.log(successMessage);
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_admin_miscellaneous__["a" /* openNotification */])({
      title: __WEBPACK_IMPORTED_MODULE_1__vue_i18n__["a" /* i18n */].t('admin.notification.title.success'),
      message: successMessage,
      type: 'success',
      duration: 4500
    });
  } else if (result.i18n_message) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_admin_miscellaneous__["a" /* openNotification */])({
      title: __WEBPACK_IMPORTED_MODULE_1__vue_i18n__["a" /* i18n */].t('admin.notification.title.success'),
      message: __WEBPACK_IMPORTED_MODULE_1__vue_i18n__["a" /* i18n */].t(result.i18n_message, result.i18n_message_object),
      type: 'success',
      duration: 4500
    });
  }

  return Promise.resolve(result);
};

var post = function post(uri, params, successMessage) {
  return __WEBPACK_IMPORTED_MODULE_2_axios___default.a.post(uri, params).then(function (response) {
    return processResponse(response.data, successMessage);
  }).catch(function (e) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_admin_miscellaneous__["a" /* openNotification */])({
      title: __WEBPACK_IMPORTED_MODULE_1__vue_i18n__["a" /* i18n */].t('admin.notification.title.failed'),
      message: __WEBPACK_IMPORTED_MODULE_1__vue_i18n__["a" /* i18n */].t('admin.notification.message.unknownError'),
      type: 'danger',
      duration: 4500
    });
    return Promise.resolve({ success: false });
  });
};

/* harmony default export */ __webpack_exports__["a"] = ({
  install: function install(Vue, options) {
    Vue.prototype.$acs = {
      fetchAppList: function fetchAppList() {
        return post('/admin_actions/fetch_apps', {});
      },
      updateAppInfo: function updateAppInfo(params, successMessage) {
        return post('/admin_actions/app/update_app_info', params, successMessage);
      },
      updateAppSdkInfo: function updateAppSdkInfo(params, successMessage) {
        return post('/admin_actions/app/update_app_sdk_info', params, successMessage);
      },
      updateAppGoodsInfo: function updateAppGoodsInfo(params, successMessage) {
        return post('/admin_actions/app/update_app_goods_info', params, successMessage);
      },
      updateAppGoodsProductId: function updateAppGoodsProductId(params, successMessage) {
        return post('/admin_actions/app/update_app_goods_product_id', params, successMessage);
      },
      deleteAppGoods: function deleteAppGoods(params, successMessage) {
        return post('/admin_actions/app/delete_app_goods', params, successMessage);
      },
      generateDummySdkInfo: function generateDummySdkInfo(params) {
        return post('/admin_actions/app/generate_dummy_sdk_info', params);
      },
      fetchOrders: function fetchOrders(params) {
        return post('/admin_actions/fetch_orders', params);
      },
      searchOrders: function searchOrders(params) {
        return post('/admin_actions/search_orders', params);
      },
      fetchForum: function fetchForum(params) {
        return post('/forum_actions/fetch_forum', params);
      },
      updateForumInfo: function updateForumInfo(params, successMessage) {
        return post('/admin_actions/forum/update_forum_info', params, successMessage);
      },
      updateForumSectionInfo: function updateForumSectionInfo(params, successMessage) {
        return post('/admin_actions/forum/update_section_info', params, successMessage);
      },
      getSetting: function getSetting(params) {
        return post('/admin_actions/setting/get_setting', params);
      },
      getSettingsByGroup: function getSettingsByGroup(params) {
        return post('/admin_actions/setting/get_settings_by_group', params);
      },
      updateSettingByName: function updateSettingByName(params, successMessage) {
        return post('/admin_actions/setting/update_setting_by_name', params, successMessage);
      },
      deleteSettingByName: function deleteSettingByName(params, successMessage) {
        return post('/admin_actions/setting/delete_setting', params, successMessage);
      },
      getPagedNews: function getPagedNews(app_id, group, page, records_per_page) {
        return post('/admin_actions/games/get_paged_news_admin', {
          app_id: app_id,
          group: group,
          page: page,
          records_per_page: records_per_page
        });
      },
      getPagedQuestions: function getPagedQuestions(app_id, page, records_per_page) {
        return post('/customer_service_actions/get_paged_questions', {
          app_id: app_id,
          page: page,
          records_per_page: records_per_page
        });
      },
      updateQuestion: function updateQuestion(params, successMessage) {
        return post('/admin_actions/customer_service/update_question', params, successMessage);
      },
      deleteQuestion: function deleteQuestion(params, successMessage) {
        return post('/admin_actions/customer_service/delete_question', params, successMessage);
      },
      getNewsDetail: function getNewsDetail(news_id) {
        return post('/games_actions/get_news_detail', { news_id: news_id });
      },
      updateNews: function updateNews(params) {
        return post('/admin_actions/games/update_news', params);
      },
      toggleStatus: function toggleStatus(params, successMessage) {
        return post('/admin_actions/games/toggle_news_status', params, successMessage);
      },
      updateMallInfo: function updateMallInfo(params, successMessage) {
        return post('/admin_actions/mall/update_mall_info', params, successMessage);
      },
      fetchGoods: function fetchGoods(params) {
        return post('/mall_actions/fetch_goods', params);
      },
      updateGoods: function updateGoods(params) {
        return post('/admin_actions/mall/update_goods', params);
      },
      toggleGoodsStatus: function toggleGoodsStatus(params) {
        return post('/admin_actions/mall/toggle_goods_status', params);
      },
      deleteMallGoods: function deleteMallGoods(params) {
        return post('/admin_actions/mall/delete_goods', params);
      },
      getGoodsDetail: function getGoodsDetail(params) {
        return post('/mall_actions/get_goods_detail', params);
      },
      fetchMallOrders: function fetchMallOrders(params) {
        return post('/mall_actions/fetch_order_list', params);
      },
      fetchMallOrder: function fetchMallOrder(params) {
        return post('/mall_actions/fetch_order', params);
      },
      updateOrderPayed: function updateOrderPayed(params) {
        return post('/admin_actions/mall/update_order_payed', params);
      },
      refundOrder: function refundOrder(params) {
        return post('/admin_actions/mall/refund_order', params);
      },
      addUser: function addUser(params) {
        return post('/admin_actions/user/add_user', params);
      },
      getAdminUserByApp: function getAdminUserByApp(params) {
        return post('/admin_actions/user/get_admin_user_by_app', params);
      },
      deleteAdminUser: function deleteAdminUser(params) {
        return post('/admin_actions/user/delete_admin_user', params);
      },
      getUserFromRedis: function getUserFromRedis(params) {
        return post('/admin_actions/user/get_user_from_redis', params);
      },
      getUsersByLevel: function getUsersByLevel(params) {
        return post('/admin_actions/user/get_users_by_level', params);
      },
      addAdminUser: function addAdminUser(params) {
        return post('/admin_actions/user/add_admin_user', params);
      },
      getCurrentUserLevel: function getCurrentUserLevel(params) {
        return post('/admin_actions/user/get_current_user_level', params);
      },
      searchUsers: function searchUsers(params) {
        return post('/admin_actions/user/search_users', params);
      },
      getUserById: function getUserById(id) {
        return post('/admin_actions/user/get_user_by_id', { id: id });
      },
      generateLoginCodes: function generateLoginCodes(params, successMessage) {
        return post('/admin_actions/login_codes/gen_codes', params, successMessage);
      },
      delLoginCodes: function delLoginCodes(params, successMessage) {
        return post('/admin_actions/login_codes/del_codes', params, successMessage);
      },
      fetchLoginCodesStats: function fetchLoginCodesStats(params) {
        return post('/admin_actions/login_codes/stats_info', params);
      },
      assignLoginCodes: function assignLoginCodes(params, successMessage) {
        return post('/admin_actions/login_codes/assign_codes', params, successMessage);
      },
      fetchMyLoginCodes: function fetchMyLoginCodes(params) {
        return post('/admin_actions/login_codes/fetch_my_codes', params);
      },
      addWcpEmptyParams: function addWcpEmptyParams(params) {
        return post('/admin_actions/wcp/add_wcp_empty_params', params);
      },
      updateWcpParams: function updateWcpParams(params, successMessage) {
        return post('/admin_actions/wcp/update_wcp_params', params, successMessage);
      },
      updateWcpRules: function updateWcpRules(params) {
        return post('/admin_actions/wcp/update_wcp_message_rule', params);
      },
      getWcpMenu: function getWcpMenu(params) {
        return post('/admin_actions/wcp/get_wcp_menu', params);
      },
      updateWcpMenu: function updateWcpMenu(params) {
        return post('/admin_actions/wcp/update_wcp_menu', params);
      },
      deleteRule: function deleteRule(rule_id, successMessage) {
        return post('/admin_actions/wcp/delete_wcp_message_rule', { rule_id: rule_id }, successMessage);
      },
      deleteMessage: function deleteMessage(message_id, successMessage) {
        return post('/admin_actions/wcp/delete_wcp_message', { message_id: message_id }, successMessage);
      },
      getRuleList: function getRuleList(app_id, page, records_per_page) {
        return post('/admin_actions/wcp/get_rule_list', {
          app_id: app_id,
          page: page,
          records_per_page: records_per_page
        });
      },
      getMessageList: function getMessageList(data) {
        return post('/admin_actions/wcp/get_message_list', data);
      },
      getUserMessageList: function getUserMessageList(app_id, open_id) {
        return post('/admin_actions/wcp/get_user_message_list', {
          app_id: app_id,
          open_id: open_id
        });
      },
      replyUserMessage: function replyUserMessage(app_id, open_id, content) {
        return post('/admin_actions/wcp/reply_user_message', {
          app_id: app_id,
          open_id: open_id,
          content: content
        });
      },
      getOnlineChart: function getOnlineChart(app_id) {
        return post('/admin_actions/stats/onlines', {
          app_id: app_id
        });
      },
      getBriefStats: function getBriefStats(app_id) {
        return post('/admin_actions/stats/brief_stats', {
          app_id: app_id
        });
      },
      getStatsByDay: function getStatsByDay(params) {
        return post('/admin_actions/stats/get_stats_by_day', params);
      },
      getUserTimingByDay: function getUserTimingByDay(params) {
        return post('/admin_actions/stats/get_user_timing_by_day', params);
      },
      getRetentionStats: function getRetentionStats(params) {
        return post('/admin_actions/stats/get_stats_retention', params);
      },
      getStatsDevice: function getStatsDevice(params) {
        return post('/admin_actions/stats/get_stats_device', params);
      },
      getStatsDeviceDetails: function getStatsDeviceDetails(params) {
        return post('/admin_actions/stats/get_stats_device_details', params);
      },
      getOperateLog: function getOperateLog(params) {
        return post('/admin_actions/log/get_operate_log', params);
      },
      addOperateLog: function addOperateLog(params) {
        return post('/admin_actions/log/add_operate_log', params);
      },
      getPointLogs: function getPointLogs(params) {
        return post('/admin_actions/point/get_point_logs', params);
      },
      addPoint: function addPoint(params, successMessage) {
        return post('/admin_actions/point/admin_add_point', params, successMessage);
      },
      fetchPointGoods: function fetchPointGoods(params) {
        return post('/admin_actions/point_mall/fetch_goods', params);
      },
      updatePointGoods: function updatePointGoods(params) {
        return post('/admin_actions/point_mall/update_goods', params);
      },
      togglePointGoodsStatus: function togglePointGoodsStatus(params) {
        return post('/admin_actions/point_mall/toggle_goods_status', params);
      },
      deletePointGoods: function deletePointGoods(params) {
        return post('/admin_actions/point_mall/delete_goods', params);
      },
      getPointGoodsDetail: function getPointGoodsDetail(params) {
        return post('/admin_actions/point_mall/get_goods_detail', params);
      }
    };
  }
});

/***/ }),
/* 810 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleSidebar", function() { return toggleSidebar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleDevice", function() { return toggleDevice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expandMenu", function() { return expandMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switchEffect", function() { return switchEffect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSdks", function() { return updateSdks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateAdminLevel", function() { return updateAdminLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setApp", function() { return setApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addForum", function() { return addForum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchMalls", function() { return fetchMalls; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateMyLoginCodes", function() { return updateMyLoginCodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateWcpParams", function() { return updateWcpParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "joinAppChannel", function() { return joinAppChannel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAppBriefStats", function() { return setAppBriefStats; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_miscellaneous__ = __webpack_require__(40);





var toggleSidebar = function toggleSidebar(_ref, opened) {
  var commit = _ref.commit;
  return commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types__["a" /* TOGGLE_SIDEBAR */], opened);
};

var toggleDevice = function toggleDevice(_ref2, device) {
  var commit = _ref2.commit;
  return commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types__["k" /* TOGGLE_DEVICE */], device);
};

var expandMenu = function expandMenu(_ref3, menuItem) {
  var commit = _ref3.commit;

  if (menuItem) {
    menuItem.expanded = menuItem.expanded || false;
    commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types__["b" /* EXPAND_MENU */], menuItem);
  }
};

var switchEffect = function switchEffect(_ref4, effectItem) {
  var commit = _ref4.commit;

  if (effectItem) {
    commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types__["m" /* SWITCH_EFFECT */], effectItem);
  }
};

var updateSdks = function updateSdks(_ref5, sdks) {
  var commit = _ref5.commit;

  commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types__["f" /* UPDATE_SDKS */], sdks);
};

var updateAdminLevel = function updateAdminLevel(_ref6, level) {
  var commit = _ref6.commit;

  commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types__["l" /* UPDATE_ADMIN_LEVEL */], level);
};

var setApp = function setApp(_ref7, app) {
  var commit = _ref7.commit;

  commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types__["g" /* SET_APP */], app);
};

var addForum = function addForum(_ref8, forum) {
  var commit = _ref8.commit;

  commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types__["n" /* ADD_FORUM */], forum);
};

var fetchMalls = function fetchMalls(_ref9, app_id) {
  var commit = _ref9.commit;

  __WEBPACK_IMPORTED_MODULE_1_axios___default.a.get('/mall_actions/fetch_malls', { params: { app_id: app_id } }).then(function (res) {
    return res.data;
  }).then(function (result) {
    if (result.success) {
      commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types__["d" /* UPDATE_MALLS */], result.malls);
    } else {
      return Promise.reject(result);
    }
  }).catch(function (e) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_admin_miscellaneous__["b" /* processAjaxError */])(e);
  });
};

var updateMyLoginCodes = function updateMyLoginCodes(_ref10, codes) {
  var commit = _ref10.commit;

  commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types__["h" /* SET_MY_LOGIN_CODES */], codes);
};

var updateWcpParams = function updateWcpParams(_ref11, params) {
  var commit = _ref11.commit;

  commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types__["c" /* UPDATE_WCP_PARAMS */], params);
};

var joinAppChannel = function joinAppChannel(_ref12, params) {
  var commit = _ref12.commit;

  commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types__["j" /* JOIN_APP_CHANNEL */], params);
};

var setAppBriefStats = function setAppBriefStats(_ref13, briefStats) {
  var commit = _ref13.commit;

  commit(__WEBPACK_IMPORTED_MODULE_0__mutation_types__["i" /* SET_APP_BRIEF_STATS */], briefStats);
};

/***/ }),
/* 811 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(810);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getters__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_main__ = __webpack_require__(813);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_apps__ = __webpack_require__(812);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_menu__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_mall__ = __webpack_require__(814);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_wcp__ = __webpack_require__(815);











__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* default */]);

var store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* default */].Store({
  strict: false, // process.env.NODE_ENV !== 'development',
  actions: __WEBPACK_IMPORTED_MODULE_2__actions__,
  getters: __WEBPACK_IMPORTED_MODULE_3__getters__,
  modules: {
    main: __WEBPACK_IMPORTED_MODULE_4__modules_main__["a" /* default */],
    menu: __WEBPACK_IMPORTED_MODULE_6__modules_menu__["a" /* default */],
    apps: __WEBPACK_IMPORTED_MODULE_5__modules_apps__["a" /* default */],
    mall: __WEBPACK_IMPORTED_MODULE_7__modules_mall__["a" /* default */],
    wcp: __WEBPACK_IMPORTED_MODULE_8__modules_wcp__["a" /* default */]
  },
  state: {},
  mutations: {}
});

/* harmony default export */ __webpack_exports__["a"] = (store);

/***/ }),
/* 812 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_phoenix__ = __webpack_require__(1327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_phoenix___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_phoenix__);
var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var state = {
  app: undefined,
  sdks: [],
  goods: {},
  myLoginCodes: [],
  channel: undefined,
  orders: [],
  latestOnlineData: undefined,
  briefStats: undefined
};

var socket = new __WEBPACK_IMPORTED_MODULE_1_phoenix__["Socket"]('/app_admin_sock');
socket.connect();

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["f" /* UPDATE_SDKS */], function (state, sdks) {
  state.sdks = sdks;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["g" /* SET_APP */], function (state, app) {
  state.app = app;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["h" /* SET_MY_LOGIN_CODES */], function (state, codes) {
  state.myLoginCodes = codes;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["i" /* SET_APP_BRIEF_STATS */], function (state, briefStats) {
  state.briefStats = briefStats;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["j" /* JOIN_APP_CHANNEL */], function (state, params) {
  if (state.channel) {
    state.channel.leave();
    state.channel = undefined;
  }

  state.latestOnlineData = undefined;
  state.briefStats = undefined;

  state.channel = socket.channel('admin.app:' + params.appId, {
    access_token: params.accessToken,
    app_id: params.appId
  });

  state.channel.join().receive('ok', function (_) {
    console.log('app admin channel joined');
    state.channel.on('new_online_data', function (payload) {
      state.latestOnlineData = payload.online;
      state.briefStats = payload.brief_stats;
    });
  }).receive('error', function (reasons) {
    return console.log('can NOT join app admin channel', reasons);
  }).receive('timeout', function (_) {
    return console.log('can NOT join app admin channel with networking issue...');
  });
}), _mutations);

/* harmony default export */ __webpack_exports__["a"] = ({
  state: state,
  mutations: mutations
});

/***/ }),
/* 813 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types__ = __webpack_require__(184);
var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = {
  device: {
    isMobile: false,
    isTablet: false
  },
  sidebar: {
    opened: false,
    hidden: false
  },
  effect: {
    translate3d: true
  },
  adminLevel: 0
};

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["k" /* TOGGLE_DEVICE */], function (state, device) {
  state.device.isMobile = device === 'mobile';
  state.device.isTablet = device === 'tablet';
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["a" /* TOGGLE_SIDEBAR */], function (state, opened) {
  if (state.device.isMobile) {
    state.sidebar.opened = opened;
  } else {
    state.sidebar.opened = true;
  }
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["l" /* UPDATE_ADMIN_LEVEL */], function (state, level) {
  state.adminLevel = level;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["m" /* SWITCH_EFFECT */], function (state, effectItem) {
  for (var name in effectItem) {
    state.effect[name] = effectItem[name];
  }
}), _mutations);

/* harmony default export */ __webpack_exports__["a"] = ({
  state: state,
  mutations: mutations
});

/***/ }),
/* 814 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types__ = __webpack_require__(184);
var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = {
  list: [],
  hash: {}
};

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["d" /* UPDATE_MALLS */], function (state, malls) {
  state.list = malls;
  var hash = {};
  for (var index in malls) {
    var mall = malls[index];
    hash[mall.app_id] = mall;
  }
  state.hash = hash;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["e" /* ADD_MALL */], function (state, mall) {
  state.list.push(mall);
  state.hash[mall.app_id] = mall;
}), _mutations);

/* harmony default export */ __webpack_exports__["a"] = ({
  state: state,
  mutations: mutations
});

/***/ }),
/* 815 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types__ = __webpack_require__(184);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = {
  wcpParams: Object
};

var mutations = _defineProperty({}, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["c" /* UPDATE_WCP_PARAMS */], function (state, params) {
  state.wcpParams = params;
});

/* harmony default export */ __webpack_exports__["a"] = ({
  state: state,
  mutations: mutations
});

/***/ }),
/* 816 */,
/* 817 */,
/* 818 */,
/* 819 */,
/* 820 */,
/* 821 */,
/* 822 */,
/* 823 */,
/* 824 */,
/* 825 */,
/* 826 */,
/* 827 */,
/* 828 */,
/* 829 */,
/* 830 */,
/* 831 */,
/* 832 */,
/* 833 */,
/* 834 */,
/* 835 */,
/* 836 */,
/* 837 */,
/* 838 */,
/* 839 */,
/* 840 */,
/* 841 */,
/* 842 */,
/* 843 */,
/* 844 */,
/* 845 */,
/* 846 */,
/* 847 */,
/* 848 */,
/* 849 */,
/* 850 */,
/* 851 */,
/* 852 */,
/* 853 */,
/* 854 */,
/* 855 */,
/* 856 */,
/* 857 */,
/* 858 */,
/* 859 */,
/* 860 */,
/* 861 */,
/* 862 */,
/* 863 */,
/* 864 */,
/* 865 */,
/* 866 */,
/* 867 */,
/* 868 */,
/* 869 */,
/* 870 */,
/* 871 */,
/* 872 */,
/* 873 */,
/* 874 */,
/* 875 */,
/* 876 */,
/* 877 */,
/* 878 */,
/* 879 */,
/* 880 */,
/* 881 */,
/* 882 */,
/* 883 */,
/* 884 */,
/* 885 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_nprogress_src_NprogressContainer_vue__ = __webpack_require__(1520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_nprogress_src_NprogressContainer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_nprogress_src_NprogressContainer_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_layout__ = __webpack_require__(788);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    'navbar': __WEBPACK_IMPORTED_MODULE_1__components_layout__["a" /* Navbar */],
    'sidebar': __WEBPACK_IMPORTED_MODULE_1__components_layout__["b" /* Sidebar */],
    'appMain': __WEBPACK_IMPORTED_MODULE_1__components_layout__["c" /* AppMain */],
    'footerBar': __WEBPACK_IMPORTED_MODULE_1__components_layout__["d" /* FooterBar */],
    'nprogressContainer': __WEBPACK_IMPORTED_MODULE_0_vue_nprogress_src_NprogressContainer_vue___default.a
  },

  beforeMount: function beforeMount() {
    var _this = this;

    var _document = document,
        body = _document.body;

    var WIDTH = 768;
    var RATIO = 3;

    var handler = function handler() {
      if (!document.hidden) {
        var rect = body.getBoundingClientRect();
        var isMobile = rect.width - RATIO < WIDTH;
        _this.toggleDevice(isMobile ? 'mobile' : 'other');
        _this.toggleSidebar(!isMobile);
      }
    };

    document.addEventListener('visibilitychange', handler);
    window.addEventListener('DOMContentLoaded', handler);
    window.addEventListener('resize', handler);
  },

  computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["a" /* mapGetters */])({
    sidebar: 'sidebar'
  }),

  methods: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])(['toggleDevice', 'toggleSidebar'])
});

/***/ }),
/* 886 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    pageCount: {
      type: Number,
      default: 1
    },

    currentPage: {
      type: Number,
      default: 1
    },

    onPageChange: {
      type: Function,
      default: undefined
    }
  },

  methods: {
    selectPage: function selectPage(page) {
      if (this.onPageChange) {
        this.onPageChange(page);
      }
    }
  }
});

/***/ }),
/* 887 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__ = __webpack_require__(79);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    section: Object,
    callback: Function
  },
  data: function data() {
    return {
      processing: false,
      searching: false,
      users: undefined,
      selectUserId: undefined,
      selectUserAccountId: undefined,
      keyword: ""
    };
  },


  methods: {
    getUsers: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var par, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.keyword != "")) {
                  _context.next = 10;
                  break;
                }

                this.searching = true;
                par = new Object();

                par.level = this.section.level;
                par.keyword = this.keyword;
                _context.next = 7;
                return this.$acs.getUsersByLevel(par);

              case 7:
                result = _context.sent;

                if (result.success) {
                  this.users = result.users;
                }
                this.searching = false;

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getUsers() {
        return _ref.apply(this, arguments);
      }

      return getUsers;
    }(),
    selectUser: function selectUser(user) {
      this.selectUserId = user.id;
      this.selectUserAccountId = user.email || user.mobile;
    },
    handleSubmit: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.selectUserId) {
                  _context2.next = 7;
                  break;
                }

                this.processing = true;
                _context2.next = 4;
                return this.$acs.addAdminUser({
                  level: this.section.level,
                  admin_id: this.selectUserId,
                  account_id: this.selectUserAccountId
                });

              case 4:
                result = _context2.sent;


                this.processing = false;
                if (result.success) {
                  if (this.callback) {
                    this.callback(result);
                  }
                  this.visible = false;
                }

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleSubmit() {
        return _ref2.apply(this, arguments);
      }

      return handleSubmit;
    }()
  },

  components: {
    Modal: __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__["a" /* Modal */]
  }
});

/***/ }),
/* 888 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    pointLog: Object,
    callback: Function
  },

  data: function data() {
    return {
      processing: false
    };
  },


  methods: {
    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this.pointLog.user_id || !this.pointLog.point || !this.pointLog.memo)) {
                  _context.next = 3;
                  break;
                }

                alert('请填写用户ID, 积分和备注!');
                return _context.abrupt('return');

              case 3:

                this.processing = true;
                _context.next = 6;
                return this.$acs.addPoint(this.pointLog, this.$t('admin.notification.message.pointUpdated'));

              case 6:
                result = _context.sent;


                if (this.callback) {
                  this.callback(result.log);
                }

                this.visible = false;
                this.processing = false;

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  },

  components: {
    Modal: __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__["a" /* Modal */]
  }
});

/***/ }),
/* 889 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    appId: String,
    appName: String,
    goods: Object,
    currency: String,
    callback: Function
  },

  data: function data() {
    return {
      processing: false,
      price: 0
    };
  },


  mounted: function mounted() {
    this.price = this.goods.price / 100;
  },

  watch: {
    price: function price(val) {
      this.goods.price = Math.round(val * 100);
    }
  },

  methods: {
    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.processing = true;
                _context.next = 3;
                return this.$acs.updateAppGoodsInfo({
                  app_id: this.appId,
                  goods: this.goods
                }, this.$t('admin.notification.message.goodsInfoUpdated', {
                  goodsName: this.goods.name
                }));

              case 3:
                result = _context.sent;


                if (this.callback) {
                  this.callback(result.goods);
                }

                this.visible = false;
                this.processing = false;

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  },

  components: {
    Modal: __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__["a" /* Modal */]
  }
});

/***/ }),
/* 890 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    appId: String,
    goodsName: String,
    productIdInfo: Object,
    callback: Function
  },

  data: function data() {
    return {
      processing: false
    };
  },


  methods: {
    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.processing = true;

                _context.next = 3;
                return this.$acs.updateAppGoodsProductId({
                  product_id_info: this.productIdInfo,
                  app_id: this.appId
                }, this.$t('admin.notification.message.goodsProductIdUpdated', {
                  goodsName: this.goodsName,
                  sdk: this.$t('admin.sdks.' + this.productIdInfo.sdk)
                }));

              case 3:
                result = _context.sent;


                this.processing = false;

                if (this.callback) {
                  this.callback(result.product_id_info);
                }
                this.visible = false;

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  },

  components: {
    Modal: __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__["a" /* Modal */]
  }
});

/***/ }),
/* 891 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__ = __webpack_require__(79);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: Boolean,
    sdk: String,
    app: Object,
    binding: Object
  },

  data: function data() {
    return {
      processing: false
    };
  },


  methods: {
    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var result, filtered;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.processing = true;
                _context.next = 3;
                return this.$acs.updateAppSdkInfo({
                  app_id: this.app.id,
                  sdk: this.sdk,
                  binding: this.binding
                }, this.$t('admin.notification.message.sdkInfoUpdated', {
                  sdk: this.$t('admin.sdks.' + this.sdk)
                }));

              case 3:
                result = _context.sent;

                if (result.success) {
                  filtered = this.app.sdk_bindings.filter(function (x) {
                    return x.sdk == _this.sdk;
                  });

                  if (filtered.length <= 0) {
                    this.app.sdk_bindings.push(result.binding);
                  }
                  this.visible = false;
                }
                this.processing = false;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  },

  components: {
    Modal: __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__["a" /* Modal */]
  }
});

/***/ }),
/* 892 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__ = __webpack_require__(79);
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: Boolean,
    appName: String,
    sdks: Array,
    callback: Function
  },

  methods: {
    selectSdk: function selectSdk(sdk) {
      this.visible = false;

      if (this.callback) {
        this.callback(sdk);
      }
    }
  },

  components: {
    Modal: __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__["a" /* Modal */]
  }
});

/***/ }),
/* 893 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    question: Object,
    callback: Function
  },

  data: function data() {
    return {
      processing: false
    };
  },


  methods: {
    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.processing = true;
                _context.next = 3;
                return this.$acs.updateQuestion({
                  id: this.question.id,
                  title: this.question.title,
                  answer: this.question.answer,
                  active: this.question.active,
                  is_hot: this.question.is_hot
                }, undefined);

              case 3:
                result = _context.sent;

                if (result.success) {
                  if (this.callback) {
                    this.callback(result.question);
                  }
                  this.visible = false;
                }
                this.processing = false;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  },

  components: {
    Modal: __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__["a" /* Modal */]
  }
});

/***/ }),
/* 894 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__ = __webpack_require__(79);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    section: Object,
    callback: Function
  },

  data: function data() {
    return {
      processing: false
    };
  },


  methods: {
    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.processing = true;

                if (!this.section.id) {
                  this.section.id = 0;
                }
                _context.next = 4;
                return this.$acs.updateForumSectionInfo({
                  section: this.section
                }, this.$t('admin.notification.message.sectionInfoUpdated', {
                  sectionTitle: this.section.title
                }));

              case 4:
                result = _context.sent;


                this.processing = false;
                if (result.success) {
                  if (this.callback) {
                    this.callback(result.section);
                  }
                  this.visible = false;
                }

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  },

  components: {
    Modal: __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__["a" /* Modal */]
  }
});

/***/ }),
/* 895 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_vue_i18n__ = __webpack_require__(115);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: Boolean,
    title: String,
    message: String,
    type: {
      type: String,
      default: 'danger'
    },
    okTitle: {
      type: String,
      default: __WEBPACK_IMPORTED_MODULE_1_admin_vue_i18n__["a" /* i18n */].t('admin.titles.ok')
    },
    cancelTitle: {
      type: String,
      default: __WEBPACK_IMPORTED_MODULE_1_admin_vue_i18n__["a" /* i18n */].t('admin.titles.cancel')
    },
    onOK: Function
  },

  methods: {
    onBtnOKClicked: function onBtnOKClicked() {
      this.visible = false;

      if (typeof this.onOK == 'function') {
        this.onOK();
      }
    }
  },

  components: {
    Modal: __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__["a" /* Modal */]
  }
});

/***/ }),
/* 896 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    setting: Object,
    callback: Function
  },

  data: function data() {
    return {
      processing: false,
      groups: ['basicInfo']
    };
  },


  methods: {
    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.processing = true;

                _context.next = 3;
                return this.$acs.updateSettingByName({
                  setting_name: this.setting.name,
                  setting_value: this.setting.value,
                  group: this.setting.group,
                  memo: this.setting.memo,
                  active: true
                }, this.$t('admin.notification.message.configUpdated', {
                  configName: this.setting.name
                }));

              case 3:
                result = _context.sent;

                if (result.success) {
                  if (this.callback) {
                    this.callback(result.setting);
                  }
                  this.visible = false;
                }

                this.processing = false;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  },

  components: {
    Modal: __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__["a" /* Modal */]
  }
});

/***/ }),
/* 897 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_vue_i18n__ = __webpack_require__(115);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: Boolean,
    title: {
      type: String,
      default: __WEBPACK_IMPORTED_MODULE_1_admin_vue_i18n__["a" /* i18n */].t('common.tip')
    },
    message: String,
    cancelTitle: {
      type: String,
      default: __WEBPACK_IMPORTED_MODULE_1_admin_vue_i18n__["a" /* i18n */].t('common.close')
    }
  },

  components: {
    Modal: __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__["a" /* Modal */]
  }
});

/***/ }),
/* 898 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    forum: Object
  },

  data: function data() {
    return {
      processing: false,
      states: ['TRUE', 'FALSE']
    };
  },


  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['addForum', 'setApp']), {

    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.processing = true;
                _context.next = 3;
                return this.$acs.updateForumInfo({
                  forum: this.forum
                }, this.$t('admin.notification.message.forumInfoUpdated', {
                  forumName: this.forum.title
                }));

              case 3:
                result = _context.sent;

                if (result.success) {
                  __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/admin_actions/fetch_app', {
                    app_id: this.forum.app_id
                  }).then(function (response) {
                    return response.data;
                  }).then(function (result) {
                    if (result.success) {
                      _this.setApp(result.app);
                    }
                  });
                }
                this.processing = false;
                if (result.forum) {
                  this.addForum(result.forum);
                  this.$nextTick(function (_) {
                    _this.$router.replace({
                      path: '/admin/forums/edit/${result.forum.id}'
                    });
                  });
                }

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  })

});

/***/ }),
/* 899 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_vue_i18n__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_dialog_forum_sectionInfo__ = __webpack_require__(1365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_dialog_forum_sectionInfo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_admin_components_dialog_forum_sectionInfo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_bulma_tooltip__ = __webpack_require__(81);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









var sectionInfoDialogComponent = __WEBPACK_IMPORTED_MODULE_2_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_4_admin_components_dialog_forum_sectionInfo___default.a);

var openSectionInfoDialog = function openSectionInfoDialog() {
  var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    visible: true
  };

  return new sectionInfoDialogComponent({
    i18n: __WEBPACK_IMPORTED_MODULE_3_admin_vue_i18n__["a" /* i18n */],
    el: document.createElement('div'),
    propsData: propsData
  });
};



/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    forum: Object
  },

  methods: {

    editSectionInfo: function editSectionInfo(section, index) {
      var _this = this;

      openSectionInfoDialog({
        section: section,
        visible: true,
        callback: function callback(new_section) {
          _this.forum.sections[index] = new_section;
        }
      });
    },

    addNewSection: function addNewSection() {
      var _this2 = this;

      openSectionInfoDialog({
        section: {
          id: '',
          sort: 0,
          title: '',
          active: true,
          forum_id: this.forum.id
        },
        visible: true,
        callback: function callback(section) {
          _this2.forum.sections.push(section);
        }
      });
    }

  },

  components: {
    Tooltip: __WEBPACK_IMPORTED_MODULE_5_vue_bulma_tooltip__["a" /* default */]
  }

});

/***/ }),
/* 900 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Levelbar_vue__ = __webpack_require__(1373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Levelbar_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Levelbar_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Levelbar: __WEBPACK_IMPORTED_MODULE_0__Levelbar_vue___default.a
  }
});

/***/ }),
/* 901 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      license: ''
    };
  }
});

/***/ }),
/* 902 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},

  data: function data() {
    return {
      list: null
    };
  },
  created: function created() {
    // this.getList()
  },


  computed: {
    name: function name() {
      return this.$route.name;
    }
  },

  methods: {
    getList: function getList() {
      var matched = this.$route.matched;
      var first = matched[0];
      if (first && (first.name !== 'Home' || first.path !== '/admin')) {
        matched = [{ name: this.$t('admin.routes.Home'), path: '/admin' }].concat(matched);
      }
      this.list = matched;
    }
  },

  watch: {
    $route: function $route() {
      this.getList();
    }
  }
});

/***/ }),
/* 903 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_tooltip__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Tooltip: __WEBPACK_IMPORTED_MODULE_0_vue_bulma_tooltip__["a" /* default */]
  },
  props: {
    show: Boolean
  },
  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])({
    sidebar: 'sidebar',
    app: 'app'
  }), {
    appShowName: function appShowName() {
      if (this.$route.params.appId && this.app) {
        return "  - " + this.app.name;
      } else {
        return "";
      }
    }
  }),

  created: function created() {
    this.fetchMalls(this.$router.appId);
  },

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['toggleSidebar', 'fetchMalls']), {

    goIndex: function goIndex() {
      this.$router.push({
        name: 'Index'
      });
    }
  })
});

/***/ }),
/* 904 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_expanding__ = __webpack_require__(1516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_expanding___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_bulma_expanding__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Expanding: __WEBPACK_IMPORTED_MODULE_0_vue_bulma_expanding___default.a
  },

  props: {
    show: Boolean
  },

  data: function data() {
    return {
      isReady: false
    };
  },
  mounted: function mounted() {
    var route = this.$route;
    if (route.name) {
      this.isReady = true;
      this.shouldExpandMatchItem(route);
    }
  },


  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])(['indexMenuitems', 'menuitems', 'adminLevel']), {

    menu: function menu() {
      var _this = this;

      var result = [];
      if (this.$route.params.appId) {
        this.menuitems.forEach(function (item) {
          if (_this.checkPower(item)) {
            if (_typeof(item.children) == 'object' && item.children.length > 0) {
              var children = [];
              item.children.forEach(function (subItem) {
                if (_this.checkPower(subItem)) {
                  children.push({
                    name: subItem.name,
                    path: subItem.path ? subItem.path.replace(":appId", _this.$route.params.appId) : undefined,
                    meta: subItem.meta
                  });
                }
              });
              if (children.length > 0) {
                result.push({
                  name: item.name,
                  path: item.path ? item.path.replace(":appId", _this.$route.params.appId) : undefined,
                  meta: item.meta,
                  children: children
                });
              } else {
                result.push({
                  name: item.name,
                  path: item.path ? item.path.replace(":appId", _this.$route.params.appId) : undefined,
                  meta: item.meta
                });
              }
            } else {
              result.push({
                name: item.name,
                path: item.path ? item.path.replace(":appId", _this.$route.params.appId) : undefined,
                meta: item.meta
              });
            }
          }
        });
        return result;
      } else {
        return this.indexMenuitems.filter(this.checkPower);
      }
    }
  }),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['expandMenu']), {
    isExpanded: function isExpanded(item) {
      return item.meta.expanded;
    },
    checkPower: function checkPower(item) {
      return item.meta.level.indexOf(this.adminLevel + ",") >= 0;
    },
    toggle: function toggle(index, item) {
      // this.expandMenu({
      //   index: index,
      //   expanded: !item.meta.expanded
      // })
      item.meta.expanded = !item.meta.expanded;
    },
    shouldExpandMatchItem: function shouldExpandMatchItem(route) {
      var matched = route.matched;
      var lastMatched = matched[matched.length - 1];
      var parent = lastMatched.parent || lastMatched;
      var isParent = parent === lastMatched;

      if (isParent) {
        var p = this.findParentFromMenu(route);
        if (p) {
          parent = p;
        }
      }

      if ('expanded' in parent.meta && !isParent) {
        this.expandMenu({
          item: parent,
          expanded: true
        });
      }
    },
    generatePath: function generatePath(item, subItem) {
      return '' + (item.component ? item.path + '/' : '') + subItem.path;
    },
    findParentFromMenu: function findParentFromMenu(route) {
      var menu = this.menu;
      for (var i = 0, l = menu.length; i < l; i++) {
        var item = menu[i];
        var k = item.children && item.children.length;
        if (k) {
          for (var j = 0; j < k; j++) {
            if (item.children[j].name === route.name) {
              return item;
            }
          }
        }
      }
    }
  }),

  watch: {
    $route: function $route(route) {
      this.isReady = true;
      this.shouldExpandMatchItem(route);
    }
  }

});

/***/ }),
/* 905 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    mall: Object
  },

  data: function data() {
    return {
      processing: false
    };
  },


  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['addMall', 'setApp']), {

    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.processing = true;
                _context.next = 3;
                return this.$acs.updateMallInfo({
                  mall: this.mall
                }, this.$t('admin.notification.message.mallInfoUpdated'));

              case 3:
                result = _context.sent;

                if (result.success) {
                  __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/admin_actions/fetch_app', {
                    app_id: this.mall.app_id
                  }).then(function (response) {
                    return response.data;
                  }).then(function (result) {
                    if (result.success) {
                      _this.setApp(result.app);
                    }
                  });
                }
                this.processing = false;
                if (result.mall) {
                  this.addMall(result.mall);
                  this.$nextTick(function (_) {
                    _this.$router.replace({
                      path: '/admin/malls/edit/${result.mall.id}'
                    });
                  });
                }

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  })

});

/***/ }),
/* 906 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_store_getters__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_bulma_tooltip__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_messageBox__ = __webpack_require__(80);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      keyword: "",
      searching: false,
      loading: true,
      goodses: [],
      page: 1,
      total: 1,
      recordsPerPage: 8,
      appId: "",
      currency: ""
    };
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['app'])),
  mounted: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.fetchGoods(this.page, this.recordsPerPage);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function mounted() {
      return _ref.apply(this, arguments);
    }

    return mounted;
  }(),

  watch: {
    app: function app(newVal) {
      this.appId = newVal.id;
      this.currency = newVal.currency;
      this.fetchGoods(this.page, this.recordsPerPage);
    }
  },

  methods: {
    getPrice: function getPrice(price) {
      return "¥" + parseFloat(price / 100).toFixed(2);
    },

    onPageChange: function onPageChange(page) {
      this.fetchGoods(page, this.recordsPerPage);
    },

    onSearchBoxSubmit: function onSearchBoxSubmit() {
      if (this.keyword) {
        this.searchGoods(1);
      } else {
        this.fetchGoods(1, this.recordsPerPage);
      }
    },

    onEdit: function onEdit(goods_id) {
      this.$router.push({
        name: 'EditGoods',
        params: {
          goodsId: goods_id,
          currency: this.currency
        }
      });
    },

    onDelete: function onDelete(goods, index) {
      var _this = this;

      if (goods.sold > 0) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__["a" /* openNotification */])({
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.mall.soldCanNotDelete'),
          type: 'danger',
          duration: 4500,
          container: '.notifications'
        });
      } else {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_messageBox__["a" /* showMessageBox */])({
          visible: true,
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.messages.confirmDeleteMallGoods'),
          type: 'danger',
          onOK: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_) {
              var result;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return _this.$acs.deleteMallGoods({
                        app_id: goods.app_id,
                        goods_id: goods.id
                      }, _this.$t('admin.notification.message.mallGoodsDeleted'));

                    case 2:
                      result = _context2.sent;

                      if (result.success) {
                        _this.goodses.splice(index, 1);
                      }

                    case 4:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, _this);
            }));

            return function onOK(_x) {
              return _ref2.apply(this, arguments);
            };
          }()
        });
      }
    },

    fetchGoods: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(page, recordsPerPage) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.loading = true;
                _context3.next = 3;
                return this.$acs.fetchGoods({
                  keyword: "",
                  page: page,
                  records_per_page: recordsPerPage
                });

              case 3:
                result = _context3.sent;


                if (result.success) {
                  this.total = result.total;
                  this.goodses = result.goodses;
                  this.page = page;
                }

                this.loading = false;

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchGoods(_x2, _x3) {
        return _ref3.apply(this, arguments);
      }

      return fetchGoods;
    }(),

    searchGoods: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(page) {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.searching = true;
                _context4.next = 3;
                return this.$acs.fetchGoods({
                  keyword: this.keyword,
                  page: page,
                  records_per_page: this.recordsPerPage
                });

              case 3:
                result = _context4.sent;

                if (result.success) {
                  this.total = result.total;
                  this.goodses = result.goodses;
                  this.page = page;
                }
                this.searching = false;

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function searchGoods(_x4) {
        return _ref4.apply(this, arguments);
      }

      return searchGoods;
    }()
  },

  components: {
    Pagination: __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination___default.a,
    Tooltip: __WEBPACK_IMPORTED_MODULE_4_vue_bulma_tooltip__["a" /* default */]
  }
});

/***/ }),
/* 907 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_store_getters__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_bulma_tooltip__ = __webpack_require__(81);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      keyword: "",
      searching: false,
      loading: true,
      initing: false,
      orders: [],
      page: 0,
      total: 1,
      recordsPerPage: 10
    };
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])(['app'])),

  mounted: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.fetchOrders();

            case 2:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function mounted() {
      return _ref.apply(this, arguments);
    }

    return mounted;
  }(),

  watch: {},

  methods: {
    getAppIcon: function getAppIcon(order) {
      if (this.app && this.app.icon) {
        return this.app.icon;
      } else {
        return 'https://placehold.it/32x32?text=' + app.name;
      }
    },

    getOrderTransactionId: function getOrderTransactionId(order) {
      if (order.transaction_id.startsWith('empty.')) {
        return '';
      } else {
        return order.transaction_id;
      }
    },

    getOrderPlatformIcon: function getOrderPlatformIcon(order) {
      var result = 'fa fa-';
      switch (order.platform) {
        case 'android':
          result = result + 'android';
          break;
        case 'ios':
          result = result + 'apple ';
          break;
        case 'wp8':
          result = result + 'windows ';
          break;
        default:
          result = result + 'apple ';
          break;
      }

      switch (order.status) {
        case 0:
          result = result + ' is-primary';
          break;
        case 1:
          result = result + ' is-info';
          break;
        case 2:
          result = result + ' is-success';
          break;
        case 3:
          result = result + ' is-danger';
          break;
      }

      return result;
    },

    onPageChange: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(page) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.page = page;
                _context2.next = 3;
                return this.fetchOrders();

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onPageChange(_x) {
        return _ref2.apply(this, arguments);
      }

      return onPageChange;
    }(),

    onSearchBoxSubmit: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.page = 0;
                _context3.next = 3;
                return this.fetchOrders();

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onSearchBoxSubmit() {
        return _ref3.apply(this, arguments);
      }

      return onSearchBoxSubmit;
    }(),

    fetchOrders: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.loading = true;
                _context4.next = 3;
                return this.$acs.fetchMallOrders({
                  app_id: this.$route.params.appId,
                  keyword: this.keyword,
                  page: this.page + 1,
                  records_per_page: this.recordsPerPage
                });

              case 3:
                result = result = _context4.sent;


                if (result.success) {
                  this.total = result.total;
                  this.orders = result.orders;
                  this.page = this.page + 1;
                }

                this.loading = false;

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchOrders() {
        return _ref4.apply(this, arguments);
      }

      return fetchOrders;
    }()
  },

  components: {
    Pagination: __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination___default.a,
    Tooltip: __WEBPACK_IMPORTED_MODULE_4_vue_bulma_tooltip__["a" /* default */]
  }
});

/***/ }),
/* 908 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_vue_i18n__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dialog_messageBox__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_dialog_setting_settingInfo__ = __webpack_require__(1367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_dialog_setting_settingInfo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_admin_components_dialog_setting_settingInfo__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









var settingInfoDialogComponent = __WEBPACK_IMPORTED_MODULE_1_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_4_admin_components_dialog_setting_settingInfo___default.a);

var openSettingInfoDialog = function openSettingInfoDialog() {
  var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    visible: true
  };

  return new settingInfoDialogComponent({
    i18n: __WEBPACK_IMPORTED_MODULE_2_admin_vue_i18n__["a" /* i18n */],
    el: document.createElement('div'),
    propsData: propsData
  });
};

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    group: {
      type: String,
      default: ''
    }
  },

  mounted: function mounted() {
    this.getBasicSettings();
  },

  data: function data() {
    return {
      settings: Object,
      processing: false
    };
  },


  methods: {
    getBasicSettings: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.processing = true;
                _context.next = 3;
                return this.$acs.getSettingsByGroup({
                  group: this.group
                });

              case 3:
                result = _context.sent;

                if (result.success) {
                  this.settings = result.settings;
                }
                this.processing = false;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getBasicSettings() {
        return _ref.apply(this, arguments);
      }

      return getBasicSettings;
    }(),

    editSettingInfo: function editSettingInfo(setting, index) {
      var _this = this;

      openSettingInfoDialog({
        setting: setting,
        visible: true,
        callback: function callback(new_setting) {
          _this.settings[index] = new_setting;
        }
      });
    },

    delSetting: function delSetting(setting_name, index) {
      var _this2 = this;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__dialog_messageBox__["a" /* showMessageBox */])({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.messages.confirmDeleteSetting'),
        type: 'danger',
        onOK: function () {
          var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_) {
            var result;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _this2.processing = true;
                    _context2.next = 3;
                    return _this2.$acs.deleteSettingByName({
                      setting_name: setting_name
                    }, _this2.$t('admin.notification.message.configDeleted', {
                      configName: setting_name
                    }));

                  case 3:
                    result = _context2.sent;

                    if (result.success) {
                      _this2.settings.splice(index, 1);
                    }
                    _this2.processing = false;

                  case 6:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this2);
          }));

          return function onOK(_x2) {
            return _ref2.apply(this, arguments);
          };
        }()
      });
    },

    addNewSetting: function addNewSetting() {
      var _this3 = this;

      openSettingInfoDialog({
        setting: {
          id: '',
          name: '',
          value: '',
          group: this.group,
          memo: '',
          active: true
        },
        visible: true,
        callback: function callback(setting) {
          _this3.settings.push(setting);
        }
      });
    }
  }

});

/***/ }),
/* 909 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_datepicker__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_bulma_datepicker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_components_chart_bar__ = __webpack_require__(784);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    days: {
      default: 0,
      type: Number
    }
  },

  data: function data() {
    return {
      options: {
        segmentShowStroke: false,
        responsive: true,
        maintainAspectRatio: false,
        pointDot: false,
        pointDotRadius: 0
      },
      currentTiming: [],
      reports: null,
      timing: null,
      platform: 'all',
      date: ''
    };
  },


  mounted: function mounted() {
    this.date = new Date().DateAdd('d', this.days).Format("yyyy-MM-dd");
    this.getStatsByDay();
    this.getUserTimingByDay();
  },

  methods: {
    changePlatform: function changePlatform(val) {
      switch (this.platform) {
        case 'all':
          this.currentTiming = this.timing[0];
          break;
        case 'android':
          this.currentTiming = this.timing[1];
          break;
        default:
          this.currentTiming = this.timing[2];
      }

      var param_str = "'0-5分钟', '5-10分钟', '10-15分钟', '15-20分钟', '20-25分钟', '25-30分钟', '30-35分钟', '35-40分钟', '40-45分钟', '45-50分钟', '50-55分钟', '55-60分钟', '60分钟以上'";
      var param = param_str.split(',');
      var datasets = [];
      datasets.push({
        "label": "在线时长统计",
        "data": this.currentTiming
      });
      var barData = {
        "labels": param,
        "datasets": datasets
      };
      this.$refs.chart.updateChart(barData);
    },

    getStatsByDay: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$acs.getStatsByDay({
                  date: this.date
                });

              case 2:
                result = _context.sent;


                if (result.success && result.reports && result.reports.length == 3 && result.reports[0] != '') {
                  this.reports = result.reports;
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getStatsByDay() {
        return _ref.apply(this, arguments);
      }

      return getStatsByDay;
    }(),

    getUserTimingByDay: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$acs.getUserTimingByDay({
                  date: this.date
                });

              case 2:
                result = _context2.sent;


                if (result.success && result.timing && result.timing.length == 3 && result.timing[0] != '') {
                  this.timing = result.timing;
                  this.changePlatform();
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getUserTimingByDay() {
        return _ref2.apply(this, arguments);
      }

      return getUserTimingByDay;
    }()
  },

  components: {
    BarChart: __WEBPACK_IMPORTED_MODULE_1_admin_components_chart_bar__["a" /* default */],
    Datepicker: __WEBPACK_IMPORTED_MODULE_0_vue_bulma_datepicker___default.a
  }
});

/***/ }),
/* 910 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_filters__ = __webpack_require__(52);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    appUsers: {
      type: Array,
      default: []
    }
  }
});

/***/ }),
/* 911 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_filters__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_user_appUserList__ = __webpack_require__(1380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_user_appUserList___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_admin_components_user_appUserList__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  mounted: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.getUser();

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function mounted() {
      return _ref.apply(this, arguments);
    }

    return mounted;
  }(),
  data: function data() {
    return {
      buttonType: ["success", "danger", "info", "text", "warning", "primary"],
      user: undefined,
      appUsers: undefined,
      summarySeconds: 0,
      summaryAmount: 0
    };
  },

  methods: {
    showAppUsers: function showAppUsers(user) {
      var users = [];
      users.push(user);
      return users;
    },
    getUser: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, app;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$acs.getUserById(this.id);

              case 2:
                result = _context2.sent;

                if (!result.success) {
                  _context2.next = 25;
                  break;
                }

                this.user = result.user;
                this.appUsers = this.user[0].app_users;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 9;
                for (_iterator = this.appUsers[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  app = _step.value;

                  this.summaryAmount += parseInt(app.pay_amount);
                  this.summarySeconds += parseInt(app.active_seconds);
                }
                _context2.next = 17;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2['catch'](9);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 17:
                _context2.prev = 17;
                _context2.prev = 18;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 20:
                _context2.prev = 20;

                if (!_didIteratorError) {
                  _context2.next = 23;
                  break;
                }

                throw _iteratorError;

              case 23:
                return _context2.finish(20);

              case 24:
                return _context2.finish(17);

              case 25:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[9, 13, 17, 25], [18,, 20, 24]]);
      }));

      function getUser() {
        return _ref2.apply(this, arguments);
      }

      return getUser;
    }(),
    formatServerDateTime: function formatServerDateTime(row, column) {
      return __WEBPACK_IMPORTED_MODULE_1_common_js_filters__["formatServerDateTime"](row.inserted_at);
    }
  },
  components: {
    Modal: __WEBPACK_IMPORTED_MODULE_0_vue_bulma_modal__["a" /* Modal */],
    AppUserList: __WEBPACK_IMPORTED_MODULE_2_admin_components_user_appUserList___default.a
  }
});

/***/ }),
/* 912 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      processing: false
    };
  },


  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['wcpParams'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['updateWcpParams']), {

    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.processing = true;
                _context.next = 3;
                return this.$acs.updateWcpParams(this.wcpParams, this.$t('admin.notification.message.wcpParamsUpdated'));

              case 3:
                result = _context.sent;

                if (result.success) {
                  this.updateWcpParams(result.wcpconfig);
                }
                this.processing = false;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  })

});

/***/ }),
/* 913 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_components_fileUpload__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_components_toast__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_bulma_tooltip__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_tipBox__ = __webpack_require__(787);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//












/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    this.serverHost = location.origin + "/api/wcp/" + this.$route.params.appId;
  },

  data: function data() {
    return {
      show: false,
      serverHost: '',
      processing: false,
      tips: ['<p><img src="/images/wcp_tip1.png"></p><p><img src="/images/wcp_tip2.png"></p>', '<p><img src="/images/wcp_tip3.png"></p>', '<p><img src="/images/wcp_tip4.png"></p>']
    };
  },


  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['wcpParams'])),

  components: {
    Tooltip: __WEBPACK_IMPORTED_MODULE_4_vue_bulma_tooltip__["a" /* default */]
  },

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['updateWcpParams']), {

    toastClipboardSuccess: function toastClipboardSuccess() {
      __WEBPACK_IMPORTED_MODULE_3_common_components_toast__["a" /* default */].show(this.$t('admin.messages.copyClipboardSuccess'));
    },

    showTip: function showTip(idx) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_tipBox__["a" /* showTipBox */])({
        visible: true,
        message: this.tips[idx]
      });
    },

    updateFile: function updateFile(wcpParams) {
      var _this = this;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_common_components_fileUpload__["a" /* showFileUploadDialog */])(this.$i18n, {
        postAction: '/admin_actions/wcp/upload_wcp_file',
        accept: 'text/plain',
        data: {
          app_id: wcpParams.app_id
        },
        headers: {
          'x-csrf-token': window.acsConfig.csrfToken
        },
        extensions: ['txt'],
        title: this.$t('admin.titles.uploadWcpFile'),
        callback: function callback(response) {
          if (response.success) {
            wcpParams.verify_File = response.filename;
            _this.updateWcpParams(wcpParams);
          } else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__["b" /* processAjaxError */])(response);
          }
        }
      });
    },

    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.processing = true;
                _context.next = 3;
                return this.$acs.updateWcpParams(this.wcpParams, this.$t('admin.notification.message.wcpParamsUpdated'));

              case 3:
                result = _context.sent;

                if (result.success) {
                  this.updateWcpParams(result.wcpconfig);
                }
                this.processing = false;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  })

});

/***/ }),
/* 914 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      loginCode: ':login_code',
      processing: false
    };
  },


  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['wcpParams'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['updateWcpParams']), {

    setLoginCode: function setLoginCode(msgtype, x) {
      switch (msgtype) {
        case 1:
          this.wcpParams.subscribed_response = x.value ? this.loginCode : '';
          break;
        case 2:
          this.wcpParams.scan_response = x.value ? this.loginCode : '';
          break;
        case 3:
          this.wcpParams.default_response = x.value ? this.loginCode : '';
          break;
      }
    },

    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.processing = true;
                _context.next = 3;
                return this.$acs.updateWcpParams(this.wcpParams, this.$t('admin.notification.message.wcpParamsUpdated'));

              case 3:
                result = _context.sent;

                if (result.success) {
                  this.updateWcpParams(result.wcpconfig);
                }
                this.processing = false;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  })

});

/***/ }),
/* 915 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      processing: false
    };
  },


  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['wcpParams'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['updateWcpParams']), {

    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.processing = true;
                _context.next = 3;
                return this.$acs.updateWcpParams(this.wcpParams, this.$t('admin.notification.message.wcpParamsUpdated'));

              case 3:
                result = _context.sent;

                if (result.success) {
                  this.updateWcpParams(result.wcpconfig);
                }
                this.processing = false;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  })

});

/***/ }),
/* 916 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_imageUpload__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_miscellaneous__ = __webpack_require__(40);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      appList: undefined
    };
  },


  created: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.$acs.fetchAppList();

            case 2:
              result = _context.sent;

              if (result.success) {
                this.appList = result.apps;
              }

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function created() {
      return _ref.apply(this, arguments);
    }

    return created;
  }(),

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['adminLevel'])),

  methods: {
    updateAppIcon: function updateAppIcon(app) {
      var _this = this;

      if (this.adminLevel < 3) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_common_components_imageUpload__["a" /* showImageUploadDialog */])(this.$i18n, {
          postAction: '/admin_actions/app/update_app_icon',
          width: 128,
          height: 128,
          data: {
            app_id: app.id
          },
          headers: {
            'x-csrf-token': window.acsConfig.csrfToken
          },
          title: this.$t('admin.titles.uploadAppIcon', {
            appName: app.name
          }),
          callback: function callback(response) {
            if (response.success) {
              app.icon = response.icon_url;
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_admin_miscellaneous__["a" /* openNotification */])({
                title: _this.$t('admin.notification.title.success'),
                message: _this.$t('admin.app.message.appIconUpdated', {
                  appName: app.name
                }),
                type: 'success',
                duration: 4500,
                container: '.notifications'
              });
            } else {
              __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_admin_miscellaneous__["b" /* processAjaxError */])(response);
            }
          }
        });
      }
    }
  }
});

/***/ }),
/* 917 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_setting_basicInfoEditor__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_setting_basicInfoEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_admin_components_setting_basicInfoEditor__);
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Tabs: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["a" /* Tabs */],
    TabPane: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["b" /* TabPane */],
    basicInfoEditor: __WEBPACK_IMPORTED_MODULE_2_admin_components_setting_basicInfoEditor___default.a
  }
});

/***/ }),
/* 918 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_vue_i18n__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_dialog_messageBox__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_dialog_adminUser_sectionInfo__ = __webpack_require__(1358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_dialog_adminUser_sectionInfo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_admin_components_dialog_adminUser_sectionInfo__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






var sectionInfoDialogComponent = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_3_admin_components_dialog_adminUser_sectionInfo___default.a);

var openSectionInfoDialog = function openSectionInfoDialog() {
  var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    visible: true
  };

  return new sectionInfoDialogComponent({
    i18n: __WEBPACK_IMPORTED_MODULE_1_admin_vue_i18n__["a" /* i18n */],
    el: document.createElement('div'),
    propsData: propsData
  });
};
/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.getLevel();

            case 2:
              _context.next = 4;
              return this.getAdminUser();

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function mounted() {
      return _ref.apply(this, arguments);
    }

    return mounted;
  }(),
  data: function data() {
    return {
      users: undefined,
      level: 0
    };
  },


  methods: {
    getLevel: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$acs.getCurrentUserLevel();

              case 2:
                result = _context2.sent;

                if (result.success) {
                  this.level = result.level;
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getLevel() {
        return _ref2.apply(this, arguments);
      }

      return getLevel;
    }(),
    getAdminUser: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.$acs.getAdminUserByApp();

              case 2:
                result = _context3.sent;

                if (result.success) {
                  this.users = result.users;
                }

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getAdminUser() {
        return _ref3.apply(this, arguments);
      }

      return getAdminUser;
    }(),
    addUser: function addUser(level) {
      openSectionInfoDialog({
        section: {
          age: 0,
          email: '',
          mobile: '',
          password: '',
          nickname: '',
          level: level,
          active: false,
          device_id: ''
        },
        visible: true,
        callback: function callback(section) {}
      });
    },
    addAdminUser: function addAdminUser(level) {
      var _this = this;

      openSectionInfoDialog({
        section: {
          level: level
        },
        visible: true,
        callback: function callback(section) {
          _this.getAdminUser();
        }
      });
    },
    showUser: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(user) {
        var par, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                par = new Object();

                par.user_id = user.user.id;
                _context4.next = 4;
                return this.$acs.getUserFromRedis(par);

              case 4:
                result = _context4.sent;

                if (result.success) {}

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function showUser(_x2) {
        return _ref4.apply(this, arguments);
      }

      return showUser;
    }(),
    deleteUsers: function deleteUsers(users) {
      var _this2 = this;

      var confirmMessage = users.admin_level == 2 ? this.$t('admin.messages.confirmDeleteAppManager', {
        nickName: users.user.nickname
      }) : this.$t('admin.messages.confirmDeleteCustomerService', {
        nickName: users.user.nickname
      });
      var deletedMessage = users.admin_level == 2 ? this.$t('admin.notification.message.appManagerDeleted', {
        nickName: users.user.nickname
      }) : this.$t('admin.notification.message.appCustomerServiceDeleted', {
        nickName: users.user.nickname
      });
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_admin_components_dialog_messageBox__["a" /* showMessageBox */])({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: confirmMessage,
        type: 'danger',
        onOK: function () {
          var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(_) {
            var result;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return _this2.$acs.deleteAdminUser({
                      admin_user_id: users.id
                    }, deletedMessage);

                  case 2:
                    result = _context5.sent;

                    if (result.success) {
                      _this2.getAdminUser();
                    }

                  case 4:
                  case 'end':
                    return _context5.stop();
                }
              }
            }, _callee5, _this2);
          }));

          return function onOK(_x3) {
            return _ref5.apply(this, arguments);
          };
        }()
      });
    }
  }
});

/***/ }),
/* 919 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_components_toast__ = __webpack_require__(35);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    app: {
      type: Object,
      required: true
    }
  },

  data: function data() {
    return {
      processing: false,
      currencies: ['CNY', 'HKD', 'USD']
    };
  },


  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['sdks'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['setApp', 'addForum', 'fetchMalls']), {

    toastClipboardSuccess: function toastClipboardSuccess() {
      __WEBPACK_IMPORTED_MODULE_2_common_components_toast__["a" /* default */].show(this.$t('admin.messages.copyClipboardSuccess'));
    },

    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.app.has_forum) {
                  if (!this.app.forum_name) this.app.forum_name = this.app.name;
                }

                this.processing = true;

                _context.next = 4;
                return this.$acs.updateAppInfo({
                  app: this.app
                }, this.$t('admin.notification.message.appInfoUpdated', {
                  appName: this.app.name
                }));

              case 4:
                result = _context.sent;


                if (result.success) {
                  this.fetchMalls(this.$router.appId);

                  if (result.app) {
                    this.setApp(result.app);
                    this.$nextTick(function (_) {
                      _this.$router.replace({
                        path: '/admin/app/' + result.app.id + '/config/'
                      });
                    });
                  }
                }
                this.processing = false;

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  })

});

/***/ }),
/* 920 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_imageUpload__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_dialog_messageBox__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_admin_vue_i18n__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_admin_components_dialog_app_goodsInfo__ = __webpack_require__(1360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_admin_components_dialog_app_goodsInfo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_admin_components_dialog_app_goodsInfo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_admin_components_dialog_app_goodsProductId__ = __webpack_require__(1361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_admin_components_dialog_app_goodsProductId___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_admin_components_dialog_app_goodsProductId__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vue_bulma_tooltip__ = __webpack_require__(81);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//













var goodsInfoDialogComponent = __WEBPACK_IMPORTED_MODULE_4_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_6_admin_components_dialog_app_goodsInfo___default.a);

var openGoodsInfoDialog = function openGoodsInfoDialog() {
  var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    visible: true
  };

  return new goodsInfoDialogComponent({
    i18n: __WEBPACK_IMPORTED_MODULE_5_admin_vue_i18n__["a" /* i18n */],
    el: document.createElement('div'),
    propsData: propsData
  });
};


var goodsProductIdDialogComponent = __WEBPACK_IMPORTED_MODULE_4_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_7_admin_components_dialog_app_goodsProductId___default.a);

var openGoodsProductIdDialog = function openGoodsProductIdDialog() {
  var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    visible: true
  };

  return new goodsProductIdDialogComponent({
    i18n: __WEBPACK_IMPORTED_MODULE_5_admin_vue_i18n__["a" /* i18n */],
    el: document.createElement('div'),
    propsData: propsData
  });
};



var productSdks = ['coolpad', 'yyh', 'lenovo', 'ccplay'];

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    app: Object
  },

  computed: {
    sdks: function sdks() {
      var sdks = ['applestore', 'ggplay'];
      var added = [];

      if (this.app.sdk_bindings) {
        this.app.sdk_bindings.forEach(function (x) {
          return added.push(x.sdk);
        });

        productSdks.forEach(function (sdk) {
          if (added.indexOf(sdk) >= 0) {
            sdks.push(sdk);
          }
        });
      }

      return sdks;
    }
  },

  methods: {
    classOfGoodsSdk: function classOfGoodsSdk(goods, sdk) {
      var result = sdk;
      var productIds = {};

      goods.product_ids.forEach(function (x) {
        productIds[x.sdk] = x.product_id;
      });

      if (productIds[sdk]) {
        return sdk;
      } else {
        return sdk + ' need-configured';
      }
    },

    updateGoodsIcon: function updateGoodsIcon(goods) {
      var _this = this;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_common_components_imageUpload__["a" /* showImageUploadDialog */])(this.$i18n, {
        postAction: '/admin_actions/app/update_goods_icon',
        width: 128,
        height: 128,
        data: {
          app_id: this.app.id,
          goods_id: goods.id
        },
        headers: {
          'x-csrf-token': window.acsConfig.csrfToken
        },
        extensions: ['png', 'jpg'],
        title: this.$t('admin.titles.uploadGoodsIcon', {
          goodsName: goods.name
        }),
        callback: function callback(response) {
          if (response.success) {
            goods.icon = response.icon_url;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_admin_miscellaneous__["a" /* openNotification */])({
              title: _this.$t('admin.notification.title.success'),
              message: _this.$t('admin.app.message.goodsIconUpdated', {
                goodsName: goods.name
              }),
              type: 'success',
              duration: 4500,
              container: '.notifications'
            });
          } else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_admin_miscellaneous__["b" /* processAjaxError */])(response);
          }
        }
      });
    },

    editGoodsInfo: function editGoodsInfo(goods, index) {
      var _this2 = this;

      openGoodsInfoDialog({
        goods: goods,
        appId: this.app.id,
        appName: this.app.name,
        currency: this.app.currency,
        visible: true,
        callback: function callback(new_goods) {
          _this2.app.goods[index] = new_goods;
        }
      });
    },

    editGoodsProductId: function editGoodsProductId(goods, sdk) {
      var index = goods.product_ids.findIndex(function (x) {
        return x.sdk == sdk;
      });

      var productIdInfo = goods.product_ids[index] || {
        app_goods_id: goods.id,
        sdk: sdk,
        product_id: ''
      };

      openGoodsProductIdDialog({
        goodsName: goods.name,
        productIdInfo: productIdInfo,
        appId: this.app.id,
        callback: function callback(newProductIdInfo) {
          if (index == -1) {
            goods.product_ids.push(newProductIdInfo);
          } else {
            goods.product_ids[index] == newProductIdInfo;
          }
        }
      });
    },


    deleteGoods: function deleteGoods(goods, index) {
      var _this3 = this;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_admin_components_dialog_messageBox__["a" /* showMessageBox */])({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.messages.confirmDeleteGoods', {
          goodsName: goods.name
        }),
        type: 'danger',
        onOK: function () {
          var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_) {
            var result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _this3.$acs.deleteAppGoods({
                      app_id: goods.app_id,
                      goods_id: goods.id
                    }, _this3.$t('admin.notification.message.goodsDeleted', {
                      goodsName: goods.name
                    }));

                  case 2:
                    result = _context.sent;

                    if (result.success) {
                      _this3.app.goods.splice(index, 1);
                    }

                  case 4:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this3);
          }));

          return function onOK(_x3) {
            return _ref.apply(this, arguments);
          };
        }()
      });
    },

    addNewGoods: function addNewGoods() {
      var _this4 = this;

      openGoodsInfoDialog({
        goods: {
          id: '',
          name: '',
          description: '',
          price: 0,
          app_id: this.app.id
        },
        appId: this.app.id,
        appName: this.app.name,
        currency: this.app.currency,
        visible: true,
        callback: function callback(goods) {
          _this4.app.goods.push(goods);
        }
      });
    }
  },

  components: {
    Tooltip: __WEBPACK_IMPORTED_MODULE_8_vue_bulma_tooltip__["a" /* default */]
  }

});

/***/ }),
/* 921 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    app: {
      type: Object,
      required: true
    }
  },

  data: function data() {
    return {
      processing: false,
      currencies: ['CNY', 'HKD', 'USD']
    };
  },


  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['sdks'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['setApp', 'addForum', 'fetchMalls']), {

    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.app.has_forum) {
                  if (!this.app.forum_name) this.app.forum_name = this.app.name;
                }

                this.processing = true;

                _context.next = 4;
                return this.$acs.updateAppInfo({
                  app: this.app
                }, this.$t('admin.notification.message.appInfoUpdated', {
                  appName: this.app.name
                }));

              case 4:
                result = _context.sent;


                if (result.success) {
                  this.fetchMalls(this.$router.appId);

                  if (result.app) {
                    this.setApp(result.app);
                    this.$nextTick(function (_) {
                      _this.$router.replace({
                        path: '/admin/app/' + result.app.id + '/config/'
                      });
                    });
                  }
                }
                this.processing = false;

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  })

});

/***/ }),
/* 922 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__basicInfoEditor__ = __webpack_require__(751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__basicInfoEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__basicInfoEditor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sdkInfoEditor__ = __webpack_require__(1391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sdkInfoEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__sdkInfoEditor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__goodsInfoEditor__ = __webpack_require__(1388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__goodsInfoEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__goodsInfoEditor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__linkEditor__ = __webpack_require__(1389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__linkEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__linkEditor__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










/* harmony default export */ __webpack_exports__["default"] = ({
  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['app', 'sdks'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['fetchPlatformApp'])),

  components: {
    Tabs: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["a" /* Tabs */],
    TabPane: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["b" /* TabPane */],
    basicInfoEditor: __WEBPACK_IMPORTED_MODULE_2__basicInfoEditor___default.a,
    sdkInfoEditor: __WEBPACK_IMPORTED_MODULE_3__sdkInfoEditor___default.a,
    goodsInfoEditor: __WEBPACK_IMPORTED_MODULE_4__goodsInfoEditor___default.a,
    linkEditor: __WEBPACK_IMPORTED_MODULE_5__linkEditor___default.a
  }
});

/***/ }),
/* 923 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_vue_i18n__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_dialog_app_sdkInfo__ = __webpack_require__(1362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_dialog_app_sdkInfo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_admin_components_dialog_app_sdkInfo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_dialog_app_sdkList__ = __webpack_require__(1363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_dialog_app_sdkList___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_admin_components_dialog_app_sdkList__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_admin_miscellaneous__ = __webpack_require__(40);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







var sdkInfoDialogComponent = __WEBPACK_IMPORTED_MODULE_1_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_3_admin_components_dialog_app_sdkInfo___default.a);

var openSdkInfoDialog = function openSdkInfoDialog() {
  var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    visible: true
  };

  return new sdkInfoDialogComponent({
    i18n: __WEBPACK_IMPORTED_MODULE_2_admin_vue_i18n__["a" /* i18n */],
    el: document.createElement('div'),
    propsData: propsData
  });
};


var sdkListDialogComponent = __WEBPACK_IMPORTED_MODULE_1_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_4_admin_components_dialog_app_sdkList___default.a);

var openSdkListDialog = function openSdkListDialog() {
  var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    visible: true
  };

  return new sdkListDialogComponent({
    i18n: __WEBPACK_IMPORTED_MODULE_2_admin_vue_i18n__["a" /* i18n */],
    el: document.createElement('div'),
    propsData: propsData
  });
};



/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    app: Object
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['sdks'])),

  methods: {
    editSdkInfo: function editSdkInfo(sdkInfo) {
      openSdkInfoDialog(_extends({}, sdkInfo, {
        app: this.app,
        visible: true
      }));
    },

    selectSdkToAdd: function selectSdkToAdd() {
      var _this = this;

      var sdks = [];
      var added = [];

      this.app.sdk_bindings.forEach(function (x) {
        added.push(x.sdk);
      });

      added.push('alipay'); // alipay and wechat are payment sdks
      added.push('applestore');
      added.push('appstore');
      added.push('firevale');
      added.push('qq');

      this.sdks.forEach(function (sdk) {
        if (added.indexOf(sdk) < 0) {
          sdks.push(sdk);
        }
      });

      openSdkListDialog({
        visible: true,
        appName: this.app.name,
        callback: function () {
          var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(sdk) {
            var result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _this.$acs.generateDummySdkInfo({ sdk: sdk });

                  case 2:
                    result = _context.sent;

                    if (result.success) {
                      openSdkInfoDialog({
                        sdk: sdk,
                        binding: result.binding,
                        app: _this.app,
                        visible: true
                      });
                    }

                  case 4:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }));

          return function callback(_x3) {
            return _ref.apply(this, arguments);
          };
        }(),
        sdks: sdks
      });
    }
  }
});

/***/ }),
/* 924 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_components_chart_line3__ = __webpack_require__(786);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      options: {
        segmentShowStroke: false,
        responsive: true,
        maintainAspectRatio: false,
        pointDot: false,
        pointDotRadius: 0
      }
    };
  },


  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['app', 'latestOnlineData', 'briefStats'])),

  mounted: function mounted() {
    this.getBriefStats();
    this.getOnlineChart();
  },

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['setAppBriefStats']), {

    getOnlineChart: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$acs.getOnlineChart(this.$route.params.appId);

              case 2:
                result = _context.sent;


                if (result.success && result.chart.labels.length > 0 && this.$refs.chart) {
                  this.$refs.chart.updateChart(result.chart);
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getOnlineChart() {
        return _ref.apply(this, arguments);
      }

      return getOnlineChart;
    }(),

    getBriefStats: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$acs.getBriefStats(this.$route.params.appId);

              case 2:
                result = _context2.sent;


                if (result.success) {
                  this.setAppBriefStats(result.stats);
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getBriefStats() {
        return _ref2.apply(this, arguments);
      }

      return getBriefStats;
    }()
  }),

  watch: {
    'latestOnlineData': function latestOnlineData(chart) {
      if (this.$refs.chart && chart) {
        this.$refs.chart.addData(chart.label, chart.data, 180);
      }
    }
  },

  components: {
    LineChart: __WEBPACK_IMPORTED_MODULE_1_admin_components_chart_line3__["a" /* default */]
  }
});

/***/ }),
/* 925 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_vue_i18n__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_dialog_customerService_replyQuestion__ = __webpack_require__(1364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_dialog_customerService_replyQuestion___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_admin_components_dialog_customerService_replyQuestion__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_messageBox__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_admin_components_Pagination__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_admin_components_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_admin_components_Pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vue_bulma_tooltip__ = __webpack_require__(81);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









var replyQuestionDialog = __WEBPACK_IMPORTED_MODULE_2_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_4_admin_components_dialog_customerService_replyQuestion___default.a);

var openDialog = function openDialog() {
  var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    visible: true
  };

  return new replyQuestionDialog({
    i18n: __WEBPACK_IMPORTED_MODULE_3_admin_vue_i18n__["a" /* i18n */],
    el: document.createElement('div'),
    propsData: propsData
  });
};





/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      questions: [],
      page: 1,
      total: 1,
      recordsPerPage: 10,
      loading: true
    };
  },


  mounted: function mounted() {
    this.getPagedQuestions(this.page, this.recordsPerPage);
    this.loading = true;
  },

  methods: {

    replyQuestion: function replyQuestion(question, index) {
      var _this = this;

      openDialog({
        question: question,
        visible: true,
        callback: function callback(question) {
          _this.questions[index] = question;
        }
      });
    },

    deleteItem: function deleteItem(item, index) {
      var _this2 = this;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_messageBox__["a" /* showMessageBox */])({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.customerService.messages.confirmDeleteQuestion', {
          title: item.title
        }),
        type: 'danger',
        onOK: function () {
          var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_) {
            var result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _this2.$acs.deleteQuestion({
                      id: item.id
                    }, _this2.$t('admin.customerService.messages.questionDeleted', {
                      title: item.title
                    }));

                  case 2:
                    result = _context.sent;

                    if (result.success) {
                      _this2.questions.splice(index, 1);
                    }

                  case 4:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this2);
          }));

          return function onOK(_x2) {
            return _ref.apply(this, arguments);
          };
        }()
      });
    },

    getPagedQuestions: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(page, recordsPerPage) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$acs.getPagedQuestions(this.$route.params.appId, page, recordsPerPage);

              case 2:
                result = _context2.sent;


                if (result.success) {
                  this.total = result.total;
                  this.questions = result.questions;
                  this.page = page;
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getPagedQuestions(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return getPagedQuestions;
    }(),

    onPageChange: function onPageChange(page) {
      this.getPagedQuestions(page, this.recordsPerPage);
    }
  },

  components: {
    Pagination: __WEBPACK_IMPORTED_MODULE_6_admin_components_Pagination___default.a,
    Tooltip: __WEBPACK_IMPORTED_MODULE_7_vue_bulma_tooltip__["a" /* default */]
  }

});

/***/ }),
/* 926 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_forum_basicInfoEditor__ = __webpack_require__(1369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_forum_basicInfoEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_admin_components_forum_basicInfoEditor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_forum_sectionInfoEditor__ = __webpack_require__(1370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_forum_sectionInfoEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_admin_components_forum_sectionInfoEditor__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    this.fetchForum();
  },
  data: function data() {
    return {
      forum: {}
    };
  },


  watch: {
    app: function app(newVal) {
      if ((typeof newVal === 'undefined' ? 'undefined' : _typeof(newVal)) === 'object' && newVal.has_forum) {
        this.fetchForum();
      }
    }
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['app'])),

  methods: {
    fetchForum: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.app && this.app.has_forum)) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this.$acs.fetchForum({
                  app_id: this.app.id
                });

              case 3:
                result = _context.sent;


                if (result.success) {
                  this.forum = result.forum;
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchForum() {
        return _ref.apply(this, arguments);
      }

      return fetchForum;
    }()
  },

  components: {
    Tabs: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["a" /* Tabs */],
    TabPane: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["b" /* TabPane */],
    basicInfoEditor: __WEBPACK_IMPORTED_MODULE_2_admin_components_forum_basicInfoEditor___default.a,
    sectionInfoEditor: __WEBPACK_IMPORTED_MODULE_3_admin_components_forum_sectionInfoEditor___default.a
  }
});

/***/ }),
/* 927 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_imageUpload__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_dialog_messageBox__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_Pagination__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_admin_components_Pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_bulma_tooltip__ = __webpack_require__(81);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//












/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      newses: [],
      page: 1,
      total: 1,
      recordsPerPage: 5,
      loading: true
    };
  },


  mounted: function mounted() {
    this.getNewsInfo(this.page, this.recordsPerPage);
    this.loading = true;
  },

  methods: {
    getNewsInfo: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(page, recordsPerPage) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$acs.getPagedNews(this.$route.params.appId, "activity", page, recordsPerPage);

              case 2:
                result = _context.sent;


                if (result.success) {
                  this.total = result.total;
                  this.newses = result.news;
                  this.page = page;
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getNewsInfo(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getNewsInfo;
    }(),

    onPageChange: function onPageChange(page) {
      this.getNewsInfo(page, this.recordsPerPage);
    },

    editNewsInfo: function editNewsInfo(news, index) {
      this.$router.push({
        name: 'EditNews',
        params: {
          news: news,
          index: index
        }
      });
    },

    toggleStatus: function toggleStatus(news) {
      var _this = this;

      if (!news.active) {
        if (!news.pic) {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_admin_miscellaneous__["a" /* openNotification */])({
            title: this.$t('admin.titles.warning'),
            message: this.$t('admin.news.picNeed'),
            type: 'danger',
            duration: 4500,
            container: '.notifications'
          });
          return;
        }
      }
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_admin_components_dialog_messageBox__["a" /* showMessageBox */])({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: news.active ? this.$t('admin.messages.confirmUnPublishNews') : this.$t('admin.messages.confirmPublishNews'),
        type: 'danger',
        onOK: function onOK(_) {
          _this._toggleStatus(news);
        }
      });
    },

    _toggleStatus: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(news) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.loading = true;
                _context2.next = 3;
                return this.$acs.toggleStatus({
                  news_id: news.id
                }, news.active ? this.$t('admin.news.unPublishOK') : this.$t('admin.news.publishOk'));

              case 3:
                result = _context2.sent;

                if (result.success) {
                  news.active = !news.active;
                }
                this.loading = false;

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _toggleStatus(_x3) {
        return _ref2.apply(this, arguments);
      }

      return _toggleStatus;
    }(),

    updateNewsPic: function updateNewsPic(news) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_common_components_imageUpload__["a" /* showImageUploadDialog */])(this.$i18n, {
        postAction: '/admin_actions/games/update_news_title_picture',
        data: {
          news_id: news.id
        },
        headers: {
          'x-csrf-token': window.acsConfig.csrfToken
        },
        imageValidator: {
          minWidth: 640,
          minHeight: 260,
          ratio: 0.41
        },
        title: this.$t('admin.titles.uploadNewsPic'),
        callback: function callback(response) {
          if (response.success) {
            news.pic = response.pic;
          } else {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_admin_miscellaneous__["b" /* processAjaxError */])(response);
          }
        }
      });
    }

  },

  components: {
    Pagination: __WEBPACK_IMPORTED_MODULE_4_admin_components_Pagination___default.a,
    Tooltip: __WEBPACK_IMPORTED_MODULE_5_vue_bulma_tooltip__["a" /* default */]
  }

});

/***/ }),
/* 928 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_components_fileUpload__ = __webpack_require__(398);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







var touchMap = new WeakMap();

/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    this.news = this.$route.params.news;
  },

  data: function data() {
    return {
      news: {
        title: '',
        content: ''
      },
      processing: false,
      editor: undefined
    };
  },


  validations: {
    news: {
      content: {
        required: __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["required"],
        minLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["minLength"])(20)
      }
    }
  },

  methods: {
    setEditor: function setEditor(editor) {
      this.editor = editor;
    },

    handleValidation: function handleValidation($v) {
      // $v.$reset()
      // if (touchMap.has($v)) {
      //   clearTimeout(touchMap.get($v))
      // }
      // touchMap.set($v, setTimeout($v.$touch(), 2000))
    },

    onInsertImage: function onInsertImage(editor) {
      var _this = this;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_common_components_fileUpload__["a" /* showFileUploadDialog */])(this.$i18n, {
        postAction: '/admin_actions/games/upload_news_pic',
        accept: 'image/jpg, image/jpeg, image/png',
        data: {
          app_id: this.news.app_id
        },
        headers: {
          'x-csrf-token': window.acsConfig.csrfToken
        },
        extensions: ['png', 'jpg', 'jpeg'],
        callback: function callback(response) {
          if (response.success) {
            editor.focus();
            var range = editor.getSelection();
            editor.insertEmbed(range.index, 'image', response.link);
            editor.formatText(range.index, 1, 'width', response.width);
            editor.formatText(range.index, 1, 'height', response.height);
          } else if (response.i18n_message) {
            message.showMsg(_this.$t(response.i18n_message, response.i18n_message_object));
          } else if (response.message) {
            message.showMsg(response.message);
          } else {
            message.showMsg(_this.$t('admin.error.networkError'));
          }
        }
      });
    },

    onBack: function onBack() {
      this.$router.go(-1);
    },

    onSubmit: function onSubmit() {
      if (this.news.title.length == 0 || this.news.content.length == 0) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__["a" /* openNotification */])({
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.news.requireTitleContent'),
          type: 'danger',
          duration: 4500,
          container: '.notifications'
        });
        return;
      }

      this.handleSubmit();
    },

    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.processing = true;
                if (!this.news.id) this.news.id = 0;
                _context.next = 4;
                return this.$acs.updateNews({
                  news_id: this.news.id,
                  app_id: this.news.app_id,
                  title: this.news.title,
                  content: this.news.content,
                  group: this.news.group,
                  is_top: false
                });

              case 4:
                result = _context.sent;

                if (result.success) {
                  this.$router.go(-1);
                }
                this.processing = false;

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  }
});

/***/ }),
/* 929 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_components_fileUpload__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_dialog_messageBox__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_Pagination__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_admin_components_Pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_bulma_tooltip__ = __webpack_require__(81);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//












/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      newses: [],
      page: 1,
      total: 1,
      recordsPerPage: 5,
      loading: true
    };
  },


  mounted: function mounted() {
    this.getNewsInfo(this.page, this.recordsPerPage);
    this.loading = true;
  },

  methods: {
    getNewsInfo: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(page, recordsPerPage) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$acs.getPagedNews(this.$route.params.appId, "news", page, recordsPerPage);

              case 2:
                result = _context.sent;


                if (result.success) {
                  this.total = result.total;
                  this.newses = result.news;
                  this.page = page;
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getNewsInfo(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getNewsInfo;
    }(),

    onPageChange: function onPageChange(page) {
      this.getNewsInfo(page, this.recordsPerPage);
    },

    editNewsInfo: function editNewsInfo(news, index) {
      this.$router.push({
        name: 'EditNews',
        params: {
          news: news,
          index: index
        }
      });
    },

    toggleStatus: function toggleStatus(news) {
      var _this = this;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_admin_components_dialog_messageBox__["a" /* showMessageBox */])({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: news.active ? this.$t('admin.messages.confirmUnPublishNews') : this.$t('admin.messages.confirmPublishNews'),
        type: 'danger',
        onOK: function onOK(_) {
          _this._toggleStatus(news);
        }
      });
    },

    _toggleStatus: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(news) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.loading = true;
                _context2.next = 3;
                return this.$acs.toggleStatus({
                  news_id: news.id
                }, news.active ? this.$t('admin.news.unPublishOK') : this.$t('admin.news.publishOk'));

              case 3:
                result = _context2.sent;

                this.loading = false;
                if (result.success) {
                  news.active = !news.active;
                }

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _toggleStatus(_x3) {
        return _ref2.apply(this, arguments);
      }

      return _toggleStatus;
    }(),

    updateNewsPic: function updateNewsPic(news) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_common_components_fileUpload__["a" /* showFileUploadDialog */])(this.$i18n, {
        postAction: '/admin_actions/games/update_news_title_picture',
        accept: 'image/png',
        data: {
          news_id: news.id
        },
        headers: {
          'x-csrf-token': window.acsConfig.csrfToken
        },
        extensions: ['png'],
        title: this.$t('admin.titles.uploadNewsPic'),
        callback: function callback(response) {
          return news.pic = response.pic;
        }
      });
    }

  },

  components: {
    Pagination: __WEBPACK_IMPORTED_MODULE_4_admin_components_Pagination___default.a,
    Tooltip: __WEBPACK_IMPORTED_MODULE_5_vue_bulma_tooltip__["a" /* default */]
  }

});

/***/ }),
/* 930 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_components_dialog_messageBox__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_Pagination__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_admin_components_Pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_bulma_tooltip__ = __webpack_require__(81);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      newses: [],
      page: 1,
      total: 1,
      recordsPerPage: 5,
      loading: true
    };
  },


  mounted: function mounted() {
    this.getNoticeInfo(this.page, this.recordsPerPage);
    this.loading = true;
  },

  methods: {
    getNoticeInfo: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(page, recordsPerPage) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$acs.getPagedNews(this.$route.params.appId, "notice", page, recordsPerPage);

              case 2:
                result = _context.sent;


                if (result.success) {
                  this.total = result.total;
                  this.newses = result.news;
                  this.page = page;
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getNoticeInfo(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getNoticeInfo;
    }(),

    onPageChange: function onPageChange(page) {
      this.getNoticeInfo(page, this.recordsPerPage);
    },

    editNewsInfo: function editNewsInfo(news, index) {
      this.$router.push({
        name: 'EditNews',
        params: {
          news: news,
          index: index
        }
      });
    },

    toggleStatus: function toggleStatus(news) {
      var _this = this;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_admin_components_dialog_messageBox__["a" /* showMessageBox */])({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: news.active ? this.$t('admin.messages.confirmUnPublishNews') : this.$t('admin.messages.confirmPublishNews'),
        type: 'danger',
        onOK: function onOK(_) {
          _this._toggleStatus(news);
        }
      });
    },

    _toggleStatus: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(news) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.loading = true;
                _context2.next = 3;
                return this.$acs.toggleStatus({
                  news_id: news.id
                }, news.active ? this.$t('admin.news.unPublishOK') : this.$t('admin.news.publishOk'));

              case 3:
                result = _context2.sent;

                if (result.success) {
                  news.active = !news.active;
                }
                this.loading = false;

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _toggleStatus(_x3) {
        return _ref2.apply(this, arguments);
      }

      return _toggleStatus;
    }()
  },

  components: {
    Pagination: __WEBPACK_IMPORTED_MODULE_2_admin_components_Pagination___default.a,
    Tooltip: __WEBPACK_IMPORTED_MODULE_3_vue_bulma_tooltip__["a" /* default */]
  }

});

/***/ }),
/* 931 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_components_chart_line__ = __webpack_require__(785);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_components_toast__ = __webpack_require__(35);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      stats: {
        total: 0,
        available: 0,
        assigned: 0,
        used: 0
      },
      genNumber: 0,
      delNumber: 0,
      assignNumber: 0,
      dailyChart: undefined,
      options: {
        segmentShowStroke: false,
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },

  created: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.updateStats();

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function created() {
      return _ref.apply(this, arguments);
    }

    return created;
  }(),

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['app'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['updateMyLoginCodes']), {

    updateStats: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$acs.fetchLoginCodesStats({
                  app_id: this.$route.params.appId
                });

              case 2:
                result = _context2.sent;


                if (result.success) {
                  this.stats = result.stats;
                  this.$refs.chart && this.$refs.chart.updateChart(result.daily_chart);
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateStats() {
        return _ref2.apply(this, arguments);
      }

      return updateStats;
    }(),

    genCodes: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var successMessage, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.genNumber < 100)) {
                  _context3.next = 4;
                  break;
                }

                __WEBPACK_IMPORTED_MODULE_2_common_components_toast__["a" /* default */].show(this.$t('admin.app.message.tooSmallCodesGenNumber'));
                _context3.next = 9;
                break;

              case 4:
                successMessage = this.$t('admin.app.message.genLoginCodesSuccess', {
                  number: this.genNumber
                });
                _context3.next = 7;
                return this.$acs.generateLoginCodes({
                  app_id: this.$route.params.appId,
                  number: this.genNumber
                }, successMessage);

              case 7:
                result = _context3.sent;


                if (result.success) {
                  this.stats.total = this.stats.total + this.genNumber;
                  this.stats.available = this.stats.available + this.genNumber;
                }

              case 9:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function genCodes() {
        return _ref3.apply(this, arguments);
      }

      return genCodes;
    }(),

    delCodes: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var successMessage, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.delNumber <= 0 || this.delNumber > this.stats.total - this.stats.used)) {
                  _context4.next = 4;
                  break;
                }

                __WEBPACK_IMPORTED_MODULE_2_common_components_toast__["a" /* default */].show(this.$t('admin.app.message.invalidLoginCodesDelNumber', {
                  max: this.stats.total - this.stats.used
                }));
                _context4.next = 9;
                break;

              case 4:
                successMessage = this.$t('admin.app.message.delLoginCodesSuccess', {
                  number: this.delNumber
                });
                _context4.next = 7;
                return this.$acs.delLoginCodes({
                  app_id: this.$route.params.appId,
                  number: this.delNumber
                }, successMessage);

              case 7:
                result = _context4.sent;


                if (result.success) {
                  this.stats.total = this.stats.total - this.delNumber;
                  this.stats.available = Math.max(this.stats.available - this.delNumber, 0);
                  if (this.stats.assigned > this.stats.total) {
                    this.stats.assigned = this.stats.total;
                  }
                }

              case 9:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function delCodes() {
        return _ref4.apply(this, arguments);
      }

      return delCodes;
    }(),

    assignCodes: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        var assigned, successMessage, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                assigned = this.app.myCodes ? this.app.myCodes.length : 0;

                if (!(this.assignNumber <= 0 || this.assignNumber + assigned > 500 || this.assignNumber > this.stats.available)) {
                  _context5.next = 5;
                  break;
                }

                __WEBPACK_IMPORTED_MODULE_2_common_components_toast__["a" /* default */].show(this.$t('admin.app.message.invalidLoginCodesAssignNumber', {
                  max: Math.min(100 - assigned, this.stats.available)
                }));
                _context5.next = 10;
                break;

              case 5:
                successMessage = this.$t('admin.app.message.assignLoginCodesSuccess', {
                  number: this.assignNumber
                });
                _context5.next = 8;
                return this.$acs.assignLoginCodes({
                  app_id: this.$route.params.appId,
                  number: this.assignNumber
                }, successMessage);

              case 8:
                result = _context5.sent;


                if (result.success) {
                  this.updateMyLoginCodes(result.codes);
                  this.stats.available -= this.assignNumber;
                  this.stats.assigned += this.assignNumber;
                }

              case 10:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function assignCodes() {
        return _ref5.apply(this, arguments);
      }

      return assignCodes;
    }()

  }),

  components: {
    LineChart: __WEBPACK_IMPORTED_MODULE_1_admin_components_chart_line__["a" /* default */]
  }
});

/***/ }),
/* 932 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_toast__ = __webpack_require__(35);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['myLoginCodes'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['updateMyLoginCodes'])),

  created: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.$acs.fetchMyLoginCodes({
                app_id: this.$route.params.appId
              });

            case 2:
              result = _context.sent;


              if (result.success) {
                this.updateMyLoginCodes(result.codes);
              }

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function created() {
      return _ref.apply(this, arguments);
    }

    return created;
  }(),

  components: {}
});

/***/ }),
/* 933 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/admin_actions/fetch_app', {
      app_id: to.params.appId
    }).then(function (response) {
      return response.data;
    }).then(function (result) {
      if (result.success) {
        next(function (vm) {
          vm.setApp(result.app);
          vm.joinAppChannel({
            appId: result.app.id,
            accessToken: window.acsConfig.accessToken
          });
        });
      } else {
        next({
          path: '/admin/error'
        });
      }
    }).catch(function (e) {
      next({
        path: '/admin/error'
      });
    });
  },

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['setApp', 'joinAppChannel']))
});

/***/ }),
/* 934 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_components_imageUpload__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_components_fileUpload__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_messageBox__ = __webpack_require__(80);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//












var touchMap = new WeakMap();

/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    var gid = this.$route.params.goodsId;
    var currency = this.$route.params.currency;
    if (gid) {
      this.isNew = false;
      this.getGoodsDetail(gid);
    } else {
      this.isNew = true;
      this.goods = {
        id: '',
        pic: '',
        name: '',
        description: '',
        price: 0,
        postage: 0,
        stock: 0,
        currency: currency,
        app_id: this.$route.params.appId
      };
      this.pics = new Array(6);
    }
  },

  computed: {
    errorHint: function errorHint() {
      if (!this.$v.goods.name.required) {
        return this.$t('admin.mall.goods.pleaseFill');
      } else if (!this.$v.goods.name.maxLength) {
        return this.$t('admin.mall.goods.namePlaceholder');
      } else if (!this.$v.goods.description.required) {
        return this.$t('admin.mall.goods.descPlaceholder');
      } else if (!this.$v.goods.description.maxLength) {
        return this.$t('admin.mall.goods.descPlaceholder');
      }

      return '';
    }
  },

  validations: {
    goods: {
      name: {
        required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
        maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["maxLength"])(50)
      },
      description: {
        required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
        maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["maxLength"])(8000)
      }
    }
  },

  data: function data() {
    return {
      goods: {},
      pics: [],
      loading: false,
      deleting: false,
      saving: false,
      publishing: false,
      isNew: false,
      editor: undefined,
      realPrice: 0.00,
      realPostage: 0.00,
      bagId: "picBag"
    };
  },


  created: function created() {
    __WEBPACK_IMPORTED_MODULE_0_vue___default.a.vueDragula.options(this.bagId, {
      direction: 'horizontal'
    });
  },

  ready: function ready() {
    __WEBPACK_IMPORTED_MODULE_0_vue___default.a.vueDragula.eventBus.$on('drop', function (args) {
      console.log('drop: ' + args[0]);
      console.log(this.pics);
    });
    __WEBPACK_IMPORTED_MODULE_0_vue___default.a.vueDragula.eventBus.$on('dropModel', function (args) {
      console.log('dropModel: ' + args);
      console.log(this.pics);
    });
  },

  watch: {
    realPrice: function realPrice() {
      this.goods.price = Math.round(this.realPrice * 100);
    },
    realPostage: function realPostage() {
      this.goods.postage = Math.round(this.realPostage * 100);
    }
  },

  methods: {
    getPrice: function getPrice(price) {
      if (price) return parseFloat(price / 100).toFixed(2);else return 0;
    },

    setEditor: function setEditor(editor) {
      this.editor = editor;
    },

    handleValidation: function handleValidation($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch(), 2000));
    },

    onShowImageUpload: function onShowImageUpload(index) {
      var _this = this;

      if (this.goods.id.length > 0) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_common_components_imageUpload__["a" /* showImageUploadDialog */])(this.$i18n, {
          postAction: '/admin_actions/mall/update_goods_pic',
          data: {
            goods_id: this.goods.id
          },
          headers: {
            'x-csrf-token': window.acsConfig.csrfToken
          },
          title: this.$t('admin.titles.uploadGoodsPic'),
          width: 400,
          height: 400,
          callback: function callback(response) {
            return _this.pics.splice(index, 1, response.pic_url);
          }
        });
      } else {
        this.showWarning(this.$t('admin.mall.goods.saveFirst'));
      }
    },

    getGoodsDetail: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(goodsId) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.loading = true;
                _context.next = 3;
                return this.$acs.getGoodsDetail({
                  goods_id: goodsId
                });

              case 3:
                result = _context.sent;

                if (result.success) {
                  this.goods = result.goods;
                  if (this.goods.price > 0) this.realPrice = parseFloat(this.goods.price / 100).toFixed(2);
                  if (this.goods.postage > 0) this.realPostage = parseFloat(this.goods.postage / 100).toFixed(2);
                  this.pics = this.goods.pic ? this.goods.pic.split('|') : "|||||".split('|');
                  this.pics.length = 6;
                }
                this.loading = false;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getGoodsDetail(_x) {
        return _ref.apply(this, arguments);
      }

      return getGoodsDetail;
    }(),

    onInsertImage: function onInsertImage(editor) {
      var _this2 = this;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_common_components_fileUpload__["a" /* showFileUploadDialog */])(this.$i18n, {
        postAction: '/admin_actions/mall/update_goods_content_pic',
        accept: 'image/jpeg, image/png',
        data: {
          app_id: this.goods.app_id
        },
        headers: {
          'x-csrf-token': window.acsConfig.csrfToken
        },
        extensions: ['png', 'jpg', 'jpeg'],
        callback: function callback(response) {
          if (response.success) {
            editor.focus();
            var range = editor.getSelection();
            editor.insertEmbed(range.index, 'image', response.link);
          } else if (response.i18n_message) {
            message.showMsg(_this2.$t(response.i18n_message, response.i18n_message_object));
          } else if (response.message) {
            message.showMsg(response.message);
          } else {
            message.showMsg(_this2.$t('admin.error.networkError'));
          }
        }
      });
    },

    onDelete: function onDelete() {
      var _this3 = this;

      if (this.goods.sold > 0) {
        this.showWarning(this.$t('admin.mall.soldCanNotDelete'));
      } else {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_messageBox__["a" /* showMessageBox */])({
          visible: true,
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.messages.confirmDeleteMallGoods'),
          type: 'danger',
          onOK: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_) {
              var result;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return _this3.$acs.deleteMallGoods({
                        app_id: _this3.goods.app_id,
                        goods_id: _this3.goods.id
                      }, _this3.$t('admin.notification.message.mallGoodsDeleted'));

                    case 2:
                      result = _context2.sent;

                      if (result.success) {
                        _this3.$router.replace({
                          name: 'EditMall',
                          params: {
                            appId: _this3.goods.app_id
                          }
                        });
                      }

                    case 4:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, _this3);
            }));

            return function onOK(_x2) {
              return _ref2.apply(this, arguments);
            };
          }()
        });
      }
    },

    onPublish: function onPublish() {
      var _this4 = this;

      if (this.goods.active) {
        //下架
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_messageBox__["a" /* showMessageBox */])({
          visible: true,
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.messages.confirmUnPublishGoods'),
          type: 'danger',
          onOK: function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_) {
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _this4.toggleStatus();

                    case 1:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _callee3, _this4);
            }));

            return function onOK(_x3) {
              return _ref3.apply(this, arguments);
            };
          }()
        });
      } else {
        //上架
        if (this.goods.name.length == 0 || this.goods.description.length == 0 || this.goods.price.length == 0 || this.goods.stock.length == 0 || this.goods.postage.length == 0 || this.goods.id.length == 0) {
          this.showWarning(this.$t('admin.mall.goods.pleaseFill'));
          return;
        }
        if (!this.goods.pic || this.goods.pic.length == 0) {
          this.showWarning(this.$t('admin.mall.goods.pleaseUpPic'));
          return;
        }
        this.toggleStatus();
      }
    },

    toggleStatus: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.$acs.toggleGoodsStatus({
                  goods_id: this.goods.id
                }, this.$t('admin.operateSuccess'));

              case 2:
                result = _context4.sent;

                if (result.success) {
                  this.goods.active = !this.goods.active;
                }

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function toggleStatus() {
        return _ref4.apply(this, arguments);
      }

      return toggleStatus;
    }(),

    showWarning: function showWarning(message) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_admin_miscellaneous__["a" /* openNotification */])({
        title: this.$t('admin.titles.warning'),
        message: message,
        type: 'danger',
        duration: 4500,
        container: '.notifications'
      });
    },

    onBack: function onBack() {
      this.$router.go(-1);
    },

    onSave: function onSave() {
      if (this.goods.name.length == 0 || this.goods.description.length == 0 || this.goods.price.length == 0 || this.goods.stock.length == 0 || this.goods.postage.length == 0 || this.goods.id.length == 0) {
        this.showWarning(this.$t('admin.mall.goods.pleaseFill'));
        return;
      }

      this.handleSubmit();
    },

    handleSubmit: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        var result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.saving = true;
                _context5.next = 3;
                return this.$acs.updateGoods({
                  id: this.goods.id,
                  app_id: this.goods.app_id,
                  name: this.goods.name,
                  pic: this.pics.filter(function (t) {
                    return t != "";
                  }).join("|"),
                  description: this.goods.description,
                  price: this.goods.price,
                  postage: this.goods.postage,
                  stock: this.goods.stock,
                  currency: this.goods.currency,
                  is_new: this.isNew
                });

              case 3:
                result = _context5.sent;

                if (result.success) {
                  this.isNew = false;
                }
                this.saving = false;

              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function handleSubmit() {
        return _ref5.apply(this, arguments);
      }

      return handleSubmit;
    }()
  }
});

/***/ }),
/* 935 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_mall_basicInfoEditor__ = __webpack_require__(1376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_mall_basicInfoEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_admin_components_mall_basicInfoEditor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_mall_goodsInfoEditor__ = __webpack_require__(1377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_mall_goodsInfoEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_admin_components_mall_goodsInfoEditor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_mall_orderInfoEditor__ = __webpack_require__(1378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_mall_orderInfoEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_admin_components_mall_orderInfoEditor__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    this.mall = this.mallHash[this.$route.params.appId];

    if (this.$route.query && this.$route.query.tabIndex) this.$refs.tab.select(parseInt(this.$route.query.tabIndex));
  },
  data: function data() {
    return {
      mall: {}
    };
  },

  methods: {
    tabSelected: function tabSelected(index) {
      if (index == 0) return;
      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query: {
          tabIndex: index
        }
      });
    }
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['mallHash', 'app'])),
  components: {
    Tabs: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["a" /* Tabs */],
    TabPane: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["b" /* TabPane */],
    basicInfoEditor: __WEBPACK_IMPORTED_MODULE_2_admin_components_mall_basicInfoEditor___default.a,
    goodsInfoEditor: __WEBPACK_IMPORTED_MODULE_3_admin_components_mall_goodsInfoEditor___default.a,
    orderInfoEditor: __WEBPACK_IMPORTED_MODULE_4_admin_components_mall_orderInfoEditor___default.a
  }
});

/***/ }),
/* 936 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_dialog_messageBox__ = __webpack_require__(80);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







var touchMap = new WeakMap();

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {},

  mounted: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.$acs.fetchMallOrder({
                order_id: this.$route.params.orderId
              });

            case 2:
              result = _context.sent;


              if (result.success) {
                this.orderInfo = result.order;
              }

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function mounted() {
      return _ref.apply(this, arguments);
    }

    return mounted;
  }(),

  data: function data() {
    return {
      orderInfo: undefined,
      refundMoney: ''
    };
  },

  watch: {},

  methods: {
    getOpUser: function getOpUser(user, adminUser) {
      if (adminUser) {
        return adminUser + '[' + this.$t('admin.mall.op_logs.op_admin') + ']';
      } else {
        return user;
      }
    },
    isNull: function isNull() {
      return orderInfo.transaction_id == "";
    },
    onBack: function onBack() {
      this.$router.go(-1);
    },
    updateOrderPayed: function updateOrderPayed() {
      var _this = this;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_admin_components_dialog_messageBox__["a" /* showMessageBox */])({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.mall.order.messages.confirmOrderPayed', {
          orderId: this.orderInfo.id
        }),
        type: 'danger',
        onOK: function () {
          var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_) {
            var result;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return _this.$acs.updateOrderPayed({
                      order_id: _this.orderInfo.id,
                      transaction_id: _this.orderInfo.transaction_id
                    });

                  case 2:
                    result = _context2.sent;

                    if (result.success) {
                      _this.orderInfo = result.order;
                    }

                  case 4:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this);
          }));

          return function onOK(_x) {
            return _ref2.apply(this, arguments);
          };
        }()
      });
    },

    refundOrder: function refundOrder() {
      var _this2 = this;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_admin_components_dialog_messageBox__["a" /* showMessageBox */])({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.mall.order.messages.confirmRefundOrder', {
          orderId: this.orderInfo.id
        }),
        type: 'danger',
        onOK: function () {
          var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_) {
            var result;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return _this2.$acs.refundOrder({
                      order_id: _this2.orderInfo.id,
                      refund_money: parseFloat(_this2.refundMoney)
                    });

                  case 2:
                    result = _context3.sent;

                    if (result.success) {
                      _this2.orderInfo = result.order;
                    }

                  case 4:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee3, _this2);
          }));

          return function onOK(_x2) {
            return _ref3.apply(this, arguments);
          };
        }()
      });
    }
  }
});

/***/ }),
/* 937 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_components_Pagination__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_components_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_admin_components_Pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_bulma_tooltip__ = __webpack_require__(81);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      logs: [],
      page: 1,
      total: 1,
      recordsPerPage: 20,
      loading: false,
      userId: ""
    };
  },


  mounted: function mounted() {
    this.getOperateLog(this.userId, this.page, this.recordsPerPage);
  },

  methods: {
    getOperateLog: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(userId, page, recordsPerPage) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.loading = true;
                _context.next = 3;
                return this.$acs.getOperateLog({
                  app_id: this.$route.params.appId,
                  user_id: userId,
                  page: page,
                  records_per_page: recordsPerPage
                });

              case 3:
                result = _context.sent;

                this.loading = false;

                if (result.success) {
                  this.total = result.total;
                  this.logs = result.logs;
                  this.page = page;
                }

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getOperateLog(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return getOperateLog;
    }(),

    onPageChange: function onPageChange(page) {
      this.getOperateLog(this.userId, page, this.recordsPerPage);
    }

  },

  components: {
    Pagination: __WEBPACK_IMPORTED_MODULE_1_admin_components_Pagination___default.a,
    Tooltip: __WEBPACK_IMPORTED_MODULE_2_vue_bulma_tooltip__["a" /* default */]
  }

});

/***/ }),
/* 938 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_store_getters__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_bulma_tooltip__ = __webpack_require__(81);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      keyword: "",
      searching: false,
      loading: false,
      initing: false,
      orders: [],
      page: 1,
      total: 1,
      recordsPerPage: 10
    };
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])(['goods', 'app']), {

    appIcon: function appIcon() {
      if (this.app && this.app.icon) {
        return this.app.icon;
      } else {
        return 'https://placehold.it/32x32?text=' + this.app.name;
      }
    },

    currency: function currency() {
      if (this.app && this.app.currency) {
        return this.app.currency;
      } else {
        return '';
      }
    }

  }),

  mounted: function mounted() {
    if (this.app) {
      this.fetchOrders(this.app.id, this.page, this.recordsPerPage);
    }
  },

  watch: {
    app: function app(newVal) {
      if ((typeof newVal === 'undefined' ? 'undefined' : _typeof(newVal)) === 'object' && typeof newVal.id === 'string') {
        this.page = 1;
        this.total = 1;
        this.fetchOrders(newVal.id, this.page, this.recordsPerPage);
      }
    }
  },

  methods: {
    getGoodsIcon: function getGoodsIcon(order) {
      var goodsInfo = this.goods[order.app_id + '-' + order.goods_id];
      if (goodsInfo && goodsInfo.icon) {
        return goodsInfo.icon;
      } else {
        return 'https://placehold.it/32x32?text=未上传';
      }
    },

    getGoodsName: function getGoodsName(order) {
      var goodsInfo = this.goods[order.app_id + '-' + order.goods_id];
      if (goodsInfo && goodsInfo.name) {
        return goodsInfo.name;
      } else {
        return order.goods_name;
      }
    },

    getOrderTransactionId: function getOrderTransactionId(order) {
      if (order.transaction_id.startsWith('empty.')) {
        return '';
      } else {
        return order.transaction_id;
      }
    },

    getOrderPlatformIcon: function getOrderPlatformIcon(order) {
      var result = 'fa fa-';
      switch (order.platform) {
        case 'android':
          result = result + 'android';
          break;
        case 'ios':
          result = result + 'apple ';
          break;
        case 'wp8':
          result = result + 'windows ';
          break;
        default:
          result = result + 'apple ';
          break;
      }

      switch (order.status) {
        case 0:
          result = result + ' is-primary';
          break;
        case 1:
          result = result + ' is-info';
          break;
        case 2:
          result = result + ' is-success';
          break;
        case 3:
          result = result + ' is-danger';
          break;
      }

      return result;
    },

    onPageChange: function onPageChange(page) {
      this.fetchOrders(this.app.id, page, this.recordsPerPage);
    },

    onSearchBoxSubmit: function onSearchBoxSubmit() {
      if (this.keyword) {
        this.searchOrders(1);
      } else {
        this.fetchOrders(1, this.recordsPerPage);
      }
    },

    fetchOrders: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(app_id, page, recordsPerPage) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.loading = true;
                _context.next = 3;
                return this.$acs.fetchOrders({
                  app_id: app_id,
                  page: page,
                  records_per_page: recordsPerPage
                });

              case 3:
                result = _context.sent;


                if (result.success) {
                  this.total = result.total;
                  this.orders = result.orders;
                  this.page = page;
                }

                this.loading = false;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchOrders(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return fetchOrders;
    }(),

    searchOrders: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(page) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.searching = true;
                _context2.next = 3;
                return this.$acs.searchOrders({
                  app_id: this.app.id,
                  keyword: this.keyword,
                  page: page,
                  records_per_page: this.recordsPerPage
                });

              case 3:
                result = _context2.sent;

                if (result.success) {
                  this.total = result.total;
                  this.orders = result.orders;
                  this.page = page;
                }
                this.searching = false;

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function searchOrders(_x4) {
        return _ref2.apply(this, arguments);
      }

      return searchOrders;
    }()
  },

  components: {
    Pagination: __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination___default.a,
    Tooltip: __WEBPACK_IMPORTED_MODULE_4_vue_bulma_tooltip__["a" /* default */]
  }
});

/***/ }),
/* 939 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_components_imageUpload__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_components_fileUpload__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_messageBox__ = __webpack_require__(80);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//












var touchMap = new WeakMap();

/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    var gid = this.$route.params.goodsId;
    if (gid) {
      this.isNew = false;
      this.getGoodsDetail(gid);
    } else {
      this.isNew = true;
      this.goods = {
        id: '',
        pic: '',
        name: '',
        description: '',
        price: 0,
        postage: 0,
        stock: 0,
        app_id: this.$route.params.appId,
        is_virtual: true,
        begin_time: '',
        end_time: ''
      };
      this.pics = new Array(6);
    }
  },

  computed: {
    errorHint: function errorHint() {
      if (!this.$v.goods.name.required) {
        return this.$t('admin.mall.goods.pleaseFill');
      } else if (!this.$v.goods.name.maxLength) {
        return this.$t('admin.mall.goods.namePlaceholder');
      } else if (!this.$v.goods.description.required) {
        return this.$t('admin.mall.goods.descPlaceholder');
      } else if (!this.$v.goods.description.maxLength) {
        return this.$t('admin.mall.goods.descPlaceholder');
      }

      return '';
    }
  },

  validations: {
    goods: {
      name: {
        required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
        maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["maxLength"])(50)
      },
      description: {
        required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
        maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["maxLength"])(8000)
      }
    }
  },

  data: function data() {
    return {
      goods: {},
      pics: [],
      loading: false,
      deleting: false,
      saving: false,
      publishing: false,
      isNew: false,
      editor: undefined,
      realPostage: 0.00,
      bagId: "picBag"
    };
  },


  created: function created() {
    __WEBPACK_IMPORTED_MODULE_0_vue___default.a.vueDragula.options(this.bagId, {
      direction: 'horizontal'
    });
  },

  ready: function ready() {
    __WEBPACK_IMPORTED_MODULE_0_vue___default.a.vueDragula.eventBus.$on('drop', function (args) {
      console.log('drop: ' + args[0]);
      console.log(this.pics);
    });
    __WEBPACK_IMPORTED_MODULE_0_vue___default.a.vueDragula.eventBus.$on('dropModel', function (args) {
      console.log('dropModel: ' + args);
      console.log(this.pics);
    });
  },

  watch: {
    realPostage: function realPostage() {
      this.goods.postage = Math.round(this.realPostage * 100);
    }
  },

  methods: {
    setEditor: function setEditor(editor) {
      this.editor = editor;
    },

    handleValidation: function handleValidation($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch(), 2000));
    },

    onShowImageUpload: function onShowImageUpload(index) {
      var _this = this;

      if (this.goods.id.length > 0) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_common_components_imageUpload__["a" /* showImageUploadDialog */])(this.$i18n, {
          postAction: '/admin_actions/point_mall/update_goods_pic',
          data: {
            goods_id: this.goods.id
          },
          headers: {
            'x-csrf-token': window.acsConfig.csrfToken
          },
          title: this.$t('admin.titles.uploadGoodsPic'),
          width: 400,
          height: 400,
          callback: function callback(response) {
            return _this.pics.splice(index, 1, response.pic_url);
          }
        });
      } else {
        this.showWarning(this.$t('admin.mall.goods.saveFirst'));
      }
    },

    getGoodsDetail: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(goodsId) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.loading = true;
                _context.next = 3;
                return this.$acs.getPointGoodsDetail({
                  goods_id: goodsId
                });

              case 3:
                result = _context.sent;

                if (result.success) {
                  this.goods = result.goods;
                  if (this.goods.postage > 0) this.realPostage = parseFloat(this.goods.postage / 100).toFixed(2);
                  this.pics = this.goods.pic ? this.goods.pic.split('|') : "|||||".split('|');
                  this.pics.length = 6;
                }
                this.loading = false;

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getGoodsDetail(_x) {
        return _ref.apply(this, arguments);
      }

      return getGoodsDetail;
    }(),

    onInsertImage: function onInsertImage(editor) {
      var _this2 = this;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_common_components_fileUpload__["a" /* showFileUploadDialog */])(this.$i18n, {
        postAction: '/admin_actions/point_mall/update_goods_content_pic',
        accept: 'image/jpeg, image/png',
        data: {
          app_id: this.goods.app_id
        },
        headers: {
          'x-csrf-token': window.acsConfig.csrfToken
        },
        extensions: ['png', 'jpg', 'jpeg'],
        callback: function callback(response) {
          if (response.success) {
            editor.focus();
            var range = editor.getSelection();
            editor.insertEmbed(range.index, 'image', response.link);
          } else if (response.i18n_message) {
            message.showMsg(_this2.$t(response.i18n_message, response.i18n_message_object));
          } else if (response.message) {
            message.showMsg(response.message);
          } else {
            message.showMsg(_this2.$t('admin.error.networkError'));
          }
        }
      });
    },

    onDelete: function onDelete() {
      var _this3 = this;

      if (this.goods.sold > 0) {
        this.showWarning(this.$t('admin.mall.soldCanNotDelete'));
      } else {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_messageBox__["a" /* showMessageBox */])({
          visible: true,
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.messages.confirmDeleteMallGoods'),
          type: 'danger',
          onOK: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_) {
              var result;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return _this3.$acs.deletePointGoods({
                        app_id: _this3.goods.app_id,
                        goods_id: _this3.goods.id
                      }, _this3.$t('admin.notification.message.mallGoodsDeleted'));

                    case 2:
                      result = _context2.sent;

                      if (result.success) {
                        _this3.$router.replace({
                          name: 'EditPointGoods',
                          params: {
                            appId: _this3.goods.app_id
                          }
                        });
                      }

                    case 4:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, _this3);
            }));

            return function onOK(_x2) {
              return _ref2.apply(this, arguments);
            };
          }()
        });
      }
    },

    onPublish: function onPublish() {
      var _this4 = this;

      if (this.goods.active) {
        //下架
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_messageBox__["a" /* showMessageBox */])({
          visible: true,
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.messages.confirmUnPublishGoods'),
          type: 'danger',
          onOK: function () {
            var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(_) {
              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _this4.toggleStatus();

                    case 1:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _callee3, _this4);
            }));

            return function onOK(_x3) {
              return _ref3.apply(this, arguments);
            };
          }()
        });
      } else {
        //上架
        if (this.goods.name.length == 0 || this.goods.description.length == 0 || this.goods.price.length == 0 || this.goods.stock.length == 0 || this.goods.postage.length == 0 || this.goods.id.length == 0) {
          this.showWarning(this.$t('admin.mall.goods.pleaseFill'));
          return;
        }
        if (!this.goods.pic || this.goods.pic.length == 0) {
          this.showWarning(this.$t('admin.mall.goods.pleaseUpPic'));
          return;
        }
        this.toggleStatus();
      }
    },

    toggleStatus: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.$acs.togglePointGoodsStatus({
                  goods_id: this.goods.id
                }, this.$t('admin.operateSuccess'));

              case 2:
                result = _context4.sent;

                if (result.success) {
                  this.goods.active = !this.goods.active;
                }

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function toggleStatus() {
        return _ref4.apply(this, arguments);
      }

      return toggleStatus;
    }(),

    showWarning: function showWarning(message) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_admin_miscellaneous__["a" /* openNotification */])({
        title: this.$t('admin.titles.warning'),
        message: message,
        type: 'danger',
        duration: 4500,
        container: '.notifications'
      });
    },

    onBack: function onBack() {
      this.$router.go(-1);
    },

    onSave: function onSave() {
      if (this.goods.name.length == 0 || this.goods.description.length == 0 || this.goods.price.length == 0 || this.goods.stock.length == 0 || this.goods.postage.length == 0 || this.goods.id.length == 0) {
        this.showWarning(this.$t('admin.mall.goods.pleaseFill'));
        return;
      }

      this.handleSubmit();
    },

    handleSubmit: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        var result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.saving = true;
                _context5.next = 3;
                return this.$acs.updatePointGoods({
                  id: this.goods.id,
                  app_id: this.goods.app_id,
                  name: this.goods.name,
                  pic: this.pics.filter(function (t) {
                    return t != "";
                  }).join("|"),
                  description: this.goods.description,
                  price: this.goods.price,
                  postage: this.goods.postage,
                  stock: this.goods.stock,
                  is_virtual: this.goods.is_virtual,
                  begin_time: this.goods.begin_time,
                  end_time: this.goods.end_time,
                  is_new: this.isNew
                });

              case 3:
                result = _context5.sent;

                if (result.success) {
                  this.isNew = false;
                }
                this.saving = false;

              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function handleSubmit() {
        return _ref5.apply(this, arguments);
      }

      return handleSubmit;
    }()
  }
});

/***/ }),
/* 940 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_store_getters__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_bulma_tooltip__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_messageBox__ = __webpack_require__(80);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      keyword: "",
      searching: false,
      loading: false,
      goodses: [],
      page: 1,
      total: 1,
      recordsPerPage: 8,
      appId: ""
    };
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['app'])),
  mounted: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.fetchPointGoods(this.page, this.recordsPerPage);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function mounted() {
      return _ref.apply(this, arguments);
    }

    return mounted;
  }(),

  watch: {
    app: function app(newVal) {
      this.appId = newVal.id;
      this.fetchPointGoods(this.page, this.recordsPerPage);
    }
  },

  methods: {
    getPrice: function getPrice(price) {
      return price + "积分";
    },

    onPageChange: function onPageChange(page) {
      this.fetchPointGoods(page, this.recordsPerPage);
    },

    onSearchBoxSubmit: function onSearchBoxSubmit() {
      if (this.keyword) {
        this.searchGoods(1);
      } else {
        this.fetchPointGoods(1, this.recordsPerPage);
      }
    },

    onEdit: function onEdit(goods_id) {
      this.$router.push({
        name: 'EditPointGoods',
        params: {
          goodsId: goods_id
        }
      });
    },

    onDelete: function onDelete(goods, index) {
      var _this = this;

      if (goods.sold > 0) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__["a" /* openNotification */])({
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.mall.soldCanNotDelete'),
          type: 'danger',
          duration: 4500,
          container: '.notifications'
        });
      } else {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_messageBox__["a" /* showMessageBox */])({
          visible: true,
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.messages.confirmDeleteMallGoods'),
          type: 'danger',
          onOK: function () {
            var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_) {
              var result;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return _this.$acs.deletePointGoods({
                        app_id: goods.app_id,
                        goods_id: goods.id
                      }, _this.$t('admin.notification.message.mallGoodsDeleted'));

                    case 2:
                      result = _context2.sent;

                      if (result.success) {
                        _this.goodses.splice(index, 1);
                      }

                    case 4:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, _this);
            }));

            return function onOK(_x) {
              return _ref2.apply(this, arguments);
            };
          }()
        });
      }
    },

    fetchPointGoods: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(page, recordsPerPage) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.loading = true;
                _context3.next = 3;
                return this.$acs.fetchPointGoods({
                  keyword: "",
                  page: page,
                  records_per_page: recordsPerPage
                });

              case 3:
                result = _context3.sent;


                if (result.success) {
                  this.total = result.total;
                  this.goodses = result.goodses;
                  this.page = page;
                }

                this.loading = false;

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchPointGoods(_x2, _x3) {
        return _ref3.apply(this, arguments);
      }

      return fetchPointGoods;
    }(),

    searchGoods: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(page) {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.searching = true;
                _context4.next = 3;
                return this.$acs.fetchPointGoods({
                  keyword: this.keyword,
                  page: page,
                  records_per_page: this.recordsPerPage
                });

              case 3:
                result = _context4.sent;

                if (result.success) {
                  this.total = result.total;
                  this.goodses = result.goodses;
                  this.page = page;
                }
                this.searching = false;

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function searchGoods(_x4) {
        return _ref4.apply(this, arguments);
      }

      return searchGoods;
    }()
  },

  components: {
    Pagination: __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination___default.a,
    Tooltip: __WEBPACK_IMPORTED_MODULE_4_vue_bulma_tooltip__["a" /* default */]
  }
});

/***/ }),
/* 941 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_vue_i18n__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_dialog_messageBox__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_Pagination__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_admin_components_Pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_app_addPoint__ = __webpack_require__(1359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_app_addPoint___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_app_addPoint__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










var pointDialogComponent = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_5_admin_components_dialog_app_addPoint___default.a);
var openPointDialog = function openPointDialog() {
  var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    visible: true
  };

  return new pointDialogComponent({
    i18n: __WEBPACK_IMPORTED_MODULE_1_admin_vue_i18n__["a" /* i18n */],
    el: document.createElement('div'),
    propsData: propsData
  });
};

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      logs: [],
      page: 1,
      total: 1,
      recordsPerPage: 20,
      loading: false,
      userId: ''
    };
  },


  created: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.getLogs(this.page, this.recordsPerPage);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function created() {
      return _ref.apply(this, arguments);
    }

    return created;
  }(),

  methods: {
    getLogs: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(page, recordsPerPage) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.loading = true;
                _context2.next = 3;
                return this.$acs.getPointLogs({
                  user_id: this.userId,
                  page: page,
                  records_per_page: recordsPerPage
                });

              case 3:
                result = _context2.sent;

                this.loading = false;
                if (result.success) {
                  this.total = result.total_page;
                  this.logs = result.logs;
                  this.page = page;
                }

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getLogs(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return getLogs;
    }(),

    onPageChange: function onPageChange(page) {
      this.getLogs(page, this.recordsPerPage);
    },

    addPoint: function addPoint() {
      var _this = this;

      openPointDialog({
        pointLog: {
          id: 0,
          log_type: 'admin_op',
          memo: '',
          point: 0,
          user_id: ''
        },
        visible: true,
        callback: function callback(log) {
          _this.logs.unshift(log);
        }
      });
    }
  },

  components: {
    Pagination: __WEBPACK_IMPORTED_MODULE_4_admin_components_Pagination___default.a
  }

});

/***/ }),
/* 942 */
/***/ (function(module, exports) {

//
//
//
//
//

/***/ }),
/* 943 */
/***/ (function(module, exports) {

//
//
//
//
//

/***/ }),
/* 944 */
/***/ (function(module, exports) {

//
//
//
//
//

/***/ }),
/* 945 */
/***/ (function(module, exports) {

//
//
//
//
//

/***/ }),
/* 946 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_admin_components_setting_basicInfoEditor__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_admin_components_setting_basicInfoEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_admin_components_setting_basicInfoEditor__);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    basicInfoEditor: __WEBPACK_IMPORTED_MODULE_0_admin_components_setting_basicInfoEditor___default.a
  }
});

/***/ }),
/* 947 */
/***/ (function(module, exports) {

//
//
//
//
//

/***/ }),
/* 948 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_views_app_adminUsers__ = __webpack_require__(750);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_views_app_adminUsers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_admin_views_app_adminUsers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_views_app_operateLog__ = __webpack_require__(1405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_views_app_operateLog___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_admin_views_app_operateLog__);
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Tabs: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["a" /* Tabs */],
    TabPane: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["b" /* TabPane */],
    adminUsers: __WEBPACK_IMPORTED_MODULE_2_admin_views_app_adminUsers___default.a,
    operateLog: __WEBPACK_IMPORTED_MODULE_3_admin_views_app_operateLog___default.a
  }
});

/***/ }),
/* 949 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_date__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_common_js_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_stats_byDay__ = __webpack_require__(1379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_stats_byDay___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_admin_components_stats_byDay__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      date: '',
      tbs: [-2, -1, 0],
      activeName: ''
    };
  },

  mounted: function mounted() {
    this.activeName = this.getTabName(0);
  },
  components: {
    Tabs: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["a" /* Tabs */],
    TabPane: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["b" /* TabPane */],
    byDay: __WEBPACK_IMPORTED_MODULE_3_admin_components_stats_byDay___default.a
  },

  methods: {
    changeDate: function changeDate(dt) {
      if (typeof dt != "undefined" && dt != "") {
        var date = new Date();
        var dateFormat = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        var diff = new Date(dateFormat).DateDiff('d', dt);
        var zero = diff == 0 && 1 / diff < 0;
        if (diff.toString().indexOf('-') >= 0 || zero) diff += -1;

        var arrs = this.tbs;
        arrs.push(diff);
        this.tbs = this.sort(arrs);
        this.activeName = this.getTabName(diff);
      }
    },
    getTabName: function getTabName(days) {
      return new Date().DateAdd('d', days).Format("yyyy-MM-dd");
    },
    sort: function sort(arr) {
      var arrs = Array.from(new Set(arr));

      for (var i = 0; i < arrs.length; i++) {
        for (var j = 0; j < arrs.length - 1; j++) {
          if (arrs[j] > arrs[j + 1]) {
            var _ref = [arrs[j + 1], arrs[j]];
            arrs[j] = _ref[0];
            arrs[j + 1] = _ref[1];
          }
        }
      }
      return arrs;
    },
    removeTab: function removeTab(tabName) {
      if (typeof tabName != "undefined" && tabName != "") {
        var date = new Date();
        var dateFormat = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        var diff = new Date(dateFormat).DateDiff('d', tabName);

        var zero = diff == 0 && 1 / diff < 0;
        if (diff.toString().indexOf('-') >= 0 || zero) diff += -1;

        var newArr = this.tbs.filter(function (item) {
          return item !== diff;
        });
        this.tbs.length = 0;
        this.tbs.push.apply(this.tbs, newArr);
        if (this.tbs.length > 0) this.activeName = this.getTabName(this.tbs[0]);else this.activeName = 'custom';
      }
    }
  }
});

/***/ }),
/* 950 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_date__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_common_js_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_bulma_datepicker__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_bulma_datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_bulma_datepicker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__device_bar__ = __webpack_require__(564);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Tabs: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["a" /* Tabs */],
    TabPane: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["b" /* TabPane */],
    Bar: __WEBPACK_IMPORTED_MODULE_4__device_bar__["a" /* Bar */],
    HorizontalBar: __WEBPACK_IMPORTED_MODULE_4__device_bar__["b" /* HorizontalBar */],
    Pie: __WEBPACK_IMPORTED_MODULE_4__device_bar__["c" /* Pie */]
  },
  mounted: function mounted() {
    var _this2 = this;

    return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this2.fetchData();

            case 2:
              _context.next = 4;
              return _this2.getDetails();

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }))();
  },
  data: function data() {
    return {
      statsType: 'model',
      platform: 'all',
      memSize: [],
      orderBy: {},
      dateType: 'week',
      dateRange: [],
      page: 0,
      total: 1,
      pickerOptions: {
        disabledDate: function disabledDate(date) {
          var limitDate = new Date();
          limitDate.setTime(limitDate.getTime() - 3600 * 1000 * 24);
          return date > limitDate;
        }
      },
      chart_platforms: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: []
        }]
      },
      reports_colors: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)'],
      chart_models: {
        labels: [],
        datasets: [{
          label: '新增设备数',
          data: [],
          backgroundColor: []
        }]
      },
      reports: [],
      mem_filter_opts: [{
        text: '大于2G',
        value: [2040109465, 107374182400]
      }, {
        text: '1G~2G',
        value: [1073741824, 2040109465]
      }, {
        text: '小于1G',
        value: [0, 1073741824]
      }]
    };
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['app']), {
    platformOptions: function platformOptions() {
      var _this = this;
      return {
        responsive: true,
        maintainAspectRatio: false,
        onClick: function onClick() {
          _this.changePlatform(this);
        }
      };
    },
    modelOptions: function modelOptions() {
      var _this = this;
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        onClick: function onClick() {
          _this.platform = 'all';
        }
      };
    }
  }),
  watch: {
    'platform': function platform(val) {
      if (val) {
        this.page = 1;
        this.fetchData();
        this.getDetails();
      }
    }
  },

  methods: {
    changeStatsType: function changeStatsType() {
      this.page = 1;
      if (this.platform != "all") {
        this.platform = "all";
      } else {
        this.fetchData();
        this.getDetails();
      }
    },
    changePlatform: function changePlatform(chart) {
      if (chart.active && chart.active.length > 0) {
        this.platform = chart.active[0]._model.label == 'iOS' ? 'ios' : 'android';
      } else {
        this.platform = 'all';
      }
    },
    changePage: function changePage(page) {
      // this.page = page
      this.getDetails();
    },
    filterMemSize: function filterMemSize(filters) {
      this.page = 1;
      this.memSize = filters.memSize[0] || [];
      this.getDetails();
    },
    sortChange: function sortChange(column) {
      var field = column.prop;
      if (field == "total_mem_size") {
        field = "device.total_mem_size";
      }

      if (column.column == null) {
        this.orderBy = {};
      } else if (column.order == "descending") {
        this.orderBy[column.prop] = "desc";
      } else {
        this.orderBy[column.prop] = "asc";
      }

      this.page = 1;
      this.getDetails();
    },
    changeDateType: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(val) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(val != 'custom')) {
                  _context2.next = 6;
                  break;
                }

                this.page = 1;
                _context2.next = 4;
                return this.fetchData();

              case 4:
                _context2.next = 7;
                break;

              case 6:
                this.$refs.datePicker.handleFocus();

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function changeDateType(_x) {
        return _ref.apply(this, arguments);
      }

      return changeDateType;
    }(),
    changeDateRange: function changeDateRange(val) {
      this.page = 1;
      this.fetchData();
      this.getDetails();
    },
    calcRate: function calcRate() {
      switch (this.dateType) {
        case 'week':
          var end = new Date();
          var start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          end.setTime(end.getTime() - 3600 * 1000 * 24);
          this.dateRange = [start, end];
          break;
        case 'month':
          var end = new Date();
          var start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 31);
          end.setTime(end.getTime() - 3600 * 1000 * 24);
          this.dateRange = [start, end];
          break;
      }
    },
    fetchData: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var data, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.calcRate();
                data = {
                  platform: this.platform,
                  stats_type: this.statsType,
                  start_date: this.dateRange[0].Format("yyyy-MM-dd"),
                  end_date: this.dateRange[1].Format("yyyy-MM-dd")
                };
                _context3.next = 4;
                return this.$acs.getStatsDevice(data);

              case 4:
                result = _context3.sent;

                if (result.success) {
                  this.chart_models = result.chart_models;
                  this.update_chart_platforms(result.platforms);
                  this.update_model_chart(result.reports);
                }

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchData() {
        return _ref2.apply(this, arguments);
      }

      return fetchData;
    }(),
    update_chart_platforms: function update_chart_platforms(chart_models) {
      if (!chart_models) {
        return;
      }

      this.chart_platforms = Object.assign({}, {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: []
        }]
      });

      var iphone = chart_models.find(function (r) {
        return r.platform == "ios";
      });
      if (iphone) {
        this.chart_platforms.labels.push("iOS");
        this.chart_platforms.datasets[0].data.push(iphone.count);
        this.chart_platforms.datasets[0].backgroundColor.push('rgba(54, 162, 235, 0.8)');
      }

      var android = chart_models.find(function (r) {
        return r.platform == "android";
      });
      if (android) {
        this.chart_platforms.labels.push("Android");
        this.chart_platforms.datasets[0].data.push(android.count);
        this.chart_platforms.datasets[0].backgroundColor.push('rgba(75, 192, 192, 0.8)');
      }
    },
    update_model_chart: function update_model_chart(chart_models) {
      var _this3 = this;

      if (!chart_models) {
        return;
      }

      this.chart_models = {
        labels: [],
        datasets: [{
          label: '设备数',
          data: [],
          backgroundColor: []
        }]
      };

      chart_models.forEach(function (rpt, index) {
        _this3.chart_models.labels.push(rpt.model || rpt.os);
        _this3.chart_models.datasets[0].data.push(rpt.count);
        _this3.chart_models.datasets[0].backgroundColor.push(_this3.reports_colors[index % _this3.reports_colors.length]);
      });
    },

    getDetails: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var data, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.calcRate();
                data = {
                  platform: this.platform,
                  stats_type: this.statsType,
                  mem_size: this.memSize,
                  start_date: this.dateRange[0].Format("yyyy-MM-dd"),
                  end_date: this.dateRange[1].Format("yyyy-MM-dd"),
                  order_by: this.orderBy,
                  page: this.page,
                  records_per_page: 10
                };

                this.reports = [];
                _context4.next = 5;
                return this.$acs.getStatsDeviceDetails(data);

              case 5:
                result = _context4.sent;

                if (result.success) {
                  this.reports = result.reports;
                  this.total = result.total;
                }

              case 7:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getDetails() {
        return _ref3.apply(this, arguments);
      }

      return getDetails;
    }()
  }
});

/***/ }),
/* 951 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_date__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_common_js_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_bulma_datepicker__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_bulma_datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_bulma_datepicker__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function mounted() {
    this.fetchData();
  },
  data: function data() {
    return {
      platform: 'all',
      dateType: 'week',
      dateRange: [],
      pickerOptions: {
        disabledDate: function disabledDate(date) {
          var limitDate = new Date();
          limitDate.setTime(limitDate.getTime() - 3600 * 1000 * 24);
          return date > limitDate;
        }
      },
      reports: []
    };
  },


  watch: {
    app: function app(newVal) {}
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['app'])),

  methods: {
    changePlatform: function changePlatform(val) {
      this.fetchData();
    },
    changeDateType: function changeDateType(val) {
      if (val != 'custom') this.fetchData();else this.$refs.datePicker.handleFocus();
    },
    changeDateRange: function changeDateRange(val) {
      this.fetchData();
    },
    calcRate: function calcRate(report, nday) {
      var now = new Date();
      var start = new Date().setTime(Date.parse(report.date) + 3600 * 1000 * 24 * nday);
      if (start > now) return -1;

      var record = report.user_retentions.find(function (rpt) {
        return rpt.nday == nday;
      });
      if (record && report.danu > 0) {
        return (record.retention / report.danu * 100).toFixed(2);
      } else {
        return 0;
      }
    },
    fetchData: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var end, start, data, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = this.dateType;
                _context.next = _context.t0 === 'week' ? 3 : _context.t0 === 'month' ? 9 : 15;
                break;

              case 3:
                end = new Date();
                start = new Date();

                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                end.setTime(end.getTime() - 3600 * 1000 * 24);
                this.dateRange = [start, end];
                return _context.abrupt('break', 15);

              case 9:
                end = new Date();
                start = new Date();

                start.setTime(start.getTime() - 3600 * 1000 * 24 * 31);
                end.setTime(end.getTime() - 3600 * 1000 * 24);
                this.dateRange = [start, end];
                return _context.abrupt('break', 15);

              case 15:
                data = {
                  platform: this.platform,
                  start_date: this.dateRange[0].Format("yyyy-MM-dd"),
                  end_date: this.dateRange[1].Format("yyyy-MM-dd")
                };
                _context.next = 18;
                return this.$acs.getRetentionStats(data);

              case 18:
                result = _context.sent;

                if (result.success) {
                  this.reports = result.reports;
                }

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchData() {
        return _ref.apply(this, arguments);
      }

      return fetchData;
    }()
  },

  components: {
    Tabs: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["a" /* Tabs */],
    TabPane: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["b" /* TabPane */],
    'RetentionRow': {
      template: ' <td :class="colorGrad">{{value >=0 ? value + "%" : undefined}}</td>',
      props: {
        value: {
          type: null,
          default: 0
        }
      },
      computed: {
        colorGrad: function colorGrad() {
          if (this.value >= 70) return 'colorGrad1';else if (this.value >= 50) return 'colorGrad2';else if (this.value >= 30) return 'colorGrad3';else if (this.value >= 10) return 'colorGrad4';
        }
      }
    }
  }
});

/***/ }),
/* 952 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_date__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_common_js_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_bulma_datepicker__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_bulma_datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_bulma_datepicker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__device_bar__ = __webpack_require__(564);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Tabs: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["a" /* Tabs */],
    TabPane: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["b" /* TabPane */],
    Bar: __WEBPACK_IMPORTED_MODULE_4__device_bar__["a" /* Bar */],
    HorizontalBar: __WEBPACK_IMPORTED_MODULE_4__device_bar__["b" /* HorizontalBar */],
    Pie: __WEBPACK_IMPORTED_MODULE_4__device_bar__["c" /* Pie */]
  },
  mounted: function mounted() {
    var _this2 = this;

    return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this2.date = _this2.defaultDate;
              _context.next = 3;
              return _this2.fetchData();

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }))();
  },
  data: function data() {
    return {
      statsType: 'model',
      platform: 'all',
      memSize: [],
      orderBy: {},
      dateType: 'week',
      date: '',
      pickerOptions: {
        disabledDate: function disabledDate(date) {
          var limitDate = new Date();
          limitDate.setTime(limitDate.getTime() - 3600 * 1000 * 24);
          return date > limitDate;
        }
      },
      labels: ['0-5分钟', '5-10分钟', '10-15分钟', '15-20分钟', '20-25分钟', '25-30分钟', '30-35分钟', '35-40分钟', '40-45分钟', '45-50分钟', '50-55分钟', '55-60分钟', '60分钟以上'],
      reports_colors: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(75, 192, 192, 0.8)', 'rgba(153, 102, 255, 0.8)', 'rgba(255, 159, 64, 0.8)'],
      platform_timings: [],
      chart_reports: {
        labels: [],
        datasets: []
      },
      reports: []
    };
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['app']), {
    defaultDate: function defaultDate() {
      var start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24);
      return start.Format("yyyy-MM-dd");
    },
    modelOptions: function modelOptions() {
      var _this = this;
      return {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            barPercentage: 0.7
          }]
        },
        onClick: function onClick() {
          _this.platform = 'all';
        }
      };
    },
    timings: function timings() {
      var platform_index = this.platform == "all" ? 0 : this.platform == "android" ? 1 : 2;
      return this.platform_timings[platform_index];
    },
    timings_total: function timings_total() {
      return this.timings.reduce(function (sum, item) {
        return sum + item;
      }, 0);
    }
  }),

  methods: {
    changeDate: function changeDate(date) {
      if (!date) {
        this.date = this.defaultDate;
      }
      this.fetchData();
    },
    changePlatform: function changePlatform(chart) {
      this.update_chart();
    },
    fetchData: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$acs.getUserTimingByDay({
                  date: this.date instanceof Date ? this.date.Format("yyyy-MM-dd") : this.date
                });

              case 2:
                result = _context2.sent;

                if (result.success) {
                  this.platform_timings = result.timing;
                  this.update_chart();
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchData() {
        return _ref.apply(this, arguments);
      }

      return fetchData;
    }(),
    update_chart: function update_chart() {
      var _this3 = this;

      this.chart_reports = Object.assign({}, {
        labels: this.labels,
        datasets: [{
          data: [],
          backgroundColor: []
        }]
      });

      this.timings.forEach(function (timing, index) {
        // this.chart_reports.datasets[0].data.push(timing)
        _this3.chart_reports.datasets[0].data.push(Math.round(Math.random() * 100));
        _this3.chart_reports.datasets[0].backgroundColor.push(_this3.reports_colors[0]);
      });
    }
  }
});

/***/ }),
/* 953 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_store_getters__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_bulma_tooltip__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_admin_components_user__ = __webpack_require__(789);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      keyword: "",
      searching: false,
      loading: false,
      initing: true,
      users: [],
      page: 1,
      total: 1,
      recordsPerPage: 10
    };
  },

  computed: {
    appIcon: function appIcon() {
      if (this.app && this.app.icon) {
        return this.app.icon;
      } else {
        return 'https://placehold.it/32x32?text=' + this.app.name;
      }
    },

    currency: function currency() {
      if (this.app && this.app.currency) {
        return this.app.currency;
      } else {
        return '';
      }
    }

  },

  mounted: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.searchUsers();

            case 2:
              this.initing = false;

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function mounted() {
      return _ref.apply(this, arguments);
    }

    return mounted;
  }(),

  methods: {
    getOrderPlatformIcon: function getOrderPlatformIcon(user) {
      var result = 'fa fa-';
      switch (user.platform) {
        case 'android':
          result = result + 'android';
          break;
        case 'ios':
          result = result + 'apple ';
          break;
        case 'wp8':
          result = result + 'windows ';
          break;
        default:
          result = result + 'apple ';
          break;
      }

      switch (user.status) {
        case 0:
          result = result + ' is-primary';
          break;
        case 1:
          result = result + ' is-info';
          break;
        case 2:
          result = result + ' is-success';
          break;
        case 3:
          result = result + ' is-danger';
          break;
      }

      return result;
    },

    onPageChange: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(page) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.searchUsers();

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onPageChange(_x) {
        return _ref2.apply(this, arguments);
      }

      return onPageChange;
    }(),

    onSearchBoxSubmit: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.page = 1;
                _context3.next = 3;
                return this.searchUsers();

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onSearchBoxSubmit() {
        return _ref3.apply(this, arguments);
      }

      return onSearchBoxSubmit;
    }(),

    searchUsers: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.searching = true;
                _context4.next = 3;
                return this.$acs.searchUsers({
                  keyword: this.keyword,
                  page: this.page,
                  records_per_page: this.recordsPerPage
                });

              case 3:
                result = _context4.sent;

                if (result.success) {
                  this.total = result.total;
                  this.users = result.users;
                }
                this.searching = false;

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function searchUsers() {
        return _ref4.apply(this, arguments);
      }

      return searchUsers;
    }(),
    showDetails: function showDetails(row, event) {
      __WEBPACK_IMPORTED_MODULE_5_admin_components_user__["a" /* default */].show(row.id);
    }
  },

  components: {
    Pagination: __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination___default.a,
    Tooltip: __WEBPACK_IMPORTED_MODULE_4_vue_bulma_tooltip__["a" /* default */],
    UserDetail: __WEBPACK_IMPORTED_MODULE_5_admin_components_user__["a" /* default */]
  }
});

/***/ }),
/* 954 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_components_toast__ = __webpack_require__(35);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
  created: function created() {
    Vue.vueDragula.options(this.bagId, {
      direction: 'vertical'
    });
  },
  mounted: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.addWcpEmptyParams();

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function mounted() {
      return _ref.apply(this, arguments);
    }

    return mounted;
  }(),

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['wcpParams'])),

  data: function data() {
    return {
      selectedButton: {},
      loading: true,
      options: [{
        text: '点击事件(传回服务器)',
        value: 'click'
      }, {
        text: '访问网页(直接跳转)',
        value: 'view'
      }],
      subMenuModel: {
        "name": "",
        "sub_button": [{
          "type": "",
          "name": "",
          "key": "",
          "url": ""
        }, {
          "type": "",
          "name": "",
          "key": "",
          "url": ""
        }, {
          "type": "",
          "name": "",
          "key": "",
          "url": ""
        }, {
          "type": "",
          "name": "",
          "key": "",
          "url": ""
        }, {
          "type": "",
          "name": "",
          "key": "",
          "url": ""
        }]
      }
    };
  },

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['updateWcpParams']), {

    setCurrentButton: function setCurrentButton(button) {
      this.selectedButton = button;
    },

    addWcpEmptyParams: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var app_id, result, config;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.loading = true;
                app_id = this.$route.params.appId;
                _context2.next = 4;
                return this.$acs.addWcpEmptyParams({
                  app_id: app_id,
                  menu: ''
                });

              case 4:
                result = _context2.sent;


                if (result.success) {
                  config = result.wcpconfig;

                  config.menu = this.fixFullMenu(config.menu);
                  this.updateWcpParams(config);
                }

                this.loading = false;

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addWcpEmptyParams() {
        return _ref2.apply(this, arguments);
      }

      return addWcpEmptyParams;
    }(),

    getMenu: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var response;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.loading = true;
                _context3.next = 3;
                return this.$acs.getWcpMenu({
                  app_id: this.wcpParams.app_id
                });

              case 3:
                response = _context3.sent;

                if (response.success) {
                  this.wcpParams.menu = this.fixFullMenu(response.menu);
                  __WEBPACK_IMPORTED_MODULE_2_common_components_toast__["a" /* default */].show(this.$t('admin.wcp.menus.getSuccess'));
                } else {
                  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__["b" /* processAjaxError */])(response);
                }
                this.loading = false;

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getMenu() {
        return _ref3.apply(this, arguments);
      }

      return getMenu;
    }(),

    updateMenu: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var newmenu, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.loading = true;
                newmenu = JSON.parse(JSON.stringify(this.wcpParams.menu)); //deep copy

                newmenu = JSON.parse(JSON.stringify(this.cleanEmpty(newmenu)).replace(/null,/g, '').replace(/,null/g, ''));

                _context4.next = 5;
                return this.$acs.updateWcpMenu({
                  app_id: this.wcpParams.app_id,
                  menu: newmenu
                });

              case 5:
                response = _context4.sent;

                if (response.success) {
                  __WEBPACK_IMPORTED_MODULE_2_common_components_toast__["a" /* default */].show(this.$t('admin.wcp.menus.updateSuccess'));
                } else {
                  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__["b" /* processAjaxError */])(response);
                }

                this.loading = false;

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateMenu() {
        return _ref4.apply(this, arguments);
      }

      return updateMenu;
    }(),

    cleanEmpty: function cleanEmpty(obj) {
      for (var i in obj) {
        var value = obj[i];
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !Array.isArray(value)) {
          if (!value["name"] || value["name"].trim() === '') {
            delete obj[i];
          }
        }
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          if (Array.isArray(value)) {
            if (value.length == 0) {
              delete obj[i];
              continue;
            }
          }
          value = this.cleanEmpty(value);
          if (this.isEmpty(value)) {
            delete obj[i];
          }
        } else {
          if (value === null || value === undefined || value === '') {
            delete obj[i];
          }
        }
      }
      return obj;
    },

    isEmpty: function isEmpty(object) {
      for (var name in object) {
        return false;
      }
      return true;
    },

    fixFullMenu: function fixFullMenu(obj) {
      if (obj) {
        obj.button[0] = this.fixMenu(obj.button[0]);
        obj.button[1] = this.fixMenu(obj.button[1]);
        obj.button[2] = this.fixMenu(obj.button[2]);
      } else {
        obj = {
          "button": []
        };
        for (var i = 0; i < 3; i++) {
          var newmenu = JSON.parse(JSON.stringify(this.subMenuModel)); //deep copy
          obj.button.push(newmenu);
        }
      }
      return obj;
    },

    fixMenu: function fixMenu(obj) {
      if (obj) {
        var sub_button = obj.sub_button;
        if (sub_button && Array.isArray(sub_button)) {
          var ml = 5 - sub_button.length;
          if (ml > 0) {
            for (var i = 0; i < ml; i++) {
              var temp = {
                type: '',
                name: '',
                key: '',
                url: ''
              };
              sub_button.unshift(temp);
            }
          }
        } else {
          var nm = JSON.parse(JSON.stringify(this.subMenuModel.sub_button)); //deep copy
          obj.push(nm);
        }
      } else {
        var newmenu = JSON.parse(JSON.stringify(this.subMenuModel)); //deep copy
        obj = newmenu;
      }
      return obj;
    }
  }),

  watch: {
    selected: function selected(val) {
      this.selectedButton.type = val;
    }
  }
});

/***/ }),
/* 955 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__talk__ = __webpack_require__(1427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__talk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__talk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_dialog_messageBox__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Pagination: __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination___default.a,
    talk: __WEBPACK_IMPORTED_MODULE_1__talk___default.a
  },
  data: function data() {
    return {
      keyword: "",
      messages: [],
      page: 1,
      total: 1,
      recordsPerPage: 20,
      loading: false,
      sorts: {},
      showTalkModal: false
    };
  },


  mounted: function mounted() {
    this.getMessageList();
  },

  methods: {
    getRowKey: function getRowKey(row) {
      return row.id;
    },
    rowClick: function rowClick(row, event) {
      this.$refs.talk.open(row);
    },
    getMessageList: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var data, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.loading = true;
                data = {
                  app_id: this.$route.params.appId,
                  keyword: this.keyword,
                  page: this.page,
                  records_per_page: this.recordsPerPage,
                  sorts: this.sorts
                };
                _context.next = 4;
                return this.$acs.getMessageList(data);

              case 4:
                result = _context.sent;

                if (result.success) {
                  this.total = result.total;
                  this.messages = result.messages;
                }
                this.loading = false;

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getMessageList() {
        return _ref.apply(this, arguments);
      }

      return getMessageList;
    }(),

    onPageChange: function onPageChange() {
      this.getMessageList(this.page, this.recordsPerPage);
    },

    onSearchBoxSubmit: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.messages = [];
                this.page = 1;
                _context2.next = 4;
                return this.getMessageList();

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onSearchBoxSubmit() {
        return _ref2.apply(this, arguments);
      }

      return onSearchBoxSubmit;
    }(),
    sortChange: function sortChange(column) {
      var field = column.prop;

      if (column.column == null) {
        this.sorts = {};
      } else if (column.order == "descending") {
        this.sorts[column.prop] = "desc";
      } else {
        this.sorts[column.prop] = "asc";
      }

      this.page = 1;
      this.getMessageList();
    }

  }

});

/***/ }),
/* 956 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_wcp_paramsEditor__ = __webpack_require__(1383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_wcp_paramsEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_admin_components_wcp_paramsEditor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_wcp_replyEditor__ = __webpack_require__(1384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_wcp_replyEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_admin_components_wcp_replyEditor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_wcp_replyModelEditor__ = __webpack_require__(1385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_admin_components_wcp_replyModelEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_admin_components_wcp_replyModelEditor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_admin_components_wcp_downloadReplyEditor__ = __webpack_require__(1382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_admin_components_wcp_downloadReplyEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_admin_components_wcp_downloadReplyEditor__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.addWcpEmptyParams();

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function mounted() {
      return _ref.apply(this, arguments);
    }

    return mounted;
  }(),

  components: {
    Tabs: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["a" /* Tabs */],
    TabPane: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_tabs__["b" /* TabPane */],
    paramsEditor: __WEBPACK_IMPORTED_MODULE_2_admin_components_wcp_paramsEditor___default.a,
    replyEditor: __WEBPACK_IMPORTED_MODULE_3_admin_components_wcp_replyEditor___default.a,
    replyModelEditor: __WEBPACK_IMPORTED_MODULE_4_admin_components_wcp_replyModelEditor___default.a,
    downloadReplyEditor: __WEBPACK_IMPORTED_MODULE_5_admin_components_wcp_downloadReplyEditor___default.a
  },

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['updateWcpParams']), {

    showPopup: function showPopup(e) {
      var rect = e.target.getBoundingClientRect();
      this.popup.x = rect.left;
      this.popup.y = rect.top;
    },

    addWcpEmptyParams: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var app_id, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.loading = true;
                app_id = this.$route.params.appId;
                _context2.next = 4;
                return this.$acs.addWcpEmptyParams({
                  app_id: app_id,
                  menu: ''
                });

              case 4:
                result = _context2.sent;


                if (result.success) {
                  this.updateWcpParams(result.wcpconfig);
                }

                this.loading = false;

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addWcpEmptyParams() {
        return _ref2.apply(this, arguments);
      }

      return addWcpEmptyParams;
    }()

  })
});

/***/ }),
/* 957 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_imageUpload__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_components_progress__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_components_toast__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_js_utils__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_js_acs__ = __webpack_require__(41);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//











var touchMap = new WeakMap();

/* harmony default export */ __webpack_exports__["default"] = ({
  computed: {
    errorHint: function errorHint() {
      if (!this.$v.rule.keywords.required) {
        return this.$t('admin.wcp.keywordsRequired');
      } else if (!this.$v.rule.keywords.maxLength) {
        return this.$t('error.validation.postTitleMaxLength');
      } else if (!this.$v.rule.keywords.emoji) {
        return this.$t('error.validation.emojiPostTitle');
      } else if (!this.$v.rule.response.required) {
        return this.$t('error.validation.responseRequired');
      }
      return '';
    }
  },

  validations: {
    rule: {
      keywords: {
        required: __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["required"],
        maxLength: __WEBPACK_IMPORTED_MODULE_4_common_js_utils__["c" /* maxLength */](250),
        emoji: function emoji(val) {
          return !/\ud83d[\ude00-\ude4f]/.test(val);
        }
      },
      response: {
        required: __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["required"]
      }
    }
  },

  data: function data() {
    return {
      loginCode: ':login_code',
      rule: Object,
      processing: false,
      editor: undefined
    };
  },


  mounted: function mounted() {
    this.rule = this.$route.params.rule;
  },

  methods: {
    setEditor: function setEditor(editor) {
      this.editor = editor;
    },

    handleValidation: function handleValidation($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch(), 2000));
    },

    setLoginCode: function setLoginCode(x) {
      this.rule.response = x.value ? this.loginCode : '';
    },

    onInsertImage: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(editor) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_common_components_imageUpload__["a" /* showImageUploadDialog */])(this.$i18n, {
                  postAction: '/admin_actions/wcp/upload_wcp_image',
                  maxLength: 800,
                  destFormat: 'image/jpeg',
                  destQuality: 90,
                  data: {
                    app_id: this.rule.app_id
                  },
                  headers: {
                    'x-csrf-token': window.acsConfig.csrfToken
                  },
                  callback: function callback(response) {
                    if (response.success) {
                      editor.focus();
                      var index = editor.getSelection().index;
                      editor.insertEmbed(index, 'image', response.link);
                      editor.formatText(index, 1, 'width', response.width);
                      editor.formatText(index, 1, 'height', response.height);
                    } else if (response.i18n_message) {
                      __WEBPACK_IMPORTED_MODULE_3_common_components_toast__["a" /* default */].show(_this.$t(response.i18n_message, response.i18n_message_object));
                    } else if (response.message) {
                      __WEBPACK_IMPORTED_MODULE_3_common_components_toast__["a" /* default */].show(response.message);
                    } else {
                      __WEBPACK_IMPORTED_MODULE_3_common_components_toast__["a" /* default */].show(_this.$t('error.server.networkError'));
                    }
                  }
                });

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onInsertImage(_x) {
        return _ref.apply(this, arguments);
      }

      return onInsertImage;
    }(),

    handleSubmit: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!this.$v.$invalid && !this.processing)) {
                  _context2.next = 7;
                  break;
                }

                this.processing = true;
                _context2.next = 4;
                return this.$acs.updateWcpRules(this.rule);

              case 4:
                result = _context2.sent;


                if (result.success) {
                  __WEBPACK_IMPORTED_MODULE_3_common_components_toast__["a" /* default */].show(this.$t('admin.wcp.operateSuccess'));
                  this.$router.replace({
                    name: 'WcpRules'
                  });
                }
                this.processing = false;

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleSubmit() {
        return _ref2.apply(this, arguments);
      }

      return handleSubmit;
    }()
  }
});

/***/ }),
/* 958 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_admin_miscellaneous__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_admin_components_dialog_messageBox__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_bulma_tooltip__ = __webpack_require__(81);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      rules: [],
      page: 1,
      total: 1,
      recordsPerPage: 10,
      loading: true
    };
  },


  mounted: function mounted() {
    this.getRuleList(this.page, this.recordsPerPage);
    this.loading = true;
  },

  methods: {
    getRuleList: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(page, recordsPerPage) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$acs.getRuleList(this.$route.params.appId, page, recordsPerPage);

              case 2:
                result = _context.sent;


                if (result.success) {
                  this.total = result.total;
                  this.rules = result.rules;
                  this.page = page;
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getRuleList(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getRuleList;
    }(),

    onPageChange: function onPageChange(page) {
      this.getRuleList(page, this.recordsPerPage);
    },

    editRule: function editRule(rule, index) {
      this.$router.push({
        name: 'WcpEditRule',
        params: {
          rule: rule
        }
      });
    },

    deleteRule: function deleteRule(rule, index) {
      var _this = this;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_admin_components_dialog_messageBox__["a" /* showMessageBox */])({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.messages.confirmDeleteRule'),
        type: 'danger',
        onOK: function onOK(_) {
          _this._deleteRule(rule, index);
        }
      });
    },

    _deleteRule: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(rule, index) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$acs.deleteRule(rule.id, this.$t('admin.operateSuccess'));

              case 2:
                result = _context2.sent;


                if (result.success) {
                  this.rules.splice(index, 1);
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _deleteRule(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return _deleteRule;
    }()

  },

  components: {
    Pagination: __WEBPACK_IMPORTED_MODULE_3_admin_components_Pagination___default.a,
    Tooltip: __WEBPACK_IMPORTED_MODULE_4_vue_bulma_tooltip__["a" /* default */]
  }

});

/***/ }),
/* 959 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      visible: false,
      message: undefined,
      messages: [],
      content: ''
    };
  },

  computed: {
    title: function title() {
      return '\u4E0E' + this.userName + '\u7684\u5BF9\u8BDD';
    },
    userName: function userName() {
      return this.message.from.id ? this.message.from.nickname : this.message.to.nickname;
    }
  },
  watch: {
    'visible': function visible(newValue) {
      if (!newValue) {
        this.$emit("close");
      }
    }
  },
  methods: {
    open: function open(message) {
      this.visible = true;
      this.message = message;
      this.fetchData();
    },
    close: function close() {
      this.visible = false;
    },
    reply: function reply() {
      var _this = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var appId, openId, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                appId = _this.$route.params.appId;
                openId = _this.message.from.id ? _this.message.from.openid : _this.message.to.openid;
                _context.next = 4;
                return _this.$acs.replyUserMessage(appId, openId, _this.content);

              case 4:
                result = _context.sent;

                if (result.success) {
                  _this.messages.push(result.message);
                  _this.content = '';
                }

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    fetchData: function fetchData() {
      var _this2 = this;

      return _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var appId, openId, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.messages = [];
                appId = _this2.$route.params.appId;
                openId = _this2.message.from.id ? _this2.message.from.openid : _this2.message.to.openid;
                _context2.next = 5;
                return _this2.$acs.getUserMessageList(appId, openId);

              case 5:
                result = _context2.sent;

                if (result.success) {
                  _this2.messages = result.messages;
                }

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    }
  }
});

/***/ }),
/* 960 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post('/admin_actions/fetch_supported_sdks').then(function (response) {
      return response.data;
    }).then(function (result) {
      if (result.success) {
        next(function (vm) {
          vm.updateSdks(result.sdks);
          vm.updateAdminLevel(result.admin_level);
        });
      } else {
        next({
          path: '/admin/error'
        });
      }
    }).catch(function (e) {
      next({
        path: '/admin/error'
      });
    });
  },

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['updateSdks', 'updateAdminLevel']))
});

/***/ }),
/* 961 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_admin_views_app_config_basicInfoEditor__ = __webpack_require__(751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_admin_views_app_config_basicInfoEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_admin_views_app_config_basicInfoEditor__);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      app: {
        name: '',
        currency: 'CNY',
        payment_callback: 'https://',
        chaoxin_group_id: '',
        token_ttl: 604800,
        forum_name: '',
        forum_url: ''
      }
    };
  },


  components: {
    basicInfoEditor: __WEBPACK_IMPORTED_MODULE_0_admin_views_app_config_basicInfoEditor___default.a
  }
});

/***/ }),
/* 962 */,
/* 963 */,
/* 964 */,
/* 965 */,
/* 966 */,
/* 967 */,
/* 968 */,
/* 969 */,
/* 970 */,
/* 971 */,
/* 972 */,
/* 973 */,
/* 974 */,
/* 975 */,
/* 976 */,
/* 977 */,
/* 978 */,
/* 979 */,
/* 980 */,
/* 981 */,
/* 982 */,
/* 983 */,
/* 984 */,
/* 985 */,
/* 986 */,
/* 987 */,
/* 988 */,
/* 989 */,
/* 990 */,
/* 991 */,
/* 992 */,
/* 993 */,
/* 994 */,
/* 995 */,
/* 996 */,
/* 997 */,
/* 998 */,
/* 999 */,
/* 1000 */,
/* 1001 */,
/* 1002 */,
/* 1003 */,
/* 1004 */,
/* 1005 */,
/* 1006 */,
/* 1007 */,
/* 1008 */,
/* 1009 */,
/* 1010 */,
/* 1011 */,
/* 1012 */,
/* 1013 */,
/* 1014 */,
/* 1015 */,
/* 1016 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_bulma_modal__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_upload_component__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_upload_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_upload_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_filters__ = __webpack_require__(52);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









function checkFileType(accepts, fileType) {
  return accepts.split(',').reduce(function (acc, accept) {
    return acc || new RegExp(accept.trim().replace('*', '(.*)')).test(fileType);
  }, false);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    callback: {
      type: Function,
      default: undefined
    },
    name: {
      type: String,
      default: 'file'
    },
    title: {
      type: String,
      default: ''
    },
    extensions: {
      default: function _default() {
        return [];
      }
    },
    postAction: {
      type: String
    },
    accept: {
      type: String
    },
    headers: {
      type: Object,
      default: function _default() {}
    },
    data: {
      type: Object,
      default: function _default() {}
    },
    maxFileSize: {
      type: Number,
      default: 512 * 1024
    },
    imageValidator: {
      type: Object,
      default: null
    }
  },

  data: function data() {
    var _this = this;

    return {
      file: undefined,
      upload: undefined,
      active: false,
      errorMessage: '',
      uploadEvents: {
        add: function add(file) {
          _this.file = undefined;
          _this.upload.$el.style.backgroundImage = '';

          if (file.size > _this.maxFileSize) {
            _this.errorMessage = _this.$t('upload.fileIsTooLarge', {
              maxFileSize: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_common_js_filters__["humanReadableSize"])('' + _this.maxFileSize)
            });
            _this.upload.clear();
          } else if (!checkFileType(_this.accept, file.file.type)) {
            _this.errorMessage = _this.$t('upload.invalidFileType', {
              fileType: file.file.type
            });
            _this.upload.clear();
          } else {
            _this.errorMessage = '';

            if (/image\/(.*)/.test(file.file.type)) {
              console.log('file is image...');
              var reader = new FileReader();
              reader.onloadend = function (_) {
                var img = new Image();
                img.onload = function (_) {
                  if (_this.imageValidator && _this.imageValidator.square) {
                    if (Math.abs(img.height / img.width - 1.0) > 0.01) {
                      _this.errorMessage = _this.$t('upload.imgShouldBeSquare');
                      _this.upload.clear();
                      return;
                    }
                  }

                  if (_this.imageValidator && _this.imageValidator.ratio) {
                    if (Math.abs(img.height / img.width - _this.imageValidator.ratio) > 0.01) {
                      _this.errorMessage = _this.$t('upload.invalidImageRatio', {
                        ratio: (img.height / img.width).toFixed(2),
                        requiredRatio: _this.imageValidator.ratio.toFixed(2)
                      });
                      _this.upload.clear();
                      return;
                    }
                  }

                  if (_this.imageValidator && _this.imageValidator.minWidth) {
                    if (img.width < _this.imageValidator.minWidth) {
                      _this.errorMessage = _this.$t('upload.imgWidthShouldGreaterThan', {
                        minWidth: _this.imageValidator.minWidth
                      });
                      _this.upload.clear();
                      return;
                    }
                  }

                  if (_this.imageValidator && _this.imageValidator.minHeight) {
                    if (img.height < _this.imageValidator.minHeight) {
                      _this.errorMessage = _this.$t('upload.imgHeightShouldGreaterThan', {
                        minHeight: _this.imageValidator.minHeight
                      });
                      _this.upload.clear();
                      return;
                    }
                  }

                  _this.file = file;
                  _this.upload.$el.style.backgroundImage = 'url(' + reader.result + ')';
                };
                img.src = reader.result;
              };
              reader.readAsDataURL(file.file);
            } else {
              _this.file = file;
            }
          }
        },
        after: function after(file, component) {
          _this.file = undefined;
          _this.visible = false;

          _this.$nextTick(function (_) {
            if (typeof _this.callback == 'function') {
              if (file.xhr.status == 200) {
                _this.callback(file.response);
              } else {
                _this.callback({
                  success: false,
                  i18n_message: 'error.server.networkError'
                });
              }
            }
          });
        }
      }
    };
  },

  mounted: function mounted() {
    this.upload = this.$refs.upload;
    if (!this.title) {
      this.title = this.$t('upload.hint');
    }
  },

  components: {
    FileUpload: __WEBPACK_IMPORTED_MODULE_2_vue_upload_component___default.a,
    Modal: __WEBPACK_IMPORTED_MODULE_1_vue_bulma_modal__["a" /* Modal */]
  }
});

/***/ }),
/* 1017 */,
/* 1018 */,
/* 1019 */,
/* 1020 */,
/* 1021 */,
/* 1022 */,
/* 1023 */,
/* 1024 */,
/* 1025 */,
/* 1026 */,
/* 1027 */,
/* 1028 */,
/* 1029 */,
/* 1030 */,
/* 1031 */,
/* 1032 */,
/* 1033 */,
/* 1034 */,
/* 1035 */,
/* 1036 */,
/* 1037 */,
/* 1038 */,
/* 1039 */,
/* 1040 */,
/* 1041 */,
/* 1042 */,
/* 1043 */,
/* 1044 */,
/* 1045 */,
/* 1046 */,
/* 1047 */,
/* 1048 */,
/* 1049 */,
/* 1050 */,
/* 1051 */,
/* 1052 */,
/* 1053 */,
/* 1054 */,
/* 1055 */,
/* 1056 */,
/* 1057 */,
/* 1058 */,
/* 1059 */,
/* 1060 */,
/* 1061 */,
/* 1062 */,
/* 1063 */,
/* 1064 */,
/* 1065 */,
/* 1066 */,
/* 1067 */,
/* 1068 */,
/* 1069 */,
/* 1070 */,
/* 1071 */,
/* 1072 */,
/* 1073 */,
/* 1074 */,
/* 1075 */,
/* 1076 */,
/* 1077 */,
/* 1078 */,
/* 1079 */,
/* 1080 */,
/* 1081 */,
/* 1082 */,
/* 1083 */,
/* 1084 */,
/* 1085 */,
/* 1086 */,
/* 1087 */,
/* 1088 */,
/* 1089 */,
/* 1090 */,
/* 1091 */,
/* 1092 */,
/* 1093 */,
/* 1094 */,
/* 1095 */,
/* 1096 */,
/* 1097 */,
/* 1098 */,
/* 1099 */,
/* 1100 */,
/* 1101 */,
/* 1102 */,
/* 1103 */,
/* 1104 */,
/* 1105 */,
/* 1106 */,
/* 1107 */,
/* 1108 */,
/* 1109 */,
/* 1110 */,
/* 1111 */,
/* 1112 */,
/* 1113 */,
/* 1114 */,
/* 1115 */,
/* 1116 */,
/* 1117 */,
/* 1118 */,
/* 1119 */,
/* 1120 */,
/* 1121 */,
/* 1122 */,
/* 1123 */,
/* 1124 */,
/* 1125 */,
/* 1126 */,
/* 1127 */,
/* 1128 */,
/* 1129 */,
/* 1130 */,
/* 1131 */,
/* 1132 */,
/* 1133 */,
/* 1134 */,
/* 1135 */,
/* 1136 */,
/* 1137 */,
/* 1138 */,
/* 1139 */,
/* 1140 */,
/* 1141 */,
/* 1142 */,
/* 1143 */,
/* 1144 */,
/* 1145 */,
/* 1146 */,
/* 1147 */,
/* 1148 */,
/* 1149 */,
/* 1150 */,
/* 1151 */,
/* 1152 */,
/* 1153 */,
/* 1154 */,
/* 1155 */,
/* 1156 */,
/* 1157 */,
/* 1158 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1159 */,
/* 1160 */,
/* 1161 */,
/* 1162 */,
/* 1163 */,
/* 1164 */,
/* 1165 */,
/* 1166 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1167 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1168 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1169 */,
/* 1170 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1171 */,
/* 1172 */,
/* 1173 */,
/* 1174 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1175 */,
/* 1176 */,
/* 1177 */,
/* 1178 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1179 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1180 */,
/* 1181 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1182 */,
/* 1183 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1184 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1185 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1186 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1187 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1188 */,
/* 1189 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1190 */,
/* 1191 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1192 */,
/* 1193 */,
/* 1194 */,
/* 1195 */,
/* 1196 */,
/* 1197 */,
/* 1198 */,
/* 1199 */,
/* 1200 */,
/* 1201 */,
/* 1202 */,
/* 1203 */,
/* 1204 */,
/* 1205 */,
/* 1206 */,
/* 1207 */,
/* 1208 */,
/* 1209 */,
/* 1210 */,
/* 1211 */,
/* 1212 */,
/* 1213 */,
/* 1214 */,
/* 1215 */,
/* 1216 */,
/* 1217 */,
/* 1218 */,
/* 1219 */,
/* 1220 */,
/* 1221 */,
/* 1222 */,
/* 1223 */,
/* 1224 */,
/* 1225 */,
/* 1226 */,
/* 1227 */,
/* 1228 */,
/* 1229 */,
/* 1230 */,
/* 1231 */,
/* 1232 */,
/* 1233 */,
/* 1234 */,
/* 1235 */,
/* 1236 */,
/* 1237 */,
/* 1238 */,
/* 1239 */,
/* 1240 */,
/* 1241 */,
/* 1242 */,
/* 1243 */,
/* 1244 */,
/* 1245 */,
/* 1246 */,
/* 1247 */,
/* 1248 */,
/* 1249 */,
/* 1250 */,
/* 1251 */,
/* 1252 */,
/* 1253 */,
/* 1254 */,
/* 1255 */,
/* 1256 */,
/* 1257 */,
/* 1258 */,
/* 1259 */,
/* 1260 */,
/* 1261 */,
/* 1262 */,
/* 1263 */,
/* 1264 */,
/* 1265 */,
/* 1266 */,
/* 1267 */,
/* 1268 */,
/* 1269 */,
/* 1270 */,
/* 1271 */,
/* 1272 */,
/* 1273 */,
/* 1274 */,
/* 1275 */,
/* 1276 */,
/* 1277 */,
/* 1278 */,
/* 1279 */,
/* 1280 */,
/* 1281 */,
/* 1282 */,
/* 1283 */,
/* 1284 */,
/* 1285 */,
/* 1286 */,
/* 1287 */,
/* 1288 */,
/* 1289 */,
/* 1290 */,
/* 1291 */,
/* 1292 */,
/* 1293 */,
/* 1294 */,
/* 1295 */,
/* 1296 */,
/* 1297 */,
/* 1298 */,
/* 1299 */,
/* 1300 */,
/* 1301 */,
/* 1302 */,
/* 1303 */,
/* 1304 */,
/* 1305 */,
/* 1306 */,
/* 1307 */,
/* 1308 */,
/* 1309 */,
/* 1310 */,
/* 1311 */,
/* 1312 */,
/* 1313 */,
/* 1314 */,
/* 1315 */,
/* 1316 */,
/* 1317 */,
/* 1318 */,
/* 1319 */,
/* 1320 */,
/* 1321 */,
/* 1322 */,
/* 1323 */,
/* 1324 */,
/* 1325 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 632,
	"./af.js": 632,
	"./ar": 639,
	"./ar-dz": 633,
	"./ar-dz.js": 633,
	"./ar-kw": 634,
	"./ar-kw.js": 634,
	"./ar-ly": 635,
	"./ar-ly.js": 635,
	"./ar-ma": 636,
	"./ar-ma.js": 636,
	"./ar-sa": 637,
	"./ar-sa.js": 637,
	"./ar-tn": 638,
	"./ar-tn.js": 638,
	"./ar.js": 639,
	"./az": 640,
	"./az.js": 640,
	"./be": 641,
	"./be.js": 641,
	"./bg": 642,
	"./bg.js": 642,
	"./bn": 643,
	"./bn.js": 643,
	"./bo": 644,
	"./bo.js": 644,
	"./br": 645,
	"./br.js": 645,
	"./bs": 646,
	"./bs.js": 646,
	"./ca": 647,
	"./ca.js": 647,
	"./cs": 648,
	"./cs.js": 648,
	"./cv": 649,
	"./cv.js": 649,
	"./cy": 650,
	"./cy.js": 650,
	"./da": 651,
	"./da.js": 651,
	"./de": 654,
	"./de-at": 652,
	"./de-at.js": 652,
	"./de-ch": 653,
	"./de-ch.js": 653,
	"./de.js": 654,
	"./dv": 655,
	"./dv.js": 655,
	"./el": 656,
	"./el.js": 656,
	"./en-au": 657,
	"./en-au.js": 657,
	"./en-ca": 658,
	"./en-ca.js": 658,
	"./en-gb": 659,
	"./en-gb.js": 659,
	"./en-ie": 660,
	"./en-ie.js": 660,
	"./en-nz": 661,
	"./en-nz.js": 661,
	"./eo": 662,
	"./eo.js": 662,
	"./es": 664,
	"./es-do": 663,
	"./es-do.js": 663,
	"./es.js": 664,
	"./et": 665,
	"./et.js": 665,
	"./eu": 666,
	"./eu.js": 666,
	"./fa": 667,
	"./fa.js": 667,
	"./fi": 668,
	"./fi.js": 668,
	"./fo": 669,
	"./fo.js": 669,
	"./fr": 672,
	"./fr-ca": 670,
	"./fr-ca.js": 670,
	"./fr-ch": 671,
	"./fr-ch.js": 671,
	"./fr.js": 672,
	"./fy": 673,
	"./fy.js": 673,
	"./gd": 674,
	"./gd.js": 674,
	"./gl": 675,
	"./gl.js": 675,
	"./gom-latn": 676,
	"./gom-latn.js": 676,
	"./he": 677,
	"./he.js": 677,
	"./hi": 678,
	"./hi.js": 678,
	"./hr": 679,
	"./hr.js": 679,
	"./hu": 680,
	"./hu.js": 680,
	"./hy-am": 681,
	"./hy-am.js": 681,
	"./id": 682,
	"./id.js": 682,
	"./is": 683,
	"./is.js": 683,
	"./it": 684,
	"./it.js": 684,
	"./ja": 685,
	"./ja.js": 685,
	"./jv": 686,
	"./jv.js": 686,
	"./ka": 687,
	"./ka.js": 687,
	"./kk": 688,
	"./kk.js": 688,
	"./km": 689,
	"./km.js": 689,
	"./kn": 690,
	"./kn.js": 690,
	"./ko": 691,
	"./ko.js": 691,
	"./ky": 692,
	"./ky.js": 692,
	"./lb": 693,
	"./lb.js": 693,
	"./lo": 694,
	"./lo.js": 694,
	"./lt": 695,
	"./lt.js": 695,
	"./lv": 696,
	"./lv.js": 696,
	"./me": 697,
	"./me.js": 697,
	"./mi": 698,
	"./mi.js": 698,
	"./mk": 699,
	"./mk.js": 699,
	"./ml": 700,
	"./ml.js": 700,
	"./mr": 701,
	"./mr.js": 701,
	"./ms": 703,
	"./ms-my": 702,
	"./ms-my.js": 702,
	"./ms.js": 703,
	"./my": 704,
	"./my.js": 704,
	"./nb": 705,
	"./nb.js": 705,
	"./ne": 706,
	"./ne.js": 706,
	"./nl": 708,
	"./nl-be": 707,
	"./nl-be.js": 707,
	"./nl.js": 708,
	"./nn": 709,
	"./nn.js": 709,
	"./pa-in": 710,
	"./pa-in.js": 710,
	"./pl": 711,
	"./pl.js": 711,
	"./pt": 713,
	"./pt-br": 712,
	"./pt-br.js": 712,
	"./pt.js": 713,
	"./ro": 714,
	"./ro.js": 714,
	"./ru": 715,
	"./ru.js": 715,
	"./sd": 716,
	"./sd.js": 716,
	"./se": 717,
	"./se.js": 717,
	"./si": 718,
	"./si.js": 718,
	"./sk": 719,
	"./sk.js": 719,
	"./sl": 720,
	"./sl.js": 720,
	"./sq": 721,
	"./sq.js": 721,
	"./sr": 723,
	"./sr-cyrl": 722,
	"./sr-cyrl.js": 722,
	"./sr.js": 723,
	"./ss": 724,
	"./ss.js": 724,
	"./sv": 725,
	"./sv.js": 725,
	"./sw": 726,
	"./sw.js": 726,
	"./ta": 727,
	"./ta.js": 727,
	"./te": 728,
	"./te.js": 728,
	"./tet": 729,
	"./tet.js": 729,
	"./th": 730,
	"./th.js": 730,
	"./tl-ph": 731,
	"./tl-ph.js": 731,
	"./tlh": 732,
	"./tlh.js": 732,
	"./tr": 733,
	"./tr.js": 733,
	"./tzl": 734,
	"./tzl.js": 734,
	"./tzm": 736,
	"./tzm-latn": 735,
	"./tzm-latn.js": 735,
	"./tzm.js": 736,
	"./uk": 737,
	"./uk.js": 737,
	"./ur": 738,
	"./ur.js": 738,
	"./uz": 740,
	"./uz-latn": 739,
	"./uz-latn.js": 739,
	"./uz.js": 740,
	"./vi": 741,
	"./vi.js": 741,
	"./x-pseudo": 742,
	"./x-pseudo.js": 742,
	"./yo": 743,
	"./yo.js": 743,
	"./zh-cn": 744,
	"./zh-cn.js": 744,
	"./zh-hk": 745,
	"./zh-hk.js": 745,
	"./zh-tw": 746,
	"./zh-tw.js": 746
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 1325;

/***/ }),
/* 1326 */,
/* 1327 */,
/* 1328 */,
/* 1329 */,
/* 1330 */,
/* 1331 */,
/* 1332 */,
/* 1333 */,
/* 1334 */,
/* 1335 */,
/* 1336 */,
/* 1337 */,
/* 1338 */,
/* 1339 */,
/* 1340 */,
/* 1341 */,
/* 1342 */,
/* 1343 */,
/* 1344 */,
/* 1345 */,
/* 1346 */,
/* 1347 */,
/* 1348 */,
/* 1349 */,
/* 1350 */,
/* 1351 */,
/* 1352 */,
/* 1353 */,
/* 1354 */,
/* 1355 */,
/* 1356 */,
/* 1357 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(885),
  /* template */
  __webpack_require__(1688),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e6cd8724", Component.options)
  } else {
    hotAPI.reload("data-v-e6cd8724", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1358 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(887),
  /* template */
  __webpack_require__(1531),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/dialog/adminUser/sectionInfo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] sectionInfo.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0b07059d", Component.options)
  } else {
    hotAPI.reload("data-v-0b07059d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1359 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(888),
  /* template */
  __webpack_require__(1666),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/dialog/app/addPoint.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] addPoint.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-afde43a4", Component.options)
  } else {
    hotAPI.reload("data-v-afde43a4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1360 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(889),
  /* template */
  __webpack_require__(1522),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/dialog/app/goodsInfo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] goodsInfo.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-01cb38f5", Component.options)
  } else {
    hotAPI.reload("data-v-01cb38f5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1361 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(890),
  /* template */
  __webpack_require__(1523),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/dialog/app/goodsProductId.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] goodsProductId.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-01f7b0b3", Component.options)
  } else {
    hotAPI.reload("data-v-01f7b0b3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1362 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(891),
  /* template */
  __webpack_require__(1624),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/dialog/app/sdkInfo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] sdkInfo.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-699db419", Component.options)
  } else {
    hotAPI.reload("data-v-699db419", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1363 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(892),
  /* template */
  __webpack_require__(1659),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/dialog/app/sdkList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] sdkList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a190efee", Component.options)
  } else {
    hotAPI.reload("data-v-a190efee", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1364 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(893),
  /* template */
  __webpack_require__(1527),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/dialog/customerService/replyQuestion.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] replyQuestion.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0684a517", Component.options)
  } else {
    hotAPI.reload("data-v-0684a517", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1365 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(894),
  /* template */
  __webpack_require__(1635),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/dialog/forum/sectionInfo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] sectionInfo.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7366ac84", Component.options)
  } else {
    hotAPI.reload("data-v-7366ac84", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1366 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(895),
  /* template */
  __webpack_require__(1611),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/dialog/messageBox/dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-57405db2", Component.options)
  } else {
    hotAPI.reload("data-v-57405db2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1367 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(896),
  /* template */
  __webpack_require__(1580),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/dialog/setting/settingInfo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] settingInfo.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3b87b65e", Component.options)
  } else {
    hotAPI.reload("data-v-3b87b65e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1368 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(897),
  /* template */
  __webpack_require__(1660),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/dialog/tipBox/dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a2cf9274", Component.options)
  } else {
    hotAPI.reload("data-v-a2cf9274", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1369 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(898),
  /* template */
  __webpack_require__(1619),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/forum/basicInfoEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] basicInfoEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-64d7dcc5", Component.options)
  } else {
    hotAPI.reload("data-v-64d7dcc5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1370 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(899),
  /* template */
  __webpack_require__(1671),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/forum/sectionInfoEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] sectionInfoEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b84efb88", Component.options)
  } else {
    hotAPI.reload("data-v-b84efb88", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1371 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(900),
  /* template */
  __webpack_require__(1564),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/layout/AppMain.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] AppMain.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-291a3fbb", Component.options)
  } else {
    hotAPI.reload("data-v-291a3fbb", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1372 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(901),
  /* template */
  __webpack_require__(1637),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/layout/FooterBar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FooterBar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7469990e", Component.options)
  } else {
    hotAPI.reload("data-v-7469990e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1373 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(902),
  /* template */
  __webpack_require__(1645),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/layout/Levelbar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Levelbar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7aef0b9e", Component.options)
  } else {
    hotAPI.reload("data-v-7aef0b9e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1374 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(903),
  /* template */
  __webpack_require__(1691),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/layout/Navbar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Navbar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f04b2242", Component.options)
  } else {
    hotAPI.reload("data-v-f04b2242", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1375 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(904),
  /* template */
  __webpack_require__(1574),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/layout/Sidebar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Sidebar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-36e8e2c6", Component.options)
  } else {
    hotAPI.reload("data-v-36e8e2c6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1376 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(905),
  /* template */
  __webpack_require__(1550),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/mall/basicInfoEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] basicInfoEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1cd26058", Component.options)
  } else {
    hotAPI.reload("data-v-1cd26058", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1377 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(906),
  /* template */
  __webpack_require__(1664),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/mall/goodsInfoEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] goodsInfoEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-adca2608", Component.options)
  } else {
    hotAPI.reload("data-v-adca2608", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1378 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(907),
  /* template */
  __webpack_require__(1638),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/mall/orderInfoEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] orderInfoEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-748d8af4", Component.options)
  } else {
    hotAPI.reload("data-v-748d8af4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1379 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1181)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(909),
  /* template */
  __webpack_require__(1620),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/stats/byDay.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] byDay.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-650bf2ff", Component.options)
  } else {
    hotAPI.reload("data-v-650bf2ff", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1380 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(910),
  /* template */
  __webpack_require__(1678),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/user/appUserList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] appUserList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c43feb68", Component.options)
  } else {
    hotAPI.reload("data-v-c43feb68", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1381 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1179)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(911),
  /* template */
  __webpack_require__(1609),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/user/detailInfo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] detailInfo.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-55194a0d", Component.options)
  } else {
    hotAPI.reload("data-v-55194a0d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1382 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(912),
  /* template */
  __webpack_require__(1658),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/wcp/downloadReplyEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] downloadReplyEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9c18d3e4", Component.options)
  } else {
    hotAPI.reload("data-v-9c18d3e4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1383 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(913),
  /* template */
  __webpack_require__(1537),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/wcp/paramsEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] paramsEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0f9719e4", Component.options)
  } else {
    hotAPI.reload("data-v-0f9719e4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1384 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(914),
  /* template */
  __webpack_require__(1648),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/wcp/replyEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] replyEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-804f4294", Component.options)
  } else {
    hotAPI.reload("data-v-804f4294", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1385 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(915),
  /* template */
  __webpack_require__(1676),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/components/wcp/replyModelEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] replyModelEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c0bfca06", Component.options)
  } else {
    hotAPI.reload("data-v-c0bfca06", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1386 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(916),
  /* template */
  __webpack_require__(1586),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/Index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3fe4bb3e", Component.options)
  } else {
    hotAPI.reload("data-v-3fe4bb3e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1387 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(917),
  /* template */
  __webpack_require__(1625),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/Settings.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Settings.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-69ca6be7", Component.options)
  } else {
    hotAPI.reload("data-v-69ca6be7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1388 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(920),
  /* template */
  __webpack_require__(1553),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/config/goodsInfoEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] goodsInfoEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-202147b6", Component.options)
  } else {
    hotAPI.reload("data-v-202147b6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1389 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(921),
  /* template */
  __webpack_require__(1559),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/config/linkEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] linkEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-275d9312", Component.options)
  } else {
    hotAPI.reload("data-v-275d9312", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1390 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(922),
  /* template */
  __webpack_require__(1650),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/config/main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-85d36ff8", Component.options)
  } else {
    hotAPI.reload("data-v-85d36ff8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1391 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(923),
  /* template */
  __webpack_require__(1534),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/config/sdkInfoEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] sdkInfoEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0d47a4da", Component.options)
  } else {
    hotAPI.reload("data-v-0d47a4da", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1392 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1185)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(924),
  /* template */
  __webpack_require__(1633),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/dashboard.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] dashboard.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-71e3ae9c", Component.options)
  } else {
    hotAPI.reload("data-v-71e3ae9c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1393 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(925),
  /* template */
  __webpack_require__(1587),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/faq/questionEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] questionEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4031ca44", Component.options)
  } else {
    hotAPI.reload("data-v-4031ca44", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1394 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(926),
  /* template */
  __webpack_require__(1667),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/forum/edit.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] edit.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b2785fec", Component.options)
  } else {
    hotAPI.reload("data-v-b2785fec", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1395 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(927),
  /* template */
  __webpack_require__(1571),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/games/activityInfoEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] activityInfoEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-31f6c28a", Component.options)
  } else {
    hotAPI.reload("data-v-31f6c28a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1396 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(928),
  /* template */
  __webpack_require__(1552),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/games/editNews.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] editNews.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1ef492dd", Component.options)
  } else {
    hotAPI.reload("data-v-1ef492dd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1397 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(929),
  /* template */
  __webpack_require__(1556),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/games/newsInfoEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] newsInfoEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-245dd164", Component.options)
  } else {
    hotAPI.reload("data-v-245dd164", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1398 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(930),
  /* template */
  __webpack_require__(1651),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/games/noticeInfoEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] noticeInfoEditor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8833b6da", Component.options)
  } else {
    hotAPI.reload("data-v-8833b6da", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1399 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1189)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(931),
  /* template */
  __webpack_require__(1669),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/loginCodes/codes.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] codes.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b69123b4", Component.options)
  } else {
    hotAPI.reload("data-v-b69123b4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1400 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(932),
  /* template */
  __webpack_require__(1572),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/loginCodes/myCodes.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] myCodes.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3323b04c", Component.options)
  } else {
    hotAPI.reload("data-v-3323b04c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1401 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(933),
  /* template */
  __webpack_require__(1622),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-66b4628b", Component.options)
  } else {
    hotAPI.reload("data-v-66b4628b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1402 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1174)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(934),
  /* template */
  __webpack_require__(1590),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4306f183",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/mall/editGoods.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] editGoods.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4306f183", Component.options)
  } else {
    hotAPI.reload("data-v-4306f183", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1403 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(935),
  /* template */
  __webpack_require__(1647),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/mall/editMall.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] editMall.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7fcb2577", Component.options)
  } else {
    hotAPI.reload("data-v-7fcb2577", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1404 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1167)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(936),
  /* template */
  __webpack_require__(1539),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-11743333",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/mall/orderInfo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] orderInfo.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-11743333", Component.options)
  } else {
    hotAPI.reload("data-v-11743333", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1405 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(937),
  /* template */
  __webpack_require__(1532),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/operateLog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] operateLog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0b5f3e1c", Component.options)
  } else {
    hotAPI.reload("data-v-0b5f3e1c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1406 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(938),
  /* template */
  __webpack_require__(1594),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/orders.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] orders.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-46f4f992", Component.options)
  } else {
    hotAPI.reload("data-v-46f4f992", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1407 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1166)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(939),
  /* template */
  __webpack_require__(1535),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0db976ff",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/pointMall/editGoods.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] editGoods.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0db976ff", Component.options)
  } else {
    hotAPI.reload("data-v-0db976ff", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1408 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(940),
  /* template */
  __webpack_require__(1542),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/pointMall/pointGoods.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pointGoods.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-16712fa3", Component.options)
  } else {
    hotAPI.reload("data-v-16712fa3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1409 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(941),
  /* template */
  __webpack_require__(1641),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/pointMall/pointLog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pointLog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-775b845e", Component.options)
  } else {
    hotAPI.reload("data-v-775b845e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1410 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(942),
  /* template */
  __webpack_require__(1663),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/pointMall/pointOrder.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pointOrder.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a80b38ca", Component.options)
  } else {
    hotAPI.reload("data-v-a80b38ca", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1411 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(943),
  /* template */
  __webpack_require__(1583),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/pointTask/pointDayQuestion.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pointDayQuestion.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e96cf5e", Component.options)
  } else {
    hotAPI.reload("data-v-3e96cf5e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1412 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(944),
  /* template */
  __webpack_require__(1689),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/pointTask/pointDaySign.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pointDaySign.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e836c496", Component.options)
  } else {
    hotAPI.reload("data-v-e836c496", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1413 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(945),
  /* template */
  __webpack_require__(1595),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/pointTask/pointRoulette.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pointRoulette.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-47c0b7e8", Component.options)
  } else {
    hotAPI.reload("data-v-47c0b7e8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1414 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(946),
  /* template */
  __webpack_require__(1674),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/pointTask/pointSetting.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pointSetting.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-be9e7de8", Component.options)
  } else {
    hotAPI.reload("data-v-be9e7de8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1415 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(947),
  /* template */
  __webpack_require__(1673),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/pointTask/pointTaskbar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pointTaskbar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bd3ddfac", Component.options)
  } else {
    hotAPI.reload("data-v-bd3ddfac", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1416 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(948),
  /* template */
  __webpack_require__(1545),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/setting.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] setting.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-18ddb7ee", Component.options)
  } else {
    hotAPI.reload("data-v-18ddb7ee", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1417 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1178)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(949),
  /* template */
  __webpack_require__(1608),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/stats/statsByDay.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] statsByDay.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-55096528", Component.options)
  } else {
    hotAPI.reload("data-v-55096528", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1418 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1184)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(950),
  /* template */
  __webpack_require__(1627),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/stats/statsDevice.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] statsDevice.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6de5ce03", Component.options)
  } else {
    hotAPI.reload("data-v-6de5ce03", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1419 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1168)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(951),
  /* template */
  __webpack_require__(1541),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/stats/statsRetained.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] statsRetained.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-14c717d1", Component.options)
  } else {
    hotAPI.reload("data-v-14c717d1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1420 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(952),
  /* template */
  __webpack_require__(1630),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/stats/statsTiming.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] statsTiming.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f8585f7", Component.options)
  } else {
    hotAPI.reload("data-v-6f8585f7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1421 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1191)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(953),
  /* template */
  __webpack_require__(1683),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/users.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] users.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d292b5b4", Component.options)
  } else {
    hotAPI.reload("data-v-d292b5b4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1422 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1170)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(954),
  /* template */
  __webpack_require__(1544),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-187748da",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/wechatPub/customMenu.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] customMenu.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-187748da", Component.options)
  } else {
    hotAPI.reload("data-v-187748da", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1423 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(955),
  /* template */
  __webpack_require__(1546),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/wechatPub/messages.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] messages.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-18fcd436", Component.options)
  } else {
    hotAPI.reload("data-v-18fcd436", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1424 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(956),
  /* template */
  __webpack_require__(1596),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/wechatPub/params.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] params.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-49618bf0", Component.options)
  } else {
    hotAPI.reload("data-v-49618bf0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1425 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(957),
  /* template */
  __webpack_require__(1615),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/wechatPub/ruleEdit.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ruleEdit.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-60e41de0", Component.options)
  } else {
    hotAPI.reload("data-v-60e41de0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1426 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(958),
  /* template */
  __webpack_require__(1649),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/wechatPub/rules.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] rules.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-80e41a06", Component.options)
  } else {
    hotAPI.reload("data-v-80e41a06", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1427 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1186)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(959),
  /* template */
  __webpack_require__(1634),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-72195096",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/app/wechatPub/talk.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] talk.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-72195096", Component.options)
  } else {
    hotAPI.reload("data-v-72195096", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1428 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(960),
  /* template */
  __webpack_require__(1563),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-287bcc5d", Component.options)
  } else {
    hotAPI.reload("data-v-287bcc5d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1429 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(961),
  /* template */
  __webpack_require__(1538),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/admin/views/newApp.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] newApp.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1018b405", Component.options)
  } else {
    hotAPI.reload("data-v-1018b405", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1430 */,
/* 1431 */,
/* 1432 */,
/* 1433 */,
/* 1434 */,
/* 1435 */,
/* 1436 */,
/* 1437 */,
/* 1438 */,
/* 1439 */,
/* 1440 */,
/* 1441 */,
/* 1442 */,
/* 1443 */,
/* 1444 */,
/* 1445 */,
/* 1446 */,
/* 1447 */,
/* 1448 */,
/* 1449 */,
/* 1450 */,
/* 1451 */,
/* 1452 */,
/* 1453 */,
/* 1454 */,
/* 1455 */,
/* 1456 */,
/* 1457 */,
/* 1458 */,
/* 1459 */,
/* 1460 */,
/* 1461 */,
/* 1462 */,
/* 1463 */,
/* 1464 */,
/* 1465 */,
/* 1466 */,
/* 1467 */,
/* 1468 */,
/* 1469 */,
/* 1470 */,
/* 1471 */,
/* 1472 */,
/* 1473 */,
/* 1474 */,
/* 1475 */,
/* 1476 */,
/* 1477 */,
/* 1478 */,
/* 1479 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1187)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1016),
  /* template */
  __webpack_require__(1655),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/common/components/fileUpload/dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-90fcaa5c", Component.options)
  } else {
    hotAPI.reload("data-v-90fcaa5c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 1480 */,
/* 1481 */,
/* 1482 */,
/* 1483 */,
/* 1484 */,
/* 1485 */,
/* 1486 */,
/* 1487 */,
/* 1488 */,
/* 1489 */,
/* 1490 */,
/* 1491 */,
/* 1492 */,
/* 1493 */,
/* 1494 */,
/* 1495 */,
/* 1496 */,
/* 1497 */,
/* 1498 */,
/* 1499 */,
/* 1500 */,
/* 1501 */,
/* 1502 */,
/* 1503 */,
/* 1504 */,
/* 1505 */,
/* 1506 */,
/* 1507 */,
/* 1508 */,
/* 1509 */,
/* 1510 */,
/* 1511 */,
/* 1512 */,
/* 1513 */,
/* 1514 */,
/* 1515 */,
/* 1516 */,
/* 1517 */,
/* 1518 */,
/* 1519 */,
/* 1520 */,
/* 1521 */,
/* 1522 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('modal', {
    attrs: {
      "visible": _vm.visible
    }
  }, [_c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "width": "100%",
      "margin-bottom": "10px"
    }
  }, [_c('h5', {
    staticClass: "title is-5"
  }, [_vm._v(_vm._s(_vm.$t('admin.titles.editGoodsInfo', {
    appName: _vm.appName
  })))])]), _vm._v(" "), _c('form', {
    attrs: {
      "name": "goods"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.app.goods.id')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.goods.id),
      expression: "goods.id",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.goods.id)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.goods.id = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.app.goods.name')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.goods.name),
      expression: "goods.name",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.goods.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.goods.name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.app.goods.description')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.goods.description),
      expression: "goods.description",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.goods.description)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.goods.description = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.app.goods.price') + '[' + _vm.$t('admin.currency.' + _vm.currency) + ']') + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.price),
      expression: "price",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "number"
    },
    domProps: {
      "value": (_vm.price)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.price = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.submit')))])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-01cb38f5", module.exports)
  }
}

/***/ }),
/* 1523 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('modal', {
    attrs: {
      "visible": _vm.visible
    }
  }, [_c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "width": "100%",
      "margin-bottom": "10px"
    }
  }, [_c('h5', {
    staticClass: "title is-5"
  }, [_vm._v(_vm._s(_vm.$t('admin.titles.editGoodsProductId', {
    goodsName: _vm.goodsName,
    sdk: _vm.$t('admin.sdks.' + _vm.productIdInfo.sdk)
  })))])]), _vm._v(" "), _c('form', {
    attrs: {
      "name": "productId"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.app.goods.productId', {
    sdk: _vm.productIdInfo.sdk
  })) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.productIdInfo.product_id),
      expression: "productIdInfo.product_id",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.productIdInfo.product_id)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.productIdInfo.product_id = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.submit')))])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-01f7b0b3", module.exports)
  }
}

/***/ }),
/* 1524 */,
/* 1525 */,
/* 1526 */,
/* 1527 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('modal', {
    attrs: {
      "visible": _vm.visible
    }
  }, [_c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "width": "100%",
      "margin-bottom": "10px"
    }
  }, [_c('h5', {
    staticClass: "title is-5"
  }, [_vm._v(_vm._s(_vm.$t('admin.customerService.replyForm.name')))])]), _vm._v(" "), _c('form', {
    attrs: {
      "name": "question"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.customerService.questionField.title')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.question.title),
      expression: "question.title",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "10"
    },
    domProps: {
      "value": (_vm.question.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.question.title = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.customerService.questionField.answer')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.question.answer),
      expression: "question.answer",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "10",
      "placeholder": _vm.$t('admin.customerService.replyForm.replyPlaceholder')
    },
    domProps: {
      "value": (_vm.question.answer)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.question.answer = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('label', {
    staticClass: "checkbox"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.question.active),
      expression: "question.active"
    }],
    staticClass: "checkbox",
    attrs: {
      "type": "checkbox",
      "true-value": true
    },
    domProps: {
      "checked": Array.isArray(_vm.question.active) ? _vm._i(_vm.question.active, null) > -1 : (_vm.question.active)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.question.active,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.question.active = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.question.active = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.question.active = $$c
        }
      }
    }
  }), _vm._v(" " + _vm._s(_vm.$t('admin.customerService.questionField.active')) + "\n        ")])]), _vm._v(" "), _c('div', {
    staticClass: "field"
  }, [_c('p', {
    staticClass: "control"
  }, [_c('label', {
    staticClass: "checkbox"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.question.is_hot),
      expression: "question.is_hot"
    }],
    staticClass: "checkbox",
    attrs: {
      "type": "checkbox",
      "true-value": true
    },
    domProps: {
      "checked": Array.isArray(_vm.question.is_hot) ? _vm._i(_vm.question.is_hot, null) > -1 : (_vm.question.is_hot)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.question.is_hot,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.question.is_hot = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.question.is_hot = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.question.is_hot = $$c
        }
      }
    }
  }), _vm._v(" " + _vm._s(_vm.$t('admin.customerService.questionField.isHot')) + "\n          ")])])]), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.submit')))])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0684a517", module.exports)
  }
}

/***/ }),
/* 1528 */,
/* 1529 */,
/* 1530 */,
/* 1531 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('modal', {
    attrs: {
      "visible": _vm.visible
    }
  }, [(!_vm.searching) ? _c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "width": "100%",
      "margin-bottom": "10px"
    }
  }, [_c('h5', {
    staticClass: "title is-5"
  }, [_vm._v(_vm._s(_vm.section.level == 2 ? _vm.$t('admin.titles.addAppManager') : _vm.$t('admin.titles.addAppCustomerService')))])]), _vm._v(" "), _c('div', {
    staticClass: "control has-icon has-icon-left",
    staticStyle: {
      "margin-bottom": "0.5rem"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.keyword),
      expression: "keyword",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('admin.titles.searchAdminUsers')
    },
    domProps: {
      "value": (_vm.keyword)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.getUsers($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.keyword = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon is-small"
  }, [(_vm.searching) ? _c('i', {
    staticClass: "fa fa-spinner fa-spin"
  }) : _c('i', {
    staticClass: "fa fa-search"
  })])]), _vm._v(" "), _c('form', {
    attrs: {
      "name": "section"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('aside', {
    staticClass: "menu"
  }, [_c('ul', {
    staticClass: "menu-list"
  }, _vm._l((_vm.users), function(item) {
    return _c('li', {
      key: item.id
    }, [_c('a', {
      class: _vm.selectUserId == item.id ? 'is-active' : '',
      on: {
        "click": function($event) {
          _vm.selectUser(item)
        }
      }
    }, [_vm._v(_vm._s(item.nickname))])])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('a', {
    staticClass: "button is-primary is-fullwidth",
    class: {
      'is-loading': _vm.processing
    },
    attrs: {
      "disabled": !this.selectUserId
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('common.add')))])])])]) : _c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "has-text-centered"
  }, [_c('span', {
    staticClass: "icon is-large"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-spin"
  })]), _vm._v(" "), _c('h2', {
    staticClass: "subtitle",
    staticStyle: {
      "margin-top": "20px"
    }
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.loading')) + "\n      ")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0b07059d", module.exports)
  }
}

/***/ }),
/* 1532 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor"
  }, [_c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('div', {
    staticClass: "table-responsive"
  }, [_c('table', {
    staticClass: "table is-bordered is-striped is-narrow goods-table"
  }, [_c('thead', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.logs && _vm.logs.length > 0),
      expression: "logs && logs.length > 0"
    }]
  }, [_c('tr', [_c('th', [_vm._v(_vm._s(_vm.$t('admin.operateLog.id')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.operateLog.user')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.operateLog.type')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.operateLog.log')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.operateLog.adddate')))])])]), _vm._v(" "), _c('tbody', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.logs && _vm.logs.length > 0),
      expression: "logs && logs.length > 0"
    }]
  }, _vm._l((_vm.logs), function(log, index) {
    return _c('tr', [_c('td', [_vm._v(" " + _vm._s(log.id) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(log.user.email) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(log.operate_type) + " ")]), _vm._v(" "), _c('td', {
      staticStyle: {
        "max-width": "400px"
      }
    }, [_vm._v(" " + _vm._s(log.log) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(_vm._f("formatServerDateTime")(log.inserted_at)) + " ")])])
  }))])])]), _vm._v(" "), _c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('pagination', {
    attrs: {
      "page-count": _vm.total,
      "current-page": _vm.page,
      "on-page-change": _vm.onPageChange
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0b5f3e1c", module.exports)
  }
}

/***/ }),
/* 1533 */,
/* 1534 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "box columns is-multiline"
  }, [_vm._l((_vm.app.sdk_bindings), function(sdk) {
    return _c('div', {
      staticClass: "column is-1 has-text-centered",
      staticStyle: {
        "width": "10%"
      }
    }, [_c('div', {
      staticClass: "sdk-icon",
      class: sdk.sdk,
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.editSdkInfo(sdk)
        }
      }
    }), _vm._v(" "), _c('h6', {
      staticClass: "subtitle is-6"
    }, [_vm._v(_vm._s(_vm.$t(("admin.sdks." + (sdk.sdk)))) + " ")])])
  }), _vm._v(" "), _c('div', {
    staticClass: "column is-1 has-text-centered"
  }, [_c('div', {
    staticClass: "add-sdk",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.selectSdkToAdd($event)
      }
    }
  }, [_vm._m(0)]), _vm._v(" "), _c('h6', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('admin.sdks.add')) + " ")])])], 2)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0d47a4da", module.exports)
  }
}

/***/ }),
/* 1535 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "box"
  }, [(_vm.goods) ? _c('form', {
    attrs: {
      "name": "goods"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "tile"
  }, [_c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('article', {
    staticClass: "tile is-child"
  }, [_c('div', {
    staticClass: "field is-horizontal"
  }, [_c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.name')))])]), _vm._v(" "), _c('div', {
    staticClass: "field-body"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.goods.name),
      expression: "goods.name",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "placeholder": _vm.$t('admin.mall.goods.namePlaceholder'),
      "type": "text"
    },
    domProps: {
      "value": (_vm.goods.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.goods.name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "field is-horizontal"
  }, [_c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.id')))])]), _vm._v(" "), _c('div', {
    staticClass: "field-body"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.goods.id),
      expression: "goods.id",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "disabled": !_vm.isNew
    },
    domProps: {
      "value": (_vm.goods.id)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.goods.id = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "field is-horizontal"
  }, [_c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.price')))])]), _vm._v(" "), _c('div', {
    staticClass: "field-body"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.goods.price),
      expression: "goods.price",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "number"
    },
    domProps: {
      "value": (_vm.goods.price)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.goods.price = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "field is-horizontal"
  }, [_c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.stock')))])]), _vm._v(" "), _c('div', {
    staticClass: "field-body"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.goods.stock),
      expression: "goods.stock",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "number"
    },
    domProps: {
      "value": (_vm.goods.stock)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.goods.stock = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "field is-horizontal"
  }, [_c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.is_virtual')))])]), _vm._v(" "), _c('div', {
    staticClass: "field-body"
  }, [_c('label', {
    staticClass: "checkbox"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.goods.is_virtual),
      expression: "goods.is_virtual",
      modifiers: {
        "trim": true
      }
    }],
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.goods.is_virtual) ? _vm._i(_vm.goods.is_virtual, null) > -1 : (_vm.goods.is_virtual)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.goods.is_virtual,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.goods.is_virtual = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.goods.is_virtual = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.goods.is_virtual = $$c
        }
      }
    }
  })])])]), _vm._v(" "), (!_vm.goods.is_virtual) ? _c('div', {
    staticClass: "field is-horizontal"
  }, [_c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.postage')))])]), _vm._v(" "), _c('div', {
    staticClass: "field-body"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.realPostage),
      expression: "realPostage",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "number"
    },
    domProps: {
      "value": (_vm.realPostage)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.realPostage = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "field is-horizontal"
  }, [_c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.time')))])]), _vm._v(" "), _c('div', {
    staticClass: "field-body"
  }, [_vm._v("\n              从 \n              "), _c('el-date-picker', {
    attrs: {
      "editable": false,
      "type": "date",
      "placeholder": _vm.$t('admin.mall.goods.begin_time')
    },
    model: {
      value: (_vm.goods.begin_time),
      callback: function($$v) {
        _vm.goods.begin_time = (typeof $$v === 'string' ? $$v.trim() : $$v)
      },
      expression: "goods.begin_time"
    }
  }), _vm._v(" 到 \n              "), _c('el-date-picker', {
    attrs: {
      "editable": false,
      "type": "date",
      "placeholder": _vm.$t('admin.mall.goods.end_time')
    },
    model: {
      value: (_vm.goods.end_time),
      callback: function($$v) {
        _vm.goods.end_time = (typeof $$v === 'string' ? $$v.trim() : $$v)
      },
      expression: "goods.end_time"
    }
  })], 1)])])]), _vm._v(" "), _c('div', {
    staticClass: "tile is-parent"
  }, [_c('article', {
    staticClass: "tile is-child"
  }, [_c('center', {
    staticStyle: {
      "padding": "0 4rem 0 4rem"
    }
  }, [_c('div', {
    directives: [{
      name: "dragula",
      rawName: "v-dragula",
      value: (_vm.pics),
      expression: "pics"
    }],
    staticClass: "columns is-multiline container2",
    attrs: {
      "bag": _vm.bagId
    }
  }, _vm._l((_vm.pics), function(pic, index) {
    return _c('div', {
      key: pic,
      staticClass: "column is-4"
    }, [_c('figure', {
      staticClass: "image",
      staticStyle: {
        "display": "block"
      },
      on: {
        "click": function($event) {
          _vm.onShowImageUpload(index)
        }
      }
    }, [_c('img', {
      staticStyle: {
        "width": "120px",
        "height": "120px"
      },
      attrs: {
        "src": _vm._f("imageStaticUrl")(pic ? pic : 'https://placehold.it/256x256?text=400X400')
      }
    })])])
  })), _vm._v(" "), _c('p', {
    staticClass: "help"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.picPlaceholder')))])])], 1)])]), _vm._v(" "), _c('div', [_c('label', [_vm._v(" " + _vm._s(_vm.$t('admin.mall.goods.description')) + " ")]), _vm._v(" "), _c('quill-editor', {
    staticStyle: {
      "min-height": "200px"
    },
    attrs: {
      "full-featured": true,
      "placeholder": _vm.$t('admin.mall.goods.descPlaceholder')
    },
    on: {
      "ready": _vm.setEditor,
      "input": function($event) {
        _vm.handleValidation(_vm.$v.goods.description)
      },
      "image": _vm.onInsertImage
    },
    model: {
      value: (_vm.goods.description),
      callback: function($$v) {
        _vm.goods.description = (typeof $$v === 'string' ? $$v.trim() : $$v)
      },
      expression: "goods.description"
    }
  })], 1), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errorHint),
      expression: "errorHint"
    }],
    staticClass: "tile is-full has-text-left",
    staticStyle: {
      "margin-top": "0.5rem"
    }
  }, [_c('span', {
    staticClass: "icon is-sign"
  }, [_vm._v("!")]), _vm._v(" "), _c('span', {
    staticClass: "is-primary",
    staticStyle: {
      "font-size": "1rem"
    }
  }, [_vm._v(_vm._s(_vm.errorHint))])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('a', {
    staticClass: "button is-white",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.onBack($event)
      }
    }
  }, [_vm._m(0), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('common.return')))])]), _vm._v(" "), (!this.isNew) ? _c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.deleting
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.onDelete($event)
      }
    }
  }, [_vm._m(1), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('admin.mall.goods.delete')))])]) : _vm._e(), _vm._v(" "), (!this.isNew) ? _c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.publishing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.onPublish($event)
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa ",
    class: _vm.goods.active == true ? ' fa-level-down' : ' fa-level-up'
  })]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.goods.active == true ? _vm.$t('admin.mall.goods.unPublish') : _vm.$t('admin.mall.goods.publish')))])]) : _vm._e(), _vm._v(" "), _c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.saving
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.onSave($event)
      }
    }
  }, [_vm._m(2), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('admin.mall.goods.save')))])])])]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-backward"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-close"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-save"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0db976ff", module.exports)
  }
}

/***/ }),
/* 1536 */,
/* 1537 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    attrs: {
      "name": "params"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "columns is-multiline"
  }, [_c('div', {
    staticClass: "column is-8"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.verifyFile')) + ":\n        "), _c('tooltip', {
    attrs: {
      "label": "",
      "placement": "top"
    }
  }, [_c('span', {
    staticClass: "icon is-sign",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.showTip(0)
      }
    }
  }, [_vm._v("?")])])], 1), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('a', {
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.updateFile(_vm.wcpParams)
      }
    }
  }, [_vm._v(" " + _vm._s(_vm.wcpParams.verify_File ? _vm.wcpParams.verify_File : "点击上传") + " ")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.appId')) + ": "), _c('span', {
    staticClass: "icon is-sign",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.showTip(1)
      }
    }
  }, [_vm._v("?")])]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.wcp_app_id),
      expression: "wcpParams.wcp_app_id",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.wcpParams.wcp_app_id)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.wcp_app_id = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.appKey')) + ": "), _c('span', {
    staticClass: "icon is-sign",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.showTip(1)
      }
    }
  }, [_vm._v("?")])]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.wcp_app_key),
      expression: "wcpParams.wcp_app_key",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.wcpParams.wcp_app_key)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.wcp_app_key = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.serverHost')) + ": "), _c('span', {
    staticClass: "icon is-sign",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.showTip(2)
      }
    }
  }, [_vm._v("?")])]), _vm._v(" "), _c('div', {
    staticClass: "field has-addons"
  }, [_c('p', {
    staticClass: "control flex-take-rest"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.serverHost),
      expression: "serverHost",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input disabled",
    attrs: {
      "disabled": "",
      "type": "text"
    },
    domProps: {
      "value": (_vm.serverHost)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.serverHost = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "control flex-fixed-size"
  }, [_c('a', {
    directives: [{
      name: "clipboard",
      rawName: "v-clipboard:copy",
      value: (_vm.serverHost),
      expression: "serverHost",
      arg: "copy"
    }, {
      name: "clipboard",
      rawName: "v-clipboard:success",
      value: (_vm.toastClipboardSuccess),
      expression: "toastClipboardSuccess",
      arg: "success"
    }],
    staticClass: "button",
    staticStyle: {
      "margin": "2px"
    }
  }, [_vm._m(0), _vm._v(" "), _c('span', [_vm._v(" " + _vm._s(_vm.$t('admin.copy')) + " ")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.token')) + ": "), _c('span', {
    staticClass: "icon is-sign",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.showTip(2)
      }
    }
  }, [_vm._v("?")])]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.token),
      expression: "wcpParams.token",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.wcpParams.token)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.token = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.aesKey')) + ": "), _c('span', {
    staticClass: "icon is-sign",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.showTip(2)
      }
    }
  }, [_vm._v("?")])]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.aes_key),
      expression: "wcpParams.aes_key",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.wcpParams.aes_key)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.aes_key = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8 has-text-centered"
  }, [_c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.submit')))])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-clipboard"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0f9719e4", module.exports)
  }
}

/***/ }),
/* 1538 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "box"
  }, [(_vm.app) ? _c('basic-info-editor', {
    attrs: {
      "app": _vm.app
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1018b405", module.exports)
  }
}

/***/ }),
/* 1539 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.orderInfo) ? _c('div', {
    staticClass: "box tile is-ancestor"
  }, [_c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('div', {
    staticClass: "tile is-child"
  }, [_c('h6', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.order.fields.id')) + ":" + _vm._s(_vm.orderInfo.id))]), _vm._v(" "), _c('h6', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.order.fields.status')) + ": " + _vm._s(_vm.$t('admin.mall.order.status.' + _vm.orderInfo.status)))]), _vm._v(" "), _c('h6', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.order.fields.inserted_at')) + ":" + _vm._s(_vm._f("formatServerDateTime")(_vm.orderInfo.inserted_at)))]), _vm._v(" "), _c('h6', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.order.fields.email')) + ":" + _vm._s(_vm.orderInfo.user.email))])]), _vm._v(" "), _c('div', {
    staticClass: "tile is-child"
  }, [_c('h6', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.order.fields.address.name')) + ":" + _vm._s(_vm.orderInfo.address.name))]), _vm._v(" "), _c('h6', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.order.fields.address.mobile')) + ":" + _vm._s(_vm.orderInfo.address.mobile))]), _vm._v(" "), _c('h6', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.order.fields.address.address')) + ":" + _vm._s(_vm.orderInfo.address.area) + _vm._s(_vm.orderInfo.address.address))])]), _vm._v(" "), _c('div', {
    staticClass: "title is-child"
  }, [_c('div', {
    staticClass: "box columns",
    staticStyle: {
      "margin": "0",
      "padding": ".5rem"
    }
  }, _vm._l((_vm.orderInfo.details), function(detail) {
    return _c('div', {
      staticClass: "cloumn"
    }, [_c('div', {
      staticClass: "media",
      staticStyle: {
        "margin-right": "1rem"
      }
    }, [_c('figure', {
      staticClass: "media-left"
    }, [_c('p', {
      staticClass: "image is-64x64"
    }, [_c('img', {
      staticStyle: {
        "width": "64px",
        "height": "64px"
      },
      attrs: {
        "src": detail.goods_pic
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "media-content"
    }, [_c('h6', {
      staticClass: "subtitle is-6"
    }, [_vm._v(_vm._s(detail.goods_name))]), _vm._v(" "), _c('h6', {
      staticClass: "subtitle is-6",
      class: ['currency', _vm.orderInfo.currency]
    }, [_vm._v(_vm._s(_vm._f("formatPrice")(detail.price)))]), _vm._v(" "), _c('h6', {
      staticClass: "subtitle is-6"
    }, [_vm._v(" X" + _vm._s(detail.amount) + " ")])])])])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "tile is-child"
  }, [_c('h6', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.order.fields.postage')) + ":"), _c('span', {
    class: ['currency', _vm.orderInfo.currency]
  }, [_vm._v(_vm._s(_vm._f("formatPrice")(_vm.orderInfo.postage)))])]), _vm._v(" "), _c('h6', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.order.fields.total')) + ":"), _c('span', {
    class: ['currency', _vm.orderInfo.currency]
  }, [_vm._v(_vm._s(_vm._f("formatPrice")(_vm.orderInfo.price)))])]), _vm._v(" "), _c('span', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.order.fields.paid_type.label')) + ":" + _vm._s(_vm.$t('admin.mall.order.fields.paid_type.' + _vm.orderInfo.paid_type)))]), _vm._v(" "), _c('span', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.order.fields.transaction_id')) + ":" + _vm._s(_vm.orderInfo.transaction_id))])]), _vm._v(" "), (_vm.orderInfo.status == 0 || _vm.orderInfo.status == -1) ? _c('div', {
    staticClass: "tile is-child"
  }, [_c('div', {
    staticClass: "field is-grouped"
  }, [_c('h6', {
    staticStyle: {
      "align-self": "center"
    }
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.mall.order.fields.transaction_id')) + "： ")]), _vm._v(" "), _c('p', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.orderInfo.transaction_id),
      expression: "orderInfo.transaction_id",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.orderInfo.transaction_id)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.orderInfo.transaction_id = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button is-info",
    attrs: {
      "disabled": !_vm.orderInfo.transaction_id
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.updateOrderPayed($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.order.buttons.payed')))])])])]) : _vm._e(), _vm._v(" "), (_vm.orderInfo.status == 2) ? _c('div', {
    staticClass: "tile is-child"
  }, [_c('div', {
    staticClass: "field is-grouped"
  }, [_c('h6', {
    staticStyle: {
      "align-self": "center"
    }
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.mall.order.fields.refundMoney')) + "： ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.refundMoney),
      expression: "refundMoney",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    staticStyle: {
      "width": "100px"
    },
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.refundMoney)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.refundMoney = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button is-info",
    attrs: {
      "disabled": !_vm.refundMoney
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.refundOrder($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.order.buttons.refund')))])])])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "tile is-child"
  }, [_c('a', {
    staticClass: "button is-white",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.onBack($event)
      }
    }
  }, [_vm._m(0), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('common.return')))])])])]), _vm._v(" "), _c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('h6', {
    staticClass: "subtitle is-6"
  }, [_vm._v("历史记录:")]), _vm._v(" "), _vm._l((_vm.orderInfo.op_logs), function(op) {
    return _c('div', {
      staticClass: "box",
      staticStyle: {
        "width": "400px"
      }
    }, [_c('h6', {
      staticClass: "subtitle is-6"
    }, [_vm._v(_vm._s(_vm.$t('admin.mall.op_logs.inserted_at')) + ":" + _vm._s(_vm._f("formatServerDateTime")(op.inserted_at)))]), _vm._v(" "), _c('h6', {
      staticClass: "subtitle is-6"
    }, [_vm._v(_vm._s(_vm.$t('admin.mall.op_logs.op_user')) + ":" + _vm._s(_vm.getOpUser(_vm.orderInfo.user.email, op.admin_user)))]), _vm._v(" "), _c('h6', {
      staticClass: "subtitle is-6"
    }, [_vm._v(_vm._s(_vm.$t('admin.mall.op_logs.content')) + ":\n        " + _vm._s(_vm.$t('admin.mall.order.status.' + op.status)) + "\n        " + _vm._s(_vm.$t('admin.mall.op_logs.change_to')) + "\n        " + _vm._s(_vm.$t('admin.mall.order.status.' + op.changed_status)))]), _vm._v(" "), (op.content && op.content.transaction_id) ? _c('h6', {
      staticClass: "subtitle is-6"
    }, [_vm._v(_vm._s(_vm.$t('admin.mall.op_logs.transaction_id')) + ":" + _vm._s(op.content.transaction_id))]) : _vm._e(), _vm._v(" "), (op.content && op.content.refundMoney) ? _c('h6', {
      staticClass: "subtitle is-6"
    }, [_vm._v(_vm._s(_vm.$t('admin.mall.op_logs.refundMoney')) + ":" + _vm._s(op.content.refundMoney))]) : _vm._e()])
  })], 2)]) : _vm._e()
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-backward"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-11743333", module.exports)
  }
}

/***/ }),
/* 1540 */,
/* 1541 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: " mod-body"
  }, [_c('div', {
    staticClass: "toolbar",
    staticStyle: {
      "margin-bottom": "1rem"
    }
  }, [_c('el-radio-group', {
    on: {
      "change": _vm.changePlatform
    },
    model: {
      value: (_vm.platform),
      callback: function($$v) {
        _vm.platform = $$v
      },
      expression: "platform"
    }
  }, [_c('el-radio-button', {
    attrs: {
      "label": "all"
    }
  }, [_vm._v("全部")]), _vm._v(" "), _c('el-radio-button', {
    attrs: {
      "label": "ios"
    }
  }, [_vm._v("iOS")]), _vm._v(" "), _c('el-radio-button', {
    attrs: {
      "label": "android"
    }
  }, [_vm._v("Android")])], 1), _vm._v(" "), _c('span', {
    staticStyle: {
      "margin-right": "15px"
    }
  }), _vm._v(" "), _c('el-radio-group', {
    on: {
      "change": _vm.changeDateType
    },
    model: {
      value: (_vm.dateType),
      callback: function($$v) {
        _vm.dateType = $$v
      },
      expression: "dateType"
    }
  }, [_c('el-radio-button', {
    attrs: {
      "label": "week"
    }
  }, [_vm._v("最近一周")]), _vm._v(" "), _c('el-radio-button', {
    attrs: {
      "label": "month"
    }
  }, [_vm._v("最近一月")]), _vm._v(" "), _c('el-radio-button', {
    attrs: {
      "label": "custom"
    }
  }, [_vm._v("自定义")])], 1), _vm._v(" "), _c('span', {
    staticStyle: {
      "margin-right": "15px"
    }
  }), _vm._v(" "), _c('el-date-picker', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.dateType == 'custom'),
      expression: "dateType == 'custom'"
    }],
    ref: "datePicker",
    attrs: {
      "type": "daterange",
      "placeholder": "选择日期范围",
      "picker-options": _vm.pickerOptions
    },
    on: {
      "change": _vm.changeDateRange
    },
    model: {
      value: (_vm.dateRange),
      callback: function($$v) {
        _vm.dateRange = $$v
      },
      expression: "dateRange"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "box card is-paddingless"
  }, [_vm._m(0), _vm._v(" "), _c('table', {
    staticClass: "retention  data-load",
    attrs: {
      "id": "retention-table",
      "width": "100%",
      "border": "0",
      "cellspacing": "0"
    }
  }, [_vm._m(1), _vm._v(" "), _c('tbody', {
    attrs: {
      "id": "data-list"
    }
  }, _vm._l((_vm.reports), function(report) {
    return _c('tr', [_c('td', [_vm._v(_vm._s(report.date))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(report.danu))]), _vm._v(" "), _c('retention-row', {
      attrs: {
        "value": _vm.calcRate(report, 1)
      }
    }), _vm._v(" "), _c('retention-row', {
      attrs: {
        "value": _vm.calcRate(report, 2)
      }
    }), _vm._v(" "), _c('retention-row', {
      attrs: {
        "value": _vm.calcRate(report, 3)
      }
    }), _vm._v(" "), _c('retention-row', {
      attrs: {
        "value": _vm.calcRate(report, 4)
      }
    }), _vm._v(" "), _c('retention-row', {
      attrs: {
        "value": _vm.calcRate(report, 5)
      }
    }), _vm._v(" "), _c('retention-row', {
      attrs: {
        "value": _vm.calcRate(report, 6)
      }
    }), _vm._v(" "), _c('retention-row', {
      attrs: {
        "value": _vm.calcRate(report, 7)
      }
    }), _vm._v(" "), _c('retention-row', {
      attrs: {
        "value": _vm.calcRate(report, 14)
      }
    }), _vm._v(" "), _c('retention-row', {
      attrs: {
        "value": _vm.calcRate(report, 30)
      }
    })], 1)
  }))])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "card-header"
  }, [_c('p', {
    staticClass: "card-header-title"
  }, [_vm._v("留存明细\n      ")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', {
    staticStyle: {
      "width": "150px"
    }
  }, [_vm._v("首次使用时间")]), _vm._v(" "), _c('th', {
    staticStyle: {
      "width": "100px"
    }
  }, [_vm._v("新增用户")]), _vm._v(" "), _c('th', {
    attrs: {
      "colspan": "9"
    }
  }, [_vm._v("留存率")])]), _vm._v(" "), _c('tr', {
    staticClass: "after_period_indicator",
    staticStyle: {
      "display": "table-row"
    },
    attrs: {
      "id": "daily_after_period"
    }
  }, [_c('th', {
    attrs: {
      "colspan": "2"
    }
  }), _vm._v(" "), _c('th', [_vm._v(" 1日留存 ")]), _vm._v(" "), _c('th', [_vm._v(" 2日留存 ")]), _vm._v(" "), _c('th', [_vm._v(" 3日留存 ")]), _vm._v(" "), _c('th', [_vm._v(" 4日留存 ")]), _vm._v(" "), _c('th', [_vm._v(" 5日留存 ")]), _vm._v(" "), _c('th', [_vm._v(" 6日留存")]), _vm._v(" "), _c('th', [_vm._v(" 7日留存")]), _vm._v(" "), _c('th', [_vm._v(" 14日留存 ")]), _vm._v(" "), _c('th', [_vm._v(" 30日留存 ")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-14c717d1", module.exports)
  }
}

/***/ }),
/* 1542 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "control has-icon has-icon-left"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.keyword),
      expression: "keyword"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('admin.titles.searchGoods')
    },
    domProps: {
      "value": (_vm.keyword)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.onSearchBoxSubmit($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.keyword = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon is-small"
  }, [(_vm.searching) ? _c('i', {
    staticClass: "fa fa-spinner fa-spin"
  }) : _c('i', {
    staticClass: "fa fa-search"
  })])]), _vm._v(" "), _c('router-link', {
    staticClass: "button is-primary pull-right",
    attrs: {
      "to": {
        name: 'EditPointGoods',
        params: {
          goodsId: ''
        }
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small",
    staticStyle: {
      "margin-right": "5px"
    }
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]), _vm._v(_vm._s(_vm.$t('admin.mall.goods.add')) + "\n  ")]), _vm._v(" "), (_vm.goodses.length > 0) ? _c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('div', {
    staticClass: "columns is-multiline"
  }, _vm._l((_vm.goodses), function(goods, index) {
    return _c('div', {
      staticClass: "column is-half"
    }, [_c('div', {
      staticClass: "columns"
    }, [_c('div', {
      staticClass: "column is-parent is-one-third"
    }, [_c('figure', {
      staticClass: "image",
      staticStyle: {
        "display": "block"
      }
    }, [(goods.pic) ? _c('img', {
      staticStyle: {
        "width": "120px",
        "height": "120px"
      },
      attrs: {
        "src": goods.pic.split('|')[0] ? goods.pic.split('|')[0] : 'https://placehold.it/256x256?text=未上传'
      }
    }) : _c('img', {
      staticStyle: {
        "width": "120px",
        "height": "120px"
      },
      attrs: {
        "src": "https://placehold.it/256x256?text=未上传"
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "column is-parent is-vertical"
    }, [_c('article', {
      staticClass: "tile is-child"
    }, [_c('p', {
      staticClass: "subtitle is-6"
    }, [_vm._v(_vm._s(goods.name))]), _vm._v(" "), _c('p', {
      staticClass: "subtitle is-6"
    }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.priceList', {
      price: _vm.getPrice(goods.price),
      postage: _vm.getPrice(goods.postage)
    })) + "\n              ")]), _vm._v(" "), _c('p', {
      staticClass: "subtitle is-6"
    }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.stockList', {
      stock: goods.stock,
      sold: goods.sold
    })))]), _vm._v(" "), _c('p', {
      staticClass: "field"
    }, [(goods.active == true) ? _c('span', {
      staticClass: "tag is-primary"
    }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.up')) + " ")]) : _c('span', {
      staticClass: "tag is-dark"
    }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.down')))]), _vm._v(" "), _c('a', {
      staticClass: "button is-small",
      on: {
        "click": function($event) {
          _vm.onEdit(goods.id)
        }
      }
    }, [_vm._m(0, true), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('admin.mall.goods.edit')))])]), _vm._v(" "), _c('a', {
      staticClass: "button is-small",
      on: {
        "click": function($event) {
          _vm.onDelete(goods, index)
        }
      }
    }, [_vm._m(1, true), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('admin.mall.goods.delete')))])])])])])])])
  })), _vm._v(" "), _c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('pagination', {
    attrs: {
      "page-count": _vm.total,
      "current-page": _vm.page,
      "on-page-change": _vm.onPageChange
    }
  })], 1)]) : _c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "hero-body has-text-centered"
  }, [(_vm.loading) ? _c('div', {
    staticClass: "container"
  }, [_c('span', {
    staticClass: "icon is-large"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-spin"
  })]), _vm._v(" "), _c('h2', {
    staticClass: "subtitle",
    staticStyle: {
      "margin-top": "20px"
    }
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.loading')) + "\n        ")])]) : _c('div', {
    staticClass: "container"
  }, [_c('h1', {
    staticClass: "title"
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.oops')) + "\n        ")]), _vm._v(" "), _c('h2', {
    staticClass: "subtitle"
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.noGoodsToDisplay')) + "\n        ")])])])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-pencil"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-close"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-16712fa3", module.exports)
  }
}

/***/ }),
/* 1543 */,
/* 1544 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "columns is-multiline"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "column is-7",
    staticStyle: {
      "padding": "10px"
    }
  }, [_c('div', {
    staticClass: "columns is-multiline",
    staticStyle: {
      "border": "1px #ccc solid",
      "margin": "3px"
    }
  }, [_c('div', {
    staticClass: "column is-3"
  }), _vm._v(" "), _vm._m(1), _vm._v(" "), _vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [(_vm.wcpParams.menu) ? _c('div', {
    staticClass: "columns is-multiline"
  }, [_c('div', {
    directives: [{
      name: "dragula",
      rawName: "v-dragula",
      value: (_vm.wcpParams.menu.button[0].sub_button),
      expression: "wcpParams.menu.button[0].sub_button"
    }],
    staticClass: "column is-one-third",
    attrs: {
      "bag": "column0"
    }
  }, [_vm._l((_vm.wcpParams.menu.button[0].sub_button), function(button, index) {
    return _c('div', {
      key: button.name,
      staticClass: "column"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: (button.name),
        expression: "button.name",
        modifiers: {
          "trim": true
        }
      }],
      staticClass: "input",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": (button.name)
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.setCurrentButton(button)
        },
        "input": function($event) {
          if ($event.target.composing) { return; }
          button.name = $event.target.value.trim()
        },
        "blur": function($event) {
          _vm.$forceUpdate()
        }
      }
    })])
  }), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_c('p', {
    staticClass: "control has-icons-left"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.menu.button[0].name),
      expression: "wcpParams.menu.button[0].name",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.wcpParams.menu.button[0].name)
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.setCurrentButton(_vm.wcpParams.menu.button[0])
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.menu.button[0].name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _vm._m(3)])])], 2), _vm._v(" "), _c('div', {
    directives: [{
      name: "dragula",
      rawName: "v-dragula",
      value: (_vm.wcpParams.menu.button[1].sub_button),
      expression: "wcpParams.menu.button[1].sub_button"
    }],
    staticClass: "column is-one-third",
    attrs: {
      "bag": "column1"
    }
  }, [_vm._l((_vm.wcpParams.menu.button[1].sub_button), function(button, index) {
    return _c('div', {
      key: button.name,
      staticClass: "column"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: (button.name),
        expression: "button.name",
        modifiers: {
          "trim": true
        }
      }],
      staticClass: "input",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": (button.name)
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.setCurrentButton(button)
        },
        "input": function($event) {
          if ($event.target.composing) { return; }
          button.name = $event.target.value.trim()
        },
        "blur": function($event) {
          _vm.$forceUpdate()
        }
      }
    })])
  }), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_c('p', {
    staticClass: "control has-icons-left"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.menu.button[1].name),
      expression: "wcpParams.menu.button[1].name",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.wcpParams.menu.button[1].name)
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.setCurrentButton(_vm.wcpParams.menu.button[1])
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.menu.button[1].name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _vm._m(4)])])], 2), _vm._v(" "), _c('div', {
    directives: [{
      name: "dragula",
      rawName: "v-dragula",
      value: (_vm.wcpParams.menu.button[2].sub_button),
      expression: "wcpParams.menu.button[2].sub_button"
    }],
    staticClass: "column is-one-third",
    attrs: {
      "bag": "column2"
    }
  }, [_vm._l((_vm.wcpParams.menu.button[2].sub_button), function(button, index) {
    return _c('div', {
      key: button.name,
      staticClass: "column"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: (button.name),
        expression: "button.name",
        modifiers: {
          "trim": true
        }
      }],
      staticClass: "input",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": (button.name)
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.setCurrentButton(button)
        },
        "input": function($event) {
          if ($event.target.composing) { return; }
          button.name = $event.target.value.trim()
        },
        "blur": function($event) {
          _vm.$forceUpdate()
        }
      }
    })])
  }), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_c('p', {
    staticClass: "control has-icons-left"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.menu.button[2].name),
      expression: "wcpParams.menu.button[2].name",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.wcpParams.menu.button[2].name)
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.setCurrentButton(_vm.wcpParams.menu.button[2])
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.menu.button[2].name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _vm._m(5)])])], 2)]) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-5"
  }, [_c('div', {
    staticClass: "field has-addons"
  }, [_c('label', {
    staticStyle: {
      "font-weight": "bold"
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.wcp.menus.params')))])]), _vm._v(" "), _c('div', {
    staticClass: "field has-addons"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.wcp.menus.name')) + "：")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.selectedButton.name),
      expression: "selectedButton.name",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input is-small",
    staticStyle: {
      "width": "200px"
    },
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.selectedButton.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.selectedButton.name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "field has-addons"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.wcp.menus.type')) + "：")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('span', {
    staticClass: "select is-media"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.selectedButton.type),
      expression: "selectedButton.type"
    }],
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.selectedButton.type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.options), function(option) {
    return _c('option', {
      key: option.value,
      domProps: {
        "value": option.value
      }
    }, [_vm._v("\n              " + _vm._s(option.text) + "\n            ")])
  }))])])]), _vm._v(" "), (_vm.selectedButton.type == 'click') ? _c('div', {
    staticClass: "field has-addons"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.wcp.menus.key')) + "：")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.selectedButton.key),
      expression: "selectedButton.key",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input is-small",
    staticStyle: {
      "width": "200px"
    },
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.selectedButton.key)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.selectedButton.key = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]) : _vm._e(), _vm._v(" "), (_vm.selectedButton.type == 'view') ? _c('div', {
    staticClass: "field has-addons"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.wcp.menus.url')) + "：")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.selectedButton.url),
      expression: "selectedButton.url",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input is-small",
    staticStyle: {
      "width": "200px"
    },
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.selectedButton.url)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.selectedButton.url = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]) : _vm._e(), _vm._v(" "), _c('label', {
    staticStyle: {
      "font-size": "10pt"
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.wcp.menus.tip')))]), _vm._v(" "), _c('br'), _vm._v(" "), _c('label', {
    staticStyle: {
      "font-size": "10pt"
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.wcp.menus.tip2')))])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12 has-text-centered"
  }, [_c('p', {
    staticStyle: {
      "margin": "5px auto"
    }
  }, [_c('input', {
    staticClass: "button is-primary",
    class: _vm.loading ? 'is-disabled' : '',
    staticStyle: {
      "display": "inline-block",
      "font-size": "1rem"
    },
    attrs: {
      "type": "button",
      "value": _vm.$t('admin.wcp.btnGetMenu')
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.getMenu()
      }
    }
  }), _vm._v(" "), _c('input', {
    staticClass: "button is-primary",
    class: _vm.loading ? 'is-disabled' : '',
    staticStyle: {
      "display": "inline-block",
      "font-size": "1rem"
    },
    attrs: {
      "type": "button",
      "value": _vm.$t('admin.wcp.btnUpdateMenu')
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.updateMenu()
      }
    }
  })])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "column is-12",
    staticStyle: {
      "padding": "10px"
    }
  }, [_c('h2', {
    staticStyle: {
      "font-weight": "bold"
    }
  }, [_vm._v("使用说明及规则，请仔细阅读")]), _vm._v(" "), _c('ul', {
    staticStyle: {
      "list-style": "circle",
      "padding": "10px 0 10px 20px",
      "font-size": "11pt"
    }
  }, [_c('li', [_vm._v("官方要求：一级菜单按钮个数为2-3个")]), _vm._v(" "), _c('li', [_vm._v("官方要求：如果设置了二级菜单，子按钮个数为2-5个")]), _vm._v(" "), _c('li', [_vm._v("官方要求：按钮描述，既按钮名字，不超过16个字节，子菜单不超过40个字节")]), _vm._v(" "), _c('li', [_vm._v("如果name不填，此按钮将被忽略")]), _vm._v(" "), _c('li', [_vm._v("如果一级菜单为空，该列所有设置的二级菜单都会被忽略")]), _vm._v(" "), _c('li', [_vm._v("key仅在SingleButton（单击按钮，无下级菜单）的状态下设置，如果此按钮有下级菜单，key将被忽略")]), _vm._v(" "), _c('li', [_vm._v("所有二级菜单都为SingleButton")]), _vm._v(" "), _c('li', [_vm._v("如果要快速看到微信上的菜单最新状态，需要"), _c('strong', {
    staticStyle: {
      "color": "red"
    }
  }, [_vm._v("重新关注")]), _vm._v("，否则需要静静等待N小时")]), _vm._v(" "), _c('li', [_vm._v("菜单项为点击事件，并且菜单key为"), _c('strong', {
    staticStyle: {
      "color": "red"
    }
  }, [_vm._v("assign_login_code")]), _vm._v("时，点击该菜单事件触发激活码回复")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "column is-9"
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column"
  }, [_vm._v("第一列")]), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_vm._v("第二列")]), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_vm._v("第三列")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "column is-2",
    staticStyle: {
      "font-size": "10pt",
      "line-height": "450%"
    }
  }, [_c('ul', [_c('li', [_vm._v(" ")]), _vm._v(" "), _c('li', [_vm._v(" ")]), _vm._v(" "), _c('li', [_vm._v("二级菜单")]), _vm._v(" "), _c('li', [_vm._v(" ")]), _vm._v(" "), _c('li', [_vm._v(" ")]), _vm._v(" "), _c('li', [_vm._v("一级菜单")])])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small is-left"
  }, [_c('i', {
    staticClass: "fa fa-reorder"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small is-left"
  }, [_c('i', {
    staticClass: "fa fa-reorder"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small is-left"
  }, [_c('i', {
    staticClass: "fa fa-reorder"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-187748da", module.exports)
  }
}

/***/ }),
/* 1545 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('tabs', {
    attrs: {
      "type": "boxed",
      "layout": "top",
      "alignment": "left",
      "size": "normal",
      "only-fade": false
    }
  }, [_c('tab-pane', {
    attrs: {
      "icon": "fa fa-user-circle",
      "label": _vm.$t('admin.menu.adminUserManage')
    }
  }, [_c('admin-users')], 1), _vm._v(" "), _c('tab-pane', {
    attrs: {
      "icon": "fa fa-calendar-check-o",
      "label": _vm.$t('admin.setting.operateLog')
    }
  }, [_c('operate-log')], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-18ddb7ee", module.exports)
  }
}

/***/ }),
/* 1546 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "control has-icon has-icon-left"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.keyword),
      expression: "keyword"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('admin.wcp.searchTip')
    },
    domProps: {
      "value": (_vm.keyword)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.onSearchBoxSubmit($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.keyword = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon is-small"
  }, [(_vm.loading) ? _c('i', {
    staticClass: "fa fa-spinner fa-spin"
  }) : _c('i', {
    staticClass: "fa fa-search"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "tile is-ancestor "
  }, [_c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('el-table', {
    ref: "tbl",
    staticClass: "tile is-child box is-paddingless",
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "stripe": "",
      "data": _vm.messages,
      "border": "",
      "default-sort": {
        prop: 'inserted_at',
        order: 'descending'
      }
    },
    on: {
      "row-dblclick": _vm.rowClick,
      "sort-change": _vm.sortChange
    }
  }, [_c('el-table-column', {
    attrs: {
      "label": _vm.$t('admin.wcp.msgFrom'),
      "width": "180"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._v("\n            " + _vm._s(scope.row.from && scope.row.from.nickname ? scope.row.from.nickname : "") + "\n          ")]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": _vm.$t('admin.wcp.msgTo'),
      "width": "180"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._v("\n            " + _vm._s(scope.row.to && scope.row.to.nickname ? scope.row.to.nickname : "") + "\n          ")]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": _vm.$t('admin.wcp.msgContent'),
      "width": "400"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('div', {
          staticStyle: {
            "overflow": "hidden",
            "text-overflow": "ellipsis",
            "white-space": "nowrap"
          }
        }, [_vm._v(" " + _vm._s(scope.row.content) + " ")])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "total_mem_size",
      "label": _vm.$t('admin.wcp.msgType'),
      "width": "120"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._v("\n            " + _vm._s(scope.row.msg_type) + "\n          ")]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": _vm.$t('admin.wcp.msgTime'),
      "prop": "inserted_at",
      "sortable": "custom",
      "width": "180"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._v("\n            " + _vm._s(_vm._f("formatServerDateTime")(scope.row.inserted_at)) + "\n          ")]
      }
    }])
  }), _vm._v(" "), _c('el-table-column')], 1), _vm._v(" "), (_vm.messages && _vm.messages.length > 0) ? _c('div', {
    staticClass: "tile is-child  ele-pagination"
  }, [_c('el-pagination', {
    attrs: {
      "layout": "prev, pager, next",
      "page-count": _vm.total,
      "current-page": _vm.page
    },
    on: {
      "update:currentPage": function($event) {
        _vm.page = $event
      },
      "current-change": _vm.onPageChange
    }
  })], 1) : _vm._e()], 1)]), _vm._v(" "), _c('talk', {
    ref: "talk",
    on: {
      "close": function($event) {
        _vm.showTalkModal = false
      }
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-18fcd436", module.exports)
  }
}

/***/ }),
/* 1547 */,
/* 1548 */,
/* 1549 */,
/* 1550 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    attrs: {
      "name": "basicInfo"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "columns is-multiline"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.mall.id')) + ": " + _vm._s(_vm.mall.id) + " ")])]), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.mall.created_at')) + ": " + _vm._s(_vm._f("formatServerDateTime")(_vm.mall.inserted_at)) + " ")])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.mall.appId')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.mall.app_id),
      expression: "mall.app_id",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input is-disabled",
    attrs: {
      "disabled": "",
      "type": "text"
    },
    domProps: {
      "value": (_vm.mall.app_id)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.mall.app_id = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.mall.title')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.mall.title),
      expression: "mall.title",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.mall.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.mall.title = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('p', {
    staticClass: "control"
  }, [_c('label', {
    staticClass: "checkbox"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.mall.active),
      expression: "mall.active",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "checkbox",
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.mall.active) ? _vm._i(_vm.mall.active, null) > -1 : (_vm.mall.active)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.mall.active,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.mall.active = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.mall.active = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.mall.active = $$c
        }
      }
    }
  }), _vm._v(" " + _vm._s(_vm.$t('admin.mall.active')) + "\n        ")])])])]), _vm._v(" "), _c('div', {
    staticClass: "container has-text-centered",
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.submit')))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1cd26058", module.exports)
  }
}

/***/ }),
/* 1551 */,
/* 1552 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "box"
  }, [(_vm.news) ? _c('form', {
    attrs: {
      "name": "news"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.news.title')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.news.title),
      expression: "news.title",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.news.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.news.title = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.news.content')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('quill-editor', {
    staticStyle: {
      "min-height": "200px"
    },
    attrs: {
      "full-featured": true
    },
    on: {
      "ready": _vm.setEditor,
      "input": function($event) {
        _vm.handleValidation(_vm.$v.news.content)
      },
      "image": _vm.onInsertImage
    },
    model: {
      value: (_vm.news.content),
      callback: function($$v) {
        _vm.news.content = (typeof $$v === 'string' ? $$v.trim() : $$v)
      },
      expression: "news.content"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('a', {
    staticClass: "button is-white",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.onBack($event)
      }
    }
  }, [_vm._m(0), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('common.return')))])]), _vm._v(" "), _c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.onSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.submit')))])])]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-backward"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1ef492dd", module.exports)
  }
}

/***/ }),
/* 1553 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor"
  }, [_c('div', {
    staticClass: "tile is-parent"
  }, [_c('article', {
    staticClass: "tile is-child"
  }, [(_vm.app) ? _c('div', {
    staticClass: "table-responsive"
  }, [_c('table', {
    staticClass: "table is-bordered is-striped is-narrow goods-table"
  }, [_c('thead', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.app.goods && _vm.app.goods.length > 0),
      expression: "app.goods && app.goods.length > 0"
    }]
  }, [_c('tr', [_c('th', [_vm._v(_vm._s(_vm.$t('admin.app.goods.icon')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.app.goods.id')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.app.goods.name')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.app.goods.description')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.app.goods.price') + '(' + _vm.$t('admin.currency.' + _vm.app.currency) + ')'))]), _vm._v(" "), _c('th', {
    attrs: {
      "colspan": _vm.sdks.length
    }
  }, [_vm._v("\n                " + _vm._s(_vm.$t('admin.app.goods.productIds')) + "\n              ")]), _vm._v(" "), _c('th')])]), _vm._v(" "), _c('tfoot', [_c('tr', [_c('th', {
    staticStyle: {
      "text-align": "center",
      "vertical-align": "bottom",
      "height": "60px",
      "border": "none"
    },
    attrs: {
      "colspan": 6 + _vm.sdks.length
    }
  }, [_c('a', {
    staticClass: "button is-primary",
    staticStyle: {
      "min-width": "100px"
    },
    on: {
      "click": _vm.addNewGoods
    }
  }, [_c('i', {
    staticClass: "fa fa-plus",
    staticStyle: {
      "margin-right": "5px"
    }
  }), _vm._v(" " + _vm._s(_vm.$t('admin.app.goods.add')) + "\n                ")])])])]), _vm._v(" "), _c('tbody', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.app.goods && _vm.app.goods.length > 0),
      expression: "app.goods && app.goods.length > 0"
    }]
  }, _vm._l((_vm.app.goods), function(goods, index) {
    return _c('tr', {
      key: goods.id
    }, [_c('td', {
      staticClass: "is-icon"
    }, [_c('figure', {
      staticClass: "image is-32x32 goods-icon",
      on: {
        "click": function($event) {
          _vm.updateGoodsIcon(goods)
        }
      }
    }, [_c('img', {
      attrs: {
        "src": goods.icon ? goods.icon : 'https://placehold.it/32x32?text=128x128'
      }
    })])]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(goods.id) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(goods.name) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(goods.description) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s((goods.price / 100).toFixed(2)) + " ")]), _vm._v(" "), _vm._l((_vm.sdks), function(sdk) {
      return _c('td', {
        key: sdk,
        staticClass: "is-icon"
      }, [_c('span', {
        staticClass: "sdk-icon",
        class: _vm.classOfGoodsSdk(goods, sdk),
        on: {
          "click": function($event) {
            $event.preventDefault();
            _vm.editGoodsProductId(goods, sdk)
          }
        }
      })])
    }), _vm._v(" "), _c('td', {
      staticClass: "is-icon"
    }, [_c('a', {
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.editGoodsInfo(goods, index)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-pencil"
    })]), _vm._v(" "), _c('a', {
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.deleteGoods(goods, index)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-trash"
    })])])], 2)
  }))], 1)]) : _vm._e()])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-202147b6", module.exports)
  }
}

/***/ }),
/* 1554 */,
/* 1555 */,
/* 1556 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor"
  }, [_c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('div', {
    staticClass: "column"
  }, [_c('router-link', {
    staticClass: "button is-primary pull-left",
    attrs: {
      "to": {
        name: 'EditNews',
        params: {
          news: {
            id: '',
            title: '',
            content: '',
            group: 'news',
            app_id: this.$route.params.appId,
          }
        }
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small",
    staticStyle: {
      "margin-right": "5px"
    }
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]), _vm._v(_vm._s(_vm.$t('admin.news.news.add')) + "\n        ")])], 1)]), _vm._v(" "), _c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('div', {
    staticClass: "table-responsive"
  }, [_c('table', {
    staticClass: "table is-bordered is-striped is-narrow goods-table"
  }, [_c('thead', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.newses && _vm.newses.length > 0),
      expression: "newses && newses.length > 0"
    }]
  }, [_c('tr', [_c('th', [_vm._v(_vm._s(_vm.$t('admin.news.id')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.pic')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.title')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.created_at')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.active')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.edit')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.operate')))])])]), _vm._v(" "), _c('tbody', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.newses && _vm.newses.length > 0),
      expression: "newses && newses.length > 0"
    }]
  }, _vm._l((_vm.newses), function(news, index) {
    return _c('tr', [_c('td', [_vm._v(" " + _vm._s(news.id) + " ")]), _vm._v(" "), _c('td', {
      staticClass: "is-icon"
    }, [_c('figure', {
      staticClass: "image news-pic",
      on: {
        "click": function($event) {
          _vm.updateNewsPic(news)
        }
      }
    }, [_c('img', {
      staticStyle: {
        "width": "172px",
        "height": "70px"
      },
      attrs: {
        "src": news.pic ? news.pic : 'https://placehold.it/172x70?text=640X260'
      }
    })])]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(news.title) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(_vm._f("formatServerDateTime")(news.inserted_at)) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(news.active ? _vm.$t('admin.news.publishEd') : _vm.$t('admin.news.unPublish')) + " ")]), _vm._v(" "), _c('td', {
      staticClass: "is-icon"
    }, [_c('a', {
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.editNewsInfo(news, index)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-pencil"
    })])]), _vm._v(" "), _c('td', {
      staticClass: "is-icon"
    }, [_c('a', {
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.toggleStatus(news)
        }
      }
    }, [_c('i', {
      staticClass: "fa",
      class: news.active ? 'fa-trash-o' : 'fa-check'
    })])])])
  }))])])]), _vm._v(" "), _c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('pagination', {
    attrs: {
      "page-count": _vm.total,
      "current-page": _vm.page,
      "on-page-change": _vm.onPageChange
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-245dd164", module.exports)
  }
}

/***/ }),
/* 1557 */,
/* 1558 */,
/* 1559 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    attrs: {
      "name": "linkInfo"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "columns is-multiline"
  }, [_c('div', {
    staticClass: "column is-12"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.csPhoneNumber')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.cs_phone_number),
      expression: "app.cs_phone_number",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.cs_phone_number)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.cs_phone_number = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.websiteName')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.website_name),
      expression: "app.website_name",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.website_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.website_name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.websiteUrl')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.website_url),
      expression: "app.website_url",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.website_url)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.website_url = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.publicWeixinName')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.public_weixin_name),
      expression: "app.public_weixin_name",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.public_weixin_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.public_weixin_name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.publicWeixinUrl')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.public_weixin_url),
      expression: "app.public_weixin_url",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.public_weixin_url)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.public_weixin_url = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.weiboName')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.weibo_name),
      expression: "app.weibo_name",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.weibo_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.weibo_name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.weiboUrl')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.weibo_url),
      expression: "app.weibo_url",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.weibo_url)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.weibo_url = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.baiduTiebaName')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.baidu_tieba_name),
      expression: "app.baidu_tieba_name",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.baidu_tieba_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.baidu_tieba_name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.baiduTiebaUrl')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.baidu_tieba_url),
      expression: "app.baidu_tieba_url",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.baidu_tieba_url)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.baidu_tieba_url = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.forumName')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.forum_name),
      expression: "app.forum_name",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.forum_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.forum_name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.forumUrl')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.forum_url),
      expression: "app.forum_url",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.forum_url)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.forum_url = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.submit')))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-275d9312", module.exports)
  }
}

/***/ }),
/* 1560 */,
/* 1561 */,
/* 1562 */,
/* 1563 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('router-view')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-287bcc5d", module.exports)
  }
}

/***/ }),
/* 1564 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "app-main"
  }, [_c('div', {
    staticClass: "container is-fluid is-marginless app-content"
  }, [_c('levelbar'), _vm._v(" "), _c('transition', {
    attrs: {
      "mode": "out-in",
      "enter-active-class": "fadeIn",
      "leave-active-class": "fadeOut",
      "appear": ""
    }
  }, [_c('router-view', {
    staticClass: "animated"
  })], 1)], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-291a3fbb", module.exports)
  }
}

/***/ }),
/* 1565 */,
/* 1566 */,
/* 1567 */,
/* 1568 */,
/* 1569 */,
/* 1570 */,
/* 1571 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor"
  }, [_c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('div', {
    staticClass: "column"
  }, [_c('router-link', {
    staticClass: "button is-primary pull-left",
    attrs: {
      "to": {
        name: 'EditNews',
        params: {
          news: {
            id: '',
            title: '',
            content: '',
            group: 'activity',
            app_id: this.$route.params.appId,
          }
        }
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small",
    staticStyle: {
      "margin-right": "5px"
    }
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]), _vm._v(_vm._s(_vm.$t('admin.news.activity.add')) + "\n        ")])], 1)]), _vm._v(" "), _c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('div', {
    staticClass: "table-responsive"
  }, [_c('table', {
    staticClass: "table is-bordered is-striped is-narrow goods-table"
  }, [_c('thead', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.newses && _vm.newses.length > 0),
      expression: "newses && newses.length > 0"
    }]
  }, [_c('tr', [_c('th', [_vm._v(_vm._s(_vm.$t('admin.news.id')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.title')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.pic')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.created_at')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.active')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.edit')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.operate')))])])]), _vm._v(" "), _c('tbody', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.newses && _vm.newses.length > 0),
      expression: "newses && newses.length > 0"
    }]
  }, _vm._l((_vm.newses), function(news, index) {
    return _c('tr', [_c('td', [_vm._v(" " + _vm._s(news.id) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(news.title) + " ")]), _vm._v(" "), _c('td', {
      staticClass: "is-icon"
    }, [_c('figure', {
      staticClass: "image news-pic",
      on: {
        "click": function($event) {
          _vm.updateNewsPic(news)
        }
      }
    }, [_c('img', {
      staticStyle: {
        "width": "172px",
        "height": "70px"
      },
      attrs: {
        "src": news.pic ? news.pic : 'https://placehold.it/172x70?text=640X260'
      }
    })])]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(_vm._f("formatServerDateTime")(news.inserted_at)) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(news.active ? _vm.$t('admin.news.publishEd') : _vm.$t('admin.news.unPublish')) + " ")]), _vm._v(" "), _c('td', {
      staticClass: "is-icon"
    }, [_c('a', {
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.editNewsInfo(news, index)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-pencil"
    })])]), _vm._v(" "), _c('td', {
      staticClass: "is-icon"
    }, [_c('a', {
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.toggleStatus(news)
        }
      }
    }, [_c('i', {
      staticClass: "fa",
      class: news.active ? 'fa-trash-o' : 'fa-check'
    })])])])
  }))])])]), _vm._v(" "), _c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('pagination', {
    attrs: {
      "page-count": _vm.total,
      "current-page": _vm.page,
      "on-page-change": _vm.onPageChange
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-31f6c28a", module.exports)
  }
}

/***/ }),
/* 1572 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "box"
  }, _vm._l((_vm.myLoginCodes), function(code) {
    return _c('div', {
      key: code.id,
      staticClass: "columns"
    }, [_c('span', {
      staticClass: "column is-3"
    }, [_vm._v(_vm._s(code.code) + " ")]), _vm._v(" "), _c('span', {
      staticClass: "column is-3"
    }, [_vm._v(_vm._s(code.user_id) + " ")]), _vm._v(" "), _c('span', {
      staticClass: "column is-3"
    }, [_vm._v(_vm._s(code.assigned_at) + " ")])])
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3323b04c", module.exports)
  }
}

/***/ }),
/* 1573 */,
/* 1574 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('aside', {
    staticClass: "menu app-sidebar animated",
    class: {
      slideInLeft: _vm.show, slideOutLeft: !_vm.show
    }
  }, [_c('p', {
    staticClass: "menu-label"
  }, [_vm._v("\n    Firevale\n  ")]), _vm._v(" "), _c('ul', {
    staticClass: "menu-list"
  }, _vm._l((_vm.menu), function(item, index) {
    return _c('li', {
      key: item.path
    }, [(item.path) ? _c('router-link', {
      attrs: {
        "to": item.path,
        "exact": true,
        "aria-expanded": _vm.isExpanded(item) ? 'true' : 'false'
      },
      nativeOn: {
        "click": function($event) {
          _vm.toggle(index, item)
        }
      }
    }, [_c('span', {
      staticClass: "icon is-small"
    }, [_c('i', {
      class: ['fa', item.meta.icon]
    })]), _vm._v(" " + _vm._s(item.meta.label || item.name) + "\n        "), (item.children && item.children.length) ? _c('span', {
      staticClass: "icon is-small is-angle"
    }, [_c('i', {
      staticClass: "fa fa-angle-down"
    })]) : _vm._e()]) : _c('a', {
      attrs: {
        "aria-expanded": _vm.isExpanded(item)
      },
      on: {
        "click": function($event) {
          _vm.toggle(index, item)
        }
      }
    }, [_c('span', {
      staticClass: "icon is-small"
    }, [_c('i', {
      class: ['fa', item.meta.icon]
    })]), _vm._v(" " + _vm._s(item.meta.label || item.name) + "\n        "), (item.children && item.children.length) ? _c('span', {
      staticClass: "icon is-small is-angle"
    }, [_c('i', {
      staticClass: "fa fa-angle-down"
    })]) : _vm._e()]), _vm._v(" "), (item.children && item.children.length) ? _c('expanding', [_c('ul', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.isExpanded(item)),
        expression: "isExpanded(item)"
      }]
    }, _vm._l((item.children), function(subItem) {
      return (subItem.path) ? _c('li', {
        key: subItem.path
      }, [_c('router-link', {
        attrs: {
          "to": _vm.generatePath(item, subItem)
        }
      }, [_vm._v("\n              " + _vm._s(subItem.meta && subItem.meta.label || subItem.name) + "\n            ")])], 1) : _vm._e()
    }))]) : _vm._e()], 1)
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-36e8e2c6", module.exports)
  }
}

/***/ }),
/* 1575 */,
/* 1576 */,
/* 1577 */,
/* 1578 */,
/* 1579 */,
/* 1580 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('modal', {
    attrs: {
      "visible": _vm.visible
    }
  }, [_c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "width": "100%",
      "margin-bottom": "10px"
    }
  }, [_c('h5', {
    staticClass: "title is-5"
  }, [_vm._v(_vm._s(_vm.$t('admin.titles.editSettingInfo')))])]), _vm._v(" "), _c('form', {
    attrs: {
      "name": "section"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.setting.configName')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.setting.name),
      expression: "setting.name",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.setting.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.setting.name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.setting.configValue')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.setting.value),
      expression: "setting.value",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    staticStyle: {
      "height": "120px"
    },
    domProps: {
      "value": (_vm.setting.value)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.setting.value = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.setting.memo')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.setting.memo),
      expression: "setting.memo",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.setting.memo)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.setting.memo = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.submit')))])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3b87b65e", module.exports)
  }
}

/***/ }),
/* 1581 */,
/* 1582 */,
/* 1583 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    attrs: {
      "name": "basicInfo"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3e96cf5e", module.exports)
  }
}

/***/ }),
/* 1584 */,
/* 1585 */,
/* 1586 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "box"
  }, [(this.adminLevel == 1) ? _c('router-link', {
    staticClass: "button is-primary pull-right",
    staticStyle: {
      "position": "absolute",
      "top": "20px",
      "right": "20px"
    },
    attrs: {
      "to": {
        name: 'NewApp'
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small",
    staticStyle: {
      "margin-right": "5px"
    }
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]), _vm._v(_vm._s(_vm.$t('admin.app.add')) + "\n  ")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "columns is-multiline"
  }, _vm._l((_vm.appList), function(app) {
    return _c('article', {
      key: app.id,
      staticClass: "column is-3"
    }, [_c('div', {
      staticClass: "tile is-parent"
    }, [_c('figure', {
      staticClass: "image is-64x64 app-icon",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.updateAppIcon(app)
        }
      }
    }, [_c('img', {
      attrs: {
        "src": app.icon ? app.icon : 'https://placehold.it/64x64?text=128x128'
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "tile is-vertical is-child",
      staticStyle: {
        "padding-left": "5px"
      }
    }, [_c('h3', {
      staticStyle: {
        "font-weight": "bold"
      }
    }, [_vm._v(" " + _vm._s(app.name) + " ")]), _vm._v(" "), _c('router-link', {
      staticClass: "button is-small is-outlined",
      staticStyle: {
        "margin-top": "15px"
      },
      attrs: {
        "to": {
          name: 'AppDashboard',
          params: {
            appId: app.id
          }
        }
      }
    }, [_c('span', {
      staticClass: "icon is-small"
    }, [_c('i', {
      staticClass: "fa fa-search"
    })]), _vm._v(" "), _c('span', [_vm._v(" " + _vm._s(_vm.$t('admin.enterManage')) + " ")])])], 1)])])
  }))], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3fe4bb3e", module.exports)
  }
}

/***/ }),
/* 1587 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor"
  }, [_c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('div', {
    staticClass: "table-responsive"
  }, [_c('table', {
    staticClass: "table is-bordered is-striped is-narrow goods-table"
  }, [_c('thead', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.questions && _vm.questions.length > 0),
      expression: "questions && questions.length > 0"
    }]
  }, [_c('tr', [_c('th', [_vm._v(_vm._s(_vm.$t('admin.customerService.questionField.avatar')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.customerService.questionField.nickname')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.customerService.questionField.title')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.customerService.questionField.answer')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.customerService.questionField.isHot')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.customerService.questionField.active')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.customerService.questionField.insertedAt')))]), _vm._v(" "), _c('th')])]), _vm._v(" "), _c('tbody', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.questions && _vm.questions.length > 0),
      expression: "questions && questions.length > 0"
    }]
  }, _vm._l((_vm.questions), function(item, index) {
    return _c('tr', [_c('td', {
      staticClass: "is-icon"
    }, [_c('figure', {
      staticClass: "image is-48x48"
    }, [_c('img', {
      attrs: {
        "src": item.user.avatar_url ? item.user.avatar_url : 'https://placehold.it/48x48'
      }
    })])]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(item.user.nickname))]), _vm._v(" "), _c('td', {
      staticStyle: {
        "width": "450px"
      }
    }, [_vm._v(" " + _vm._s(item.title) + " ")]), _vm._v(" "), _c('td', [_c('span', {
      class: {
        tag: true, 'is-danger': !item.answer
      }
    }, [_vm._v("\n                  " + _vm._s(item.answer ? _vm.$t('admin.titles.yes') : _vm.$t('admin.titles.no')) + "\n                ")])]), _vm._v(" "), _c('td', [_c('span', {
      class: {
        tag: true, 'is-success': item.is_hot
      }
    }, [_vm._v("\n                  " + _vm._s(item.is_hot ? _vm.$t('admin.titles.yes') : _vm.$t('admin.titles.no')) + "\n                ")])]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(item.active ? _vm.$t('admin.titles.yes') : _vm.$t('admin.titles.no')) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(_vm._f("formatServerDateTime")(item.inserted_at)) + " ")]), _vm._v(" "), _c('td', {
      staticClass: "is-icon"
    }, [_c('a', {
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.replyQuestion(item, index)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-pencil"
    })]), _vm._v(" "), _c('a', {
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.deleteItem(item, index)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-trash-o"
    })])])])
  })), _vm._v(" "), _c('tfoot', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.questions || _vm.questions.length == 0),
      expression: "!questions || questions.length== 0"
    }]
  }, [_vm._v(_vm._s(_vm.$t('admin.titles.noData')))])], 1)])]), _vm._v(" "), _c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('pagination', {
    attrs: {
      "page-count": _vm.total,
      "current-page": _vm.page,
      "on-page-change": _vm.onPageChange
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4031ca44", module.exports)
  }
}

/***/ }),
/* 1588 */,
/* 1589 */,
/* 1590 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "box"
  }, [(_vm.goods) ? _c('form', {
    attrs: {
      "name": "goods"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "tile"
  }, [_c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('article', {
    staticClass: "tile is-child"
  }, [_c('div', {
    staticClass: "field is-horizontal"
  }, [_c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.name')))])]), _vm._v(" "), _c('div', {
    staticClass: "field-body"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.goods.name),
      expression: "goods.name",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "placeholder": _vm.$t('admin.mall.goods.namePlaceholder'),
      "type": "text"
    },
    domProps: {
      "value": (_vm.goods.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.goods.name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "field is-horizontal"
  }, [_c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.id')))])]), _vm._v(" "), _c('div', {
    staticClass: "field-body"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.goods.id),
      expression: "goods.id",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "disabled": !_vm.isNew
    },
    domProps: {
      "value": (_vm.goods.id)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.goods.id = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "field is-horizontal"
  }, [_c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.currency')))])]), _vm._v(" "), _c('div', {
    staticClass: "field-body"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.goods.currency),
      expression: "goods.currency",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "disabled": ""
    },
    domProps: {
      "value": (_vm.goods.currency)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.goods.currency = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "field is-horizontal"
  }, [_c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.price')))])]), _vm._v(" "), _c('div', {
    staticClass: "field-body"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.realPrice),
      expression: "realPrice",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "number"
    },
    domProps: {
      "value": (_vm.realPrice)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.realPrice = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "field is-horizontal"
  }, [_c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.postage')))])]), _vm._v(" "), _c('div', {
    staticClass: "field-body"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.realPostage),
      expression: "realPostage",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "number"
    },
    domProps: {
      "value": (_vm.realPostage)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.realPostage = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "field is-horizontal"
  }, [_c('div', {
    staticClass: "field-label"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.stock')))])]), _vm._v(" "), _c('div', {
    staticClass: "field-body"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.goods.stock),
      expression: "goods.stock",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "number"
    },
    domProps: {
      "value": (_vm.goods.stock)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.goods.stock = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])])])]), _vm._v(" "), _c('div', {
    staticClass: "tile is-parent"
  }, [_c('article', {
    staticClass: "tile is-child"
  }, [_c('center', {
    staticStyle: {
      "padding": "0 4rem 0 4rem"
    }
  }, [_c('div', {
    directives: [{
      name: "dragula",
      rawName: "v-dragula",
      value: (_vm.pics),
      expression: "pics"
    }],
    staticClass: "columns is-multiline container2",
    attrs: {
      "bag": _vm.bagId
    }
  }, _vm._l((_vm.pics), function(pic, index) {
    return _c('div', {
      key: pic,
      staticClass: "column is-4"
    }, [_c('figure', {
      staticClass: "image",
      staticStyle: {
        "display": "block"
      },
      on: {
        "click": function($event) {
          _vm.onShowImageUpload(index)
        }
      }
    }, [_c('img', {
      staticStyle: {
        "width": "120px",
        "height": "120px"
      },
      attrs: {
        "src": _vm._f("imageStaticUrl")(pic ? pic : 'https://placehold.it/256x256?text=400X400')
      }
    })])])
  })), _vm._v(" "), _c('p', {
    staticClass: "help"
  }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.picPlaceholder')))])])], 1)])]), _vm._v(" "), _c('div', [_c('label', [_vm._v(" " + _vm._s(_vm.$t('admin.mall.goods.description')) + " ")]), _vm._v(" "), _c('quill-editor', {
    staticStyle: {
      "min-height": "200px"
    },
    attrs: {
      "full-featured": true,
      "placeholder": _vm.$t('admin.mall.goods.descPlaceholder')
    },
    on: {
      "ready": _vm.setEditor,
      "input": function($event) {
        _vm.handleValidation(_vm.$v.goods.description)
      },
      "image": _vm.onInsertImage
    },
    model: {
      value: (_vm.goods.description),
      callback: function($$v) {
        _vm.goods.description = (typeof $$v === 'string' ? $$v.trim() : $$v)
      },
      expression: "goods.description"
    }
  })], 1), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errorHint),
      expression: "errorHint"
    }],
    staticClass: "tile is-full has-text-left",
    staticStyle: {
      "margin-top": "0.5rem"
    }
  }, [_c('span', {
    staticClass: "icon is-sign"
  }, [_vm._v("!")]), _vm._v(" "), _c('span', {
    staticClass: "is-primary",
    staticStyle: {
      "font-size": "1rem"
    }
  }, [_vm._v(_vm._s(_vm.errorHint))])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('a', {
    staticClass: "button is-white",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.onBack($event)
      }
    }
  }, [_vm._m(0), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('common.return')))])]), _vm._v(" "), (!this.isNew) ? _c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.deleting
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.onDelete($event)
      }
    }
  }, [_vm._m(1), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('admin.mall.goods.delete')))])]) : _vm._e(), _vm._v(" "), (!this.isNew) ? _c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.publishing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.onPublish($event)
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa ",
    class: _vm.goods.active == true ? ' fa-level-down' : ' fa-level-up'
  })]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.goods.active == true ? _vm.$t('admin.mall.goods.unPublish') : _vm.$t('admin.mall.goods.publish')))])]) : _vm._e(), _vm._v(" "), _c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.saving
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.onSave($event)
      }
    }
  }, [_vm._m(2), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('admin.mall.goods.save')))])])])]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-backward"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-close"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-save"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4306f183", module.exports)
  }
}

/***/ }),
/* 1591 */,
/* 1592 */,
/* 1593 */,
/* 1594 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "control has-icon has-icon-left"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.keyword),
      expression: "keyword"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('admin.titles.searchOrders')
    },
    domProps: {
      "value": (_vm.keyword)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.onSearchBoxSubmit($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.keyword = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon is-small"
  }, [(_vm.searching) ? _c('i', {
    staticClass: "fa fa-spinner fa-spin"
  }) : _c('i', {
    staticClass: "fa fa-search"
  })])]), _vm._v(" "), (!_vm.initing && _vm.orders.length > 0) ? _c('div', {
    staticClass: "tile is-ancestor"
  }, [_c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('div', {
    staticClass: "table-responsive"
  }, [_c('table', {
    staticClass: "table is-narrow goods-table"
  }, [_c('tbody', [_vm._l((_vm.orders), function(order) {
    return [_c('tr', [_c('td', {
      staticClass: "is-icon",
      attrs: {
        "rowspan": "2"
      }
    }, [_c('i', {
      class: _vm.getOrderPlatformIcon(order),
      staticStyle: {
        "font-size": "21px"
      }
    })]), _vm._v(" "), _c('td', {
      staticClass: "is-icon",
      attrs: {
        "rowspan": "2"
      }
    }, [_c('tooltip', {
      attrs: {
        "label": _vm.app.name,
        "placement": "top"
      }
    }, [_c('figure', {
      staticClass: "image is-32x32",
      staticStyle: {
        "display": "block"
      }
    }, [_c('img', {
      attrs: {
        "src": _vm.appIcon
      }
    })])])], 1), _vm._v(" "), _c('td', {
      staticClass: "is-icon",
      attrs: {
        "rowspan": "2"
      }
    }, [_c('tooltip', {
      attrs: {
        "label": _vm.getGoodsName(order),
        "placement": "top"
      }
    }, [_c('figure', {
      staticClass: "image is-32x32",
      staticStyle: {
        "display": "block"
      }
    }, [_c('img', {
      attrs: {
        "src": _vm.getGoodsIcon(order)
      }
    })])])], 1), _vm._v(" "), _c('td', {
      staticStyle: {
        "border-bottom": "none"
      }
    }, [_vm._v(" " + _vm._s(order.user_id) + " ")]), _vm._v(" "), _c('td', {
      staticStyle: {
        "min-width": "60px",
        "color": "firebrick"
      },
      attrs: {
        "rowspan": "2"
      }
    }, [_c('span', {
      staticClass: "icon",
      staticStyle: {
        "width": "1.2rem",
        "height": "1rem",
        "line-height": "1rem",
        "vertical-align": "middle",
        "font-size": "18px"
      }
    }, [_c('i', {
      class: ("fa fa-" + (order.transaction_currency.toLowerCase()))
    })]), _vm._v(_vm._s((order.fee / 100).toFixed(0)) + "\n                  ")]), _vm._v(" "), _c('td', {
      staticStyle: {
        "border-bottom": "none"
      }
    }, [_vm._v("\n                    " + _vm._s(_vm.$t('admin.label.createdAt') + ': ') + " " + _vm._s(_vm._f("formatServerDateTime")(order.inserted_at)) + "\n                  ")]), _vm._v(" "), _c('td', {
      staticStyle: {
        "border-bottom": "none"
      }
    }, [_vm._v("\n                    " + _vm._s(_vm.$t('admin.label.paidAt') + ': ') + " " + _vm._s(_vm._f("formatServerDateTime")(order.paid_at)) + "\n                  ")]), _vm._v(" "), _c('td', {
      staticStyle: {
        "border-bottom": "none"
      }
    }, [_vm._v("\n                    " + _vm._s(_vm.$t('admin.label.deliveredAt') + ': ') + " " + _vm._s(_vm._f("formatServerDateTime")(order.deliver_at)) + "\n                  ")])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v(" " + _vm._s(order.zone_id) + "区 ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(_vm.$t('admin.label.transactionId') + ': ') + " " + _vm._s(_vm.getOrderTransactionId(order)) + " ")]), _vm._v(" "), _c('td', {
      attrs: {
        "colspan": "2"
      }
    }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.cpOrderId') + ': ') + " " + _vm._s(order.cp_order_id) + " ")])])]
  })], 2)])])]), _vm._v(" "), _c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('pagination', {
    attrs: {
      "page-count": _vm.total,
      "current-page": _vm.page,
      "on-page-change": _vm.onPageChange
    }
  })], 1)])]) : _c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "hero-body has-text-centered"
  }, [(_vm.loading || _vm.initing) ? _c('div', [_c('span', {
    staticClass: "icon is-large"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-spin"
  })]), _vm._v(" "), _c('h2', {
    staticClass: "subtitle",
    staticStyle: {
      "margin-top": "20px"
    }
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.loading')) + "\n        ")])]) : _c('div', [_c('h1', {
    staticClass: "title"
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.oops')) + "\n        ")]), _vm._v(" "), _c('h2', {
    staticClass: "subtitle"
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.noOrderToDisplay')) + "\n        ")])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-46f4f992", module.exports)
  }
}

/***/ }),
/* 1595 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    attrs: {
      "name": "basicInfo"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-47c0b7e8", module.exports)
  }
}

/***/ }),
/* 1596 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('tabs', {
    attrs: {
      "type": "boxed",
      "layout": "top",
      "alignment": "left",
      "size": "normal",
      "only-fade": false
    }
  }, [_c('tab-pane', {
    attrs: {
      "icon": "fa fa-clone",
      "label": _vm.$t('admin.wcp.basicInfo')
    }
  }, [_c('params-editor')], 1), _vm._v(" "), _c('tab-pane', {
    attrs: {
      "icon": "fa fa-support",
      "label": _vm.$t('admin.wcp.replyInfo')
    }
  }, [_c('reply-editor')], 1), _vm._v(" "), _c('tab-pane', {
    attrs: {
      "icon": "fa fa-support",
      "label": _vm.$t('admin.wcp.replyModel')
    }
  }, [_c('reply-model-editor')], 1), _vm._v(" "), _c('tab-pane', {
    attrs: {
      "icon": "fa fa-support",
      "label": _vm.$t('admin.wcp.downloadReply')
    }
  }, [_c('download-reply-editor')], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-49618bf0", module.exports)
  }
}

/***/ }),
/* 1597 */,
/* 1598 */,
/* 1599 */,
/* 1600 */,
/* 1601 */,
/* 1602 */,
/* 1603 */,
/* 1604 */,
/* 1605 */,
/* 1606 */,
/* 1607 */,
/* 1608 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-tabs', {
    attrs: {
      "type": "border-card",
      "editable": ""
    },
    on: {
      "tab-remove": _vm.removeTab
    },
    model: {
      value: (_vm.activeName),
      callback: function($$v) {
        _vm.activeName = $$v
      },
      expression: "activeName"
    }
  }, [_vm._l((_vm.tbs), function(tb, index) {
    return _c('el-tab-pane', {
      key: tb,
      attrs: {
        "label": _vm.getTabName(tb),
        "name": _vm.getTabName(tb)
      }
    }, [_c('by-day', {
      attrs: {
        "days": tb
      }
    })], 1)
  }), _vm._v(" "), _c('el-tab-pane', {
    attrs: {
      "name": "custom"
    }
  }, [_c('span', {
    slot: "label"
  }, [_c('i', {
    staticClass: "el-icon-date"
  }), _vm._v(" " + _vm._s(_vm.$t('admin.stats.addTab')))]), _vm._v(" "), _c('el-date-picker', {
    attrs: {
      "editable": false,
      "type": "date",
      "placeholder": _vm.$t('admin.stats.selectDate')
    },
    on: {
      "change": _vm.changeDate
    },
    model: {
      value: (_vm.date),
      callback: function($$v) {
        _vm.date = $$v
      },
      expression: "date"
    }
  })], 1)], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-55096528", module.exports)
  }
}

/***/ }),
/* 1609 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('modal', {
    staticClass: "user-detail",
    attrs: {
      "visible": _vm.visible
    }
  }, [(_vm.user) ? _c('div', {
    staticClass: "box"
  }, [_c('el-table', {
    attrs: {
      "data": _vm.user
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "email",
      "label": "账号",
      "width": "180"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "nickname",
      "label": "昵称",
      "width": "120"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "mobile",
      "label": "移动电话",
      "width": "130"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "age",
      "label": "年龄"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "性别"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._v("\n          " + _vm._s(scope.row.gender == 'male' ? '男' : '女') + "\n        ")]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "inserted_at",
      "label": "注册时间",
      "width": "180",
      "formatter": _vm.formatServerDateTime
    }
  })], 1), _vm._v(" "), _c('br'), _vm._v(" "), (_vm.appUsers) ? _c('div', [_vm._l((_vm.appUsers), function(app, index) {
    return _c('el-card', {
      staticClass: "box-card"
    }, [_c('br'), _vm._v(" "), _c('div', {
      staticClass: "clearfix",
      slot: "header"
    }, [_c('span', {
      staticStyle: {
        "line-height": "36px"
      }
    }, [_c('el-button', {
      staticClass: "width-200",
      attrs: {
        "type": _vm.buttonType[index]
      }
    }, [_vm._v(_vm._s(app.zone_id) + "区")])], 1)]), _vm._v(" "), _c('app-user-list', {
      attrs: {
        "appUsers": _vm.showAppUsers(app)
      }
    })], 1)
  }), _vm._v(" "), _c('div', {
    staticClass: "columns is-multiline "
  }, [_c('div', {
    staticClass: "column is-8"
  }), _vm._v(" "), _c('div', {
    staticClass: "column has-text-right"
  }, [_c('div', {
    staticClass: " has-text-left"
  }, [_c('h1', {
    staticClass: "title is-marginless"
  }, [_vm._v("合计：")]), _vm._v(" "), _c('h2', {
    staticClass: "subtitle is-marginless"
  }, [_vm._v("充值金额："), _c('strong', [_vm._v(_vm._s(_vm._f("formatPrice")(_vm.summaryAmount)) + " 元")])]), _vm._v(" "), _c('h2', {
    staticClass: "subtitle is-marginless"
  }, [_vm._v("活跃时长："), _c('strong', [_vm._v(_vm._s(_vm._f("secondFormatHour")(_vm.summarySeconds)) + "小时")])])])])])], 2) : _vm._e()], 1) : _c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "hero-body has-text-centered"
  }, [_c('div', [_c('span', {
    staticClass: "icon is-large"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-spin"
  })]), _vm._v(" "), _c('h2', {
    staticClass: "subtitle",
    staticStyle: {
      "margin-top": "10px"
    }
  }, [_vm._v("\n          数据加载中\n        ")])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-55194a0d", module.exports)
  }
}

/***/ }),
/* 1610 */,
/* 1611 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('modal', {
    attrs: {
      "visible": _vm.visible
    }
  }, [_c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "heading has-text-centered"
  }, [_c('h1', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.title))])]), _vm._v(" "), _c('article', {
    staticClass: "media"
  }, [_c('figure', {
    staticClass: "media-left"
  }, [_c('span', {
    staticClass: "icon is-large",
    class: ("is-" + _vm.type)
  }, [_c('i', {
    staticClass: "fa fa-warning"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "media-content"
  }, [_c('div', {
    staticClass: "content is-warning"
  }, [_c('p', [_vm._v(" " + _vm._s(_vm.message) + " ")])])])]), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered"
  }, [_c('a', {
    staticClass: "button is-danger",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.onBtnOKClicked($event)
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.okTitle) + "\n      ")]), _vm._v(" "), _c('a', {
    staticClass: "button is-primary",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.visible = false
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.cancelTitle) + "\n      ")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-57405db2", module.exports)
  }
}

/***/ }),
/* 1612 */,
/* 1613 */,
/* 1614 */,
/* 1615 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "position": "relative"
    }
  }, [_c('form', {
    staticClass: "post",
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', [_c('label', [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.keywords')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control is-horizontal",
    staticStyle: {
      "margin-bottom": "1.5rem"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.rule.keywords),
      expression: "rule.keywords",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    staticStyle: {
      "border-radius": "0"
    },
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('admin.wcp.keywordsPlaceholder')
    },
    domProps: {
      "value": (_vm.rule.keywords)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.rule.keywords = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', [_c('div', {
    staticClass: "field has-addons",
    staticStyle: {
      "margin-bottom": "0"
    }
  }, [_c('label', {
    staticClass: "label flex-take-rest"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.response')) + ": ")]), _vm._v(" "), _c('div', {
    staticClass: "field has-addons flex-fixed-size"
  }, [_c('p', {
    staticClass: "flex-take-rest",
    staticStyle: {
      "padding-right": "0.5rem"
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.userLoginCode')) + " ")])]), _vm._v(" "), _c('p', {
    staticClass: "flex-fixed-size"
  }, [_c('toggle-button', {
    attrs: {
      "value": _vm.rule.response == this.loginCode,
      "color": "#4e9ed8",
      "sync": true,
      "labels": {
        checked: _vm.$t('admin.switchOn'),
        unchecked: _vm.$t('admin.switchOff')
      }
    },
    on: {
      "change": function (x) { return _vm.setLoginCode(x); }
    }
  })], 1)])]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.rule.response),
      expression: "rule.response",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "disabled": _vm.rule.response == this.loginCode,
      "rows": "4",
      "placeholder": _vm.$t('admin.wcp.responsePlaceholder')
    },
    domProps: {
      "value": (_vm.rule.response)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.rule.response = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errorHint),
      expression: "errorHint"
    }],
    staticClass: "tile is-full has-text-left",
    staticStyle: {
      "margin-top": "0.5rem"
    }
  }, [_c('span', {
    staticClass: "icon is-sign"
  }, [_vm._v("!")]), _vm._v(" "), _c('span', {
    staticClass: "is-primary",
    staticStyle: {
      "font-size": "1rem"
    }
  }, [_vm._v(_vm._s(_vm.errorHint))])]), _vm._v(" "), _c('div', {
    staticClass: "tile is-full has-text-centered"
  }, [_c('p', {
    staticStyle: {
      "margin": "5px auto"
    }
  }, [_c('input', {
    staticClass: "button is-primary",
    class: _vm.processing || _vm.$v.$invalid ? 'is-disabled' : '',
    staticStyle: {
      "display": "inline-block",
      "font-size": "1rem"
    },
    attrs: {
      "type": "submit",
      "disabled": _vm.$v.$invalid
    },
    domProps: {
      "value": _vm.$t('admin.wcp.btnTitle')
    }
  })])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-60e41de0", module.exports)
  }
}

/***/ }),
/* 1616 */,
/* 1617 */,
/* 1618 */,
/* 1619 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    attrs: {
      "name": "basicInfo"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "columns is-multiline"
  }, [_c('div', {
    staticClass: "column is-12"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.forumTitle')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.forum.title),
      expression: "forum.title",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.forum.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.forum.title = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.submit')))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-64d7dcc5", module.exports)
  }
}

/***/ }),
/* 1620 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "dashboard"
  }, [_c('div', {
    staticClass: "toolbar",
    staticStyle: {
      "margin-bottom": "1rem"
    }
  }, [_c('el-radio-group', {
    on: {
      "change": _vm.changePlatform
    },
    model: {
      value: (_vm.platform),
      callback: function($$v) {
        _vm.platform = $$v
      },
      expression: "platform"
    }
  }, [_c('el-radio-button', {
    attrs: {
      "label": "all"
    }
  }, [_vm._v("全部")]), _vm._v(" "), _c('el-radio-button', {
    attrs: {
      "label": "ios"
    }
  }, [_vm._v("iOS")]), _vm._v(" "), _c('el-radio-button', {
    attrs: {
      "label": "android"
    }
  }, [_vm._v("Android")])], 1), _vm._v(" "), _c('span', {
    staticStyle: {
      "margin-right": "15px"
    }
  })], 1), _vm._v(" "), _c('nav', {
    staticClass: "level"
  }, [_c('div', {
    staticClass: "level-item has-text-centered box"
  }, [_c('div', [_c('p', {
    staticClass: "heading"
  }, [_vm._v(_vm._s(_vm.$t('admin.app.dau')))]), _vm._v(" "), _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.reports ? _vm.reports[0].dau : 0) + "\n          "), _c('sub', [_vm._v("[ios: " + _vm._s(_vm.reports ? _vm.reports[2].dau : 0) + ", android: " + _vm._s(_vm.reports ? _vm.reports[1].dau : 0) + "]")])])])]), _vm._v(" "), _c('div', {
    staticClass: "level-item has-text-centered box"
  }, [_c('div', [_c('p', {
    staticClass: "heading"
  }, [_vm._v(_vm._s(_vm.$t('admin.app.danu')))]), _vm._v(" "), _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.reports ? _vm.reports[0].danu : 0) + "\n          "), _c('sub', [_vm._v("[ios: " + _vm._s(_vm.reports ? _vm.reports[2].danu : 0) + ", android: " + _vm._s(_vm.reports ? _vm.reports[1].danu : 0) + "]")])])])]), _vm._v(" "), _c('div', {
    staticClass: "level-item has-text-centered box"
  }, [_c('div', [_c('p', {
    staticClass: "heading"
  }, [_vm._v(_vm._s(_vm.$t('admin.app.dapu')))]), _vm._v(" "), _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.reports ? _vm.reports[0].dapu : 0) + "\n          "), _c('sub', [_vm._v("[ios: " + _vm._s(_vm.reports ? _vm.reports[2].dapu : 0) + ", android: " + _vm._s(_vm.reports ? _vm.reports[1].dapu : 0) + "]")])])])]), _vm._v(" "), _c('div', {
    staticClass: "level-item has-text-centered box"
  }, [_c('div', [_c('p', {
    staticClass: "heading"
  }, [_vm._v(_vm._s(_vm.$t('admin.app.danpu')))]), _vm._v(" "), _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.reports ? _vm.reports[0].danpu : 0) + "\n          "), _c('sub', [_vm._v("[ios: " + _vm._s(_vm.reports ? _vm.reports[2].danpu : 0) + ", android: " + _vm._s(_vm.reports ? _vm.reports[1].danpu : 0) + "]")])])])])]), _vm._v(" "), _c('nav', {
    staticClass: "level"
  }, [_c('div', {
    staticClass: "level-item has-text-centered box"
  }, [_c('div', [_c('p', {
    staticClass: "heading"
  }, [_vm._v(_vm._s(_vm.$t('admin.app.dad')))]), _vm._v(" "), _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.reports ? _vm.reports[0].dad : 0) + "\n          "), _c('sub', [_vm._v("[ios: " + _vm._s(_vm.reports ? _vm.reports[2].dad : 0) + ", android: " + _vm._s(_vm.reports ? _vm.reports[1].dad : 0) + "]")])])])]), _vm._v(" "), _c('div', {
    staticClass: "level-item has-text-centered box"
  }, [_c('div', [_c('p', {
    staticClass: "heading"
  }, [_vm._v(_vm._s(_vm.$t('admin.app.dand')))]), _vm._v(" "), _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.reports ? _vm.reports[0].dand : 0) + "\n          "), _c('sub', [_vm._v("[ios: " + _vm._s(_vm.reports ? _vm.reports[2].dand : 0) + ", android: " + _vm._s(_vm.reports ? _vm.reports[1].dand : 0) + "]")])])])]), _vm._v(" "), _c('div', {
    staticClass: "level-item has-text-centered box"
  }, [_c('div', [_c('p', {
    staticClass: "heading"
  }, [_vm._v(_vm._s(_vm.$t('admin.app.totalFee')))]), _vm._v(" "), _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.reports ? _vm.reports[0].total_fee : 0) + "\n          "), _c('sub', [_vm._v("[ios: " + _vm._s(_vm.reports ? _vm.reports[2].total_fee : 0) + ", android: " + _vm._s(_vm.reports ? _vm.reports[1].total_fee : 0) + "]")])])])]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('article', {
    staticClass: "tile box chart",
    staticStyle: {
      "height": "400px"
    }
  }, [_c('bar-chart', {
    ref: "chart",
    attrs: {
      "options": _vm.options,
      "width": '100%'
    }
  })], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "level-item has-text-centered box"
  }, [_c('div', [_c('p', {
    staticClass: "heading"
  }, [_vm._v(" ")]), _vm._v(" "), _c('p', {
    staticClass: "title",
    staticStyle: {
      "color": "white"
    }
  }, [_vm._v("0\n          "), _c('sub', {
    staticStyle: {
      "color": "white"
    }
  }, [_vm._v("[ios: 0, android: 0]")])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-650bf2ff", module.exports)
  }
}

/***/ }),
/* 1621 */,
/* 1622 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('router-view')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-66b4628b", module.exports)
  }
}

/***/ }),
/* 1623 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    attrs: {
      "name": "basicInfo"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "columns is-multiline"
  }, [(_vm.app.id) ? _c('div', {
    staticClass: "column is-12"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.appId')) + ": ")]), _vm._v(" "), _c('div', {
    staticClass: "field has-addons"
  }, [_c('p', {
    staticClass: "control flex-take-rest"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.id),
      expression: "app.id",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input disabled",
    attrs: {
      "disabled": "",
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.id)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.id = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "control flex-fixed-size"
  }, [_c('a', {
    directives: [{
      name: "clipboard",
      rawName: "v-clipboard:copy",
      value: (_vm.app.id),
      expression: "app.id",
      arg: "copy"
    }, {
      name: "clipboard",
      rawName: "v-clipboard:success",
      value: (_vm.toastClipboardSuccess),
      expression: "toastClipboardSuccess",
      arg: "success"
    }],
    staticClass: "button",
    staticStyle: {
      "margin": "2px"
    }
  }, [_vm._m(0), _vm._v(" "), _c('span', [_vm._v(" " + _vm._s(_vm.$t('admin.copy')) + " ")])])])])]) : _vm._e(), _vm._v(" "), (_vm.app.id) ? _c('div', {
    staticClass: "column is-12"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.appKey')) + ": ")]), _vm._v(" "), _c('div', {
    staticClass: "field has-addons"
  }, [_c('p', {
    staticClass: "control flex-take-rest"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.secret),
      expression: "app.secret",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input disabled",
    attrs: {
      "disabled": "",
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.secret)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.secret = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "control flex-fixed-size"
  }, [_c('a', {
    directives: [{
      name: "clipboard",
      rawName: "v-clipboard:copy",
      value: (_vm.app.secret),
      expression: "app.secret",
      arg: "copy"
    }, {
      name: "clipboard",
      rawName: "v-clipboard:success",
      value: (_vm.toastClipboardSuccess),
      expression: "toastClipboardSuccess",
      arg: "success"
    }],
    staticClass: "button",
    staticStyle: {
      "margin": "2px"
    }
  }, [_vm._m(1), _vm._v(" "), _c('span', [_vm._v(" " + _vm._s(_vm.$t('admin.copy')) + " ")])])])])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.appName')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.name),
      expression: "app.name",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.currency')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('span', {
    staticClass: "select",
    staticStyle: {
      "width": "80%"
    }
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.currency),
      expression: "app.currency",
      modifiers: {
        "trim": true
      }
    }],
    staticStyle: {
      "width": "100%"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.app.currency = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.currencies), function(currency) {
    return _c('option', {
      key: currency,
      domProps: {
        "value": currency
      }
    }, [_vm._v(_vm._s(_vm.$t('admin.currency.' + currency)))])
  }))])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.chaoxinGroupId')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.chaoxin_group_id),
      expression: "app.chaoxin_group_id",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.chaoxin_group_id)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.chaoxin_group_id = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.paymentCallbackUrl')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.payment_callback),
      expression: "app.payment_callback",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.payment_callback)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.payment_callback = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.obtainCodeUrl')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.app.obtain_code_url),
      expression: "app.obtain_code_url",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.app.obtain_code_url)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.app.obtain_code_url = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-2"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.appHasForum')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('toggle-button', {
    attrs: {
      "value": _vm.app.has_forum,
      "color": "#4e9ed8",
      "sync": true,
      "labels": {
        checked: _vm.$t('admin.switchOn'),
        unchecked: _vm.$t('admin.switchOff')
      }
    },
    on: {
      "change": function (x) { return _vm.app.has_forum = x.value; }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "column is-2"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.appHasMall')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('toggle-button', {
    attrs: {
      "value": _vm.app.has_mall,
      "color": "#4e9ed8",
      "sync": true,
      "labels": {
        checked: _vm.$t('admin.switchOn'),
        unchecked: _vm.$t('admin.switchOff')
      }
    },
    on: {
      "change": function (x) { return _vm.app.has_mall = x.value; }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "column is-2"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.appRestrictLogin')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('toggle-button', {
    attrs: {
      "value": _vm.app.restrict_login,
      "color": "#4e9ed8",
      "sync": true,
      "labels": {
        checked: _vm.$t('admin.switchOn'),
        unchecked: _vm.$t('admin.switchOff')
      }
    },
    on: {
      "change": function (x) { return _vm.app.restrict_login = x.value; }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "column is-2"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.appCanAssignCode')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('toggle-button', {
    attrs: {
      "value": _vm.app.can_assign_code,
      "color": "#4e9ed8",
      "sync": true,
      "labels": {
        checked: _vm.$t('admin.switchOn'),
        unchecked: _vm.$t('admin.switchOff')
      }
    },
    on: {
      "change": function (x) { return _vm.app.can_assign_code = x.value; }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "column is-3"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.label.wcpDownloadEnabled')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('toggle-button', {
    attrs: {
      "value": _vm.app.wcp_download_enabled,
      "color": "#4e9ed8",
      "sync": true,
      "labels": {
        checked: _vm.$t('admin.switchOn'),
        unchecked: _vm.$t('admin.switchOff')
      }
    },
    on: {
      "change": function (x) { return _vm.app.wcp_download_enabled = x.value; }
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.submit')))])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-clipboard"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-clipboard"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-689d2a8e", module.exports)
  }
}

/***/ }),
/* 1624 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('modal', {
    attrs: {
      "visible": _vm.visible
    }
  }, [_c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "width": "100%",
      "margin-bottom": "10px"
    }
  }, [_c('h5', {
    staticClass: "title is-5"
  }, [_vm._v(_vm._s((_vm.app.name) + " - " + _vm.$t('admin.titles.editSdkInfo', {
    sdk: _vm.$t(("admin.sdks." + _vm.sdk))
  })))])]), _vm._v(" "), _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._l((Object.keys(_vm.binding).reverse()), function(key) {
    return [_c('label', {
      staticClass: "label"
    }, [_vm._v(" " + _vm._s(_vm.$t(("admin.sdks." + _vm.sdk)) + _vm.$t('admin.sdks.assigned') + _vm.$t(("admin.sdks.keys." + key))) + ": ")]), _vm._v(" "), _c('p', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: (_vm.binding[key]),
        expression: "binding[key]",
        modifiers: {
          "trim": true
        }
      }],
      staticClass: "input",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": (_vm.binding[key])
      },
      on: {
        "input": function($event) {
          if ($event.target.composing) { return; }
          var $$exp = _vm.binding,
            $$idx = key;
          if (!Array.isArray($$exp)) {
            _vm.binding[key] = $event.target.value.trim()
          } else {
            $$exp.splice($$idx, 1, $event.target.value.trim())
          }
        },
        "blur": function($event) {
          _vm.$forceUpdate()
        }
      }
    })])]
  }), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.submit')))])])], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-699db419", module.exports)
  }
}

/***/ }),
/* 1625 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('tabs', {
    attrs: {
      "type": "boxed",
      "layout": "top",
      "alignment": "left",
      "size": "normal",
      "only-fade": false
    }
  }, [_c('tab-pane', {
    attrs: {
      "icon": "fa fa-clone",
      "label": _vm.$t('admin.setting.basicInfo')
    }
  }, [_c('basic-info-editor', {
    attrs: {
      "group": "basicInfo"
    }
  })], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-69ca6be7", module.exports)
  }
}

/***/ }),
/* 1626 */,
/* 1627 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mod-body"
  }, [_c('div', {
    staticClass: "toolbar",
    staticStyle: {
      "margin-bottom": "1rem"
    }
  }, [_c('el-radio-group', {
    on: {
      "change": _vm.changeStatsType
    },
    model: {
      value: (_vm.statsType),
      callback: function($$v) {
        _vm.statsType = $$v
      },
      expression: "statsType"
    }
  }, [_c('el-radio-button', {
    attrs: {
      "label": "model"
    }
  }, [_vm._v("机型")]), _vm._v(" "), _c('el-radio-button', {
    attrs: {
      "label": "os"
    }
  }, [_vm._v("操作系统")])], 1), _vm._v(" "), _c('span', {
    staticStyle: {
      "margin-right": "15px"
    }
  }), _vm._v(" "), _c('el-radio-group', {
    on: {
      "change": _vm.changeDateType
    },
    model: {
      value: (_vm.dateType),
      callback: function($$v) {
        _vm.dateType = $$v
      },
      expression: "dateType"
    }
  }, [_c('el-radio-button', {
    attrs: {
      "label": "week"
    }
  }, [_vm._v("最近一周")]), _vm._v(" "), _c('el-radio-button', {
    attrs: {
      "label": "month"
    }
  }, [_vm._v("最近一月")]), _vm._v(" "), _c('el-radio-button', {
    attrs: {
      "label": "custom"
    }
  }, [_vm._v("自定义")])], 1), _vm._v(" "), _c('span', {
    staticStyle: {
      "margin-right": "15px"
    }
  }), _vm._v(" "), _c('el-date-picker', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.dateType == 'custom'),
      expression: "dateType == 'custom'"
    }],
    ref: "datePicker",
    attrs: {
      "type": "daterange",
      "placeholder": "选择日期范围",
      "picker-options": _vm.pickerOptions
    },
    on: {
      "change": _vm.changeDateRange
    },
    model: {
      value: (_vm.dateRange),
      callback: function($$v) {
        _vm.dateRange = $$v
      },
      expression: "dateRange"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "tile is-ancestor is-vertical"
  }, [_c('div', {
    staticClass: "tile"
  }, [_c('div', {
    staticClass: "tile is-4 is-parent"
  }, [_c('div', {
    staticClass: "tile is-child box card is-paddingless"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "card-content"
  }, [_c('pie', {
    ref: "chart",
    attrs: {
      "options": _vm.platformOptions,
      "height": 300,
      "data": _vm.chart_platforms
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "tile is-parent"
  }, [_c('div', {
    staticClass: "tile is-child  box card is-paddingless"
  }, [_c('header', {
    staticClass: "card-header"
  }, [_c('p', {
    staticClass: "card-header-title"
  }, [_vm._v(_vm._s(_vm.statsType == "model" ? "设备机型" : "操作系统") + "\n            ")])]), _vm._v(" "), _c('div', {
    staticClass: "card-content"
  }, [_c('horizontal-bar', {
    ref: "chart2",
    attrs: {
      "options": _vm.modelOptions,
      "height": 300,
      "data": _vm.chart_models
    }
  })], 1)])])]), _vm._v(" "), _c('div', {
    staticClass: "tile is-parent"
  }, [_c('div', {
    staticClass: "tile is-child box is-paddingless"
  }, [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "card-content is-paddingless"
  }, [(_vm.statsType == 'model') ? _c('el-table', {
    key: "tb-model",
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "stripe": "",
      "data": _vm.reports,
      "default-sort": {
        prop: 'count',
        order: 'descending'
      }
    },
    on: {
      "filter-change": _vm.filterMemSize,
      "sort-change": _vm.sortChange
    }
  }, [_c('el-table-column', {
    attrs: {
      "label": "机型",
      "width": "500"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._v("\n                " + _vm._s(scope.row.alias != null ? scope.row.alias : scope.row.model) + "\n              ")]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "total_mem_size",
      "align": "right",
      "label": "内存",
      "width": "180",
      "filters": _vm.mem_filter_opts,
      "filter-multiple": false,
      "column-key": "memSize"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._v("\n                " + _vm._s(_vm._f("bytesToSize")(scope.row.total_mem_size)) + "\n              ")]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "count",
      "label": "数量",
      "align": "right",
      "sortable": "custom",
      "width": "180"
    }
  }), _vm._v(" "), _c('el-table-column')], 1) : _vm._e(), _vm._v(" "), (_vm.statsType == 'os') ? _c('el-table', {
    key: "tb-os",
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "stripe": "",
      "data": _vm.reports,
      "default-sort": {
        prop: 'count',
        order: 'descending'
      }
    },
    on: {
      "sort-change": _vm.sortChange
    }
  }, [_c('el-table-column', {
    attrs: {
      "label": "操作系统",
      "width": "200"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._v("\n                " + _vm._s(scope.row.os != null ? scope.row.os : "") + "\n              ")]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "count",
      "label": "数量",
      "align": "right",
      "sortable": "custom",
      "width": "180"
    }
  }), _vm._v(" "), _c('el-table-column')], 1) : _vm._e(), _vm._v(" "), (_vm.reports && _vm.reports.length > 0) ? _c('div', {
    staticClass: "ele-pagination"
  }, [_c('el-pagination', {
    attrs: {
      "layout": "prev, pager, next",
      "page-count": _vm.total,
      "current-page": _vm.page
    },
    on: {
      "update:currentPage": function($event) {
        _vm.page = $event
      },
      "current-change": _vm.changePage
    }
  })], 1) : _vm._e()], 1)])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "card-header"
  }, [_c('p', {
    staticClass: "card-header-title"
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-mobile"
  })]), _vm._v("设备平台\n            ")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "card-header"
  }, [_c('p', {
    staticClass: "card-header-title"
  }, [_vm._v("明细数据\n          ")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6de5ce03", module.exports)
  }
}

/***/ }),
/* 1628 */,
/* 1629 */,
/* 1630 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mod-body"
  }, [_c('div', {
    staticClass: "toolbar",
    staticStyle: {
      "margin-bottom": "1rem"
    }
  }, [_c('el-radio-group', {
    on: {
      "change": _vm.changePlatform
    },
    model: {
      value: (_vm.platform),
      callback: function($$v) {
        _vm.platform = $$v
      },
      expression: "platform"
    }
  }, [_c('el-radio-button', {
    attrs: {
      "label": "all"
    }
  }, [_vm._v("全部")]), _vm._v(" "), _c('el-radio-button', {
    attrs: {
      "label": "ios"
    }
  }, [_vm._v("iOS")]), _vm._v(" "), _c('el-radio-button', {
    attrs: {
      "label": "android"
    }
  }, [_vm._v("Android")])], 1), _vm._v(" "), _c('span', {
    staticStyle: {
      "margin-right": "15px"
    }
  }), _vm._v(" "), _c('span', {
    staticStyle: {
      "margin-right": "15px"
    }
  }), _vm._v(" "), _c('el-date-picker', {
    ref: "datePicker",
    attrs: {
      "type": "date",
      "placeholder": "选择日期",
      "picker-options": _vm.pickerOptions
    },
    on: {
      "change": _vm.changeDate
    },
    model: {
      value: (_vm.date),
      callback: function($$v) {
        _vm.date = $$v
      },
      expression: "date"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "tile is-ancestor is-vertical"
  }, [_c('div', {
    staticClass: "tile is-parent"
  }, [_c('div', {
    staticClass: "tile is-child  box card is-paddingless"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "card-content"
  }, [_c('bar', {
    ref: "chart2",
    attrs: {
      "options": _vm.modelOptions,
      "height": 300,
      "data": _vm.chart_reports
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "tile is-parent"
  }, [_c('div', {
    staticClass: "tile is-child box is-paddingless"
  }, [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "card-content is-paddingless"
  }, [_c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "stripe": "",
      "data": this.timings
    }
  }, [_c('el-table-column', {
    attrs: {
      "label": "时长",
      "width": "200"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._v("\n                " + _vm._s(_vm.labels[scope.$index]) + "\n              ")]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "启动次数",
      "align": "right",
      "width": "180"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._v("\n                " + _vm._s(scope.row) + "\n              ")]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "启动次数占比",
      "align": "right",
      "width": "180"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._v("\n                " + _vm._s(((scope.row / _vm.timings_total) * 100).toFixed(2) + '%') + "\n              ")]
      }
    }])
  }), _vm._v(" "), _c('el-table-column')], 1)], 1)])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "card-header"
  }, [_c('p', {
    staticClass: "card-header-title"
  }, [_vm._v("使用时长分布\n          ")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "card-header"
  }, [_c('p', {
    staticClass: "card-header-title"
  }, [_vm._v("使用时长分布明细\n          ")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6f8585f7", module.exports)
  }
}

/***/ }),
/* 1631 */,
/* 1632 */,
/* 1633 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "dashboard"
  }, [_c('nav', {
    staticClass: "level"
  }, [_c('div', {
    staticClass: "level-item has-text-centered box"
  }, [_c('div', [_c('p', {
    staticClass: "heading"
  }, [_vm._v(_vm._s(_vm.$t('admin.app.dau')))]), _vm._v(" "), _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.briefStats ? _vm.briefStats.dau.ios + _vm.briefStats.dau.android : 0) + "\n          "), _c('sub', [_vm._v("[ios: " + _vm._s(_vm.briefStats ? _vm.briefStats.dau.ios : 0) + ", android: " + _vm._s(_vm.briefStats ? _vm.briefStats.dau.android : 0) + "]")])])])]), _vm._v(" "), _c('div', {
    staticClass: "level-item has-text-centered box"
  }, [_c('div', [_c('p', {
    staticClass: "heading"
  }, [_vm._v(_vm._s(_vm.$t('admin.app.danu')))]), _vm._v(" "), _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.briefStats ? _vm.briefStats.danu.ios + _vm.briefStats.danu.android : 0) + "\n          "), _c('sub', [_vm._v("[ios: " + _vm._s(_vm.briefStats ? _vm.briefStats.danu.ios : 0) + ", android: " + _vm._s(_vm.briefStats ? _vm.briefStats.danu.android : 0) + "]")])])])]), _vm._v(" "), _c('div', {
    staticClass: "level-item has-text-centered box"
  }, [_c('div', [_c('p', {
    staticClass: "heading"
  }, [_vm._v(_vm._s(_vm.$t('admin.app.totalFee')))]), _vm._v(" "), _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.briefStats ? (_vm.briefStats.fee.ios + _vm.briefStats.fee.android) / 100 : 0) + "\n          "), _c('sub', [_vm._v("[ios: " + _vm._s(_vm.briefStats ? _vm.briefStats.fee.ios / 100 : 0) + ", android: " + _vm._s(_vm.briefStats ? _vm.briefStats.fee.android / 100 : 0) + "]")])])])]), _vm._v(" "), _c('div', {
    staticClass: "level-item has-text-centered box"
  }, [_c('div', [_c('p', {
    staticClass: "heading"
  }, [_vm._v(_vm._s(_vm.$t('admin.app.paidUserNumber')))]), _vm._v(" "), _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.briefStats ? _vm.briefStats.dapu.ios + _vm.briefStats.dapu.android : 0) + "\n          "), _c('sub', [_vm._v("[ios: " + _vm._s(_vm.briefStats ? _vm.briefStats.dapu.ios : 0) + ", android: " + _vm._s(_vm.briefStats ? _vm.briefStats.dapu.android : 0) + "]")])])])])]), _vm._v(" "), _c('article', {
    staticClass: "tile box chart"
  }, [_c('line-chart', {
    ref: "chart",
    attrs: {
      "options": _vm.options,
      "width": '100%'
    }
  })], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-71e3ae9c", module.exports)
  }
}

/***/ }),
/* 1634 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.message) ? _c('el-dialog', {
    staticStyle: {
      "width": "1300px"
    },
    attrs: {
      "title": _vm.title,
      "visible": _vm.visible,
      "modal": false
    },
    on: {
      "update:visible": function($event) {
        _vm.visible = $event
      }
    }
  }, [_c('div', {
    staticClass: "message-body"
  }, _vm._l((_vm.messages), function(msg) {
    return _c('div', {
      staticClass: "talk"
    }, [_c('div', {
      staticClass: "user-info",
      class: {
        'is-right': !msg.from.id
      }
    }, [_vm._v(_vm._s(msg.from.id ? _vm.userName : "系统"))]), _vm._v(" "), _c('div', {
      staticClass: "content box"
    }, [_vm._v(_vm._s(msg.content) + "\n          "), _c('div', {
      staticClass: "datetime"
    }, [_vm._v(_vm._s(_vm._f("formatServerDateTime")(msg.inserted_at)))])])])
  })), _vm._v(" "), _c('div', {
    staticClass: "form"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.content),
      expression: "content"
    }],
    staticClass: "textarea",
    staticStyle: {
      "min-height": "80px"
    },
    attrs: {
      "placeholder": "请输入回复内容"
    },
    domProps: {
      "value": (_vm.content)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.content = $event.target.value
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "field"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button is-primary",
    attrs: {
      "disabled": _vm.content.trim() == '' ? 'disabled' : undefined
    },
    on: {
      "click": _vm.reply
    }
  }, [_vm._v("\n          回复\n        ")])])])]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-72195096", module.exports)
  }
}

/***/ }),
/* 1635 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('modal', {
    attrs: {
      "visible": _vm.visible
    }
  }, [_c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "width": "100%",
      "margin-bottom": "10px"
    }
  }, [_c('h5', {
    staticClass: "title is-5"
  }, [_vm._v(_vm._s(_vm.$t('admin.titles.editSectionInfo')))])]), _vm._v(" "), _c('form', {
    attrs: {
      "name": "section"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.forum.section.title')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.section.title),
      expression: "section.title",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.section.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.section.title = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.forum.section.sort')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.section.sort),
      expression: "section.sort",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "number"
    },
    domProps: {
      "value": (_vm.section.sort)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.section.sort = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('label', {
    staticClass: "checkbox"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.section.active),
      expression: "section.active",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "checkbox",
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.section.active) ? _vm._i(_vm.section.active, null) > -1 : (_vm.section.active)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.section.active,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.section.active = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.section.active = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.section.active = $$c
        }
      }
    }
  }), _vm._v(" " + _vm._s(_vm.$t('admin.forum.active')) + "\n        ")])]), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.submit')))])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7366ac84", module.exports)
  }
}

/***/ }),
/* 1636 */,
/* 1637 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('footer', {
    staticClass: "footer"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "content has-text-centered"
  }, [_c('p')])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7469990e", module.exports)
  }
}

/***/ }),
/* 1638 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "control has-icon has-icon-left"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.keyword),
      expression: "keyword"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('admin.titles.searchMallOrders')
    },
    domProps: {
      "value": (_vm.keyword)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.onSearchBoxSubmit($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.keyword = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon is-small"
  }, [(_vm.searching) ? _c('i', {
    staticClass: "fa fa-spinner fa-spin"
  }) : _c('i', {
    staticClass: "fa fa-search"
  })])]), _vm._v(" "), (_vm.orders.length > 0) ? _c('div', _vm._l((_vm.orders), function(item) {
    return _c('div', {
      staticClass: "media",
      staticStyle: {
        "align-items": "stretch",
        "margin": "1rem auto"
      }
    }, [_c('div', {
      staticClass: "media-left"
    }, [_c('p', [_vm._v(_vm._s(item.id))]), _vm._v(" "), _c('p', [_vm._v(" " + _vm._s(_vm.$t('admin.mall.order.status.' + item.status)))]), _vm._v(" "), _c('p', [_vm._v(" " + _vm._s(_vm._f("formatServerDateTime")(item.inserted_at)))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(item.user.nickname) + "   " + _vm._s(item.user.mobile))])]), _vm._v(" "), _c('div', {
      staticClass: "media-content columns",
      staticStyle: {
        "border": "1px solid grey",
        "margin": "0",
        "padding": "0 1rem"
      }
    }, _vm._l((item.details), function(detail) {
      return _c('div', {
        staticClass: "cloumn"
      }, [_c('div', {
        staticClass: "media",
        staticStyle: {
          "padding-top": "1rem",
          "margin-right": "1rem"
        }
      }, [_c('figure', {
        staticClass: "media-left"
      }, [_c('p', {
        staticClass: "image is-64x64"
      }, [_c('img', {
        staticStyle: {
          "width": "64px",
          "height": "64px"
        },
        attrs: {
          "src": detail.goods_pic
        }
      })])]), _vm._v(" "), _c('div', {
        staticClass: "media-content"
      }, [_c('p', [_vm._v(_vm._s(detail.goods_name) + " ")]), _vm._v(" "), _c('p', {
        class: ['currency', item.currency]
      }, [_vm._v(_vm._s(_vm._f("formatPrice")(detail.price)))]), _vm._v(" "), _c('p', [_vm._v(" X" + _vm._s(detail.amount))])])])])
    })), _vm._v(" "), _c('div', {
      staticClass: "media-right level",
      staticStyle: {
        "width": "220px"
      }
    }, [_c('div', {
      staticClass: "level-item"
    }, [_c('div', [_c('p', [_vm._v(_vm._s(_vm.$t('admin.mall.order.fields.postage')) + ":\n              "), _c('span', {
      class: ['currency', item.currency]
    }, [_vm._v(_vm._s(_vm._f("formatPrice")(item.postage)))])]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.$t('admin.mall.order.fields.total')) + ":\n              "), _c('span', {
      class: ['currency', item.currency]
    }, [_vm._v(_vm._s(_vm._f("formatPrice")(item.price)))])])])]), _vm._v(" "), _c('div', {
      staticClass: "level-item"
    }, [_c('router-link', {
      staticClass: "button",
      attrs: {
        "to": {
          name: 'MallOrderInfo',
          params: {
            orderId: item.id,
            orderInfo: item
          }
        }
      }
    }, [_vm._v(_vm._s(_vm.$t('admin.mall.order.buttons.viewDetail')))])], 1)])])
  })) : _c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "hero-body has-text-centered"
  }, [(_vm.loading || _vm.initing) ? _c('div', {
    staticClass: "container"
  }, [_c('span', {
    staticClass: "icon is-large"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-spin"
  })]), _vm._v(" "), _c('h2', {
    staticClass: "subtitle",
    staticStyle: {
      "margin-top": "20px"
    }
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.loading')) + "\n        ")])]) : _c('div', {
    staticClass: "container"
  }, [_c('h1', {
    staticClass: "title"
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.oops')) + "\n        ")]), _vm._v(" "), _c('h2', {
    staticClass: "subtitle"
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.noOrderToDisplay')) + "\n        ")])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-748d8af4", module.exports)
  }
}

/***/ }),
/* 1639 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.users) ? _c('div', [_c('div', {
    staticClass: "columns is-multiline"
  }, [_c('div', {
    staticClass: "column is-6"
  }, [_c('div', {
    staticClass: "card",
    staticStyle: {
      "min-height": "15rem"
    }
  }, [_c('header', {
    staticClass: "card-header"
  }, [_c('p', {
    staticClass: "card-header-title"
  }, [_c('strong', [_vm._v(_vm._s(_vm.$t('admin.label.appManager')))])]), _vm._v(" "), _c('p', {
    staticClass: "card-header-icon"
  }, [(_vm.level == 1) ? _c('a', {
    staticClass: "button is-info",
    on: {
      "click": function($event) {
        _vm.addAdminUser(2)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('common.add')))]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "card-content"
  }, [_c('div', {
    staticClass: "admin-user"
  }, _vm._l((_vm.users), function(item) {
    return (item.admin_level == 2) ? _c('div', {
      key: item.user.id
    }, [_c('span', {
      staticClass: "tag is-info is-medium"
    }, [_vm._v("\n                " + _vm._s(item.user.nickname) + "\n                "), (_vm.level == 1) ? _c('button', {
      staticClass: "delete is-small",
      on: {
        "click": function($event) {
          _vm.deleteUsers(item)
        }
      }
    }) : _vm._e()])]) : _vm._e()
  }))])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('div', {
    staticClass: "card",
    staticStyle: {
      "min-height": "15rem"
    }
  }, [_c('header', {
    staticClass: "card-header"
  }, [_c('p', {
    staticClass: "card-header-title"
  }, [_c('strong', [_vm._v(_vm._s(_vm.$t('admin.label.appCustomerService')))])]), _vm._v(" "), _c('p', {
    staticClass: "card-header-icon"
  }, [_c('a', {
    staticClass: "button is-info",
    on: {
      "click": function($event) {
        _vm.addAdminUser(3)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('common.add')))])])]), _vm._v(" "), _c('div', {
    staticClass: "card-content"
  }, [_c('div', {
    staticClass: "admin-user"
  }, _vm._l((_vm.users), function(item) {
    return (item.admin_level == 3) ? _c('div', {
      key: item.user.id,
      staticClass: "level-item"
    }, [_c('span', {
      staticClass: "tag is-info is-medium"
    }, [_vm._v("\n                " + _vm._s(item.user.nickname) + "\n                "), _c('button', {
      staticClass: "delete is-small",
      on: {
        "click": function($event) {
          _vm.deleteUsers(item)
        }
      }
    })])]) : _vm._e()
  }))])])])])]) : _c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "hero-body has-text-centered"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('span', {
    staticClass: "icon is-large"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-spin"
  })]), _vm._v(" "), _c('h2', {
    staticClass: "subtitle",
    staticStyle: {
      "margin-top": "20px"
    }
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.loading')) + "\n        ")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-74d9c56a", module.exports)
  }
}

/***/ }),
/* 1640 */,
/* 1641 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor"
  }, [_c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('div', {
    staticClass: "column"
  }, [_c('a', {
    staticClass: "button is-primary",
    staticStyle: {
      "min-width": "100px"
    },
    on: {
      "click": _vm.addPoint
    }
  }, [_c('i', {
    staticClass: "fa fa-plus",
    staticStyle: {
      "margin-right": "5px"
    }
  }), _vm._v(" " + _vm._s(_vm.$t('admin.point.add')) + "\n        ")])])]), _vm._v(" "), _c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('div', {
    staticClass: "table-responsive"
  }, [_c('div', {
    staticClass: "columns is-gapless has-text-centered",
    staticStyle: {
      "border-bottom": "1px solid #ccc",
      "padding": "5px",
      "color": "#aaa"
    }
  }, [_c('div', {
    staticClass: "column"
  }, [_c('p', [_vm._v(_vm._s(_vm.$t('admin.point.id')))])]), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_c('p', [_vm._v(_vm._s(_vm.$t('admin.point.user')))])]), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_c('p', [_vm._v(_vm._s(_vm.$t('admin.point.log_type')))])]), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_c('p', [_vm._v(_vm._s(_vm.$t('admin.point.point')))])]), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_c('p', [_vm._v(_vm._s(_vm.$t('admin.point.memo')))])]), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_c('p', [_vm._v(_vm._s(_vm.$t('admin.point.inserted_at')))])])]), _vm._v(" "), (_vm.logs) ? _c('div', _vm._l((_vm.logs), function(log, index) {
    return _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.logs && _vm.logs.length > 0),
        expression: "logs && logs.length > 0"
      }],
      key: log.id,
      staticClass: "columns has-text-centered",
      staticStyle: {
        "border-bottom": "1px solid #ccc"
      }
    }, [_c('div', {
      staticClass: "column"
    }, [_c('p', [_vm._v(_vm._s(log.id))])]), _vm._v(" "), _c('div', {
      staticClass: "column"
    }, [_c('p', [_vm._v(_vm._s(log.user_id))])]), _vm._v(" "), _c('div', {
      staticClass: "column"
    }, [_c('p', [_vm._v(_vm._s(log.log_type))])]), _vm._v(" "), _c('div', {
      staticClass: "column"
    }, [_c('p', [_vm._v(_vm._s(log.point))])]), _vm._v(" "), _c('div', {
      staticClass: "column"
    }, [_c('p', [_vm._v(_vm._s(log.memo))])]), _vm._v(" "), _c('div', {
      staticClass: "column"
    }, [_c('p', [_vm._v(_vm._s(_vm._f("formatServerDateTime")(log.inserted_at)))])])])
  })) : _vm._e()])]), _vm._v(" "), _c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('pagination', {
    attrs: {
      "page-count": _vm.total,
      "current-page": _vm.page,
      "on-page-change": _vm.onPageChange
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-775b845e", module.exports)
  }
}

/***/ }),
/* 1642 */,
/* 1643 */,
/* 1644 */,
/* 1645 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('nav', {
    staticClass: "level app-levelbar"
  }, [_c('div', {
    staticClass: "level-left"
  }, [_c('div', {
    staticClass: "level-item"
  }, [_c('h3', {
    staticClass: "subtitle is-5"
  }, [_c('strong', [_vm._v(_vm._s(_vm.$t('admin.routes.' + _vm.name)))])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7aef0b9e", module.exports)
  }
}

/***/ }),
/* 1646 */,
/* 1647 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.app && _vm.app.has_mall) ? [_c('tabs', {
    ref: "tab",
    attrs: {
      "type": "boxed",
      "layout": "top",
      "alignment": "left",
      "size": "normal",
      "only-fade": false
    },
    on: {
      "tab-selected": _vm.tabSelected
    }
  }, [_c('tab-pane', {
    attrs: {
      "icon": "fa fa-clone",
      "label": _vm.$t('admin.mall.basicInfo')
    }
  }, [(_vm.mall) ? _c('basic-info-editor', {
    attrs: {
      "mall": _vm.mall
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('tab-pane', {
    attrs: {
      "icon": "fa fa-shopping-cart",
      "label": _vm.$t('admin.mall.goodsInfo')
    }
  }, [(_vm.mall) ? _c('goods-info-editor', {
    attrs: {
      "mall": _vm.mall
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('tab-pane', {
    attrs: {
      "icon": "fa fa-star",
      "label": _vm.$t('admin.mall.orderInfo')
    }
  }, [(_vm.mall) ? _c('order-info-editor', {
    attrs: {
      "mall": _vm.mall
    }
  }) : _vm._e()], 1)], 1)] : [_c('p', [_vm._v("\n      " + _vm._s(_vm.$t('admin.mall.not_open')) + "\n    ")])]], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7fcb2577", module.exports)
  }
}

/***/ }),
/* 1648 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    attrs: {
      "name": "params"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "columns is-multiline"
  }, [_c('div', {
    staticClass: "column is-10"
  }, [_c('div', {
    staticClass: "field has-addons",
    staticStyle: {
      "margin-bottom": "0"
    }
  }, [_c('label', {
    staticClass: "label flex-take-rest"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.subscribedResponse')) + ": ")]), _vm._v(" "), _c('div', {
    staticClass: "field has-addons flex-fixed-size"
  }, [_c('p', {
    staticClass: "flex-take-rest",
    staticStyle: {
      "padding-right": "0.5rem"
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.userLoginCode')) + " ")])]), _vm._v(" "), _c('p', {
    staticClass: "flex-fixed-size"
  }, [_c('toggle-button', {
    attrs: {
      "value": _vm.wcpParams.subscribed_response == this.loginCode,
      "color": "#4e9ed8",
      "sync": true,
      "labels": {
        checked: _vm.$t('admin.switchOn'),
        unchecked: _vm.$t('admin.switchOff')
      }
    },
    on: {
      "change": function (x) { return _vm.setLoginCode(1, x); }
    }
  })], 1)])]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.subscribed_response),
      expression: "wcpParams.subscribed_response",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "disabled": _vm.wcpParams.subscribed_response == this.loginCode,
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.subscribed_response)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.subscribed_response = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('div', {
    staticClass: "field has-addons",
    staticStyle: {
      "margin-bottom": "0"
    }
  }, [_c('label', {
    staticClass: "label flex-take-rest"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.scanResponse')) + ": ")]), _vm._v(" "), _c('div', {
    staticClass: "field has-addons flex-fixed-size"
  }, [_c('p', {
    staticClass: "flex-take-rest",
    staticStyle: {
      "padding-right": "0.5rem"
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.userLoginCode')) + " ")])]), _vm._v(" "), _c('p', {
    staticClass: "flex-fixed-size"
  }, [_c('toggle-button', {
    attrs: {
      "value": _vm.wcpParams.scan_response == this.loginCode,
      "color": "#4e9ed8",
      "sync": true,
      "labels": {
        checked: _vm.$t('admin.switchOn'),
        unchecked: _vm.$t('admin.switchOff')
      }
    },
    on: {
      "change": function (x) { return _vm.setLoginCode(2, x); }
    }
  })], 1)])]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.scan_response),
      expression: "wcpParams.scan_response",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "disabled": _vm.wcpParams.scan_response == this.loginCode,
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.scan_response)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.scan_response = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('div', {
    staticClass: "field has-addons",
    staticStyle: {
      "margin-bottom": "0"
    }
  }, [_c('label', {
    staticClass: "label flex-take-rest"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.defaultResponse')) + ": ")]), _vm._v(" "), _c('div', {
    staticClass: "field has-addons flex-fixed-size"
  }, [_c('p', {
    staticClass: "flex-take-rest",
    staticStyle: {
      "padding-right": "0.5rem"
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.userLoginCode')) + " ")])]), _vm._v(" "), _c('p', {
    staticClass: "flex-fixed-size"
  }, [_c('toggle-button', {
    attrs: {
      "value": _vm.wcpParams.default_response == this.loginCode,
      "color": "#4e9ed8",
      "sync": true,
      "labels": {
        checked: _vm.$t('admin.switchOn'),
        unchecked: _vm.$t('admin.switchOff')
      }
    },
    on: {
      "change": function (x) { return _vm.setLoginCode(3, x); }
    }
  })], 1)])]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.default_response),
      expression: "wcpParams.default_response",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "disabled": _vm.wcpParams.default_response == this.loginCode,
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.default_response)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.default_response = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10 has-text-centered"
  }, [_c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.submit')))])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-804f4294", module.exports)
  }
}

/***/ }),
/* 1649 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor"
  }, [_c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('div', {
    staticClass: "column"
  }, [_c('router-link', {
    staticClass: "button is-primary pull-left",
    attrs: {
      "to": {
        name: 'WcpEditRule',
        params: {
          rule: {
            id: '',
            keywords: '',
            response: '',
            app_id: this.$route.params.appId,
          }
        }
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small",
    staticStyle: {
      "margin-right": "5px"
    }
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]), _vm._v(" " + _vm._s(_vm.$t('admin.wcp.addRule')) + "\n        ")])], 1)]), _vm._v(" "), _c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('div', {
    staticClass: "table-responsive"
  }, [_c('table', {
    staticClass: "table is-bordered is-striped is-narrow goods-table"
  }, [_c('thead', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.rules && _vm.rules.length > 0),
      expression: "rules && rules.length > 0"
    }]
  }, [_c('tr', [_c('th', [_vm._v(_vm._s(_vm.$t('admin.wcp.id')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.wcp.keywords')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.wcp.response')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.wcp.createdAt')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.wcp.edit')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.wcp.operate')))])])]), _vm._v(" "), _c('tbody', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.rules && _vm.rules.length > 0),
      expression: "rules && rules.length > 0"
    }]
  }, _vm._l((_vm.rules), function(rule, index) {
    return _c('tr', {
      key: rule.id
    }, [_c('td', [_vm._v(" " + _vm._s(rule.id) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(rule.keywords) + " ")]), _vm._v(" "), _c('td', {
      staticStyle: {
        "max-width": "400px"
      }
    }, [_vm._v(" " + _vm._s(rule.response) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(_vm._f("formatServerDateTime")(rule.inserted_at)) + " ")]), _vm._v(" "), _c('td', {
      staticClass: "is-icon"
    }, [_c('a', {
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.editRule(rule, index)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-pencil"
    })])]), _vm._v(" "), _c('td', {
      staticClass: "is-icon"
    }, [_c('a', {
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.deleteRule(rule, index)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-trash-o"
    })])])])
  }))])])]), _vm._v(" "), _c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('pagination', {
    attrs: {
      "page-count": _vm.total,
      "current-page": _vm.page,
      "on-page-change": _vm.onPageChange
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-80e41a06", module.exports)
  }
}

/***/ }),
/* 1650 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('tabs', {
    attrs: {
      "type": "boxed",
      "layout": "top",
      "alignment": "left",
      "size": "normal",
      "only-fade": false
    }
  }, [_c('tab-pane', {
    attrs: {
      "icon": "fa fa-clone",
      "label": _vm.$t('admin.app.basicInfo')
    }
  }, [(_vm.app) ? _c('basic-info-editor', {
    attrs: {
      "app": _vm.app
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('tab-pane', {
    attrs: {
      "icon": "fa fa-support",
      "label": _vm.$t('admin.app.sdkInfo')
    }
  }, [(_vm.app) ? _c('sdk-info-editor', {
    attrs: {
      "app": _vm.app
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('tab-pane', {
    attrs: {
      "icon": "fa fa-shopping-cart",
      "label": _vm.$t('admin.app.goodsInfo')
    }
  }, [(_vm.app) ? _c('goods-info-editor', {
    attrs: {
      "app": _vm.app
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('tab-pane', {
    attrs: {
      "icon": "fa fa-shopping-cart",
      "label": _vm.$t('admin.app.linkInfo')
    }
  }, [(_vm.app) ? _c('link-editor', {
    attrs: {
      "app": _vm.app
    }
  }) : _vm._e()], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-85d36ff8", module.exports)
  }
}

/***/ }),
/* 1651 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor"
  }, [_c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('div', {
    staticClass: "column"
  }, [_c('router-link', {
    staticClass: "button is-primary pull-left",
    attrs: {
      "to": {
        name: 'EditNews',
        params: {
          news: {
            id: '',
            title: '',
            group: 'notice',
            content: '',
            app_id: this.$route.params.appId,
          }
        }
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small",
    staticStyle: {
      "margin-right": "5px"
    }
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]), _vm._v(_vm._s(_vm.$t('admin.news.notice.add')) + "\n        ")])], 1)]), _vm._v(" "), _c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('div', {
    staticClass: "table-responsive"
  }, [_c('table', {
    staticClass: "table is-bordered is-striped is-narrow goods-table"
  }, [_c('thead', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.newses && _vm.newses.length > 0),
      expression: "newses && newses.length > 0"
    }]
  }, [_c('tr', [_c('th', [_vm._v(_vm._s(_vm.$t('admin.news.id')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.title')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.created_at')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.active')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.edit')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.news.operate')))])])]), _vm._v(" "), _c('tbody', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.newses && _vm.newses.length > 0),
      expression: "newses && newses.length > 0"
    }]
  }, _vm._l((_vm.newses), function(news, index) {
    return _c('tr', [_c('td', [_vm._v(" " + _vm._s(news.id) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(news.title) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(_vm._f("formatServerDateTime")(news.inserted_at)) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(news.active ? _vm.$t('admin.news.publishEd') : _vm.$t('admin.news.unPublish')) + " ")]), _vm._v(" "), _c('td', {
      staticClass: "is-icon"
    }, [_c('a', {
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.editNewsInfo(news, index)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-pencil"
    })])]), _vm._v(" "), _c('td', {
      staticClass: "is-icon"
    }, [_c('a', {
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.toggleStatus(news)
        }
      }
    }, [_c('i', {
      staticClass: "fa",
      class: news.active ? 'fa-trash-o' : 'fa-check'
    })])])])
  }))])])]), _vm._v(" "), _c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('pagination', {
    attrs: {
      "page-count": _vm.total,
      "current-page": _vm.page,
      "on-page-change": _vm.onPageChange
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8833b6da", module.exports)
  }
}

/***/ }),
/* 1652 */,
/* 1653 */,
/* 1654 */,
/* 1655 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('modal', {
    attrs: {
      "visible": _vm.visible
    }
  }, [_c('div', {
    staticClass: "tile box is-ancestor is-vertical file-upload-modal has-text-centered",
    staticStyle: {
      "padding": "10px",
      "margin": "0"
    }
  }, [_c('div', {
    staticClass: "tile is-parent is-full is-vertical"
  }, [_c('article', {
    staticClass: "tile is-child file-upload-container"
  }, [_c('file-upload', {
    ref: "upload",
    staticClass: "file-upload",
    class: _vm.file ? 'file-selected' : '',
    attrs: {
      "name": _vm.name,
      "title": _vm.title,
      "drop": true,
      "accept": _vm.accept,
      "multiple": false,
      "headers": _vm.headers,
      "data": _vm.data,
      "size": _vm.maxFileSize,
      "timeout": 60000,
      "postAction": _vm.postAction,
      "extensions": _vm.extensions,
      "events": _vm.uploadEvents
    }
  })], 1)]), _vm._v(" "), (_vm.file) ? _c('div', {
    staticClass: "columns is-full is-gapless is-multiline is-mobile",
    staticStyle: {
      "margin-bottom": "0.5rem"
    }
  }, [_c('div', {
    staticClass: "column has-text-right is-2",
    staticStyle: {
      "margin-right": "0.5rem"
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('upload.filename')) + ":")])]), _vm._v(" "), _c('div', {
    staticClass: "column has-text-left is-9"
  }, [_c('label', {
    staticClass: "field-label is-small"
  }, [_vm._v(_vm._s(_vm.file.name))])]), _vm._v(" "), _c('div', {
    staticClass: "column has-text-right is-2",
    staticStyle: {
      "margin-right": "0.5rem"
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('upload.filesize')) + ":")])]), _vm._v(" "), _c('div', {
    staticClass: "column has-text-left is-9"
  }, [_c('label', {
    staticClass: "field-label is-small"
  }, [_vm._v(_vm._s(_vm._f("humanReadableSize")(_vm.file.size)))])]), _vm._v(" "), (_vm.file.active) ? [_c('div', {
    staticClass: "column has-text-right is-2",
    staticStyle: {
      "margin-right": "0.5rem"
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('upload.progress')) + ":")])]), _vm._v(" "), _c('div', {
    staticClass: "column has-text-left is-9"
  }, [_c('div', {
    staticClass: "control",
    staticStyle: {
      "padding-top": "0.375em"
    }
  }, [_c('progress', {
    staticClass: "progress is-small is-info",
    staticStyle: {
      "margin-top": "0.375em"
    },
    attrs: {
      "value": _vm.file.progress,
      "max": "100"
    }
  }, [_vm._v("\n            " + _vm._s(_vm.file.progress) + "%\n            ")])])])] : _vm._e(), _vm._v(" "), (_vm.file.active) ? [_c('div', {
    staticClass: "column has-text-right is-2",
    staticStyle: {
      "margin-right": "0.5rem"
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(_vm._s(_vm.$t('upload.speed')) + ":")])]), _vm._v(" "), _c('div', {
    staticClass: "column has-text-left is-9"
  }, [_c('label', {
    staticClass: "field-label is-small"
  }, [_vm._v(_vm._s(_vm._f("humanReadableSize")(_vm.file.speed)))])])] : _vm._e()], 2) : _vm._e(), _vm._v(" "), _c('p', {
    staticClass: "is-danger"
  }, [_vm._v(_vm._s(this.errorMessage))]), _vm._v(" "), _c('div', {
    staticClass: "tile is-child is-full has-text-centered"
  }, [_c('a', {
    staticClass: "button is-info",
    class: {
      'is-disabled': !_vm.file || _vm.file.success || _vm.file.active,
        'is-loading': _vm.upload && _vm.upload.active
    },
    attrs: {
      "disabled": !_vm.file || _vm.file.success || _vm.file.active
    },
    on: {
      "click": function($event) {
        _vm.upload.active = true
      }
    }
  }, [_c('span', {
    staticClass: "icon image-icon icon-upload"
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('upload.title')))])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-90fcaa5c", module.exports)
  }
}

/***/ }),
/* 1656 */,
/* 1657 */,
/* 1658 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    attrs: {
      "name": "params"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "columns is-multiline"
  }, [_c('div', {
    staticClass: "column is-10"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.download_disabled_template')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.download_disabled_template),
      expression: "wcpParams.download_disabled_template",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.download_disabled_template)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.download_disabled_template = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.android_download_template')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.android_download_template),
      expression: "wcpParams.android_download_template",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.android_download_template)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.android_download_template = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.tf_download_template')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.tf_download_template),
      expression: "wcpParams.tf_download_template",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.tf_download_template)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.tf_download_template = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.tf_download_no_login_code_template')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.tf_download_no_login_code_template),
      expression: "wcpParams.tf_download_no_login_code_template",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.tf_download_no_login_code_template)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.tf_download_no_login_code_template = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.tf_download_email_received_template')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.tf_download_email_received_template),
      expression: "wcpParams.tf_download_email_received_template",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.tf_download_email_received_template)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.tf_download_email_received_template = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.tf_invalid_email_template')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.tf_invalid_email_template),
      expression: "wcpParams.tf_invalid_email_template",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.tf_invalid_email_template)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.tf_invalid_email_template = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.tf_email_used_template')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.tf_email_used_template),
      expression: "wcpParams.tf_email_used_template",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.tf_email_used_template)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.tf_email_used_template = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.tf_already_invited_template')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.tf_already_invited_template),
      expression: "wcpParams.tf_already_invited_template",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.tf_already_invited_template)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.tf_already_invited_template = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.new_tf_email_template')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.new_tf_email_template),
      expression: "wcpParams.new_tf_email_template",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.new_tf_email_template)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.new_tf_email_template = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.tf_invite_failed_template')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.tf_invite_failed_template),
      expression: "wcpParams.tf_invite_failed_template",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.tf_invite_failed_template)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.tf_invite_failed_template = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.update_tf_email_template')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.update_tf_email_template),
      expression: "wcpParams.update_tf_email_template",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.update_tf_email_template)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.update_tf_email_template = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.tf_tester_full_template')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.tf_tester_full_template),
      expression: "wcpParams.tf_tester_full_template",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.tf_tester_full_template)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.tf_tester_full_template = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10 has-text-centered"
  }, [_c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.submit')))])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9c18d3e4", module.exports)
  }
}

/***/ }),
/* 1659 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('modal', {
    attrs: {
      "visible": _vm.visible
    }
  }, [_c('div', {
    staticClass: "box has-text-centered"
  }, [_c('h5', {
    staticClass: "title is-5"
  }, [_vm._v(_vm._s(_vm.appName + " - " + _vm.$t('admin.titles.selectSdk')))]), _vm._v(" "), _c('div', {
    staticClass: "columns is-multiline"
  }, _vm._l((_vm.sdks), function(sdk) {
    return _c('div', {
      staticClass: "column is-2 has-text-centered"
    }, [_c('div', {
      staticClass: "sdk-icon",
      class: sdk,
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.selectSdk(sdk)
        }
      }
    }), _vm._v(" "), _c('h6', {
      staticClass: "subtitle is-6"
    }, [_vm._v(_vm._s(_vm.$t(("admin.sdks." + sdk))) + " ")])])
  }))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a190efee", module.exports)
  }
}

/***/ }),
/* 1660 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('modal', {
    attrs: {
      "visible": _vm.visible
    }
  }, [_c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "heading has-text-centered"
  }, [_c('h1', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.title))])]), _vm._v(" "), _c('article', {
    staticClass: "media"
  }, [_c('div', {
    staticClass: "media-content"
  }, [_c('div', {
    staticClass: "content"
  }, [_c('p', {
    staticClass: "code-tip",
    domProps: {
      "innerHTML": _vm._s(_vm.message)
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered"
  }, [_c('a', {
    staticClass: "button is-primary",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.visible = false
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.cancelTitle) + "\n      ")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a2cf9274", module.exports)
  }
}

/***/ }),
/* 1661 */,
/* 1662 */,
/* 1663 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    attrs: {
      "name": "basicInfo"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a80b38ca", module.exports)
  }
}

/***/ }),
/* 1664 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "control has-icon has-icon-left"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.keyword),
      expression: "keyword"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('admin.titles.searchGoods')
    },
    domProps: {
      "value": (_vm.keyword)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.onSearchBoxSubmit($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.keyword = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon is-small"
  }, [(_vm.searching) ? _c('i', {
    staticClass: "fa fa-spinner fa-spin"
  }) : _c('i', {
    staticClass: "fa fa-search"
  })])]), _vm._v(" "), _c('router-link', {
    staticClass: "button is-primary pull-right",
    attrs: {
      "to": {
        name: 'EditGoods',
        params: {
          goodsId: '',
          currency: _vm.currency
        }
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small",
    staticStyle: {
      "margin-right": "5px"
    }
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]), _vm._v(_vm._s(_vm.$t('admin.mall.goods.add')) + "\n  ")]), _vm._v(" "), (_vm.goodses.length > 0) ? _c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('div', {
    staticClass: "columns is-multiline"
  }, _vm._l((_vm.goodses), function(goods, index) {
    return _c('div', {
      staticClass: "column is-half"
    }, [_c('div', {
      staticClass: "columns"
    }, [_c('div', {
      staticClass: "column is-parent is-one-third"
    }, [_c('figure', {
      staticClass: "image",
      staticStyle: {
        "display": "block"
      }
    }, [(goods.pic) ? _c('img', {
      staticStyle: {
        "width": "120px",
        "height": "120px"
      },
      attrs: {
        "src": goods.pic.split('|')[0] ? goods.pic.split('|')[0] : 'https://placehold.it/256x256?text=未上传'
      }
    }) : _c('img', {
      staticStyle: {
        "width": "120px",
        "height": "120px"
      },
      attrs: {
        "src": "https://placehold.it/256x256?text=未上传"
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "column is-parent is-vertical"
    }, [_c('article', {
      staticClass: "tile is-child"
    }, [_c('p', {
      staticClass: "subtitle is-6"
    }, [_vm._v(_vm._s(goods.name))]), _vm._v(" "), _c('p', {
      staticClass: "subtitle is-6"
    }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.priceList', {
      price: _vm.getPrice(goods.price),
      postage: _vm.getPrice(goods.postage)
    })) + "\n              ")]), _vm._v(" "), _c('p', {
      staticClass: "subtitle is-6"
    }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.stockList', {
      stock: goods.stock,
      sold: goods.sold
    })))]), _vm._v(" "), _c('p', {
      staticClass: "field"
    }, [(goods.active == true) ? _c('span', {
      staticClass: "tag is-primary"
    }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.up')) + " ")]) : _c('span', {
      staticClass: "tag is-dark"
    }, [_vm._v(_vm._s(_vm.$t('admin.mall.goods.down')))]), _vm._v(" "), _c('a', {
      staticClass: "button is-small",
      on: {
        "click": function($event) {
          _vm.onEdit(goods.id)
        }
      }
    }, [_vm._m(0, true), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('admin.mall.goods.edit')))])]), _vm._v(" "), _c('a', {
      staticClass: "button is-small",
      on: {
        "click": function($event) {
          _vm.onDelete(goods, index)
        }
      }
    }, [_vm._m(1, true), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.$t('admin.mall.goods.delete')))])])])])])])])
  })), _vm._v(" "), _c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('pagination', {
    attrs: {
      "page-count": _vm.total,
      "current-page": _vm.page,
      "on-page-change": _vm.onPageChange
    }
  })], 1)]) : _c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "hero-body has-text-centered"
  }, [(_vm.loading) ? _c('div', {
    staticClass: "container"
  }, [_c('span', {
    staticClass: "icon is-large"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-spin"
  })]), _vm._v(" "), _c('h2', {
    staticClass: "subtitle",
    staticStyle: {
      "margin-top": "20px"
    }
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.loading')) + "\n        ")])]) : _c('div', {
    staticClass: "container"
  }, [_c('h1', {
    staticClass: "title"
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.oops')) + "\n        ")]), _vm._v(" "), _c('h2', {
    staticClass: "subtitle"
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.noGoodsToDisplay')) + "\n        ")])])])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-pencil"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-close"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-adca2608", module.exports)
  }
}

/***/ }),
/* 1665 */,
/* 1666 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('modal', {
    attrs: {
      "visible": _vm.visible
    }
  }, [_c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "width": "100%",
      "margin-bottom": "10px"
    }
  }, [_c('h5', {
    staticClass: "title is-5"
  }, [_vm._v(_vm._s(_vm.$t('admin.point.add')))])]), _vm._v(" "), _c('form', {
    attrs: {
      "name": "pointLog"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.point.user_id')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.pointLog.user_id),
      expression: "pointLog.user_id",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.pointLog.user_id)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.pointLog.user_id = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.point.point')) + "(扣分请输入负数): ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.pointLog.point),
      expression: "pointLog.point",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "number"
    },
    domProps: {
      "value": (_vm.pointLog.point)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.pointLog.point = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.point.memo')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.pointLog.memo),
      expression: "pointLog.memo",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.pointLog.memo)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.pointLog.memo = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-top": "15px"
    }
  }, [_c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.submit')))])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-afde43a4", module.exports)
  }
}

/***/ }),
/* 1667 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.app && _vm.app.has_forum) ? [_c('tabs', {
    attrs: {
      "type": "boxed",
      "layout": "top",
      "alignment": "left",
      "size": "normal",
      "only-fade": false
    }
  }, [_c('tab-pane', {
    attrs: {
      "icon": "fa fa-clone",
      "label": _vm.$t('admin.forum.basicInfo')
    }
  }, [(_vm.forum) ? _c('basic-info-editor', {
    attrs: {
      "forum": _vm.forum
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('tab-pane', {
    attrs: {
      "icon": "fa fa-support",
      "label": _vm.$t('admin.forum.sectionInfo')
    }
  }, [(_vm.forum) ? _c('section-info-editor', {
    attrs: {
      "forum": _vm.forum
    }
  }) : _vm._e()], 1)], 1)] : [_c('p', [_vm._v("\n      " + _vm._s(_vm.$t('admin.forum.not_open')) + "\n    ")])]], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b2785fec", module.exports)
  }
}

/***/ }),
/* 1668 */,
/* 1669 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login_codes"
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-3"
  }, [_c('div', {
    staticClass: "field has-addons"
  }, [_c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.number",
      value: (_vm.genNumber),
      expression: "genNumber",
      modifiers: {
        "number": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "number",
      "step": "100",
      "min": "0"
    },
    domProps: {
      "value": (_vm.genNumber)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.genNumber = _vm._n($event.target.value)
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button is-primary",
    on: {
      "click": _vm.genCodes
    }
  }, [_vm._m(0), _vm._v(" "), _c('span', [_vm._v(" " + _vm._s(_vm.$t('admin.app.genCodes')) + " ")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-3"
  }, [_c('div', {
    staticClass: "field has-addons"
  }, [_c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.number",
      value: (_vm.delNumber),
      expression: "delNumber",
      modifiers: {
        "number": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "number",
      "step": "100",
      "min": "0"
    },
    domProps: {
      "value": (_vm.delNumber)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.delNumber = _vm._n($event.target.value)
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button is-primary",
    on: {
      "click": _vm.delCodes
    }
  }, [_vm._m(1), _vm._v(" "), _c('span', [_vm._v(" " + _vm._s(_vm.$t('admin.app.delCodes')) + " ")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-3"
  }, [_c('div', {
    staticClass: "field has-addons"
  }, [_c('p', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.number",
      value: (_vm.assignNumber),
      expression: "assignNumber",
      modifiers: {
        "number": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "number",
      "step": "10",
      "min": "0"
    },
    domProps: {
      "value": (_vm.assignNumber)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.assignNumber = _vm._n($event.target.value)
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button is-primary",
    on: {
      "click": _vm.assignCodes
    }
  }, [_vm._m(2), _vm._v(" "), _c('span', [_vm._v(" " + _vm._s(_vm.$t('admin.app.assignCodes')) + " ")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-3"
  }, [_c('div', {
    staticClass: "field has-addons"
  }, [_c('p', {
    staticClass: "control"
  }, [_c('input', {
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('admin.app.searchCodesPlaceholder')
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button is-primary"
  }, [_vm._m(3), _vm._v(" "), _c('span', [_vm._v(" " + _vm._s(_vm.$t('admin.app.searchCodes')) + " ")])])])])])]), _vm._v(" "), _c('nav', {
    staticClass: "level"
  }, [_c('div', {
    staticClass: "level-item has-text-centered box"
  }, [_c('div', [_c('p', {
    staticClass: "heading"
  }, [_vm._v(_vm._s(_vm.$t('admin.app.totalCodes')))]), _vm._v(" "), _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.stats.total))])])]), _vm._v(" "), _c('div', {
    staticClass: "level-item has-text-centered box"
  }, [_c('div', [_c('p', {
    staticClass: "heading"
  }, [_vm._v(_vm._s(_vm.$t('admin.app.availableCodes')))]), _vm._v(" "), _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.stats.available))])])]), _vm._v(" "), _c('div', {
    staticClass: "level-item has-text-centered box"
  }, [_c('div', [_c('p', {
    staticClass: "heading"
  }, [_vm._v(_vm._s(_vm.$t('admin.app.assignedCodes')))]), _vm._v(" "), _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.stats.assigned))])])]), _vm._v(" "), _c('div', {
    staticClass: "level-item has-text-centered box"
  }, [_c('div', [_c('p', {
    staticClass: "heading"
  }, [_vm._v(_vm._s(_vm.$t('admin.app.usedCodes')))]), _vm._v(" "), _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.stats.used))])])])]), _vm._v(" "), _c('article', {
    staticClass: "tile box chart"
  }, [_c('line-chart', {
    ref: "chart",
    attrs: {
      "options": _vm.options,
      "width": '100%'
    }
  })], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-minus"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-anchor"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-search"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b69123b4", module.exports)
  }
}

/***/ }),
/* 1670 */,
/* 1671 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor"
  }, [_c('div', {
    staticClass: "tile is-parent"
  }, [_c('article', {
    staticClass: "tile is-child"
  }, [(_vm.forum) ? _c('div', {
    staticClass: "table-responsive"
  }, [_c('table', {
    staticClass: "table is-bordered is-striped is-narrow goods-table"
  }, [_c('thead', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.forum.sections && _vm.forum.sections.length > 0),
      expression: "forum.sections && forum.sections.length > 0"
    }]
  }, [_c('tr', [_c('th', [_vm._v(_vm._s(_vm.$t('admin.forum.id')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.forum.section.title')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.forum.section.sort')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.forum.created_at')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.forum.active')))]), _vm._v(" "), _c('th', [_vm._v(_vm._s(_vm.$t('admin.forum.edit')))])])]), _vm._v(" "), _c('tfoot', [_c('tr', [_c('th', {
    staticStyle: {
      "text-align": "center",
      "vertical-align": "bottom",
      "height": "60px",
      "border": "none"
    },
    attrs: {
      "colspan": 6
    }
  }, [_c('a', {
    staticClass: "button is-primary",
    staticStyle: {
      "min-width": "100px"
    },
    on: {
      "click": _vm.addNewSection
    }
  }, [_c('i', {
    staticClass: "fa fa-plus",
    staticStyle: {
      "margin-right": "5px"
    }
  }), _vm._v(" " + _vm._s(_vm.$t('admin.forum.section.add')) + "\n                ")])])])]), _vm._v(" "), _c('tbody', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.forum.sections && _vm.forum.sections.length > 0),
      expression: "forum.sections && forum.sections.length > 0"
    }]
  }, _vm._l((_vm.forum.sections), function(section, index) {
    return _c('tr', [_c('td', [_vm._v(" " + _vm._s(section.id) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(section.title) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(section.sort) + " ")]), _vm._v(" "), _c('td', [_vm._v(" " + _vm._s(_vm._f("formatServerDateTime")(section.inserted_at)) + " ")]), _vm._v(" "), (section.active) ? _c('td', [_vm._v("正常")]) : _c('td', [_vm._v("禁用")]), _vm._v(" "), _c('td', {
      staticClass: "is-icon"
    }, [_c('a', {
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.editSectionInfo(section, index)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-pencil"
    })])])])
  }))], 1)]) : _vm._e()])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b84efb88", module.exports)
  }
}

/***/ }),
/* 1672 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor"
  }, [_c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('div', {
    staticClass: "column"
  }, [_c('a', {
    staticClass: "button is-primary",
    staticStyle: {
      "min-width": "100px"
    },
    on: {
      "click": _vm.addNewSetting
    }
  }, [_c('i', {
    staticClass: "fa fa-plus",
    staticStyle: {
      "margin-right": "5px"
    }
  }), _vm._v(" " + _vm._s(_vm.$t('admin.setting.add')) + "\n        ")])])]), _vm._v(" "), _c('article', {
    staticClass: "tile is-child is-12"
  }, [_c('div', {
    staticClass: "table-responsive"
  }, [_c('div', {
    staticClass: "columns is-gapless has-text-centered",
    staticStyle: {
      "border-bottom": "1px solid #ccc",
      "padding": "5px",
      "color": "#aaa"
    }
  }, [_c('div', {
    staticClass: "column"
  }, [_c('p', [_vm._v(_vm._s(_vm.$t('admin.setting.configName')))])]), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_c('p', [_vm._v(_vm._s(_vm.$t('admin.setting.configValue')))])]), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_c('p', [_vm._v(_vm._s(_vm.$t('admin.setting.memo')))])]), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_c('p', [_vm._v(_vm._s(_vm.$t('admin.setting.active')))])]), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_c('p', [_vm._v(_vm._s(_vm.$t('admin.setting.edit')))])]), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_c('p', [_vm._v(_vm._s(_vm.$t('admin.setting.delete')))])])]), _vm._v(" "), (_vm.settings) ? _c('div', _vm._l((_vm.settings), function(setting, index) {
    return _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.settings && _vm.settings.length > 0),
        expression: "settings && settings.length > 0"
      }],
      key: setting.id,
      staticClass: "columns has-text-centered",
      staticStyle: {
        "border-bottom": "1px solid #ccc"
      }
    }, [_c('div', {
      staticClass: "column"
    }, [_c('p', [_vm._v(_vm._s(setting.name))])]), _vm._v(" "), _c('div', {
      staticClass: "column"
    }, [_c('p', [_vm._v(_vm._s(setting.value))])]), _vm._v(" "), _c('div', {
      staticClass: "column"
    }, [_c('p', [_vm._v(_vm._s(setting.memo))])]), _vm._v(" "), _c('div', {
      staticClass: "column"
    }, [(setting.active) ? _c('p', [_vm._v("正常")]) : _c('p', [_vm._v("禁用")])]), _vm._v(" "), _c('div', {
      staticClass: "column"
    }, [_c('a', {
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.editSettingInfo(setting, index)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-pencil"
    })])]), _vm._v(" "), _c('div', {
      staticClass: "column"
    }, [_c('a', {
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.delSetting(setting.name, index)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-trash-o"
    })])])])
  })) : _vm._e()])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-bc109818", module.exports)
  }
}

/***/ }),
/* 1673 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    attrs: {
      "name": "basicInfo"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-bd3ddfac", module.exports)
  }
}

/***/ }),
/* 1674 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('basic-info-editor', {
    attrs: {
      "group": "point"
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-be9e7de8", module.exports)
  }
}

/***/ }),
/* 1675 */,
/* 1676 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    attrs: {
      "name": "params"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "columns is-multiline"
  }, [_c('div', {
    staticClass: "column is-10"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.newCodeTemplate')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.new_code_template),
      expression: "wcpParams.new_code_template",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.new_code_template)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.new_code_template = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.ownedCodeTemplate')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.owned_code_template),
      expression: "wcpParams.owned_code_template",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.owned_code_template)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.owned_code_template = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.noCodeTemplate')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.no_code_template),
      expression: "wcpParams.no_code_template",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.no_code_template)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.no_code_template = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" " + _vm._s(_vm.$t('admin.wcp.closedTemplate')) + ": ")]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.wcpParams.closed_template),
      expression: "wcpParams.closed_template",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "textarea",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.wcpParams.closed_template)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.wcpParams.closed_template = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-10 has-text-centered"
  }, [_c('a', {
    staticClass: "button is-primary",
    class: {
      'is-loading': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.submit')))])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c0bfca06", module.exports)
  }
}

/***/ }),
/* 1677 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('nav', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.pageCount > 1),
      expression: "pageCount > 1"
    }],
    staticClass: "pagination"
  }, [_c('ul', [_c('li', [_c('a', {
    staticClass: "button",
    class: {
      'is-disabled': _vm.currentPage == 1
    },
    attrs: {
      "disabled": _vm.currentPage == 1
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.selectPage(_vm.currentPage - 1)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.previous')))])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "button",
    class: {
      'is-primary': _vm.currentPage == 1
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.selectPage(1)
      }
    }
  }, [_vm._v("1")])]), _vm._v(" "), (_vm.pageCount >= 5) ? [(_vm.currentPage < 3) ? [_c('li', [_c('a', {
    staticClass: "button",
    class: {
      'is-primary': _vm.currentPage == 2
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.selectPage(2)
      }
    }
  }, [_vm._v("2")])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "button",
    class: {
      'is-primary': _vm.currentPage == 3
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.selectPage(3)
      }
    }
  }, [_vm._v("3")])]), _vm._v(" "), _vm._m(0)] : [(_vm.currentPage > _vm.pageCount - 2) ? [_c('li', [_c('span', [_vm._v("...")])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "button",
    class: {
      'is-primary': _vm.currentPage == _vm.pageCount - 2
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.selectPage(_vm.pageCount - 2)
      }
    }
  }, [_vm._v(_vm._s(_vm.pageCount - 2))])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "button",
    class: {
      'is-primary': _vm.currentPage == _vm.pageCount - 1
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.selectPage(_vm.pageCount - 1)
      }
    }
  }, [_vm._v(_vm._s(_vm.pageCount - 1))])])] : [_c('li', [_c('span', [_vm._v("...")])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "button",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.selectPage(_vm.currentPage - 1)
      }
    }
  }, [_vm._v("\n                  " + _vm._s(_vm.currentPage - 1) + " ")])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "button is-primary"
  }, [_vm._v(_vm._s(_vm.currentPage))])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "button",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.selectPage(_vm.currentPage + 1)
      }
    }
  }, [_vm._v(_vm._s(_vm.currentPage + 1))])]), _vm._v(" "), _c('li', [_c('span', [_vm._v("...")])])]]] : [(_vm.pageCount > 2) ? _c('li', [_c('a', {
    staticClass: "button",
    class: {
      'is-primary': _vm.currentPage == 2
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.selectPage(2)
      }
    }
  }, [_vm._v("2")])]) : _vm._e(), _vm._v(" "), (_vm.pageCount > 3) ? _c('li', [_c('a', {
    staticClass: "button",
    class: {
      'is-primary': _vm.currentPage == 3
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.selectPage(3)
      }
    }
  }, [_vm._v("3")])]) : _vm._e(), _vm._v(" "), (_vm.pageCount > 4) ? _c('li', [_c('a', {
    staticClass: "button",
    class: {
      'is-primary': _vm.currentPage == 4
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.selectPage(4)
      }
    }
  }, [_vm._v("4")])]) : _vm._e()], _vm._v(" "), _c('li', [_c('a', {
    staticClass: "button",
    class: {
      'is-primary': _vm.currentPage == _vm.pageCount
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.selectPage(_vm.pageCount)
      }
    }
  }, [_vm._v(_vm._s(_vm.pageCount))])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "button",
    class: {
      'is-disabled': _vm.currentPage == _vm.pageCount
    },
    attrs: {
      "disabled": _vm.currentPage == _vm.pageCount
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.selectPage(_vm.currentPage + 1)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('admin.next')))])])], 2)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('span', [_vm._v("...")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c1422300", module.exports)
  }
}

/***/ }),
/* 1678 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-table', {
    attrs: {
      "data": _vm.appUsers
    }
  }, [_c('el-table-column', {
    attrs: {
      "prop": "app_user_name",
      "label": "游戏ID",
      "width": "200"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "app_user_level",
      "label": "等级"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "最后活跃时间",
      "width": "180"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._v("\n      " + _vm._s(_vm._f("formatServerDateTime")(scope.row.last_active_at)) + "\n    ")]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "充值金额",
      "width": "150"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-icon', {
          attrs: {
            "name": "information"
          }
        }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm._f("formatPrice")(scope.row.pay_amount)) + " 元")])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "活跃时长",
      "width": "150"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-icon', {
          attrs: {
            "name": "time"
          }
        }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm._f("secondFormatHour")(scope.row.active_seconds)) + " 小时")])]
      }
    }])
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c43feb68", module.exports)
  }
}

/***/ }),
/* 1679 */,
/* 1680 */,
/* 1681 */,
/* 1682 */,
/* 1683 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "users-page"
  }, [_c('div', {
    staticClass: "control has-icon has-icon-left"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.keyword),
      expression: "keyword"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('admin.titles.searchUsers')
    },
    domProps: {
      "value": (_vm.keyword)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.onSearchBoxSubmit($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.keyword = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon is-small"
  }, [(_vm.searching) ? _c('i', {
    staticClass: "fa fa-spinner fa-spin"
  }) : _c('i', {
    staticClass: "fa fa-search"
  })])]), _vm._v(" "), (!_vm.initing && _vm.users.length > 0) ? _c('div', {
    staticClass: "tile is-ancestor"
  }, [_c('div', {
    staticClass: "tile is-parent is-vertical"
  }, [_c('el-table', {
    ref: "tbl",
    staticClass: "tile is-child box is-paddingless",
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "stripe": "",
      "data": _vm.users
    },
    on: {
      "row-dblclick": _vm.showDetails
    }
  }, [_c('el-table-column', {
    attrs: {
      "label": _vm.$t('admin.user.fields.avatar'),
      "width": "80"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('figure', {
          staticClass: "image is-48x48"
        }, [_c('img', {
          attrs: {
            "src": _vm._f("imageStaticUrl")(scope.row.avatar_url ? scope.row.avatar_url : 'https://placehold.it/48x48')
          }
        })])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": _vm.$t('admin.user.fields.nickname'),
      "width": "200"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._v("\n            " + _vm._s(scope.row.nickname) + " ")]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": _vm.$t('admin.user.fields.email'),
      "width": "200"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._v("\n            " + _vm._s(scope.row.email) + "\n          ")]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "mobile",
      "label": _vm.$t('admin.user.fields.mobile'),
      "width": "180"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": _vm.$t('admin.user.fields.gender'),
      "width": "100"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_vm._v("\n            " + _vm._s(scope.row.gender == 'male' ? _vm.$t('admin.user.gender.male') : _vm.$t('admin.user.gender.famale')) + "\n          ")]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": _vm.$t('admin.user.fields.insertedAt'),
      "prop": "inserted_at",
      "width": "180"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', {
          staticStyle: {
            "font-family": "'microsoft yahei', Tahoma, Geneva, Verdana, sans-serif"
          }
        }, [_vm._v(" " + _vm._s(_vm._f("formatServerDateTime")(scope.row.inserted_at)))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column')], 1), _vm._v(" "), (_vm.users && _vm.users.length > 0) ? _c('div', {
    staticClass: "tile ele-pagination"
  }, [_c('el-pagination', {
    attrs: {
      "layout": "prev, pager, next",
      "page-count": _vm.total,
      "current-page": _vm.page
    },
    on: {
      "update:currentPage": function($event) {
        _vm.page = $event
      },
      "current-change": _vm.onPageChange
    }
  })], 1) : _vm._e()], 1)]) : _c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "hero-body has-text-centered"
  }, [(_vm.loading || _vm.initing) ? _c('div', [_c('span', {
    staticClass: "icon is-large"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-spin"
  })]), _vm._v(" "), _c('h2', {
    staticClass: "subtitle",
    staticStyle: {
      "margin-top": "10px"
    }
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.loading')) + "\n        ")])]) : _c('div', [_c('h1', {
    staticClass: "title"
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.oops')) + "\n        ")]), _vm._v(" "), _c('h2', {
    staticClass: "subtitle"
  }, [_vm._v("\n          " + _vm._s(_vm.$t('admin.titles.noUserToDisplay')) + "\n        ")])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d292b5b4", module.exports)
  }
}

/***/ }),
/* 1684 */,
/* 1685 */,
/* 1686 */,
/* 1687 */,
/* 1688 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('nprogress-container'), _vm._v(" "), _c('navbar', {
    attrs: {
      "show": true
    }
  }), _vm._v(" "), _c('sidebar', {
    attrs: {
      "show": _vm.sidebar.opened && !_vm.sidebar.hidden
    }
  }), _vm._v(" "), _c('app-main')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e6cd8724", module.exports)
  }
}

/***/ }),
/* 1689 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    attrs: {
      "name": "basicInfo"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e836c496", module.exports)
  }
}

/***/ }),
/* 1690 */,
/* 1691 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "hero is-bold app-navbar animated",
    class: {
      slideInDown: _vm.show, slideOutDown: !_vm.show
    }
  }, [_c('div', {
    staticClass: "hero-head"
  }, [_c('nav', {
    staticClass: "nav"
  }, [_c('div', {
    staticClass: "nav-left"
  }, [_c('a', {
    staticClass: "nav-item is-hidden-tablet",
    on: {
      "click": function($event) {
        _vm.toggleSidebar(!_vm.sidebar.opened)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-bars",
    attrs: {
      "aria-hidden": "true"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "nav-center"
  }, [_c('a', {
    staticClass: "nav-item hero-brand",
    on: {
      "click": _vm.goIndex
    }
  }, [_c('img', {
    staticClass: "logo",
    attrs: {
      "src": "/images/logo.svg"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "is-hidden-mobile"
  }, [_c('span', {
    staticClass: "vue"
  }, [_vm._v(_vm._s(_vm.$t('admin.firevalePlatform')))]), _c('strong', {
    staticClass: "admin"
  }, [_vm._v(_vm._s(_vm.$t('admin.admin')) + _vm._s(_vm.appShowName))])])])]), _vm._v(" "), _c('div', {
    staticClass: "nav-right is-flex"
  })])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f04b2242", module.exports)
  }
}

/***/ }),
/* 1692 */,
/* 1693 */,
/* 1694 */,
/* 1695 */,
/* 1696 */,
/* 1697 */,
/* 1698 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(757);


/***/ })
]),[1698]);
//# sourceMappingURL=admin.js.map