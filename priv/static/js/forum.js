webpackJsonp([2],{

/***/ 1017:
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

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: {
      type: Boolean,
      default: true
    },

    transition: {
      type: String,
      default: 'fade'
    },

    menuItems: {
      default: []
    },

    selectedValue: undefined,

    onOk: {
      type: Function,
      default: undefined
    }
  },

  mounted: function mounted() {
    document.body.appendChild(this.$el);
  },


  watch: {
    visible: function visible(val) {
      this.show = val;
    }
  },

  compiled: function compiled() {
    this.modal = this.$refs.modal;
  },

  methods: {
    ok: function ok(menuItem) {
      this.selectedValue = menuItem.value;
      this.visible = false;
      if (typeof this.onOk == 'function') {
        this.onOk(menuItem);
      }
    },
    cancel: function cancel() {
      this.visible = false;
      if (typeof this.onCancel == 'function') {
        this.onCancel();
      }
    }
  }
});

/***/ }),

/***/ 1018:
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

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    itemData: {
      type: Object,
      default: null
    }
  },

  computed: {},

  methods: {
    showDetail: function showDetail() {
      this.$router.push({
        name: 'detail',
        params: {
          postId: this.itemData.post.id
        }
      });
    },
    delHtmlTag: function delHtmlTag(html) {
      return html.replace(/<[^>]+>/g, "").trim().substring(0, 20);
    }
  }
});

/***/ }),

/***/ 1019:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_components_alertDialog__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_toast__ = __webpack_require__(35);
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




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    itemData: {
      type: Object,
      default: null
    },
    itemIndex: {
      type: Number
    },
    onItemDeleted: {
      type: Function,
      default: undefined
    }
  },

  computed: {},

  methods: {
    showDetail: function showDetail() {
      this.$router.push({
        name: 'detail',
        params: {
          postId: this.itemData.post.id
        }
      });
    },
    confirmDeleteFavorite: function confirmDeleteFavorite() {
      var _this = this;

      __WEBPACK_IMPORTED_MODULE_0_common_components_alertDialog__["a" /* default */].show({
        visible: true,
        okText: this.$t('common.ok'),
        cancelText: this.$t('common.cancel'),
        message: this.$t('common.confirmDelete'),
        onOk: function () {
          var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_) {
            var result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _this.$acs.togglePostFavorite(_this.itemData.post.id);

                  case 2:
                    result = _context.sent;

                    if (result.success) {
                      __WEBPACK_IMPORTED_MODULE_1_common_components_toast__["a" /* default */].show(_this.$t(result.i18n_message, result.i18n_message_object));
                      _this.$emit('item-deleted', 'myFavorite', _this.itemIndex);
                    }

                  case 4:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }));

          return function onOk(_x) {
            return _ref.apply(this, arguments);
          };
        }(),
        onCancel: null
      });
    }
  }
});

/***/ }),

/***/ 1020:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_components_alertDialog__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_toast__ = __webpack_require__(35);
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
    itemData: {
      type: Object,
      default: null
    },
    itemIndex: {
      type: Number
    },
    onItemDeleted: {
      type: Function,
      default: undefined
    }
  },

  computed: {
    isManager: function isManager() {
      return window.acsConfig.isAdmin == true;
    }
  },

  methods: {
    showDetail: function showDetail(e) {
      this.$router.push({
        name: 'detail',
        params: {
          postId: this.itemData.id
        }
      });
    },
    confirmDeletePost: function confirmDeletePost(e) {
      var _this = this;

      __WEBPACK_IMPORTED_MODULE_0_common_components_alertDialog__["a" /* default */].show({
        visible: true,
        okText: this.$t('common.ok'),
        cancelText: this.$t('common.cancel'),
        message: this.$t('common.confirmDelete'),
        onOk: function () {
          var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_) {
            var result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _this.$acs.togglePostStatus({
                      forum_id: _this.$route.params.forumId,
                      post_id: _this.itemData.id,
                      active: false
                    });

                  case 2:
                    result = _context.sent;

                    if (result.success) {
                      __WEBPACK_IMPORTED_MODULE_1_common_components_toast__["a" /* default */].show(_this.$t(result.i18n_message));
                      _this.$emit('item-deleted', 'myPost', _this.itemIndex);
                    }

                  case 4:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }));

          return function onOk(_x) {
            return _ref.apply(this, arguments);
          };
        }(),
        onCancel: null
      });
    },
    confirmDeArchivePost: function confirmDeArchivePost(e) {
      var _this2 = this;

      __WEBPACK_IMPORTED_MODULE_0_common_components_alertDialog__["a" /* default */].show({
        visible: true,
        okText: this.$t('common.ok'),
        cancelText: this.$t('common.cancel'),
        message: this.$t('forum.personal.confirmDeArchive'),
        onOk: function () {
          var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_) {
            var result;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return _this2.$acs.togglePostStatus({
                      forum_id: _this2.$route.params.forumId,
                      post_id: _this2.itemData.id,
                      active: true
                    });

                  case 2:
                    result = _context2.sent;

                    if (result.success) {
                      __WEBPACK_IMPORTED_MODULE_1_common_components_toast__["a" /* default */].show(_this2.$t(result.i18n_message));
                      _this2.$emit('item-deleted', 'banPost', _this2.itemIndex);
                    }

                  case 4:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, _this2);
          }));

          return function onOk(_x2) {
            return _ref2.apply(this, arguments);
          };
        }(),
        onCancel: null
      });
    }
  }
});

/***/ }),

/***/ 1021:
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

/***/ 1022:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_alertDialog__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_components_toast__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_filters__ = __webpack_require__(52);
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
    commentData: {
      type: Object,
      default: null
    },
    itemIndex: {
      type: Number
    },
    nth: {
      type: Number
    },
    preview: {
      type: Boolean,
      default: false
    },
    onItemDeleted: {
      type: Function,
      default: undefined
    }
  },
  computed: {
    isManager: function isManager() {
      return window.acsConfig.isAdmin == true;
    },
    avatarUrl: function avatarUrl() {
      return {
        src: __WEBPACK_IMPORTED_MODULE_3_common_js_filters__["imageStaticUrl"](this.commentData.user.avatar_url || window.acsConfig.defaultAvatarUrl),
        error: window.acsConfig.defaultAvatarUrl,
        loading: window.acsConfig.defaultAvatarUrl
      };
    },


    nthName: function nthName() {
      switch (this.nth) {
        case 1:
          return this.$t('forum.detail.firstComment');
        case 2:
          return this.$t('forum.detail.secondComment');
        default:
          return this.$t('forum.detail.nthComment', {
            nth: this.nth
          });
      }
    }
  },

  methods: {
    confirmDeleteComment: function confirmDeleteComment() {
      var _this = this;

      __WEBPACK_IMPORTED_MODULE_1_common_components_alertDialog__["a" /* default */].show({
        visible: true,
        okText: this.$t('common.ok'),
        cancelText: this.$t('common.cancel'),
        message: this.$t('forum.detail.deleteTip', {
          nth: this.nth
        }),
        onOk: function () {
          var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_) {
            var result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _this.$acs.deleteComment(_this.commentData.id, _this.$route.params.forumId);

                  case 2:
                    result = _context.sent;

                    if (result.success) {
                      __WEBPACK_IMPORTED_MODULE_2_common_components_toast__["a" /* default */].show(_this.$t(result.i18n_message));
                      _this.$emit('on-item-deleted', _this.itemIndex);
                    }

                  case 4:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this);
          }));

          return function onOk(_x) {
            return _ref.apply(this, arguments);
          };
        }()
      });
    }
  }
});

/***/ }),

/***/ 1023:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_toast__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_acs__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_filters__ = __webpack_require__(52);
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







/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    postData: {
      type: Object,
      default: null
    },
    itemIndex: {
      type: Number
    },
    preview: {
      type: Boolean,
      default: false
    },
    onShowauthorOnly: {
      type: Function,
      default: undefined
    }
  },

  data: function data() {
    return {
      showAuthorOnly: false,
      imgsPreview: [],
      favoriting: false
    };
  },


  computed: {
    isManager: function isManager() {
      return window.acsConfig.isAdmin == true;
    },
    avatarUrl: function avatarUrl() {
      return {
        src: __WEBPACK_IMPORTED_MODULE_3_common_js_filters__["imageStaticUrl"](this.postData.user.avatar_url || window.acsConfig.defaultAvatarUrl),
        error: window.acsConfig.defaultAvatarUrl,
        loading: window.acsConfig.defaultAvatarUrl
      };
    }
  },

  methods: {
    toggleShowAuthorOnly: function toggleShowAuthorOnly() {
      this.onShowauthorOnly(!this.showAuthorOnly);
      this.showAuthorOnly = !this.showAuthorOnly;
    },


    toggleFavorite: function toggleFavorite() {
      var _this = this;

      __WEBPACK_IMPORTED_MODULE_2_common_js_acs__["a" /* checkIsLogin */](function () {
        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_) {
          var result;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _this.favoriting = true;
                  _context.next = 3;
                  return _this.$acs.togglePostFavorite(_this.postData.id);

                case 3:
                  result = _context.sent;

                  if (result.success) {
                    _this.postData.is_favorite = !_this.postData.is_favorite;
                  }
                  _this.favoriting = false;

                case 6:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    },

    toggleActive: function toggleActive() {
      this.togglePostStatus({
        active: !this.postData.active
      }, "active");
    },
    toggleEssence: function toggleEssence() {
      this.togglePostStatus({
        is_vote: !this.postData.is_vote
      }, "is_vote");
    },
    toggleUp: function toggleUp() {
      this.togglePostStatus({
        is_top: !this.postData.is_top
      }, "is_top");
    },


    togglePostStatus: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(params, pos) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(window.acsConfig.isAdmin == true)) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 3;
                return this.$acs.togglePostStatus(_extends({
                  forum_id: this.$route.params.forumId,
                  post_id: this.postData.id
                }, params));

              case 3:
                result = _context2.sent;

                if (!result.success) {
                  _context2.next = 14;
                  break;
                }

                _context2.t0 = pos;
                _context2.next = _context2.t0 === "active" ? 8 : _context2.t0 === "is_vote" ? 10 : _context2.t0 === "is_top" ? 12 : 13;
                break;

              case 8:
                this.postData.active = !this.postData.active;
                return _context2.abrupt('break', 13);

              case 10:
                this.postData.is_vote = !this.postData.is_vote;
                return _context2.abrupt('break', 13);

              case 12:
                this.postData.is_top = !this.postData.is_top;

              case 13:
                __WEBPACK_IMPORTED_MODULE_1_common_components_toast__["a" /* default */].show(this.$t(result.i18n_message));

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function togglePostStatus(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return togglePostStatus;
    }()
  }
});

/***/ }),

/***/ 1024:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_filters__ = __webpack_require__(52);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    searchKeyword: {
      type: String,
      default: ''
    },
    postInfo: {
      type: Object,
      default: null
    }
  },
  data: function data() {
    return {
      searchWord: ""
    };
  },

  mounted: function mounted() {
    this.searchWord = "[" + this.postInfo.title + "]  " + this.strenghtenKeywordTitle;
  },
  computed: {
    avatarUrl: function avatarUrl() {
      return {
        src: __WEBPACK_IMPORTED_MODULE_1_common_js_filters__["imageStaticUrl"](this.postInfo.user.avatar_url || window.acsConfig.defaultAvatarUrl),
        error: window.acsConfig.defaultAvatarUrl,
        loading: window.acsConfig.defaultAvatarUrl
      };
    },
    strenghtenKeywordTitle: function strenghtenKeywordTitle() {
      return this.searchKeyword ? this.postInfo.title.replace(new RegExp(this.searchKeyword, 'g'), '<span class="is-danger" style="font-weight: 400; font-style: italic; margin-right:0.2rem">' + this.searchKeyword + '</span>') : this.postInfo.title;
    }
  },

  methods: {
    showPostDetail: function showPostDetail() {
      this.$router.push({
        name: 'detail',
        params: {
          postId: this.postInfo.id
        }
      });
    }
  }
});

/***/ }),

/***/ 1025:
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

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    menus: {
      type: Array,
      default: function _default() {
        [];
      }
    },
    selectedValue: undefined
  },

  data: function data() {
    return {
      menuHash: [],
      currentValue: undefined,
      barWidth: '100px',
      resize: false
    };
  },


  mounted: function mounted() {
    var _this = this;

    for (var i = 0; i < this.menus.length; i++) {
      this.menuHash[this.menus[i].value] = i;
    }

    this.currentValue = this.selectedValue;
    if (!this.currentValue && this.menus) {
      this.currentValue = this.menus[0].value;
    }

    window.addEventListener('resize', function (e) {
      _this.resize = true;
    });

    this.$on('select', function (value) {
      _this.currentValue = value;
    });
  },
  computed: {
    selectedIndex: function selectedIndex() {
      return this.menuHash[this.currentValue];
    },
    sliderBackgroundSize: function sliderBackgroundSize() {
      return this.barWidth + ' 0.8rem';
    },
    sliderPosition: function sliderPosition() {
      if (this.resize) this.resize = false;

      if (this.selectedIndex == undefined) {
        return "0";
      }

      var element = this.$refs.navItem[this.selectedIndex].$el;
      var bar = this.$refs.sliderBar;

      var offsetLeft = element.offsetLeft;
      var offsetWidth = element.offsetWidth;
      var _barWidth = parseInt(bar.offsetWidth);

      if (_barWidth > offsetWidth) {
        _barWidth = offsetWidth;
      } else if (offsetWidth > 100) {
        _barWidth = 100;
      }

      this.barWidth = _barWidth + "px";
      var left = element.offsetLeft + (offsetWidth - _barWidth) / 2;
      return left + "px";
    }
  },
  methods: {
    switchMenu: function switchMenu(item, index, event) {
      this.currentValue = item.value;
      this.$emit('onSelect', item, index);
    }
  }
});

/***/ }),

/***/ 1029:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_nativeApi__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_acs__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_js_keywordFilter__ = __webpack_require__(455);
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
  data: function data() {
    return {
      inApp: window.acsConfig.inApp,
      canGoBack: false
    };
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])(['transitionName', 'forumInfo'])),

  beforeRouteEnter: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(to, from, next) {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return __WEBPACK_IMPORTED_MODULE_0__vue_installed__["a" /* default */].axios.post('/forum_actions/get_forum_info_with_keyword', {
                forum_id: to.params.forumId
              }).then(function (response) {
                return response.data;
              });

            case 3:
              result = _context.sent;


              if (result.success) {
                next(function (vm) {
                  vm.updateForumInfo(result.forum);
                  __WEBPACK_IMPORTED_MODULE_4_common_js_keywordFilter__["a" /* init */](result.keyword);

                  if (window.acsConfig.user) {
                    vm.setUserProfile(window.acsConfig.user);
                  }
                });
              } else {
                next({
                  name: 'error'
                });
              }
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);

              next({
                name: 'error'
              });

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 7]]);
    }));

    function beforeRouteEnter(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return beforeRouteEnter;
  }(),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['setTransitionName', 'updateForumInfo', 'updateKeyword', 'setUserProfile']), {

    onBtnBackClicked: function onBtnBackClicked() {
      if (this.canGoBack) {
        this.$router.back();
      } else if (this.inApp) {
        __WEBPACK_IMPORTED_MODULE_2_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
          success: false
        });
      }
    },

    showPage: function showPage(routerName) {
      var _this = this;

      __WEBPACK_IMPORTED_MODULE_3_common_js_acs__["a" /* checkIsLogin */](function (_) {
        _this.$router.push({
          name: routerName
        });
      });
    }
  }),

  watch: {
    '$route': function $route(to, from) {
      this.canGoBack = history.state != null;
    }
  }
});

/***/ }),

/***/ 1031:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_menuModal__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_components_imageUpload__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_components_mobileMenu__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_components_progress__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_components_toast__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_common_js_nativeApi__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_common_js_utils__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vuelidate_lib_validators__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_vuelidate_lib_validators__);
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














var touchMap = new WeakMap();



/* harmony default export */ __webpack_exports__["default"] = ({
  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['userInfo', 'currentPostTitle']), {

    errorHint: function errorHint() {
      if (!this.$v.content.required) {
        return this.$t('error.validation.commentContentRequired');
      } else if (!this.$v.content.minLength) {
        return this.$t('error.validation.commentContentRequired');
      }

      return '';
    }
  }),

  mounted: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.currentPostTitle) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return this.$acs.getPostDetail(this.$route.params.postId);

            case 3:
              result = _context.sent;

              if (result.success) {
                this.setCurrentPostTitle(result.detail.title);
              }

            case 5:
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
      content: '',
      id: undefined,
      editor: undefined,
      errorMessage: '',
      processing: false
    };
  },


  validations: {
    content: {
      required: __WEBPACK_IMPORTED_MODULE_8_vuelidate_lib_validators__["required"],
      minLength: __WEBPACK_IMPORTED_MODULE_7_common_js_utils__["b" /* minLength */](5)
    }
  },

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['setCurrentPostTitle']), {

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

    onInsertImage: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(editor) {
        var _this = this;

        var items, isPhotoLibAvailable, isCameraAvailable, menu;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!window.acsConfig.inApp) {
                  _context2.next = 14;
                  break;
                }

                items = [{
                  title: this.$t('common.cancel'),
                  value: 'cancel'
                }];
                _context2.next = 4;
                return __WEBPACK_IMPORTED_MODULE_6_common_js_nativeApi__["a" /* default */].isMediaSourceTypeAvailable('photoLib');

              case 4:
                isPhotoLibAvailable = _context2.sent;

                if (isPhotoLibAvailable) {
                  items.unshift({
                    title: this.$t('common.photoLib'),
                    value: 'photoLib'
                  });
                }

                _context2.next = 8;
                return __WEBPACK_IMPORTED_MODULE_6_common_js_nativeApi__["a" /* default */].isMediaSourceTypeAvailable('camera');

              case 8:
                isCameraAvailable = _context2.sent;

                if (isCameraAvailable) {
                  items.unshift({
                    title: this.$t('common.camera'),
                    value: 'camera'
                  });
                }

                menu = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_common_components_mobileMenu__["a" /* showMobileMenu */])({
                  visible: true,
                  items: items
                });


                menu.$on('item-selected', function (item) {
                  switch (item.value) {
                    case 'camera':
                      __WEBPACK_IMPORTED_MODULE_6_common_js_nativeApi__["a" /* default */].pickImageFrom('camera', function (result) {
                        return _this.handlePickImageResult(editor, result);
                      });
                      break;

                    case 'photoLib':
                      __WEBPACK_IMPORTED_MODULE_6_common_js_nativeApi__["a" /* default */].pickImageFrom('photoLib', function (result) {
                        return _this.handlePickImageResult(editor, result);
                      });
                      break;
                  }
                });
                _context2.next = 15;
                break;

              case 14:
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_common_components_imageUpload__["a" /* showImageUploadDialog */])(this.$i18n, {
                  postAction: '/forum_actions/upload_comment_image',
                  maxLength: 800,
                  destFormat: 'image/jpeg',
                  destQuality: 90,
                  data: {
                    forum_id: this.$route.params.forumId,
                    post_id: this.$route.params.postId,
                    comment_id: this.id
                  },
                  headers: {
                    'x-csrf-token': window.acsConfig.csrfToken
                  },
                  callback: function callback(response) {
                    if (response.success) {
                      editor.focus();
                      var range = editor.getSelection();
                      editor.insertEmbed(range.index, 'image', response.link);
                      editor.formatText(range.index, 1, 'width', response.width);
                      editor.formatText(range.index, 1, 'height', response.height);
                      _this.id = response.comment_id;
                    } else if (response.i18n_message) {
                      __WEBPACK_IMPORTED_MODULE_5_common_components_toast__["a" /* default */].show(_this.$t(response.i18n_message, response.i18n_message_object));
                    } else if (response.message) {
                      __WEBPACK_IMPORTED_MODULE_5_common_components_toast__["a" /* default */].show(response.message);
                    } else {
                      __WEBPACK_IMPORTED_MODULE_5_common_components_toast__["a" /* default */].show(_this.$t('error.server.networkError'));
                    }
                  }
                });

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onInsertImage(_x) {
        return _ref2.apply(this, arguments);
      }

      return onInsertImage;
    }(),

    handlePickImageResult: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(editor, result) {
        var progress, upload_result, range;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!result.success) {
                  _context3.next = 7;
                  break;
                }

                progress = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_common_components_progress__["a" /* showProgress */])({
                  visible: true
                });
                _context3.next = 4;
                return this.$acs.uploadCommentImage({
                  file: {
                    base64_content: result.image
                  },
                  forum_id: this.$route.params.forumId,
                  post_id: this.$route.params.postId,
                  comment_id: this.id
                }, function (value) {
                  progress.setProgress(value);
                });

              case 4:
                upload_result = _context3.sent;


                progress.close();

                if (upload_result.success) {
                  editor.focus();
                  range = editor.getSelection();

                  editor.insertEmbed(range.index, 'image', upload_result.link);
                  editor.formatText(range.index, 1, 'width', upload_result.width);
                  editor.formatText(range.index, 1, 'height', upload_result.height);
                }

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function handlePickImageResult(_x2, _x3) {
        return _ref3.apply(this, arguments);
      }

      return handlePickImageResult;
    }(),

    handleSubmit: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var postId, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(!this.$v.$invalid && !this.processing)) {
                  _context4.next = 8;
                  break;
                }

                this.processing = true;
                postId = this.$route.params.postId;
                _context4.next = 5;
                return this.$acs.addComment({
                  comment_id: this.id,
                  post_id: postId,
                  content: this.content
                });

              case 5:
                result = _context4.sent;

                if (result.success) {
                  __WEBPACK_IMPORTED_MODULE_5_common_components_toast__["a" /* default */].show(this.$t('forum.writeComment.addSuccess'));
                  this.$router.replace({
                    name: 'detail'
                  });
                }
                this.processing = false;

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function handleSubmit() {
        return _ref4.apply(this, arguments);
      }

      return handleSubmit;
    }()
  })
});

/***/ }),

/***/ 1032:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_menuModal__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_components_imageUpload__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_components_mobileMenu__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_components_progress__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_common_components_toast__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_common_js_nativeApi__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_common_js_utils__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_common_js_acs__ = __webpack_require__(41);
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
















var touchMap = new WeakMap();

/* harmony default export */ __webpack_exports__["default"] = ({

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['forumInfo', 'currentSectionId', 'editingPostData']), {
    selectedSectionTitle: function selectedSectionTitle() {
      var item = this.sectionMenuItems[this.editingPostData.selectedSectionId];
      return item ? item.title : '';
    },


    errorHint: function errorHint() {
      if (!this.$v.editingPostData.title.required) {
        return this.$t('forum.newPost.titlePlaceholder');
      } else if (!this.$v.editingPostData.title.minLength) {
        return this.$t('error.validation.postTitleMinLength');
      } else if (!this.$v.editingPostData.title.maxLength) {
        return this.$t('error.validation.postTitleMaxLength');
      } else if (!this.$v.editingPostData.title.emoji) {
        return this.$t('error.validation.emojiPostTitle');
      } else if (!this.$v.editingPostData.content.required) {
        return this.$t('error.validation.commentContentRequired');
      }

      return '';
    }
  }),

  validations: {
    editingPostData: {
      title: {
        required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
        minLength: __WEBPACK_IMPORTED_MODULE_8_common_js_utils__["b" /* minLength */](10),
        maxLength: __WEBPACK_IMPORTED_MODULE_8_common_js_utils__["c" /* maxLength */](250),
        emoji: function emoji(val) {
          return !/\ud83d[\ude00-\ude4f]/.test(val);
        }
      },
      content: {
        required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
        minLength: __WEBPACK_IMPORTED_MODULE_8_common_js_utils__["b" /* minLength */](10)
      }
    }
  },

  data: function data() {
    return {
      sectionMenuItems: {},
      processing: false,
      editor: undefined
    };
  },


  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function (_) {
      var menuItems = {};
      _this.forumInfo.sections.forEach(function (section) {
        if (_this.editingPostData.selectedSectionId == 0) {
          _this.editingPostData.selectedSectionId = _this.currentSectionId == 0 ? section.id : _this.currentSectionId;
        }
        menuItems[section.id] = {
          title: section.title,
          value: section.id
        };
      });

      _this.sectionMenuItems = menuItems;
    });
  },

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['resetPostEditingData']), {

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

    preview: function preview() {
      this.editingPostData.sectionTitle = this.sectionMenuItems[this.editingPostData.selectedSectionId].title;
      this.$router.push({
        name: 'preview'
      });
    },

    onInsertImage: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(editor) {
        var _this2 = this;

        var items, isPhotoLibAvailable, isCameraLibAvailable, menu;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!window.acsConfig.inApp) {
                  _context.next = 14;
                  break;
                }

                items = [{
                  title: this.$t('common.cancel'),
                  value: 'cancel'
                }];
                _context.next = 4;
                return __WEBPACK_IMPORTED_MODULE_7_common_js_nativeApi__["a" /* default */].isMediaSourceTypeAvailable('photoLib');

              case 4:
                isPhotoLibAvailable = _context.sent;

                if (isPhotoLibAvailable) {
                  items.unshift({
                    title: this.$t('common.photoLib'),
                    value: 'photoLib'
                  });
                }

                _context.next = 8;
                return __WEBPACK_IMPORTED_MODULE_7_common_js_nativeApi__["a" /* default */].isMediaSourceTypeAvailable('camera');

              case 8:
                isCameraLibAvailable = _context.sent;

                if (isCameraLibAvailable) {
                  items.unshift({
                    title: this.$t('common.camera'),
                    value: 'camera'
                  });
                }

                menu = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_common_components_mobileMenu__["a" /* showMobileMenu */])({
                  visible: true,
                  items: items
                });


                menu.$on('item-selected', function (item) {
                  switch (item.value) {
                    case 'camera':
                      __WEBPACK_IMPORTED_MODULE_7_common_js_nativeApi__["a" /* default */].pickImageFrom('camera', function (result) {
                        return _this2.handlePickImageResult(editor, result);
                      });
                      break;

                    case 'photoLib':
                      __WEBPACK_IMPORTED_MODULE_7_common_js_nativeApi__["a" /* default */].pickImageFrom('photoLib', function (result) {
                        return _this2.handlePickImageResult(editor, result);
                      });
                      break;
                  }
                });
                _context.next = 15;
                break;

              case 14:
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_common_components_imageUpload__["a" /* showImageUploadDialog */])(this.$i18n, {
                  postAction: '/forum_actions/upload_post_image',
                  maxLength: 800,
                  destFormat: 'image/jpeg',
                  destQuality: 90,
                  data: {
                    forum_id: this.$route.params.forumId,
                    section_id: this.editingPostData.selectedSectionId,
                    post_id: this.editingPostData.id
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
                      _this2.editingPostData.id = response.post_id;
                    } else if (response.i18n_message) {
                      __WEBPACK_IMPORTED_MODULE_6_common_components_toast__["a" /* default */].show(_this2.$t(response.i18n_message, response.i18n_message_object));
                    } else if (response.message) {
                      __WEBPACK_IMPORTED_MODULE_6_common_components_toast__["a" /* default */].show(response.message);
                    } else {
                      __WEBPACK_IMPORTED_MODULE_6_common_components_toast__["a" /* default */].show(_this2.$t('error.server.networkError'));
                    }
                  }
                });

              case 15:
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

    handlePickImageResult: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(editor, result) {
        var progress, upload_result, range;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!result.success) {
                  _context2.next = 7;
                  break;
                }

                progress = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_common_components_progress__["a" /* showProgress */])({
                  visible: true
                });
                _context2.next = 4;
                return this.$acs.uploadPostImage({
                  file: {
                    base64_content: result.image
                  },
                  post_id: this.editingPostData.id,
                  forum_id: this.$route.params.forumId,
                  section_id: this.editingPostData.selectedSectionId
                }, function (value) {
                  progress.setProgress(value);
                });

              case 4:
                upload_result = _context2.sent;


                progress.close();

                if (upload_result.success) {
                  editor.focus();
                  range = editor.getSelection();

                  editor.insertEmbed(range.index, 'image', upload_result.link);
                  editor.formatText(range.index, 1, 'width', upload_result.width);
                  editor.formatText(range.index, 1, 'height', upload_result.height);
                  this.editingPostData.id = upload_result.post_id;
                }

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handlePickImageResult(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return handlePickImageResult;
    }(),

    showSelectSectionMenu: function showSelectSectionMenu() {
      var _this3 = this;

      __WEBPACK_IMPORTED_MODULE_2__components_menuModal__["a" /* default */].showModal({
        menuItems: this.sectionMenuItems,
        selectedValue: this.editingPostData.selectedSectionId,
        onOk: function onOk(menuItem) {
          return _this3.editingPostData.selectedSectionId = menuItem.value;
        }
      });
    },


    handleSubmit: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var forumId, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(!this.$v.$invalid && !this.processing)) {
                  _context3.next = 8;
                  break;
                }

                this.processing = true;
                forumId = this.$router.currentRoute.params.forumId;
                _context3.next = 5;
                return this.$acs.addPost({
                  forum_id: forumId,
                  section_id: this.editingPostData.selectedSectionId,
                  post_id: this.editingPostData.id,
                  title: this.editingPostData.title,
                  content: this.editingPostData.content });

              case 5:
                result = _context3.sent;


                if (result.success) {
                  this.resetPostEditingData();
                  __WEBPACK_IMPORTED_MODULE_6_common_components_toast__["a" /* default */].show(this.$t('forum.newPost.addSuccess'));
                  this.$router.replace({
                    name: 'postList'
                  });
                }
                this.processing = false;

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function handleSubmit() {
        return _ref3.apply(this, arguments);
      }

      return handleSubmit;
    }()
  })
});

/***/ }),

/***/ 1033:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_mobileMenu__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_sliderNav__ = __webpack_require__(1488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_sliderNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_sliderNav__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_myPostListItem__ = __webpack_require__(1483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_myPostListItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_myPostListItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_myFavoriteListItem__ = __webpack_require__(1482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_myFavoriteListItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_myFavoriteListItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_myCommentListItem__ = __webpack_require__(1481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_myCommentListItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_myCommentListItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_common_components_imageCropUpload__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_common_js_filters__ = __webpack_require__(52);
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













/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    sliderNav: __WEBPACK_IMPORTED_MODULE_3__components_sliderNav___default.a,
    myPostListItem: __WEBPACK_IMPORTED_MODULE_4__components_myPostListItem___default.a,
    myFavoriteListItem: __WEBPACK_IMPORTED_MODULE_5__components_myFavoriteListItem___default.a,
    myCommentListItem: __WEBPACK_IMPORTED_MODULE_6__components_myCommentListItem___default.a
  },

  computed: _extends({
    isManager: function isManager() {
      return window.acsConfig.isAdmin == true;
    }
  }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['userInfo']), {
    avatarUrl: function avatarUrl() {
      return {
        src: __WEBPACK_IMPORTED_MODULE_8_common_js_filters__["imageStaticUrl"](this.userInfo.avatar_url || window.acsConfig.defaultAvatarUrl),
        error: window.acsConfig.defaultAvatarUrl,
        loading: window.acsConfig.defaultAvatarUrl
      };
    }
  }),

  data: function data() {
    return {
      type: 'myPosts',
      menus: window.acsConfig.isAdmin == true ? [{
        text: this.$t('forum.personal.myPosts'),
        value: 'myPosts'
      }, {
        text: this.$t('forum.personal.myComments'),
        value: 'myComments'
      }, {
        text: this.$t('forum.personal.myFavor'),
        value: 'myFavor'
      }, {
        text: this.$t('forum.personal.myBan'),
        value: 'myBan'
      }] : [{
        text: this.$t('forum.personal.myPosts'),
        value: 'myPosts'
      }, {
        text: this.$t('forum.personal.myComments'),
        value: 'myComments'
      }, {
        text: this.$t('forum.personal.myFavor'),
        value: 'myFavor'
      }],
      postList: [],
      commentList: [],
      favoriteList: [],
      banList: [],
      page: 0,
      total: 1,
      recordsPerPage: 10
    };
  },


  mounted: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(this.userInfo.post_count == 0)) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return this.$acs.getUserPostCount(this.$route.params.forumId);

            case 3:
              result = _context.sent;


              if (result.success) {
                this.updateUserPostCount(result.post_count);
              }

            case 5:
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

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['updateUserPostCount', 'decrUserPostCount']), {

    switchMenu: function switchMenu(item, index) {
      this.type = item.value;
      this.resetScroller();
    },

    onShowMyProfile: function onShowMyProfile() {
      this.$router.push({
        path: '/account/my_profile'
      });
    },

    resetScroller: function resetScroller() {
      this.page = 0;
      this.total = 1;
      this.postList = [];
      this.commentList = [];
      this.favoriteList = [];
      this.banList = [];
      if (this.$refs.scroller) {
        this.$refs.scroller.$emit('reset');
      }
    },

    loadmore: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = this.type;
                _context2.next = _context2.t0 === "myPosts" ? 3 : _context2.t0 === "myComments" ? 6 : _context2.t0 === "myFavor" ? 9 : _context2.t0 === "myBan" ? 12 : 15;
                break;

              case 3:
                _context2.next = 5;
                return this.getPostPage();

              case 5:
                return _context2.abrupt('break', 15);

              case 6:
                _context2.next = 8;
                return this.getCommentPage();

              case 8:
                return _context2.abrupt('break', 15);

              case 9:
                _context2.next = 11;
                return this.getFavoritePage();

              case 11:
                return _context2.abrupt('break', 15);

              case 12:
                _context2.next = 14;
                return this.getBanPage();

              case 14:
                return _context2.abrupt('break', 15);

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadmore() {
        return _ref2.apply(this, arguments);
      }

      return loadmore;
    }(),

    onItemDelete: function onItemDelete(type, index) {
      switch (type) {
        case "myPost":
          this.decrUserPostCount();
          this.postList.splice(index, 1);
          break;
        case "banPost":
          this.banList.splice(index, 1);
          break;
        case "myFavorite":
          this.favoriteList.splice(index, 1);
          break;
      }
    },


    getPostPage: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // cancel last get paged post if we're requesting 
                this.$acs.cancelGetUserPagedPost();
                this.$acs.cancelGetUserPostComments();
                this.$acs.cancelGetUserPostFavorites();
                this.$acs.cancelGetPagedBanPost();

                _context3.next = 6;
                return this.$acs.getUserPagedPost(this.$route.params.forumId, this.page + 1, this.recordsPerPage);

              case 6:
                result = _context3.sent;


                if (result.success) {
                  this.postList = this.page == 0 ? result.posts : this.postList.concat(result.posts);
                  this.total = result.total;
                  this.page = this.page + 1;

                  if (this.$refs.scroller && this.page >= this.total) {
                    this.$refs.scroller.$emit('all-loaded');
                  }
                }

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getPostPage() {
        return _ref3.apply(this, arguments);
      }

      return getPostPage;
    }(),

    getCommentPage: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                // cancel last get paged post if we're requesting 
                this.$acs.cancelGetUserPagedPost();
                this.$acs.cancelGetUserPostComments();
                this.$acs.cancelGetUserPostFavorites();
                this.$acs.cancelGetPagedBanPost();

                _context4.next = 6;
                return this.$acs.getUserPostComments(this.$route.params.forumId, this.page + 1, this.recordsPerPage);

              case 6:
                result = _context4.sent;


                if (result.success) {
                  this.commentList = this.page == 0 ? result.comments : this.commentList.concat(result.comments);
                  this.total = result.total;
                  this.page = this.page + 1;

                  if (this.$refs.scroller && this.page >= this.total) {
                    this.$refs.scroller.$emit('all-loaded');
                  }
                }

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getCommentPage() {
        return _ref4.apply(this, arguments);
      }

      return getCommentPage;
    }(),

    getFavoritePage: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        var result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                // cancel last get paged post if we're requesting 
                this.$acs.cancelGetUserPagedPost();
                this.$acs.cancelGetUserPostComments();
                this.$acs.cancelGetUserPostFavorites();
                this.$acs.cancelGetPagedBanPost();

                _context5.next = 6;
                return this.$acs.getUserPostFavorites(this.$route.params.forumId, this.page + 1, this.recordsPerPage);

              case 6:
                result = _context5.sent;


                if (result.success) {
                  this.favoriteList = this.page == 0 ? result.favorites : this.favoriteList.concat(result.favorites);
                  this.total = result.total;
                  this.page = this.page + 1;

                  if (this.$refs.scroller && this.page >= this.total) {
                    this.$refs.scroller.$emit('all-loaded');
                  }
                }

              case 8:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getFavoritePage() {
        return _ref5.apply(this, arguments);
      }

      return getFavoritePage;
    }(),

    getBanPage: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
        var result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.isManager) {
                  _context6.next = 9;
                  break;
                }

                // cancel last get paged post if we're requesting
                this.$acs.cancelGetUserPagedPost();
                this.$acs.cancelGetUserPostComments();
                this.$acs.cancelGetUserPostFavorites();
                this.$acs.cancelGetPagedBanPost();

                _context6.next = 7;
                return this.$acs.getPagedBanPost(this.$route.params.forumId, this.page + 1, this.recordsPerPage);

              case 7:
                result = _context6.sent;


                if (result.success) {
                  this.banList = this.page == 0 ? result.posts : this.banList.concat(result.posts);
                  this.total = result.total;
                  this.page = this.page + 1;

                  if (this.$refs.scroller && this.page >= this.total) {
                    this.$refs.scroller.$emit('all-loaded');
                  }
                }

              case 9:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getBanPage() {
        return _ref6.apply(this, arguments);
      }

      return getBanPage;
    }()
  })
});

/***/ }),

/***/ 1034:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_postDetailView_vue__ = __webpack_require__(1486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_postDetailView_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_postDetailView_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_postCommentView_vue__ = __webpack_require__(1485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_postCommentView_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_postCommentView_vue__);
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
  mounted: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.getPostDetail();

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

  components: {
    postDetailView: __WEBPACK_IMPORTED_MODULE_2__components_postDetailView_vue___default.a,
    postCommentView: __WEBPACK_IMPORTED_MODULE_3__components_postCommentView_vue___default.a
  },
  computed: {
    postId: function postId() {
      return this.$route.params.postId;
    },
    isManager: function isManager() {
      return window.acsConfig.isAdmin == true;
    }
  },
  data: function data() {
    return {
      postDetail: undefined,
      commentList: [],
      page: 0,
      total: 1,
      totalRecords: 0,
      recordsPerPage: 20,
      showAuthorOnly: false
    };
  },


  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['setCurrentPostTitle']), {
    onItemDelete: function onItemDelete(index) {
      //this.totalRecords--;
      this.commentList[index].content = "回复已被删除";
      this.commentList[index].active = false;
    },
    onShowAuthorOnly: function onShowAuthorOnly(isShowAuthor) {
      this.showAuthorOnly = isShowAuthor;
      this.refresh();
    },


    getPostDetail: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$acs.getPostDetail(this.postId);

              case 2:
                result = _context2.sent;

                if (result.success) {
                  this.setCurrentPostTitle(result.detail.title);
                  this.postDetail = result.detail;

                  if (!this.isManager && !this.postDetail.active) {
                    this.$router.push({
                      name: "postList"
                    });
                  }
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getPostDetail() {
        return _ref2.apply(this, arguments);
      }

      return getPostDetail;
    }(),

    refresh: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.page = 0;
                this.total = 1;
                this.commentList = [];
                _context3.next = 5;
                return this.loadmore();

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function refresh() {
        return _ref3.apply(this, arguments);
      }

      return refresh;
    }(),

    loadmore: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var author_id, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                author_id = 0;

                if (this.showAuthorOnly) author_id = this.postDetail.user.id;
                _context4.next = 4;
                return this.$acs.getPostComments(this.postId, this.page + 1, author_id, this.recordsPerPage);

              case 4:
                result = _context4.sent;

                if (result.success) {
                  this.commentList = this.commentList.concat(result.comments);
                  this.total = result.total;
                  this.totalRecords = result.records;
                  this.page = this.page + 1;
                  if (this.$refs.scroller && this.page >= this.total) {
                    this.$refs.scroller.$emit('all-loaded');
                  }
                }

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function loadmore() {
        return _ref4.apply(this, arguments);
      }

      return loadmore;
    }()
  })
});

/***/ }),

/***/ 1035:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_toast__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_utils__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_filters__ = __webpack_require__(52);
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







/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      nowdate: __WEBPACK_IMPORTED_MODULE_2_common_js_utils__["a" /* nowFromServer */](),
      processing: false
    };
  },


  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['userInfo', 'editingPostData']), {
    avatarUrl: function avatarUrl() {
      return {
        src: __WEBPACK_IMPORTED_MODULE_3_common_js_filters__["imageStaticUrl"](this.userInfo.avatar_url || window.acsConfig.defaultAvatarUrl),
        error: window.acsConfig.defaultAvatarUrl,
        loading: window.acsConfig.defaultAvatarUrl
      };
    }
  }),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['resetPostEditingData']), {

    close: function close() {
      this.$router.back();
    },

    handleSubmit: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var forumId, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.processing) {
                  _context.next = 8;
                  break;
                }

                this.processing = true;
                forumId = this.$router.currentRoute.params.forumId;
                _context.next = 5;
                return this.$acs.addPost({
                  forum_id: forumId,
                  section_id: this.editingPostData.selectedSectionId,
                  post_id: this.editingPostData.id,
                  title: this.editingPostData.title,
                  content: this.editingPostData.content
                });

              case 5:
                result = _context.sent;


                if (result.success) {
                  this.resetPostEditingData();
                  __WEBPACK_IMPORTED_MODULE_1_common_components_toast__["a" /* default */].show(this.$t('forum.newPost.addSuccess'));
                  this.$router.back();
                }
                this.processing = false;

              case 8:
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

/***/ 1036:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_postListItem__ = __webpack_require__(1487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_postListItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_postListItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_menuModal__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_pagination__ = __webpack_require__(1484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_js_utils__ = __webpack_require__(27);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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







/* harmony default export */ __webpack_exports__["default"] = (_defineProperty({
  components: {
    postListItem: __WEBPACK_IMPORTED_MODULE_1__components_postListItem___default.a,
    pagination: __WEBPACK_IMPORTED_MODULE_3__components_pagination___default.a
  },

  mounted: function mounted() {
    var _this = this;

    this.resize();
    window.addEventListener('resize', function (e) {
      _this.resize();
    });
  },

  watch: {
    'postList': function postList(newVal, oldVal) {
      if (newVal && newVal.length) {
        this.$nextTick(function () {
          this.$refs.pag.$on('switch-page', this.refreshList);
        });
      }
    }
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['searchKeywordHistory']), {

    searchHistoryTable: function searchHistoryTable() {
      var size = this.searchKeywordHistory.length;
      var row = 0;
      var result = [];

      if (size > 0) {
        while (row < Math.floor(size / this.historyTableColumns)) {
          result.push(this.searchKeywordHistory.slice(row * this.historyTableColumns, (row + 1) * this.historyTableColumns));
          row++;
        }
        var n = this.historyTableColumns - size % this.historyTableColumns;
        if (n < this.historyTableColumns) {
          var last = this.searchKeywordHistory.slice(row * this.historyTableColumns);
          while (n > 0) {
            last.push('');
            n--;
          }
          result.push(last);
        }
      }

      return result;
    },

    searchTip: function searchTip() {
      if (this.postList && this.postList.length) {
        return '';
      } else if (this.postList && !this.postList.length) {
        return this.$t('forum.search.noSearchResult');
      } else if (!(this.postList && this.postList.length) && this.searchKeywordHistory.length) {
        return this.$t('forum.search.searchHis');
      } else {
        return this.$t('forum.search.noSearchRecord');
      }
    }
  }),

  data: function data() {
    return {
      page: 0,
      total: 0,
      pageCount: 10,
      postList: undefined,
      keyword: "",
      searching: false,
      historyTableColumns: 2
    };
  },


  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['addSearchHistory', 'clearSearchHistory']), {
    resize: function resize() {
      var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      if (width < 768) {
        this.historyTableColumns = 2;
      } else if (width > 768 && width < 1384) {
        this.historyTableColumns = 3;
      } else {
        this.historyTableColumns = 4;
      }
    },
    onPageChange: function onPageChange(page) {
      this.refreshList(page);
    },

    search: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(keyword) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(keyword != "")) {
                  _context.next = 7;
                  break;
                }

                if (keyword && typeof keyword == 'string') {
                  this.keyword = keyword;
                }
                this.page = 1;
                this.searching = true;
                _context.next = 6;
                return this.refreshList();

              case 6:
                this.searching = false;

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function search(_x) {
        return _ref.apply(this, arguments);
      }

      return search;
    }(),

    refreshList: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$acs.search(this.$route.params.forumId, this.keyword, page, this.pageCount);

              case 2:
                result = _context2.sent;

                if (result.success) {
                  this.postList = result.postList;
                  if (result.postList.length == 0) {
                    setTimeout(function (_) {
                      _this2.postList = undefined;
                    }, 3000);
                  } else {
                    this.addSearchHistory(this.keyword);
                  }
                  this.total = result.total;
                  this.page = page;
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function refreshList() {
        return _ref2.apply(this, arguments);
      }

      return refreshList;
    }()
  })

}, 'watch', {
  keyword: function keyword(val) {
    if (!val) {
      this.postList = undefined;
    }
  }
}));

/***/ }),

/***/ 116:
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

/***/ 1160:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1164:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1171:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1480:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1017),
  /* template */
  __webpack_require__(1646),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/components/menuModal/menuModal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] menuModal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7dca13e5", Component.options)
  } else {
    hotAPI.reload("data-v-7dca13e5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1481:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1018),
  /* template */
  __webpack_require__(1566),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/components/myCommentListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] myCommentListItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2edcb5c8", Component.options)
  } else {
    hotAPI.reload("data-v-2edcb5c8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1482:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1019),
  /* template */
  __webpack_require__(1529),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/components/myFavoriteListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] myFavoriteListItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-091866f1", Component.options)
  } else {
    hotAPI.reload("data-v-091866f1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1483:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1020),
  /* template */
  __webpack_require__(1684),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/components/myPostListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] myPostListItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d3b65416", Component.options)
  } else {
    hotAPI.reload("data-v-d3b65416", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1484:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1021),
  /* template */
  __webpack_require__(1565),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/components/pagination.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pagination.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2a1a29b2", Component.options)
  } else {
    hotAPI.reload("data-v-2a1a29b2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1485:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1022),
  /* template */
  __webpack_require__(1681),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/components/postCommentView.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] postCommentView.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ca84d608", Component.options)
  } else {
    hotAPI.reload("data-v-ca84d608", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1486:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1023),
  /* template */
  __webpack_require__(1591),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/components/postDetailView.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] postDetailView.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-44bed76e", Component.options)
  } else {
    hotAPI.reload("data-v-44bed76e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1487:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1164)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1024),
  /* template */
  __webpack_require__(1528),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-07a67c29",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/components/postListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] postListItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-07a67c29", Component.options)
  } else {
    hotAPI.reload("data-v-07a67c29", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1488:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1171)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1025),
  /* template */
  __webpack_require__(1549),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/components/sliderNav.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] sliderNav.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-19ed14cc", Component.options)
  } else {
    hotAPI.reload("data-v-19ed14cc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1493:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1029),
  /* template */
  __webpack_require__(1589),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/views/mobile/main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-422be638", Component.options)
  } else {
    hotAPI.reload("data-v-422be638", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1494:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  null,
  /* template */
  __webpack_require__(1675),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/views/mobile/myProfile.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] myProfile.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bfbe9d7c", Component.options)
  } else {
    hotAPI.reload("data-v-bfbe9d7c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1495:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1031),
  /* template */
  __webpack_require__(1631),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/views/mobile/newComment.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] newComment.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7050daec", Component.options)
  } else {
    hotAPI.reload("data-v-7050daec", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1496:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1032),
  /* template */
  __webpack_require__(1692),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/views/mobile/newPost.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] newPost.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f56ed9f6", Component.options)
  } else {
    hotAPI.reload("data-v-f56ed9f6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1497:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1033),
  /* template */
  __webpack_require__(1654),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/views/mobile/personalPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] personalPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8eaad3cc", Component.options)
  } else {
    hotAPI.reload("data-v-8eaad3cc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1498:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1034),
  /* template */
  __webpack_require__(1685),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/views/mobile/postDetail.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] postDetail.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e4643408", Component.options)
  } else {
    hotAPI.reload("data-v-e4643408", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1499:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1035),
  /* template */
  __webpack_require__(1613),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/views/mobile/postPreview.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] postPreview.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5bca392d", Component.options)
  } else {
    hotAPI.reload("data-v-5bca392d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1500:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1036),
  /* template */
  __webpack_require__(1640),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/views/mobile/search.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] search.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-750036da", Component.options)
  } else {
    hotAPI.reload("data-v-750036da", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1528:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.$route.params.forumId == _vm.postInfo.forum.id) ? _c('v-touch', {
    staticClass: "has-bottom-line post-list-item",
    class: {
      isTop: _vm.postInfo.is_top
    },
    on: {
      "tap": _vm.showPostDetail
    }
  }, [_c('article', {
    staticClass: "media"
  }, [_c('div', {
    staticClass: "media-left",
    staticStyle: {
      "margin": "0.3rem 0.8rem 0 0"
    }
  }, [_c('figure', {
    directives: [{
      name: "lazy",
      rawName: "v-lazy:background-image",
      value: (_vm.avatarUrl),
      expression: "avatarUrl",
      arg: "background-image"
    }],
    staticClass: "image is-32x32 avatar-image"
  })]), _vm._v(" "), _c('div', {
    staticClass: "media-content"
  }, [_c('div', {
    staticClass: "post-title"
  }, [_c('div', {
    staticClass: "post-title-content flex-take-rest",
    on: {
      "click": _vm.showPostDetail
    }
  }, [(_vm.postInfo.is_top) ? _c('span', {
    staticClass: "tag is-danger"
  }, [_vm._v(_vm._s(_vm.$t('forum.postList.top')))]) : _vm._e(), _vm._v(" "), (_vm.$route.name == 'search') ? _c('span', {
    staticClass: "title is-5",
    staticStyle: {
      "width": "calc(100vw - 19rem)"
    },
    domProps: {
      "innerHTML": _vm._s(_vm.searchWord)
    }
  }) : _c('span', {
    staticClass: "title is-5",
    domProps: {
      "innerHTML": _vm._s(_vm.searchWord)
    }
  }), _vm._v(" "), (_vm.postInfo.has_pic) ? _c('span', {
    staticClass: "tag image-tag has-picture"
  }) : _vm._e(), _vm._v(" "), (_vm.postInfo.is_vote) ? _c('span', {
    staticClass: "tag is-essence"
  }, [_vm._v(_vm._s(_vm.$t('forum.postList.essence')))]) : _vm._e(), _vm._v(" "), (_vm.postInfo.is_hot) ? _c('span', {
    staticClass: "tag is-danger"
  }, [_vm._v(_vm._s(_vm.$t('forum.postList.hot')))]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "post-title-time has-text-right grey-text flex-fixed-size",
    staticStyle: {
      "margin-top": "0"
    }
  }, [_c('timeago', {
    staticClass: "fn-nowrap",
    staticStyle: {
      "padding-left": "1rem"
    },
    attrs: {
      "since": _vm._f("convertServerDateTime")((_vm.postInfo.last_reply_at || _vm.postInfo.inserted_at)),
      "auto-update": 60
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "level is-mobile"
  }, [_c('div', {
    staticClass: "level-left level-item"
  }, [_c('span', {
    staticClass: "is-primary"
  }, [_vm._v(_vm._s(_vm.postInfo.user.nickname))])]), _vm._v(" "), _c('div', {
    staticClass: "level-right level-item has-text-right grey-text"
  }, [_vm._v(_vm._s(_vm.postInfo.comms) + "/" + _vm._s(_vm.postInfo.reads))])])])])]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-07a67c29", module.exports)
  }
}

/***/ }),

/***/ 1529:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content-item has-bottom-line"
  }, [_c('div', {
    staticClass: "level is-mobile"
  }, [_c('v-touch', {
    staticClass: "level-left level-item is-clickable",
    on: {
      "tap": _vm.showDetail
    }
  }, [_c('div', {
    staticClass: "tile is-vertical"
  }, [_c('div', {
    staticClass: "tile"
  }, [_c('h5', {
    staticClass: "title is-5 fn-nowrap",
    staticStyle: {
      "width": "calc(100vw - 10rem)"
    }
  }, [_vm._v("[" + _vm._s(_vm.itemData.post.section.title) + "] " + _vm._s(_vm.itemData.post.title))])]), _vm._v(" "), _c('div', {
    staticClass: "tile"
  }, [_c('span', {
    staticClass: "size-1-1 is-thickness is-dark"
  }, [_vm._v(_vm._s(_vm._f("formatServerDateTime")(_vm.itemData.post.inserted_at)))]), _vm._v(" "), _c('span', {
    staticClass: "size-1-1 is-thickness is-dark",
    staticStyle: {
      "margin": "0 1rem"
    }
  }, [_vm._v("|")]), _vm._v(" "), _c('span', {
    staticClass: "size-1-1 is-thickness is-dark"
  }, [_vm._v(_vm._s(_vm.itemData.post.comms + '/' + _vm.itemData.post.reads))])])])]), _vm._v(" "), _c('v-touch', {
    staticClass: "level-right level-item is-narrow is-clickable",
    staticStyle: {
      "height": "4rem"
    },
    attrs: {
      "tag": "div"
    }
  }, [_c('span', {
    staticClass: "icon image-icon icon-trash is-small"
  }), _vm._v(" "), _c('span', {
    staticClass: "is-danger",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.confirmDeleteFavorite($event)
      }
    }
  }, [_vm._v(" " + _vm._s(_vm.$t('forum.personal.cancelFavor')))])])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-091866f1", module.exports)
  }
}

/***/ }),

/***/ 1549:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "slider-nav"
  }, [_c('div', {
    staticClass: "nav"
  }, [_c('div', {
    staticClass: "nav-center"
  }, [_vm._l((_vm.menus), function(item, index) {
    return _c('v-touch', {
      key: "item.value",
      ref: "navItem",
      refInFor: true,
      staticClass: "nav-item is-tab has-right-line is-mobile",
      class: {
        'is-active': item.value == _vm.currentValue
      },
      attrs: {
        "tag": "a"
      },
      on: {
        "tap": function($event) {
          _vm.switchMenu(item, index, $event)
        }
      }
    }, [_vm._v(_vm._s(item.text))])
  }), _vm._v(" "), _c('div', {
    ref: "sliderBar",
    staticClass: "slider-bar",
    staticStyle: {
      "display": "flex"
    },
    style: ({
      'left': _vm.sliderPosition,
      'width': _vm.barWidth,
      'background-size': _vm.sliderBackgroundSize
    })
  })], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-19ed14cc", module.exports)
  }
}

/***/ }),

/***/ 1565:
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
  }, [_vm._v(_vm._s(_vm.$t('forum.pagination.previous')))])]), _vm._v(" "), _c('li', [_c('a', {
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
  }, [_vm._v("\n                              " + _vm._s(_vm.currentPage - 1) + " ")])]), _vm._v(" "), _c('li', [_c('a', {
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
  }, [_vm._v(_vm._s(_vm.$t('forum.pagination.next')))])])], 2)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('span', [_vm._v("...")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2a1a29b2", module.exports)
  }
}

/***/ }),

/***/ 1566:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content-item has-bottom-line"
  }, [_c('div', {
    staticClass: "tile is-vertical"
  }, [_c('div', {
    staticClass: "tile",
    staticStyle: {
      "margin-left": "1rem",
      "display": "flex",
      "align-items": "center"
    }
  }, [_c('h5', {
    staticClass: "title is-5"
  }, [_vm._v(_vm._s(_vm.$t('forum.personal.reply')))]), _vm._v(" "), (!_vm.itemData.active) ? _c('span', {
    staticClass: "size-1-2 is-thickness is-dark"
  }, [_vm._v(_vm._s(_vm.delHtmlTag(_vm.itemData.content)))]) : _c('h5', {
    staticClass: "title is-5"
  }, [_vm._v(_vm._s(_vm.delHtmlTag(_vm.itemData.content)))])]), _vm._v(" "), _c('div', {
    staticClass: "tile",
    staticStyle: {
      "margin-left": "1rem"
    }
  }, [_c('span', {
    staticClass: "size-1-1 is-thickness is-dark"
  }, [_vm._v(_vm._s(_vm._f("formatServerDateTime")(_vm.itemData.inserted_at)))]), _vm._v(" "), _c('span', {
    staticClass: "size-1-1 is-thickness is-dark",
    staticStyle: {
      "margin": "0 1em"
    }
  }, [_vm._v("|")]), _vm._v(" "), _c('span', {
    staticClass: "size-1-1 is-thickness is-dark"
  }, [_vm._v(_vm._s(_vm.itemData.post.comms + '/' + _vm.itemData.post.reads))])]), _vm._v(" "), _c('v-touch', {
    staticClass: "tile has-background is-clickable",
    staticStyle: {
      "align-items": "center"
    },
    on: {
      "tap": _vm.showDetail
    }
  }, [_c('h5', {
    staticClass: "title is-5",
    staticStyle: {
      "margin": "0.5rem"
    }
  }, [_vm._v(_vm._s(_vm.$t('forum.personal.originalPost')) + "[" + _vm._s(_vm.itemData.post.section.title) + "] " + _vm._s(_vm.itemData.post.title))])])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2edcb5c8", module.exports)
  }
}

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var Dialog = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(541));

/* harmony default export */ __webpack_exports__["a"] = ({
  show: function show() {
    var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      visible: true
    };

    var instance = new Dialog({
      el: document.createElement('div'),
      propsData: propsData
    });
  }
});

/***/ }),

/***/ 1589:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "root-container"
  }, [_c('nav', {
    staticClass: "header level is-mobile"
  }, [_c('div', {
    staticClass: "level-item"
  }), _vm._v(" "), _c('div', {
    staticClass: "level-item"
  }, [_c('router-link', {
    staticClass: "icon icon-jqxs",
    attrs: {
      "to": {
        name: 'index'
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "level-item is-menu menu-right"
  }, [_c('router-link', {
    staticClass: "menu icon icon-user",
    attrs: {
      "to": {
        name: 'search'
      }
    }
  }), _vm._v(" "), _c('router-link', {
    staticClass: "menu icon icon-search",
    attrs: {
      "to": {
        name: 'search'
      }
    }
  })], 1)]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": _vm.transitionName
    }
  }, [_c('router-view', {
    staticClass: "content-container flex-take-rest"
  })], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-422be638", module.exports)
  }
}

/***/ }),

/***/ 159:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return showMobileMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var Menu = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(543));

var showMobileMenu = function showMobileMenu() {
  var propsData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    visible: true
  };

  var instance = new Menu({
    el: document.createElement('div'),
    propsData: propsData
  });

  return instance;
};

/***/ }),

/***/ 1591:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "post-detail has-bottom-line"
  }, [_c('article', {
    staticClass: "media",
    class: _vm.isManager ? 'has-bottom-line' : ''
  }, [_c('div', {
    staticClass: "media-left",
    staticStyle: {
      "margin": "0 1rem 0 0"
    }
  }, [_c('figure', {
    directives: [{
      name: "lazy",
      rawName: "v-lazy:background-image",
      value: (_vm.avatarUrl),
      expression: "avatarUrl",
      arg: "background-image"
    }],
    staticClass: "image is-32x32 avatar-image"
  }), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-top": "0.5rem"
    }
  }, [_c('h6', {
    staticClass: "title is-6 is-lightred is-normal",
    staticStyle: {
      "font-size": "1rem"
    }
  }, [_vm._v(_vm._s(_vm.$t('forum.detail.author')))])])]), _vm._v(" "), _c('div', {
    staticClass: "media-content"
  }, [_c('nav', {
    staticClass: "nav"
  }, [_c('div', {
    staticClass: "nav-left has-text-left flex-take-rest"
  }, [(_vm.postData.is_top) ? _c('span', {
    staticClass: "tag is-danger"
  }, [_vm._v(_vm._s(_vm.$t('forum.postList.top')))]) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "post-title"
  }, [_vm._v("\n            [" + _vm._s(_vm.postData.section.title) + "] " + _vm._s(_vm.postData.title) + "\n          ")]), _vm._v(" "), (_vm.postData.is_vote) ? _c('span', {
    staticClass: "tag is-essence"
  }, [_vm._v(_vm._s(_vm.$t('forum.postList.essence')))]) : _vm._e(), _vm._v(" "), (_vm.postData.is_hot) ? _c('span', {
    staticClass: "tag is-danger"
  }, [_vm._v(_vm._s(_vm.$t('forum.postList.hot')))]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "nav-right has-text-right flex-fixed-size",
    staticStyle: {
      "min-width": "5rem"
    }
  }, [_c('v-touch', {
    staticClass: "button level-button is-primary",
    attrs: {
      "tag": "a"
    },
    on: {
      "tap": _vm.toggleShowAuthorOnly
    }
  }, [_vm._v("\n            " + _vm._s(this.showAuthorOnly ? _vm.$t('forum.detail.showAll') : _vm.$t('forum.detail.showAuthorOnly')) + "\n          ")])], 1)]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "is-grey"
  }, [_c('timeago', {
    attrs: {
      "since": _vm._f("convertServerDateTime")((_vm.postData.inserted_at)),
      "auto-update": 60
    }
  })], 1), _vm._v(" "), _c('span', {
    staticClass: "is-primary",
    staticStyle: {
      "font-size": "1.1rem"
    }
  }, [_vm._v(_vm._s(_vm.postData.user.nickname))])]), _vm._v(" "), _c('quill-content', {
    staticClass: "quill-editor ql-snow post-content",
    staticStyle: {
      "font-size": "1.1rem"
    },
    attrs: {
      "content": _vm.postData.content
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "tile favoriting"
  }, [(_vm.favoriting) ? _c('span', {
    staticClass: "icon image-icon icon-circle rotating",
    staticStyle: {
      "margin-left": "0.1rem"
    }
  }) : _c('v-touch', {
    staticClass: "icon image-icon is-clickable",
    class: _vm.postData.is_favorite ? 'icon-heart' : 'icon-heart-o',
    staticStyle: {
      "margin-left": "0.1rem"
    },
    attrs: {
      "tag": "span"
    },
    on: {
      "tap": _vm.toggleFavorite
    }
  }), _vm._v(" "), (_vm.favoriting) ? _c('span', {
    staticClass: "is-grey",
    staticStyle: {
      "margin-top": "0.08rem"
    }
  }, [_vm._v("\n          " + _vm._s(_vm.$t('forum.detail.favoriting')) + "\n        ")]) : _c('v-touch', {
    staticClass: "is-grey is-clickable",
    staticStyle: {
      "margin-top": "0.08rem"
    },
    attrs: {
      "tag": "span"
    },
    on: {
      "tap": _vm.toggleFavorite
    }
  }, [_vm._v("\n          " + _vm._s(_vm.postData.is_favorite ? _vm.$t('forum.detail.removeFromFavorites') : _vm.$t('forum.detail.addToFavorite')) + "\n        ")])], 1)], 1)]), _vm._v(" "), (_vm.isManager) ? _c('nav', {
    staticClass: "nav post-manage-bar"
  }, [_c('v-touch', {
    staticClass: "nav-left has-text-left",
    on: {
      "tap": _vm.toggleActive
    }
  }, [_c('a', {
    staticClass: "button is-danger"
  }, [_c('span', {
    staticClass: "icon image-icon icon-times"
  }), _vm._v(" " + _vm._s(_vm.postData.active ? _vm.$t('forum.detail.closePost') : _vm.$t('forum.detail.openPost')) + "\n      ")])]), _vm._v(" "), _c('v-touch', {
    staticClass: "nav-center has-text-center",
    on: {
      "tap": _vm.toggleEssence
    }
  }, [_c('a', {
    staticClass: "button is-primary"
  }, [_c('span', {
    staticClass: "icon image-icon icon-star"
  }), _vm._v(" " + _vm._s(_vm.postData.is_vote ? _vm.$t('forum.detail.unEssencePost') : _vm.$t('forum.detail.essencePost')) + "\n      ")])]), _vm._v(" "), _c('v-touch', {
    staticClass: "nav-right has-text-right",
    on: {
      "tap": _vm.toggleUp
    }
  }, [_c('a', {
    staticClass: "button is-info"
  }, [_c('span', {
    staticClass: "icon image-icon icon-top"
  }), _vm._v(" " + _vm._s(_vm.postData.is_top ? _vm.$t('forum.detail.unUpPost') : _vm.$t('forum.detail.upPost')) + "\n      ")])])], 1) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-44bed76e", module.exports)
  }
}

/***/ }),

/***/ 160:
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

/***/ 1613:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "post-detail"
  }, [_c('article', {
    staticClass: "media has-bottom-line"
  }, [_c('div', {
    staticClass: "media-left",
    staticStyle: {
      "margin": "0 1rem 0 0"
    }
  }, [_c('figure', {
    directives: [{
      name: "lazy",
      rawName: "v-lazy:background-image",
      value: (_vm.avatarUrl),
      expression: "avatarUrl",
      arg: "background-image"
    }],
    staticClass: "image is-32x32 avatar-image"
  }), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-top": "0.5rem"
    }
  }, [_c('h6', {
    staticClass: "title is-6 is-lightred",
    staticStyle: {
      "font-weight": "400",
      "font-size": "1rem"
    }
  }, [_vm._v(_vm._s(_vm.$t('forum.detail.author')))])])]), _vm._v(" "), _c('div', {
    staticClass: "media-content"
  }, [_c('nav', {
    staticClass: "nav"
  }, [_c('div', {
    staticClass: "nav-left has-text-left"
  }, [_c('span', {
    staticClass: "post-title"
  }, [_vm._v("\n            [" + _vm._s(_vm.editingPostData.sectionTitle) + "] " + _vm._s(_vm.editingPostData.title) + "\n          ")])])]), _vm._v(" "), _c('p', [_c('span', {
    staticClass: "is-grey"
  }, [_c('timeago', {
    attrs: {
      "since": _vm.nowdate,
      "auto-update": 60
    }
  })], 1), _vm._v(" "), _c('span', {
    staticClass: "is-primary"
  }, [_vm._v(_vm._s(_vm.userInfo.nickname))])]), _vm._v(" "), _c('quill-content', {
    staticClass: "post-content",
    attrs: {
      "content": _vm.editingPostData.content
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "tile is-full has-text-centered"
  }, [_c('p', {
    staticStyle: {
      "margin": "1rem auto"
    }
  }, [_c('input', {
    staticClass: "button is-info",
    staticStyle: {
      "display": "inline-block",
      "margin": "0.5rem",
      "font-size": "1rem"
    },
    attrs: {
      "type": "submit"
    },
    domProps: {
      "value": _vm.$t('forum.newPost.backAndEdit')
    },
    on: {
      "click": _vm.close
    }
  }), _vm._v(" "), _c('input', {
    staticClass: "button is-primary",
    staticStyle: {
      "display": "inline-block",
      "margin": "0.5rem",
      "font-size": "1rem"
    },
    attrs: {
      "type": "submit"
    },
    domProps: {
      "value": _vm.$t('forum.newPost.btnTitle')
    },
    on: {
      "click": _vm.handleSubmit
    }
  })])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5bca392d", module.exports)
  }
}

/***/ }),

/***/ 1631:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "position": "relative"
    }
  }, [_c('scroller', {
    attrs: {
      "options": {
        preventDefault: false,
        mouseWheel: true,
        scrollX: false,
        scrollY: true,
      }
    }
  }, [_c('div', {
    staticClass: "has-text-left",
    staticStyle: {
      "padding": "1rem 0"
    }
  }, [_c('h6', {
    staticClass: "title is-6",
    staticStyle: {
      "font-weight": "400"
    }
  }, [_vm._v(_vm._s(_vm.$t('forum.detail.replyBtn') + ": " + _vm.currentPostTitle))])]), _vm._v(" "), _c('form', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.currentPostTitle),
      expression: "currentPostTitle"
    }],
    staticClass: "post",
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('quill-editor', {
    attrs: {
      "placeholder": _vm.$t('forum.newPost.textAreaPlaceHolder')
    },
    on: {
      "ready": _vm.setEditor,
      "input": function($event) {
        _vm.handleValidation(_vm.$v.content)
      },
      "image": _vm.onInsertImage
    },
    model: {
      value: (_vm.content),
      callback: function($$v) {
        _vm.content = $$v
      },
      expression: "content"
    }
  }), _vm._v(" "), _c('div', {
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
    staticClass: "tile is-full has-text-centered",
    staticStyle: {
      "justify-content": "center",
      "margin-top": "0.5rem"
    }
  }, [_c('input', {
    staticClass: "button is-info",
    class: _vm.processing ? 'is-disabled' : '',
    attrs: {
      "type": "submit",
      "disabled": _vm.processing
    },
    domProps: {
      "value": _vm.$t('forum.writeComment.title')
    }
  })])], 1)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7050daec", module.exports)
  }
}

/***/ }),

/***/ 1640:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "search-page"
  }, [_c('div', {
    staticClass: "search-bar is-full",
    class: _vm.postList && _vm.postList.length > 0 ? 'has-bottom-line' : ''
  }, [_c('div', {
    staticClass: "field is-grouped"
  }, [_c('p', {
    staticClass: "control is-expanded has-icon"
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
      "type": "input",
      "placeholder": _vm.$t('forum.search.placeholder')
    },
    domProps: {
      "value": (_vm.keyword)
    },
    on: {
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.search($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        _vm.keyword = ''
      }],
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.keyword = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon image-icon",
    class: {
      'icon-circle rotating': _vm.searching,
      'icon-search': !_vm.searching,
    }
  })]), _vm._v(" "), _c('p', {
    staticClass: "control"
  }, [_c('a', {
    staticClass: "button is-info",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.search($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('forum.search.btnTitle')))])])])]), _vm._v(" "), (_vm.searchTip) ? _c('p', [_c('span', {
    staticClass: "is-grey",
    staticStyle: {
      "font-size": "1rem"
    }
  }, [_vm._v(_vm._s(_vm.searchTip) + " ")])]) : _vm._e(), _vm._v(" "), (!_vm.postList && _vm.searchKeywordHistory.length) ? _c('div', {
    staticStyle: {
      "padding": "1rem 1px"
    }
  }, _vm._l((_vm.searchHistoryTable), function(row, i) {
    return _c('div', {
      staticClass: "columns is-mobile is-gapless",
      staticStyle: {
        "margin-bottom": "0"
      }
    }, _vm._l((row), function(keyword, j) {
      return _c('div', {
        staticClass: "column has-text-centered has-hairline-border",
        class: {
          'hairline-hide-right': j < _vm.historyTableColumns - 1,
            'hairline-hide-top': i > 0,
            'is-half': _vm.historyTableColumns == 2,
            'is-4': _vm.historyTableColumns == 3,
            'is-3': _vm.historyTableColumns == 4,
            'is-clickable': keyword
        },
        staticStyle: {
          "padding": "0.5rem 0"
        },
        on: {
          "click": function($event) {
            _vm.search(keyword)
          }
        }
      }, [_c('span', {
        staticClass: "title is-5",
        staticStyle: {
          "font-weight": "400",
          "font-size": "1.1rem"
        }
      }, [_vm._v(" " + _vm._s(keyword) + " ")])])
    }))
  })) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "width": "100%"
    }
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.postList && _vm.searchKeywordHistory.length),
      expression: "!postList && searchKeywordHistory.length"
    }],
    staticClass: "is-primary is-clickable",
    on: {
      "click": _vm.clearSearchHistory
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$t('forum.search.clearHisRecord')) + "\n    ")])]), _vm._v(" "), _vm._l((_vm.postList), function(item) {
    return _c('post-list-item', {
      key: item.id,
      attrs: {
        "search-keyword": _vm.keyword,
        "post-info": item
      }
    })
  }), _vm._v(" "), (_vm.postList && _vm.postList.length) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.total > 1),
      expression: "total > 1"
    }],
    staticClass: "column is-full"
  }, [_c('pagination', {
    ref: "pag",
    attrs: {
      "page-count": _vm.total,
      "current-page": _vm.page,
      "on-page-change": _vm.onPageChange
    }
  })], 1) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-750036da", module.exports)
  }
}

/***/ }),

/***/ 1646:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['modal', 'animated', _vm.visible ? 'is-active' : ''],
    attrs: {
      "transition": _vm.transition,
      "transition-mode": "in-out"
    }
  }, [_c('div', {
    staticClass: "modal-background",
    on: {
      "click": _vm.cancel
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "modal-card"
  }, [_c('section', {
    staticClass: "modal-card-body modal-menu"
  }, _vm._l((_vm.menuItems), function(item) {
    return _c('div', {
      staticClass: "level is-mobile modal-menu-item has-bottom-line",
      on: {
        "click": function($event) {
          _vm.ok(item)
        }
      }
    }, [_c('div', {
      staticClass: "level-item level-left has-text-left"
    }, [_c('h5', {
      staticClass: "title is-4",
      class: _vm.selectedValue == item.value ? 'active' : '',
      staticStyle: {
        "font-weight": "400",
        "margin-left": "1rem"
      }
    }, [_vm._v(_vm._s(item.title))])]), _vm._v(" "), _c('div', {
      staticClass: "level-item level-right has-text-right"
    }, [_c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (_vm.selectedValue == item.value),
        expression: "selectedValue == item.value"
      }],
      staticClass: "icon image-icon icon-check",
      staticStyle: {
        "margin-right": "1rem"
      }
    })])])
  }))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7dca13e5", module.exports)
  }
}

/***/ }),

/***/ 1654:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "person"
  }, [_c('div', {
    staticClass: "media flex-fixed-size"
  }, [_c('figure', {
    staticClass: "media-left is-clickable",
    on: {
      "click": _vm.onShowMyProfile
    }
  }, [_c('p', {
    directives: [{
      name: "lazy",
      rawName: "v-lazy:background-image",
      value: (_vm.avatarUrl),
      expression: "avatarUrl",
      arg: "background-image"
    }],
    staticClass: "image is-64x64 avatar-image"
  })]), _vm._v(" "), _c('div', {
    staticClass: "media-content"
  }, [_c('div', {
    staticClass: "info"
  }, [_c('p', [_vm._v("\n          " + _vm._s(_vm.$t('forum.personal.nickname')) + "\n          "), _c('span', [_vm._v(_vm._s(this.userInfo.nickname))])]), _vm._v(" "), _c('p', [_vm._v("\n          " + _vm._s(_vm.$t('forum.personal.postCount')) + "\n          "), _c('span', [_vm._v(_vm._s(this.userInfo.post_count))])]), _vm._v(" "), _c('p', [_vm._v("\n          " + _vm._s(_vm.$t('forum.personal.registerTime')) + "\n          "), _c('span', [_vm._v(_vm._s(_vm._f("formatServerDate")(this.userInfo.inserted_at)))])])])]), _vm._v(" "), _vm._m(0)]), _vm._v(" "), _c('slider-nav', {
    ref: "nav",
    staticClass: "flex-fixed-size",
    attrs: {
      "menus": _vm.menus
    },
    on: {
      "onSelect": _vm.switchMenu
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "content flex-take-rest",
    staticStyle: {
      "position": "relative"
    }
  }, [_c('scroller', {
    ref: "scroller",
    attrs: {
      "on-load-more": _vm.loadmore
    }
  }, [_vm._l((_vm.postList), function(item, index) {
    return (_vm.type == 'myPosts') ? _c('my-post-list-item', {
      key: item.id,
      attrs: {
        "item-data": item,
        "item-index": index
      },
      on: {
        "item-deleted": _vm.onItemDelete
      }
    }) : _vm._e()
  }), _vm._v(" "), _vm._l((_vm.commentList), function(item) {
    return (_vm.type == 'myComments') ? _c('my-comment-list-item', {
      key: item.id,
      attrs: {
        "item-data": item
      }
    }) : _vm._e()
  }), _vm._v(" "), _vm._l((_vm.favoriteList), function(item, index) {
    return (_vm.type == 'myFavor') ? _c('my-favorite-list-item', {
      key: item.id,
      attrs: {
        "item-data": item,
        "item-index": index
      },
      on: {
        "item-deleted": _vm.onItemDelete
      }
    }) : _vm._e()
  }), _vm._v(" "), _vm._l((_vm.banList), function(item, index) {
    return (_vm.type == 'myBan' && _vm.isManager) ? _c('my-post-list-item', {
      key: item.id,
      attrs: {
        "item-data": item,
        "item-index": index
      },
      on: {
        "item-deleted": _vm.onItemDelete
      }
    }) : _vm._e()
  })], 2)], 1)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "media-right"
  }, [_c('p', [_c('input', {
    staticClass: "button is-info",
    attrs: {
      "type": "button",
      "value": "个人资料"
    }
  })]), _vm._v(" "), _c('p', [_c('input', {
    staticClass: "button is-info",
    attrs: {
      "type": "button",
      "value": "我的消息"
    }
  })])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8eaad3cc", module.exports)
  }
}

/***/ }),

/***/ 1675:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my_profile"
  }, [_c('div', {
    staticClass: "columns is-multiline is-mobile has-text-centered"
  }, [_c('div', {
    staticClass: "column is-12"
  }, [_c('router-link', {
    staticClass: "icon icon-head-portrait",
    attrs: {
      "to": {
        name: 'search'
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "column is-12"
  }, [_c('span', {
    staticClass: "nickname"
  }, [_vm._v("\n        昵称：firevale  \n        "), _c('router-link', {
    staticClass: "icon icon-edit",
    attrs: {
      "to": {
        name: 'search'
      }
    }
  })], 1)])]), _vm._v(" "), _vm._m(0)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "binding"
  }, [_c('div', {
    staticClass: "level is-mobile"
  }, [_c('div', {
    staticClass: "level-left"
  }, [_c('span', {
    staticClass: "info"
  }, [_vm._v("绑定手机：")])]), _vm._v(" "), _c('div', {
    staticClass: "level-right"
  }, [_c('input', {
    staticClass: "button is-info",
    attrs: {
      "type": "button",
      "value": "绑定手机"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "level is-mobile"
  }, [_c('div', {
    staticClass: "level-left"
  }, [_c('span', {
    staticClass: "info"
  }, [_vm._v("绑定邮箱：")])]), _vm._v(" "), _c('div', {
    staticClass: "level-right"
  }, [_c('input', {
    staticClass: "button is-info",
    attrs: {
      "type": "button",
      "value": "绑定邮箱"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "level is-mobile"
  }, [_c('div', {
    staticClass: "level-left"
  }, [_c('span', {
    staticClass: "info"
  }, [_vm._v("实名认证：")])]), _vm._v(" "), _c('div', {
    staticClass: "level-right"
  }, [_c('input', {
    staticClass: "button is-info",
    attrs: {
      "type": "button",
      "value": "实名认证"
    }
  })])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-bfbe9d7c", module.exports)
  }
}

/***/ }),

/***/ 1681:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "post-detail has-bottom-line"
  }, [_c('article', {
    staticClass: "media"
  }, [_c('div', {
    staticClass: "media-left",
    staticStyle: {
      "margin": "0 1rem 0 0"
    }
  }, [_c('figure', {
    directives: [{
      name: "lazy",
      rawName: "v-lazy:background-image",
      value: (_vm.avatarUrl),
      expression: "avatarUrl",
      arg: "background-image"
    }],
    staticClass: "image is-32x32 avatar-image"
  }), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-top": "0.5rem"
    }
  }, [_c('h6', {
    staticClass: "title is-6 is-lightred",
    staticStyle: {
      "font-weight": "400",
      "font-size": "1rem"
    }
  }, [_vm._v(_vm._s(_vm.nthName))])])]), _vm._v(" "), _c('div', {
    staticClass: "media-content"
  }, [_c('nav', {
    staticClass: "nav"
  }, [_c('div', {
    staticClass: "nav-left has-text-left"
  }, [_c('span', {
    staticClass: "is-grey",
    staticStyle: {
      "margin-right": "0.5rem",
      "margin-top": "0.65rem"
    }
  }, [_c('timeago', {
    attrs: {
      "since": _vm._f("convertServerDateTime")((_vm.commentData.inserted_at)),
      "auto-update": 60
    }
  })], 1), _vm._v(" "), _c('span', {
    staticClass: "is-primary",
    staticStyle: {
      "font-size": "1.1rem",
      "margin-top": "0.65rem"
    }
  }, [_vm._v(_vm._s(_vm.commentData.user.nickname))])]), _vm._v(" "), (_vm.isManager && _vm.commentData.active) ? _c('div', {
    staticClass: "nav-right has-text-right",
    staticStyle: {
      "display": "flex",
      "flex-basis": "5rem",
      "align-items": "center"
    }
  }, [_c('span', {
    staticClass: "icon image-icon icon-trash is-clickable",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.confirmDeleteComment($event)
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "is-darkred is-clickable",
    staticStyle: {
      "margin-top": "0.25rem",
      "margin-left": "0.1rem"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.confirmDeleteComment($event)
      }
    }
  }, [_vm._v("\n            " + _vm._s(_vm.$t('common.delete')) + " ")])]) : _vm._e()]), _vm._v(" "), _c('quill-content', {
    key: _vm.commentData.content,
    staticClass: "quill-editor ql-snow post-content",
    staticStyle: {
      "font-size": "1.1rem"
    },
    style: ({
      color: !_vm.commentData.active ? '#979797' : ''
    }),
    attrs: {
      "content": _vm.commentData.content
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ca84d608", module.exports)
  }
}

/***/ }),

/***/ 1684:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content-item has-bottom-line"
  }, [_c('div', {
    staticClass: "level is-mobile"
  }, [_c('v-touch', {
    staticClass: "level-item is-clickable",
    on: {
      "tap": _vm.showDetail
    }
  }, [_c('div', {
    staticClass: "tile is-vertical"
  }, [_c('div', {
    staticClass: "tile"
  }, [_c('h5', {
    staticClass: "title is-5"
  }, [_c('span', {
    staticClass: "section-name"
  }, [_vm._v("[" + _vm._s(_vm.itemData.section.title) + "]")]), _vm._v(" " + _vm._s(_vm.itemData.title))]), _vm._v(" "), _c('a', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.itemData.newComment),
      expression: "itemData.newComment"
    }],
    staticClass: "tag is-outlined"
  }, [_vm._v(_vm._s(_vm.$t('forum.personal.newComment')))])]), _vm._v(" "), _c('div', {
    staticClass: "tile"
  }, [_c('span', {
    staticClass: "size-1-1 is-thickness is-dark"
  }, [_vm._v(_vm._s(_vm._f("formatServerDateTime")(_vm.itemData.inserted_at)))]), _vm._v(" "), _c('span', {
    staticClass: "size-1-1 is-thickness is-dark",
    staticStyle: {
      "margin": "0 1rem"
    }
  }, [_vm._v("|")]), _vm._v(" "), _c('span', {
    staticClass: "size-1-1 is-thickness is-dark"
  }, [_vm._v(_vm._s(_vm.itemData.comms + '/' + _vm.itemData.reads))]), _vm._v(" "), (_vm.isManager && !_vm.itemData.active) ? _c('v-touch', {
    staticClass: "is-narrow is-clickable",
    attrs: {
      "tag": "span"
    }
  }, [_c('span', {
    staticClass: "icon image-icon icon-lock is-small"
  }), _vm._v(" "), _c('span', {
    staticClass: "is-danger",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.confirmDeArchivePost($event)
      }
    }
  }, [_vm._v(" " + _vm._s(_vm.$t('forum.detail.openPost')))])]) : _c('v-touch', {
    staticClass: "is-narrow is-clickable",
    attrs: {
      "tag": "span"
    }
  }, [_c('span', {
    staticClass: "icon image-icon icon-trash is-small"
  }), _vm._v(" "), _c('span', {
    staticClass: "is-danger",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.confirmDeletePost($event)
      }
    }
  }, [_vm._v(" " + _vm._s(_vm.$t('forum.personal.deleteBtn')))])])], 1)])])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d3b65416", module.exports)
  }
}

/***/ }),

/***/ 1685:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "position": "relative"
    }
  }, [_c('scroller', {
    ref: "scroller",
    attrs: {
      "on-load-more": _vm.loadmore
    }
  }, [(_vm.postDetail) ? _c('post-detail-view', {
    attrs: {
      "post-data": _vm.postDetail,
      "on-showauthor-only": _vm.onShowAuthorOnly
    }
  }) : _vm._e(), _vm._v(" "), _vm._l((_vm.commentList), function(comment, index) {
    return _c('post-comment-view', {
      key: comment.id,
      attrs: {
        "comment-data": comment,
        "item-index": index,
        "nth": index + 1
      },
      on: {
        "on-item-deleted": _vm.onItemDelete
      }
    })
  })], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e4643408", module.exports)
  }
}

/***/ }),

/***/ 1692:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "position": "relative"
    }
  }, [_c('scroller', {
    attrs: {
      "options": {
        preventDefault: false,
        mouseWheel: true,
        scrollX: false,
        scrollY: true,
      }
    }
  }, [_c('div', {
    staticClass: "has-text-left",
    staticStyle: {
      "padding": "1rem 0"
    }
  }, [_c('v-touch', {
    staticClass: "title is-5 is-clickable",
    staticStyle: {
      "margin": "0 0.5rem 0 0",
      "font-weight": "400"
    },
    attrs: {
      "tag": "span"
    },
    on: {
      "tap": _vm.showSelectSectionMenu
    }
  }, [_vm._v("\n        " + _vm._s(_vm.selectedSectionTitle) + "\n      ")]), _vm._v(" "), _c('v-touch', {
    staticClass: "icon image-icon icon-pull-down is-clickable",
    attrs: {
      "tag": "span"
    },
    on: {
      "tap": _vm.showSelectSectionMenu
    }
  })], 1), _vm._v(" "), _c('form', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.selectedSectionTitle),
      expression: "selectedSectionTitle"
    }],
    staticClass: "post",
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('p', {
    staticClass: "control is-horizontal",
    staticStyle: {
      "margin-bottom": "1.5rem"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.editingPostData.title),
      expression: "editingPostData.title",
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
      "placeholder": _vm.$t('forum.newPost.titlePlaceholder')
    },
    domProps: {
      "value": (_vm.editingPostData.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.editingPostData.title = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })]), _vm._v(" "), _c('quill-editor', {
    attrs: {
      "placeholder": _vm.$t('forum.newPost.textAreaPlaceHolder')
    },
    on: {
      "ready": _vm.setEditor,
      "input": function($event) {
        _vm.handleValidation(_vm.$v.editingPostData.content)
      },
      "image": _vm.onInsertImage
    },
    model: {
      value: (_vm.editingPostData.content),
      callback: function($$v) {
        _vm.editingPostData.content = (typeof $$v === 'string' ? $$v.trim() : $$v)
      },
      expression: "editingPostData.content"
    }
  }), _vm._v(" "), _c('div', {
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
      "margin": "0 auto"
    }
  }, [_c('input', {
    staticClass: "button is-info",
    class: _vm.processing || _vm.$v.$invalid ? 'is-disabled' : '',
    staticStyle: {
      "min-width": "8rem",
      "padding-bottom": "0.4em",
      "padding-top": "0.35em",
      "margin": "0.5rem 0",
      "display": "inline-block"
    },
    attrs: {
      "type": "button",
      "value": _vm.$t('forum.newPost.preview'),
      "disabled": _vm.$v.$invalid
    },
    on: {
      "click": _vm.preview
    }
  }), _vm._v(" "), _c('input', {
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
      "value": _vm.$t('forum.newPost.btnTitle')
    }
  })])])], 1)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f56ed9f6", module.exports)
  }
}

/***/ }),

/***/ 1700:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(759);


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

/***/ 1911:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_acs__ = __webpack_require__(41);
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






/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.getForumList();

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

  data: function data() {
    return {
      inApp: window.acsConfig.inApp,
      canGoBack: false,
      processing: false,
      forumList: []
    };
  },

  methods: {
    getForumList: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.processing) {
                  _context2.next = 7;
                  break;
                }

                this.processing = true;
                _context2.next = 4;
                return this.$acs.getPagedForums();

              case 4:
                result = _context2.sent;

                if (result.success) {
                  this.forumList = result.forums;
                }
                this.processing = false;

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getForumList() {
        return _ref2.apply(this, arguments);
      }

      return getForumList;
    }(),

    onBtnBackClicked: function onBtnBackClicked() {
      if (this.canGoBack) {
        this.$router.back();
      } else if (this.inApp) {
        nativeApi.closeWebviewWithResult({
          success: false
        });
      }
    },

    showForum: function showForum(forum_id) {
      this.$router.push({
        name: "postList",
        params: {
          forumId: forum_id
        }
      });
    }
  },

  watch: {
    '$route': function $route(to, from) {
      this.canGoBack = history.state != null;
    }
  }
});

/***/ }),

/***/ 1912:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_postListItem__ = __webpack_require__(1487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_postListItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_postListItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_menuModal__ = __webpack_require__(488);
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
  components: {
    postListItem: __WEBPACK_IMPORTED_MODULE_1__components_postListItem___default.a
  },

  watch: {
    'currentSectionId': function currentSectionId(newVal, oldVal) {
      var _this = this;

      if (oldVal != newVal) {
        this.$nextTick(function (_) {
          return _this.resetScroller();
        });
      }
    }
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['currentSectionId', 'postsOrderByField', 'forumInfo'])),

  data: function data() {
    return {
      postList: [],
      page: 0,
      total: 1,
      recordsPerPage: 20,
      loading: false
    };
  },


  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['setCurrentSectionId', 'setPostsOrderByField']), {
    selectOrderByField: function selectOrderByField() {
      var _this2 = this;

      __WEBPACK_IMPORTED_MODULE_2__components_menuModal__["a" /* default */].showModal({
        menuItems: [{
          value: 'last_reply_at',
          title: this.$t('forum.orderType.last_reply_at')
        }, {
          value: 'inserted_at',
          title: this.$t('forum.orderType.inserted_at')
        }, {
          value: 'is_hot',
          title: this.$t('forum.orderType.is_hot')
        }, {
          value: 'is_vote',
          title: this.$t('forum.orderType.is_vote')
        }],
        selectedValue: this.postsOrderByField,
        onOk: function onOk(selectedItem) {
          if (selectedItem.value != _this2.postsOrderByField) {
            _this2.setPostsOrderByField(selectedItem.value);
            _this2.resetScroller();
          }
        }
      });
    },


    resetScroller: function resetScroller() {
      this.page = 0;
      this.total = 1;
      this.postList = [];
      if (this.$refs.scroller) {
        this.$refs.scroller.$emit('reset');
      }
    },

    refresh: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.page = 0;
                this.total = 1;
                _context.next = 4;
                return this.loadmore();

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function refresh() {
        return _ref.apply(this, arguments);
      }

      return refresh;
    }(),

    loadmore: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.loading = true;

                // cancel last get paged post if we're requesting 
                this.$acs.cancelGetPagedPost();

                _context2.next = 4;
                return this.$acs.getPagedPost({
                  page: this.page + 1,
                  records_per_page: this.recordsPerPage,
                  order: this.postsOrderByField,
                  section_id: this.currentSectionId,
                  forum_id: this.$router.currentRoute.params.forumId
                });

              case 4:
                result = _context2.sent;


                if (result.success) {
                  this.postList = this.page == 0 ? result.posts || [] : this.postList.concat(result.posts);
                  this.total = result.total;
                  this.page = this.page + 1;

                  if (this.$refs.scroller && this.page >= this.total) {
                    this.$refs.scroller.$emit('all-loaded');
                  }
                } else {
                  // canceled or network error
                  this.$refs.scroller.$emit('all-loaded');
                }

                this.loading = false;

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadmore() {
        return _ref2.apply(this, arguments);
      }

      return loadmore;
    }()

  })
});

/***/ }),

/***/ 1913:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1911),
  /* template */
  __webpack_require__(1916),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/views/mobile/forum.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] forum.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ebabdef4", Component.options)
  } else {
    hotAPI.reload("data-v-ebabdef4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1914:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(1912),
  /* template */
  __webpack_require__(1915),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/forum/views/mobile/postList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] postList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c594eee", Component.options)
  } else {
    hotAPI.reload("data-v-6c594eee", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1915:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "flex-fixed-size has-bottom-line"
  }, [_c('div', {
    staticClass: "tab-bar"
  }, [_c('span', {
    staticClass: "icon image-icon icon-pull-down",
    on: {
      "click": _vm.selectOrderByField
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "seperator"
  }), _vm._v(" "), _c('div', {
    staticClass: "tile"
  }, [_c('v-touch', {
    staticClass: "button",
    class: _vm.currentSectionId == 0 ? 'is-primary' : 'is-grey',
    attrs: {
      "tag": "a"
    },
    on: {
      "tap": function($event) {
        _vm.setCurrentSectionId(0)
      }
    }
  }, [_vm._v("\n          " + _vm._s(_vm.$t('forum.postList.all')) + "\n        ")]), _vm._v(" "), _vm._l((_vm.forumInfo.sections), function(section) {
    return _c('v-touch', {
      key: section.id,
      staticClass: "button",
      class: _vm.currentSectionId == section.id ? 'is-primary' : 'is-grey',
      attrs: {
        "tag": "a"
      },
      on: {
        "tap": function($event) {
          _vm.setCurrentSectionId(section.id)
        }
      }
    }, [_vm._v("\n          " + _vm._s(section.title) + "\n        ")])
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "flex-take-rest",
    staticStyle: {
      "position": "relative"
    }
  }, [_c('scroller', {
    ref: "scroller",
    attrs: {
      "on-refresh": _vm.refresh,
      "on-load-more": _vm.loadmore
    }
  }, _vm._l((_vm.postList), function(item) {
    return _c('post-list-item', {
      key: item.id,
      staticClass: "row",
      attrs: {
        "post-info": item
      }
    })
  }))], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6c594eee", module.exports)
  }
}

/***/ }),

/***/ 1916:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor is-vertical root-container"
  }, [_c('div', {
    staticClass: "columns is-multiline"
  }, _vm._l((_vm.forumList), function(forum) {
    return _c('article', {
      staticClass: "tile is-child notification",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.showForum(forum.id)
        }
      }
    }, [_c('div', {
      staticClass: "tile is-parent"
    }, [_c('div', {
      staticClass: "tile is-vertical is-child"
    }, [_c('img', {
      attrs: {
        "src": forum.icon ? forum.icon : 'https://placehold.it/64x64?text=128x128'
      }
    }), _vm._v(" "), _c('h2', {
      staticStyle: {
        "font-weight": "bold"
      }
    }, [_vm._v(" " + _vm._s(forum.title) + " ")])])])])
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ebabdef4", module.exports)
  }
}

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

/***/ 35:
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

/***/ 399:
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

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LINE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CIRCLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PATH; });
var LINE = 'line';
var CIRCLE = 'circle';
var PATH = 'path';

/***/ }),

/***/ 401:
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

/***/ 402:
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

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = assign;
/* harmony export (immutable) */ __webpack_exports__["d"] = createProp;
/* harmony export (immutable) */ __webpack_exports__["g"] = capitalize;
/* unused harmony export directions */
/* harmony export (immutable) */ __webpack_exports__["h"] = guardDirections;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return config; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return customEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return gestures; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return gestureMap; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hammerjs__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hammerjs__);
 // used by guardDirections

/**
 * Tiny Object.assign replacement
 * @param  {Object} target  Any type of object
 * @param  {Object} sources Any type of object
 * @return {Object}         Merged Object
 */
function assign(target) {
  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  for (var i = 0; i < sources.length; i++) {
    var source = sources[i];
    var keys = Object.keys(source);
    for (var _i = 0; _i < keys.length; _i++) {
      var key = keys[_i];
      target[key] = source[key];
    }
  }
  return target;
}

/**
 * Small helper method to generate prop options for all the
 * *-options props.
 * @return {[type]} [description]
 */
function createProp() {
  return {
    type: Object,
    default: function _default() {
      return {};
    }
  };
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Directions that VueTouch understands.
 * Will be tanslated to Hammer-style directions by guardDirections()
 * @type {Array}
 */
var directions = ['up', 'down', 'left', 'right', 'horizontal', 'vertical', 'all'];

/**
 * Translates VueTouch direction names into Hammer Direction numbers.
 * @param  {Objects} options Hammer Options
 * @return {Object}         [Hammer Options]
 */
function guardDirections(options) {
  var dir = options.direction;
  if (typeof dir === 'string') {
    var hammerDirection = 'DIRECTION_' + dir.toUpperCase();
    if (directions.indexOf(dir) > -1 && __WEBPACK_IMPORTED_MODULE_0_hammerjs___default.a.hasOwnProperty(hammerDirection)) {
      options.direction = __WEBPACK_IMPORTED_MODULE_0_hammerjs___default.a[hammerDirection];
    } else {
      console.warn('[vue-touch] invalid direction: ' + dir);
    }
  }
  return options;
}

/**
 * This pobject will contain global options for recognizers
 * see index.js -> vueTouch.config
 * @type {Object}
 */
var config = {};

/**
 * This object will contain recognizer options for custom events.
 * see index.js -> registerCustomEvent
 * @type {Object}
 */
var customEvents = {};

/**
 * Names of all the builtin gestures of Hammer
 * @type {Array}
 */
var gestures = ['pan', 'panstart', 'panmove', 'panend', 'pancancel', 'panleft', 'panright', 'panup', 'pandown', 'pinch', 'pinchstart', 'pinchmove', 'pinchend', 'pinchcancel', 'pinchin', 'pinchout', 'press', 'pressup', 'rotate', 'rotatestart', 'rotatemove', 'rotateend', 'rotatecancel', 'swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown', 'tap'];

/**
 * Maps the gestures to their "main gesture" (the name of the recognizer)
 * @type {Object}
 */
var gestureMap = {
  pan: 'pan',
  panstart: 'pan',
  panmove: 'pan',
  panend: 'pan',
  pancancel: 'pan',
  panleft: 'pan',
  panright: 'pan',
  panup: 'pan',
  pandown: 'pan',
  pinch: 'pinch',
  pinchstart: 'pinch',
  pinchmove: 'pinch',
  pinchend: 'pinch',
  pinchcancel: 'pinch',
  pinchin: 'pinch',
  pinchout: 'pinch',
  press: 'press',
  pressup: 'press',
  rotate: 'rotate',
  rotatestart: 'rotate',
  rotatemove: 'rotate',
  rotateend: 'rotate',
  rotatecancel: 'rotate',
  swipe: 'swipe',
  swipeleft: 'swipe',
  swiperight: 'swipe',
  swipeup: 'swipe',
  swipedown: 'swipe',
  tap: 'tap'
};

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  ok: '確認',
  cancel: '取消',
  add: '添加',
  delete: '刪除',
  close: '關閉',
  save: '保存',
  update: '修改',
  return: '返回',

  bind: '綁定',
  camera: '拍照',
  photoLib: '從照片庫選取',
  upload: '上傳',
  noMoreData: '沒有更多數據啦',
  confirmDelete: '是否確認刪除'
});

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  filename: '文件名',
  filesize: '文件大小',
  progress: '上傳進度',
  speed: '上傳速率',
  title: '上傳',
  hint: '點擊, 或拖動圖片至此處',
  fileIsTooLarge: '文件太大了，圖片文件不能超過{maxFileSize}',
  invalidFileType: '錯誤的文件類型: {fileType}',
  imgShouldBeSquare: '圖片必須為正方形',
  imgWidthShouldGreaterThan: '圖片的寬度不得小於{minWidth}',
  uploadImage: '上傳圖片'
});

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return SET_TRANSITION_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SET_CURRENT_SECTION_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SET_CURRENT_POST_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SET_POSTS_ORDER_BY_FIELD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return RESET_POST_EDITING_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return ADD_SEARCH_HISTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SET_USER_PROFILE; });
/* unused harmony export ADD_SEARCH_HISTORY_KEYWORD */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return CLEAR_SEARCH_HISTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return UPDATE_FORUM_INFO; });
/* unused harmony export UPDATE_KEYWORD */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return SET_COMMON_ISSUES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return UPDATE_USER_POST_COUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return UPDATE_USER_MOBILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return UPDATE_USER_EMAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return UPDATE_USER_NICKNAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return UPDATE_USER_AVATAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return UPDATE_USER_RESIDENT_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return DECR_USER_POST_COUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return UPDATE_MALL_SHOPPINGCART; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return UPDATE_SELECTED_ADDRESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return UPDATE_SELECTED_GOODS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return UPDATE_SELECTED_ORDER; });
var SET_TRANSITION_NAME = 'SET_TRANSITION_NAME';
var SET_CURRENT_SECTION_ID = 'SET_CURRENT_SECTION_ID';
var SET_CURRENT_POST_TITLE = 'SET_CURRENT_POST_TITLE';
var SET_POSTS_ORDER_BY_FIELD = 'SET_POSTS_ORDER_BY_FIELD';
var RESET_POST_EDITING_DATA = 'RESET_POST_EDITING_DATA';
var ADD_SEARCH_HISTORY = 'ADD_SEARCH_HISTORY';
var SET_USER_PROFILE = 'SET_USER_PROFILE';
var ADD_SEARCH_HISTORY_KEYWORD = 'ADD_SEARCH_HISTORY_KEYWORD';
var CLEAR_SEARCH_HISTORY = 'CLEAR_SEARCH_HISTORY';
var UPDATE_FORUM_INFO = 'UPDATE_FORUM_INFO';
var UPDATE_KEYWORD = 'UPDATE_KEYWORD';
var SET_COMMON_ISSUES = 'SET_COMMON_ISSUES';
var UPDATE_USER_POST_COUNT = 'UPDATE_USER_POST_COUNT';
var UPDATE_USER_MOBILE = 'UPDATE_USER_MOBILE';
var UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';
var UPDATE_USER_NICKNAME = 'UPDATE_USER_NICKNAME';
var UPDATE_USER_AVATAR = 'UPDATE_USER_AVATAR';
var UPDATE_USER_RESIDENT_INFO = 'UPDATE_USER_RESIDENT_INFO';
var DECR_USER_POST_COUNT = 'DECR_USER_POST_COUNT';
var UPDATE_MALL_SHOPPINGCART = 'UPDATE_MALL_SHOPPINGCART';
var UPDATE_SELECTED_ADDRESS = 'UPDATE_SELECTED_ADDRESS';
var UPDATE_SELECTED_GOODS = 'UPDATE_SELECTED_GOODS';
var UPDATE_SELECTED_ORDER = 'UPDATE_SELECTED_ORDER';

/***/ }),

/***/ 407:
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

/***/ 408:
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

/***/ 409:
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

/***/ 410:
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

/***/ 411:
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

/***/ 420:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 421:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 422:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 436:
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

/***/ 437:
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

/***/ 438:
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

/***/ 439:
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

/***/ 440:
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

/***/ 444:
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

/***/ 445:
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

/***/ 448:
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

/***/ 450:
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

/***/ 451:
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

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var Dialog = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(542));

/* harmony default export */ __webpack_exports__["a"] = ({
  show: function show(propsData) {
    var instance = new Dialog({
      el: document.createElement('div'),
      propsData: propsData
    });
  }
});

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return init; });
/* unused harmony export hasKeyword */
/* unused harmony export replaceKeyword */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hashmap__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hashmap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hashmap__);


var filterMap = new __WEBPACK_IMPORTED_MODULE_0_hashmap___default.a();
var endTag = '\0'; // 敏感词结束符

var init = function init(data) {
    var filterWordList = data.split(/,/);
    for (var i = 0; i < filterWordList.length; i++) {
        var charArray = filterWordList[i].split('');
        var len = charArray.length;
        if (len > 0) {
            var subMap = filterMap;
            for (var k = 0; k < len - 1; k++) {
                var obj = subMap.get(charArray[k]);
                if (obj == null) {
                    var subMapTmp = new __WEBPACK_IMPORTED_MODULE_0_hashmap___default.a();
                    subMap.set(charArray[k], subMapTmp);
                    subMap = subMapTmp;
                } else {
                    subMap = obj;
                }
            }

            var obj = subMap.get(charArray[len - 1]);
            if (obj == null) {
                var subMapTmp = new __WEBPACK_IMPORTED_MODULE_0_hashmap___default.a();
                subMapTmp.set(endTag, null);
                subMap.set(charArray[len - 1], subMapTmp);
            } else {
                obj.set(endTag, null);
            }
        }
    }
};

var hasKeyword = function hasKeyword(text) {
    if (text == null || text == undefined) return false;
    var charArray = text.split('');
    var len = charArray.length;
    for (var i = 0; i < len; i++) {
        var index = i;
        var sub = filterMap.get(charArray[index]);
        while (sub != null) {
            if (sub.has(endTag)) {
                return true;
            } else {
                index++;
                if (index >= len) {
                    return false;
                }
                sub = sub.get(charArray[index]);
            }
        }
    }
    return false;
};

var replaceKeyword = function replaceKeyword(text, replaceWord) {
    if (text == null || text == undefined || replaceWord == null || replaceWord.length == 0) return text;
    var charArray = text.split('');
    var len = charArray.length;
    var newText = '';
    var i = 0;
    while (i < len) {
        var end = -1;
        var index;
        var sub = filterMap;
        for (var index = i; index < len; index++) {
            sub = sub.get(charArray[index]);
            if (sub == null) {
                if (end == -1) {
                    newText += charArray[i];
                    i++;
                    break;
                } else {
                    for (var j = i; j <= end; j++) {
                        newText += replaceWord;
                    }
                    i = end + 1;
                    break;
                }
            } else {
                if (sub.has(endTag)) {
                    end = index;
                }
            }
        }
        if (index >= len) {
            if (end == -1) {
                newText += charArray[i];
                i++;
            } else {
                for (var j = i; j <= end; j++) {
                    newText += replaceWord;
                }
                i = end + 1;
            }
        }
    }
    return newText;
};

/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quillContent__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quillContent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__quillContent__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


/* harmony default export */ __webpack_exports__["a"] = (_extends({}, __WEBPACK_IMPORTED_MODULE_0__quillContent___default.a));

/***/ }),

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utils__);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();




var objCompsToArr = function objCompsToArr(objComponents) {
  var components = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.entries(objComponents)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["isObject"])(value) && components.push(Object.assign(value, { name: key }));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return components;
};

var invalidMsg = function invalidMsg(msg) {
  return __WEBPACK_IMPORTED_MODULE_0_vue__["util"].warn('invalid ' + msg + ' will be ignored!');
};
var nonMsg = function nonMsg(msg) {
  return __WEBPACK_IMPORTED_MODULE_0_vue__["util"].warn('no ' + msg + ' found thus it will be ignored!');
};

var buildComponent = function buildComponent(comps, notFirst) {
  if (!comps) return;

  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["isObject"])(comps)) {
    comps = objCompsToArr(comps);
  } else if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["isArray"])(comps)) return invalidMsg('components');
  if (!comps.length) return nonMsg('components');

  var wrapTemp = '';
  var wrapComp = {};
  var count = 0;

  comps.forEach(function (_ref, index) {
    var _ref$name = _ref.name,
        name = _ref$name === undefined ? '_' + index : _ref$name,
        template = _ref.template,
        data = _ref.data,
        methods = _ref.methods,
        components = _ref.components;

    if (!template) return nonMsg('template');

    wrapTemp += '<' + name + '/>';
    var component = wrapComp[name] = { template: template };

    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["isObject"])(methods)) {
      var wrapMethods = {};
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.entries(methods)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              methodName = _step2$value[0],
              method = _step2$value[1];

          wrapMethods[methodName] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["isFunction"])(method) ? method : Function[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["isArray"])(method) ? 'apply' : 'call'](null, method);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      component.methods = wrapMethods;
    } else if (methods) return invalidMsg('methods');
    if (data) component.data = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["isFunction"])(data) ? data : function () {
      return data;
    };
    if (components) component.components = buildComponent(components, true);

    count++;
  });

  if (!count) return;

  return notFirst ? wrapComp : {
    name: 'Dynamic--Root',
    template: count === 1 ? wrapTemp : '<div>' + wrapTemp + '</div>',
    components: wrapComp
  };
};

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'vue-dynamic',
  template: '<comment :is="view"/>',
  props: {
    comps: {
      validator: function validator(value) {
        return !value || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["isArray"])(value) || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["isObject"])(value);
      }
    },
    emptyView: {
      required: true,
      validator: function validator(value) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["isObject"])(value);
      }
    }
  },
  data: function data() {
    return {
      view: this.emptyView
    };
  },
  created: function created() {
    this.reBuild();
  },

  watch: {
    comps: function comps() {
      this.reBuild();
    }
  },
  methods: {
    reBuild: function reBuild() {
      var component = buildComponent(this.comps);
      this.view = component || this.emptyView;
    }
  }
});

/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dynamic__ = __webpack_require__(478);


var installed = false;

var VueDynamic = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (installed) return;
    installed = true;
    Vue.component(options.name || 'Dynamic', __WEBPACK_IMPORTED_MODULE_0__dynamic__["a" /* default */]);
  }
};

window.Vue && window.Vue.use(VueDynamic);

/* harmony default export */ __webpack_exports__["a"] = (VueDynamic);

/***/ }),

/***/ 480:
/***/ (function(module, exports) {

/**
 * 获取输入值的真实类型
 *
 * @param value       需要判断的值
 * @returns {string}  类型字符串
 */
var trueType = function trueType(value) {
  return [].slice.call({}.toString.call(value), 8, -1).join('');
};

var trueTypeFunc = function trueTypeFunc(type) {
  return function (value) {
    return type === trueType(value);
  };
};

/**
 * 一些类型判断方法, 例: utils.isArray(1)
 */
['Array', 'Function', 'Object'].forEach(function (type) {
  return module.exports['is' + type] = trueTypeFunc(type);
});

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hammerjs__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(403);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };





/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    options: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* createProp */])(),
    tapOptions: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* createProp */])(),
    panOptions: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* createProp */])(),
    pinchOptions: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* createProp */])(),
    pressOptions: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* createProp */])(),
    rotateOptions: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* createProp */])(),
    swipeOptions: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* createProp */])(),
    tag: { type: String, default: 'div' },
    enabled: {
      default: true,
      type: [Boolean, Object]

    }
  },

  mounted: function mounted() {
    if (!this.$isServer) {
      this.hammer = new __WEBPACK_IMPORTED_MODULE_0_hammerjs___default.a.Manager(this.$el, this.options);
      this.recognizers = {}; // not reactive
      this.setupBuiltinRecognizers();
      this.setupCustomRecognizers();
      this.updateEnabled(this.enabled);
    }
  },
  destroyed: function destroyed() {
    if (!this.$isServer) {
      this.hammer.destroy();
    }
  },


  watch: {
    enabled: {
      deep: true,
      handler: function handler() {
        this.updateEnabled.apply(this, arguments);
      }
    }
  },

  methods: {
    setupBuiltinRecognizers: function setupBuiltinRecognizers() {
      // Built-in Hammer events
      // We check weither any event callbacks are registered
      // for the gesture, and if so, add a Recognizer
      for (var i = 0; i < __WEBPACK_IMPORTED_MODULE_1__utils__["e" /* gestures */].length; i++) {
        var gesture = __WEBPACK_IMPORTED_MODULE_1__utils__["e" /* gestures */][i];
        if (this._events[gesture]) {
          // get the main gesture (e.g. 'panstart' -> 'pan')
          var mainGesture = __WEBPACK_IMPORTED_MODULE_1__utils__["f" /* gestureMap */][gesture];
          //merge global and local options
          var options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* assign */])({}, __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* config */][mainGesture] || {}, this[mainGesture + 'Options']);
          // add recognizer for this main gesture
          this.addRecognizer(mainGesture, options);
          // register Event Emit for the specific gesture
          this.addEvent(gesture);
        }
      }
    },
    setupCustomRecognizers: function setupCustomRecognizers() {
      // Custom events
      // We get the customGestures and options from the
      // customEvents object, then basically do the same check
      // as we did for the built-in events.
      var gestures = Object.keys(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* customEvents */]);

      for (var i = 0; i < gestures.length; i++) {

        var gesture = gestures[i];

        if (this._events[gesture]) {
          var opts = __WEBPACK_IMPORTED_MODULE_1__utils__["b" /* customEvents */][gesture];
          var localCustomOpts = this[gesture + 'Options'] || {};
          var options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* assign */])({}, opts, localCustomOpts);
          this.addRecognizer(gesture, options, { mainGesture: options.type });
          this.addEvent(gesture);
        }
      }
    },


    /**
     * Registers a new Recognizer with the manager and saves it on the component
     * instance
     * @param {String} gesture     See utils.js -> gestures
     * @param {Object} options     Hammer options
     * @param {String} mainGesture if gesture is a custom event name, mapping to utils.js -> gestures
     */
    addRecognizer: function addRecognizer(gesture, options) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          mainGesture = _ref.mainGesture;

      // create recognizer, e.g. new Hammer['Swipe'](options)
      if (!this.recognizers[gesture]) {
        var recognizer = new __WEBPACK_IMPORTED_MODULE_0_hammerjs___default.a[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["g" /* capitalize */])(mainGesture || gesture)](__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["h" /* guardDirections */])(options));
        this.recognizers[gesture] = recognizer;
        this.hammer.add(recognizer);
        recognizer.recognizeWith(this.hammer.recognizers);
      }
    },

    addEvent: function addEvent(gesture) {
      var _this = this;

      this.hammer.on(gesture, function (e) {
        return _this.$emit(gesture, e);
      });
    },


    // Enabling / Disabling certain recognizers.

    /**
     * Called when the `enabled` prop changes, and during mounted()
     * It enables/disables values according to the value of the `emabled` prop
     * @param  {Boolean|Object} newVal If an object: { recognizer: true|false }
     * @param  {Boolean|Object} oldVal The previous value
     * @return {undefined}
     */
    updateEnabled: function updateEnabled(newVal, oldVal) {
      if (newVal === true) {
        this.enableAll();
      } else if (newVal === false) {
        this.disableAll();
      } else if ((typeof newVal === 'undefined' ? 'undefined' : _typeof(newVal)) === 'object') {
        var keys = Object.keys(newVal);

        for (var i = 0; i < keys.length; i++) {
          var event = keys[i];

          if (this.recognizers[event]) {
            newVal[event] ? this.enable(event) : this.disable(event);
          }
        }
      }
    },

    enable: function enable(r) {
      var recognizer = this.recognizers[r];
      if (!recognizer.options.enable) {
        recognizer.set({ enable: true });
      }
    },
    disable: function disable(r) {
      var recognizer = this.recognizers[r];
      if (recognizer.options.enable) {
        recognizer.set({ enable: false });
      }
    },
    toggle: function toggle(r) {
      var recognizer = this.recognizers[r];
      if (recognizer) {
        recognizer.options.enable ? this.disable(r) : this.enable(r);
      }
    },
    enableAll: function enableAll(r) {
      this.toggleAll({ enable: true });
    },
    disableAll: function disableAll(r) {
      this.toggleAll({ enable: false });
    },
    toggleAll: function toggleAll(_ref2) {
      var enable = _ref2.enable;

      var keys = Object.keys(this.recognizers);
      for (var i = 0; i < keys.length; i++) {
        var r = this.recognizers[keys[i]];
        if (r.options.enable !== enable) {
          r.set({ enable: enable });
        }
      }
    },
    isEnabled: function isEnabled(r) {
      return this.recognizers[r] && this.recognizers[r].options.enable;
    }
  },

  render: function render(h) {
    return h(this.tag, {}, this.$slots.default);
  }
});

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(403);



var installed = false;

var vueTouch = { config: __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* config */], customEvents: __WEBPACK_IMPORTED_MODULE_1__utils__["b" /* customEvents */] };

// Plugin API
// *********
vueTouch.install = function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var name = opts.name || 'v-touch';
  Vue.component(name, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* assign */])(__WEBPACK_IMPORTED_MODULE_0__component__["a" /* default */], { name: name }));
  installed = true;
}.bind(vueTouch);

vueTouch.registerCustomEvent = function registerCustomEvent(event) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (installed) {
    console.warn('\n      [vue-touch]: Custom Event \'' + event + '\' couldn\'t be added to vue-touch.\n      Custom Events have to be registered before installing the plugin.\n      ');
    return;
  }
  options.event = event;
  __WEBPACK_IMPORTED_MODULE_1__utils__["b" /* customEvents */][event] = options;
  __WEBPACK_IMPORTED_MODULE_0__component__["a" /* default */].props[event + 'Options'] = {
    type: Object,
    default: function _default() {
      return {};
    }
  };
}.bind(vueTouch);

vueTouch.component = __WEBPACK_IMPORTED_MODULE_0__component__["a" /* default */];

// Utilities
// ********

/* harmony default export */ __webpack_exports__["a"] = (vueTouch);

/***/ }),

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! iScroll v5.2.0 ~ (c) 2008-2016 Matteo Spinelli ~ http://cubiq.org/license */
(function (window, document, Math) {
  var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

  var utils = function () {
    var me = {};

    var _elementStyle = document.createElement('div').style;
    var _vendor = function () {
      var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
          transform,
          i = 0,
          l = vendors.length;

      for (; i < l; i++) {
        transform = vendors[i] + 'ransform';
        if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
      }

      return false;
    }();

    function _prefixStyle(style) {
      if (_vendor === false) return false;
      if (_vendor === '') return style;
      return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
    }

    me.getTime = Date.now || function getTime() {
      return new Date().getTime();
    };

    me.extend = function (target, obj) {
      for (var i in obj) {
        target[i] = obj[i];
      }
    };

    me.addEvent = function (el, type, fn, capture) {
      el.addEventListener(type, fn, !!capture);
    };

    me.removeEvent = function (el, type, fn, capture) {
      el.removeEventListener(type, fn, !!capture);
    };

    me.prefixPointerEvent = function (pointerEvent) {
      return window.MSPointerEvent ? 'MSPointer' + pointerEvent.charAt(7).toUpperCase() + pointerEvent.substr(8) : pointerEvent;
    };

    me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
      var distance = current - start,
          speed = Math.abs(distance) / time,
          destination,
          duration;

      deceleration = deceleration === undefined ? 0.0006 : deceleration;

      destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1);
      duration = speed / deceleration;

      if (destination < lowerMargin) {
        destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin;
        distance = Math.abs(destination - current);
        duration = distance / speed;
      } else if (destination > 0) {
        destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
        distance = Math.abs(current) + destination;
        duration = distance / speed;
      }

      return {
        destination: Math.round(destination),
        duration: duration
      };
    };

    var _transform = _prefixStyle('transform');

    me.extend(me, {
      hasTransform: _transform !== false,
      hasPerspective: _prefixStyle('perspective') in _elementStyle,
      hasTouch: 'ontouchstart' in window,
      hasPointer: !!(window.PointerEvent || window.MSPointerEvent), // IE10 is prefixed
      hasTransition: _prefixStyle('transition') in _elementStyle
    });

    /*
    This should find all Android browsers lower than build 535.19 (both stock browser and webview)
    - galaxy S2 is ok
    - 2.3.6 : `AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
    - 4.0.4 : `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
    - galaxy S3 is badAndroid (stock brower, webview)
     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
    - galaxy S4 is badAndroid (stock brower, webview)
     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
    - galaxy S5 is OK
     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
    - galaxy S6 is OK
     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
    */
    me.isBadAndroid = function () {
      var appVersion = window.navigator.appVersion;
      // Android browser is not a chrome browser.
      if (/Android/.test(appVersion) && !/Chrome\/\d/.test(appVersion)) {
        var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
        if (safariVersion && (typeof safariVersion === 'undefined' ? 'undefined' : _typeof(safariVersion)) === "object" && safariVersion.length >= 2) {
          return parseFloat(safariVersion[1]) < 535.19;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }();

    me.extend(me.style = {}, {
      transform: _transform,
      transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
      transitionDuration: _prefixStyle('transitionDuration'),
      transitionDelay: _prefixStyle('transitionDelay'),
      transformOrigin: _prefixStyle('transformOrigin')
    });

    me.hasClass = function (e, c) {
      var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
      return re.test(e.className);
    };

    me.addClass = function (e, c) {
      if (me.hasClass(e, c)) {
        return;
      }

      var newclass = e.className.split(' ');
      newclass.push(c);
      e.className = newclass.join(' ');
    };

    me.removeClass = function (e, c) {
      if (!me.hasClass(e, c)) {
        return;
      }

      var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
      e.className = e.className.replace(re, ' ');
    };

    me.offset = function (el) {
      var left = -el.offsetLeft,
          top = -el.offsetTop;

      // jshint -W084
      while (el = el.offsetParent) {
        left -= el.offsetLeft;
        top -= el.offsetTop;
      }
      // jshint +W084

      return {
        left: left,
        top: top
      };
    };

    me.preventDefaultException = function (el, exceptions) {
      for (var i in exceptions) {
        if (exceptions[i].test(el[i])) {
          return true;
        }
      }

      return false;
    };

    me.extend(me.eventType = {}, {
      touchstart: 1,
      touchmove: 1,
      touchend: 1,

      mousedown: 2,
      mousemove: 2,
      mouseup: 2,

      pointerdown: 3,
      pointermove: 3,
      pointerup: 3,

      MSPointerDown: 3,
      MSPointerMove: 3,
      MSPointerUp: 3
    });

    me.extend(me.ease = {}, {
      quadratic: {
        style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fn: function fn(k) {
          return k * (2 - k);
        }
      },
      circular: {
        style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
        fn: function fn(k) {
          return Math.sqrt(1 - --k * k);
        }
      },
      back: {
        style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        fn: function fn(k) {
          var b = 4;
          return (k = k - 1) * k * ((b + 1) * k + b) + 1;
        }
      },
      bounce: {
        style: '',
        fn: function fn(k) {
          if ((k /= 1) < 1 / 2.75) {
            return 7.5625 * k * k;
          } else if (k < 2 / 2.75) {
            return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
          } else if (k < 2.5 / 2.75) {
            return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
          } else {
            return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
          }
        }
      },
      elastic: {
        style: '',
        fn: function fn(k) {
          var f = 0.22,
              e = 0.4;

          if (k === 0) {
            return 0;
          }
          if (k == 1) {
            return 1;
          }

          return e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1;
        }
      }
    });

    me.tap = function (e, eventName) {
      var ev = document.createEvent('Event');
      ev.initEvent(eventName, true, true);
      ev.pageX = e.pageX;
      ev.pageY = e.pageY;
      e.target.dispatchEvent(ev);
    };

    me.click = function (e) {
      var target = e.target,
          ev;

      if (!/(SELECT|INPUT|TEXTAREA)/i.test(target.tagName)) {
        ev = document.createEvent('MouseEvents');
        ev.initMouseEvent('click', true, true, e.view, 1, target.screenX, target.screenY, target.clientX, target.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);

        ev._constructed = true;
        target.dispatchEvent(ev);
      }
    };

    return me;
  }();

  function IScroll(el, options) {
    this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
    this.scroller = this.wrapper.children[0];
    this.scrollerStyle = this.scroller.style; // cache style for better performance

    this.options = {

      mouseWheelSpeed: 20,

      snapThreshold: 0.334,

      infiniteUseTransform: true,
      deceleration: 0.004,

      // INSERT POINT: OPTIONS
      disablePointer: !utils.hasPointer,
      disableTouch: utils.hasPointer || !utils.hasTouch,
      disableMouse: utils.hasPointer || utils.hasTouch,
      startX: 0,
      startY: 0,
      scrollY: true,
      directionLockThreshold: 5,
      momentum: true,

      bounce: true,
      bounceTime: 600,
      bounceEasing: '',

      preventDefault: true,
      preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

      HWCompositing: true,
      useTransition: true,
      useTransform: true,
      bindToWrapper: typeof window.onmousedown === "undefined"
    };

    for (var i in options) {
      this.options[i] = options[i];
    }

    // Normalize options
    this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

    this.options.useTransition = utils.hasTransition && this.options.useTransition;
    this.options.useTransform = utils.hasTransform && this.options.useTransform;

    this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
    this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

    // If you want eventPassthrough I have to lock one of the axes
    this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
    this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

    // With eventPassthrough we also need lockDirection mechanism
    this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
    this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

    this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

    this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

    if (this.options.tap === true) {
      this.options.tap = 'tap';
    }

    this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

    if (this.options.infiniteElements) {
      this.options.probeType = 3;
    }
    this.options.infiniteUseTransform = this.options.infiniteUseTransform && this.options.useTransform;

    if (this.options.probeType == 3) {
      this.options.useTransition = false;
    }

    // INSERT POINT: NORMALIZATION

    // Some defaults
    this.x = 0;
    this.y = 0;
    this.directionX = 0;
    this.directionY = 0;
    this._events = {};

    // INSERT POINT: DEFAULTS

    this._init();
    this.refresh();

    this.scrollTo(this.options.startX, this.options.startY);
    this.enable();
  }

  IScroll.prototype = {
    version: '5.2.0',

    _init: function _init() {
      this._initEvents();

      if (this.options.mouseWheel) {
        this._initWheel();
      }

      if (this.options.snap) {
        this._initSnap();
      }

      if (this.options.keyBindings) {
        this._initKeys();
      }

      if (this.options.infiniteElements) {
        this._initInfinite();
      }

      // INSERT POINT: _init
    },

    destroy: function destroy() {
      this._initEvents(true);
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
      this._execEvent('destroy');
    },

    _transitionEnd: function _transitionEnd(e) {
      if (e.target != this.scroller || !this.isInTransition) {
        return;
      }

      this._transitionTime();
      if (!this.resetPosition(this.options.bounceTime)) {
        this.isInTransition = false;
        this._execEvent('scrollEnd');
      }
    },

    _start: function _start(e) {
      // React to left mouse button only
      if (utils.eventType[e.type] != 1) {
        // for button property
        // http://unixpapa.com/js/mouse.html
        var button;
        if (!e.which) {
          /* IE case */
          button = e.button < 2 ? 0 : e.button == 4 ? 1 : 2;
        } else {
          /* All others */
          button = e.button;
        }
        if (button !== 0) {
          return;
        }
      }

      if (!this.enabled || this.initiated && utils.eventType[e.type] !== this.initiated) {
        return;
      }

      if (this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
        e.preventDefault();
      }

      var point = e.touches ? e.touches[0] : e,
          pos;

      this.initiated = utils.eventType[e.type];
      this.moved = false;
      this.distX = 0;
      this.distY = 0;
      this.directionX = 0;
      this.directionY = 0;
      this.directionLocked = 0;

      this.startTime = utils.getTime();

      if (this.options.useTransition && this.isInTransition) {
        this._transitionTime();
        this.isInTransition = false;
        pos = this.getComputedPosition();
        this._translate(Math.round(pos.x), Math.round(pos.y));
        this._execEvent('scrollEnd');
      } else if (!this.options.useTransition && this.isAnimating) {
        this.isAnimating = false;
        this._execEvent('scrollEnd');
      }

      this.startX = this.x;
      this.startY = this.y;
      this.absStartX = this.x;
      this.absStartY = this.y;
      this.pointX = point.pageX;
      this.pointY = point.pageY;

      this._execEvent('beforeScrollStart');
    },

    _move: function _move(e) {
      if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
        return;
      }

      if (this.options.preventDefault) {
        // increases performance on Android? TODO: check!
        e.preventDefault();
      }

      var point = e.touches ? e.touches[0] : e,
          deltaX = point.pageX - this.pointX,
          deltaY = point.pageY - this.pointY,
          timestamp = utils.getTime(),
          newX,
          newY,
          absDistX,
          absDistY;

      this.pointX = point.pageX;
      this.pointY = point.pageY;

      this.distX += deltaX;
      this.distY += deltaY;
      absDistX = Math.abs(this.distX);
      absDistY = Math.abs(this.distY);

      // We need to move at least 10 pixels for the scrolling to initiate
      if (timestamp - this.endTime > 300 && absDistX < 10 && absDistY < 10) {
        return;
      }

      // If you are scrolling in one direction lock the other
      if (!this.directionLocked && !this.options.freeScroll) {
        if (absDistX > absDistY + this.options.directionLockThreshold) {
          this.directionLocked = 'h'; // lock horizontally
        } else if (absDistY >= absDistX + this.options.directionLockThreshold) {
          this.directionLocked = 'v'; // lock vertically
        } else {
          this.directionLocked = 'n'; // no lock
        }
      }

      if (this.directionLocked == 'h') {
        if (this.options.eventPassthrough == 'vertical') {
          e.preventDefault();
        } else if (this.options.eventPassthrough == 'horizontal') {
          this.initiated = false;
          return;
        }

        deltaY = 0;
      } else if (this.directionLocked == 'v') {
        if (this.options.eventPassthrough == 'horizontal') {
          e.preventDefault();
        } else if (this.options.eventPassthrough == 'vertical') {
          this.initiated = false;
          return;
        }

        deltaX = 0;
      }

      deltaX = this.hasHorizontalScroll ? deltaX : 0;
      deltaY = this.hasVerticalScroll ? deltaY : 0;

      newX = this.x + deltaX;
      newY = this.y + deltaY;

      // Slow down if outside of the boundaries
      if (newX > 0 || newX < this.maxScrollX) {
        newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
      }
      if (newY > 0 || newY < this.maxScrollY) {
        newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
      }

      this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
      this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

      if (!this.moved) {
        this._execEvent('scrollStart');
      }

      this.moved = true;

      this._translate(newX, newY);

      /* REPLACE START: _move */
      if (timestamp - this.startTime > 300) {
        this.startTime = timestamp;
        this.startX = this.x;
        this.startY = this.y;

        if (this.options.probeType == 1) {
          this._execEvent('scroll');
        }
      }

      if (this.options.probeType > 1) {
        this._execEvent('scroll');
      }
      /* REPLACE END: _move */
    },

    _end: function _end(e) {
      if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
        return;
      }

      if (this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
        e.preventDefault();
      }

      var point = e.changedTouches ? e.changedTouches[0] : e,
          momentumX,
          momentumY,
          duration = utils.getTime() - this.startTime,
          newX = Math.round(this.x),
          newY = Math.round(this.y),
          distanceX = Math.abs(newX - this.startX),
          distanceY = Math.abs(newY - this.startY),
          time = 0,
          easing = '';

      this.isInTransition = 0;
      this.initiated = 0;
      this.endTime = utils.getTime();

      // reset if we are outside of the boundaries
      if (this.resetPosition(this.options.bounceTime)) {
        return;
      }

      this.scrollTo(newX, newY); // ensures that the last position is rounded

      // we scrolled less than 10 pixels
      if (!this.moved) {
        if (this.options.tap) {
          utils.tap(e, this.options.tap);
        }

        if (this.options.click) {
          utils.click(e);
        }

        this._execEvent('scrollCancel');
        return;
      }

      if (this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) {
        this._execEvent('flick');
        return;
      }

      // start momentum animation if needed
      if (this.options.momentum && duration < 300) {
        momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
        momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
        newX = momentumX.destination;
        newY = momentumY.destination;
        time = Math.max(momentumX.duration, momentumY.duration);
        this.isInTransition = 1;
      }

      if (this.options.snap) {
        var snap = this._nearestSnap(newX, newY);
        this.currentPage = snap;
        time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(newX - snap.x), 1000), Math.min(Math.abs(newY - snap.y), 1000)), 300);
        newX = snap.x;
        newY = snap.y;

        this.directionX = 0;
        this.directionY = 0;
        easing = this.options.bounceEasing;
      }

      // INSERT POINT: _end

      if (newX != this.x || newY != this.y) {
        // change easing function when scroller goes out of the boundaries
        if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
          easing = utils.ease.quadratic;
        }

        this.scrollTo(newX, newY, time, easing);
        return;
      }

      this._execEvent('scrollEnd');
    },

    _resize: function _resize() {
      var that = this;

      clearTimeout(this.resizeTimeout);

      this.resizeTimeout = setTimeout(function () {
        that.refresh();
      }, this.options.resizePolling);
    },

    resetPosition: function resetPosition(time) {
      var x = this.x,
          y = this.y;

      time = time || 0;

      if (!this.hasHorizontalScroll || this.x > 0) {
        x = 0;
      } else if (this.x < this.maxScrollX) {
        x = this.maxScrollX;
      }

      if (!this.hasVerticalScroll || this.y > 0) {
        y = this.tempY ? this.tempY : 0;
      } else if (this.y < this.maxScrollY) {
        y = this.maxScrollY;
      }

      if (x == this.x && y == this.y) {
        return false;
      }

      this._execEvent('bounceStart');
      this.scrollTo(x, y, time, this.options.bounceEasing);

      return true;
    },

    disable: function disable() {
      this.enabled = false;
    },

    enable: function enable() {
      this.enabled = true;
    },

    refresh: function refresh() {
      var rf = this.wrapper.offsetHeight; // Force reflow

      this.wrapperWidth = this.wrapper.clientWidth;
      this.wrapperHeight = this.wrapper.clientHeight;

      /* REPLACE START: refresh */
      this.scrollerWidth = this.scroller.offsetWidth;
      this.scrollerHeight = this.scroller.offsetHeight;

      this.maxScrollX = this.wrapperWidth - this.scrollerWidth;

      var limit;
      if (this.options.infiniteElements) {
        this.options.infiniteLimit = this.options.infiniteLimit || Math.floor(2147483645 / this.infiniteElementHeight);
        limit = -this.options.infiniteLimit * this.infiniteElementHeight + this.wrapperHeight;
      }
      this.maxScrollY = limit !== undefined ? limit : this.wrapperHeight - this.scrollerHeight;
      /* REPLACE END: refresh */

      this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
      this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;

      if (!this.hasHorizontalScroll) {
        this.maxScrollX = 0;
        this.scrollerWidth = this.wrapperWidth;
      }

      if (!this.hasVerticalScroll) {
        this.maxScrollY = 0;
        this.scrollerHeight = this.wrapperHeight;
      }

      this.endTime = 0;
      this.directionX = 0;
      this.directionY = 0;

      this.wrapperOffset = utils.offset(this.wrapper);

      this._execEvent('refresh');

      this.resetPosition();

      // INSERT POINT: _refresh
    },

    on: function on(type, fn) {
      if (!this._events[type]) {
        this._events[type] = [];
      }

      this._events[type].push(fn);
    },

    off: function off(type, fn) {
      if (!this._events[type]) {
        return;
      }

      var index = this._events[type].indexOf(fn);

      if (index > -1) {
        this._events[type].splice(index, 1);
      }
    },

    _execEvent: function _execEvent(type) {
      if (!this._events[type]) {
        return;
      }

      var i = 0,
          l = this._events[type].length;

      if (!l) {
        return;
      }

      for (; i < l; i++) {
        this._events[type][i].apply(this, [].slice.call(arguments, 1));
      }
    },

    scrollBy: function scrollBy(x, y, time, easing) {
      x = this.x + x;
      y = this.y + y;
      time = time || 0;

      this.scrollTo(x, y, time, easing);
    },

    scrollTo: function scrollTo(x, y, time, easing) {
      easing = easing || utils.ease.circular;

      this.isInTransition = this.options.useTransition && time > 0;
      var transitionType = this.options.useTransition && easing.style;
      if (!time || transitionType) {
        if (transitionType) {
          this._transitionTimingFunction(easing.style);
          this._transitionTime(time);
        }
        this._translate(x, y);
      } else {
        this._animate(x, y, time, easing.fn);
      }
    },

    scrollToElement: function scrollToElement(el, time, offsetX, offsetY, easing) {
      el = el.nodeType ? el : this.scroller.querySelector(el);

      if (!el) {
        return;
      }

      var pos = utils.offset(el);

      pos.left -= this.wrapperOffset.left;
      pos.top -= this.wrapperOffset.top;

      // if offsetX/Y are true we center the element to the screen
      if (offsetX === true) {
        offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
      }
      if (offsetY === true) {
        offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
      }

      pos.left -= offsetX || 0;
      pos.top -= offsetY || 0;

      pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
      pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;

      time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top)) : time;

      this.scrollTo(pos.left, pos.top, time, easing);
    },

    _transitionTime: function _transitionTime(time) {
      time = time || 0;

      var durationProp = utils.style.transitionDuration;
      this.scrollerStyle[durationProp] = time + 'ms';

      if (!time && utils.isBadAndroid) {
        this.scrollerStyle[durationProp] = '0.0001ms';
        // remove 0.0001ms
        var self = this;
        rAF(function () {
          if (self.scrollerStyle[durationProp] === '0.0001ms') {
            self.scrollerStyle[durationProp] = '0s';
          }
        });
      }

      // INSERT POINT: _transitionTime
    },

    _transitionTimingFunction: function _transitionTimingFunction(easing) {
      this.scrollerStyle[utils.style.transitionTimingFunction] = easing;

      // INSERT POINT: _transitionTimingFunction
    },

    _translate: function _translate(x, y) {
      if (this.options.useTransform) {

        /* REPLACE START: _translate */

        this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

        /* REPLACE END: _translate */
      } else {
        x = Math.round(x);
        y = Math.round(y);
        this.scrollerStyle.left = x + 'px';
        this.scrollerStyle.top = y + 'px';
      }

      this.x = x;
      this.y = y;

      // INSERT POINT: _translate
    },

    _initEvents: function _initEvents(remove) {
      var eventType = remove ? utils.removeEvent : utils.addEvent,
          target = this.options.bindToWrapper ? this.wrapper : window;

      eventType(window, 'orientationchange', this);
      eventType(window, 'resize', this);

      if (this.options.click) {
        eventType(this.wrapper, 'click', this, true);
      }

      if (!this.options.disableMouse) {
        eventType(this.wrapper, 'mousedown', this);
        eventType(target, 'mousemove', this);
        eventType(target, 'mousecancel', this);
        eventType(target, 'mouseup', this);
      }

      if (utils.hasPointer && !this.options.disablePointer) {
        eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
        eventType(target, utils.prefixPointerEvent('pointermove'), this);
        eventType(target, utils.prefixPointerEvent('pointercancel'), this);
        eventType(target, utils.prefixPointerEvent('pointerup'), this);
      }

      if (utils.hasTouch && !this.options.disableTouch) {
        eventType(this.wrapper, 'touchstart', this);
        eventType(target, 'touchmove', this);
        eventType(target, 'touchcancel', this);
        eventType(target, 'touchend', this);
      }

      eventType(this.scroller, 'transitionend', this);
      eventType(this.scroller, 'webkitTransitionEnd', this);
      eventType(this.scroller, 'oTransitionEnd', this);
      eventType(this.scroller, 'MSTransitionEnd', this);
    },

    getComputedPosition: function getComputedPosition() {
      var matrix = window.getComputedStyle(this.scroller, null),
          x,
          y;

      if (this.options.useTransform) {
        matrix = matrix[utils.style.transform].split(')')[0].split(', ');
        x = +(matrix[12] || matrix[4]);
        y = +(matrix[13] || matrix[5]);
      } else {
        x = +matrix.left.replace(/[^-\d.]/g, '');
        y = +matrix.top.replace(/[^-\d.]/g, '');
      }

      return { x: x, y: y };
    },
    _initWheel: function _initWheel() {
      utils.addEvent(this.wrapper, 'wheel', this);
      utils.addEvent(this.wrapper, 'mousewheel', this);
      utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

      this.on('destroy', function () {
        clearTimeout(this.wheelTimeout);
        this.wheelTimeout = null;
        utils.removeEvent(this.wrapper, 'wheel', this);
        utils.removeEvent(this.wrapper, 'mousewheel', this);
        utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
      });
    },

    _wheel: function _wheel(e) {
      if (!this.enabled) {
        return;
      }

      e.preventDefault();

      var wheelDeltaX,
          wheelDeltaY,
          newX,
          newY,
          that = this;

      if (this.wheelTimeout === undefined) {
        that._execEvent('scrollStart');
      }

      // Execute the scrollEnd event after 400ms the wheel stopped scrolling
      clearTimeout(this.wheelTimeout);
      this.wheelTimeout = setTimeout(function () {
        if (!that.options.snap) {
          that._execEvent('scrollEnd');
        }
        that.wheelTimeout = undefined;
      }, 400);

      if ('deltaX' in e) {
        if (e.deltaMode === 1) {
          wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
          wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
        } else {
          wheelDeltaX = -e.deltaX;
          wheelDeltaY = -e.deltaY;
        }
      } else if ('wheelDeltaX' in e) {
        wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
        wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
      } else if ('wheelDelta' in e) {
        wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
      } else if ('detail' in e) {
        wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
      } else {
        return;
      }

      wheelDeltaX *= this.options.invertWheelDirection;
      wheelDeltaY *= this.options.invertWheelDirection;

      if (!this.hasVerticalScroll) {
        wheelDeltaX = wheelDeltaY;
        wheelDeltaY = 0;
      }

      if (this.options.snap) {
        newX = this.currentPage.pageX;
        newY = this.currentPage.pageY;

        if (wheelDeltaX > 0) {
          newX--;
        } else if (wheelDeltaX < 0) {
          newX++;
        }

        if (wheelDeltaY > 0) {
          newY--;
        } else if (wheelDeltaY < 0) {
          newY++;
        }

        this.goToPage(newX, newY);

        return;
      }

      newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
      newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

      this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
      this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;

      if (newX > 0) {
        newX = 0;
      } else if (newX < this.maxScrollX) {
        newX = this.maxScrollX;
      }

      if (newY > 0) {
        newY = 0;
      } else if (newY < this.maxScrollY) {
        newY = this.maxScrollY;
      }

      this.scrollTo(newX, newY, 0);

      if (this.options.probeType > 1) {
        this._execEvent('scroll');
      }

      // INSERT POINT: _wheel
    },

    _initSnap: function _initSnap() {
      this.currentPage = {};

      if (typeof this.options.snap == 'string') {
        this.options.snap = this.scroller.querySelectorAll(this.options.snap);
      }

      this.on('refresh', function () {
        var i = 0,
            l,
            m = 0,
            n,
            cx,
            cy,
            x = 0,
            y,
            stepX = this.options.snapStepX || this.wrapperWidth,
            stepY = this.options.snapStepY || this.wrapperHeight,
            el;

        this.pages = [];

        if (!this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight) {
          return;
        }

        if (this.options.snap === true) {
          cx = Math.round(stepX / 2);
          cy = Math.round(stepY / 2);

          while (x > -this.scrollerWidth) {
            this.pages[i] = [];
            l = 0;
            y = 0;

            while (y > -this.scrollerHeight) {
              this.pages[i][l] = {
                x: Math.max(x, this.maxScrollX),
                y: Math.max(y, this.maxScrollY),
                width: stepX,
                height: stepY,
                cx: x - cx,
                cy: y - cy
              };

              y -= stepY;
              l++;
            }

            x -= stepX;
            i++;
          }
        } else {
          el = this.options.snap;
          l = el.length;
          n = -1;

          for (; i < l; i++) {
            if (i === 0 || el[i].offsetLeft <= el[i - 1].offsetLeft) {
              m = 0;
              n++;
            }

            if (!this.pages[m]) {
              this.pages[m] = [];
            }

            x = Math.max(-el[i].offsetLeft, this.maxScrollX);
            y = Math.max(-el[i].offsetTop, this.maxScrollY);
            cx = x - Math.round(el[i].offsetWidth / 2);
            cy = y - Math.round(el[i].offsetHeight / 2);

            this.pages[m][n] = {
              x: x,
              y: y,
              width: el[i].offsetWidth,
              height: el[i].offsetHeight,
              cx: cx,
              cy: cy
            };

            if (x > this.maxScrollX) {
              m++;
            }
          }
        }

        this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

        // Update snap threshold if needed
        if (this.options.snapThreshold % 1 === 0) {
          this.snapThresholdX = this.options.snapThreshold;
          this.snapThresholdY = this.options.snapThreshold;
        } else {
          this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
          this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
        }
      });

      this.on('flick', function () {
        var time = this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(this.x - this.startX), 1000), Math.min(Math.abs(this.y - this.startY), 1000)), 300);

        this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, time);
      });
    },

    _nearestSnap: function _nearestSnap(x, y) {
      if (!this.pages.length) {
        return { x: 0, y: 0, pageX: 0, pageY: 0 };
      }

      var i = 0,
          l = this.pages.length,
          m = 0;

      // Check if we exceeded the snap threshold
      if (Math.abs(x - this.absStartX) < this.snapThresholdX && Math.abs(y - this.absStartY) < this.snapThresholdY) {
        return this.currentPage;
      }

      if (x > 0) {
        x = 0;
      } else if (x < this.maxScrollX) {
        x = this.maxScrollX;
      }

      if (y > 0) {
        y = 0;
      } else if (y < this.maxScrollY) {
        y = this.maxScrollY;
      }

      for (; i < l; i++) {
        if (x >= this.pages[i][0].cx) {
          x = this.pages[i][0].x;
          break;
        }
      }

      l = this.pages[i].length;

      for (; m < l; m++) {
        if (y >= this.pages[0][m].cy) {
          y = this.pages[0][m].y;
          break;
        }
      }

      if (i == this.currentPage.pageX) {
        i += this.directionX;

        if (i < 0) {
          i = 0;
        } else if (i >= this.pages.length) {
          i = this.pages.length - 1;
        }

        x = this.pages[i][0].x;
      }

      if (m == this.currentPage.pageY) {
        m += this.directionY;

        if (m < 0) {
          m = 0;
        } else if (m >= this.pages[0].length) {
          m = this.pages[0].length - 1;
        }

        y = this.pages[0][m].y;
      }

      return {
        x: x,
        y: y,
        pageX: i,
        pageY: m
      };
    },

    goToPage: function goToPage(x, y, time, easing) {
      easing = easing || this.options.bounceEasing;

      if (x >= this.pages.length) {
        x = this.pages.length - 1;
      } else if (x < 0) {
        x = 0;
      }

      if (y >= this.pages[x].length) {
        y = this.pages[x].length - 1;
      } else if (y < 0) {
        y = 0;
      }

      var posX = this.pages[x][y].x,
          posY = this.pages[x][y].y;

      time = time === undefined ? this.options.snapSpeed || Math.max(Math.max(Math.min(Math.abs(posX - this.x), 1000), Math.min(Math.abs(posY - this.y), 1000)), 300) : time;

      this.currentPage = {
        x: posX,
        y: posY,
        pageX: x,
        pageY: y
      };

      this.scrollTo(posX, posY, time, easing);
    },

    next: function next(time, easing) {
      var x = this.currentPage.pageX,
          y = this.currentPage.pageY;

      x++;

      if (x >= this.pages.length && this.hasVerticalScroll) {
        x = 0;
        y++;
      }

      this.goToPage(x, y, time, easing);
    },

    prev: function prev(time, easing) {
      var x = this.currentPage.pageX,
          y = this.currentPage.pageY;

      x--;

      if (x < 0 && this.hasVerticalScroll) {
        x = 0;
        y--;
      }

      this.goToPage(x, y, time, easing);
    },

    _initKeys: function _initKeys(e) {
      // default key bindings
      var keys = {
        pageUp: 33,
        pageDown: 34,
        end: 35,
        home: 36,
        left: 37,
        up: 38,
        right: 39,
        down: 40
      };
      var i;

      // if you give me characters I give you keycode
      if (_typeof(this.options.keyBindings) == 'object') {
        for (i in this.options.keyBindings) {
          if (typeof this.options.keyBindings[i] == 'string') {
            this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
          }
        }
      } else {
        this.options.keyBindings = {};
      }

      for (i in keys) {
        this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
      }

      utils.addEvent(window, 'keydown', this);

      this.on('destroy', function () {
        utils.removeEvent(window, 'keydown', this);
      });
    },

    _key: function _key(e) {
      if (!this.enabled) {
        return;
      }

      var snap = this.options.snap,
          // we are using this alot, better to cache it
      newX = snap ? this.currentPage.pageX : this.x,
          newY = snap ? this.currentPage.pageY : this.y,
          now = utils.getTime(),
          prevTime = this.keyTime || 0,
          acceleration = 0.250,
          pos;

      if (this.options.useTransition && this.isInTransition) {
        pos = this.getComputedPosition();

        this._translate(Math.round(pos.x), Math.round(pos.y));
        this.isInTransition = false;
      }

      this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

      switch (e.keyCode) {
        case this.options.keyBindings.pageUp:
          if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
            newX += snap ? 1 : this.wrapperWidth;
          } else {
            newY += snap ? 1 : this.wrapperHeight;
          }
          break;
        case this.options.keyBindings.pageDown:
          if (this.hasHorizontalScroll && !this.hasVerticalScroll) {
            newX -= snap ? 1 : this.wrapperWidth;
          } else {
            newY -= snap ? 1 : this.wrapperHeight;
          }
          break;
        case this.options.keyBindings.end:
          newX = snap ? this.pages.length - 1 : this.maxScrollX;
          newY = snap ? this.pages[0].length - 1 : this.maxScrollY;
          break;
        case this.options.keyBindings.home:
          newX = 0;
          newY = 0;
          break;
        case this.options.keyBindings.left:
          newX += snap ? -1 : 5 + this.keyAcceleration >> 0;
          break;
        case this.options.keyBindings.up:
          newY += snap ? 1 : 5 + this.keyAcceleration >> 0;
          break;
        case this.options.keyBindings.right:
          newX -= snap ? -1 : 5 + this.keyAcceleration >> 0;
          break;
        case this.options.keyBindings.down:
          newY -= snap ? 1 : 5 + this.keyAcceleration >> 0;
          break;
        default:
          return;
      }

      if (snap) {
        this.goToPage(newX, newY);
        return;
      }

      if (newX > 0) {
        newX = 0;
        this.keyAcceleration = 0;
      } else if (newX < this.maxScrollX) {
        newX = this.maxScrollX;
        this.keyAcceleration = 0;
      }

      if (newY > 0) {
        newY = 0;
        this.keyAcceleration = 0;
      } else if (newY < this.maxScrollY) {
        newY = this.maxScrollY;
        this.keyAcceleration = 0;
      }

      this.scrollTo(newX, newY, 0);

      this.keyTime = now;
    },

    _animate: function _animate(destX, destY, duration, easingFn) {
      var that = this,
          startX = this.x,
          startY = this.y,
          startTime = utils.getTime(),
          destTime = startTime + duration;

      function step() {
        var now = utils.getTime(),
            newX,
            newY,
            easing;

        if (now >= destTime) {
          that.isAnimating = false;
          that._translate(destX, destY);

          if (!that.resetPosition(that.options.bounceTime)) {
            that._execEvent('scrollEnd');
          }

          return;
        }

        now = (now - startTime) / duration;
        easing = easingFn(now);
        newX = (destX - startX) * easing + startX;
        newY = (destY - startY) * easing + startY;
        that._translate(newX, newY);

        if (that.isAnimating) {
          rAF(step);
        }

        if (that.options.probeType == 3) {
          that._execEvent('scroll');
        }
      }

      this.isAnimating = true;
      step();
    },

    _initInfinite: function _initInfinite() {
      var el = this.options.infiniteElements;

      this.infiniteElements = typeof el == 'string' ? document.querySelectorAll(el) : el;
      this.infiniteLength = this.infiniteElements.length;
      this.infiniteMaster = this.infiniteElements[0];
      this.infiniteElementHeight = this.infiniteMaster.offsetHeight;
      this.infiniteHeight = this.infiniteLength * this.infiniteElementHeight;

      this.options.cacheSize = this.options.cacheSize || 1000;
      this.infiniteCacheBuffer = Math.round(this.options.cacheSize / 4);

      //this.infiniteCache = {};
      this.options.dataset.call(this, 0, this.options.cacheSize);

      this.on('refresh', function () {
        var elementsPerPage = Math.ceil(this.wrapperHeight / this.infiniteElementHeight);
        this.infiniteUpperBufferSize = Math.floor((this.infiniteLength - elementsPerPage) / 2);
        this.reorderInfinite();
      });

      this.on('scroll', this.reorderInfinite);
    },

    // TO-DO: clean up the mess
    reorderInfinite: function reorderInfinite() {
      var center = -this.y + this.wrapperHeight / 2;

      var minorPhase = Math.max(Math.floor(-this.y / this.infiniteElementHeight) - this.infiniteUpperBufferSize, 0),
          majorPhase = Math.floor(minorPhase / this.infiniteLength),
          phase = minorPhase - majorPhase * this.infiniteLength;

      var top = 0;
      var i = 0;
      var update = [];

      //var cachePhase = Math.floor((minorPhase + this.infiniteLength / 2) / this.infiniteCacheBuffer);
      var cachePhase = Math.floor(minorPhase / this.infiniteCacheBuffer);

      while (i < this.infiniteLength) {
        top = i * this.infiniteElementHeight + majorPhase * this.infiniteHeight;

        if (phase > i) {
          top += this.infiniteElementHeight * this.infiniteLength;
        }

        if (this.infiniteElements[i]._top !== top) {
          this.infiniteElements[i]._phase = top / this.infiniteElementHeight;

          if (this.infiniteElements[i]._phase < this.options.infiniteLimit) {
            this.infiniteElements[i]._top = top;
            if (this.options.infiniteUseTransform) {
              this.infiniteElements[i].style[utils.style.transform] = 'translate(0, ' + top + 'px)' + this.translateZ;
            } else {
              this.infiniteElements[i].style.top = top + 'px';
            }
            update.push(this.infiniteElements[i]);
          }
        }

        i++;
      }

      if (this.cachePhase != cachePhase && (cachePhase === 0 || minorPhase - this.infiniteCacheBuffer > 0)) {
        this.options.dataset.call(this, Math.max(cachePhase * this.infiniteCacheBuffer - this.infiniteCacheBuffer, 0), this.options.cacheSize);
      }

      this.cachePhase = cachePhase;

      this.updateContent(update);
    },

    updateContent: function updateContent(els) {
      if (this.infiniteCache === undefined) {
        return;
      }

      for (var i = 0, l = els.length; i < l; i++) {
        this.options.dataFiller.call(this, els[i], this.infiniteCache[els[i]._phase]);
      }
    },

    updateCache: function updateCache(start, data) {
      var firstRun = this.infiniteCache === undefined;

      this.infiniteCache = {};

      for (var i = 0, l = data.length; i < l; i++) {
        this.infiniteCache[start++] = data[i];
      }

      if (firstRun) {
        this.updateContent(this.infiniteElements);
      }
    },

    handleEvent: function handleEvent(e) {
      switch (e.type) {
        case 'touchstart':
        case 'pointerdown':
        case 'MSPointerDown':
        case 'mousedown':
          this._start(e);
          break;
        case 'touchmove':
        case 'pointermove':
        case 'MSPointerMove':
        case 'mousemove':
          this._move(e);
          break;
        case 'touchend':
        case 'pointerup':
        case 'MSPointerUp':
        case 'mouseup':
        case 'touchcancel':
        case 'pointercancel':
        case 'MSPointerCancel':
        case 'mousecancel':
          this._end(e);
          break;
        case 'orientationchange':
        case 'resize':
          this._resize();
          break;
        case 'transitionend':
        case 'webkitTransitionEnd':
        case 'oTransitionEnd':
        case 'MSTransitionEnd':
          this._transitionEnd(e);
          break;
        case 'wheel':
        case 'DOMMouseScroll':
        case 'mousewheel':
          this._wheel(e);
          break;
        case 'keydown':
          this._key(e);
          break;
        case 'click':
          if (this.enabled && !e._constructed) {
            e.preventDefault();
            e.stopPropagation();
          }
          break;
      }
    }
  };
  IScroll.utils = utils;

  if (typeof module != 'undefined' && module.exports) {
    module.exports = IScroll;
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return IScroll;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    window.IScroll = IScroll;
  }
})(window, document, Math);

/***/ }),

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
;
(function (root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") {
        module.exports = factory();
    } else {
        root.ResizeSensor = factory();
    }
})(this, function () {

    // Make sure it does not throw in a SSR (Server Side Rendering) situation
    if (typeof window === "undefined") {
        return null;
    }
    // Only used for the dirty checking, so the event callback count is limited to max 1 call per fps per sensor.
    // In combination with the event based resize sensor this saves cpu time, because the sensor is too fast and
    // would generate too many unnecessary events.
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (fn) {
        return window.setTimeout(fn, 20);
    };

    /**
     * Iterate over each of the provided element(s).
     *
     * @param {HTMLElement|HTMLElement[]} elements
     * @param {Function}                  callback
     */
    function forEachElement(elements, callback) {
        var elementsType = Object.prototype.toString.call(elements);
        var isCollectionTyped = '[object Array]' === elementsType || '[object NodeList]' === elementsType || '[object HTMLCollection]' === elementsType || '[object Object]' === elementsType || 'undefined' !== typeof jQuery && elements instanceof jQuery //jquery
        || 'undefined' !== typeof Elements && elements instanceof Elements //mootools
        ;
        var i = 0,
            j = elements.length;
        if (isCollectionTyped) {
            for (; i < j; i++) {
                callback(elements[i]);
            }
        } else {
            callback(elements);
        }
    }

    /**
     * Class for dimension change detection.
     *
     * @param {Element|Element[]|Elements|jQuery} element
     * @param {Function} callback
     *
     * @constructor
     */
    var ResizeSensor = function ResizeSensor(element, callback) {
        /**
         *
         * @constructor
         */
        function EventQueue() {
            var q = [];
            this.add = function (ev) {
                q.push(ev);
            };

            var i, j;
            this.call = function () {
                for (i = 0, j = q.length; i < j; i++) {
                    q[i].call();
                }
            };

            this.remove = function (ev) {
                var newQueue = [];
                for (i = 0, j = q.length; i < j; i++) {
                    if (q[i] !== ev) newQueue.push(q[i]);
                }
                q = newQueue;
            };

            this.length = function () {
                return q.length;
            };
        }

        /**
         * @param {HTMLElement} element
         * @param {String}      prop
         * @returns {String|Number}
         */
        function getComputedStyle(element, prop) {
            if (element.currentStyle) {
                return element.currentStyle[prop];
            }
            if (window.getComputedStyle) {
                return window.getComputedStyle(element, null).getPropertyValue(prop);
            }

            return element.style[prop];
        }

        /**
         *
         * @param {HTMLElement} element
         * @param {Function}    resized
         */
        function attachResizeEvent(element, resized) {
            if (element.resizedAttached) {
                element.resizedAttached.add(resized);
                return;
            }

            element.resizedAttached = new EventQueue();
            element.resizedAttached.add(resized);

            element.resizeSensor = document.createElement('div');
            element.resizeSensor.className = 'resize-sensor';
            var style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;';
            var styleChild = 'position: absolute; left: 0; top: 0; transition: 0s;';

            element.resizeSensor.style.cssText = style;
            element.resizeSensor.innerHTML = '<div class="resize-sensor-expand" style="' + style + '">' + '<div style="' + styleChild + '"></div>' + '</div>' + '<div class="resize-sensor-shrink" style="' + style + '">' + '<div style="' + styleChild + ' width: 200%; height: 200%"></div>' + '</div>';
            element.appendChild(element.resizeSensor);

            if (getComputedStyle(element, 'position') == 'static') {
                element.style.position = 'relative';
            }

            var expand = element.resizeSensor.childNodes[0];
            var expandChild = expand.childNodes[0];
            var shrink = element.resizeSensor.childNodes[1];
            var dirty, rafId, newWidth, newHeight;
            var lastWidth = element.offsetWidth;
            var lastHeight = element.offsetHeight;

            var reset = function reset() {
                expandChild.style.width = '100000px';
                expandChild.style.height = '100000px';

                expand.scrollLeft = 100000;
                expand.scrollTop = 100000;

                shrink.scrollLeft = 100000;
                shrink.scrollTop = 100000;
            };

            reset();

            var onResized = function onResized() {
                rafId = 0;

                if (!dirty) return;

                lastWidth = newWidth;
                lastHeight = newHeight;

                if (element.resizedAttached) {
                    element.resizedAttached.call();
                }
            };

            var onScroll = function onScroll() {
                newWidth = element.offsetWidth;
                newHeight = element.offsetHeight;
                dirty = newWidth != lastWidth || newHeight != lastHeight;

                if (dirty && !rafId) {
                    rafId = requestAnimationFrame(onResized);
                }

                reset();
            };

            var addEvent = function addEvent(el, name, cb) {
                if (el.attachEvent) {
                    el.attachEvent('on' + name, cb);
                } else {
                    el.addEventListener(name, cb);
                }
            };

            addEvent(expand, 'scroll', onScroll);
            addEvent(shrink, 'scroll', onScroll);
        }

        forEachElement(element, function (elem) {
            attachResizeEvent(elem, callback);
        });

        this.detach = function (ev) {
            ResizeSensor.detach(element, ev);
        };
    };

    ResizeSensor.detach = function (element, ev) {
        forEachElement(element, function (elem) {
            if (elem.resizedAttached && typeof ev == "function") {
                elem.resizedAttached.remove(ev);
                if (elem.resizedAttached.length()) return;
            }
            if (elem.resizeSensor) {
                if (elem.contains(elem.resizeSensor)) {
                    elem.removeChild(elem.resizeSensor);
                }
                delete elem.resizeSensor;
                delete elem.resizedAttached;
            }
        });
    };

    return ResizeSensor;
});

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var Dialog = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(1480));

/* harmony default export */ __webpack_exports__["a"] = ({
  showModal: function showModal(propsData) {
    return new Dialog({ el: document.createElement('div'), propsData: propsData });
  }
});

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_axios__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_timeago__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_timeago___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_timeago__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_i18n__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuelidate__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuelidate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_vuelidate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_common_components_vue_touch__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vue_lazyload__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vue_lazyload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_vue_lazyload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__serverApi__ = __webpack_require__(864);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_vue_preview__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_common_components_quillEditor__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_common_components_quillEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_common_components_quillEditor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_common_js_acs__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_common_components_quillContent__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_common_components_scroller__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_common_components_scroller___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_common_components_scroller__);














__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_6_vuelidate___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_5_vue_i18n__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_11_common_components_quillEditor___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_10_vue_preview__["a" /* default */]);

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_8_vue_lazyload___default.a, {
  listenEvents: ['scroll']
});
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_7_common_components_vue_touch__["a" /* default */], { name: 'v-touch' });
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_3_vue_axios___default.a, __WEBPACK_IMPORTED_MODULE_2_axios___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_9__serverApi__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_4_vue_timeago___default.a, {
  locale: 'zh-CN',
  locales: {
    'zh-CN': __webpack_require__(561)
  }
});




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('quill-content', __WEBPACK_IMPORTED_MODULE_13_common_components_quillContent__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('scroller', __WEBPACK_IMPORTED_MODULE_14_common_components_scroller___default.a);

__WEBPACK_IMPORTED_MODULE_2_axios___default.a.defaults.headers.common['x-csrf-token'] = window.acsConfig.csrfToken;
__WEBPACK_IMPORTED_MODULE_2_axios___default.a.defaults.headers.common['acs-app-id'] = __WEBPACK_IMPORTED_MODULE_12_common_js_acs__["b" /* getAppId */]();
__WEBPACK_IMPORTED_MODULE_2_axios___default.a.defaults.headers.common['acs-device-id'] = __WEBPACK_IMPORTED_MODULE_12_common_js_acs__["c" /* getDeviceId */]();

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue___default.a);

/***/ }),

/***/ 491:
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

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: Boolean,
    transition: {
      type: String,
      default: 'fade'
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: ''
    },
    onOk: {
      type: Function,
      default: null
    }
  },

  mounted: function mounted() {
    document.body.appendChild(this.$el);
    if (!this.okText) {
      this.okText = this.$t('common.ok');
    }
    if (!this.cancelText) {
      this.cancelText = this.$t('common.cancel');
    }
  },

  watch: {
    visible: function visible(val) {
      this.show = val;
    }
  },

  compiled: function compiled() {
    this.modal = this.$refs.modal;
  },

  methods: {
    ok: function ok() {
      this.visible = false;

      if (typeof this.onOk == 'function') {
        this.onOk();
      }
    },
    cancel: function cancel() {
      this.visible = false;

      if (typeof this.onCancel == 'function') {
        this.onCancel();
      }
    }
  }
});

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_image_crop_upload_upload_2_vue__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_image_crop_upload_upload_2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_image_crop_upload_upload_2_vue__);
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    url: {
      type: String,
      default: ''
    },

    params: {
      type: Object,
      default: function _default() {
        return {};
      }
    },

    callback: {
      type: Function,
      default: null
    }
  },

  components: {
    imgUpload: __WEBPACK_IMPORTED_MODULE_0_vue_image_crop_upload_upload_2_vue___default.a
  },

  data: function data() {
    return {
      headers: {
        'x-csrf-token': window.acsConfig.csrfToken
      },
      show: true,
      langType: window.acsConfig.locale == 'en' ? 'en' : 'zh'
    };
  },

  mounted: function mounted() {
    document.body.appendChild(this.$el);
  },

  watch: {
    show: function show(val) {
      var _this = this;

      if (!val) {
        this.$nextTick(function (_) {
          document.body.removeChild(_this.$el);
        });
      }
    }
  },

  methods: {
    cropUploadSuccess: function cropUploadSuccess(data) {
      if (this.callback) {
        this.callback(data);
      }
    },
    cropUploadFail: function cropUploadFail(data) {
      if (this.callback) {
        this.callback(data);
      }
    }
  }
});

/***/ }),

/***/ 493:
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

__webpack_require__(511);
__webpack_require__(512);

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    visible: Boolean,

    items: {
      type: Array,
      required: true
    }
  },

  data: function data() {
    return {
      show: this.visible
    };
  },
  mounted: function mounted() {
    document.body.appendChild(this.$el);
  },


  methods: {
    beforeEnter: function beforeEnter() {
      this.$emit('open');
    },
    afterLeave: function afterLeave() {
      var _this = this;

      this.$emit('close');
      this.$nextTick(function (_) {
        document.body.removeChild(_this.$el);
      });
    },
    active: function active() {
      this.show = true;
    },
    deactive: function deactive() {
      this.show = false;
    },
    onItemSelected: function onItemSelected(item) {
      this.$emit('item-selected', item);
      this.show = false;
    }
  },

  watch: {
    visible: function visible(val) {
      this.show = val;
    }
  }
});

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quillEmpty__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quillEmpty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__quillEmpty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quillImage__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quillImage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__quillImage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_dynamic__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_filters__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_js_nativeApi__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vue__);
//
//
//









__WEBPACK_IMPORTED_MODULE_5_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_2__vue_dynamic__["a" /* default */], {
  name: 'dynamic'
});

__WEBPACK_IMPORTED_MODULE_5_vue___default.a.component('quill-image', __WEBPACK_IMPORTED_MODULE_1__quillImage___default.a);

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'quillContentComponent',
  props: {
    content: {
      type: String,
      require: true,
      default: ''
    }
  },

  data: function data() {
    return {
      comps: [{
        template: '<div><div class="ql-editor">' + this.content.replace(/<img ([^>]*)\/?>(<\/img>)?/g, function (_, $1) {
          return '<quill-image @tap="onShowSlide" @add="onAddImage" ' + $1 + '></quill-image>';
        }) + '</div></div>',
        methods: {
          onAddImage: function onAddImage(url, width, height) {
            this.imageUrls.push(__WEBPACK_IMPORTED_MODULE_3_common_js_filters__["imageStaticUrl"](url));
            this.images.push({ src: __WEBPACK_IMPORTED_MODULE_3_common_js_filters__["imageStaticUrl"](url), w: width, h: height });
          },
          onShowSlide: function onShowSlide(showingImageUrl) {
            var _this = this;

            var url = __WEBPACK_IMPORTED_MODULE_3_common_js_filters__["imageStaticUrl"](showingImageUrl);
            var index = this.imageUrls.indexOf(url);

            this.$preview.open(index, this.images, {
              getThumbBoundsFn: function getThumbBoundsFn(i) {
                var images = _this.$el.getElementsByClassName('quill-image');
                var rects = [];

                Object.keys(images).forEach(function (key) {
                  var image = images[key];
                  var rect = image.children[0].children[0].getBoundingClientRect();
                  rects.push({ x: rect.left, y: rect.top, w: rect.width });
                });

                return rects[i];
              }
            });
          }
        },
        data: function data() {
          return {
            imageUrls: [],
            images: []
          };
        }
      }],
      emptyView: __WEBPACK_IMPORTED_MODULE_0__quillEmpty___default.a
    };
  }
});

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_progressive_image__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_progressive_image___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_progressive_image__);
//
//
//
//
//
//
//
//
//
//
//



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_progressive_image___default.a, {
  blur: 30
});

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    src: String,
    width: String,
    height: String,
    alt: String
  },

  data: function data() {
    return {
      maxWidth: 0,
      onResize: null
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.maxWidth = this.$refs.container.clientWidth;
    this.onResize = window.addEventListener('resize', function (_) {
      _this.maxWidth = _this.$el.clientWidth;
    });

    if (this.isValidImage) {
      this.$emit('add', this.src, parseInt(this.width), parseInt(this.height));
      this.$el.addEventListener('tap', function (_) {
        var rect = _this.$el.getBoundingClientRect();
        _this.$emit('tap', _this.src);
      }, false);
    }
  },
  destroyed: function destroyed() {
    window.removeEventListener('resize', this.onResize);
  },


  computed: {
    isValidImage: function isValidImage() {
      return (/^(https?:\/\/[^\/\.]+\.firevale.com\/|\/img\/|\/images\/)/.test(this.src)
      );
    },
    isSizeSpecified: function isSizeSpecified() {
      return (/^\d+/.test(this.width) && /^\d+/.test(this.height)
      );
    },
    imageSize: function imageSize() {
      var width = parseInt(this.width);
      var height = parseInt(this.height);

      if (width < this.maxWidth) {
        return {
          width: this.width + 'px',
          height: this.height + 'px'
        };
      } else {
        return {
          width: '100%',
          height: 0,
          'padding-bottom': (height * 100 / width).toFixed(0) + '%'
        };
      }
    }
  },

  methods: {}
});

/***/ }),

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_iscroll_infinite_js__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_iscroll_infinite_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_common_js_iscroll_infinite_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_resizeSensor__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_resizeSensor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_common_js_resizeSensor__);
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




var PULL_TO_REFRESH = 0;
var RELEASE_TO_REFRESH = 1;
var REFRESHING = 2;

var REM_SIZE = parseFloat(getComputedStyle(document.querySelector("html")).fontSize);

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    onRefresh: Function,
    onLoadMore: Function,
    i18n: {
      type: Object,
      default: function _default(_) {
        return {
          pullToRefresh: '下拉刷新',
          releaseToRefresh: '释放加载',
          refreshing: '刷新中, 请稍候',
          noMoreData: '没有更多数据啦',
          loading: '加载中，请稍候'
        };
      }
    },
    options: {
      type: Object,
      default: function _default(_) {
        return {
          mouseWheel: true,
          scrollX: false,
          scrollY: true
        };
      }
    }
  },

  data: function data() {
    return {
      refreshState: PULL_TO_REFRESH,
      iscroll: null,
      loading: false,
      allLoaded: false,
      counter: 0,
      isScrolling: false,
      needRefresh: false
    };
  },

  beforeDestroy: function beforeDestroy() {
    this.iscroll && this.iscroll.destroy();
    this.iscroll = null;
  },

  mounted: function mounted() {
    var _this = this;

    this.$on('all-loaded', function (_) {
      _this.allLoaded = true;
    });
    this.$on('reset', function (_) {
      _this.$nextTick(function (_) {
        _this.allLoaded = false;
        _this.checkLoadMore();
      });
    });
    this.$nextTick(function (_) {
      _this.iscroll = new __WEBPACK_IMPORTED_MODULE_0_common_js_iscroll_infinite_js___default.a(_this.$refs.scroller, _extends({}, _this.options, {
        mouseWheel: true,
        scrollX: false,
        scrollY: true,
        probeType: 2,
        eventPassthrough: 'horizontal',
        tap: true,
        momentum: false,
        bounceEasing: 'quadratic'
      }));
      _this.iscroll.on('scrollStart', _this.scrollStart);
      _this.iscroll.on('scrollCancel', _this.scrollCancel);
      _this.iscroll.on('scroll', _this.scroll);
      _this.iscroll.on('scrollEnd', _this.scrollEnd);
      _this.iscroll.on('bounceStart', _this.bounceStart);
      _this.resetScrollTop();
      _this.$nextTick(function (_) {
        return _this.checkLoadMore();
      });
      _this.sensor = new __WEBPACK_IMPORTED_MODULE_1_common_js_resizeSensor___default.a(_this.$refs.scroller_content, function (_) {
        if (!(_this.isScrolling || _this.loading)) {
          if (_this.iscroll && _this.iscroll.isInTransition) {
            _this.needRefresh = true;
          } else {
            _this.$nextTick(function (_) {
              _this.iscroll ? _this.iscroll.refresh() : undefined;
            });
          }
        } else {
          _this.needRefresh = true;
        }
      });
    });
  },

  methods: {
    resetScrollTop: function resetScrollTop() {
      this.$refs.scroller.scrollTop = 0;

      if (this.onRefresh) {
        this.iscroll.minScrollY = -4 * REM_SIZE;
      } else {
        this.iscroll.minScrollY = 0;
      }
    },

    scrollStart: function scrollStart() {
      this.counter = 0;
      this.isScrolling = true;
    },

    scrollCancel: function scrollCancel() {
      this.counter = 0;
      this.isScrolling = false;
      if (this.needRefresh) {
        this.iscroll.refresh();
        this.needRefresh = false;
      }
    },

    scrollEnd: function scrollEnd() {
      this.isScrolling = false;

      if (this.needRefresh) {
        this.iscroll.refresh();
        this.needRefresh = false;
        setTimeout(this.checkLoadMore, 600);
      } else {
        // if 
        if (this.refreshState != REFRESHING) {
          this.checkLoadMore();
        }
      }
    },

    bounceStart: function bounceStart() {
      var _this2 = this;

      if (this.onRefresh && this.refreshState == RELEASE_TO_REFRESH) {
        setTimeout(function () {
          var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _this2.refreshState = REFRESHING;
                    _this2.allLoaded = false;
                    _context.next = 4;
                    return _this2.onRefresh();

                  case 4:
                    setTimeout(function (_) {
                      _this2.iscroll.tempY = null;
                      _this2.refreshState = PULL_TO_REFRESH;
                      _this2.iscroll.resetPosition(600);
                    }, 10);

                  case 5:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, _this2);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }(), 0);
      }
    },

    scroll: function scroll() {
      if (this.iscroll && this.onRefresh && !this.loading && !this.iscroll.isInTransition) {
        if (this.iscroll.y >= REM_SIZE * 4 && this.iscroll.directionY <= 0) {
          if (this.counter++ >= 6) {
            this.refreshState = RELEASE_TO_REFRESH;
            this.iscroll.tempY = 4 * REM_SIZE;
          }
        } else if (this.iscroll.y < REM_SIZE * 4 && this.iscroll.directionY >= 0) {
          this.counter = 0;
          this.refreshState = PULL_TO_REFRESH;
          this.iscroll.tempY = null;
        }
      }
    },

    checkLoadMore: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.onLoadMore && !this.allLoaded && this.iscroll && (this.iscroll.y <= this.iscroll.maxScrollY || this.$refs.loading_layer.offsetTop < this.$refs.scroller.clientHeight))) {
                  _context2.next = 6;
                  break;
                }

                this.loading = true;
                _context2.next = 4;
                return this.onLoadMore();

              case 4:
                this.loading = false;
                if (this.needRefresh && this.iscroll) {
                  setTimeout(function (_) {
                    _this3.iscroll.refresh();
                    _this3.needRefresh = false;
                  }, 100);
                }

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function checkLoadMore() {
        return _ref2.apply(this, arguments);
      }

      return checkLoadMore;
    }()
  }
});

/***/ }),

/***/ 514:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 516:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 517:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 518:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(491),
  /* template */
  __webpack_require__(558),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/common/components/alertDialog/alertDialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] alertDialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e5c7175e", Component.options)
  } else {
    hotAPI.reload("data-v-e5c7175e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(518)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(492),
  /* template */
  __webpack_require__(556),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/common/components/imageCropUpload/dialog.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] dialog.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7d55ed23", Component.options)
  } else {
    hotAPI.reload("data-v-7d55ed23", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(517)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(493),
  /* template */
  __webpack_require__(555),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/common/components/mobileMenu/menu.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] menu.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-664e1c36", Component.options)
  } else {
    hotAPI.reload("data-v-664e1c36", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(494),
  /* template */
  __webpack_require__(557),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/common/components/quillContent/quillContent.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] quillContent.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e2bac4f2", Component.options)
  } else {
    hotAPI.reload("data-v-e2bac4f2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(495),
  /* template */
  __webpack_require__(550),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/common/components/quillContent/quillEmpty.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] quillEmpty.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-38a7a9db", Component.options)
  } else {
    hotAPI.reload("data-v-38a7a9db", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(514)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(496),
  /* template */
  __webpack_require__(552),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/common/components/quillContent/quillImage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] quillImage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-58f316e9", Component.options)
  } else {
    hotAPI.reload("data-v-58f316e9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(516)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(497),
  /* template */
  __webpack_require__(554),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/common/components/scroller.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] scroller.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6116ed92", Component.options)
  } else {
    hotAPI.reload("data-v-6116ed92", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div')
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-38a7a9db", module.exports)
  }
}

/***/ }),

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "container",
    staticClass: "quill-image"
  }, [(_vm.isValidImage) ? _c('div', [_c('progressive-background', {
    style: (_vm.imageSize),
    attrs: {
      "src": _vm._f("imageStaticUrl")(_vm.src),
      "placeholder": _vm._f("imageLowQualityUrl")(_vm._f("imageStaticUrl")(_vm.src)),
      "blur": 30,
      "no-ratio": ""
    }
  })], 1) : _c('div', {
    staticClass: "invalid-image"
  }, [_c('p', [_vm._v(_vm._s(_vm.$t('error.invalidImage')))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-58f316e9", module.exports)
  }
}

/***/ }),

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "scroller-container"
  }, [_c('div', {
    ref: "scroller",
    staticClass: "scroller"
  }, [_c('div', {
    ref: "scroller_content",
    staticClass: "scroller-content"
  }, [(_vm.onRefresh) ? _c('div', {
    staticClass: "pull-to-refresh-layer"
  }, [(_vm.refreshState == 0 && !_vm.loading) ? _c('div', {
    staticClass: "pull-to-refresh"
  }, [_vm._v(_vm._s(this.i18n.pullToRefresh))]) : _vm._e(), _vm._v(" "), (_vm.refreshState == 1 && !_vm.loading) ? _c('div', {
    staticClass: "release-to-refresh"
  }, [_vm._v(_vm._s(this.i18n.releaseToRefresh))]) : _vm._e(), _vm._v(" "), (_vm.refreshState == 2 && !_vm.loading) ? _c('div', {
    staticClass: "refreshing"
  }, [_vm._v(_vm._s(this.i18n.refreshing))]) : _vm._e()]) : _vm._e(), _vm._v(" "), _vm._t("default"), _vm._v(" "), _c('div', {
    ref: "loading_layer",
    staticClass: "loading-layer"
  }, [(_vm.onLoadMore && _vm.allLoaded && !_vm.loading) ? _vm._t("all-loaded", [_vm._v(" " + _vm._s(this.i18n.noMoreData) + " ")]) : _vm._e(), _vm._v(" "), (_vm.loading) ? _vm._t("loading", [_c('p', [_c('span', {
    staticClass: "icon image-icon icon-spinner rotating"
  }), _vm._v(" "), _c('span', [_vm._v(" " + _vm._s(this.i18n.loading) + " ")])])]) : _vm._e()], 2)], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6116ed92", module.exports)
  }
}

/***/ }),

/***/ 555:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "-mobile-menu-container"
  }, [(_vm.show) ? _c('v-touch', {
    staticClass: "-mobile-menu-mask",
    on: {
      "tap": _vm.deactive
    }
  }) : _vm._e(), _vm._v(" "), _c('transition', {
    attrs: {
      "appear": "",
      "enter-active-class": "animated bounceInUp",
      "leave-active-class": "animated bounceOutDown"
    },
    on: {
      "beforeEnter": _vm.beforeEnter,
      "afterLeave": _vm.afterLeave
    }
  }, [(_vm.show) ? _c('div', {
    staticClass: "-mobile-menu-wrapper"
  }, [_c('div', {
    staticClass: "-mobile-menu"
  }, _vm._l((_vm.items), function(item) {
    return _c('v-touch', {
      key: "item.title",
      staticClass: "-mobile-menu-item",
      on: {
        "tap": function($event) {
          _vm.onItemSelected(item)
        }
      }
    }, [_c('span', [_vm._v(_vm._s(item.title))])])
  }))]) : _vm._e()])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-664e1c36", module.exports)
  }
}

/***/ }),

/***/ 556:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('img-upload', {
    attrs: {
      "url": "/user/update_avatar",
      "field": "file",
      "headers": _vm.headers,
      "langType": _vm.langType
    },
    on: {
      "crop-upload-success": _vm.cropUploadSuccess,
      "crop-upload-fail": _vm.cropUploadFail
    },
    model: {
      value: (_vm.show),
      callback: function($$v) {
        _vm.show = $$v
      },
      expression: "show"
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7d55ed23", module.exports)
  }
}

/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('dynamic', {
    attrs: {
      "comps": _vm.comps,
      "emptyView": _vm.emptyView
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e2bac4f2", module.exports)
  }
}

/***/ }),

/***/ 558:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ['modal', 'animated', _vm.visible ? 'is-active' : ''],
    attrs: {
      "transition": _vm.transition,
      "transition-mode": "in-out"
    }
  }, [_c('div', {
    staticClass: "modal-background",
    on: {
      "click": _vm.cancel
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "modal-card",
    staticStyle: {
      "border-radius": "5px",
      "width": "30%",
      "min-width": "220px"
    }
  }, [_c('section', {
    staticClass: "modal-card-body",
    staticStyle: {
      "border-radius": "0"
    }
  }, [_c('article', {
    staticClass: "media"
  }, [_c('div', {
    staticClass: "media-content"
  }, [_c('div', {
    staticClass: "content is-warning"
  }, [_c('p', {
    staticStyle: {
      "text-align": "center",
      "font-size": "1.3rem"
    }
  }, [_vm._v(" " + _vm._s(_vm.message) + "? ")])])])])]), _vm._v(" "), _c('footer', {
    staticClass: "modal-footer"
  }, [_c('a', {
    staticClass: "button is-info",
    on: {
      "click": _vm.cancel
    }
  }, [_vm._v(_vm._s(_vm.cancelText))]), _vm._v(" "), _c('a', {
    staticClass: "button is-primary",
    on: {
      "click": _vm.ok
    }
  }, [_vm._v(_vm._s(_vm.okText))])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e5c7175e", module.exports)
  }
}

/***/ }),

/***/ 570:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__zh_hans__ = __webpack_require__(859);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__zh_hant__ = __webpack_require__(861);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__en__ = __webpack_require__(857);




/* harmony default export */ __webpack_exports__["a"] = ({
  'zh-hans': __WEBPACK_IMPORTED_MODULE_0__zh_hans__["a" /* default */],
  'zh-hant': __WEBPACK_IMPORTED_MODULE_1__zh_hant__["a" /* default */],
  'en': __WEBPACK_IMPORTED_MODULE_2__en__["a" /* default */]
});

/***/ }),

/***/ 571:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return i18n; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_i18n__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__i18n__ = __webpack_require__(570);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_i18n__["a" /* default */]);

var i18n = new __WEBPACK_IMPORTED_MODULE_1_vue_i18n__["a" /* default */]({
  locale: window.acsConfig.locale || 'zh-hans',
  messages: __WEBPACK_IMPORTED_MODULE_2__i18n__["a" /* default */]
});

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

/***/ 759:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_installed__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__i18n__ = __webpack_require__(570);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store__ = __webpack_require__(867);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__routes__ = __webpack_require__(863);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vue_i18n__ = __webpack_require__(571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_common_js_filters__ = __webpack_require__(52);












__webpack_require__(1160);
Object.keys(__WEBPACK_IMPORTED_MODULE_7_common_js_filters__).forEach(function (k) {
  __WEBPACK_IMPORTED_MODULE_2__vue_installed__["a" /* default */].filter(k, __WEBPACK_IMPORTED_MODULE_7_common_js_filters__[k]);
});

var transitionSlideLeftToRight = 'slide-right';
var transitionSlideRightToLeft = 'slide-left';

// document.ontouchmove = e => e.preventDefault()

// insert popstate event listener before router,
// by doing so, we can change transition name while user press "Back" button
window.addEventListener('popstate', function (_) {
  __WEBPACK_IMPORTED_MODULE_4__store__["a" /* default */].commit('SET_TRANSITION_NAME', transitionSlideLeftToRight);
});

var router = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__routes__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);
router.afterEach(function (route) {
  __WEBPACK_IMPORTED_MODULE_2__vue_installed__["a" /* default */].nextTick(function (_) {
    return __WEBPACK_IMPORTED_MODULE_4__store__["a" /* default */].commit('SET_TRANSITION_NAME', transitionSlideRightToLeft);
  });
});

var App = new __WEBPACK_IMPORTED_MODULE_2__vue_installed__["a" /* default */]({
  i18n: __WEBPACK_IMPORTED_MODULE_6__vue_i18n__["a" /* i18n */],
  router: router,
  store: __WEBPACK_IMPORTED_MODULE_4__store__["a" /* default */]
}).$mount('#app');

/***/ }),

/***/ 856:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  postList: {
    title: '游戏论坛',
    newPost: '发帖',
    all: '全部',
    discussion: '综合讨论',
    experience: '攻略心得',
    ras: '转帖分享',
    original: '玩家原创',
    appeal: '问题求助',
    order: '{type}',
    top: '置顶',
    essence: '精',
    hot: '火'
  },
  search: {
    placeholder: '请输入关键词',
    btnTitle: '搜索帖子',
    searchHis: '历史搜索记录:',
    noSearchRecord: '暂无搜索记录',
    noSearchResult: '暂无搜索结果',
    followSearchResult: '搜索结果如下:',
    clearHisRecord: '清空历史搜索记录'
  },
  orderType: {
    last_reply_at: '回复时间排序',
    inserted_at: '发帖时间排序',
    is_hot: '热门排序',
    is_vote: '精品贴'
  },
  detail: {
    title: '帖子详情',
    replyBtn: '回复',
    author: '楼主',
    firstComment: '沙发',
    secondComment: '板凳',
    nthComment: '{nth}楼',
    showAuthorOnly: '只看楼主',
    showAll: '查看全部',
    addToFavorite: '收藏帖子',
    favoriting: '处理中...',
    delete: '删除',
    goBack: '回到顶部',
    deletePostTip: '确认删除帖子',
    deleteTip: '确认删除{nth}楼',
    removeFromFavorites: '取消收藏',
    closePost: '封贴',
    openPost: '解封',
    essencePost: '精品',
    unEssencePost: '取消',
    upPost: '置顶',
    unUpPost: '取消',
    operateSuccess: '操作成功'
  },
  newPost: {
    title: '发帖子',
    btnTitle: '发帖',
    preview: '预览',
    editView: '编辑',
    backAndEdit: '返回编辑',
    titlePlaceholder: '输入一个闪亮亮的钛合金标题吧 ！',
    textAreaPlaceHolder: '赶紧写帖子吐槽吧～～',
    requireTitle: '请输入标题',
    requireContent: '请输入内容',
    requireSection: '请选择发贴版块',
    addSuccess: '发帖成功'
  },
  writeComment: {
    title: '回复',
    btnTitle: '回复',
    textAreaPlaceHolder: '赶紧写帖子吐槽吧～～',
    addSuccess: '回复成功',
    deleteTip: '确认取消收藏'
  },
  pagination: {
    previous: '上一页',
    next: '下一页'
  },
  personal: {
    title: '个人主页',
    nickname: '昵称 : ',
    postCount: '发帖数 : ',
    registerTime: '注册时间 : ',
    myPosts: '我的帖子',
    myComments: '我的回复',
    myFavor: '我的收藏',
    myBan: '我的封禁',
    cancelFavor: '取消收藏',
    newComment: 'Comment',
    deleteBtn: '删除',
    reply: '回复：',
    originalPost: '原帖：',
    confirmDeArchive: '是否确认解封'
  },
  campaign: {
    title: '活动',
    gameCampaign: '游戏活动',
    gameNotice: '游戏公告',
    gameNews: '官方新闻'
  }
});

/***/ }),

/***/ 857:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forum__ = __webpack_require__(856);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_i18n_zh_hant_upload__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_i18n_zh_hant_common__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_i18n_zh_hant_error__ = __webpack_require__(186);





/* harmony default export */ __webpack_exports__["a"] = ({
  forum: __WEBPACK_IMPORTED_MODULE_0__forum__["a" /* default */],
  upload: __WEBPACK_IMPORTED_MODULE_1_common_i18n_zh_hant_upload__["a" /* default */],
  common: __WEBPACK_IMPORTED_MODULE_2_common_i18n_zh_hant_common__["a" /* default */],
  error: __WEBPACK_IMPORTED_MODULE_3_common_i18n_zh_hant_error__["a" /* default */]
});

/***/ }),

/***/ 858:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  postList: {
    title: '游戏论坛',
    newPost: '发帖',
    all: '全部',
    discussion: '综合讨论',
    experience: '攻略心得',
    ras: '转帖分享',
    original: '玩家原创',
    appeal: '问题求助',
    order: '{type}',
    top: '置顶',
    essence: '精',
    hot: '火'
  },
  search: {
    placeholder: '请输入关键词',
    btnTitle: '搜索帖子',
    searchHis: '历史搜索记录:',
    noSearchRecord: '暂无搜索记录',
    noSearchResult: '暂无搜索结果',
    followSearchResult: '搜索结果如下:',
    clearHisRecord: '清空历史搜索记录'
  },
  orderType: {
    last_reply_at: '回复时间排序',
    inserted_at: '发帖时间排序',
    is_hot: '热门排序',
    is_vote: '精品贴'
  },
  detail: {
    title: '帖子详情',
    replyBtn: '回复',
    author: '楼主',
    firstComment: '沙发',
    secondComment: '板凳',
    nthComment: '{nth}楼',
    showAuthorOnly: '只看楼主',
    showAll: '查看全部',
    addToFavorite: '收藏帖子',
    favoriting: '处理中...',
    delete: '删除',
    goBack: '回到顶部',
    deletePostTip: '确认删除帖子',
    deleteTip: '确认删除{nth}楼',
    removeFromFavorites: '取消收藏',
    closePost: '封贴',
    openPost: '解封',
    essencePost: '精品',
    unEssencePost: '取消',
    upPost: '置顶',
    unUpPost: '取消',
    operateSuccess: '操作成功'
  },
  newPost: {
    title: '发帖子',
    btnTitle: '发帖',
    preview: '预览',
    editView: '编辑',
    backAndEdit: '返回编辑',
    titlePlaceholder: '输入一个闪亮亮的钛合金标题吧 ！',
    textAreaPlaceHolder: '赶紧写帖子吐槽吧～～',
    requireTitle: '请输入标题',
    requireContent: '请输入内容',
    requireSection: '请选择发贴版块',
    addSuccess: '发帖成功',
    titleFilterFail: '标题中含有敏感词汇，请修改后重新提交',
    contentFilterFail: '内容中含有敏感词汇，请修改后重新提交',
    imageFilterFail: '图片违规，请修改后重新提交'
  },
  writeComment: {
    title: '回复',
    btnTitle: '回复',
    textAreaPlaceHolder: '赶紧写帖子吐槽吧～～',
    addSuccess: '回复成功',
    deleteTip: '确认取消收藏'
  },
  pagination: {
    previous: '上一页',
    next: '下一页'
  },
  personal: {
    title: '个人主页',
    nickname: '昵称 : ',
    postCount: '发帖数 : ',
    registerTime: '注册时间 : ',
    myPosts: '我的帖子',
    myComments: '我的回复',
    myFavor: '我的收藏',
    myBan: '我的封禁',
    cancelFavor: '取消收藏',
    newComment: '新回复',
    deleteBtn: '删除',
    reply: '回复：',
    originalPost: '原帖：',
    confirmDeArchive: '是否确认解封'
  },
  campaign: {
    title: '活动',
    gameCampaign: '游戏活动',
    gameNotice: '游戏公告',
    gameNews: '官方新闻'
  }
});

/***/ }),

/***/ 859:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forum__ = __webpack_require__(858);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_i18n_zh_hant_upload__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_i18n_zh_hant_common__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_i18n_zh_hant_error__ = __webpack_require__(186);





/* harmony default export */ __webpack_exports__["a"] = ({
  forum: __WEBPACK_IMPORTED_MODULE_0__forum__["a" /* default */],
  upload: __WEBPACK_IMPORTED_MODULE_1_common_i18n_zh_hant_upload__["a" /* default */],
  common: __WEBPACK_IMPORTED_MODULE_2_common_i18n_zh_hant_common__["a" /* default */],
  error: __WEBPACK_IMPORTED_MODULE_3_common_i18n_zh_hant_error__["a" /* default */]
});

/***/ }),

/***/ 860:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  postList: {
    title: '遊戲論壇',
    newPost: '發帖',
    all: '全部',
    discussion: '綜合討論',
    experience: '攻略心得',
    ras: '轉帖分享',
    original: '玩家原創',
    appeal: '問題求助',
    order: '{type}',
    top: '置頂',
    essence: '精',
    hot: '火'
  },
  search: {
    placeholder: '請輸入關鍵詞',
    btnTitle: '搜索帖子',
    searchHis: '歷史搜索記錄:',
    noSearchRecord: '暫無搜索記錄',
    noSearchResult: '暫無搜索結果',
    followSearchResult: '搜索結果如下:',
    clearHisRecord: '清空歷史搜索記錄'
  },
  orderType: {
    last_reply_at: '回复時間排序',
    inserted_at: '發帖時間排序',
    is_hot: '熱門排序',
    is_vote: '精品貼'
  },
  detail: {
    title: '帖子詳情',
    replyBtn: '回复',
    author: '樓主',
    firstComment: '沙發',
    secondComment: '板凳',
    nthComment: '{nth}樓',
    showAuthorOnly: '只看樓主',
    showAll: '查看全部',
    addToFavorite: '收藏帖子',
    favoriting: '處理中...',
    delete: '刪除',
    goBack: '回到頂部',
    deletePostTip: '確認刪除帖子',
    deleteTip: '確認刪除{nth}樓',
    removeFromFavorites: '取消收藏',
    closePost: '封貼',
    openPost: '解封',
    essencePost: '精品',
    unEssencePost: '取消',
    upPost: '置頂',
    unUpPost: '取消',
    operateSuccess: '操作成功'
  },
  newPost: {
    title: '發帖子',
    btnTitle: '發帖',
    preview: '預覽',
    editView: '編輯',
    backAndEdit: '返回編輯',
    titlePlaceholder: '輸入一個閃亮亮的鈦合金標題吧 ！ ',
    textAreaPlaceHolder: '趕緊寫帖子吐槽吧～～',
    requireTitle: '請輸入標題',
    requireContent: '請輸入內容',
    requireSection: '請選擇發貼版塊',
    addSuccess: '發帖成功'
  },
  writeComment: {
    title: '回复',
    btnTitle: '回复',
    textAreaPlaceHolder: '趕緊寫帖子吐槽吧～～',
    addSuccess: '回復成功',
    deleteTip: '確認取消收藏'
  },
  pagination: {
    previous: '上一頁',
    next: '下一頁'
  },
  personal: {
    title: '個人主頁',
    nickname: '暱稱 : ',
    postCount: '發帖數 : ',
    registerTime: '註冊時間 : ',
    myPosts: '我的帖子',
    myComments: '我的回复',
    myFavor: '我的收藏',
    myBan: '我的封禁',
    cancelFavor: '取消收藏',
    newComment: '新回复',
    deleteBtn: '刪除',
    reply: '回复：',
    originalPost: '原帖：',
    confirmDeArchive: '是否確認解封'
  },
  campaign: {
    title: '活動',
    gameCampaign: '遊戲活動',
    gameNotice: '遊戲公告',
    gameNews: '官方新聞'
  }
});

/***/ }),

/***/ 861:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forum__ = __webpack_require__(860);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_i18n_zh_hant_upload__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_i18n_zh_hant_common__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_i18n_zh_hant_error__ = __webpack_require__(186);





/* harmony default export */ __webpack_exports__["a"] = ({
  forum: __WEBPACK_IMPORTED_MODULE_0__forum__["a" /* default */],
  upload: __WEBPACK_IMPORTED_MODULE_1_common_i18n_zh_hant_upload__["a" /* default */],
  common: __WEBPACK_IMPORTED_MODULE_2_common_i18n_zh_hant_common__["a" /* default */],
  error: __WEBPACK_IMPORTED_MODULE_3_common_i18n_zh_hant_error__["a" /* default */]
});

/***/ }),

/***/ 862:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ([{
  path: '/forum/index',
  name: 'forumList',
  component: __webpack_require__(1913)
}, {
  path: '/forum/:forumId',
  name: 'forum',
  component: __webpack_require__(1493),
  children: [{
    path: 'index',
    name: 'postList',
    component: __webpack_require__(1914)
  }, {
    path: 'search',
    name: 'search',
    component: __webpack_require__(1500)
  }, {
    path: 'detail/:postId',
    name: 'detail',
    component: __webpack_require__(1498)
  }, {
    path: 'comment/:postId',
    name: 'newComment',
    component: __webpack_require__(1495)
  }, {
    path: 'newPost',
    name: 'newPost',
    component: __webpack_require__(1496)
  }, {
    path: 'preview',
    name: 'preview',
    component: __webpack_require__(1499)
  }, {
    path: 'personalPage',
    name: 'personalPage',
    component: __webpack_require__(1497)
  }, {
    path: 'myProfile',
    name: 'myProfile',
    component: __webpack_require__(1494)
  }]
}]);

/***/ }),

/***/ 863:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__forum_mobile__ = __webpack_require__(862);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }



/* harmony default export */ __webpack_exports__["a"] = (function (VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [].concat(_toConsumableArray(__WEBPACK_IMPORTED_MODULE_0__forum_mobile__["a" /* default */]))
  });
});

/***/ }),

/***/ 864:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_components_toast__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_i18n__ = __webpack_require__(571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);





var processResponse = function processResponse(result) {
  if (result.success) {
    return result;
  } else {
    if (result.i18n_message) {
      __WEBPACK_IMPORTED_MODULE_0_common_components_toast__["a" /* default */].show(__WEBPACK_IMPORTED_MODULE_1__vue_i18n__["a" /* i18n */].t(result.i18n_message, result.i18n_message_object));
    } else if (result.message) {
      __WEBPACK_IMPORTED_MODULE_0_common_components_toast__["a" /* default */].show(result.message);
    }

    switch (result.action) {
      case 'login':
        window.location = '/login?redirect_uri=' + btoa(window.location.href);
        break;

      default:
        break;
    }

    return Promise.resolve({
      success: false,
      i18n_message: result.i18n_message,
      i18n_message_object: result.i18n_message_object,
      message: result.message
    });
  }
};

var post = function post(uri, params, onProgress, cancelToken) {
  return __WEBPACK_IMPORTED_MODULE_2_axios___default.a.post(uri, params, {
    onUploadProgress: function onUploadProgress(e) {
      if (e.lengthComputable) {
        if (typeof onProgress === 'function') {
          onProgress(Math.abs(e.loaded / e.total));
        }
      }
    },

    cancelToken: cancelToken
  }).then(function (response) {
    return processResponse(response.data);
  }).catch(function (e) {
    if (__WEBPACK_IMPORTED_MODULE_2_axios___default.a.isCancel(e)) {
      console.log('Request canceled, uri: ' + uri);
    } else {
      __WEBPACK_IMPORTED_MODULE_0_common_components_toast__["a" /* default */].show(__WEBPACK_IMPORTED_MODULE_1__vue_i18n__["a" /* i18n */].t('error.server.networkError'));
    }
    return Promise.resolve({
      success: false
    });
  });
};

/* harmony default export */ __webpack_exports__["a"] = ({
  install: function install(Vue, options) {
    Vue.prototype.$acs = {
      tokens: {},

      getPagedForums: function getPagedForums() {
        return post('/forum_actions/get_paged_forums', {});
      },


      cancelGetPagedPost: function cancelGetPagedPost() {
        if (typeof this.tokens.getPagedPost === 'function') {
          this.tokens.getPagedPost();
        }
      },

      getPagedPost: function getPagedPost(params) {
        var _this = this;

        var cancelToken = new __WEBPACK_IMPORTED_MODULE_2_axios___default.a.CancelToken(function (c) {
          return _this.tokens.getPagedPost = c;
        });
        return post('/forum_actions/get_paged_post', params, undefined, cancelToken);
      },

      getForumInfo: function getForumInfo(forum_id) {
        return post('/forum_actions/get_forum_info', {
          forum_id: forum_id
        });
      },
      addPost: function addPost(params) {
        return post('/forum_actions/add_post', params);
      },
      addComment: function addComment(params) {
        return post('/forum_actions/add_comment', params);
      },
      getPostDetail: function getPostDetail(post_id) {
        return post('/forum_actions/get_post_detail', {
          post_id: post_id
        });
      },
      deleteComment: function deleteComment(comment_id, forum_id) {
        return post('/forum_actions/delete_comment', {
          comment_id: comment_id,
          forum_id: forum_id
        });
      },
      togglePostFavorite: function togglePostFavorite(post_id) {
        return post('/forum_actions/toggle_post_favorite', {
          post_id: post_id
        });
      },
      togglePostStatus: function togglePostStatus(params) {
        return post('/forum_actions/toggle_post_status', params);
      },
      getPostComments: function getPostComments(post_id, page, author_id, records_per_page) {
        return post('/forum_actions/get_post_comments', {
          post_id: post_id,
          page: page,
          author_id: author_id,
          records_per_page: records_per_page
        });
      },
      getUserPostCount: function getUserPostCount(forum_id) {
        return post('/forum_actions/get_user_post_count', {
          forum_id: forum_id
        });
      },


      cancelGetUserPagedPost: function cancelGetUserPagedPost() {
        if (typeof this.tokens.getUserPagedPost === 'function') {
          this.tokens.getUserPagedPost();
        }
      },

      getUserPagedPost: function getUserPagedPost(forum_id, page, records_per_page) {
        var _this2 = this;

        var cancelToken = new __WEBPACK_IMPORTED_MODULE_2_axios___default.a.CancelToken(function (c) {
          return _this2.tokens.getUserPagedPost = c;
        });
        return post('/forum_actions/get_user_paged_post', {
          forum_id: forum_id,
          page: page,
          records_per_page: records_per_page
        }, undefined, cancelToken);
      },

      cancelGetUserPostComments: function cancelGetUserPostComments() {
        if (typeof this.tokens.getUserPostComments === 'function') {
          this.tokens.getUserPostComments();
        }
      },

      getUserPostComments: function getUserPostComments(forum_id, page, records_per_page) {
        var _this3 = this;

        var cancelToken = new __WEBPACK_IMPORTED_MODULE_2_axios___default.a.CancelToken(function (c) {
          return _this3.tokens.getUserPostComments = c;
        });
        return post('/forum_actions/get_user_post_comments', {
          forum_id: forum_id,
          page: page,
          records_per_page: records_per_page
        }, undefined, cancelToken);
      },

      cancelGetUserPostFavorites: function cancelGetUserPostFavorites() {
        if (typeof this.tokens.getUserPostFavorites === 'function') {
          this.tokens.getUserPostFavorites();
        }
      },

      getUserPostFavorites: function getUserPostFavorites(forum_id, page, records_per_page) {
        var _this4 = this;

        var cancelToken = new __WEBPACK_IMPORTED_MODULE_2_axios___default.a.CancelToken(function (c) {
          return _this4.tokens.getUserPostFavorites = c;
        });
        return post('/forum_actions/get_user_favorites', {
          forum_id: forum_id,
          page: page,
          records_per_page: records_per_page
        }, undefined, cancelToken);
      },

      cancelGetPagedBanPost: function cancelGetPagedBanPost() {
        if (typeof this.tokens.getPagedBanPost === 'function') {
          this.tokens.getPagedBanPost();
        }
      },

      getPagedBanPost: function getPagedBanPost(forum_id, page, records_per_page) {
        var _this5 = this;

        var cancelToken = new __WEBPACK_IMPORTED_MODULE_2_axios___default.a.CancelToken(function (c) {
          return _this5.tokens.getPagedBanPost = c;
        });
        return post('/forum_actions/get_paged_ban_post', {
          forum_id: forum_id,
          page: page,
          records_per_page: records_per_page
        }, undefined, cancelToken);
      },

      search: function search(forum_id, keyword, page, records_per_page) {
        return post('/forum_actions/search', {
          forum_id: forum_id,
          keyword: keyword,
          page: page,
          records_per_page: records_per_page
        });
      },
      addContact: function addContact(app_id, title) {
        return post('/customer_service_actions/add_contact', {
          app_id: app_id,
          title: title
        });
      },
      alipayRedirect: function alipayRedirect(payment_order_id, merchant_url, callback_url) {
        return post('/api/pay/alipay/redirect', {
          payment_order_id: payment_order_id,
          merchant_url: merchant_url,
          callback_url: callback_url
        });
      },
      alipayMallRedirect: function alipayMallRedirect(payment_order_id, merchant_url, callback_url, notify_url) {
        return post('/api/pay/alipay/mall_redirect', {
          payment_order_id: payment_order_id,
          merchant_url: merchant_url,
          callback_url: callback_url,
          notify_url: notify_url
        });
      },
      wechatPrepay: function wechatPrepay(payment_order_id) {
        return post('/api/pay/wechat/prepay', {
          payment_order_id: payment_order_id
        });
      },
      wechatMallPrepay: function wechatMallPrepay(payment_order_id) {
        return post('/api/pay/wechat/mallprepay', {
          payment_order_id: payment_order_id
        });
      },
      getPagedNews: function getPagedNews(app_id, group, page, records_per_page) {
        return post('/games_actions/get_paged_news', {
          app_id: app_id,
          group: group,
          page: page,
          records_per_page: records_per_page
        });
      },
      getNewsDetail: function getNewsDetail(news_id) {
        return post('/games_actions/get_news_detail', {
          news_id: news_id
        });
      },
      getTopNews: function getTopNews(app_id, limit) {
        return post('/games_actions/get_top_news', {
          app_id: app_id,
          limit: limit
        });
      },
      getApps: function getApps() {
        return post('/games_actions/fetch_apps', {});
      },


      cancelGetServicePaged: function cancelGetServicePaged() {
        if (typeof this.tokens.getServicePaged === 'function') {
          this.tokens.getServicePaged();
        }
      },

      getServicePaged: function getServicePaged(app_id, page, records_per_page) {
        var _this6 = this;

        var cancelToken = new __WEBPACK_IMPORTED_MODULE_2_axios___default.a.CancelToken(function (c) {
          return _this6.tokens.getServicePaged = c;
        });
        return post('/customer_service_actions/get_paged_services', {
          app_id: app_id,
          page: page,
          records_per_page: records_per_page
        }, undefined, cancelToken);
      },

      getCommonIssues: function getCommonIssues(app_id) {
        return post('/customer_service_actions/get_common_issues', {
          app_id: app_id
        });
      },


      cancelSearchQuestion: function cancelSearchQuestion() {
        if (typeof this.tokens.searchQuestion === 'function') {
          this.tokens.searchQuestion();
        }
      },

      searchQuestion: function searchQuestion(app_id, keyword, page, records_per_page) {
        var _this7 = this;

        var cancelToken = new __WEBPACK_IMPORTED_MODULE_2_axios___default.a.CancelToken(function (c) {
          return _this7.tokens.searchQuestion = c;
        });
        return post('/customer_service_actions/search', {
          app_id: app_id,
          keyword: keyword,
          page: page,
          records_per_page: records_per_page
        }, undefined, cancelToken);
      },

      getAppDetail: function getAppDetail(app_id) {
        return post('/customer_service_actions/get_app_detail', {
          app_id: app_id
        });
      },


      cancelGetActiveGoodsPaged: function cancelGetActiveGoodsPaged() {
        if (typeof this.tokens.getActiveGoodsPaged === 'function') {
          this.tokens.getActiveGoodsPaged();
        }
      },

      getActiveGoodsPaged: function getActiveGoodsPaged(app_id, page, records_per_page) {
        var _this8 = this;

        var cancelToken = new __WEBPACK_IMPORTED_MODULE_2_axios___default.a.CancelToken(function (c) {
          return _this8.tokens.getActiveGoodsPaged = c;
        });
        return post('/mall_actions/get_active_goods_paged', {
          app_id: app_id,
          page: page,
          records_per_page: records_per_page
        }, undefined, cancelToken);
      },

      getMallDetail: function getMallDetail(app_id) {
        return post('/mall_actions/get_mall_detail', {
          app_id: app_id
        });
      },
      getGoodsDetail: function getGoodsDetail(goods_id) {
        return post('/mall_actions/get_goods_detail', {
          goods_id: goods_id
        });
      },
      sendBindMobileVerifyCode: function sendBindMobileVerifyCode(mobile) {
        return post("/send_mobile_bind_verify_code", { mobile: mobile });
      },
      createMallOrder: function createMallOrder(goods_id, quantity, pay_type, address) {
        return post('/mall_actions/create_mall_order', {
          goods_id: goods_id,
          quantity: quantity,
          pay_type: pay_type,
          address: address
        });
      },
      updateUserMobileNumber: function updateUserMobileNumber(params) {
        return post("/user/update_mobile", params);
      },
      sendBindEmailVerifyCode: function sendBindEmailVerifyCode(email) {
        return post("/send_email_bind_verify_code", { email: email });
      },
      updateUserEmail: function updateUserEmail(params) {
        return post("/user/update_email", params);
      },
      updateUserNickname: function updateUserNickname(params) {
        return post("/user/update_nickname", params);
      },
      updateUserResidentInfo: function updateUserResidentInfo(params) {
        return post("/user/update_resident_info", params);
      },
      updateUserAvatar: function updateUserAvatar(params, onProgress) {
        return post("/user/update_avatar", params, onProgress);
      },
      uploadPostImage: function uploadPostImage(params, onProgress) {
        return post("/forum_actions/upload_post_image", params, onProgress);
      },
      uploadCommentImage: function uploadCommentImage(params, onProgress) {
        return post("/forum_actions/upload_comment_image", params, onProgress);
      },


      cancelfetchMyOrders: function cancelfetchMyOrders() {
        if (typeof this.tokens.fetchMyOrders === 'function') {
          this.tokens.fetchMyOrders();
        }
      },

      fetchMyOrders: function fetchMyOrders(type, page, records_per_page) {
        var _this9 = this;

        var cancelToken = new __WEBPACK_IMPORTED_MODULE_2_axios___default.a.CancelToken(function (c) {
          return _this9.tokens.fetchMyOrders = c;
        });
        return post('/mall_actions/fetch_my_orders', {
          type: type,
          page: page,
          records_per_page: records_per_page
        }, undefined, cancelToken);
      },

      confirmRecieved: function confirmRecieved(params) {
        return post('/mall_actions/confirm_recieved', params);
      },
      fetchMallOrder: function fetchMallOrder(params) {
        return post('/mall_actions/fetch_order', params);
      },
      getGoodsStock: function getGoodsStock(goods_id) {
        return post('/mall_actions/get_goods_stock', { goods_id: goods_id });
      },
      getUserAddresses: function getUserAddresses() {
        return post('/mall_actions/get_user_addresses', {});
      },
      deleteAddress: function deleteAddress(address_id) {
        return post('/mall_actions/delete_address', {
          address_id: address_id
        });
      },
      setDefaultAddress: function setDefaultAddress(address_id) {
        return post('/mall_actions/set_default_address', {
          address_id: address_id
        });
      },
      getAddressDetail: function getAddressDetail(address_id) {
        return post('/mall_actions/get_address_detail', {
          address_id: address_id
        });
      },
      getDefaultAddress: function getDefaultAddress() {
        return post('/mall_actions/get_default_address', {});
      },
      insertAddress: function insertAddress(params) {
        return post('/mall_actions/insert_address', params);
      },
      updateAddress: function updateAddress(params) {
        return post('/mall_actions/update_address', params);
      }
    };
  }
});

/***/ }),

/***/ 865:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCurrentSectionId", function() { return setCurrentSectionId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCurrentPostTitle", function() { return setCurrentPostTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPostsOrderByField", function() { return setPostsOrderByField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addSearchHistory", function() { return addSearchHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetPostEditingData", function() { return resetPostEditingData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearSearchHistory", function() { return clearSearchHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUserProfile", function() { return setUserProfile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateUserMobile", function() { return updateUserMobile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateUserEmail", function() { return updateUserEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateUserNickname", function() { return updateUserNickname; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateUserAvatar", function() { return updateUserAvatar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateUserResidentInfo", function() { return updateUserResidentInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateUserPostCount", function() { return updateUserPostCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decrUserPostCount", function() { return decrUserPostCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCommonIssues", function() { return setCommonIssues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateForumInfo", function() { return updateForumInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateShoppingCart", function() { return updateShoppingCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSelectedAddress", function() { return updateSelectedAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSelectedGoods", function() { return updateSelectedGoods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSelectedOrder", function() { return updateSelectedOrder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_utils__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mutationTypes__ = __webpack_require__(406);




var setCurrentSectionId = function setCurrentSectionId(_ref, sectionId) {
  var commit = _ref.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["a" /* SET_CURRENT_SECTION_ID */], sectionId);
};

var setCurrentPostTitle = function setCurrentPostTitle(_ref2, title) {
  var commit = _ref2.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["b" /* SET_CURRENT_POST_TITLE */], title);
};

var setPostsOrderByField = function setPostsOrderByField(_ref3, fieldName) {
  var commit = _ref3.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["c" /* SET_POSTS_ORDER_BY_FIELD */], fieldName);
};

var addSearchHistory = function addSearchHistory(_ref4, key) {
  var commit = _ref4.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["n" /* ADD_SEARCH_HISTORY */], key);
};

var resetPostEditingData = function resetPostEditingData(_ref5) {
  var commit = _ref5.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["e" /* RESET_POST_EDITING_DATA */]);
};

var clearSearchHistory = function clearSearchHistory(_ref6, key) {
  var commit = _ref6.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["o" /* CLEAR_SEARCH_HISTORY */], key);
};

var setUserProfile = function setUserProfile(_ref7, user) {
  var commit = _ref7.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["f" /* SET_USER_PROFILE */], user);
};

var updateUserMobile = function updateUserMobile(_ref8, mobile) {
  var commit = _ref8.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["g" /* UPDATE_USER_MOBILE */], mobile);
};

var updateUserEmail = function updateUserEmail(_ref9, email) {
  var commit = _ref9.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["h" /* UPDATE_USER_EMAIL */], email);
};

var updateUserNickname = function updateUserNickname(_ref10, nickname) {
  var commit = _ref10.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["i" /* UPDATE_USER_NICKNAME */], nickname);
};

var updateUserAvatar = function updateUserAvatar(_ref11, avatar_url) {
  var commit = _ref11.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["j" /* UPDATE_USER_AVATAR */], avatar_url);
};

var updateUserResidentInfo = function updateUserResidentInfo(_ref12, residentInfo) {
  var commit = _ref12.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["k" /* UPDATE_USER_RESIDENT_INFO */], residentInfo);
};

var updateUserPostCount = function updateUserPostCount(_ref13, postCount) {
  var commit = _ref13.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["l" /* UPDATE_USER_POST_COUNT */], postCount);
};

var decrUserPostCount = function decrUserPostCount(_ref14) {
  var commit = _ref14.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["m" /* DECR_USER_POST_COUNT */]);
};

var setCommonIssues = function setCommonIssues(_ref15, issues) {
  var commit = _ref15.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["q" /* SET_COMMON_ISSUES */], issues);
};

var updateForumInfo = function updateForumInfo(_ref16, forum) {
  var commit = _ref16.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["d" /* UPDATE_FORUM_INFO */], forum);
};

var updateShoppingCart = function updateShoppingCart(_ref17, goodsItem) {
  var commit = _ref17.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["r" /* UPDATE_MALL_SHOPPINGCART */], goodsItem);
};

var updateSelectedAddress = function updateSelectedAddress(_ref18, userAddress) {
  var commit = _ref18.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["s" /* UPDATE_SELECTED_ADDRESS */], userAddress);
};
var updateSelectedGoods = function updateSelectedGoods(_ref19, goods) {
  var commit = _ref19.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["t" /* UPDATE_SELECTED_GOODS */], goods);
};
var updateSelectedOrder = function updateSelectedOrder(_ref20, order) {
  var commit = _ref20.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["u" /* UPDATE_SELECTED_ORDER */], order);
};

/***/ }),

/***/ 866:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transitionName", function() { return transitionName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentSectionId", function() { return currentSectionId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postsOrderByField", function() { return postsOrderByField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchKeywordHistory", function() { return searchKeywordHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userInfo", function() { return userInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commonIssues", function() { return commonIssues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forumInfo", function() { return forumInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentPostTitle", function() { return currentPostTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editingPostData", function() { return editingPostData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shoppingCart", function() { return shoppingCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedAddress", function() { return selectedAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedGoods", function() { return selectedGoods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedOrder", function() { return selectedOrder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var transitionName = function transitionName(state) {
  return state.app.transitionName;
};
var currentSectionId = function currentSectionId(state) {
  return state.forum.currentSectionId;
};
var postsOrderByField = function postsOrderByField(state) {
  return state.forum.postsOrderByField;
};
var searchKeywordHistory = function searchKeywordHistory(state) {
  return state.search.historyKeywords;
};
var userInfo = function userInfo(state) {
  return state.user;
};
var commonIssues = function commonIssues(state) {
  return state.commonIssues.issues;
};
var forumInfo = function forumInfo(state) {
  return state.forum.info;
};
var currentPostTitle = function currentPostTitle(state) {
  return state.forum.currentPostTitle;
};
var editingPostData = function editingPostData(state) {
  return state.forum.editingPostData;
};
var shoppingCart = function shoppingCart(state) {
  return state.mall.shoppingCart;
};
var selectedAddress = function selectedAddress(state) {
  return state.mall.selectedAddress;
};
var selectedGoods = function selectedGoods(state) {
  return state.mall.selectedGoods;
};
var selectedOrder = function selectedOrder(state) {
  return state.mall.selectedOrder;
};



/***/ }),

/***/ 867:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(865);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getters__ = __webpack_require__(866);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_app__ = __webpack_require__(868);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_search__ = __webpack_require__(870);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_user__ = __webpack_require__(871);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_forum__ = __webpack_require__(869);











__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* default */]);

var store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* default */].Store({
  strict: false,
  actions: __WEBPACK_IMPORTED_MODULE_2__actions__,
  getters: __WEBPACK_IMPORTED_MODULE_3__getters__,
  modules: {
    app: __WEBPACK_IMPORTED_MODULE_4__modules_app__["a" /* default */],
    search: __WEBPACK_IMPORTED_MODULE_5__modules_search__["a" /* default */],
    user: __WEBPACK_IMPORTED_MODULE_6__modules_user__["a" /* default */],
    forum: __WEBPACK_IMPORTED_MODULE_7__modules_forum__["a" /* default */]
  },
  mutations: {}
});

/* harmony default export */ __webpack_exports__["a"] = (store);

/***/ }),

/***/ 868:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutationTypes__ = __webpack_require__(406);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = {
  transitionName: 'slide-left'
};

var mutations = _defineProperty({}, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["p" /* SET_TRANSITION_NAME */], function (state, transitionName) {
  state.transitionName = transitionName;
});

/* harmony default export */ __webpack_exports__["a"] = ({
  state: state,
  mutations: mutations
});

/***/ }),

/***/ 869:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutationTypes__ = __webpack_require__(406);
var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = {
  info: {},
  currentSectionId: 0,
  currentPostTitle: '',
  postsOrderByField: 'inserted_at',
  editingPostData: {
    id: undefined,
    title: '',
    content: '',
    selectedSectionId: 0,
    sectionTitle: ''
  }
};

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["a" /* SET_CURRENT_SECTION_ID */], function (state, sectionId) {
  state.currentSectionId = sectionId;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["b" /* SET_CURRENT_POST_TITLE */], function (state, title) {
  state.currentPostTitle = title;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["c" /* SET_POSTS_ORDER_BY_FIELD */], function (state, fieldName) {
  state.postsOrderByField = fieldName;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["d" /* UPDATE_FORUM_INFO */], function (state, forum) {
  state.info = forum;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["e" /* RESET_POST_EDITING_DATA */], function (state) {
  state.editingPostData.id = null;
  state.editingPostData.title = '';
  state.editingPostData.content = '';
  state.editingPostData.selectedSectionId = 0;
  state.editingPostData.sectionTitle = '';
}), _mutations);

/* harmony default export */ __webpack_exports__["a"] = ({
  state: state,
  mutations: mutations
});

/***/ }),

/***/ 870:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutationTypes__ = __webpack_require__(406);
var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var storage_search_history = '_acs_forum_search_historys_';

function restoreSearchHistorys() {
  var storageData = localStorage.getItem(storage_search_history);
  if (storageData) {
    return JSON.parse(storageData);
  } else {
    return [];
  }
}

var state = {
  historyKeywords: restoreSearchHistorys()
};

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["n" /* ADD_SEARCH_HISTORY */], function (state, keyword) {
  if (keyword) {
    var historyKeywords = state.historyKeywords.filter(function (v) {
      return v != keyword;
    });
    historyKeywords.unshift(keyword);

    if (historyKeywords.length > 8) {
      historyKeywords.pop();
    }

    state.historyKeywords = historyKeywords;
    localStorage.setItem(storage_search_history, JSON.stringify(state.historyKeywords));
  }
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["o" /* CLEAR_SEARCH_HISTORY */], function (state) {
  state.historyKeywords = [];
  localStorage.removeItem(storage_search_history);
}), _mutations);

/* harmony default export */ __webpack_exports__["a"] = ({
  state: state,
  mutations: mutations
});

/***/ }),

/***/ 871:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutationTypes__ = __webpack_require__(406);
var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = {
  id: 0,
  nickname: '',
  avatar_url: '',
  inserted_at: '',
  email: '',
  mobile: '',
  resident_id: '',
  resident_name: '',
  nil_password: false,
  post_count: 0
};

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["f" /* SET_USER_PROFILE */], function (state, user) {
  state.id = user.id;
  state.nickname = user.nickname;
  state.avatar_url = user.avatar_url;
  state.inserted_at = user.inserted_at;
  state.nil_password = user.nil_password;

  if (user.mobile) {
    state.mobile = user.mobile;
  }

  if (user.email) {
    state.email = user.email;
  }

  if (user.resident_id) {
    state.resident_id = user.resident_id;
  }

  if (user.resident_name) {
    state.resident_name = user.resident_name;
  }
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["g" /* UPDATE_USER_MOBILE */], function (state, mobile) {
  state.mobile = mobile;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["h" /* UPDATE_USER_EMAIL */], function (state, email) {
  state.email = email;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["i" /* UPDATE_USER_NICKNAME */], function (state, nickname) {
  state.nickname = nickname;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["j" /* UPDATE_USER_AVATAR */], function (state, avatar_url) {
  state.avatar_url = avatar_url;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["k" /* UPDATE_USER_RESIDENT_INFO */], function (state, residentInfo) {
  state.resident_id = residentInfo.resident_id;
  state.resident_name = residentInfo.resident_name;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["l" /* UPDATE_USER_POST_COUNT */], function (state, post_count) {
  state.post_count = post_count;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["m" /* DECR_USER_POST_COUNT */], function (state) {
  state.post_count = state.post_count - 1;
}), _mutations);

/* harmony default export */ __webpack_exports__["a"] = ({
  state: state,
  mutations: mutations
});

/***/ })

},[1700]);
//# sourceMappingURL=forum.js.map