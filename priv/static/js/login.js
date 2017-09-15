webpackJsonp([3],{

/***/ 1037:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_acs__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loginFormMixin__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loginValidation__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_js_utils__ = __webpack_require__(27);
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
  mixins: [__WEBPACK_IMPORTED_MODULE_3__loginFormMixin__["a" /* default */]],

  validations: {
    accountId: __WEBPACK_IMPORTED_MODULE_4__loginValidation__["d" /* accountId */],
    password: __WEBPACK_IMPORTED_MODULE_4__loginValidation__["b" /* password */]
  },

  beforeMount: function beforeMount() {
    this.accountId = this.loginAccountId;
  },

  data: function data() {
    return {
      accountId: '',
      password: '',
      passwordIcon: 'eye-slash',
      errorMessage: '',
      processing: false
    };
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["a" /* mapGetters */])(['loginAccountId', 'redirectUri'])),

  watch: {
    loginAccountId: function loginAccountId(val) {
      this.accountId = val;
    }
  },

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapActions */])(['setLoginAccountId', 'addLoginnedAccount']), {

    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this.$v.$invalid && !this.processing)) {
                  _context.next = 16;
                  break;
                }

                this.processing = true;
                _context.prev = 2;
                _context.next = 5;
                return this.$acs.createToken(this.accountId, this.password);

              case 5:
                result = _context.sent;

                this.processing = false;

                if (result.success) {
                  this.addLoginnedAccount(result);
                  this.setLoginAccountId(this.accountId);

                  if (__WEBPACK_IMPORTED_MODULE_1_common_js_acs__["d" /* isInApp */]) {
                    __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__["a" /* default */].closeWebviewWithResult(result);
                  } else {
                    if (this.redirectUri) {
                      window.location = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_common_js_utils__["l" /* updateQueryStringParameter */])(this.redirectUri, 'accessToken', result.access_token);
                    }
                  }
                } else if (result.action == 'show_login_code') {
                  this.$router.push({ name: 'inputLoginCode' });
                } else {
                  console.error('create token failed with error: ', this.$t(result.i18n_message, result.i18n_object));
                  this.setErrorMessage(this.$t(result.i18n_message, result.i18n_object));
                }
                _context.next = 15;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](2);

                console.error('create token failed with exception: ', _context.t0);
                this.processing = false;
                this.setErrorMessage(this.$t('error.server.networkError'));

              case 15:
                this.processing = false;

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 10]]);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  })
});

/***/ }),

/***/ 1038:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_utils__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_nativeApi__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_acs__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__loginFormMixin__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loginValidation__ = __webpack_require__(161);
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










/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_4__loginFormMixin__["a" /* default */]],

  validations: {
    loginCode: __WEBPACK_IMPORTED_MODULE_5__loginValidation__["a" /* loginCode */]
  },

  data: function data() {
    return {
      loginCode: '',
      errorMessage: '',
      processing: false,
      obtainCodeUrl: __WEBPACK_IMPORTED_MODULE_2_common_js_acs__["i" /* obtainCodeUrl */]
    };
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_vuex__["a" /* mapGetters */])(['redirectUri'])),

  methods: {
    gotoObtain: function gotoObtain() {
      if (__WEBPACK_IMPORTED_MODULE_2_common_js_acs__["d" /* isInApp */]) {
        __WEBPACK_IMPORTED_MODULE_1_common_js_nativeApi__["a" /* default */].openBrowser(__WEBPACK_IMPORTED_MODULE_2_common_js_acs__["i" /* obtainCodeUrl */]);
      }
    },

    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this.$v.$invalid && !this.processing)) {
                  _context.next = 15;
                  break;
                }

                this.processing = true;
                _context.prev = 2;
                _context.next = 5;
                return this.$acs.bindLoginCode({
                  login_code: this.loginCode
                });

              case 5:
                result = _context.sent;

                console.log(result);
                if (result.success) {
                  if (window.acsConfig.inApp) {
                    __WEBPACK_IMPORTED_MODULE_1_common_js_nativeApi__["a" /* default */].closeWebviewWithResult(result);
                  } else {
                    if (this.redirectUri) {
                      window.location = __WEBPACK_IMPORTED_MODULE_0_common_js_utils__["l" /* updateQueryStringParameter */](this.redirectUri, 'accessToken', result.access_token);
                    }
                  }
                } else {
                  this.setErrorMessage(this.$t(result.i18n_message));
                }
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](2);

                console.error('exception encountered', _context.t0);
                this.setErrorMessage(this.$t('error.server.networkError'));

              case 14:
                this.processing = false;

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 10]]);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  }
});

/***/ }),

/***/ 1039:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_nativeApi__ = __webpack_require__(36);
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





/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      canGoBack: false
    };
  },

  created: function created() {
    if (this.$route.query.redirect_uri) {
      this.setRedirectUri(atob(this.$route.query.redirect_uri));
    }
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['transitionName'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['setTransitionName', 'setRedirectUri']), {

    onClose: function onClose() {
      __WEBPACK_IMPORTED_MODULE_1_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
        success: false
      });
    }
  }),

  watch: {
    '$route': function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(to, from) {
        var native;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return __WEBPACK_IMPORTED_MODULE_1_common_js_nativeApi__["a" /* default */].canGoback();

              case 2:
                native = _context.sent;
                _context.t0 = native;
                _context.next = _context.t0 === 'yes' ? 6 : _context.t0 === 'no' ? 8 : 10;
                break;

              case 6:
                this.canGoBack = true;
                return _context.abrupt('break', 12);

              case 8:
                this.canGoBack = false;
                return _context.abrupt('break', 12);

              case 10:
                this.canGoBack = history.state != null;
                return _context.abrupt('break', 12);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function $route(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return $route;
    }()
  }
});

/***/ }),

/***/ 1040:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loginFormMixin__ = __webpack_require__(154);
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
  mixins: [__WEBPACK_IMPORTED_MODULE_2__loginFormMixin__["a" /* default */]],

  beforeMount: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var activeSession;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__["a" /* default */].getActiveSession();

            case 2:
              activeSession = _context.sent;

              if (activeSession) {
                this.addLoginnedAccount(activeSession);
              }
              this.currentAccount = this.historyAccounts[0];

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function beforeMount() {
      return _ref.apply(this, arguments);
    }

    return beforeMount;
  }(),

  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    next(function (vm) {
      if (vm.historyAccounts.length <= 0) {
        vm.$router.replace({
          name: 'selectAccountType'
        });
      }
    });
  },


  data: function data() {
    return {
      currentAccount: undefined,
      errorMessage: '',
      accountListVisible: false,
      processing: false
    };
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])(['historyAccounts'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['setLoginAccountId', 'addLoginnedAccount']), {

    handleSubmit: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.processing) {
                  _context2.next = 13;
                  break;
                }

                _context2.prev = 1;

                this.processing = true;
                _context2.next = 5;
                return this.$acs.updateToken(this.currentAccount.access_token);

              case 5:
                result = _context2.sent;

                if (result.success) {
                  if (!result.is_anonymous && result.sdk == 'firevale') {
                    this.setLoginAccountId(result.user_email || result.user_mobile);
                  }
                  this.addLoginnedAccount(result);
                  this.currentAccount = result;
                  if (window.acsConfig.inApp) {
                    __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__["a" /* default */].closeWebviewWithResult(result);
                  }
                } else {
                  if (!this.currentAccount.is_anonymous && this.currentAccount.sdk == 'firevale') {
                    this.setLoginAccountId(this.currentAccount.user_email || this.currentAccount.user_mobile);
                    this.$router.replace({
                      name: 'login'
                    });
                  } else if (this.currentAccount.is_anonymous && this.currentAccount.sdk == 'firevale') {
                    this.$router.replace({
                      name: 'selectAccountType'
                    });
                  } else {
                    // TODO: goto some other page when
                    this.$router.replace({
                      name: 'login'
                    });
                  }
                }
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](1);

                this.setErrorMessage(this.$t('error.server.networkError'));

              case 12:
                this.processing = false;

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 9]]);
      }));

      function handleSubmit() {
        return _ref2.apply(this, arguments);
      }

      return handleSubmit;
    }(),

    toggleAccountsListVisibility: function toggleAccountsListVisibility() {
      this.accountListVisible = !this.accountListVisible;
    },

    chooseAccount: function chooseAccount(account) {
      this.accountListVisible = false;
      this.currentAccount = account;
    }
  })
});

/***/ }),

/***/ 1041:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_utils__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loginFormMixin__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loginValidation__ = __webpack_require__(161);
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








/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_2__loginFormMixin__["a" /* default */]],

  validations: {
    accountId: __WEBPACK_IMPORTED_MODULE_3__loginValidation__["e" /* registerAccountId */]
  },

  data: function data() {
    return {
      accountId: '',
      errorMessage: '',
      processing: false
    };
  },

  created: function created() {
    this.accountId = this.registerAccountId;
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])(['registerAccountId'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['setRegisterAccountId']), {

    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result, _result;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this.$v.$invalid && !this.processing)) {
                  _context.next = 35;
                  break;
                }

                this.processing = true;
                _context.prev = 2;
                _context.next = 5;
                return this.$acs.isAccountExists(this.accountId);

              case 5:
                result = _context.sent;

                if (!result.success) {
                  _context.next = 28;
                  break;
                }

                if (!result.exists) {
                  _context.next = 11;
                  break;
                }

                this.setErrorMessage(this.$t('error.server.accountInUse'));
                _context.next = 26;
                break;

              case 11:
                this.setRegisterAccountId(this.accountId);

                if (!(window.acsConfig.isMobileAccountSupported && __WEBPACK_IMPORTED_MODULE_0_common_js_utils__["h" /* isValidMobileNumber */](this.accountId))) {
                  _context.next = 25;
                  break;
                }

                _context.prev = 13;
                _context.next = 16;
                return this.$acs.sendMobileVerifyCode(this.accountId);

              case 16:
                _result = _context.sent;

                if (_result.success) {
                  this.$router.replace({
                    name: 'registerStep2',
                    query: {
                      accountId: btoa(this.accountId)
                    }
                  });
                } else {
                  this.setErrorMessage(this.$t(_result.i18n_message));
                }
                _context.next = 23;
                break;

              case 20:
                _context.prev = 20;
                _context.t0 = _context['catch'](13);

                this.setErrorMessage(this.$t('error.server.networkError'), _context.t0);

              case 23:
                _context.next = 26;
                break;

              case 25:
                this.$router.replace({
                  name: 'registerStep2',
                  query: {
                    accountId: btoa(this.accountId)
                  }
                });

              case 26:
                _context.next = 29;
                break;

              case 28:
                this.setErrorMessage(this.$t(result.i18n_message));

              case 29:
                _context.next = 34;
                break;

              case 31:
                _context.prev = 31;
                _context.t1 = _context['catch'](2);

                this.setErrorMessage(this.$t('error.server.networkError'), _context.t1);

              case 34:
                this.processing = false;

              case 35:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 31], [13, 20]]);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  })
});

/***/ }),

/***/ 1042:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_utils__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loginFormMixin__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loginValidation__ = __webpack_require__(161);
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
  mixins: [__WEBPACK_IMPORTED_MODULE_2__loginFormMixin__["a" /* default */]],

  validations: {
    verifyCode: __WEBPACK_IMPORTED_MODULE_3__loginValidation__["c" /* verifyCode */]
  },

  data: function data() {
    return {
      isMobileAccount: false,
      hasSentCode: false,
      isMobileAccountSupported: window.acsConfig.isMobileAccountSupported,
      cooldownCounter: 0,
      accountId: '',
      verifyCode: '',
      errorMessage: '',
      processing: false
    };
  },

  created: function created() {
    this.accountId = atob(this.$route.query.accountId);

    if (__WEBPACK_IMPORTED_MODULE_0_common_js_utils__["j" /* isValidEmail */](this.accountId)) {
      this.updateCaptcha();
      this.isMobileAccount = false;
    } else {
      this.isMobileAccount = true;
      this.hasSentCode = true;
      this.cooldownCounter = 60;
      setTimeout(this.cooldownTimer, 1000);
    }
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])(['captchaUrl']), {

    sendCodeTitle: function sendCodeTitle() {
      if (this.cooldownCounter > 0) {
        return this.$t('account.registerPage.cooldownText', {
          timer: this.cooldownCounter
        });
      } else {
        if (this.hasSentCode) {
          return this.$t('account.registerPage.sendAgain');
        } else {
          return this.$t('account.loginPage.sendVerifyCode');
        }
      }
    }
  }),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['setCaptchaUrl']), {

    updateCaptcha: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$acs.updateCaptcha({ register_account_id: this.accountId });

              case 2:
                result = _context.sent;

                if (result.success) {
                  this.setCaptchaUrl(result.image_url);
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function updateCaptcha() {
        return _ref.apply(this, arguments);
      }

      return updateCaptcha;
    }(),

    cooldownTimer: function cooldownTimer() {
      if (this.cooldownCounter > 0) {
        this.cooldownCounter--;
        setTimeout(this.cooldownTimer, 1000);
      }
    },

    sendMobileVerifyCode: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(window.acsConfig.isMobileAccountSupported && __WEBPACK_IMPORTED_MODULE_0_common_js_utils__["h" /* isValidMobileNumber */](this.accountId))) {
                  _context2.next = 13;
                  break;
                }

                _context2.prev = 1;
                _context2.next = 4;
                return this.$acs.sendMobileVerifyCode(this.accountId);

              case 4:
                result = _context2.sent;

                if (result.success) {
                  this.hasSentCode = true;
                  this.cooldownCounter = 60;
                  setTimeout(this.cooldownTimer, 1000);
                } else {
                  this.setErrorMessage(this.$t(result.i18n_message));
                }
                return _context2.abrupt('return', result);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](1);

                this.setErrorMessage(this.$t('error.server.networkError'));
                return _context2.abrupt('return', {
                  success: false
                });

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 9]]);
      }));

      function sendMobileVerifyCode() {
        return _ref2.apply(this, arguments);
      }

      return sendMobileVerifyCode;
    }(),

    handleSubmit: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!this.$v.$invalid && this.accountId && !this.processing)) {
                  _context3.next = 13;
                  break;
                }

                this.processing = true;
                _context3.prev = 2;
                _context3.next = 5;
                return this.$acs.checkRegisterVerifyCode(this.verifyCode);

              case 5:
                result = _context3.sent;

                if (result.success) {
                  if (result.match) {
                    this.$router.replace({
                      name: 'registerStep3',
                      query: {
                        accountId: btoa(this.accountId),
                        verifyCode: btoa(this.verifyCode)
                      }
                    });
                  } else {
                    this.setErrorMessage(this.$t('error.server.invalidVerifyCode'));
                  }
                } else {
                  this.setErrorMessage(this.$t(result.i18n_message));
                }
                _context3.next = 12;
                break;

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3['catch'](2);

                this.setErrorMessage(this.$t('error.server.networkError'));

              case 12:
                this.processing = false;

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[2, 9]]);
      }));

      function handleSubmit() {
        return _ref3.apply(this, arguments);
      }

      return handleSubmit;
    }()
  })
});

/***/ }),

/***/ 1043:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loginFormMixin__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loginValidation__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_js_utils__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_js_acs__ = __webpack_require__(41);
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












/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_2__loginFormMixin__["a" /* default */]],

  validations: {
    password: __WEBPACK_IMPORTED_MODULE_3__loginValidation__["b" /* password */]
  },

  data: function data() {
    return {
      accountId: '',
      verifyCode: '',
      password: '',
      passwordIcon: 'eye-slash',
      errorMessage: '',
      processing: false,
      shouldBindAnonymous: false
    };
  },

  created: function created() {
    this.accountId = atob(this.$route.query.accountId);
    this.verifyCode = atob(this.$route.query.verifyCode);
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])(['redirectUri'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['setLoginAccountId', 'setRegisterAccountId', 'addLoginnedAccount']), {

    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this.$v.$invalid && this.accountId && this.verifyCode && !this.processing)) {
                  _context.next = 14;
                  break;
                }

                this.processing = true;
                _context.prev = 2;
                _context.next = 5;
                return this.$acs.createUser(this.accountId, this.password, this.verifyCode);

              case 5:
                result = _context.sent;


                console.log('register result: ', result);

                if (result.success) {
                  this.setLoginAccountId(this.accountId);
                  this.setRegisterAccountId('');
                  this.addLoginnedAccount(result);
                  if (__WEBPACK_IMPORTED_MODULE_5_common_js_acs__["d" /* isInApp */]) {
                    __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__["a" /* default */].closeWebviewWithResult(result);
                  } else {
                    if (this.redirectUri) {
                      window.location = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_common_js_utils__["l" /* updateQueryStringParameter */])(this.redirectUri, 'accessToken', result.access_token);
                    } else {
                      this.$router.back();
                    }
                  }
                } else if (result.action == 'show_login_code') {
                  this.$router.push({ name: 'inputLoginCode' });
                } else {
                  this.setErrorMessage(this.$t(result.i18n_message));
                }
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context['catch'](2);

                this.setErrorMessage(this.$t('error.server.networkError'));

              case 13:
                this.processing = false;

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 10]]);
      }));

      function handleSubmit() {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  })
});

/***/ }),

/***/ 1044:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loginFormMixin__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loginValidation__ = __webpack_require__(161);
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






/* harmony default export */ __webpack_exports__["default"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_1__loginFormMixin__["a" /* default */]],

  validations: {
    accountId: __WEBPACK_IMPORTED_MODULE_2__loginValidation__["d" /* accountId */]
  },

  beforeMount: function beforeMount() {
    this.accountId = this.loginAccountId;
  },

  data: function data() {
    return {
      accountId: '',
      errorMessage: '',
      processing: false
    };
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['loginAccountId', 'invalidAccountIdErrorMessage'])),

  watch: {
    loginAccountId: function (_loginAccountId) {
      function loginAccountId(_x) {
        return _loginAccountId.apply(this, arguments);
      }

      loginAccountId.toString = function () {
        return _loginAccountId.toString();
      };

      return loginAccountId;
    }(function (val) {
      this.accountId = loginAccountId;
    })
  },

  methods: {
    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(e) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this.$v.$invalid && !this.processing)) {
                  _context.next = 13;
                  break;
                }

                this.processing = true;
                _context.prev = 2;
                _context.next = 5;
                return this.$acs.sendRetrievePasswordVerifyCode(this.accountId);

              case 5:
                result = _context.sent;

                if (result.success) {
                  this.$router.replace({
                    name: 'retrievePasswordStep2',
                    query: {
                      accountId: btoa(this.accountId)
                    }
                  });
                } else {
                  this.setErrorMessage(this.$t(result.i18n_message));
                }
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](2);

                this.setErrorMessage(this.$t('error.server.networkError'));

              case 12:
                this.processing = false;

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      function handleSubmit(_x2) {
        return _ref.apply(this, arguments);
      }

      return handleSubmit;
    }()
  }
});

/***/ }),

/***/ 1045:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_utils__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loginFormMixin__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__loginValidation__ = __webpack_require__(161);
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
  mixins: [__WEBPACK_IMPORTED_MODULE_2__loginFormMixin__["a" /* default */]],

  validations: {
    verifyCode: __WEBPACK_IMPORTED_MODULE_3__loginValidation__["c" /* verifyCode */]
  },

  data: function data() {
    return {
      hasSentCode: false,
      cooldownCounter: 60,
      verifyCode: '',
      errorMessage: '',
      accountId: '',
      processing: false,
      sendingVerifyCode: false
    };
  },

  created: function created() {
    this.accountId = atob(this.$route.query.accountId);
    this.hasSentCode = true;
    setTimeout(this.cooldownTimer, 1000);
  },

  computed: {
    verifyCodeSentHint: function verifyCodeSentHint() {
      if (__WEBPACK_IMPORTED_MODULE_0_common_js_utils__["j" /* isValidEmail */](this.accountId)) {
        return this.$t('account.retrievePasswordPage.verifyCodeSentToEmail', {
          email: __WEBPACK_IMPORTED_MODULE_0_common_js_utils__["e" /* emailMask */](this.accountId)
        });
      } else {
        return this.$t('account.retrievePasswordPage.verifyCodeSentToSms', {
          mobile: __WEBPACK_IMPORTED_MODULE_0_common_js_utils__["f" /* mobileMask */](this.accountId)
        });
      }
    },

    btnSendTitle: function btnSendTitle() {
      if (this.cooldownCounter > 0) {
        return this.$t('account.registerPage.cooldownText', {
          timer: this.cooldownCounter
        });
      } else {
        if (this.hasSentCode) {
          return this.$t('account.registerPage.sendAgain');
        } else {
          return this.$t('account.loginPage.sendVerifyCode');
        }
      }
    }
  },

  methods: {
    cooldownTimer: function cooldownTimer() {
      if (this.cooldownCounter > 0) {
        this.cooldownCounter--;
        setTimeout(this.cooldownTimer, 1000);
      }
    },

    sendVerifyCode: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(e) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.cooldownCounter <= 0 && !this.sendingVerifyCode)) {
                  _context.next = 15;
                  break;
                }

                this.sendingVerifyCode = true;
                _context.prev = 2;
                _context.next = 5;
                return this.$acs.sendRetrievePasswordVerifyCode(this.accountId);

              case 5:
                result = _context.sent;

                if (result.success) {
                  this.cooldownCounter = 60;
                  setTimeout(this.cooldownTimer, 1000);
                } else {
                  this.setErrorMessage(this.$t(result.i18n_message));
                }
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](2);

                this.setErrorMessage(this.$t('error.server.networkError'));

              case 12:
                this.sendingVerifyCode = false;
                _context.next = 16;
                break;

              case 15:
                this.setErrorMessage(this.$t('error.server.sendSmsCooldown'));

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      function sendVerifyCode(_x) {
        return _ref.apply(this, arguments);
      }

      return sendVerifyCode;
    }(),

    handleSubmit: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!this.$v.$invalid && !this.processing)) {
                  _context2.next = 13;
                  break;
                }

                this.processing = true;
                _context2.prev = 2;
                _context2.next = 5;
                return this.$acs.checkRetrievePasswordVerifyCode(this.verifyCode);

              case 5:
                result = _context2.sent;

                if (result.success && result.match) {
                  this.$router.replace({
                    name: 'retrievePasswordStep3',
                    query: {
                      accountId: btoa(this.accountId),
                      verifyCode: btoa(this.verifyCode)
                    }
                  });
                } else {
                  this.setErrorMessage(this.$t('error.server.invalidVerifyCode'));
                }
                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2['catch'](2);

                this.setErrorMessage(this.$t('error.server.networkError'));

              case 12:
                this.processing = false;

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 9]]);
      }));

      function handleSubmit() {
        return _ref2.apply(this, arguments);
      }

      return handleSubmit;
    }()
  }
});

/***/ }),

/***/ 1046:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loginFormMixin__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__loginValidation__ = __webpack_require__(161);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  mixins: [__WEBPACK_IMPORTED_MODULE_1__loginFormMixin__["a" /* default */]],

  validations: {
    password: __WEBPACK_IMPORTED_MODULE_2__loginValidation__["b" /* password */]
  },

  data: function data() {
    var _ref;

    return _ref = {
      passwordIcon: '',
      password: '',
      errorMessage: '',
      accountId: '',
      verifyCode: ''
    }, _defineProperty(_ref, 'passwordIcon', 'eye-slash'), _defineProperty(_ref, 'processing', false), _ref;
  },

  created: function created() {
    if (this.$route.query.accountId) this.accountId = atob(this.$route.query.accountId);
    if (this.$route.query.verifyCode) this.verifyCode = atob(this.$route.query.verifyCode);
  },

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['setLoginAccountId']), {

    handleSubmit: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!this.$v.$invalid && this.accountId && !this.processing)) {
                  _context.next = 13;
                  break;
                }

                this.processing = true;
                _context.prev = 2;
                _context.next = 5;
                return this.$acs.updatePassword(this.accountId, this.password, this.verifyCode);

              case 5:
                result = _context.sent;

                if (result.success) {
                  this.setLoginAccountId(this.accountId);
                  this.$router.back();
                } else {
                  this.setErrorMessage(this.$t(result.i18n_message));
                }
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](2);

                this.setErrorMessage(this.$t('error.server.networkError'));

              case 12:
                this.processing = false;

              case 13:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      function handleSubmit() {
        return _ref2.apply(this, arguments);
      }

      return handleSubmit;
    }()
  })
});

/***/ }),

/***/ 1047:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__ = __webpack_require__(36);
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
  data: function data() {
    var accountTypes = ['anonymous', 'firevale'];
    if (window.acsConfig.isFbLoginSupported) {
      accountTypes.push('facebook');
    }
    if (window.acsConfig.isWechatLoginSupported) {
      accountTypes.push('wechat');
    }
    return {
      currentAccountType: '',
      accountTypes: accountTypes,
      processing: false
    };
  },

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['addLoginnedAccount']), {

    onLoginByType: function onLoginByType(accountType) {
      this.currentAccountType = accountType;
      switch (accountType) {
        case 'firevale':
          this.$router.push({
            name: 'login'
          });
          break;
        case 'facebook':
          __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
            success: false,
            native: 'facebook'
          });
          break;
        case 'anonymous':
          this.anonymousLogin();
          break;
        case 'wechat':
          this.wechatLogin();
          break;
      }
    },

    wechatLogin: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.processing = true;
                _context.next = 3;
                return this.$acs.generateState();

              case 3:
                result = _context.sent;

                if (result.success) {
                  this.showWechatLogin(result.state);
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function wechatLogin() {
        return _ref.apply(this, arguments);
      }

      return wechatLogin;
    }(),

    showWechatLogin: function showWechatLogin(mystate) {
      var _this = this;

      __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__["a" /* default */].showWechatLogin(mystate, function () {
        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(state, code) {
          var result;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _this.$acs.createWechatToken(state, code);

                case 2:
                  result = _context2.sent;

                  if (result.success) {
                    _this.addLoginnedAccount(result);
                    __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__["a" /* default */].closeWebviewWithResult(result);
                  } else if (result.action == 'show_login_code') {
                    _this.$router.push({
                      name: 'inputLoginCode'
                    });
                  }

                case 4:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this);
        }));

        return function (_x, _x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    },

    anonymousLogin: function anonymousLogin() {
      var _this2 = this;

      __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__["a" /* default */].showAlertDialog(this.$t('account.alert.hint'), this.$t('account.alert.anonymousHintMessage'), this.$t('account.alert.cancel'), this.$t('account.types.anonymous'), function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(result) {
          var _result;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!(result == 'ok')) {
                    _context3.next = 12;
                    break;
                  }

                  _this2.processing = true;
                  _context3.prev = 2;
                  _context3.next = 5;
                  return _this2.$acs.createAnonymousToken();

                case 5:
                  _result = _context3.sent;

                  if (_result.success) {
                    _this2.addLoginnedAccount(_result);
                    __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__["a" /* default */].closeWebviewWithResult(_result);
                  } else if (_result.action == 'show_login_code') {
                    _this2.$router.push({
                      name: 'inputLoginCode'
                    });
                  }
                  _context3.next = 12;
                  break;

                case 9:
                  _context3.prev = 9;
                  _context3.t0 = _context3['catch'](2);

                  console.error(_context3.t0);

                case 12:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2, [[2, 9]]);
        }));

        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
  })
});

/***/ }),

/***/ 1161:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1501:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1037),
  /* template */
  __webpack_require__(1584),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/login/views/login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3ea2b68f", Component.options)
  } else {
    hotAPI.reload("data-v-3ea2b68f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1502:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1038),
  /* template */
  __webpack_require__(1554),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/login/views/loginCode.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] loginCode.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2078369c", Component.options)
  } else {
    hotAPI.reload("data-v-2078369c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1503:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1039),
  /* template */
  __webpack_require__(1612),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/login/views/main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5756e903", Component.options)
  } else {
    hotAPI.reload("data-v-5756e903", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1504:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1040),
  /* template */
  __webpack_require__(1694),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/login/views/quickLogin.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] quickLogin.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f918bc74", Component.options)
  } else {
    hotAPI.reload("data-v-f918bc74", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1505:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1041),
  /* template */
  __webpack_require__(1604),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/login/views/registerStep1.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] registerStep1.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-531b46a8", Component.options)
  } else {
    hotAPI.reload("data-v-531b46a8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1506:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1042),
  /* template */
  __webpack_require__(1605),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/login/views/registerStep2.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] registerStep2.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-53295e29", Component.options)
  } else {
    hotAPI.reload("data-v-53295e29", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1507:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1043),
  /* template */
  __webpack_require__(1606),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/login/views/registerStep3.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] registerStep3.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-533775aa", Component.options)
  } else {
    hotAPI.reload("data-v-533775aa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1508:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1044),
  /* template */
  __webpack_require__(1561),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/login/views/retrievePasswordStep1.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] retrievePasswordStep1.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-277a7a58", Component.options)
  } else {
    hotAPI.reload("data-v-277a7a58", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1509:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1045),
  /* template */
  __webpack_require__(1560),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/login/views/retrievePasswordStep2.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] retrievePasswordStep2.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-275e4b56", Component.options)
  } else {
    hotAPI.reload("data-v-275e4b56", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1510:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1046),
  /* template */
  __webpack_require__(1558),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/login/views/retrievePasswordStep3.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] retrievePasswordStep3.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-27421c54", Component.options)
  } else {
    hotAPI.reload("data-v-27421c54", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1511:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1047),
  /* template */
  __webpack_require__(1582),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/login/views/selectAccountType.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] selectAccountType.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d7cbd91", Component.options)
  } else {
    hotAPI.reload("data-v-3d7cbd91", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      touchMap: new WeakMap()
    };
  },

  methods: {
    setErrorMessage: function setErrorMessage(val) {
      var _this = this;

      this.errorMessage = val;
      setTimeout(function (_) {
        _this.errorMessage = '';
      }, 5000);
    },

    handleValidation: function handleValidation($v) {
      var _this2 = this;

      $v.$reset();

      var timer = setTimeout(function (_) {
        $v.$touch();
        setTimeout(function (_) {
          _this2.updateErrorMessage();
        }, 50);
      }, 500);

      if (this.touchMap.has($v)) {
        clearTimeout(this.touchMap.get($v));
      }
      this.touchMap.set($v, timer);
    },

    togglePasswordVisibility: function togglePasswordVisibility() {
      if (this.passwordIcon == 'eye') {
        this.passwordIcon = 'eye-slash';
        this.$refs.password.type = 'password';
      } else {
        this.passwordIcon = 'eye';
        this.$refs.password.type = 'text';
      }
    },

    updateErrorMessage: function updateErrorMessage() {
      if (this.$v.$invalid) {
        if (_typeof(this.$v.accountId) === 'object' && this.$v.accountId.$invalid) {
          var $v = this.$v.accountId;
          if (!$v.required) {
            if (window.acsConfig.isMobileAccountSupported) {
              if (this.$route.name == 'registerStep1') {
                this.errorMessage = this.$t('error.validation.requireMobile');
              } else {
                this.errorMessage = this.$t('error.validation.requireAccountId');
              }
            } else {
              this.errorMessage = this.$t('error.validation.requireEmail');
            }
          } else if (!$v.valid) {
            this.errorMessage = this.invalidAccountIdErrorMessage;
          }
        } else if (_typeof(this.$v.password) === 'object' && this.$v.password.$invalid) {
          var _$v = this.$v.password;
          if (!_$v.required) {
            this.errorMessage = this.$t('error.validation.requirePassword');
          } else if (!_$v.minLength) {
            this.errorMessage = this.$t('error.validation.minPasswordLength');
          } else if (!_$v.maxLength) {
            this.errorMessage = this.$t('error.validation.maxPasswordLength');
          }
        } else if (_typeof(this.$v.verifyCode) === 'object' && this.$v.verifyCode.$invalid) {
          var _$v2 = this.$v.verifyCode;
          if (!_$v2.required) {
            this.errorMessage = this.$t('error.validation.requireVerifyCode');
          } else if (!_$v2.minLength) {
            this.errorMessage = this.$t('error.validation.invalidVerifyCodeLength');
          } else if (!_$v2.maxLength) {
            this.errorMessage = this.$t('error.validation.invalidVerifyCodeLength');
          }
        } else if (_typeof(this.$v.loginCode) === 'object' && this.$v.loginCode.$invalid) {
          var _$v3 = this.$v.loginCode;
          if (!_$v3.required) {
            this.errorMessage = this.$t('error.validation.requireLoginCode');
          } else if (!_$v3.minLength) {
            this.errorMessage = this.$t('error.validation.invalidLoginCodeLength');
          } else if (!_$v3.maxLength) {
            this.errorMessage = this.$t('error.validation.invalidLoginCodeLength');
          }
        }
      } else {
        this.errorMessage = '';
      }
    }
  },

  computed: {
    registerAccountIdLabel: function registerAccountIdLabel() {
      if (window.acsConfig.isMobileAccountSupported) {
        return this.$t('account.loginPage.userMobileLabel');
      } else {
        return this.$t('account.loginPage.userEmailLabel');
      }
    },

    registerAccountIdPlaceholder: function registerAccountIdPlaceholder() {
      if (window.acsConfig.isMobileAccountSupported) {
        return this.$t('account.loginPage.userMobilePlaceholder');
      } else {
        return this.$t('account.loginPage.userEmailPlaceholder');
      }
    },

    accountIdPlaceholder: function accountIdPlaceholder() {
      if (window.acsConfig.isMobileAccountSupported) {
        return this.$t('account.loginPage.accountIdPlaceholder');
      } else {
        return this.$t('account.loginPage.userEmailPlaceholder');
      }
    },

    invalidAccountIdErrorMessage: function invalidAccountIdErrorMessage() {
      if (window.acsConfig.isMobileAccountSupported) {
        if (this.$route.name == 'registerStep1') {
          return this.$t('error.validation.invalidMobileNumber');
        } else {
          return this.$t('error.validation.invalidAccountId');
        }
      } else {
        return this.$t('error.validation.invalidEmailAddress');
      }
    }

  }
});

/***/ }),

/***/ 1554:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-box"
  }, [_c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "row-login"
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.$t('account.codePage.title')))])]), _vm._v(" "), _c('p', {
    staticClass: "code-tip"
  }, [_vm._v(" " + _vm._s(_vm.$t('account.codePage.pleaseInputLoginCode')) + ": ")]), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.loginCode),
      expression: "loginCode",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "outsideText",
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('account.codePage.pleaseInputLoginCode'),
      "autocomplete": "off",
      "maxlength": "10",
      "name": "loginCode"
    },
    domProps: {
      "value": (_vm.loginCode)
    },
    on: {
      "keyup": function($event) {
        _vm.handleValidation(_vm.$v.loginCode)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.loginCode = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon addon-icon icon-check"
  })]), _vm._v(" "), _c('p', {
    staticClass: "errors"
  }, [(_vm.errorMessage) ? _c('span', {
    staticClass: "icon error-sign"
  }) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.errorMessage))])]), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('button', {
    staticClass: "button",
    class: {
      'is-loading': _vm.processing
    },
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$t('account.codePage.btnSubmit')) + "\n      ")])]), _vm._v(" "), (_vm.obtainCodeUrl) ? _c('div', {
    staticClass: "row-login",
    staticStyle: {
      "-webkit-justify-content": "flex-end",
      "justify-content": "flex-end"
    }
  }, [_c('a', {
    staticClass: "pull-right",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.gotoObtain($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('account.codePage.obtainCode')) + " ")])]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2078369c", module.exports)
  }
}

/***/ }),

/***/ 1558:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-box"
  }, [_c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "row-login"
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.$t('account.loginPage.retrievePasswordTitle')))])]), _vm._v(" "), _c('p', {
    staticClass: "code-tip"
  }, [_vm._v("\n      " + _vm._s(_vm.$t('account.retrievePasswordPage.setNewPassword')) + ":\n    ")]), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.password),
      expression: "password",
      modifiers: {
        "trim": true
      }
    }],
    attrs: {
      "type": "password",
      "minlength": "6",
      "maxlength": "20",
      "placeholder": _vm.$t('account.loginPage.userPasswordPlaceHolder'),
      "autocomplete": "off",
      "name": "password"
    },
    domProps: {
      "value": (_vm.password)
    },
    on: {
      "keyup": function($event) {
        _vm.handleValidation(_vm.$v.password)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.password = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon addon-icon icon-lock"
  }), _vm._v(" "), _c('span', {
    staticClass: "icon addon-icon pull-right",
    class: 'icon-' + _vm.passwordIcon,
    on: {
      "click": _vm.togglePasswordVisibility
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "errors"
  }, [(_vm.errorMessage) ? _c('span', {
    staticClass: "icon error-sign"
  }) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.errorMessage))])]), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('button', {
    staticClass: "button",
    class: {
      'is-loading': _vm.processing
    },
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$t('account.retrievePasswordPage.complete')) + "\n      ")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-27421c54", module.exports)
  }
}

/***/ }),

/***/ 1560:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-box"
  }, [_c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "row-login"
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.$t('account.loginPage.retrievePasswordTitle')))])]), _vm._v(" "), _c('p', {
    staticClass: "code-tip",
    domProps: {
      "innerHTML": _vm._s(_vm.verifyCodeSentHint)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.verifyCode),
      expression: "verifyCode",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "outsideText",
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('account.loginPage.verifyCodePlaceholder'),
      "autocomplete": "off",
      "name": "verifyCode"
    },
    domProps: {
      "value": (_vm.verifyCode)
    },
    on: {
      "keyup": function($event) {
        _vm.handleValidation(_vm.$v.verifyCode)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.verifyCode = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('input', {
    staticClass: "inside-input",
    class: {
      'inputDisabled': _vm.cooldownCounter > 0
    },
    attrs: {
      "type": "button",
      "value": _vm.btnSendTitle
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.sendVerifyCode($event)
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon addon-icon icon-check"
  })]), _vm._v(" "), _c('p', {
    staticClass: "errors"
  }, [(_vm.errorMessage) ? _c('span', {
    staticClass: "icon error-sign"
  }) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.errorMessage))])]), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('button', {
    staticClass: "button",
    class: {
      'is-loading': _vm.processing
    },
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$t('account.registerPage.nextStep')) + "\n      ")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-275e4b56", module.exports)
  }
}

/***/ }),

/***/ 1561:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-box"
  }, [_c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "row-login"
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.$t('account.loginPage.retrievePasswordTitle')))])]), _vm._v(" "), _c('p', {
    staticClass: "code-tip"
  }), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.accountId),
      expression: "accountId",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "outsideText",
    attrs: {
      "type": "text",
      "placeholder": _vm.accountIdPlaceholder,
      "autocomplete": "off",
      "name": "user"
    },
    domProps: {
      "value": (_vm.accountId)
    },
    on: {
      "keyup": function($event) {
        _vm.handleValidation(_vm.$v.accountId)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.accountId = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon addon-icon icon-user"
  })]), _vm._v(" "), _c('p', {
    staticClass: "errors"
  }, [(_vm.errorMessage) ? _c('span', {
    staticClass: "icon error-sign"
  }) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.errorMessage))])]), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('button', {
    staticClass: "button",
    class: {
      'is-loading': _vm.processing
    },
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$t('account.registerPage.nextStep')) + "\n      ")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-277a7a58", module.exports)
  }
}

/***/ }),

/***/ 1582:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-box"
  }, [_c('div', {
    staticClass: "row-login"
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.$t('account.loginPage.otherWays')))])]), _vm._v(" "), _c('div', {
    staticClass: "horizontal-stack-box"
  }, _vm._l((_vm.accountTypes), function(accountType) {
    return _c('div', {
      key: accountType,
      staticClass: "tile"
    }, [_c('a', {
      staticClass: "sdk-icon",
      class: accountType + ((accountType == _vm.currentAccountType && _vm.processing) ? ' rotating' : ''),
      on: {
        "click": function($event) {
          _vm.onLoginByType(accountType)
        }
      }
    }), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.$t(("account.types." + accountType))))])])
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3d7cbd91", module.exports)
  }
}

/***/ }),

/***/ 1584:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-box"
  }, [_c('div', {
    staticClass: "row-login"
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.$t('account.loginPage.title')))])]), _vm._v(" "), _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "row-login"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.accountId),
      expression: "accountId",
      modifiers: {
        "trim": true
      }
    }],
    attrs: {
      "type": "text",
      "maxlength": "50",
      "name": "user",
      "placeholder": _vm.accountIdPlaceholder,
      "autocomplete": "off"
    },
    domProps: {
      "value": (_vm.accountId)
    },
    on: {
      "keyup": function($event) {
        _vm.handleValidation(_vm.$v.accountId)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.accountId = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon addon-icon icon-user"
  })]), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.password),
      expression: "password",
      modifiers: {
        "trim": true
      }
    }],
    ref: "password",
    staticClass: "sibling",
    attrs: {
      "maxlength": "20",
      "type": "password",
      "autocomplete": "off",
      "name": "password",
      "placeholder": _vm.$t('account.loginPage.userPasswordPlaceHolder')
    },
    domProps: {
      "value": (_vm.password)
    },
    on: {
      "keyup": function($event) {
        _vm.handleValidation(_vm.$v.password)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.password = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon addon-icon icon-lock"
  }), _vm._v(" "), _c('span', {
    staticClass: "icon addon-icon pull-right",
    class: 'icon-' + _vm.passwordIcon,
    on: {
      "click": _vm.togglePasswordVisibility
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "errors"
  }, [(_vm.errorMessage) ? _c('span', {
    staticClass: "icon error-sign"
  }) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.errorMessage))])]), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('button', {
    staticClass: "button",
    class: {
      'is-loading': _vm.processing, 'is-disabled': _vm.$v.$invalid
    },
    attrs: {
      "type": "submit",
      "disabled": _vm.$v.$invalid
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$t('account.loginPage.btnSubmit')) + "\n      ")])]), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('router-link', {
    staticClass: "pull-left",
    attrs: {
      "to": {
        name: 'registerStep1'
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('account.loginPage.registration')))]), _vm._v(" "), _c('router-link', {
    staticClass: "pull-right",
    attrs: {
      "to": {
        name: 'retrievePasswordStep1'
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('account.loginPage.forgetPassword')))])], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3ea2b68f", module.exports)
  }
}

/***/ }),

/***/ 1604:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-box"
  }, [_c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "row-login"
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.$t('account.loginPage.titleRegister')))])]), _vm._v(" "), _c('p', {
    staticClass: "code-tip"
  }, [_vm._v(" " + _vm._s(_vm.registerAccountIdLabel) + ": ")]), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.accountId),
      expression: "accountId",
      modifiers: {
        "trim": true
      }
    }],
    attrs: {
      "type": "text",
      "maxlength": "50",
      "placeholder": _vm.registerAccountIdPlaceholder,
      "autocomplete": "off",
      "name": "user"
    },
    domProps: {
      "value": (_vm.accountId)
    },
    on: {
      "keyup": function($event) {
        _vm.handleValidation(_vm.$v.accountId)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.accountId = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon addon-icon icon-user"
  })]), _vm._v(" "), _c('p', {
    staticClass: "errors"
  }, [(_vm.errorMessage) ? _c('span', {
    staticClass: "icon error-sign"
  }) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.errorMessage))])]), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('button', {
    staticClass: "button",
    class: {
      'is-loading': _vm.processing
    },
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$t('account.registerPage.nextStep')) + "\n      ")])]), _vm._v(" "), _c('div', {
    staticClass: "row-login",
    staticStyle: {
      "-webkit-justify-content": "flex-end",
      "justify-content": "flex-end"
    }
  }, [_c('a', {
    staticClass: "pull-right",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$router.back()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('account.registerPage.goLoginPage')) + " ")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-531b46a8", module.exports)
  }
}

/***/ }),

/***/ 1605:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-box"
  }, [_c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "row-login"
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.$t('account.loginPage.titleRegister')))])]), _vm._v(" "), (!_vm.isMobileAccount) ? _c('p', {
    staticClass: "code-tip"
  }, [_vm._v(" " + _vm._s(_vm.$t('account.registerPage.pleaseInputCaptchaVerifyCode')) + ": ")]) : _vm._e(), _vm._v(" "), (_vm.isMobileAccount) ? _c('p', {
    staticClass: "code-tip"
  }, [_vm._v(" " + _vm._s(_vm.$t('account.registerPage.pleaseInputMobileVerifyCode')) + ": ")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.verifyCode),
      expression: "verifyCode",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "outsideText",
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('account.loginPage.verifyCodePlaceholder'),
      "autocomplete": "off",
      "maxlength": "10",
      "name": "verifyCode"
    },
    domProps: {
      "value": (_vm.verifyCode)
    },
    on: {
      "keyup": function($event) {
        _vm.handleValidation(_vm.$v.verifyCode)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.verifyCode = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), (!_vm.isMobileAccount) ? _c('div', {
    staticClass: "captchaBox"
  }, [_c('img', {
    staticClass: "captcha",
    attrs: {
      "src": _vm.captchaUrl
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.updateCaptcha($event)
      }
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.isMobileAccount) ? _c('input', {
    staticClass: "inside-input",
    class: {
      'inputDisabled': _vm.cooldownCounter > 0
    },
    attrs: {
      "type": "button",
      "value": _vm.sendCodeTitle
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.sendMobileVerifyCode($event)
      }
    }
  }) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "icon addon-icon icon-check"
  })]), _vm._v(" "), _c('p', {
    staticClass: "errors"
  }, [(_vm.errorMessage) ? _c('span', {
    staticClass: "icon error-sign"
  }) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.errorMessage))])]), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('button', {
    staticClass: "button",
    class: {
      'is-loading': _vm.processing
    },
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$t('account.registerPage.nextStep')) + "\n      ")])]), _vm._v(" "), _c('div', {
    staticClass: "row-login",
    staticStyle: {
      "-webkit-justify-content": "flex-end",
      "justify-content": "flex-end"
    }
  }, [_c('a', {
    staticClass: "pull-right",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$router.back()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('account.registerPage.goLoginPage')) + " ")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-53295e29", module.exports)
  }
}

/***/ }),

/***/ 1606:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-box"
  }, [_c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "row-login"
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.$t('account.loginPage.titleRegister')))])]), _vm._v(" "), _c('p', {
    staticClass: "code-tip"
  }, [_vm._v(" " + _vm._s(_vm.$t('account.registerPage.pleaseInputPassword')) + ": ")]), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.password),
      expression: "password",
      modifiers: {
        "trim": true
      }
    }],
    ref: "password",
    attrs: {
      "type": "password",
      "minlength": "6",
      "maxlength": "20",
      "placeholder": _vm.$t('account.loginPage.userPasswordPlaceHolder'),
      "autocomplete": "off",
      "name": "password"
    },
    domProps: {
      "value": (_vm.password)
    },
    on: {
      "keyup": function($event) {
        _vm.handleValidation(_vm.$v.password)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.password = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon addon-icon icon-lock"
  }), _vm._v(" "), _c('span', {
    staticClass: "icon addon-icon pull-right",
    class: 'icon-' + _vm.passwordIcon,
    on: {
      "click": _vm.togglePasswordVisibility
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "errors"
  }, [(_vm.errorMessage) ? _c('span', {
    staticClass: "icon error-sign"
  }) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.errorMessage))])]), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('button', {
    staticClass: "button",
    class: {
      'is-loading': _vm.processing
    },
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$t('account.registerPage.btnRegister')) + "\n      ")])]), _vm._v(" "), _c('div', {
    staticClass: "row-login",
    staticStyle: {
      "-webkit-justify-content": "flex-end",
      "justify-content": "flex-end"
    }
  }, [_c('a', {
    staticClass: "pull-right",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$router.back()
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('account.registerPage.goLoginPage')) + " ")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-533775aa", module.exports)
  }
}

/***/ }),

/***/ 161:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return password; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return accountId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return registerAccountId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return verifyCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return loginCode; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_utils__ = __webpack_require__(27);



var password = {
  required: __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["required"],
  minLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["minLength"])(6),
  maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["maxLength"])(20)
};

var accountId = {
  required: __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["required"],
  valid: function valid(val) {
    if (window.acsConfig.isMobileAccountSupported) {
      return __WEBPACK_IMPORTED_MODULE_1_common_js_utils__["h" /* isValidMobileNumber */](val) || __WEBPACK_IMPORTED_MODULE_1_common_js_utils__["j" /* isValidEmail */](val);
    } else {
      return __WEBPACK_IMPORTED_MODULE_1_common_js_utils__["j" /* isValidEmail */](val);
    }
  }
};

var registerAccountId = {
  required: __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["required"],
  valid: function valid(val) {
    if (window.acsConfig.isMobileAccountSupported) {
      return __WEBPACK_IMPORTED_MODULE_1_common_js_utils__["h" /* isValidMobileNumber */](val) || __WEBPACK_IMPORTED_MODULE_1_common_js_utils__["m" /* isValidFirevaleEmail */](val);
    } else {
      return __WEBPACK_IMPORTED_MODULE_1_common_js_utils__["j" /* isValidEmail */](val);
    }
  }
};

var verifyCode = {
  required: __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["required"],
  minLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["minLength"])(4),
  maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["maxLength"])(6)
};

var loginCode = {
  required: __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["required"],
  minLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["minLength"])(6),
  maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["maxLength"])(10)
};

/***/ }),

/***/ 1612:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "g-doc"
  }, [_c('div', {
    ref: "gCon",
    staticClass: "g-con"
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.canGoBack),
      expression: "canGoBack"
    }],
    staticClass: "icon nav-icon icon-back show-in-app",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$router.back()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon nav-icon pull-right icon-close show-in-app",
    on: {
      "click": _vm.onClose
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "g-mask"
  }, [_c('transition', {
    attrs: {
      "enter-active-class": (_vm.transitionName + "-enter-active"),
      "leave-active-class": (_vm.transitionName + "-leave-active")
    }
  }, [_c('router-view')], 1)], 1), _vm._v(" "), _c('div', {
    ref: "msg"
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5756e903", module.exports)
  }
}

/***/ }),

/***/ 1694:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-box"
  }, [(_vm.currentAccount) ? _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "row-login"
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.$t('account.loginPage.quickTitle')))])]), _vm._v(" "), _c('div', {
    staticClass: "row-login"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.currentAccount.label),
      expression: "currentAccount.label",
      modifiers: {
        "trim": true
      }
    }],
    attrs: {
      "type": "text",
      "name": "accountLabel",
      "readonly": ""
    },
    domProps: {
      "value": (_vm.currentAccount.label)
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.toggleAccountsListVisibility($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.currentAccount.label = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon addon-icon icon-user"
  }), _vm._v(" "), _c('span', {
    staticClass: "icon addon-icon pull-right icon-down",
    class: {
      'flip-vertical': _vm.accountListVisible
    },
    on: {
      "click": _vm.toggleAccountsListVisibility
    }
  }), _vm._v(" "), (_vm.accountListVisible) ? _c('div', {
    ref: "accountList",
    staticClass: "account-list"
  }, _vm._l((_vm.historyAccounts), function(account) {
    return _c('div', {
      key: account.label,
      staticClass: "account-item row-login"
    }, [_c('span', {
      staticStyle: {
        "width": "100%",
        "padding": "0"
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.chooseAccount(account)
        }
      }
    }, [_vm._v(_vm._s(account.label))]), _vm._v(" "), _c('span', {
      staticClass: "icon addon-icon pull-right icon-times icon-small",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.toggleAccountsListVisibility($event)
        }
      }
    })])
  })) : _vm._e()]), _vm._v(" "), _c('p', {
    staticClass: "errors"
  }, [(_vm.errorMessage) ? _c('span', {
    staticClass: "icon error-sign"
  }) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.errorMessage))])]), _vm._v(" "), _c('div', {
    staticClass: "row-login",
    staticStyle: {
      "margin-top": ".8rem",
      "margin-bottom": "1.0rem"
    }
  }, [_c('input', {
    class: {
      'is-disabled': _vm.processing
    },
    attrs: {
      "type": "submit",
      "disabled": _vm.processing
    },
    domProps: {
      "value": _vm.$t('account.loginPage.btnSubmit')
    }
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.processing),
      expression: "processing"
    }],
    staticClass: "icon progress-icon rotating"
  })]), _vm._v(" "), _c('hr', {
    staticClass: "show-in-app"
  }), _vm._v(" "), _c('div', {
    staticClass: "row-login show-in-app",
    staticStyle: {
      "-webkit-justify-content": "center",
      "justify-content": "center"
    }
  }, [_c('router-link', {
    staticClass: "pull-right",
    attrs: {
      "to": {
        name: 'selectAccountType'
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('account.quickLoginPage.gotoSelectAccount')))])], 1)]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f918bc74", module.exports)
  }
}

/***/ }),

/***/ 1701:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(760);


/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _server;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* harmony default export */ __webpack_exports__["a"] = ({
  pageTitle: '糟糕， 出錯了',

  // errors replied from acs server
  server: (_server = {
    networkError: '網絡錯誤，請稍後再試',
    badRequestParams: '請求參數錯誤',

    userNameTooLong: '用戶名超長',
    accountInUse: '賬號已被使用',
    mobileInUse: '手機號碼已被其他賬號使用',
    emailInUse: '電子郵箱已被其他賬號使用',
    nicknameInUse: '暱稱已被其他用戶使用',
    accountNotExist: '用戶名或密碼錯誤',
    invalidVerifyCode: '驗證碼輸入有誤',
    passwordNotMatch: '用戶名或密碼錯誤',
    tooManyFails: '您已經多次輸錯密碼，請稍後再試',
    sendSmsFailed: '驗證短信發送失敗, 請稍後再試',
    sendSmsCooldown: '一分鐘內不能發送多次驗證碼',
    sendEmailFailed: '驗證郵件發送失敗，請稍後再試',
    sendEmailCooldown: '一分鐘內不能發送多次驗證碼',
    accountNotFound: '賬號不存在',
    accountIdChanged: '賬號被修改'
  }, _defineProperty(_server, 'sendSmsCooldown', '一分鐘內只能發送一次，請稍後再試'), _defineProperty(_server, 'imageSize128x128', '圖片的尺寸必須為128x128'), _defineProperty(_server, 'imageSize400x400', '圖片的尺寸必須為400x400'), _defineProperty(_server, 'imageSize640x260', '圖片的尺寸必須為640x260'), _defineProperty(_server, 'imageFormatPNG', '圖片格式必須為PNG文件'), _defineProperty(_server, 'illegal', '沒有權限'), _defineProperty(_server, 'goodsNotFound', '未找到商品'), _defineProperty(_server, 'appNameExists', '應用名稱【{app_name}】已被其他應用使用'), _defineProperty(_server, 'emptyGoodsId', '商品ID不能為空'), _defineProperty(_server, 'emptyGoodsName', '商品名稱不能為空'), _defineProperty(_server, 'emptyGoodsDescription', '商品簡介不能為空'), _defineProperty(_server, 'invalidGoodsPrice', '商品價格不能為負數'), _defineProperty(_server, 'emptySectionTitle', '版塊標題不能為空'), _defineProperty(_server, 'emptyForumId', '版塊所屬論壇編號不能為空'), _defineProperty(_server, 'forumNotFound', '未找到論壇'), _defineProperty(_server, 'mallNotFound', '未找到商城'), _defineProperty(_server, 'newsNotFound', '未找到該內容'), _defineProperty(_server, 'goodsNotFound', '未找到該商品'), _defineProperty(_server, 'addressNotFound', '未找到該地址'), _defineProperty(_server, 'newsContentRequired', '內容不能為空'), _defineProperty(_server, 'newsTitleMinLength', '標題至少4個字'), _defineProperty(_server, 'newsTitleMaxLength', '標題不能超過30個字'), _defineProperty(_server, 'forumNotExist', '論壇不存在'), _defineProperty(_server, 'postNotExist', '帖子不存在'), _defineProperty(_server, 'commentNotFound', '評論不存在'), _defineProperty(_server, 'needLogin', '需要登錄'), _defineProperty(_server, 'userNotExist', '用戶不存在'), _defineProperty(_server, 'emojiCharsInParam', '提交的參數不能包含表情符號'), _server),

  // errors generated by form validator
  validation: {
    requireAccountId: '請輸入您的手機號碼/電子郵箱',
    requireMobile: '請輸入您的手機號碼',
    requireEmail: '請輸入您的電子郵箱',
    requirePassword: '請輸入密碼',
    requireVerifyCode: '請輸入驗證碼',
    requireNickname: '請輸入暱稱',
    requireResidentName: '請輸入您的真實姓名',
    requireResidentId: '請輸入您的身份證號碼',
    invalidAccountId: '請輸入正確的手機號碼／電子郵箱',
    invalidMobileNumber: '請輸入正確的手機號碼',
    invalidEmailAddress: '請輸入正確的電子郵箱',
    invalidNickname: '暱稱不能包含字符"%"',
    invalidVerifyCodeLength: '驗證碼長度4~6位',
    invalidResidentId: '您必須輸入自己的身份證號碼',
    emojiPostTitle: '帖子標題不能包含表情文字',
    emojiNickname: '暱稱不能包含表情文字',
    minPasswordLength: '密碼太短了',
    maxPasswordLength: '密碼太長了',
    mobileNotChanged: '當前已綁定此手機號碼',
    minNicknameLength: '暱稱太短了',
    maxNicknameLength: '暱稱太長了',
    minResidentNameLength: '姓名至少兩個字',
    maxResidentNameLength: '姓名太長了',
    minResidentIdLength: '身份證號碼至少15位',
    maxResidentIdLength: '身份證號碼最長18位',
    minAddressLength: '地址太短了',
    maxAddressLength: '地址太長了',
    emailNotChanged: '當前已綁定此電子郵箱',
    postContentRequired: '帖子內容不能為空',
    postTitleMinLength: '標題文字太短了',
    postTitleMaxLength: '標題文字太長了',
    commentContentRequired: '回帖內容最少5個字'
  }
});

/***/ }),

/***/ 27:
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

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* harmony default export */ __webpack_exports__["a"] = ({
  closeWebviewWithResult: function closeWebviewWithResult(result) {
    if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.closeWebviewWithResult === 'function') {
      var jsonStr = JSON.stringify(result);
      AndroidNativeAPI.closeWebviewWithResult(jsonStr);
    } else if ((typeof IOSNativeAPI === 'undefined' ? 'undefined' : _typeof(IOSNativeAPI)) === 'object' && typeof IOSNativeAPI.closeWebviewWithResult === 'function') {
      IOSNativeAPI.closeWebviewWithResult(result);
    } else if (_typeof(window.webkit) === 'object' && _typeof(window.webkit.messageHandlers) === 'object' && _typeof(window.webkit.messageHandlers.IOSNativeAPI) === 'object') {
      window.webkit.messageHandlers.IOSNativeAPI.postMessage({ method: 'closeWebviewWithResult', params: result });
    } else if (window.acsConfig.platform == 'wp8') {
      var _jsonStr = JSON.stringify(result);
      window.external.notify(_jsonStr);
    } else {
      console.error('dont know how to close webview dialog');
    }
  },

  isMediaSourceTypeAvailable: function isMediaSourceTypeAvailable(type) {
    if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.isMediaSourceTypeAvailable === 'function') {
      return Promise.resolve(AndroidNativeAPI.isMediaSourceTypeAvailable(type) == 1);
    } else if ((typeof IOSNativeAPI === 'undefined' ? 'undefined' : _typeof(IOSNativeAPI)) === 'object' && typeof IOSNativeAPI.isMediaSourceTypeAvailable === 'function') {
      return Promise.resolve(IOSNativeAPI.isMediaSourceTypeAvailable(type) == 1);
    } else if (_typeof(window.webkit) === 'object' && _typeof(window.webkit.messageHandlers) === 'object' && _typeof(window.webkit.messageHandlers.IOSNativeAPI) === 'object') {
      window.webkit.messageHandlers.IOSNativeAPI.postMessage({ method: 'isMediaSourceTypeAvailable', params: type });
      return new Promise(function (resolve, reject) {
        window.acsConfig.isMediaSourceTypeAvailableCallback = function (result) {
          window.acsConfig.isMediaSourceTypeAvailableCallback = undefined;
          resolve(result);
        };
      });
    } else {
      console.error('native function isMediaSourceTypeAvailable is not available');
    }
    return Promise.resolve(false);
  },

  pickAvatarFrom: function pickAvatarFrom(type, callback) {
    if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.pickAvatarFrom === 'function') {
      window.acsConfig.pickAvatarFromCallback = function (result) {
        window.acsConfig.pickAvatarFromCallback = undefined;
        callback(JSON.parse(result));
      };
      AndroidNativeAPI.pickAvatarFrom(type);
    } else if ((typeof IOSNativeAPI === 'undefined' ? 'undefined' : _typeof(IOSNativeAPI)) === 'object' && typeof IOSNativeAPI.pickAvatarFromCallback === 'function') {
      IOSNativeAPI.pickAvatarFromCallback(type, callback);
    } else if (_typeof(window.webkit) === 'object' && _typeof(window.webkit.messageHandlers) === 'object' && _typeof(window.webkit.messageHandlers.IOSNativeAPI) === 'object') {
      window.acsConfig.pickImageCallback = function (result) {
        window.acsConfig.pickImageCallback = undefined;
        callback(JSON.parse(result));
      };
      window.webkit.messageHandlers.IOSNativeAPI.postMessage({ method: 'pickAvatarFrom', params: type });
    } else {
      console.error('native function isMediaSourceTypeAvailable is not available');
    }
  },

  pickImageFrom: function pickImageFrom(type, callback) {
    if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.pickImageFrom === 'function') {
      window.acsConfig.pickImageFromCallback = function (result) {
        window.acsConfig.pickImageFromCallback = undefined;
        callback(JSON.parse(result));
      };
      AndroidNativeAPI.pickImageFrom(type);
    } else if ((typeof IOSNativeAPI === 'undefined' ? 'undefined' : _typeof(IOSNativeAPI)) === 'object' && typeof IOSNativeAPI.pickImageFromCallback === 'function') {
      IOSNativeAPI.pickImageFromCallback(type, callback);
    } else if (_typeof(window.webkit) === 'object' && _typeof(window.webkit.messageHandlers) === 'object' && _typeof(window.webkit.messageHandlers.IOSNativeAPI) === 'object') {
      window.acsConfig.pickImageCallback = function (result) {
        window.acsConfig.pickImageCallback = undefined;
        callback(JSON.parse(result));
      };
      window.webkit.messageHandlers.IOSNativeAPI.postMessage({ method: 'pickImageFrom', params: type });
    } else {
      console.error('native function isMediaSourceTypeAvailable is not available');
    }
  },

  slideShowPhotos: function slideShowPhotos(imageUrls, showingImageUrl) {
    if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.slideShowPhotos === 'function') {
      AndroidNativeAPI.slideShowPhotos(JSON.stringify(imageUrls), showingImageUrl);
    } else if (_typeof(window.webkit) === 'object' && _typeof(window.webkit.messageHandlers) === 'object' && _typeof(window.webkit.messageHandlers.IOSNativeAPI) === 'object') {
      window.webkit.messageHandlers.IOSNativeAPI.postMessage({
        method: 'slideShowPhotos',
        params: {
          urls: imageUrls,
          showUrl: showingImageUrl
        }
      });
    }
  },

  showAlertDialog: function showAlertDialog(title, message, cancelBtnTitle, okBtnTitle, callback) {
    if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.showAlertDialog === 'function') {
      window.showAlertDialogCallback = callback;
      AndroidNativeAPI.showAlertDialog(title, message, cancelBtnTitle, okBtnTitle);
    } else if ((typeof IOSNativeAPI === 'undefined' ? 'undefined' : _typeof(IOSNativeAPI)) === 'object' && typeof IOSNativeAPI.showAlertDialogMessageCancelTitleOkTitleCallback === 'function') {
      IOSNativeAPI.showAlertDialogMessageCancelTitleOkTitleCallback(title, message, cancelBtnTitle, okBtnTitle, callback);
    } else if (_typeof(window.webkit) === 'object' && _typeof(window.webkit.messageHandlers) === 'object' && _typeof(window.webkit.messageHandlers.IOSNativeAPI) === 'object') {
      window.acsConfig.showAlertDialogCallback = function (result) {
        window.acsConfig.showAlertDialogCallback = undefined;
        callback(result);
      };
      window.webkit.messageHandlers.IOSNativeAPI.postMessage({
        method: 'showAlertDialog',
        params: {
          title: title,
          message: message,
          cancelBtnTitle: cancelBtnTitle,
          okBtnTitle: okBtnTitle
        }
      });
    } else {
      console.error('dont know how to show alert dialog');
    }
  },

  getActiveSession: function getActiveSession() {
    if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.getActiveSession === 'function') {
      return Promise.resolve(JSON.parse(AndroidNativeAPI.getActiveSession()));
    } else if ((typeof IOSNativeAPI === 'undefined' ? 'undefined' : _typeof(IOSNativeAPI)) === 'object' && typeof IOSNativeAPI.getActiveSession === 'function') {
      return Promise.resolve(IOSNativeAPI.getActiveSession());
    } else if (_typeof(window.webkit) === 'object' && _typeof(window.webkit.messageHandlers) === 'object' && _typeof(window.webkit.messageHandlers.IOSNativeAPI) === 'object') {
      window.webkit.messageHandlers.IOSNativeAPI.postMessage({ method: 'getActiveSession' });
      return new Promise(function (resolve, reject) {
        window.acsConfig.getActiveSessionCallback = function (result) {
          window.acsConfig.getActiveSessionCallback = undefined;
          console.log('get active session: ', result);
          resolve(JSON.parse(result));
        };
      });
    } else {
      return Promise.reject({ success: false });
    }
  },

  isWechatPaySupport: function isWechatPaySupport() {
    if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.isWechatPaySupport === 'function') {
      return AndroidNativeAPI.isWechatPaySupport();
    } else if ((typeof IOSNativeAPI === 'undefined' ? 'undefined' : _typeof(IOSNativeAPI)) === 'object' && typeof IOSNativeAPI.getActiveSession === 'function') {
      return false;
    } else {
      return false;
    }
  },

  isGGPlayPaySupported: function isGGPlayPaySupported() {
    if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.isGGPlayPaySupported === 'function') {
      return AndroidNativeAPI.isGGPlayPaySupported();
    } else if ((typeof IOSNativeAPI === 'undefined' ? 'undefined' : _typeof(IOSNativeAPI)) === 'object' && typeof IOSNativeAPI.getActiveSession === 'function') {
      return false;
    } else {
      return false;
    }
  },

  showWechatLogin: function showWechatLogin(state, callback) {
    if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.isWechatPaySupport === 'function') {
      window.acsConfig.wechatLoginCallback = callback;
      return AndroidNativeAPI.showWechatLogin(state);
    } else if ((typeof IOSNativeAPI === 'undefined' ? 'undefined' : _typeof(IOSNativeAPI)) === 'object' && typeof IOSNativeAPI.getActiveSession === 'function') {
      return IOSNativeAPI.showWechatLogin(state);
    } else {
      return false;
    }
  },

  openWechatPay: function openWechatPay(payinfo) {
    if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.isWechatPaySupport === 'function') {
      return AndroidNativeAPI.openWechatPay(payinfo);
    } else if ((typeof IOSNativeAPI === 'undefined' ? 'undefined' : _typeof(IOSNativeAPI)) === 'object' && typeof IOSNativeAPI.getActiveSession === 'function') {
      return false;
    } else {
      return false;
    }
  },

  openWechatPayWithCallback: function openWechatPayWithCallback(payinfo, callback) {
    if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.isWechatPaySupport === 'function') {
      window.acsConfig.showSuccessCallback = callback;
      return AndroidNativeAPI.openWechatPay(payinfo);
    } else if ((typeof IOSNativeAPI === 'undefined' ? 'undefined' : _typeof(IOSNativeAPI)) === 'object' && typeof IOSNativeAPI.getActiveSession === 'function') {
      return false;
    } else {
      return false;
    }
  },

  openBrowser: function openBrowser(url) {
    if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.openBrowser === 'function') {
      AndroidNativeAPI.openBrowser(url);
    } else if (_typeof(window.webkit) === 'object' && _typeof(window.webkit.messageHandlers) === 'object' && _typeof(window.webkit.messageHandlers.IOSNativeAPI) === 'object') {
      window.webkit.messageHandlers.IOSNativeAPI.postMessage({ method: 'openBrowser', params: url });
    } else {
      console.error('native function openBrowser is not available');
    }
  },

  updateNickname: function updateNickname(nickname) {
    if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.updateNickname === 'function') {
      AndroidNativeAPI.updateNickname(nickname);
    } else if (_typeof(window.webkit) === 'object' && _typeof(window.webkit.messageHandlers) === 'object' && _typeof(window.webkit.messageHandlers.IOSNativeAPI) === 'object') {
      window.webkit.messageHandlers.IOSNativeAPI.postMessage({ method: 'updateNickname', params: nickname });
    } else {
      console.error('native function updateNickname is not available');
    }
  },

  updateAvatar: function updateAvatar(url) {
    if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.updateAvatar === 'function') {
      AndroidNativeAPI.updateAvatar(url);
    } else if (_typeof(window.webkit) === 'object' && _typeof(window.webkit.messageHandlers) === 'object' && _typeof(window.webkit.messageHandlers.IOSNativeAPI) === 'object') {
      window.webkit.messageHandlers.IOSNativeAPI.postMessage({ method: 'updateAvatar', params: url });
    } else {
      console.error('native function updateAvatar is not available');
    }
  },

  canGoback: function canGoback() {
    if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.canGoback1 === 'function') {
      return new Promise(function (resolve, reject) {
        window.acsConfig.canGoback1Callback = function (result) {
          window.acsConfig.canGoback1Callback = undefined;
          resolve(result);
        };
        AndroidNativeAPI.canGoback1();
      });
    } else if ((typeof AndroidNativeAPI === 'undefined' ? 'undefined' : _typeof(AndroidNativeAPI)) === 'object' && typeof AndroidNativeAPI.canGoback === 'function') {
      // 旧版本bug
      return Promise.resolve('yes');
    } else if (_typeof(window.webkit) === 'object' && _typeof(window.webkit.messageHandlers) === 'object' && _typeof(window.webkit.messageHandlers.IOSNativeAPI) === 'object') {
      window.webkit.messageHandlers.IOSNativeAPI.postMessage({ method: 'canGoback' });
      return new Promise(function (resolve, reject) {
        window.acsConfig.canGobackCallback = function (result) {
          window.acsConfig.canGobackCallback = undefined;
          resolve(result);
        };
      });
    } else {
      return Promise.resolve('undefined');
    }
  }

});

/***/ }),

/***/ 391:
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

/***/ 41:
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

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  pageTitle: 'Oops, something went wrong',

  // errors replied from acs server
  server: {
    networkError: 'Network not available, please try later',
    badRequestParams: 'Bad request parameters',

    userNameTooLong: 'Name is too long',
    accountInUse: 'Account already in use',
    mobileInUse: 'The mobile number is tabken by other account',
    emailInUse: 'The email is taken by other account',
    nicknameInUse: 'Nickname is taken by other account',
    accountNotExist: 'Account not exists or wrong password',
    invalidVerifyCode: 'Verify code not match',
    passwordNotMatch: 'Incorrect password',
    tooManyFails: 'You\'ve input wrong password serveral times, please try later',
    sendSmsFailed: 'Send SMS message failed',
    sendSmsCooldown: 'You can not send SMS message now, please try later',
    sendEmailFailed: 'Send email failed',
    sendEmailCooldown: 'You can not send email now, please try later',
    accountNotFound: 'Account not exists',
    accountIdChanged: 'Account ID changed',
    imageSize128x128: 'The image size should be 128x128',
    imageSize400x400: 'The image size should be 400x400',
    imageSize640x260: 'The image size should be 640x260',
    imageFormatPNG: 'The image should be PNG format',
    illegal: 'No privilege',
    goodsNotFound: 'Goods not found',
    appNameExists: 'App name【{app_name}】is taken by other app',
    emptyGoodsId: 'Goods ID can not be empty',
    emptyGoodsName: 'Goods name can not be empty',
    emptyGoodsDescription: 'Goods description can not be empty',
    invalidGoodsPrice: 'Goods price can not be a negative number',
    emptySectionTitle: 'Forum category title can not be empty',
    emptyForumId: 'Forum ID can not be empty',
    forumNotFound: 'Specified forum not found',
    mallNotFound: 'Specified mall not found',
    newsNotFound: 'News not found',
    addressNotFound: 'Address not found',
    newsContentRequired: 'News content can not be empty',
    newsTitleMinLength: 'Too short news title',
    newsTitleMaxLength: 'Too lang news title',
    forumNotExist: 'Forum not exists',
    postNotExist: 'Forum post not exists',
    commentNotFound: 'Post comment not found',
    needLogin: 'You should login to continue',
    userNotExist: 'User not exists',
    emojiCharsInParam: 'Can not use emoji characters in request params'
  },

  // errors generated by form validator
  validation: {
    requireAccountId: 'Please input email or mobile number',
    requireMobile: 'Please input your mobile number',
    requireEmail: 'Please input your email address',
    requirePassword: 'Please input password',
    requireVerifyCode: 'Please input verify code',
    requireNickname: 'Please input nickname',
    requireResidentName: 'Please input your resident name',
    requireResidentId: 'Please input your social security number',
    invalidAccountId: 'Please input corrent email or mobile number',
    invalidMobileNumber: 'Please input correct mobile phone number',
    invalidEmailAddress: 'Please input correct email address',
    invalidNickname: 'Can\'t use \'%\' character in nickname',
    invalidVerifyCodeLength: 'Invalid verify code',
    invalidResidentId: 'You must input your social security number',
    emojiPostTitle: 'Can\'t  use emoji character in post title',
    emojiNickname: 'Can\'t use emoji character in nickname',
    minPasswordLength: 'Password is too short',
    maxPasswordLength: 'Password is too long',
    mobileNotChanged: 'Already bind this mobile number',
    minNicknameLength: 'Nickname is too short',
    maxNicknameLength: 'Nickname is too long',
    minResidentNameLength: 'Resident name is too short',
    maxResidentNameLength: 'Redident name is too long',
    minResidentIdLength: 'Resident ID is too short',
    maxResidentIdLength: 'Resident ID is too long',
    minAddressLength: 'Address is too short',
    maxAddressLength: 'Address is too long',
    emailNotChanged: 'Already bind this email number',
    postContentRequired: 'Please input post content',
    postTitleMinLength: 'Post title is too short',
    postTitleMaxLength: 'Post title is too long',
    commentContentRequired: 'Comment content is too short'
  }
});

/***/ }),

/***/ 52:
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

/***/ 64:
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

/***/ 760:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_router__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_axios__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_i18n__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuelidate__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuelidate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_vuelidate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routers__ = __webpack_require__(879);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__i18n__ = __webpack_require__(874);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__store__ = __webpack_require__(883);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__serverApi__ = __webpack_require__(880);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_common_js_filters__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_common_js_acs__ = __webpack_require__(41);

















__webpack_require__(1161);

__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_6_vuelidate___default.a);
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_4_vue_axios___default.a, __WEBPACK_IMPORTED_MODULE_3_axios___default.a);
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_2_vue_router__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_5_vue_i18n__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_1_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_10__serverApi__["a" /* default */]);

__WEBPACK_IMPORTED_MODULE_3_axios___default.a.defaults.headers.common['x-csrf-token'] = __WEBPACK_IMPORTED_MODULE_12_common_js_acs__["g" /* csrfToken */];
__WEBPACK_IMPORTED_MODULE_3_axios___default.a.defaults.headers.common['acs-app-id'] = __WEBPACK_IMPORTED_MODULE_12_common_js_acs__["b" /* getAppId */]();
__WEBPACK_IMPORTED_MODULE_3_axios___default.a.defaults.headers.common['acs-device-id'] = __WEBPACK_IMPORTED_MODULE_12_common_js_acs__["c" /* getDeviceId */]();

var i18n = new __WEBPACK_IMPORTED_MODULE_5_vue_i18n__["a" /* default */]({
  locale: __WEBPACK_IMPORTED_MODULE_12_common_js_acs__["h" /* locale */],
  messages: __WEBPACK_IMPORTED_MODULE_8__i18n__["a" /* default */]
});

Object.keys(__WEBPACK_IMPORTED_MODULE_11_common_js_filters__).forEach(function (k) {
  __WEBPACK_IMPORTED_MODULE_1_vue___default.a.filter(k, __WEBPACK_IMPORTED_MODULE_11_common_js_filters__[k]);
});

var transitionSlideLeftToRight = 'slide-right';
var transitionSlideRightToLeft = 'slide-left';

// insert popstate event listener before router,
// by doing so, we can change transition name while user press "Back" button
window.addEventListener('popstate', function (_) {
  __WEBPACK_IMPORTED_MODULE_9__store__["a" /* default */].commit('SET_TRANSITION_NAME', transitionSlideLeftToRight);
});

var router = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__routers__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_2_vue_router__["a" /* default */]);

router.afterEach(function (route) {
  __WEBPACK_IMPORTED_MODULE_1_vue___default.a.nextTick(function (_) {
    return __WEBPACK_IMPORTED_MODULE_9__store__["a" /* default */].commit('SET_TRANSITION_NAME', transitionSlideRightToLeft);
  });
});

var App = new __WEBPACK_IMPORTED_MODULE_1_vue___default.a({
  i18n: i18n,
  router: router,
  store: __WEBPACK_IMPORTED_MODULE_9__store__["a" /* default */]
}).$mount('#app');

/***/ }),

/***/ 872:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  loginPage: {
    title: 'Firevale Account',
    quickTitle: 'Select Account Type',
    titleRegister: 'Register Account',
    titleBind: 'Bind Account',
    retrievePasswordTitle: 'Retrieve Password',
    titleReset: 'Reset Password',
    btnSubmit: 'Login',
    btnReset: 'Reset',
    sendVerifyCode: 'Send code',
    sendVerifyCodeAgain: 'Resend code',
    accountIdPlaceholder: 'Email or mobile phone number',
    userMobilePlaceholder: 'Mobile phone number',
    userEmailPlaceholder: 'Email',
    userMobileLabel: 'Please input your mobile phone number',
    userEmailLabel: 'Please input your email',
    userPasswordPlaceHolder: 'Please input password',
    verifyCodePlaceholder: 'Please input verify code',
    forgetPassword: 'Forgot password',
    registration: 'Register now',
    otherWays: 'Select Account Type',
    changeCode: 'Change'
  },

  registerPage: {
    btnRegister: 'Register',
    btnBind: 'Complete account',
    sendAgain: "Send again",
    cooldownText: "Resend({timer}s)",
    goLoginPage: 'Login >',
    mobileVerifyCodeSent: 'Verify code sent',
    nextStep: 'Next',
    pleaseInputCaptchaVerifyCode: 'Please input verify code',
    pleaseInputMobileVerifyCode: 'Please input verify code',
    pleaseInputPassword: 'Please input password'
  },

  retrievePasswordPage: {
    nextStep: 'Next',
    pleaseInputAccountName: 'Please input account id',
    verifyCodeSentToEmail: 'Verify code has been sent to your email <strong>{email}</strong>',
    verifyCodeSentToSms: 'Verify code has been sent to your mobile <strong>{mobile}</strong>',
    setNewPassword: 'Please set your new password',
    complete: 'Done'
  },

  quickLoginPage: {
    gotoSelectAccount: 'Other ways >'
  },

  codePage: {
    title: 'Active Code'
  },

  types: {
    anonymous: 'Anonymous',
    firevale: 'Firevale',
    qq: 'QQ',
    wechat: 'Wechat',
    weibo: 'Weibo',
    facebook: 'Facebook'
  },

  alert: {
    hint: 'Hint',
    anonymousHintMessage: 'Your game data may lost due to anonymous login, we strongly recommend you complete your account info to enhance your data security.',
    cancel: 'Cancel'
  }
});

/***/ }),

/***/ 873:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__account__ = __webpack_require__(872);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_i18n_en_error__ = __webpack_require__(483);



/* harmony default export */ __webpack_exports__["a"] = ({
  account: __WEBPACK_IMPORTED_MODULE_0__account__["a" /* default */],
  error: __WEBPACK_IMPORTED_MODULE_1_common_i18n_en_error__["a" /* default */]
});

/***/ }),

/***/ 874:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__zh_hans__ = __webpack_require__(876);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__zh_hant__ = __webpack_require__(878);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__en__ = __webpack_require__(873);




/* harmony default export */ __webpack_exports__["a"] = ({
  'zh-hans': __WEBPACK_IMPORTED_MODULE_0__zh_hans__["a" /* default */],
  'zh-hant': __WEBPACK_IMPORTED_MODULE_1__zh_hant__["a" /* default */],
  'en': __WEBPACK_IMPORTED_MODULE_2__en__["a" /* default */]
});

/***/ }),

/***/ 875:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  loginPage: {
    title: '火谷账号登陆',
    quickTitle: '选择账号登陆',
    titleRegister: '账号注册',
    titleBind: '账号绑定',
    retrievePasswordTitle: '找回密码',
    titleReset: '密码重置',
    btnSubmit: '登录',
    btnReset: '重置',
    sendVerifyCode: '获取验证码',
    sendVerifyCodeAgain: '重新发送',
    accountIdPlaceholder: '请输入手机号／电子邮箱',
    userMobilePlaceholder: '请输入您的手机号码',
    userEmailPlaceholder: '请输入您的电子邮箱',
    userMobileLabel: '请输入您的手机号码',
    userEmailLabel: '请输入您的电子邮箱',
    userPasswordPlaceHolder: '请输入密码，6-20位英文或数字',
    verifyCodePlaceholder: '请输入验证码',
    forgetPassword: '忘记密码',
    registration: '快速注册',
    otherWays: '选择登录方式',
    changeCode: '更换'
  },

  registerPage: {
    btnRegister: '注册',
    btnBind: '绑定账号',
    sendAgain: "重新发送",
    cooldownText: "重新发送({timer}s)",
    goLoginPage: '已有帐号>',
    mobileVerifyCodeSent: '验证码已成功发送',
    nextStep: '下一步',
    pleaseInputCaptchaVerifyCode: '请输入验证码，点击图片可更换',
    pleaseInputMobileVerifyCode: '请输入您手机收到的验证码',
    pleaseInputPassword: '设置账号密码'
  },

  retrievePasswordPage: {
    nextStep: '下一步',
    sendPhoneCodeTipPre: '我们已向您的手机号',
    sendPhoneCodeTipEnd: '发送了验证短信',
    sendEmailCodeTipPre: '我们已向您的邮箱',
    sendEmailCodeTipEnd: '发送了验证信息',
    pleaseInputAccountName: '请输入您的手机号／邮箱',
    verifyCodeSentToEmail: '我们已经向您的邮箱<strong>{email}</strong>发送了验证码',
    verifyCodeSentToSms: '我们已经向您的手机<strong>{mobile}</strong>发送了验证码',
    setNewPassword: '请设定新密码',
    complete: '完成'
  },

  codePage: {
    title: '激活码',
    pleaseInputLoginCode: '请输入激活码',
    btnSubmit: '使用',
    obtainCode: '领取激活码>'
  },

  quickLoginPage: {
    gotoSelectAccount: '其他账号登陆>'
  },

  myProfile: {
    title: '个人中心',
    changeAccount: '切换账号',
    nickName: '昵称 : ',
    confirm: '确认',
    userNameStr: '用户名 : {nickName}'
  },

  myAvatar: {
    title: '修改头像',
    choosePicture: '从相册选一张',
    takePicture: '拍一张照片'
  },

  types: {
    anonymous: '快速游戏',
    firevale: '火谷账号',
    qq: 'qq',
    wechat: '微信',
    weibo: '微博',
    facebook: 'Facebook'
  },

  alert: {
    hint: '提示',
    anonymousHintMessage: '为保障您的游戏数据安全，请尽快绑定一个帐号，以免因刷机等原因导致游戏数据丢失！',
    cancel: '取消'
  }
});

/***/ }),

/***/ 876:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__account__ = __webpack_require__(875);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_i18n_zh_hans_error__ = __webpack_require__(391);



/* harmony default export */ __webpack_exports__["a"] = ({
  account: __WEBPACK_IMPORTED_MODULE_0__account__["a" /* default */],
  error: __WEBPACK_IMPORTED_MODULE_1_common_i18n_zh_hans_error__["a" /* default */]
});

/***/ }),

/***/ 877:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  loginPage: {
    title: '火谷賬號登陸',
    quickTitle: '選擇賬號登陸',
    titleRegister: '賬號註冊',
    titleBind: '賬號綁定',
    retrievePasswordTitle: '找回密碼',
    titleReset: '密碼重置',
    btnSubmit: '登錄',
    btnReset: '重置',
    sendVerifyCode: '獲取驗證碼',
    sendVerifyCodeAgain: '重新發送',
    accountIdPlaceholder: '請輸入您的賬號ID',
    userMobilePlaceholder: '請輸入您的手機號碼',
    userEmailPlaceholder: '請輸入您的電子郵箱',
    userMobileLabel: '請輸入您的手機號碼',
    userEmailLabel: '請輸入您的電子郵箱',
    userPasswordPlaceHolder: '請輸入密碼，6-20位英文或數字',
    verifyCodePlaceholder: '請輸入驗證碼',
    forgetPassword: '忘記密碼',
    registration: '快速註冊',
    otherWays: '選擇登錄方式',
    changeCode: '更換'
  },

  registerPage: {
    btnRegister: '註冊',
    btnBind: '綁定賬號',
    sendAgain: "重新發送",
    cooldownText: "重新發送({timer}s)",
    goLoginPage: '已有帳號>',
    mobileVerifyCodeSent: '驗證碼已成功發送',
    nextStep: '下一步',
    pleaseInputCaptchaVerifyCode: '請輸入驗證碼，點擊圖片可更換',
    pleaseInputMobileVerifyCode: '請輸入您手機收到的驗證碼',
    pleaseInputPassword: '設置賬號密碼'
  },

  retrievePasswordPage: {
    nextStep: '下一步',
    sendPhoneCodeTipPre: '我們已向您的手機號',
    sendPhoneCodeTipEnd: '發送了驗證短信',
    sendEmailCodeTipPre: '我們已向您的郵箱',
    sendEmailCodeTipEnd: '發送了驗證信息',
    pleaseInputAccountName: '請輸入您的賬號ID',
    verifyCodeSentToEmail: '我們已經向您的郵箱<strong>{email}</strong>發送了驗證碼',
    verifyCodeSentToSms: '我們已經向您的手機<strong>{mobile}</strong>發送了驗證碼',
    setNewPassword: '請設定新密碼',
    complete: '完成'
  },

  quickLoginPage: {
    gotoSelectAccount: '其他賬號登陸>'
  },

  myProfile: {
    title: '個人中心',
    changeAccount: '切換賬號',
    nickName: '暱稱 : ',
    confirm: '確認',
    userNameStr: '用戶名 : {nickName}'
  },

  myAvatar: {
    title: '修改頭像',
    choosePicture: '從相冊選一張',
    takePicture: '拍一張照片'
  },

  types: {
    anonymous: '快速遊戲',
    firevale: '火谷賬號',
    qq: 'qq',
    wechat: '微信',
    weibo: '微博',
    facebook: 'Facebook'
  },

  alert: {
    hint: '提示',
    anonymousHintMessage: '為保障您的遊戲數據安全，請盡快綁定一個帳號，以免因刷機等原因導致遊戲數據丟失！ ',
    cancel: '取消'
  }
});

/***/ }),

/***/ 878:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__account__ = __webpack_require__(877);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_i18n_zh_hant_error__ = __webpack_require__(186);



/* harmony default export */ __webpack_exports__["a"] = ({
  account: __WEBPACK_IMPORTED_MODULE_0__account__["a" /* default */],
  error: __WEBPACK_IMPORTED_MODULE_1_common_i18n_zh_hant_error__["a" /* default */]
});

/***/ }),

/***/ 879:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* harmony default export */ __webpack_exports__["a"] = (function (VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [{
      path: '/login',
      component: __webpack_require__(1503),
      children: [{
        path: '',
        name: 'login',
        component: __webpack_require__(1501)
      }, {
        path: 'quickLogin',
        name: 'quickLogin',
        component: __webpack_require__(1504)
      }, {
        path: 'selectAccountType',
        name: 'selectAccountType',
        component: __webpack_require__(1511)
      }, {
        path: 'registerStep1',
        name: 'registerStep1',
        component: __webpack_require__(1505)
      }, {
        path: 'registerStep2',
        name: 'registerStep2',
        component: __webpack_require__(1506)
      }, {
        path: 'registerStep3',
        name: 'registerStep3',
        component: __webpack_require__(1507)
      }, {
        path: 'retrievePasswordStep1',
        name: 'retrievePasswordStep1',
        component: __webpack_require__(1508)
      }, {
        path: 'retrievePasswordStep2',
        name: 'retrievePasswordStep2',
        component: __webpack_require__(1509)
      }, {
        path: 'retrievePasswordStep3',
        name: 'retrievePasswordStep3',
        component: __webpack_require__(1510)
      }, {
        path: 'inputCode',
        name: 'inputLoginCode',
        component: __webpack_require__(1502)
      }]
    }, {
      path: '*',
      redirect: '/login/'
    }]
  });
});

/***/ }),

/***/ 880:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_i18n__ = __webpack_require__(151);


/* harmony default export */ __webpack_exports__["a"] = ({
  install: function install(Vue, options) {
    Vue.prototype.$acs = {
      isAccountExists: function isAccountExists(val) {
        return Vue.axios.post('/user/is_account_exists', { account_id: val }).then(function (response) {
          return response.data;
        });
      },
      createToken: function createToken(account_id, password) {
        return Vue.axios.post('/user/create_token', { account_id: account_id, password: password }).then(function (response) {
          return response.data;
        });
      },
      updateToken: function updateToken(access_token) {
        return Vue.axios.post('/user/update_token', { access_token: access_token }).then(function (response) {
          return response.data;
        });
      },
      createAnonymousToken: function createAnonymousToken() {
        return Vue.axios.post('/user/create_anonymous_token', {}).then(function (response) {
          return response.data;
        });
      },
      createUser: function createUser(account_id, password, verify_code) {
        return Vue.axios.post("/user/create_user", { account_id: account_id, password: password, verify_code: verify_code }).then(function (response) {
          return response.data;
        });
      },
      updatePassword: function updatePassword(account_id, password, verify_code) {
        return Vue.axios.post("/user/update_password", { account_id: account_id, password: password, verify_code: verify_code }).then(function (response) {
          return response.data;
        });
      },
      sendMobileVerifyCode: function sendMobileVerifyCode(mobile) {
        return Vue.axios.post("/send_mobile_register_verify_code", { mobile: mobile }).then(function (response) {
          return response.data;
        });
      },
      sendRetrievePasswordVerifyCode: function sendRetrievePasswordVerifyCode(account_id) {
        return Vue.axios.post("/send_retrieve_password_verify_code", { account_id: account_id }).then(function (response) {
          return response.data;
        });
      },
      checkRegisterVerifyCode: function checkRegisterVerifyCode(verify_code) {
        return Vue.axios.post("/check_register_verify_code", { verify_code: verify_code }).then(function (response) {
          return response.data;
        });
      },
      checkRetrievePasswordVerifyCode: function checkRetrievePasswordVerifyCode(verify_code) {
        return Vue.axios.post("/check_retrieve_password_verify_code", { verify_code: verify_code }).then(function (response) {
          return response.data;
        });
      },
      updateCaptcha: function updateCaptcha(params) {
        return Vue.axios.post("/reset_register_captcha", params).then(function (response) {
          return response.data;
        });
      },
      bindLoginCode: function bindLoginCode(params) {
        return Vue.axios.post("/user/bind_login_code", params).then(function (response) {
          return response.data;
        });
      },
      generateState: function generateState() {
        return Vue.axios.post("/user/generate_state", {}).then(function (response) {
          return response.data;
        });
      },
      createWechatToken: function createWechatToken(state, code) {
        return Vue.axios.post("/api/auth/bind/wechat", { state: state, code: code }).then(function (response) {
          return response.data;
        });
      }
    };
  }
});

/***/ }),

/***/ 881:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLoginAccountId", function() { return setLoginAccountId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRegisterAccountId", function() { return setRegisterAccountId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCaptchaUrl", function() { return setCaptchaUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRetrievePasswordAccountId", function() { return setRetrievePasswordAccountId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRetrievePasswordVerifyToken", function() { return setRetrievePasswordVerifyToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTransitionName", function() { return setTransitionName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLoginnedAccount", function() { return addLoginnedAccount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRedirectUri", function() { return setRedirectUri; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_utils__ = __webpack_require__(27);



var setLoginAccountId = function setLoginAccountId(_ref, accountId) {
  var commit = _ref.commit;

  commit('SET_LOGIN_ACCOUNT', accountId);
};

var setRegisterAccountId = function setRegisterAccountId(_ref2, accountId) {
  var commit = _ref2.commit;

  commit('SET_REGISTER_ACCOUNT', accountId);
};

var setCaptchaUrl = function setCaptchaUrl(_ref3, imageUrl) {
  var commit = _ref3.commit;

  commit('SET_CAPTCHA_URL', imageUrl);
};

var setRetrievePasswordAccountId = function setRetrievePasswordAccountId(_ref4, accountId) {
  var commit = _ref4.commit;

  commit('SET_RETRIEVE_PASSWORD_ACCOUNT_ID', accountId);
};

var setRetrievePasswordVerifyToken = function setRetrievePasswordVerifyToken(_ref5, verifyToken) {
  var commit = _ref5.commit;

  commit('SET_RETRIEVE_PASSWORD_VERIFY_TOKEN', verifyToken);
};

var setTransitionName = function setTransitionName(_ref6, transitionName) {
  var commit = _ref6.commit;

  commit('SET_TRANSITION_NAME', transitionName);
};

var addLoginnedAccount = function addLoginnedAccount(_ref7, account) {
  var commit = _ref7.commit;

  commit('ADD_LOGINNED_ACCOUNT', account);
};

var setRedirectUri = function setRedirectUri(_ref8, uri) {
  var commit = _ref8.commit;

  commit('SET_REDIRECT_URI', uri);
};

/***/ }),

/***/ 882:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "app", function() { return app; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deviceId", function() { return deviceId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appId", function() { return appId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redirectUri", function() { return redirectUri; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "accountExistences", function() { return accountExistences; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginAccountId", function() { return loginAccountId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerAccountId", function() { return registerAccountId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "captchaUrl", function() { return captchaUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colors", function() { return colors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transitionName", function() { return transitionName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "historyAccounts", function() { return historyAccounts; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var app = function app(state) {
  return state.app;
};
var deviceId = function deviceId(state) {
  return state.app.deviceId;
};
var appId = function appId(state) {
  return state.app.appId;
};
var redirectUri = function redirectUri(state) {
  return state.app.redirectUri;
};
var accountExistences = function accountExistences(state) {
  return state.app.accountExistences;
};
var loginAccountId = function loginAccountId(state) {
  return state.app.loginAccountId;
};
var registerAccountId = function registerAccountId(state) {
  return state.app.registerAccountId;
};
var captchaUrl = function captchaUrl(state) {
  return state.app.captchaUrl;
};
var transitionName = function transitionName(state) {
  return state.app.transitionName;
};
var historyAccounts = function historyAccounts(state) {
  return state.app.historyAccounts;
};

var colors = function colors(state) {
  return {
    danger: "#fb0101",
    success: '#23d160',
    white: "#fff",
    dark: "#cbcbcb",
    black: "#242424"
  };
};



/***/ }),

/***/ 883:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(881);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getters__ = __webpack_require__(882);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_app__ = __webpack_require__(884);








__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* default */]);

var store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* default */].Store({
  strict: false,
  actions: __WEBPACK_IMPORTED_MODULE_2__actions__,
  getters: __WEBPACK_IMPORTED_MODULE_3__getters__,
  modules: {
    app: __WEBPACK_IMPORTED_MODULE_4__modules_app__["a" /* default */]
  },
  mutations: {}
});

/* harmony default export */ __webpack_exports__["a"] = (store);

/***/ }),

/***/ 884:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_acs__ = __webpack_require__(41);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function restoreHistoryAccounts() {
  var jsonAccounts = localStorage.getItem('_acs_history_accounts2_');

  if (jsonAccounts) {
    return JSON.parse(jsonAccounts).filter(function (v) {
      return v.is_anonymous;
    });
  } else {
    return [];
  }
}

var state = {
  appId: __WEBPACK_IMPORTED_MODULE_0_common_js_acs__["b" /* getAppId */](),
  deviceId: __WEBPACK_IMPORTED_MODULE_0_common_js_acs__["c" /* getDeviceId */](),
  accountExistences: {},
  loginAccountId: localStorage.getItem('_acs_login_account_id_'),
  registerAccountId: localStorage.getItem('_acs_register_account_id_'),
  captchaUrl: undefined,
  transitionName: 'slide-left',
  historyAccounts: restoreHistoryAccounts(),
  redirectUri: ''
};

var mutations = {
  'ADD_ACCOUNT_EXISTENCE': function ADD_ACCOUNT_EXISTENCE(state, payload) {
    state.accountExistences[payload.account] = payload.exists;
  },
  'SET_LOGIN_ACCOUNT': function SET_LOGIN_ACCOUNT(state, accountId) {
    state.loginAccountId = accountId;
    localStorage.setItem('_acs_login_account_id_', accountId);
  },
  'SET_REGISTER_ACCOUNT': function SET_REGISTER_ACCOUNT(state, accountId) {
    state.registerAccountId = accountId;
    localStorage.setItem('_acs_register_account_id_', accountId);
  },
  'SET_CAPTCHA_URL': function SET_CAPTCHA_URL(state, captchaUrl) {
    state.captchaUrl = captchaUrl;
  },
  'SET_TRANSITION_NAME': function SET_TRANSITION_NAME(state, transitionName) {
    state.transitionName = transitionName;
  },
  'ADD_LOGINNED_ACCOUNT': function ADD_LOGINNED_ACCOUNT(state, account) {
    // don't add anonymous user to history accounts
    if (!account.is_anonymous) {
      var _account = _extends({}, account, {
        label: account.is_anonymous ? account.nick_name : account.user_mobile ? account.user_mobile : account.user_email
      });
      var accounts = state.historyAccounts.slice().filter(function (v) {
        return v.user_id != account.user_id;
      });

      if (accounts.unshift(_account) > 4) {
        accounts.pop();
      }

      localStorage.setItem('_acs_history_accounts2_', JSON.stringify(accounts));
      state.historyAccounts = accounts.slice();
    }
  },
  'SET_REDIRECT_URI': function SET_REDIRECT_URI(state, uri) {
    state.redirectUri = uri;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ({
  state: state,
  mutations: mutations
});

/***/ })

},[1701]);
//# sourceMappingURL=login.js.map