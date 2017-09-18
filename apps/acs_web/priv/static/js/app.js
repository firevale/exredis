webpackJsonp([1],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_axios__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_timeago__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_timeago___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_timeago__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_i18n__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuelidate__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuelidate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_vuelidate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_common_components_vue_touch__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vue_lazyload__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vue_lazyload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_vue_lazyload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__serverApi__ = __webpack_require__(790);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_vue_preview__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_common_components_quillEditor__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_common_components_quillEditor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_common_components_quillEditor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_common_js_acs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_common_components_quillContent__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_common_components_scroller__ = __webpack_require__(488);
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
    'zh-CN': __webpack_require__(507)
  }
});




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('quill-content', __WEBPACK_IMPORTED_MODULE_13_common_components_quillContent__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue___default.a.component('scroller', __WEBPACK_IMPORTED_MODULE_14_common_components_scroller___default.a);

__WEBPACK_IMPORTED_MODULE_2_axios___default.a.defaults.headers.common['x-csrf-token'] = window.acsConfig.csrfToken;
__WEBPACK_IMPORTED_MODULE_2_axios___default.a.defaults.headers.common['acs-app-id'] = __WEBPACK_IMPORTED_MODULE_12_common_js_acs__["b" /* getAppId */]();
__WEBPACK_IMPORTED_MODULE_2_axios___default.a.defaults.headers.common['acs-device-id'] = __WEBPACK_IMPORTED_MODULE_12_common_js_acs__["c" /* getDeviceId */]();

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0_vue___default.a);

/***/ }),

/***/ 1123:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1127:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1129:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1137:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1143:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1146:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1153:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1155:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1157:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 1276:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(908),
  /* template */
  __webpack_require__(1547),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/components/menuModal/menuModal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] menuModal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a3dd04b6", Component.options)
  } else {
    hotAPI.reload("data-v-a3dd04b6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1277:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(909),
  /* template */
  __webpack_require__(1496),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/components/myCommentListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] myCommentListItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-63287edc", Component.options)
  } else {
    hotAPI.reload("data-v-63287edc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1278:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(910),
  /* template */
  __webpack_require__(1454),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/components/myFavoriteListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] myFavoriteListItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d46759e", Component.options)
  } else {
    hotAPI.reload("data-v-3d46759e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1279:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(911),
  /* template */
  __webpack_require__(1420),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/components/myPostListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] myPostListItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-19d25435", Component.options)
  } else {
    hotAPI.reload("data-v-19d25435", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1280:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(912),
  /* template */
  __webpack_require__(1467),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/components/newsDetailView.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] newsDetailView.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4511f2a1", Component.options)
  } else {
    hotAPI.reload("data-v-4511f2a1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1281:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(913),
  /* template */
  __webpack_require__(1466),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/components/orderItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] orderItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-44d096d9", Component.options)
  } else {
    hotAPI.reload("data-v-44d096d9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1282:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(914),
  /* template */
  __webpack_require__(1536),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/components/pagination.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pagination.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8a7e701c", Component.options)
  } else {
    hotAPI.reload("data-v-8a7e701c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1283:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(915),
  /* template */
  __webpack_require__(1576),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/components/postCommentView.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] postCommentView.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e6804288", Component.options)
  } else {
    hotAPI.reload("data-v-e6804288", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1284:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(916),
  /* template */
  __webpack_require__(1508),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/components/postDetailView.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] postDetailView.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f2754a4", Component.options)
  } else {
    hotAPI.reload("data-v-6f2754a4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1285:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(920),
  /* template */
  __webpack_require__(1505),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/account/editEmail.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] editEmail.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c3b9cee", Component.options)
  } else {
    hotAPI.reload("data-v-6c3b9cee", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1286:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(921),
  /* template */
  __webpack_require__(1477),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/account/editMobile.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] editMobile.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-50d3ecc0", Component.options)
  } else {
    hotAPI.reload("data-v-50d3ecc0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1287:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(922),
  /* template */
  __webpack_require__(1525),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/account/editNickname.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] editNickname.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-794eb50c", Component.options)
  } else {
    hotAPI.reload("data-v-794eb50c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1288:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(923),
  /* template */
  __webpack_require__(1435),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/account/editResident.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] editResident.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-27e618ee", Component.options)
  } else {
    hotAPI.reload("data-v-27e618ee", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1289:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(924),
  /* template */
  __webpack_require__(1427),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/account/main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-20a9e4a6", Component.options)
  } else {
    hotAPI.reload("data-v-20a9e4a6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1290:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(925),
  /* template */
  __webpack_require__(1449),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/account/myProfile.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] myProfile.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-36fdc619", Component.options)
  } else {
    hotAPI.reload("data-v-36fdc619", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1291:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(926),
  /* template */
  __webpack_require__(1445),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/bbs/error.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] error.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-34bdb7ca", Component.options)
  } else {
    hotAPI.reload("data-v-34bdb7ca", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1292:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(927),
  /* template */
  __webpack_require__(1568),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/bbs/forum.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] forum.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c955833a", Component.options)
  } else {
    hotAPI.reload("data-v-c955833a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1293:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(928),
  /* template */
  __webpack_require__(1575),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/bbs/main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e639a132", Component.options)
  } else {
    hotAPI.reload("data-v-e639a132", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1294:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(929),
  /* template */
  __webpack_require__(1395),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/bbs/newComment.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] newComment.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0680f266", Component.options)
  } else {
    hotAPI.reload("data-v-0680f266", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1295:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(930),
  /* template */
  __webpack_require__(1404),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/bbs/newPost.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] newPost.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0f4084bc", Component.options)
  } else {
    hotAPI.reload("data-v-0f4084bc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1296:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1143)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(931),
  /* template */
  __webpack_require__(1483),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/bbs/personalPage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] personalPage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5366859d", Component.options)
  } else {
    hotAPI.reload("data-v-5366859d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1297:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(932),
  /* template */
  __webpack_require__(1526),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/bbs/postDetail.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] postDetail.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a944b82", Component.options)
  } else {
    hotAPI.reload("data-v-7a944b82", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1298:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(933),
  /* template */
  __webpack_require__(1537),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/bbs/postList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] postList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8cbcfce8", Component.options)
  } else {
    hotAPI.reload("data-v-8cbcfce8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1299:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(934),
  /* template */
  __webpack_require__(1524),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/bbs/postPreview.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] postPreview.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-783e656c", Component.options)
  } else {
    hotAPI.reload("data-v-783e656c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1300:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(935),
  /* template */
  __webpack_require__(1473),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/bbs/search.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] search.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4c8b1b54", Component.options)
  } else {
    hotAPI.reload("data-v-4c8b1b54", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1301:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(936),
  /* template */
  __webpack_require__(1441),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/customerService/commonIssues.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] commonIssues.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2f917222", Component.options)
  } else {
    hotAPI.reload("data-v-2f917222", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1302:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(937),
  /* template */
  __webpack_require__(1451),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/customerService/contactService.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] contactService.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3816ac5f", Component.options)
  } else {
    hotAPI.reload("data-v-3816ac5f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1303:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(938),
  /* template */
  __webpack_require__(1516),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/customerService/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-73f60858", Component.options)
  } else {
    hotAPI.reload("data-v-73f60858", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1304:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(939),
  /* template */
  __webpack_require__(1419),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/customerService/myService.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] myService.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1970ec6f", Component.options)
  } else {
    hotAPI.reload("data-v-1970ec6f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1305:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(940),
  /* template */
  __webpack_require__(1450),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/games/error.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] error.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3806ab58", Component.options)
  } else {
    hotAPI.reload("data-v-3806ab58", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1306:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(941),
  /* template */
  __webpack_require__(1439),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/games/gameActivity.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] gameActivity.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2f453cfe", Component.options)
  } else {
    hotAPI.reload("data-v-2f453cfe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1307:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(942),
  /* template */
  __webpack_require__(1440),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/games/gameNews.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] gameNews.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2f833445", Component.options)
  } else {
    hotAPI.reload("data-v-2f833445", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1308:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1137)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(943),
  /* template */
  __webpack_require__(1448),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/games/gameNotice.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] gameNotice.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-36f3074a", Component.options)
  } else {
    hotAPI.reload("data-v-36f3074a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1309:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(944),
  /* template */
  __webpack_require__(1394),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/games/list.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] list.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-02877b04", Component.options)
  } else {
    hotAPI.reload("data-v-02877b04", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1310:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1155)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(945),
  /* template */
  __webpack_require__(1548),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/games/main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a3f2dbce", Component.options)
  } else {
    hotAPI.reload("data-v-a3f2dbce", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1311:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(947),
  /* template */
  __webpack_require__(1472),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/mall/editAddress.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] editAddress.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4aa27161", Component.options)
  } else {
    hotAPI.reload("data-v-4aa27161", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1312:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(948),
  /* template */
  __webpack_require__(1474),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/mall/goodsDetail.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] goodsDetail.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4d5f70c4", Component.options)
  } else {
    hotAPI.reload("data-v-4d5f70c4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1313:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(949),
  /* template */
  __webpack_require__(1510),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/mall/goodsList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] goodsList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7065baab", Component.options)
  } else {
    hotAPI.reload("data-v-7065baab", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1314:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(950),
  /* template */
  __webpack_require__(1423),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/mall/goodsSnapshots.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] goodsSnapshots.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1d7e50f2", Component.options)
  } else {
    hotAPI.reload("data-v-1d7e50f2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1315:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(951),
  /* template */
  __webpack_require__(1541),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/mall/main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9750811c", Component.options)
  } else {
    hotAPI.reload("data-v-9750811c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1316:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1146)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(952),
  /* template */
  __webpack_require__(1497),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6393010c",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/mall/mine.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] mine.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6393010c", Component.options)
  } else {
    hotAPI.reload("data-v-6393010c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1317:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(953),
  /* template */
  __webpack_require__(1494),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/mall/myAddresses.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] myAddresses.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-613d942d", Component.options)
  } else {
    hotAPI.reload("data-v-613d942d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1318:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(954),
  /* template */
  __webpack_require__(1410),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/mall/myOrders.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] myOrders.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-13a6b0ea", Component.options)
  } else {
    hotAPI.reload("data-v-13a6b0ea", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1319:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(955),
  /* template */
  __webpack_require__(1540),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/mall/newAddress.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] newAddress.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-961904a6", Component.options)
  } else {
    hotAPI.reload("data-v-961904a6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1320:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(956),
  /* template */
  __webpack_require__(1491),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/mall/order.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] order.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5e406936", Component.options)
  } else {
    hotAPI.reload("data-v-5e406936", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1321:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(957),
  /* template */
  __webpack_require__(1584),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/mall/orderDetail.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] orderDetail.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fe1ebcd4", Component.options)
  } else {
    hotAPI.reload("data-v-fe1ebcd4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1322:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(958),
  /* template */
  __webpack_require__(1476),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/mall/selectAddress.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] selectAddress.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4e2aeb6f", Component.options)
  } else {
    hotAPI.reload("data-v-4e2aeb6f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1323:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(959),
  /* template */
  __webpack_require__(1582),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/payment/main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f721ac18", Component.options)
  } else {
    hotAPI.reload("data-v-f721ac18", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1324:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(960),
  /* template */
  __webpack_require__(1430),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/payment/selectPaymentChannel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] selectPaymentChannel.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-26ae8674", Component.options)
  } else {
    hotAPI.reload("data-v-26ae8674", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 1326:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1153)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(963),
  /* template */
  __webpack_require__(1528),
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

/***/ 1388:
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
     require("vue-hot-reload-api").rerender("data-v-0013e14c", module.exports)
  }
}

/***/ }),

/***/ 1394:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor is-vertical root-container"
  }, [_c('div', {
    staticClass: "columns is-multiline"
  }, _vm._l((_vm.appList), function(app) {
    return _c('article', {
      staticClass: "tile is-child notification",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.showGames(app.id)
        }
      }
    }, [_c('div', {
      staticClass: "tile is-parent"
    }, [_c('div', {
      staticClass: "tile is-vertical is-child"
    }, [_c('img', {
      attrs: {
        "src": app.icon ? (app.icon | _vm.imageStaticUrl) : 'https://placehold.it/64x64?text=128x128'
      }
    }), _vm._v(" "), _c('h2', {
      staticStyle: {
        "font-weight": "bold"
      }
    }, [_vm._v(" " + _vm._s(app.name) + " ")])])])])
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-02877b04", module.exports)
  }
}

/***/ }),

/***/ 1395:
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
     require("vue-hot-reload-api").rerender("data-v-0680f266", module.exports)
  }
}

/***/ }),

/***/ 1398:
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
     require("vue-hot-reload-api").rerender("data-v-091e8a69", module.exports)
  }
}

/***/ }),

/***/ 1404:
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
     require("vue-hot-reload-api").rerender("data-v-0f4084bc", module.exports)
  }
}

/***/ }),

/***/ 1410:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my-orders"
  }, [_c('slider-nav', {
    ref: "nav",
    staticClass: "flex-fixed-size",
    attrs: {
      "menus": _vm.menus,
      "selectedValue": _vm.type
    },
    on: {
      "onSelect": _vm.switchMenu
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "flex-take-rest",
    staticStyle: {
      "position": "relative"
    }
  }, [_c('scroller', {
    ref: "scroller",
    attrs: {
      "on-load-more": _vm.loadmore
    }
  }, _vm._l((_vm.orders), function(order) {
    return _c('order-item', {
      key: "order.id",
      attrs: {
        "order": order
      }
    })
  }))], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-13a6b0ea", module.exports)
  }
}

/***/ }),

/***/ 1419:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my-service"
  }, [_c('scroller', {
    ref: "scroller",
    attrs: {
      "on-load-more": _vm.loadmore
    }
  }, _vm._l((_vm.questionList), function(item) {
    return _c('question-item', {
      key: "item.id",
      staticClass: "row",
      attrs: {
        "question": item
      }
    })
  }))], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1970ec6f", module.exports)
  }
}

/***/ }),

/***/ 1420:
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
  }, [_vm._v("[" + _vm._s(_vm.itemData.section.title) + "] " + _vm._s(_vm.itemData.title))]), _vm._v(" "), _c('a', {
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
  }, [_vm._v(_vm._s(_vm.itemData.comms + '/' + _vm.itemData.reads))])])])]), _vm._v(" "), (_vm.isManager && !_vm.itemData.active) ? _c('v-touch', {
    staticClass: "level-right level-item is-narrow is-clickable",
    staticStyle: {
      "height": "4rem"
    },
    attrs: {
      "tag": "div"
    }
  }, [_c('span', {
    staticClass: "icon image-icon icon-lock is-small"
  }), _vm._v(" "), _c('span', {
    staticClass: "is-danger",
    staticStyle: {
      "margin-left": "0.25rem"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.confirmDeArchivePost($event)
      }
    }
  }, [_vm._v(" " + _vm._s(_vm.$t('forum.detail.openPost')))])]) : _c('v-touch', {
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
        _vm.confirmDeletePost($event)
      }
    }
  }, [_vm._v(" " + _vm._s(_vm.$t('forum.personal.deleteBtn')))])])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-19d25435", module.exports)
  }
}

/***/ }),

/***/ 1423:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.goods) ? _c('div', {
    staticClass: "goods-detail"
  }, [_c('div', {
    staticClass: "flex-take-rest goods-content"
  }, [_c('scroller', {
    ref: "scroller"
  }, [_c('div', {
    staticClass: "columns is-multiline is-mobile has-text-centered has-bottom-line"
  }, [_c('div', {
    staticClass: "column is-12"
  }, [_c('article', {
    staticClass: "message is-primary is-fullwidth"
  }, [_c('div', {
    staticClass: "message-header"
  }, [_vm._v("\n              " + _vm._s(_vm.$t('mall.order.snapshotsPlaceholder')) + "\n            ")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12"
  }, [_c('div', {
    staticClass: "card-image has-text-centered"
  }, [(_vm.goods.pic) ? _c('img', {
    staticStyle: {
      "width": "400px"
    },
    attrs: {
      "src": _vm._f("imageStaticUrl")(_vm.goods.pic.split('|')[0])
    }
  }) : _c('img', {
    staticStyle: {
      "width": "400px"
    },
    attrs: {
      "src": "https://placehold.it/400x400?text=400x400"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12",
    staticStyle: {
      "margin-top": "-.8rem"
    }
  }, [_c('p', {
    staticClass: "title is-5 is-normal"
  }, [_vm._v("\n            " + _vm._s(_vm.goods.name) + "\n          ")])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12"
  }, [_c('p', {
    staticClass: "title is-5 is-primary is-normal",
    staticStyle: {
      "margin-bottom": "0.5rem"
    }
  }, [_c('label', {
    staticClass: "currency",
    class: _vm.goods.currency
  }, [_vm._v(_vm._s(_vm._f("formatPrice")(_vm.goods.price)))]), _vm._v(" "), _c('label', [_vm._v("（" + _vm._s(_vm.$t('mall.goods.postage')) + "：")]), _vm._v(" "), _c('label', {
    staticClass: "currency",
    class: _vm.goods.currency
  }, [_vm._v(_vm._s(_vm._f("formatPrice")(_vm.goods.postage)))]), _vm._v("）\n          ")])])]), _vm._v(" "), _c('div', {
    staticClass: "columns is-multiline is-mobile"
  }, [_c('div', {
    staticClass: "column is-12",
    staticStyle: {
      "margin-top": "0.7rem"
    }
  }, [_c('p', {
    staticClass: "title is-5 is-normal has-text-centered"
  }, [_vm._v("\n            " + _vm._s(_vm.$t('mall.goods.description')) + "\n          ")])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12"
  }, [_c('quill-content', {
    attrs: {
      "content": _vm.goods.description
    }
  })], 1)])])], 1)]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1d7e50f2", module.exports)
  }
}

/***/ }),

/***/ 1427:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor is-vertical root-container account-page"
  }, [_c('div', {
    staticClass: "top-bar flex-fixed-size"
  }, [_c('div', {
    staticClass: "title-bar"
  }, [_c('h4', {
    staticClass: "title is-4"
  }, [_vm._v(_vm._s(_vm.$t('account.accountTitle')))])]), _vm._v(" "), _c('nav', {
    staticClass: "nav"
  }, [_c('div', {
    staticClass: "nav-left has-text-left"
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.inApp),
      expression: "inApp"
    }],
    staticClass: "icon image-icon icon-back",
    on: {
      "click": _vm.onBtnBackClicked
    }
  })])])]), _vm._v(" "), _c('transition', {
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
     require("vue-hot-reload-api").rerender("data-v-20a9e4a6", module.exports)
  }
}

/***/ }),

/***/ 1430:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('article', {
    staticClass: "media flex-fixed-size",
    staticStyle: {
      "margin-top": "1rem",
      "margin-bottom": "1rem"
    }
  }, [(_vm.icon) ? _c('figure', {
    staticClass: "media-left"
  }, [_c('p', {
    staticClass: "image is-48x48"
  }, [_c('img', {
    attrs: {
      "src": _vm.icon
    }
  })])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "media-content"
  }, [_c('div', {
    staticClass: "level is-mobile",
    staticStyle: {
      "margin-bottom": "0.5rem"
    }
  }, [_c('div', {
    staticClass: "level-left"
  }, [_c('label', [_vm._v(_vm._s(_vm.$t('payment.orderDetail')) + ": ")]), _vm._v(" "), _c('label', {
    staticStyle: {
      "margin-left": "0.5rem"
    }
  }, [_vm._v(_vm._s(_vm.goodsName))])])]), _vm._v(" "), _c('div', {
    staticClass: "level is-mobile"
  }, [_c('div', {
    staticClass: "level-left"
  }, [_c('label', [_vm._v(_vm._s(_vm.$t('payment.orderPrice')) + ": ")]), _vm._v(" "), _c('label', {
    class: _vm.currency,
    staticStyle: {
      "margin-left": "0.5rem"
    }
  }, [_vm._v(_vm._s(_vm.price))])])])])]), _vm._v(" "), _c('p', {
    staticClass: "is-seperator flex-fixed-sized"
  }, [_vm._v(_vm._s(_vm.$t('payment.selectPaymentChannel')) + "\n  ")]), _vm._v(" "), _c('div', {
    staticClass: "tile is-vertical flex-take-rest"
  }, [_vm._l((_vm.channels), function(channel) {
    return _c('div', {
      staticClass: "tile is-payment-channel has-bottom-line"
    }, [_c('v-touch', {
      staticClass: "level is-mobile",
      staticStyle: {
        "padding": "0.5rem 0",
        "width": "100%",
        "cursor": "pointer"
      },
      on: {
        "tap": function($event) {
          _vm.setActiveChannel(channel)
        }
      }
    }, [_c('div', {
      staticClass: "level-left"
    }, [_c('a', {
      staticClass: "sdk-icon",
      class: channel
    }), _vm._v(" "), _c('div', {
      staticClass: "tile is-vertical",
      staticStyle: {
        "margin-left": "1rem"
      }
    }, [_c('p', [_vm._v(_vm._s(_vm.$t(("payment.channel." + channel))))]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.$t(("payment.slogan." + channel))))])])]), _vm._v(" "), _c('div', {
      staticClass: "level-right"
    }, [_c('span', {
      staticClass: "icon image-icon circle-icon",
      class: _vm.activeChannel == channel ? 'active' : ''
    })])])], 1)
  }), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "width": "100%",
      "height": "3rem",
      "margin-top": "2rem"
    }
  }, [_c('v-touch', {
    staticClass: "button is-primary is-medium",
    staticStyle: {
      "min-width": "10rem"
    },
    attrs: {
      "tag": "a"
    },
    on: {
      "tap": _vm.onPurchaseByChannel
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$t('payment.buyNow')) + "\n      ")])], 1)], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-26ae8674", module.exports)
  }
}

/***/ }),

/***/ 1435:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "edit-account"
  }, [_c('form', {
    staticClass: "account-fields",
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.onSubmit($event)
      }
    }
  }, [_c('div', [_c('div', {
    staticClass: "field"
  }, [_c('p', {
    staticClass: "control has-icon"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.residentName),
      expression: "residentName",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('account.placeholder.inputResidentName')
    },
    domProps: {
      "value": (_vm.residentName)
    },
    on: {
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.residentName = $event.target.value.trim()
      }, _vm.handleValidation],
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon image-icon icon-user"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "field"
  }, [_c('p', {
    staticClass: "control has-icon has-button has-button-right"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.residentId),
      expression: "residentId",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('account.placeholder.inputResidentId')
    },
    domProps: {
      "value": (_vm.residentId)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.residentId = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon image-icon icon-shield"
  })])])]), _vm._v(" "), _c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errorHint),
      expression: "errorHint"
    }],
    staticClass: "help is-danger"
  }, [_c('span', {
    staticClass: "icon image-icon icon-error-sign"
  }), _vm._v(" " + _vm._s(_vm.errorHint) + " ")]), _vm._v(" "), _c('v-touch', {
    staticClass: "button is-info is-submit",
    class: {
      'is-disabled': _vm.$v.$invalid,
        'is-loading': _vm.processing
    },
    attrs: {
      "tag": "button",
      "type": "submit",
      "disabled": _vm.$v.$invalid
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$t('account.update')) + "\n    ")])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-27e618ee", module.exports)
  }
}

/***/ }),

/***/ 1439:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "columns is-multiline is-mobile",
    staticStyle: {
      "margin": "0 2rem"
    }
  }, _vm._l((_vm.activityList), function(item) {
    return _c('v-touch', {
      key: item.id,
      staticClass: "column is-half is-clickable",
      on: {
        "tap": function($event) {
          _vm.showActivityDetail(item)
        }
      }
    }, [_c('center', [(item.pic) ? _c('img', {
      staticStyle: {
        "border-radius": ".5rem"
      },
      attrs: {
        "src": _vm._f("imageStaticUrl")(item.pic)
      }
    }) : _c('img', {
      staticStyle: {
        "border-radius": ".5rem"
      },
      attrs: {
        "src": "https://placehold.it/640x260?text=640x260"
      }
    })])], 1)
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2f453cfe", module.exports)
  }
}

/***/ }),

/***/ 1440:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('scroller', {
    ref: "scroller",
    attrs: {
      "on-refresh": _vm.refresh,
      "on-load-more": _vm.loadMore
    }
  }, [_c('div', {
    staticStyle: {
      "margin": "0 2rem"
    }
  }, [_c('nav', {
    staticClass: "level is-mobile"
  }, _vm._l((_vm.topNews), function(item) {
    return _c('v-touch', {
      key: item.id,
      on: {
        "tap": function($event) {
          _vm.showNewsDetail(item)
        }
      }
    }, [_c('div', {
      staticClass: "has-text-centered"
    }, [_c('div', [_c('figure', [_c('img', {
      staticStyle: {
        "padding": ".5rem",
        "border-radius": ".5rem"
      },
      attrs: {
        "src": _vm._f("imageStaticUrl")(item.pic)
      }
    })]), _vm._v(" "), _c('h5', {
      staticClass: "title is-5",
      staticStyle: {
        "padding": "0 .5rem"
      }
    }, [_vm._v(_vm._s(item.title))])])])])
  })), _vm._v(" "), _c('div', {
    staticClass: "content",
    staticStyle: {
      "margin": "1rem"
    }
  }, _vm._l((_vm.news), function(item) {
    return _c('v-touch', {
      key: item.id,
      staticClass: "tile is-vertical has-bottom-line post-list-item",
      on: {
        "tap": function($event) {
          _vm.showNewsDetail(item)
        }
      }
    }, [_c('article', {
      staticClass: "media is-clickable"
    }, [_c('div', {
      staticClass: "media-content"
    }, [_c('div', {
      staticClass: "level is-mobile"
    }, [_c('div', {
      staticClass: "level-left level-item",
      on: {
        "click": function($event) {
          _vm.showNewsDetail(item)
        }
      }
    }, [_c('h5', {
      staticClass: "title is-5"
    }, [_vm._v(_vm._s(item.title))])]), _vm._v(" "), _c('div', {
      staticClass: "level-right level-item has-text-right grey-text",
      staticStyle: {
        "margin-top": "0"
      }
    }, [_c('span', [_vm._v(_vm._s(_vm._f("formatServerDate")(item.inserted_at)))])])])])])])
  }))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2f833445", module.exports)
  }
}

/***/ }),

/***/ 1441:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "common-issues"
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
    staticClass: "input ",
    attrs: {
      "type": "input",
      "placeholder": _vm.$t('customerService.commonIssues.searchPlaceHolder')
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
  }, [_vm._v(_vm._s(_vm.$t('customerService.commonIssues.btnTitle')))])])]), _vm._v(" "), (_vm.questions || _vm.searching) ? _c('div', {
    staticClass: "my-service flex-take-rest",
    staticStyle: {
      "position": "relative",
      "top": "1rem"
    }
  }, [_c('scroller', {
    ref: "scroller",
    attrs: {
      "on-load-more": _vm.loadmore
    }
  }, _vm._l((_vm.questions), function(item) {
    return _c('question-item', {
      key: "item.id",
      staticClass: "row",
      attrs: {
        "question": item
      }
    })
  }))], 1) : _c('div', {
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
          "padding": "0.5rem 0",
          "overflow": "hidden",
          "white-space": "nowrap",
          "text-overflow": "ellipsis"
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
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2f917222", module.exports)
  }
}

/***/ }),

/***/ 1445:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor is-vertical root-container"
  }, [_c('div', {
    staticClass: "tile is-child is-full stay-top title-bar has-text-centered has-bottom-thick-line"
  }, [_c('span', {
    staticClass: "icon nav-icon pull-right icon-close ",
    on: {
      "click": _vm.onClose
    }
  }), _vm._v(" "), _c('h4', {
    staticClass: "title is-4",
    staticStyle: {
      "font-weight": "400"
    }
  }, [_vm._v(_vm._s(_vm.$t('error.pageTitle')))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-34bdb7ca", module.exports)
  }
}

/***/ }),

/***/ 1448:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "notice-container"
  }, [_c('div', {
    staticClass: "notice-list"
  }, [_c('scroller', _vm._l((_vm.notices), function(item) {
    return _c('v-touch', {
      key: item.id,
      on: {
        "tap": function($event) {
          _vm.showNoticeDetail(item)
        }
      }
    }, [_c('div', {
      staticClass: "column",
      staticStyle: {
        "border": "1px solid #ccc",
        "padding": ".8rem",
        "margin": ".5rem",
        "cursor": "pointer"
      }
    }, [_c('h5', {
      staticClass: "title is-5",
      class: {
        'is-primary': _vm.selectedId == item.id
      }
    }, [_vm._v(_vm._s(item.title))])])])
  }))], 1), _vm._v(" "), _c('div', {
    staticClass: "notice-detail"
  }, [_c('scroller', {
    staticStyle: {
      "margin": ".5rem",
      "border": "1px solid #ccc"
    }
  }, [_c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "padding": "1rem"
    }
  }, [_c('h4', {
    staticClass: "title is-4"
  }, [_vm._v(_vm._s(_vm.itemData.title))])]), _vm._v(" "), _c('div', {
    staticClass: "subtitle is-5 quill-editor ql-snow",
    staticStyle: {
      "padding": "1rem",
      "line-height": "150%"
    },
    domProps: {
      "innerHTML": _vm._s(_vm.itemData.content)
    }
  })])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-36f3074a", module.exports)
  }
}

/***/ }),

/***/ 1449:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('scroller', {
    staticClass: "account-info"
  }, [_c('div', {
    staticClass: "columns is-mobile is-multiline is-paddingless is-marginless"
  }, [_c('div', {
    staticClass: "column is-3"
  }, [_c('v-touch', {
    staticClass: "image is-64x64 avatar-image is-clickable",
    staticStyle: {
      "margin": "1rem auto"
    },
    attrs: {
      "tag": "figure"
    },
    on: {
      "tap": _vm.onUpdateAvatar
    }
  }, [_c('img', {
    attrs: {
      "src": _vm._f("imageStaticUrl")(_vm.avatarUrl)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "level is-mobile is-paddingless"
  }, [_c('p', {
    staticClass: "level-center level-item has-text-right"
  }, [_vm._v(" " + _vm._s(_vm.$t('account.userId')) + ": " + _vm._s(_vm.userInfo.id))])])], 1), _vm._v(" "), _c('div', {
    staticClass: "column is-9"
  }, [_c('v-touch', {
    staticClass: "level is-mobile is-clickable has-bottom-line",
    staticStyle: {
      "margin-top": "0.5rem"
    },
    on: {
      "tap": function($event) {
        _vm.$router.push({
          path: '/account/edit_nickname'
        })
      }
    }
  }, [_c('p', {
    staticClass: "level-left level-item has-text-left is-narrow"
  }, [_c('span', {
    staticStyle: {
      "width": "100%"
    }
  }, [_vm._v(" " + _vm._s(_vm.$t('account.nickname')) + " ")])]), _vm._v(" "), _c('p', {
    staticClass: "level-right level-item has-text-right"
  }, [_vm._v("\n            " + _vm._s(_vm.userInfo.nickname) + "\n            "), _c('span', {
    staticClass: "icon image-icon icon-arrow-right"
  })])]), _vm._v(" "), (_vm.isMobileAccountSupported) ? _c('v-touch', {
    staticClass: "level is-mobile is-clickable has-bottom-line",
    on: {
      "tap": function($event) {
        _vm.$router.push({
          path: '/account/edit_mobile'
        })
      }
    }
  }, [_c('p', {
    staticClass: "level-left level-item has-text-left"
  }, [_c('span', {
    staticStyle: {
      "width": "100%"
    }
  }, [_vm._v(" " + _vm._s(_vm.$t('account.mobile')) + " ")])]), _vm._v(" "), _c('p', {
    staticClass: "level-right level-item has-text-right is-narrow"
  }, [_c('span', [_vm._v(" " + _vm._s(_vm.mobile) + " ")]), _vm._v(" "), _c('span', {
    staticClass: "icon image-icon icon-arrow-right"
  })])]) : _vm._e(), _vm._v(" "), _c('v-touch', {
    staticClass: "level is-mobile is-clickable has-bottom-line",
    on: {
      "tap": function($event) {
        _vm.$router.push({
          path: '/account/edit_email'
        })
      }
    }
  }, [_c('p', {
    staticClass: "level-left level-item has-text-left"
  }, [_c('span', {
    staticStyle: {
      "width": "100%"
    }
  }, [_vm._v(" " + _vm._s(_vm.$t('account.email')) + " ")])]), _vm._v(" "), _c('p', {
    staticClass: "level-right level-item has-text-right"
  }, [_c('span', [_vm._v(" " + _vm._s(_vm.email) + " ")]), _vm._v(" "), _c('span', {
    staticClass: "icon image-icon icon-arrow-right is-narrow"
  })])]), _vm._v(" "), (_vm.isMobileAccountSupported) ? _c('v-touch', {
    staticClass: "level is-mobile is-clickable has-bottom-line",
    on: {
      "tap": function($event) {
        _vm.$router.push({
          path: '/account/edit_resident'
        })
      }
    }
  }, [_c('p', {
    staticClass: "level-left level-item has-text-left"
  }, [_c('span', {
    staticStyle: {
      "width": "100%"
    }
  }, [_vm._v(" " + _vm._s(_vm.$t('account.residentInfo')) + " ")])]), _vm._v(" "), _c('p', {
    staticClass: "level-right level-item has-text-right is-narrow"
  }, [_c('span', [_vm._v(" " + _vm._s(_vm.userInfo.resident_id || _vm.$t('account.notAuthenticated')) + " ")]), _vm._v(" "), _c('span', {
    staticClass: "icon image-icon icon-arrow-right"
  })])]) : _vm._e(), _vm._v(" "), (_vm.isInApp && _vm.showLogout) ? _c('v-touch', {
    staticClass: "button is-info is-submit",
    staticStyle: {
      "margin-top": "1rem"
    },
    attrs: {
      "tag": "a"
    },
    on: {
      "tap": _vm.logout
    }
  }, [_vm._v("\n          " + _vm._s(_vm.$t('account.logout')) + "\n        ")]) : _vm._e()], 1)])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-36fdc619", module.exports)
  }
}

/***/ }),

/***/ 1450:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor is-vertical root-container"
  }, [_c('div', {
    staticClass: "tile is-child is-full stay-top title-bar has-text-centered has-bottom-thick-line"
  }, [_c('span', {
    staticClass: "icon nav-icon pull-right icon-close ",
    on: {
      "click": _vm.onClose
    }
  }), _vm._v(" "), _c('h4', {
    staticClass: "title is-4",
    staticStyle: {
      "font-weight": "400"
    }
  }, [_vm._v(_vm._s(_vm.$t('error.pageTitle')))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3806ab58", module.exports)
  }
}

/***/ }),

/***/ 1451:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "contact-service"
  }, [_c('form', {
    staticClass: "post",
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.title),
      expression: "title"
    }],
    staticClass: "textarea is-medium",
    attrs: {
      "placeholder": _vm.$t('customerService.contactPlaceHolder')
    },
    domProps: {
      "value": (_vm.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.title = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "contact-center"
  }, [_c('nav', {
    staticClass: "level is-mobile"
  }, [_c('div', {
    staticClass: "level-item has-text-centered"
  }, [_c('input', {
    staticClass: "button is-info is-medium",
    class: _vm.processing || _vm.$v.$invalid ? 'is-disabled' : '',
    attrs: {
      "disabled": _vm.$v.$invalid,
      "type": "submit"
    },
    domProps: {
      "value": _vm.$t('customerService.submitBtn')
    }
  })])])]), _vm._v(" "), (_vm.appDetail.cs_phone_number) ? _c('div', [_c('nav', {
    staticClass: "level is-mobile"
  }, [_c('div', {
    staticClass: "level-item has-text-centered"
  }, [_c('div', {
    staticClass: "bottom-content"
  }, [_c('p', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('customerService.contactService.hotline')) + " :\n              "), _c('span', [_vm._v(_vm._s(_vm.appDetail.cs_phone_number))])]), _vm._v(" "), _c('p', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('customerService.contactService.officialHomePage')) + " :\n              "), _c('span', [_vm._v(_vm._s(_vm.appDetail.website_url))])]), _vm._v(" "), _c('p', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('customerService.contactService.weChat')) + " :\n              "), _c('span', [_vm._v(_vm._s(_vm.appDetail.public_weixin_name))])])])]), _vm._v(" "), _c('div', {
    staticClass: "level-item has-text-centered"
  }, [_c('div', {
    staticClass: "bottom-content"
  }, [_c('p', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('customerService.contactService.officialForum')) + " :\n              "), _c('span', [_vm._v(_vm._s(_vm.appDetail.forum_url))])]), _vm._v(" "), _c('p', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('customerService.contactService.officialPostBar')) + " :\n              "), _c('span', [_vm._v(_vm._s(_vm.appDetail.baidu_tieba_name))])]), _vm._v(" "), _c('p', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('customerService.contactService.officialMicroBlog')) + " :\n              "), _c('span', [_vm._v(_vm._s(_vm.appDetail.weibo_name))])])])])])]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3816ac5f", module.exports)
  }
}

/***/ }),

/***/ 1454:
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
     require("vue-hot-reload-api").rerender("data-v-3d46759e", module.exports)
  }
}

/***/ }),

/***/ 1466:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('v-touch', {
    staticClass: "card",
    on: {
      "tap": function($event) {
        _vm.viewOrderDetail(_vm.order)
      }
    }
  }, [_c('header', {
    staticClass: "card-header"
  }, [_c('p', {
    staticClass: "card-header-title"
  }, [_vm._v("\n      " + _vm._s(_vm.$t('mall.order.fields.id')) + ":" + _vm._s(_vm.order.id) + "\n    ")]), _vm._v(" "), _c('p', {
    staticClass: "card-header-icon"
  }, [_vm._v("\n      " + _vm._s(_vm.$t('mall.order.status.' + _vm.order.status)) + "\n    ")])]), _vm._v(" "), _c('div', {
    staticClass: "card-content"
  }, [_c('div', {
    staticClass: "columns is-mobile is-multiline",
    staticStyle: {
      "margin": "0",
      "padding": ".5rem"
    }
  }, _vm._l((_vm.order.details), function(detail) {
    return _c('div', {
      staticClass: "column is-narrow"
    }, [_c('div', {
      staticClass: "media is-mobile",
      staticStyle: {
        "margin-right": "1rem"
      }
    }, [_c('figure', {
      staticClass: "media-left"
    }, [_c('p', {
      staticClass: "image is-64x64"
    }, [_c('img', {
      attrs: {
        "src": _vm._f("imageStaticUrl")(detail.goods_pic.split('|')[0])
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "media-content"
    }, [_c('p', [_vm._v(_vm._s(detail.goods_name))]), _vm._v(" "), _c('p', {
      staticClass: "is-primary",
      class: ['currency', _vm.order.currency]
    }, [_vm._v(_vm._s(_vm._f("formatPrice")(detail.price)))]), _vm._v(" "), _c('p', [_vm._v(" X" + _vm._s(detail.amount) + " ")])])])])
  }))]), _vm._v(" "), _c('footer', {
    staticClass: "card-footer"
  }, [_c('p', {
    staticClass: "card-footer-item has-text-right is-primary"
  }, [_vm._v(" " + _vm._s(_vm.$t('mall.order.fields.total')) + ":\n      "), _c('span', {
    class: ['currency', _vm.order.currency]
  }, [_vm._v(_vm._s(_vm._f("formatPrice")(_vm.order.price)))]), _vm._v("\n      (" + _vm._s(_vm.$t('mall.order.fields.with_postage')) + "\n      "), _c('span', {
    class: ['currency', _vm.order.currency]
  }, [_vm._v(_vm._s(_vm._f("formatPrice")(_vm.order.postage)))]), _vm._v("\n      )\n    ")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-44d096d9", module.exports)
  }
}

/***/ }),

/***/ 1467:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content is-large"
  }, [_c('div', {
    staticClass: "has-text-centered",
    staticStyle: {
      "padding-top": "1rem"
    }
  }, [_c('h4', {
    staticClass: "title is-4",
    staticStyle: {
      "margin-bottom": "0"
    }
  }, [_vm._v(_vm._s(_vm.itemData.title))])]), _vm._v(" "), _c('quill-content', {
    staticClass: "subtitle is-5",
    staticStyle: {
      "line-height": "150%"
    },
    attrs: {
      "content": _vm.itemData.content
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4511f2a1", module.exports)
  }
}

/***/ }),

/***/ 1472:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "edit-address"
  }, [(_vm.address.id > 0) ? _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "columns is-multiline is-mobile is-paddingless is-marginless"
  }, [_c('div', {
    staticClass: "column is-12 has-bottom-line"
  }, [_c('div', {
    staticClass: "level is-mobile"
  }, [_c('div', {
    staticClass: "level-item"
  }, [_c('span', {
    staticClass: "subtitle is-5 is-normal width-5"
  }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.name')) + "：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.address.name),
      expression: "address.name",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input no-border",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.address.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.address.name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12 has-bottom-line"
  }, [_c('div', {
    staticClass: "level is-mobile"
  }, [_c('div', {
    staticClass: "level-item"
  }, [_c('span', {
    staticClass: "subtitle is-5 is-normal width-5"
  }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.mobile')) + "：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.address.mobile),
      expression: "address.mobile",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input no-border",
    attrs: {
      "type": "number"
    },
    domProps: {
      "value": (_vm.address.mobile)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.address.mobile = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12 has-bottom-line"
  }, [_c('div', {
    staticClass: "level is-mobile has-text-left"
  }, [_c('div', {
    staticClass: "level-item"
  }, [_c('span', {
    staticClass: "subtitle is-5 is-normal width-5"
  }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.area')) + "：")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%"
    }
  }, [(_vm.provinceCode > 0) ? _c('city-select', {
    attrs: {
      "_province": _vm.provinceCode,
      "_city": _vm.cityCode,
      "_district": _vm.districtCode
    },
    on: {
      "onSelect": _vm.onSelect
    }
  }) : _vm._e()], 1)])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12 has-bottom-line"
  }, [_c('div', {
    staticClass: "level is-mobile"
  }, [_c('div', {
    staticClass: "level-item"
  }, [_c('span', {
    staticClass: "subtitle is-5 is-normal width-5"
  }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.address')) + "：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.address.address),
      expression: "address.address"
    }],
    staticClass: "input no-border",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.address.address)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.address.address = $event.target.value
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12 has-text-centered"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errorHint),
      expression: "errorHint"
    }],
    staticClass: "tile is-full has-text-left",
    staticStyle: {
      "margin": "0.5rem"
    }
  }, [_c('span', {
    staticClass: "icon is-sign"
  }, [_vm._v("!")]), _vm._v(" "), _c('span', {
    staticClass: "is-primary",
    staticStyle: {
      "font-size": "1rem"
    }
  }, [_vm._v(_vm._s(_vm.errorHint))])]), _vm._v(" "), _c('v-touch', {
    staticClass: "button is-info is-large is-fullwidth",
    class: _vm.processing || _vm.$v.$invalid ? 'is-disabled' : '',
    attrs: {
      "tag": "a",
      "disabled": _vm.$v.$invalid
    },
    on: {
      "tap": _vm.handleSubmit
    }
  }, [_vm._v(_vm._s(_vm.$t('common.save')))])], 1)])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4aa27161", module.exports)
  }
}

/***/ }),

/***/ 1473:
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
     require("vue-hot-reload-api").rerender("data-v-4c8b1b54", module.exports)
  }
}

/***/ }),

/***/ 1474:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "goods-detail"
  }, [_c('div', {
    staticClass: "flex-take-rest goods-content"
  }, [_c('scroller', {
    ref: "scroller"
  }, [_c('div', {
    staticClass: "columns is-multiline is-mobile has-text-centered has-bottom-line"
  }, [_c('div', {
    staticClass: "column is-12"
  }, [_c('div', {
    staticClass: "card-image"
  }, [(this.selectedGoods.pic) ? _c('swiper', {
    ref: "goodsSwiper",
    attrs: {
      "options": _vm.swiperOption
    }
  }, _vm._l((this.selectedGoods.pic.split('|')), function(item) {
    return _c('swiper-slide', {
      key: "item"
    }, [(item) ? _c('img', {
      staticClass: "image is-400x400",
      staticStyle: {
        "margin": "0px auto"
      },
      attrs: {
        "src": _vm._f("imageStaticUrl")(item)
      }
    }) : _c('img', {
      attrs: {
        "src": "https://placehold.it/400x400?text=400x400"
      }
    })])
  })) : _vm._e()], 1)]), _vm._v(" "), _c('div', {
    staticClass: "column is-12 goods-item"
  }, [_c('p', {
    staticClass: "title is-5 is-normal"
  }, [_vm._v("\n            " + _vm._s(this.selectedGoods.name) + "\n          ")]), _vm._v(" "), _c('p', {
    staticClass: "title is-5 is-primary is-normal"
  }, [_c('label', {
    staticClass: "currency",
    class: this.selectedGoods.currency
  }, [_vm._v(_vm._s(_vm._f("formatPrice")(this.selectedGoods.price)))]), _vm._v(" "), _c('label', [_vm._v("（" + _vm._s(_vm.$t('mall.goods.postage')) + "：")]), _vm._v(" "), _c('label', {
    staticClass: "currency",
    class: this.selectedGoods.currency
  }, [_vm._v(_vm._s(_vm._f("formatPrice")(this.selectedGoods.postage)))]), _vm._v("）\n          ")]), _vm._v(" "), _c('p', {
    staticClass: "title is-5 is-normal"
  }, [_vm._v("\n            " + _vm._s(_vm.$t('mall.goods.stock')) + "：" + _vm._s(this.selectedGoods.stock) + "\n          ")])])]), _vm._v(" "), _c('div', {
    staticClass: "columns is-multiline is-mobile"
  }, [_c('div', {
    staticClass: "column is-12 goods-description"
  }, [_c('p', {
    staticClass: "title is-5 is-normal has-text-centered"
  }, [_vm._v("\n            " + _vm._s(_vm.$t('mall.goods.description')) + "\n          ")])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12"
  }, [_c('quill-content', {
    staticStyle: {
      "border": "none"
    },
    attrs: {
      "content": this.selectedGoods.description
    }
  })], 1)])])], 1), _vm._v(" "), _c('div', {
    staticClass: "flex-fixed-size goods-bottom"
  }, [(this.selectedGoods.stock <= 0) ? _c('div', {
    staticClass: "goods-sellOut has-text-centered"
  }, [_c('div', {
    staticClass: "title is-5 is-normal"
  }, [_vm._v(_vm._s(_vm.$t('mall.goods.soldOut')))])]) : _c('div', {
    staticClass: "columns is-multiline is-mobile"
  }, [_c('div', {
    staticClass: "column is-6 border-right"
  }, [_c('div', {
    staticClass: "left-content"
  }, [_c('input', {
    staticClass: "button is-large has-hairline-border content-item",
    attrs: {
      "type": "button",
      "value": "-"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.quantityPlus($event)
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.quantity),
      expression: "quantity",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input is-large has-text-centered has-hairline-border content-item",
    staticStyle: {
      "width": "4rem"
    },
    attrs: {
      "type": "number"
    },
    domProps: {
      "value": _vm.quantity,
      "value": (_vm.quantity)
    },
    on: {
      "blur": [function($event) {
        $event.preventDefault();
        _vm.quantityChange($event)
      }, function($event) {
        _vm.$forceUpdate()
      }],
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.quantity = $event.target.value.trim()
      }
    }
  }), _vm._v(" "), _c('input', {
    staticClass: "button is-large has-hairline-border content-item",
    attrs: {
      "type": "button",
      "value": "+"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.quantityReduce($event)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('a', {
    staticClass: "button is-info is-large is-fullwidth goods-buyNow",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.buyNow($event)
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('mall.goods.buyNow')))])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4d5f70c4", module.exports)
  }
}

/***/ }),

/***/ 1476:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my-addresses"
  }, [_c('div', {
    staticClass: "flex-take-rest addresses-content"
  }, [_c('scroller', {
    ref: "scroller",
    staticStyle: {
      "margin-bottom": "-3.6rem"
    }
  }, [_vm._l((_vm.addressesList), function(item, index) {
    return _c('div', {
      staticClass: "card"
    }, [_c('v-touch', {
      staticClass: "card-header",
      attrs: {
        "tag": "header"
      },
      on: {
        "tap": function($event) {
          _vm.selectAddress(index)
        }
      }
    }, [_c('div', {
      staticClass: "card-header-title"
    }, [_c('article', {
      staticClass: "tile is-vertical"
    }, [_c('p', {
      staticClass: "subtitle is-5 is-normal"
    }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.name')) + "：" + _vm._s(item.name))]), _vm._v(" "), _c('p', {
      staticClass: "subtitle is-5 is-normal"
    }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.mobile')) + "：" + _vm._s(item.mobile))]), _vm._v(" "), _c('p', {
      staticClass: "subtitle is-5 is-normal"
    }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.address')) + "：" + _vm._s(item.area.replace(/-/g, " ")) + " " + _vm._s(item.address))])])]), _vm._v(" "), _c('div', {
      staticClass: "card-header-icon"
    }, [_c('i', {
      staticClass: "icon image-icon icon-right"
    })])])], 1)
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.loading && _vm.addressesList.length == 0),
      expression: "loading && addressesList.length==0"
    }],
    staticClass: "loading-layer"
  }, [_c('label', [_vm._v(_vm._s(_vm.$t('common.noMoreData')))])])], 2)], 1), _vm._v(" "), _c('div', {
    staticClass: "flex-fixed-size addresses-bottom has-text-center"
  }, [_c('v-touch', {
    staticClass: "button is-info is-large is-fullwidth",
    on: {
      "tap": _vm.newAddress
    }
  }, [_vm._v(_vm._s(_vm.$t('mall.address.add')))])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4e2aeb6f", module.exports)
  }
}

/***/ }),

/***/ 1477:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "edit-account"
  }, [_c('form', {
    staticClass: "account-fields",
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.onSubmit($event)
      }
    }
  }, [_c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.userInfo.mobile),
      expression: "userInfo.mobile"
    }],
    staticClass: "help is-primary"
  }, [_vm._v(" " + _vm._s(_vm.$t('account.hint.currentBoundMobile', {
    mobile: _vm.boundMobile
  })) + " ")]), _vm._v(" "), _c('div', [_c('div', {
    staticClass: "field"
  }, [_c('p', {
    staticClass: "control has-icon"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.mobile),
      expression: "mobile",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "number",
      "placeholder": _vm.$t('account.placeholder.inputMobileNumber')
    },
    domProps: {
      "value": (_vm.mobile)
    },
    on: {
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.mobile = $event.target.value.trim()
      }, _vm.handleValidation],
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon image-icon icon-mobile"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "field"
  }, [_c('p', {
    staticClass: "control has-icon has-button has-button-right"
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
    staticClass: "input",
    attrs: {
      "type": "number",
      "placeholder": _vm.$t('account.placeholder.inputVerifyCode')
    },
    domProps: {
      "value": (_vm.verifyCode)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.verifyCode = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon image-icon icon-shield"
  }), _vm._v(" "), _c('v-touch', {
    staticClass: "button is-primary",
    class: {
      'is-disabled': _vm.$v.mobile.$invalid || _vm.cooldownCounter > 0,
        'is-loading': _vm.sendingVerifyCode
    },
    attrs: {
      "tag": "a",
      "disabled": _vm.$v.mobile.$invalid || _vm.cooldownCounter > 0
    },
    on: {
      "tap": _vm.sendMobileVerifyCode
    }
  }, [_vm._v("\n            " + _vm._s(_vm.btnFetchVerifyCodeTitle) + "\n          ")])], 1)]), _vm._v(" "), (_vm.userInfo.nil_password) ? _c('div', {
    staticClass: "field"
  }, [_c('p', {
    staticClass: "control has-icons-left has-icons-right"
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
    staticClass: "input",
    attrs: {
      "type": "password",
      "placeholder": _vm.$t('account.placeholder.inputPassword')
    },
    domProps: {
      "value": (_vm.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.password = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon is-left image-icon icon-lock"
  }), _vm._v(" "), (_vm.showPassword) ? _c('v-touch', {
    staticClass: "icon is-right image-icon icon-eye is-clickable",
    attrs: {
      "tag": "span"
    },
    on: {
      "tap": _vm.togglePasswordVisibility
    }
  }) : _c('v-touch', {
    staticClass: "icon is-right image-icon icon-eye-slash is-clickable",
    attrs: {
      "tag": "span"
    },
    on: {
      "tap": _vm.togglePasswordVisibility
    }
  })], 1)]) : _vm._e()]), _vm._v(" "), _c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errorHint),
      expression: "errorHint"
    }],
    staticClass: "help is-danger"
  }, [_c('span', {
    staticClass: "icon image-icon icon-error-sign"
  }), _vm._v(" " + _vm._s(_vm.errorHint) + " ")]), _vm._v(" "), _c('v-touch', {
    staticClass: "button is-info is-submit",
    class: {
      'is-disabled': _vm.$v.$invalid,
        'is-loading': _vm.processing
    },
    attrs: {
      "tag": "button",
      "type": "submit",
      "disabled": _vm.$v.$invalid
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$t('account.bind')) + "\n    ")])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-50d3ecc0", module.exports)
  }
}

/***/ }),

/***/ 1483:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "person"
  }, [_c('article', {
    staticClass: "media info flex-fixed-size"
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
  })]), _vm._v(" "), _c('div', [_c('p', [_vm._v("\n        " + _vm._s(_vm.$t('forum.personal.nickname')) + "\n        "), _c('span', [_vm._v(_vm._s(this.userInfo.nickname))])]), _vm._v(" "), _c('p', [_vm._v("\n        " + _vm._s(_vm.$t('forum.personal.postCount')) + "\n        "), _c('span', [_vm._v(_vm._s(this.userInfo.post_count))])]), _vm._v(" "), _c('p', [_vm._v("\n        " + _vm._s(_vm.$t('forum.personal.registerTime')) + "\n        "), _c('span', [_vm._v(_vm._s(_vm._f("formatServerDate")(this.userInfo.inserted_at)))])])])]), _vm._v(" "), _c('slider-nav', {
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
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5366859d", module.exports)
  }
}

/***/ }),

/***/ 1491:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "place-order"
  }, [_c('div', {
    staticClass: "card is-mobile"
  }, [_c('v-touch', {
    staticClass: "card-header is-mobile",
    attrs: {
      "tag": "header"
    },
    on: {
      "tap": function($event) {
        _vm.selectAddress()
      }
    }
  }, [(this.selectedAddress.id > 0) ? _c('article', {
    staticClass: "tile is-vertical"
  }, [_c('p', {
    staticClass: "title is-5 is-thickness"
  }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.name')) + "：" + _vm._s(this.selectedAddress.name))]), _vm._v(" "), _c('p', {
    staticClass: "title is-5 is-thickness"
  }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.mobile')) + "：" + _vm._s(this.selectedAddress.mobile))]), _vm._v(" "), _c('p', {
    staticClass: "title is-5 is-thickness"
  }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.address')) + "：" + _vm._s(this.selectedAddress.area.replace(/-/g, " ")) + " " + _vm._s(this.selectedAddress.address))])]) : _c('p', {
    staticClass: "card-header-title"
  }, [_c('span', {
    staticClass: "icon nav-icon icon-pen"
  }), _vm._v(" "), _c('span', {
    staticClass: "subtitle is-5 is-thickness"
  }, [_vm._v(_vm._s(_vm.$t('mall.order.addressPlaceholder')))])]), _vm._v(" "), _c('p', {
    staticClass: "card-header-icon"
  }, [_c('i', {
    staticClass: "icon image-icon icon-right"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "card-content"
  }, [_c('div', {
    staticClass: "media"
  }, [_c('div', {
    staticClass: "media-left"
  }, [_c('p', {
    staticClass: "image is-64x64",
    staticStyle: {
      "overflow": "hidden"
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.goodsItem.goods.pic.split('|')[0] ? _vm.goodsItem.goods.pic.split('|')[0] : 'https://placehold.it/64x64?text=loading...'
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "media-content is-marginless is-paddingless"
  }, [_c('p', {
    staticClass: "title is-normal is-5"
  }, [_vm._v(_vm._s(_vm.goodsItem.goods.name))]), _vm._v(" "), _c('p', {
    staticClass: "title is-normal is-5 is-primary currency",
    class: _vm.goodsItem.goods.currency
  }, [_vm._v(_vm._s(_vm._f("formatPrice")(_vm.goodsItem.goods.price)))]), _vm._v(" "), _c('p', {
    staticClass: "title is-normal is-5"
  }, [_vm._v("X" + _vm._s(_vm.goodsItem.quantity))])])])]), _vm._v(" "), _c('div', {
    staticClass: "content has-text-right"
  }, [_c('p', {
    staticClass: "subtitle is-5 is-primary is-normal"
  }, [_vm._v("\n        " + _vm._s(_vm.$t('mall.order.fields.total')) + ":\n        "), _c('span', {
    staticClass: "currency",
    class: _vm.goodsItem.goods.currency
  }, [_vm._v(_vm._s(_vm._f("formatPrice")(this.totalPrice)))]), _vm._v(" (" + _vm._s(_vm.$t('mall.order.fields.with_postage')) + "\n        "), _c('span', {
    staticClass: "currency",
    class: _vm.goodsItem.goods.currency
  }, [_vm._v(_vm._s(_vm._f("formatPrice")(this.goodsItem.goods.postage)))]), _vm._v(" )\n      ")])])], 1), _vm._v(" "), _c('div', {
    staticClass: "order-bottom"
  }, [(this.isSupportWechat()) ? _c('div', {
    staticClass: "is-fullwidth"
  }, [_c('v-touch', {
    staticClass: "button is-info is-large is-fullwidth",
    class: _vm.wechatPayLoading ? 'is-loading' : '',
    attrs: {
      "disabled": _vm.wechatPayDisabled
    },
    on: {
      "tap": function($event) {
        _vm.onPrepay('wechat')
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('mall.order.buttons.wechatPay')))])], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "is-fullwidth"
  }, [_c('v-touch', {
    staticClass: "button is-info is-large is-fullwidth",
    class: _vm.aliPayLoading ? 'is-loading' : '',
    attrs: {
      "disabled": _vm.aliPayDisabled
    },
    on: {
      "tap": function($event) {
        _vm.onPrepay('alipay')
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('mall.order.buttons.aliPay')))])], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5e406936", module.exports)
  }
}

/***/ }),

/***/ 1494:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my-addresses"
  }, [_c('div', {
    staticClass: "flex-take-rest addresses-content"
  }, [_c('scroller', {
    ref: "scroller"
  }, [_vm._l((_vm.addressesList), function(item) {
    return _c('div', {
      staticClass: "card"
    }, [_c('v-touch', {
      staticClass: "card-header",
      attrs: {
        "tag": "header"
      },
      on: {
        "tap": function($event) {
          _vm.showAddressDetail(item.id)
        }
      }
    }, [_c('div', {
      staticClass: "card-header-title"
    }, [_c('article', {
      staticClass: "tile is-vertical"
    }, [_c('p', {
      staticClass: "subtitle is-5 is-normal"
    }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.name')) + "：" + _vm._s(item.name))]), _vm._v(" "), _c('p', {
      staticClass: "subtitle is-5 is-normal"
    }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.mobile')) + "：" + _vm._s(item.mobile))]), _vm._v(" "), _c('p', {
      staticClass: "subtitle is-5 is-normal"
    }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.address')) + "：" + _vm._s(item.area.replace(/-/g, " ")) + " " + _vm._s(item.address))])])]), _vm._v(" "), _c('div', {
      staticClass: "card-header-icon"
    }, [_c('i', {
      staticClass: "icon image-icon icon-right"
    })])]), _vm._v(" "), _c('div', {
      staticClass: "card-content"
    }, [_c('div', {
      staticClass: "columns is-mobile"
    }, [_c('div', {
      staticClass: "column is-9-mobile is-11-tablet is-11-desktop is-paddingless"
    }, [_c('label', {
      staticClass: "radio"
    }, [(item.is_default) ? _c('v-touch', {
      staticClass: "subtitle is-5 is-primary is-normal",
      staticStyle: {
        "display": "flex",
        "align-items": "center"
      },
      attrs: {
        "tag": "span"
      }
    }, [_c('i', {
      staticClass: "icon image-icon icon-solid has-text-center",
      staticStyle: {
        "margin-right": "0.5rem"
      }
    }, [_c('i', {
      staticClass: "icon image-icon icon-select",
      staticStyle: {
        "width": "1rem"
      }
    })]), _vm._v("\n                  " + _vm._s(_vm.$t('mall.address.fields.is_default')))]) : _c('v-touch', {
      staticClass: "subtitle is-5 is-normal",
      staticStyle: {
        "display": "flex",
        "align-items": "center"
      },
      attrs: {
        "tag": "span"
      },
      on: {
        "tap": function($event) {
          _vm.setDefaultAddress(item.id)
        }
      }
    }, [_c('i', {
      staticClass: "icon image-icon icon-circle",
      staticStyle: {
        "margin-right": "0.5rem"
      }
    }), _vm._v(_vm._s(_vm.$t('mall.address.setDefault')) + "\n                ")])], 1)]), _vm._v(" "), _c('div', {
      staticClass: "column is-paddingless"
    }, [_c('v-touch', {
      staticClass: "subtitle is-5 is-normal",
      staticStyle: {
        "display": "flex",
        "align-items": "center"
      },
      attrs: {
        "tag": "a"
      },
      on: {
        "tap": function($event) {
          _vm.deleteAddress(item.id)
        }
      }
    }, [_c('i', {
      staticClass: "icon image-icon icon-remove",
      staticStyle: {
        "margin-right": "0.5rem",
        "margin-top": "0.1rem"
      }
    }), _vm._v(_vm._s(_vm.$t('common.delete')) + "\n              ")])], 1)])])], 1)
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.loading && _vm.addressesList.length == 0),
      expression: "loading && addressesList.length==0"
    }],
    staticClass: "loading-layer"
  }, [_c('label', [_vm._v(_vm._s(_vm.$t('common.noMoreData')))])])], 2)], 1), _vm._v(" "), _c('div', {
    staticClass: "flex-fixed-size addresses-bottom has-text-center"
  }, [_c('v-touch', {
    staticClass: "button is-info is-large is-fullwidth",
    on: {
      "tap": _vm.newAddress
    }
  }, [_vm._v(_vm._s(_vm.$t('mall.address.add')))])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-613d942d", module.exports)
  }
}

/***/ }),

/***/ 1496:
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
     require("vue-hot-reload-api").rerender("data-v-63287edc", module.exports)
  }
}

/***/ }),

/***/ 1497:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mall-mine"
  }, [_c('router-link', {
    staticClass: "level is-mobile has-bottom-line",
    attrs: {
      "to": {
        name: 'myOrders'
      },
      "tag": "div"
    }
  }, [_c('div', {
    staticClass: "level-left"
  }, [_c('h5', {
    staticClass: "subtitle is-5"
  }, [_c('i', {
    staticClass: "icon image-icon icon-shopping-cart",
    staticStyle: {
      "margin-right": "0.8rem",
      "margin-top": "-.2rem"
    }
  }), _vm._v(_vm._s(_vm.$t('mall.titles.myOrders')))])]), _vm._v(" "), _c('div', {
    staticClass: "level-right"
  }, [_c('i', {
    staticClass: "icon image-icon icon-right"
  })])]), _vm._v(" "), _c('router-link', {
    staticClass: "level is-mobile has-bottom-line",
    attrs: {
      "to": {
        name: 'myAddresses'
      },
      "tag": "div"
    }
  }, [_c('div', {
    staticClass: "level-left"
  }, [_c('i', {
    staticClass: "icon image-icon icon-address",
    staticStyle: {
      "margin-right": "0.8rem",
      "margin-top": "-.2rem"
    }
  }), _vm._v(" "), _c('h5', {
    staticClass: "subtitle is-5"
  }, [_vm._v(_vm._s(_vm.$t('mall.titles.myAddresses')))])]), _vm._v(" "), _c('div', {
    staticClass: "level-right"
  }, [_c('i', {
    staticClass: "icon image-icon icon-right"
  })])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6393010c", module.exports)
  }
}

/***/ }),

/***/ 1505:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "edit-account"
  }, [_c('form', {
    staticClass: "account-fields",
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.onSubmit($event)
      }
    }
  }, [_c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.userInfo.email),
      expression: "userInfo.email"
    }],
    staticClass: "help is-primary"
  }, [_vm._v(" " + _vm._s(_vm.$t('account.hint.currentBoundEmail', {
    email: _vm.boundEmail
  })) + " ")]), _vm._v(" "), _c('div', [_c('div', {
    staticClass: "field"
  }, [_c('p', {
    staticClass: "control has-icon"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.email),
      expression: "email",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "email",
      "placeholder": _vm.$t('account.placeholder.inputEmail')
    },
    domProps: {
      "value": (_vm.email)
    },
    on: {
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.email = $event.target.value.trim()
      }, _vm.handleValidation],
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon image-icon icon-envelope"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "field"
  }, [_c('p', {
    staticClass: "control has-icon has-button has-button-right"
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
    staticClass: "input",
    attrs: {
      "type": "number",
      "placeholder": _vm.$t('account.placeholder.inputVerifyCode')
    },
    domProps: {
      "value": (_vm.verifyCode)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.verifyCode = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon image-icon icon-shield"
  }), _vm._v(" "), _c('v-touch', {
    staticClass: "button is-primary",
    class: {
      'is-disabled': _vm.$v.email.$invalid || _vm.cooldownCounter > 0,
        'is-loading': _vm.sendingVerifyCode
    },
    attrs: {
      "tag": "button",
      "type": "button",
      "disabled": _vm.$v.email.$invalid || _vm.cooldownCounter > 0
    },
    on: {
      "tap": _vm.sendEmailVerifyCode
    }
  }, [_vm._v("\n            " + _vm._s(_vm.btnFetchVerifyCodeTitle) + "\n          ")])], 1)]), _vm._v(" "), (_vm.userInfo.nil_password) ? _c('div', {
    staticClass: "field"
  }, [_c('p', {
    staticClass: "control has-icons-left has-icons-right"
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
    staticClass: "input",
    attrs: {
      "type": "password",
      "placeholder": _vm.$t('account.placeholder.inputPassword')
    },
    domProps: {
      "value": (_vm.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.password = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon is-left image-icon icon-lock"
  }), _vm._v(" "), (_vm.showPassword) ? _c('v-touch', {
    staticClass: "icon is-right image-icon icon-eye is-clickable",
    attrs: {
      "tag": "span"
    },
    on: {
      "tap": _vm.togglePasswordVisibility
    }
  }) : _c('v-touch', {
    staticClass: "icon is-right image-icon icon-eye-slash is-clickable",
    attrs: {
      "tag": "span"
    },
    on: {
      "tap": _vm.togglePasswordVisibility
    }
  })], 1)]) : _vm._e()]), _vm._v(" "), _c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errorHint),
      expression: "errorHint"
    }],
    staticClass: "help is-danger"
  }, [_c('span', {
    staticClass: "icon image-icon icon-error-sign"
  }), _vm._v(" " + _vm._s(_vm.errorHint) + " ")]), _vm._v(" "), _c('v-touch', {
    staticClass: "button is-info is-submit",
    class: {
      'is-disabled': _vm.$v.$invalid,
        'is-loading': _vm.processing
    },
    attrs: {
      "tag": "button",
      "type": "submit",
      "disabled": _vm.$v.$invalid
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$t('account.bind')) + "\n    ")])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6c3b9cee", module.exports)
  }
}

/***/ }),

/***/ 1508:
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
     require("vue-hot-reload-api").rerender("data-v-6f2754a4", module.exports)
  }
}

/***/ }),

/***/ 1510:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "mall-index"
  }, [_c('scroller', {
    ref: "scroller",
    attrs: {
      "on-load-more": _vm.loadmore
    }
  }, [_c('div', {
    staticClass: "columns is-multiline is-mobile goods-content"
  }, _vm._l((_vm.goodsList), function(item) {
    return _c('v-touch', {
      key: "item.name",
      staticClass: "column is-half has-text-centered goods-item is-paddingless",
      attrs: {
        "tag": "div"
      },
      on: {
        "tap": function($event) {
          _vm.showGoodsDetail(item)
        }
      }
    }, [_c('div', {
      staticClass: "tile is-vertical is-parent"
    }, [_c('div', {
      staticClass: "tile"
    }, [(!item.pic) ? _c('figure', {
      staticClass: "has-hairline-border"
    }, [_c('img', {
      attrs: {
        "src": "https://placehold.it/400x400?text=400x400"
      }
    })]) : _c('figure', {
      staticClass: "has-hairline-border"
    }, [(item.pic) ? _c('img', {
      staticClass: "image",
      attrs: {
        "src": _vm._f("imageStaticUrl")(item.pic.split('|')[0])
      }
    }) : _vm._e()])]), _vm._v(" "), _c('div', {
      staticClass: "tile "
    }, [_c('article', {
      staticClass: "tile is-child"
    }, [_c('p', {
      staticClass: "subtitle is-marginless is-paddingless is-5 is-normal name"
    }, [_vm._v("\n                " + _vm._s(item.name) + "\n              ")]), _vm._v(" "), _c('p', {
      staticClass: "subtitle is-marginless is-paddingless is-5 is-normal is-primary price"
    }, [_c('label', {
      staticClass: "currency",
      class: item.currency
    }, [_vm._v(_vm._s(_vm._f("formatPrice")(item.price)))])])])])])])
  }))])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7065baab", module.exports)
  }
}

/***/ }),

/***/ 1516:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor is-vertical root-container"
  }, [_c('div', {
    staticClass: "top-bar flex-fixed-size"
  }, [_c('div', {
    staticClass: "title-bar"
  }, [_c('h4', {
    staticClass: "title is-4"
  }, [_vm._v(_vm._s(_vm.$t('customerService.title')))])]), _vm._v(" "), _c('nav', {
    staticClass: "nav"
  }, [_c('div', {
    staticClass: "nav-left has-text-left"
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.inApp),
      expression: "inApp"
    }],
    staticClass: "icon image-icon icon-back",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.onBtnBackClicked($event)
      }
    }
  })])])]), _vm._v(" "), _c('slider-nav', {
    ref: "nav",
    staticClass: "flex-fixed-size",
    attrs: {
      "menus": _vm.menus,
      "selectedValue": _vm.$route.name
    },
    on: {
      "onSelect": _vm.switchMenu
    }
  }), _vm._v(" "), _c('transition', [_c('router-view', {
    staticClass: "content-container customer-service flex-take-rest"
  })], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-73f60858", module.exports)
  }
}

/***/ }),

/***/ 1524:
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
     require("vue-hot-reload-api").rerender("data-v-783e656c", module.exports)
  }
}

/***/ }),

/***/ 1525:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "edit-account"
  }, [_c('form', {
    staticClass: "account-fields",
    staticStyle: {
      "margin-top": "2rem"
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.onSubmit($event)
      }
    }
  }, [_c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.userInfo.nickname),
      expression: "userInfo.nickname"
    }],
    staticClass: "help is-primary"
  }, [_vm._v(" " + _vm._s(_vm.$t('account.hint.currentNickName', {
    nickname: _vm.userInfo.nickname
  })) + " ")]), _vm._v(" "), _c('div', [_c('div', {
    staticClass: "field"
  }, [_c('p', {
    staticClass: "control has-icon"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.nickname),
      expression: "nickname",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('account.placeholder.inputNickname')
    },
    domProps: {
      "value": (_vm.nickname)
    },
    on: {
      "input": [function($event) {
        if ($event.target.composing) { return; }
        _vm.nickname = $event.target.value.trim()
      }, _vm.handleValidation],
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "icon image-icon icon-edit"
  })])])]), _vm._v(" "), _c('p', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errorHint),
      expression: "errorHint"
    }],
    staticClass: "help is-danger"
  }, [_c('span', {
    staticClass: "icon image-icon icon-error-sign"
  }), _vm._v(" " + _vm._s(_vm.errorHint) + " ")]), _vm._v(" "), _c('v-touch', {
    staticClass: "button is-info is-submit",
    class: {
      'is-disabled': _vm.$v.$invalid,
        'is-loading': _vm.processing
    },
    attrs: {
      "tag": "button",
      "type": "submit",
      "disabled": _vm.$v.$invalid
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$t('account.update')) + "\n    ")])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-794eb50c", module.exports)
  }
}

/***/ }),

/***/ 1526:
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
     require("vue-hot-reload-api").rerender("data-v-7a944b82", module.exports)
  }
}

/***/ }),

/***/ 1528:
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

/***/ 1536:
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
  }, [_vm._v("3")])]), _vm._v(" "), _vm._m(0)] : [(_vm.currentPage > _vm.pageCount - 2) ? [_vm._m(1), _vm._v(" "), _c('li', [_c('a', {
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
  }, [_vm._v(_vm._s(_vm.pageCount - 1))])])] : [_vm._m(2), _vm._v(" "), _c('li', [_c('a', {
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
  }, [_vm._v(_vm._s(_vm.currentPage + 1))])]), _vm._v(" "), _vm._m(3)]]] : [(_vm.pageCount > 2) ? _c('li', [_c('a', {
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
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('span', [_vm._v("...")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('span', [_vm._v("...")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('span', [_vm._v("...")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8a7e701c", module.exports)
  }
}

/***/ }),

/***/ 1537:
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
     require("vue-hot-reload-api").rerender("data-v-8cbcfce8", module.exports)
  }
}

/***/ }),

/***/ 1540:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "new-address columns is-multiline is-mobile"
  }, [_c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.handleSubmit($event)
      }
    }
  }, [_c('div', {
    staticClass: "column is-12 has-bottom-line"
  }, [_c('div', {
    staticClass: "level is-mobile"
  }, [_c('div', {
    staticClass: "level-item"
  }, [_c('span', {
    staticClass: "subtitle is-5 is-normal width-5"
  }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.name')) + "：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.addressModel.name),
      expression: "addressModel.name",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input no-border",
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('mall.address.namePlaceholder')
    },
    domProps: {
      "value": (_vm.addressModel.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.addressModel.name = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12 has-bottom-line"
  }, [_c('div', {
    staticClass: "level is-mobile"
  }, [_c('div', {
    staticClass: "level-item"
  }, [_c('span', {
    staticClass: "subtitle is-5 is-normal width-5"
  }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.mobile')) + "：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.addressModel.mobile),
      expression: "addressModel.mobile",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input no-border",
    attrs: {
      "type": "number",
      "placeholder": _vm.$t('mall.address.mobilePlaceholder')
    },
    domProps: {
      "value": (_vm.addressModel.mobile)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.addressModel.mobile = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12 has-bottom-line"
  }, [_c('div', {
    staticClass: "level is-mobile has-text-left"
  }, [_c('div', {
    staticClass: "level-item"
  }, [_c('span', {
    staticClass: "subtitle is-5 is-normal width-5"
  }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.area')) + "：")]), _vm._v(" "), _c('city-select', {
    staticStyle: {
      "width": "100%"
    },
    on: {
      "onSelect": _vm.onSelect
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12 has-bottom-line"
  }, [_c('div', {
    staticClass: "level is-mobile"
  }, [_c('div', {
    staticClass: "level-item"
  }, [_c('span', {
    staticClass: "subtitle is-5 is-normal width-5"
  }, [_vm._v(_vm._s(_vm.$t('mall.address.fields.address')) + "：")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.addressModel.address),
      expression: "addressModel.address",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "input no-border",
    attrs: {
      "type": "text",
      "placeholder": _vm.$t('mall.address.addressPlaceholder')
    },
    domProps: {
      "value": (_vm.addressModel.address)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.addressModel.address = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12 has-text-centered"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.errorHint),
      expression: "errorHint"
    }],
    staticClass: "tile is-full has-text-left",
    staticStyle: {
      "margin": "0.5rem"
    }
  }, [_c('span', {
    staticClass: "icon is-sign"
  }, [_vm._v("!")]), _vm._v(" "), _c('span', {
    staticClass: "is-primary",
    staticStyle: {
      "font-size": "1rem"
    }
  }, [_vm._v(_vm._s(_vm.errorHint))])]), _vm._v(" "), _c('v-touch', {
    staticClass: "button is-info is-large is-fullwidth",
    class: _vm.processing || _vm.$v.$invalid ? 'is-disabled' : '',
    attrs: {
      "tag": "a",
      "disabled": _vm.$v.$invalid
    },
    on: {
      "tap": _vm.handleSubmit
    }
  }, [_vm._v(_vm._s(_vm.$t('common.save')))])], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-961904a6", module.exports)
  }
}

/***/ }),

/***/ 1541:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor is-vertical root-container"
  }, [_c('div', {
    staticClass: "top-bar flex-fixed-size"
  }, [_c('div', {
    staticClass: "title-bar"
  }, [(_vm.$route.name == 'goodsIndex') ? _c('h4', {
    staticClass: "title is-4"
  }, [_vm._v(_vm._s(_vm.mall.title))]) : _c('h4', {
    staticClass: "title is-4"
  }, [_vm._v(_vm._s(_vm.$t('mall.titles.' + _vm.$route.name)))])]), _vm._v(" "), _c('nav', {
    staticClass: "nav"
  }, [_c('div', {
    staticClass: "nav-left has-text-left"
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.inApp),
      expression: "inApp"
    }],
    staticClass: "icon image-icon icon-back",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.onBtnBackClicked($event)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "nav-center"
  }), _vm._v(" "), _c('div', {
    staticClass: "nav-right has-text-right"
  }, [_c('router-link', {
    staticClass: "icon image-icon icon-user",
    attrs: {
      "to": {
        name: 'mine'
      }
    }
  })], 1)])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": _vm.transitionName
    }
  }, [_c('router-view', {
    staticClass: "content-container flex-take-rest mall"
  })], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9750811c", module.exports)
  }
}

/***/ }),

/***/ 1547:
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
     require("vue-hot-reload-api").rerender("data-v-a3dd04b6", module.exports)
  }
}

/***/ }),

/***/ 1548:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor is-vertical root-container games"
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.inApp),
      expression: "inApp"
    }],
    staticClass: "icon image-icon icon-back",
    on: {
      "click": _vm.onBtnBackClicked
    }
  }), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.inApp),
      expression: "inApp"
    }],
    staticClass: "icon image-icon icon-close",
    on: {
      "click": _vm.onBtnCloseClicked
    }
  }), _vm._v(" "), _c('slider-nav', {
    ref: "nav",
    staticClass: "flex-fixed-size",
    attrs: {
      "menus": _vm.menus
    },
    on: {
      "onSelect": _vm.switchMenu
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "flex-take-rest",
    staticStyle: {
      "position": "relative"
    }
  }, [_c('transition', {
    attrs: {
      "name": _vm.transitionName
    }
  }, [_c('router-view')], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a3f2dbce", module.exports)
  }
}

/***/ }),

/***/ 1555:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    on: {
      "click": function($event) {
        _vm.selectedId == _vm.question.id ? _vm.selectedId = '' : _vm.selectedId = _vm.question.id
      }
    }
  }, [_c('div', {
    staticClass: "level-content"
  }, [_c('nav', {
    staticClass: "level is-mobile"
  }, [_c('div', {
    staticClass: "level-left"
  }, [_c('p', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm._f("formatServerDateTime")(_vm.question.inserted_at)))])]), _vm._v(" "), _c('div', {
    staticClass: "level-right"
  }, [(_vm.question.answer === null) ? _c('p', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('customerService.myService.noReply')))]) : _c('p', {
    staticClass: "service-reply subtitle is-6"
  }, [_vm._v(_vm._s(_vm.$t('customerService.myService.alreadyReply')))])])])]), _vm._v(" "), _c('div', {
    staticClass: "level-content"
  }, [_c('nav', {
    staticClass: "level is-mobile"
  }, [_c('div', {
    staticClass: "level-left"
  }, [_c('p', {
    staticClass: "subtitle is-6"
  }, [_vm._v(_vm._s(_vm.question.title))])]), _vm._v(" "), _vm._m(0)])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.selectedId == _vm.question.id && _vm.question.answer !== null),
      expression: "selectedId==question.id && question.answer!==null"
    }],
    staticClass: "level-content reply-content"
  }, [_c('p', {
    staticClass: "subtitle is-6 is-marginless"
  }, [_vm._v(" " + _vm._s(_vm.$t('customerService.reply')))]), _vm._v(" "), _c('article', {
    staticClass: "message"
  }, [_c('div', {
    staticClass: "message-body subtitle is-6"
  }, [_vm._v("\n        " + _vm._s(_vm.question.answer) + "\n      ")])])]), _vm._v(" "), _c('hr')])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "level-right"
  }, [_c('p', {
    staticClass: "subtitle is-6",
    staticStyle: {
      "padding-right": "0.20rem"
    }
  }, [_vm._v(">")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b39b5e1e", module.exports)
  }
}

/***/ }),

/***/ 1558:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "columns is-multiline is-mobile"
  }, [_c('div', {
    staticClass: "column is-12 is-paddingless",
    staticStyle: {
      "margin-top": "1rem"
    }
  }, [_c('span', {
    staticClass: "select"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.province),
      expression: "province"
    }],
    staticClass: "select-content",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.province = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("选择省")]), _vm._v(" "), _vm._l((_vm.provinces), function(province) {
    return _c('option', {
      domProps: {
        "value": province.code
      }
    }, [_vm._v(_vm._s(province.name))])
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12 is-paddingless",
    staticStyle: {
      "margin-top": "0.5rem"
    }
  }, [_c('span', {
    staticClass: "select"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.city),
      expression: "city"
    }],
    staticClass: "select-content",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.city = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("选择城市")]), _vm._v(" "), _vm._l((_vm.cities), function(city) {
    return _c('option', {
      domProps: {
        "value": city.code
      }
    }, [_vm._v(_vm._s(city.name))])
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "column is-12 is-paddingless",
    staticStyle: {
      "margin-top": "0.5rem",
      "margin-bottom": "1rem"
    }
  }, [_c('span', {
    staticClass: "select"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.district),
      expression: "district"
    }],
    staticClass: "select-content",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.district = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("选择县/区")]), _vm._v(" "), _vm._l((_vm.districts), function(district) {
    return _c('option', {
      domProps: {
        "value": district.code
      }
    }, [_vm._v(_vm._s(district.name))])
  })], 2)])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b7fbb332", module.exports)
  }
}

/***/ }),

/***/ 1567:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('scroller', [(_vm.news) ? _c('news-detail-view', {
    attrs: {
      "item-data": _vm.news
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c5360438", module.exports)
  }
}

/***/ }),

/***/ 1568:
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
        "src": forum.icon ? (forum.icon | _vm.imageStaticUrl) : 'https://placehold.it/64x64?text=128x128'
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
     require("vue-hot-reload-api").rerender("data-v-c955833a", module.exports)
  }
}

/***/ }),

/***/ 1575:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor is-vertical root-container"
  }, [_c('div', {
    staticClass: "top-bar flex-fixed-size"
  }, [_c('router-link', {
    staticClass: "title-bar",
    attrs: {
      "to": {
        name: 'postList'
      },
      "tag": "div"
    }
  }, [_c('h4', {
    staticClass: "title is-4"
  }, [_vm._v(_vm._s(_vm.forumInfo.title))])]), _vm._v(" "), _c('nav', {
    staticClass: "nav"
  }, [_c('div', {
    staticClass: "nav-left has-text-left"
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.inApp),
      expression: "inApp"
    }],
    staticClass: "icon image-icon icon-back",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.onBtnBackClicked($event)
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "nav-center"
  }), _vm._v(" "), _c('div', {
    staticClass: "nav-right has-text-right top-icon"
  }, [(_vm.$route.name == 'postList') ? _c('router-link', {
    staticClass: "icon image-icon icon-search",
    attrs: {
      "to": {
        name: 'search'
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.$route.name == 'postList') ? _c('a', {
    staticClass: "icon image-icon icon-user",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.showPage('personalPage')
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.$route.name == 'postList') ? _c('a', {
    staticClass: "button level-button is-info",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.showPage('newPost')
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('forum.postList.newPost')))]) : _vm._e(), _vm._v(" "), (_vm.$route.name == 'detail') ? _c('a', {
    staticClass: "button level-button is-info",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.showPage('newComment')
      }
    }
  }, [_vm._v(_vm._s(_vm.$t('forum.writeComment.btnTitle')))]) : _vm._e()], 1)])], 1), _vm._v(" "), _c('transition', {
    attrs: {
      "name": _vm.transitionName
    }
  }, [_c('router-view', {
    staticClass: "content-container flex-take-rest forum"
  })], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e639a132", module.exports)
  }
}

/***/ }),

/***/ 1576:
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
     require("vue-hot-reload-api").rerender("data-v-e6804288", module.exports)
  }
}

/***/ }),

/***/ 1582:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tile is-ancestor is-vertical root-container payment-page"
  }, [_c('div', {
    staticClass: "top-bar"
  }, [_c('div', {
    staticClass: "title-bar"
  }, [_c('h4', {
    staticClass: "title is-4"
  }, [_vm._v(_vm._s(_vm.$t('payment.paymentTitle')))])]), _vm._v(" "), _c('nav', {
    staticClass: "nav"
  }, [_c('div', {
    staticClass: "nav-left has-text-left"
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.inApp),
      expression: "inApp"
    }],
    staticClass: "icon image-icon icon-back",
    on: {
      "click": _vm.onBtnBackClicked
    }
  })])])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": _vm.transitionName
    }
  }, [_c('router-view', {
    staticClass: "content-container"
  })], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f721ac18", module.exports)
  }
}

/***/ }),

/***/ 1584:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my-orders"
  }, [_c('div', {
    staticClass: "card"
  }, [_c('header', {
    staticClass: "card-header has-bottom-line"
  }, [_c('div', {
    staticClass: "card-header-title is-vertical"
  }, [_c('p', {
    staticClass: "is-thickness"
  }, [_vm._v(" " + _vm._s(_vm.$t('mall.order.fields.address.name')) + "：" + _vm._s(this.selectedOrder.address.name) + " ")]), _vm._v(" "), _c('p', {
    staticClass: "is-thickness"
  }, [_vm._v(" " + _vm._s(_vm.$t('mall.order.fields.address.mobile')) + "：" + _vm._s(this.selectedOrder.address.mobile) + " ")]), _vm._v(" "), _c('p', {
    staticClass: "is-thickness"
  }, [_vm._v(" " + _vm._s(_vm.$t('mall.order.fields.address.address')) + "：" + _vm._s(this.selectedOrder.address.area) + _vm._s(this.selectedOrder.address.address) + "\n        ")])])]), _vm._v(" "), _c('div', {
    staticClass: "card-content has-bottom-line"
  }, [_c('div', {
    staticClass: "columns is-mobile is-multiline",
    staticStyle: {
      "margin": "0"
    }
  }, [_vm._l((this.selectedOrder.details), function(detail) {
    return _c('div', {
      staticClass: "column is-narrow",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.viewSnapshot(detail.mall_goods_id)
        }
      }
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
      attrs: {
        "src": _vm._f("imageStaticUrl")(detail.goods_pic.split('|')[0])
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "media-content"
    }, [_c('p', [_vm._v(_vm._s(detail.goods_name))]), _vm._v(" "), _c('p', {
      staticClass: "is-primary currency",
      class: _vm.selectedOrder.currency
    }, [_vm._v(_vm._s(_vm._f("formatPrice")(detail.price)))]), _vm._v(" "), _c('p', [_vm._v("X" + _vm._s(detail.amount) + " ")])])])])
  }), _vm._v(" "), _c('p', {
    staticClass: "column is-12 has-text-right is-primary"
  }, [_vm._v("\n          " + _vm._s(_vm.$t('mall.order.fields.total')) + ":\n          "), _c('span', {
    staticClass: "currency",
    class: _vm.selectedOrder.currency
  }, [_vm._v(_vm._s(_vm._f("formatPrice")(this.selectedOrder.price)))]), _vm._v(" (" + _vm._s(_vm.$t('mall.order.fields.with_postage')) + "\n          "), _c('span', {
    staticClass: "currency",
    class: _vm.selectedOrder.currency
  }, [_vm._v(_vm._s(_vm._f("formatPrice")(this.selectedOrder.postage)))]), _vm._v(" )\n        ")])], 2)]), _vm._v(" "), _c('footer', {
    staticClass: "card-footer has-bottom-line"
  }, [_c('div', {
    staticClass: "card-footer-item is-vertical"
  }, [_c('p', {
    staticClass: "is-thickness"
  }, [_vm._v(_vm._s(_vm.$t('mall.order.fields.id')) + "：" + _vm._s(this.selectedOrder.id) + " ")]), _vm._v(" "), _c('p', {
    staticClass: "is-thickness"
  }, [_vm._v(_vm._s(_vm.$t('mall.order.fields.status')) + "：" + _vm._s(_vm.$t('mall.order.status.' + this.selectedOrder.status)) + "\n        ")]), _vm._v(" "), _c('p', {
    staticClass: "is-thickness"
  }, [_vm._v(_vm._s(_vm.$t('mall.order.fields.inserted_at')) + "：" + _vm._s(_vm._f("formatServerDateTime")(this.selectedOrder.inserted_at)) + "\n        ")])])])]), _vm._v(" "), _c('div', {
    staticClass: "order-bottom"
  }, [(this.selectedOrder.status == 0) ? [(this.isSupportWechat()) ? _c('v-touch', {
    staticClass: "button is-fullwidth is-info is-medium",
    class: _vm.wechatPayLoading ? 'is-loading' : '',
    attrs: {
      "disabled": _vm.wechatPayDisabled
    },
    on: {
      "tap": function($event) {
        _vm.onPrepay('wechat')
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$t('mall.order.buttons.wechatPay')) + "\n      ")]) : _vm._e(), _vm._v(" "), _c('v-touch', {
    staticClass: "button is-fullwidth is-info is-medium",
    class: _vm.aliPayLoading ? 'is-loading' : '',
    attrs: {
      "disabled": _vm.aliPayDisabled
    },
    on: {
      "tap": function($event) {
        _vm.onPrepay('alipay')
      }
    }
  }, [_vm._v("\n        " + _vm._s(_vm.$t('mall.order.buttons.aliPay')) + "\n      ")])] : _vm._e(), _vm._v(" "), (this.selectedOrder.status == 1 || this.selectedOrder.status == 2) ? _c('v-touch', {
    staticClass: "button is-fullwidth is-info is-medium",
    on: {
      "tap": _vm.confirmRecieved
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$t('mall.order.buttons.reciept')) + "\n    ")]) : _vm._e(), _vm._v(" "), (this.selectedOrder.status == -1 || this.selectedOrder.status == 4) ? _c('v-touch', {
    staticClass: "button is-fullwidth is-info is-medium",
    on: {
      "tap": function($event) {
        _vm.onReOrder()
      }
    }
  }, [_vm._v("\n      " + _vm._s(_vm.$t('mall.order.buttons.reOrder')) + "\n    ")]) : _vm._e()], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-fe1ebcd4", module.exports)
  }
}

/***/ }),

/***/ 1588:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(703);


/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return showImageUploadDialog; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var ImageUploadDialog = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(483));

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

/***/ 183:
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

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return isValidEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return isValidFirevaleEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return isValidMobileNumber; });
/* unused harmony export isValidAccountName */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return isValidResidentId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return emailMask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return mobileMask; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return guid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return nowFromServer; });
/* unused harmony export chunkify */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return formatEmojiChars; });
/* unused harmony export removeEmojiChars */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return minLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return maxLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return concatAndResolveUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return updateQueryStringParameter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date__ = __webpack_require__(65);
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

/***/ 393:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hammerjs__ = __webpack_require__(397);
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

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return SET_TRANSITION_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SET_CURRENT_SECTION_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SET_CURRENT_POST_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return SET_POSTS_ORDER_BY_FIELD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return RESET_POST_EDITING_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return ADD_SEARCH_HISTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return SET_USER_PROFILE; });
/* unused harmony export ADD_SEARCH_HISTORY_KEYWORD */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return CLEAR_SEARCH_HISTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return UPDATE_FORUM_INFO; });
/* unused harmony export UPDATE_KEYWORD */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return SET_COMMON_ISSUES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return UPDATE_USER_POST_COUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return UPDATE_USER_MOBILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return UPDATE_USER_EMAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return UPDATE_USER_NICKNAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return UPDATE_USER_AVATAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return UPDATE_USER_RESIDENT_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return DECR_USER_POST_COUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UPDATE_MALL_SHOPPINGCART; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return UPDATE_SELECTED_ADDRESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return UPDATE_SELECTED_GOODS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return UPDATE_SELECTED_ORDER; });
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

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return showProgress; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_progress__ = __webpack_require__(448);


__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1__vue_progress__["a" /* default */]);

var Progress = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(484));

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

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Vue-Quill-Editor
 * @author Surmon.me
 */

window.Quill = __webpack_require__(164);
var quillEditor = __webpack_require__(417);
var VueQuillEditor = {
  Quill: Quill,
  quillEditor: quillEditor,
  install: function install(Vue) {
    Vue.component('quill-editor', quillEditor);
  }
};

module.exports = VueQuillEditor;

/***/ }),

/***/ 405:
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

/***/ 406:
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

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_quill__ = __webpack_require__(164);
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




__webpack_require__(413);
__webpack_require__(412);

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

/***/ 414:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 417:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(407),
  /* template */
  __webpack_require__(420),
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

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(414)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(408),
  /* template */
  __webpack_require__(419),
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

/***/ 419:
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

/***/ 420:
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

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var Dialog = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(542));

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

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return showMobileMenu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
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

/***/ 438:
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

/***/ 443:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quillContent__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quillContent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__quillContent__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };


/* harmony default export */ __webpack_exports__["a"] = (_extends({}, __WEBPACK_IMPORTED_MODULE_0__quillContent___default.a));

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(446);
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

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dynamic__ = __webpack_require__(444);


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

/***/ 446:
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

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LINE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CIRCLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PATH; });
var LINE = 'line';
var CIRCLE = 'circle';
var PATH = 'path';

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Progress__ = __webpack_require__(489);
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

/***/ 449:
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

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hammerjs__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(393);
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

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(393);



var installed = false;

var vueTouch = { config: __WEBPACK_IMPORTED_MODULE_1__utils__["a" /* config */], customEvents: __WEBPACK_IMPORTED_MODULE_1__utils__["b" /* customEvents */]

  // Plugin API
  // *********
};vueTouch.install = function install(Vue) {
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

/***/ 452:
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

/***/ 453:
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

/***/ 454:
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

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_bulma_modal__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_upload_component__ = __webpack_require__(441);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_upload_component___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_upload_component__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_js_filters__ = __webpack_require__(59);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






var pica = __webpack_require__(476)();





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

/***/ 457:
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

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quillEmpty__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quillEmpty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__quillEmpty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quillImage__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__quillImage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__quillImage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_dynamic__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_filters__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_js_nativeApi__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue__ = __webpack_require__(12);
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

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_progressive_image__ = __webpack_require__(505);
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

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_iscroll_infinite_js__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_iscroll_infinite_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_common_js_iscroll_infinite_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_resizeSensor__ = __webpack_require__(454);
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
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_) {
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_progressbar_js__ = __webpack_require__(478);
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

/***/ 469:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 470:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 471:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 473:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1127)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(919),
  /* template */
  __webpack_require__(1388),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/components/sliderNav.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] sliderNav.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0013e14c", Component.options)
  } else {
    hotAPI.reload("data-v-0013e14c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 483:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(469)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(456),
  /* template */
  __webpack_require__(494),
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

/***/ 484:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(470)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(457),
  /* template */
  __webpack_require__(498),
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

/***/ 485:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(458),
  /* template */
  __webpack_require__(504),
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

/***/ 486:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(459),
  /* template */
  __webpack_require__(496),
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

/***/ 487:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(471)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(460),
  /* template */
  __webpack_require__(501),
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

/***/ 488:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(473)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(461),
  /* template */
  __webpack_require__(503),
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

/***/ 489:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(462),
  /* template */
  __webpack_require__(500),
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

/***/ 49:
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

/***/ 494:
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

/***/ 496:
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

/***/ 498:
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

/***/ 500:
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

/***/ 501:
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

/***/ 503:
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

/***/ 504:
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

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var Dialog = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(1276));

/* harmony default export */ __webpack_exports__["a"] = ({
  showModal: function showModal(propsData) {
    return new Dialog({ el: document.createElement('div'), propsData: propsData });
  }
});

/***/ }),

/***/ 509:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    setErrorMessage: function setErrorMessage(val) {
      var _this = this;

      this.errorMessage = val;
      setTimeout(function (_) {
        _this.errorMessage = '';
      }, 5000);
    },

    handleValidation: function handleValidation() {
      this.$v.$touch();
      this.errorMessage = '';
    },

    togglePasswordVisibility: function togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      if (this.showPassword) {
        this.$refs.password.type = 'text';
      } else {
        this.$refs.password.type = 'password';
      }
    }
  },

  computed: {
    errorHint: function errorHint() {
      if (_typeof(this.$v) == 'object' && this.$v.$error) {
        if (_typeof(this.$v.mobile) == 'object' && !this.$v.mobile.required) {
          return this.$t('error.validation.requireMobile');
        } else if (_typeof(this.$v.mobile) == 'object' && !this.$v.mobile.valid) {
          return this.$t('error.validation.invalidMobileNumber');
        } else if (_typeof(this.$v.mobile) == 'object' && !this.$v.mobile.changed) {
          return this.$t('error.validation.mobileNotChanged');
        } else if (_typeof(this.$v.email) == 'object' && !this.$v.email.required) {
          return this.$t('error.validation.requireEmail');
        } else if (_typeof(this.$v.email) == 'object' && !this.$v.email.valid) {
          return this.$t('error.validation.invalidEmailAddress');
        } else if (_typeof(this.$v.email) == 'object' && !this.$v.email.changed) {
          return this.$t('error.validation.emailNotChanged');
        } else if (_typeof(this.$v.verifyCode) == 'object' && !this.$v.verifyCode.required) {
          return this.$t('error.validation.requireVerifyCode');
        } else if (_typeof(this.$v.verifyCode) == 'object' && !this.$v.verifyCode.minLength) {
          return this.$t('error.validation.invalidVerifyCodeLength');
        } else if (_typeof(this.$v.verifyCode) == 'object' && !this.$v.verifyCode.maxLength) {
          return this.$t('error.validation.invalidVerifyCodeLength');
        } else if (_typeof(this.$v.password) == 'object' && !this.$v.password.required) {
          return this.$t('error.validation.requirePassword');
        } else if (_typeof(this.$v.password) == 'object' && !this.$v.password.minLength) {
          return this.$t('error.validation.minPasswordLength');
        } else if (_typeof(this.$v.password) == 'object' && !this.$v.password.maxLength) {
          return this.$t('error.validation.maxPasswordLength');
        } else if (_typeof(this.$v.nickname) == 'object' && !this.$v.nickname.required) {
          return this.$t('error.validation.requireNickname');
        } else if (_typeof(this.$v.nickname) == 'object' && !this.$v.nickname.minLength) {
          return this.$t('error.validation.minNicknameLength');
        } else if (_typeof(this.$v.nickname) == 'object' && !this.$v.nickname.maxLength) {
          return this.$t('error.validation.maxNicknameLength');
        } else if (_typeof(this.$v.nickname) == 'object' && !this.$v.nickname.valid) {
          return this.$t('error.validation.invalidNickname');
        } else if (_typeof(this.$v.nickname) == 'object' && !this.$v.nickname.emoji) {
          return this.$t('error.validation.emojiNickname');
        } else if (_typeof(this.$v.residentName) == 'object' && !this.$v.residentName.required) {
          return this.$t('error.validation.requireResidentName');
        } else if (_typeof(this.$v.residentName) == 'object' && !this.$v.residentName.minLength) {
          return this.$t('error.validation.minResidentNameLength');
        } else if (_typeof(this.$v.residentName) == 'object' && !this.$v.residentName.maxLength) {
          return this.$t('error.validation.maxResidentNameLength');
        } else if (_typeof(this.$v.residentId) == 'object' && !this.$v.residentId.required) {
          return this.$t('error.validation.requireResidentId');
        } else if (_typeof(this.$v.residentId) == 'object' && !this.$v.residentId.minLength) {
          return this.$t('error.validation.minResidentIdLength');
        } else if (_typeof(this.$v.residentId) == 'object' && !this.$v.residentId.maxLength) {
          return this.$t('error.validation.maxResidentIdLength');
        } else if (_typeof(this.$v.residentId) == 'object' && !this.$v.residentId.valid) {
          return this.$t('error.validation.invalidResidentId');
        }
      } else {
        return this.errorMessage;
      }
    }
  }
});

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);

var toast = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(418));

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

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  ok: 'OK',
  cancel: 'Cancel',
  add: 'Add',
  delete: 'Delete',
  close: 'Close',
  save: 'Save',
  update: 'Update',
  return: 'Reutrn',

  bind: 'Bind',
  camera: 'Take pictures',
  photoLib: 'Select from photo library',
  upload: 'Upload',
  noMoreData: 'No more data',
  confirmDelete: 'Confirm delete'
});

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  filename: 'File name',
  filesize: 'File size',
  progress: 'Progress',
  speed: 'Speed',
  title: 'Upload',
  hint: 'Click here, or drag file to here',
  fileIsTooLarge: 'File size can not exceed {maxFileSize}',
  invalidFileType: 'Not corrent file type: {fileType}',
  imgShouldBeSquare: 'Image should be square',
  imgWidthShouldGreaterThan: 'Image width should be greater than {minWidth}',
  uploadImage: 'Upload image'
});

/***/ }),

/***/ 519:
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

/***/ 52:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(33);



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
      deviceId = window.acsConfig.platform + '.' + __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* guid */])();
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

/***/ 520:
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

/***/ 525:
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

/***/ 526:
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

__webpack_require__(539);
__webpack_require__(540);

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

/***/ 541:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(525),
  /* template */
  __webpack_require__(545),
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

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(541)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(526),
  /* template */
  __webpack_require__(544),
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

/***/ 545:
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

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__zh_hans__ = __webpack_require__(773);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__zh_hant__ = __webpack_require__(780);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__en__ = __webpack_require__(766);




/* harmony default export */ __webpack_exports__["a"] = ({
  'zh-hans': __WEBPACK_IMPORTED_MODULE_0__zh_hans__["a" /* default */],
  'zh-hant': __WEBPACK_IMPORTED_MODULE_1__zh_hant__["a" /* default */],
  'en': __WEBPACK_IMPORTED_MODULE_2__en__["a" /* default */]
});

/***/ }),

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export password */
/* unused harmony export email */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return verifyCode; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_utils__ = __webpack_require__(33);



var password = {
  required: __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["required"],
  minLength: __WEBPACK_IMPORTED_MODULE_1_common_js_utils__["e" /* minLength */](6),
  maxLength: __WEBPACK_IMPORTED_MODULE_1_common_js_utils__["f" /* maxLength */](20)
};

var email = {
  required: __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["required"],
  valid: function valid(val) {
    return __WEBPACK_IMPORTED_MODULE_1_common_js_utils__["h" /* isValidEmail */](val);
  }
};

var verifyCode = {
  required: __WEBPACK_IMPORTED_MODULE_0_vuelidate_lib_validators__["required"],
  minLength: __WEBPACK_IMPORTED_MODULE_1_common_js_utils__["e" /* minLength */](4),
  maxLength: __WEBPACK_IMPORTED_MODULE_1_common_js_utils__["f" /* maxLength */](6)
};

/***/ }),

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return i18n; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_i18n__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__i18n__ = __webpack_require__(549);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_i18n__["a" /* default */]);

var i18n = new __WEBPACK_IMPORTED_MODULE_1_vue_i18n__["a" /* default */]({
  locale: window.acsConfig.locale || 'zh-hans',
  messages: __WEBPACK_IMPORTED_MODULE_2__i18n__["a" /* default */]
});

/***/ }),

/***/ 552:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


var Dialog = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__webpack_require__(1326));

/* harmony default export */ __webpack_exports__["a"] = ({
  show: function show(propsData) {
    var instance = new Dialog({
      el: document.createElement('div'),
      propsData: propsData
    });
  }
});

/***/ }),

/***/ 59:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(33);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "emailMask", function() { return __WEBPACK_IMPORTED_MODULE_1__utils__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mobileMask", function() { return __WEBPACK_IMPORTED_MODULE_1__utils__["c"]; });






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

var isWebpSupported = window.acsConfig.browser == 'chrome' || window.acsConfig.platform == 'android';

var imageStaticUrl = function imageStaticUrl(val) {
  if (typeof val === 'string' && !/^https?:\/\//.test(val)) {
    var base = window.acsConfig.imagesUrl;
    var url = /^https?:\/\//.test(base) ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* concatAndResolveUrl */])(base, val.replace(/^\/?img/, '')) : val;
    // return isWebpSupported ? `${url}.webp` : url
    return url;
  }

  return val;
};

var imageLowQualityUrl = function imageLowQualityUrl(val) {
  return val.replace(/\.jpg((\.webp)?(\?.*)?)$/, '.lq.jpg$1');
};

/***/ }),

/***/ 65:
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

/***/ 695:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1129)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(917),
  /* template */
  __webpack_require__(1398),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-091e8a69",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/components/postListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] postListItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-091e8a69", Component.options)
  } else {
    hotAPI.reload("data-v-091e8a69", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 696:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(918),
  /* template */
  __webpack_require__(1555),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/components/questionItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] questionItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b39b5e1e", Component.options)
  } else {
    hotAPI.reload("data-v-b39b5e1e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 697:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(946),
  /* template */
  __webpack_require__(1567),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/app/views/games/newsDetail.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] newsDetail.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c5360438", Component.options)
  } else {
    hotAPI.reload("data-v-c5360438", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 698:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(1157)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(961),
  /* template */
  __webpack_require__(1558),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/code/static/common/components/citySelect/citySelect.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] citySelect.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b7fbb332", Component.options)
  } else {
    hotAPI.reload("data-v-b7fbb332", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 703:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_polyfill___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_polyfill__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__i18n__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store__ = __webpack_require__(793);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__routes__ = __webpack_require__(787);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vue_i18n__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_common_js_filters__ = __webpack_require__(59);












__webpack_require__(1123);
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

/***/ 707:
/***/ (function(module, exports) {

module.exports = [{"code":"110000","name":"北京市","children":[{"code":"110100","name":"市辖区","children":[{"code":"110101","name":"东城区"},{"code":"110102","name":"西城区"},{"code":"110105","name":"朝阳区"},{"code":"110106","name":"丰台区"},{"code":"110107","name":"石景山区"},{"code":"110108","name":"海淀区"},{"code":"110109","name":"门头沟区"},{"code":"110111","name":"房山区"},{"code":"110112","name":"通州区"},{"code":"110113","name":"顺义区"},{"code":"110114","name":"昌平区"},{"code":"110115","name":"大兴区"},{"code":"110116","name":"怀柔区"},{"code":"110117","name":"平谷区"}]},{"code":"110200","name":"县","children":[{"code":"110228","name":"密云县"},{"code":"110229","name":"延庆县"}]}]},{"code":"120000","name":"天津市","children":[{"code":"120100","name":"市辖区","children":[{"code":"120101","name":"和平区"},{"code":"120102","name":"河东区"},{"code":"120103","name":"河西区"},{"code":"120104","name":"南开区"},{"code":"120105","name":"河北区"},{"code":"120106","name":"红桥区"},{"code":"120110","name":"东丽区"},{"code":"120111","name":"西青区"},{"code":"120112","name":"津南区"},{"code":"120113","name":"北辰区"},{"code":"120114","name":"武清区"},{"code":"120115","name":"宝坻区"},{"code":"120116","name":"滨海新区"}]},{"code":"120200","name":"县","children":[{"code":"120221","name":"宁河县"},{"code":"120223","name":"静海县"},{"code":"120225","name":"蓟县"}]}]},{"code":"130000","name":"河北省","children":[{"code":"130100","name":"石家庄市","children":[{"code":"130101","name":"市辖区"},{"code":"130102","name":"长安区"},{"code":"130104","name":"桥西区"},{"code":"130105","name":"新华区"},{"code":"130107","name":"井陉矿区"},{"code":"130108","name":"裕华区"},{"code":"130109","name":"藁城区"},{"code":"130110","name":"鹿泉区"},{"code":"130111","name":"栾城区"},{"code":"130121","name":"井陉县"},{"code":"130123","name":"正定县"},{"code":"130125","name":"行唐县"},{"code":"130126","name":"灵寿县"},{"code":"130127","name":"高邑县"},{"code":"130128","name":"深泽县"},{"code":"130129","name":"赞皇县"},{"code":"130130","name":"无极县"},{"code":"130131","name":"平山县"},{"code":"130132","name":"元氏县"},{"code":"130133","name":"赵县"},{"code":"130181","name":"辛集市"},{"code":"130183","name":"晋州市"},{"code":"130184","name":"新乐市"}]},{"code":"130200","name":"唐山市","children":[{"code":"130201","name":"市辖区"},{"code":"130202","name":"路南区"},{"code":"130203","name":"路北区"},{"code":"130204","name":"古冶区"},{"code":"130205","name":"开平区"},{"code":"130207","name":"丰南区"},{"code":"130208","name":"丰润区"},{"code":"130209","name":"曹妃甸区"},{"code":"130223","name":"滦县"},{"code":"130224","name":"滦南县"},{"code":"130225","name":"乐亭县"},{"code":"130227","name":"迁西县"},{"code":"130229","name":"玉田县"},{"code":"130281","name":"遵化市"},{"code":"130283","name":"迁安市"}]},{"code":"130300","name":"秦皇岛市","children":[{"code":"130301","name":"市辖区"},{"code":"130302","name":"海港区"},{"code":"130303","name":"山海关区"},{"code":"130304","name":"北戴河区"},{"code":"130321","name":"青龙满族自治县"},{"code":"130322","name":"昌黎县"},{"code":"130323","name":"抚宁县"},{"code":"130324","name":"卢龙县"}]},{"code":"130400","name":"邯郸市","children":[{"code":"130401","name":"市辖区"},{"code":"130402","name":"邯山区"},{"code":"130403","name":"丛台区"},{"code":"130404","name":"复兴区"},{"code":"130406","name":"峰峰矿区"},{"code":"130421","name":"邯郸县"},{"code":"130423","name":"临漳县"},{"code":"130424","name":"成安县"},{"code":"130425","name":"大名县"},{"code":"130426","name":"涉县"},{"code":"130427","name":"磁县"},{"code":"130428","name":"肥乡县"},{"code":"130429","name":"永年县"},{"code":"130430","name":"邱县"},{"code":"130431","name":"鸡泽县"},{"code":"130432","name":"广平县"},{"code":"130433","name":"馆陶县"},{"code":"130434","name":"魏县"},{"code":"130435","name":"曲周县"},{"code":"130481","name":"武安市"}]},{"code":"130500","name":"邢台市","children":[{"code":"130501","name":"市辖区"},{"code":"130502","name":"桥东区"},{"code":"130503","name":"桥西区"},{"code":"130521","name":"邢台县"},{"code":"130522","name":"临城县"},{"code":"130523","name":"内丘县"},{"code":"130524","name":"柏乡县"},{"code":"130525","name":"隆尧县"},{"code":"130526","name":"任县"},{"code":"130527","name":"南和县"},{"code":"130528","name":"宁晋县"},{"code":"130529","name":"巨鹿县"},{"code":"130530","name":"新河县"},{"code":"130531","name":"广宗县"},{"code":"130532","name":"平乡县"},{"code":"130533","name":"威县"},{"code":"130534","name":"清河县"},{"code":"130535","name":"临西县"},{"code":"130581","name":"南宫市"},{"code":"130582","name":"沙河市"}]},{"code":"130600","name":"保定市","children":[{"code":"130601","name":"市辖区"},{"code":"130602","name":"新市区"},{"code":"130603","name":"北市区"},{"code":"130604","name":"南市区"},{"code":"130621","name":"满城县"},{"code":"130622","name":"清苑县"},{"code":"130623","name":"涞水县"},{"code":"130624","name":"阜平县"},{"code":"130625","name":"徐水县"},{"code":"130626","name":"定兴县"},{"code":"130627","name":"唐县"},{"code":"130628","name":"高阳县"},{"code":"130629","name":"容城县"},{"code":"130630","name":"涞源县"},{"code":"130631","name":"望都县"},{"code":"130632","name":"安新县"},{"code":"130633","name":"易县"},{"code":"130634","name":"曲阳县"},{"code":"130635","name":"蠡县"},{"code":"130636","name":"顺平县"},{"code":"130637","name":"博野县"},{"code":"130638","name":"雄县"},{"code":"130681","name":"涿州市"},{"code":"130682","name":"定州市"},{"code":"130683","name":"安国市"},{"code":"130684","name":"高碑店市"}]},{"code":"130700","name":"张家口市","children":[{"code":"130701","name":"市辖区"},{"code":"130702","name":"桥东区"},{"code":"130703","name":"桥西区"},{"code":"130705","name":"宣化区"},{"code":"130706","name":"下花园区"},{"code":"130721","name":"宣化县"},{"code":"130722","name":"张北县"},{"code":"130723","name":"康保县"},{"code":"130724","name":"沽源县"},{"code":"130725","name":"尚义县"},{"code":"130726","name":"蔚县"},{"code":"130727","name":"阳原县"},{"code":"130728","name":"怀安县"},{"code":"130729","name":"万全县"},{"code":"130730","name":"怀来县"},{"code":"130731","name":"涿鹿县"},{"code":"130732","name":"赤城县"},{"code":"130733","name":"崇礼县"}]},{"code":"130800","name":"承德市","children":[{"code":"130801","name":"市辖区"},{"code":"130802","name":"双桥区"},{"code":"130803","name":"双滦区"},{"code":"130804","name":"鹰手营子矿区"},{"code":"130821","name":"承德县"},{"code":"130822","name":"兴隆县"},{"code":"130823","name":"平泉县"},{"code":"130824","name":"滦平县"},{"code":"130825","name":"隆化县"},{"code":"130826","name":"丰宁满族自治县"},{"code":"130827","name":"宽城满族自治县"},{"code":"130828","name":"围场满族蒙古族自治县"}]},{"code":"130900","name":"沧州市","children":[{"code":"130901","name":"市辖区"},{"code":"130902","name":"新华区"},{"code":"130903","name":"运河区"},{"code":"130921","name":"沧县"},{"code":"130922","name":"青县"},{"code":"130923","name":"东光县"},{"code":"130924","name":"海兴县"},{"code":"130925","name":"盐山县"},{"code":"130926","name":"肃宁县"},{"code":"130927","name":"南皮县"},{"code":"130928","name":"吴桥县"},{"code":"130929","name":"献县"},{"code":"130930","name":"孟村回族自治县"},{"code":"130981","name":"泊头市"},{"code":"130982","name":"任丘市"},{"code":"130983","name":"黄骅市"},{"code":"130984","name":"河间市"}]},{"code":"131000","name":"廊坊市","children":[{"code":"131001","name":"市辖区"},{"code":"131002","name":"安次区"},{"code":"131003","name":"广阳区"},{"code":"131022","name":"固安县"},{"code":"131023","name":"永清县"},{"code":"131024","name":"香河县"},{"code":"131025","name":"大城县"},{"code":"131026","name":"文安县"},{"code":"131028","name":"大厂回族自治县"},{"code":"131081","name":"霸州市"},{"code":"131082","name":"三河市"}]},{"code":"131100","name":"衡水市","children":[{"code":"131101","name":"市辖区"},{"code":"131102","name":"桃城区"},{"code":"131121","name":"枣强县"},{"code":"131122","name":"武邑县"},{"code":"131123","name":"武强县"},{"code":"131124","name":"饶阳县"},{"code":"131125","name":"安平县"},{"code":"131126","name":"故城县"},{"code":"131127","name":"景县"},{"code":"131128","name":"阜城县"},{"code":"131181","name":"冀州市"},{"code":"131182","name":"深州市"}]}]},{"code":"140000","name":"山西省","children":[{"code":"140100","name":"太原市","children":[{"code":"140101","name":"市辖区"},{"code":"140105","name":"小店区"},{"code":"140106","name":"迎泽区"},{"code":"140107","name":"杏花岭区"},{"code":"140108","name":"尖草坪区"},{"code":"140109","name":"万柏林区"},{"code":"140110","name":"晋源区"},{"code":"140121","name":"清徐县"},{"code":"140122","name":"阳曲县"},{"code":"140123","name":"娄烦县"},{"code":"140181","name":"古交市"}]},{"code":"140200","name":"大同市","children":[{"code":"140201","name":"市辖区"},{"code":"140202","name":"城区"},{"code":"140203","name":"矿区"},{"code":"140211","name":"南郊区"},{"code":"140212","name":"新荣区"},{"code":"140221","name":"阳高县"},{"code":"140222","name":"天镇县"},{"code":"140223","name":"广灵县"},{"code":"140224","name":"灵丘县"},{"code":"140225","name":"浑源县"},{"code":"140226","name":"左云县"},{"code":"140227","name":"大同县"}]},{"code":"140300","name":"阳泉市","children":[{"code":"140301","name":"市辖区"},{"code":"140302","name":"城区"},{"code":"140303","name":"矿区"},{"code":"140311","name":"郊区"},{"code":"140321","name":"平定县"},{"code":"140322","name":"盂县"}]},{"code":"140400","name":"长治市","children":[{"code":"140401","name":"市辖区"},{"code":"140402","name":"城区"},{"code":"140411","name":"郊区"},{"code":"140421","name":"长治县"},{"code":"140423","name":"襄垣县"},{"code":"140424","name":"屯留县"},{"code":"140425","name":"平顺县"},{"code":"140426","name":"黎城县"},{"code":"140427","name":"壶关县"},{"code":"140428","name":"长子县"},{"code":"140429","name":"武乡县"},{"code":"140430","name":"沁县"},{"code":"140431","name":"沁源县"},{"code":"140481","name":"潞城市"}]},{"code":"140500","name":"晋城市","children":[{"code":"140501","name":"市辖区"},{"code":"140502","name":"城区"},{"code":"140521","name":"沁水县"},{"code":"140522","name":"阳城县"},{"code":"140524","name":"陵川县"},{"code":"140525","name":"泽州县"},{"code":"140581","name":"高平市"}]},{"code":"140600","name":"朔州市","children":[{"code":"140601","name":"市辖区"},{"code":"140602","name":"朔城区"},{"code":"140603","name":"平鲁区"},{"code":"140621","name":"山阴县"},{"code":"140622","name":"应县"},{"code":"140623","name":"右玉县"},{"code":"140624","name":"怀仁县"}]},{"code":"140700","name":"晋中市","children":[{"code":"140701","name":"市辖区"},{"code":"140702","name":"榆次区"},{"code":"140721","name":"榆社县"},{"code":"140722","name":"左权县"},{"code":"140723","name":"和顺县"},{"code":"140724","name":"昔阳县"},{"code":"140725","name":"寿阳县"},{"code":"140726","name":"太谷县"},{"code":"140727","name":"祁县"},{"code":"140728","name":"平遥县"},{"code":"140729","name":"灵石县"},{"code":"140781","name":"介休市"}]},{"code":"140800","name":"运城市","children":[{"code":"140801","name":"市辖区"},{"code":"140802","name":"盐湖区"},{"code":"140821","name":"临猗县"},{"code":"140822","name":"万荣县"},{"code":"140823","name":"闻喜县"},{"code":"140824","name":"稷山县"},{"code":"140825","name":"新绛县"},{"code":"140826","name":"绛县"},{"code":"140827","name":"垣曲县"},{"code":"140828","name":"夏县"},{"code":"140829","name":"平陆县"},{"code":"140830","name":"芮城县"},{"code":"140881","name":"永济市"},{"code":"140882","name":"河津市"}]},{"code":"140900","name":"忻州市","children":[{"code":"140901","name":"市辖区"},{"code":"140902","name":"忻府区"},{"code":"140921","name":"定襄县"},{"code":"140922","name":"五台县"},{"code":"140923","name":"代县"},{"code":"140924","name":"繁峙县"},{"code":"140925","name":"宁武县"},{"code":"140926","name":"静乐县"},{"code":"140927","name":"神池县"},{"code":"140928","name":"五寨县"},{"code":"140929","name":"岢岚县"},{"code":"140930","name":"河曲县"},{"code":"140931","name":"保德县"},{"code":"140932","name":"偏关县"},{"code":"140981","name":"原平市"}]},{"code":"141000","name":"临汾市","children":[{"code":"141001","name":"市辖区"},{"code":"141002","name":"尧都区"},{"code":"141021","name":"曲沃县"},{"code":"141022","name":"翼城县"},{"code":"141023","name":"襄汾县"},{"code":"141024","name":"洪洞县"},{"code":"141025","name":"古县"},{"code":"141026","name":"安泽县"},{"code":"141027","name":"浮山县"},{"code":"141028","name":"吉县"},{"code":"141029","name":"乡宁县"},{"code":"141030","name":"大宁县"},{"code":"141031","name":"隰县"},{"code":"141032","name":"永和县"},{"code":"141033","name":"蒲县"},{"code":"141034","name":"汾西县"},{"code":"141081","name":"侯马市"},{"code":"141082","name":"霍州市"}]},{"code":"141100","name":"吕梁市","children":[{"code":"141101","name":"市辖区"},{"code":"141102","name":"离石区"},{"code":"141121","name":"文水县"},{"code":"141122","name":"交城县"},{"code":"141123","name":"兴县"},{"code":"141124","name":"临县"},{"code":"141125","name":"柳林县"},{"code":"141126","name":"石楼县"},{"code":"141127","name":"岚县"},{"code":"141128","name":"方山县"},{"code":"141129","name":"中阳县"},{"code":"141130","name":"交口县"},{"code":"141181","name":"孝义市"},{"code":"141182","name":"汾阳市"}]}]},{"code":"150000","name":"内蒙古自治区","children":[{"code":"150100","name":"呼和浩特市","children":[{"code":"150101","name":"市辖区"},{"code":"150102","name":"新城区"},{"code":"150103","name":"回民区"},{"code":"150104","name":"玉泉区"},{"code":"150105","name":"赛罕区"},{"code":"150121","name":"土默特左旗"},{"code":"150122","name":"托克托县"},{"code":"150123","name":"和林格尔县"},{"code":"150124","name":"清水河县"},{"code":"150125","name":"武川县"}]},{"code":"150200","name":"包头市","children":[{"code":"150201","name":"市辖区"},{"code":"150202","name":"东河区"},{"code":"150203","name":"昆都仑区"},{"code":"150204","name":"青山区"},{"code":"150205","name":"石拐区"},{"code":"150206","name":"白云鄂博矿区"},{"code":"150207","name":"九原区"},{"code":"150221","name":"土默特右旗"},{"code":"150222","name":"固阳县"},{"code":"150223","name":"达尔罕茂明安联合旗"}]},{"code":"150300","name":"乌海市","children":[{"code":"150301","name":"市辖区"},{"code":"150302","name":"海勃湾区"},{"code":"150303","name":"海南区"},{"code":"150304","name":"乌达区"}]},{"code":"150400","name":"赤峰市","children":[{"code":"150401","name":"市辖区"},{"code":"150402","name":"红山区"},{"code":"150403","name":"元宝山区"},{"code":"150404","name":"松山区"},{"code":"150421","name":"阿鲁科尔沁旗"},{"code":"150422","name":"巴林左旗"},{"code":"150423","name":"巴林右旗"},{"code":"150424","name":"林西县"},{"code":"150425","name":"克什克腾旗"},{"code":"150426","name":"翁牛特旗"},{"code":"150428","name":"喀喇沁旗"},{"code":"150429","name":"宁城县"},{"code":"150430","name":"敖汉旗"}]},{"code":"150500","name":"通辽市","children":[{"code":"150501","name":"市辖区"},{"code":"150502","name":"科尔沁区"},{"code":"150521","name":"科尔沁左翼中旗"},{"code":"150522","name":"科尔沁左翼后旗"},{"code":"150523","name":"开鲁县"},{"code":"150524","name":"库伦旗"},{"code":"150525","name":"奈曼旗"},{"code":"150526","name":"扎鲁特旗"},{"code":"150581","name":"霍林郭勒市"}]},{"code":"150600","name":"鄂尔多斯市","children":[{"code":"150601","name":"市辖区"},{"code":"150602","name":"东胜区"},{"code":"150621","name":"达拉特旗"},{"code":"150622","name":"准格尔旗"},{"code":"150623","name":"鄂托克前旗"},{"code":"150624","name":"鄂托克旗"},{"code":"150625","name":"杭锦旗"},{"code":"150626","name":"乌审旗"},{"code":"150627","name":"伊金霍洛旗"}]},{"code":"150700","name":"呼伦贝尔市","children":[{"code":"150701","name":"市辖区"},{"code":"150702","name":"海拉尔区"},{"code":"150703","name":"扎赉诺尔区"},{"code":"150721","name":"阿荣旗"},{"code":"150722","name":"莫力达瓦达斡尔族自治旗"},{"code":"150723","name":"鄂伦春自治旗"},{"code":"150724","name":"鄂温克族自治旗"},{"code":"150725","name":"陈巴尔虎旗"},{"code":"150726","name":"新巴尔虎左旗"},{"code":"150727","name":"新巴尔虎右旗"},{"code":"150781","name":"满洲里市"},{"code":"150782","name":"牙克石市"},{"code":"150783","name":"扎兰屯市"},{"code":"150784","name":"额尔古纳市"},{"code":"150785","name":"根河市"}]},{"code":"150800","name":"巴彦淖尔市","children":[{"code":"150801","name":"市辖区"},{"code":"150802","name":"临河区"},{"code":"150821","name":"五原县"},{"code":"150822","name":"磴口县"},{"code":"150823","name":"乌拉特前旗"},{"code":"150824","name":"乌拉特中旗"},{"code":"150825","name":"乌拉特后旗"},{"code":"150826","name":"杭锦后旗"}]},{"code":"150900","name":"乌兰察布市","children":[{"code":"150901","name":"市辖区"},{"code":"150902","name":"集宁区"},{"code":"150921","name":"卓资县"},{"code":"150922","name":"化德县"},{"code":"150923","name":"商都县"},{"code":"150924","name":"兴和县"},{"code":"150925","name":"凉城县"},{"code":"150926","name":"察哈尔右翼前旗"},{"code":"150927","name":"察哈尔右翼中旗"},{"code":"150928","name":"察哈尔右翼后旗"},{"code":"150929","name":"四子王旗"},{"code":"150981","name":"丰镇市"}]},{"code":"152200","name":"兴安盟","children":[{"code":"152201","name":"乌兰浩特市"},{"code":"152202","name":"阿尔山市"},{"code":"152221","name":"科尔沁右翼前旗"},{"code":"152222","name":"科尔沁右翼中旗"},{"code":"152223","name":"扎赉特旗"},{"code":"152224","name":"突泉县"}]},{"code":"152500","name":"锡林郭勒盟","children":[{"code":"152501","name":"二连浩特市"},{"code":"152502","name":"锡林浩特市"},{"code":"152522","name":"阿巴嘎旗"},{"code":"152523","name":"苏尼特左旗"},{"code":"152524","name":"苏尼特右旗"},{"code":"152525","name":"东乌珠穆沁旗"},{"code":"152526","name":"西乌珠穆沁旗"},{"code":"152527","name":"太仆寺旗"},{"code":"152528","name":"镶黄旗"},{"code":"152529","name":"正镶白旗"},{"code":"152530","name":"正蓝旗"},{"code":"152531","name":"多伦县"}]},{"code":"152900","name":"阿拉善盟","children":[{"code":"152921","name":"阿拉善左旗"},{"code":"152922","name":"阿拉善右旗"},{"code":"152923","name":"额济纳旗"}]}]},{"code":"210000","name":"辽宁省","children":[{"code":"210100","name":"沈阳市","children":[{"code":"210101","name":"市辖区"},{"code":"210102","name":"和平区"},{"code":"210103","name":"沈河区"},{"code":"210104","name":"大东区"},{"code":"210105","name":"皇姑区"},{"code":"210106","name":"铁西区"},{"code":"210111","name":"苏家屯区"},{"code":"210112","name":"浑南区"},{"code":"210113","name":"沈北新区"},{"code":"210114","name":"于洪区"},{"code":"210122","name":"辽中县"},{"code":"210123","name":"康平县"},{"code":"210124","name":"法库县"},{"code":"210181","name":"新民市"}]},{"code":"210200","name":"大连市","children":[{"code":"210201","name":"市辖区"},{"code":"210202","name":"中山区"},{"code":"210203","name":"西岗区"},{"code":"210204","name":"沙河口区"},{"code":"210211","name":"甘井子区"},{"code":"210212","name":"旅顺口区"},{"code":"210213","name":"金州区"},{"code":"210224","name":"长海县"},{"code":"210281","name":"瓦房店市"},{"code":"210282","name":"普兰店市"},{"code":"210283","name":"庄河市"}]},{"code":"210300","name":"鞍山市","children":[{"code":"210301","name":"市辖区"},{"code":"210302","name":"铁东区"},{"code":"210303","name":"铁西区"},{"code":"210304","name":"立山区"},{"code":"210311","name":"千山区"},{"code":"210321","name":"台安县"},{"code":"210323","name":"岫岩满族自治县"},{"code":"210381","name":"海城市"}]},{"code":"210400","name":"抚顺市","children":[{"code":"210401","name":"市辖区"},{"code":"210402","name":"新抚区"},{"code":"210403","name":"东洲区"},{"code":"210404","name":"望花区"},{"code":"210411","name":"顺城区"},{"code":"210421","name":"抚顺县"},{"code":"210422","name":"新宾满族自治县"},{"code":"210423","name":"清原满族自治县"}]},{"code":"210500","name":"本溪市","children":[{"code":"210501","name":"市辖区"},{"code":"210502","name":"平山区"},{"code":"210503","name":"溪湖区"},{"code":"210504","name":"明山区"},{"code":"210505","name":"南芬区"},{"code":"210521","name":"本溪满族自治县"},{"code":"210522","name":"桓仁满族自治县"}]},{"code":"210600","name":"丹东市","children":[{"code":"210601","name":"市辖区"},{"code":"210602","name":"元宝区"},{"code":"210603","name":"振兴区"},{"code":"210604","name":"振安区"},{"code":"210624","name":"宽甸满族自治县"},{"code":"210681","name":"东港市"},{"code":"210682","name":"凤城市"}]},{"code":"210700","name":"锦州市","children":[{"code":"210701","name":"市辖区"},{"code":"210702","name":"古塔区"},{"code":"210703","name":"凌河区"},{"code":"210711","name":"太和区"},{"code":"210726","name":"黑山县"},{"code":"210727","name":"义县"},{"code":"210781","name":"凌海市"},{"code":"210782","name":"北镇市"}]},{"code":"210800","name":"营口市","children":[{"code":"210801","name":"市辖区"},{"code":"210802","name":"站前区"},{"code":"210803","name":"西市区"},{"code":"210804","name":"鲅鱼圈区"},{"code":"210811","name":"老边区"},{"code":"210881","name":"盖州市"},{"code":"210882","name":"大石桥市"}]},{"code":"210900","name":"阜新市","children":[{"code":"210901","name":"市辖区"},{"code":"210902","name":"海州区"},{"code":"210903","name":"新邱区"},{"code":"210904","name":"太平区"},{"code":"210905","name":"清河门区"},{"code":"210911","name":"细河区"},{"code":"210921","name":"阜新蒙古族自治县"},{"code":"210922","name":"彰武县"}]},{"code":"211000","name":"辽阳市","children":[{"code":"211001","name":"市辖区"},{"code":"211002","name":"白塔区"},{"code":"211003","name":"文圣区"},{"code":"211004","name":"宏伟区"},{"code":"211005","name":"弓长岭区"},{"code":"211011","name":"太子河区"},{"code":"211021","name":"辽阳县"},{"code":"211081","name":"灯塔市"}]},{"code":"211100","name":"盘锦市","children":[{"code":"211101","name":"市辖区"},{"code":"211102","name":"双台子区"},{"code":"211103","name":"兴隆台区"},{"code":"211121","name":"大洼县"},{"code":"211122","name":"盘山县"}]},{"code":"211200","name":"铁岭市","children":[{"code":"211201","name":"市辖区"},{"code":"211202","name":"银州区"},{"code":"211204","name":"清河区"},{"code":"211221","name":"铁岭县"},{"code":"211223","name":"西丰县"},{"code":"211224","name":"昌图县"},{"code":"211281","name":"调兵山市"},{"code":"211282","name":"开原市"}]},{"code":"211300","name":"朝阳市","children":[{"code":"211301","name":"市辖区"},{"code":"211302","name":"双塔区"},{"code":"211303","name":"龙城区"},{"code":"211321","name":"朝阳县"},{"code":"211322","name":"建平县"},{"code":"211324","name":"喀喇沁左翼蒙古族自治县"},{"code":"211381","name":"北票市"},{"code":"211382","name":"凌源市"}]},{"code":"211400","name":"葫芦岛市","children":[{"code":"211401","name":"市辖区"},{"code":"211402","name":"连山区"},{"code":"211403","name":"龙港区"},{"code":"211404","name":"南票区"},{"code":"211421","name":"绥中县"},{"code":"211422","name":"建昌县"},{"code":"211481","name":"兴城市"}]}]},{"code":"220000","name":"吉林省","children":[{"code":"220100","name":"长春市","children":[{"code":"220101","name":"市辖区"},{"code":"220102","name":"南关区"},{"code":"220103","name":"宽城区"},{"code":"220104","name":"朝阳区"},{"code":"220105","name":"二道区"},{"code":"220106","name":"绿园区"},{"code":"220112","name":"双阳区"},{"code":"220113","name":"九台区"},{"code":"220122","name":"农安县"},{"code":"220182","name":"榆树市"},{"code":"220183","name":"德惠市"}]},{"code":"220200","name":"吉林市","children":[{"code":"220201","name":"市辖区"},{"code":"220202","name":"昌邑区"},{"code":"220203","name":"龙潭区"},{"code":"220204","name":"船营区"},{"code":"220211","name":"丰满区"},{"code":"220221","name":"永吉县"},{"code":"220281","name":"蛟河市"},{"code":"220282","name":"桦甸市"},{"code":"220283","name":"舒兰市"},{"code":"220284","name":"磐石市"}]},{"code":"220300","name":"四平市","children":[{"code":"220301","name":"市辖区"},{"code":"220302","name":"铁西区"},{"code":"220303","name":"铁东区"},{"code":"220322","name":"梨树县"},{"code":"220323","name":"伊通满族自治县"},{"code":"220381","name":"公主岭市"},{"code":"220382","name":"双辽市"}]},{"code":"220400","name":"辽源市","children":[{"code":"220401","name":"市辖区"},{"code":"220402","name":"龙山区"},{"code":"220403","name":"西安区"},{"code":"220421","name":"东丰县"},{"code":"220422","name":"东辽县"}]},{"code":"220500","name":"通化市","children":[{"code":"220501","name":"市辖区"},{"code":"220502","name":"东昌区"},{"code":"220503","name":"二道江区"},{"code":"220521","name":"通化县"},{"code":"220523","name":"辉南县"},{"code":"220524","name":"柳河县"},{"code":"220581","name":"梅河口市"},{"code":"220582","name":"集安市"}]},{"code":"220600","name":"白山市","children":[{"code":"220601","name":"市辖区"},{"code":"220602","name":"浑江区"},{"code":"220605","name":"江源区"},{"code":"220621","name":"抚松县"},{"code":"220622","name":"靖宇县"},{"code":"220623","name":"长白朝鲜族自治县"},{"code":"220681","name":"临江市"}]},{"code":"220700","name":"松原市","children":[{"code":"220701","name":"市辖区"},{"code":"220702","name":"宁江区"},{"code":"220721","name":"前郭尔罗斯蒙古族自治县"},{"code":"220722","name":"长岭县"},{"code":"220723","name":"乾安县"},{"code":"220781","name":"扶余市"}]},{"code":"220800","name":"白城市","children":[{"code":"220801","name":"市辖区"},{"code":"220802","name":"洮北区"},{"code":"220821","name":"镇赉县"},{"code":"220822","name":"通榆县"},{"code":"220881","name":"洮南市"},{"code":"220882","name":"大安市"}]},{"code":"222400","name":"延边朝鲜族自治州","children":[{"code":"222401","name":"延吉市"},{"code":"222402","name":"图们市"},{"code":"222403","name":"敦化市"},{"code":"222404","name":"珲春市"},{"code":"222405","name":"龙井市"},{"code":"222406","name":"和龙市"},{"code":"222424","name":"汪清县"},{"code":"222426","name":"安图县"}]}]},{"code":"230000","name":"黑龙江省","children":[{"code":"230100","name":"哈尔滨市","children":[{"code":"230101","name":"市辖区"},{"code":"230102","name":"道里区"},{"code":"230103","name":"南岗区"},{"code":"230104","name":"道外区"},{"code":"230108","name":"平房区"},{"code":"230109","name":"松北区"},{"code":"230110","name":"香坊区"},{"code":"230111","name":"呼兰区"},{"code":"230112","name":"阿城区"},{"code":"230123","name":"依兰县"},{"code":"230124","name":"方正县"},{"code":"230125","name":"宾县"},{"code":"230126","name":"巴彦县"},{"code":"230127","name":"木兰县"},{"code":"230128","name":"通河县"},{"code":"230129","name":"延寿县"},{"code":"230182","name":"双城市"},{"code":"230183","name":"尚志市"},{"code":"230184","name":"五常市"}]},{"code":"230200","name":"齐齐哈尔市","children":[{"code":"230201","name":"市辖区"},{"code":"230202","name":"龙沙区"},{"code":"230203","name":"建华区"},{"code":"230204","name":"铁锋区"},{"code":"230205","name":"昂昂溪区"},{"code":"230206","name":"富拉尔基区"},{"code":"230207","name":"碾子山区"},{"code":"230208","name":"梅里斯达斡尔族区"},{"code":"230221","name":"龙江县"},{"code":"230223","name":"依安县"},{"code":"230224","name":"泰来县"},{"code":"230225","name":"甘南县"},{"code":"230227","name":"富裕县"},{"code":"230229","name":"克山县"},{"code":"230230","name":"克东县"},{"code":"230231","name":"拜泉县"},{"code":"230281","name":"讷河市"}]},{"code":"230300","name":"鸡西市","children":[{"code":"230301","name":"市辖区"},{"code":"230302","name":"鸡冠区"},{"code":"230303","name":"恒山区"},{"code":"230304","name":"滴道区"},{"code":"230305","name":"梨树区"},{"code":"230306","name":"城子河区"},{"code":"230307","name":"麻山区"},{"code":"230321","name":"鸡东县"},{"code":"230381","name":"虎林市"},{"code":"230382","name":"密山市"}]},{"code":"230400","name":"鹤岗市","children":[{"code":"230401","name":"市辖区"},{"code":"230402","name":"向阳区"},{"code":"230403","name":"工农区"},{"code":"230404","name":"南山区"},{"code":"230405","name":"兴安区"},{"code":"230406","name":"东山区"},{"code":"230407","name":"兴山区"},{"code":"230421","name":"萝北县"},{"code":"230422","name":"绥滨县"}]},{"code":"230500","name":"双鸭山市","children":[{"code":"230501","name":"市辖区"},{"code":"230502","name":"尖山区"},{"code":"230503","name":"岭东区"},{"code":"230505","name":"四方台区"},{"code":"230506","name":"宝山区"},{"code":"230521","name":"集贤县"},{"code":"230522","name":"友谊县"},{"code":"230523","name":"宝清县"},{"code":"230524","name":"饶河县"}]},{"code":"230600","name":"大庆市","children":[{"code":"230601","name":"市辖区"},{"code":"230602","name":"萨尔图区"},{"code":"230603","name":"龙凤区"},{"code":"230604","name":"让胡路区"},{"code":"230605","name":"红岗区"},{"code":"230606","name":"大同区"},{"code":"230621","name":"肇州县"},{"code":"230622","name":"肇源县"},{"code":"230623","name":"林甸县"},{"code":"230624","name":"杜尔伯特蒙古族自治县"}]},{"code":"230700","name":"伊春市","children":[{"code":"230701","name":"市辖区"},{"code":"230702","name":"伊春区"},{"code":"230703","name":"南岔区"},{"code":"230704","name":"友好区"},{"code":"230705","name":"西林区"},{"code":"230706","name":"翠峦区"},{"code":"230707","name":"新青区"},{"code":"230708","name":"美溪区"},{"code":"230709","name":"金山屯区"},{"code":"230710","name":"五营区"},{"code":"230711","name":"乌马河区"},{"code":"230712","name":"汤旺河区"},{"code":"230713","name":"带岭区"},{"code":"230714","name":"乌伊岭区"},{"code":"230715","name":"红星区"},{"code":"230716","name":"上甘岭区"},{"code":"230722","name":"嘉荫县"},{"code":"230781","name":"铁力市"}]},{"code":"230800","name":"佳木斯市","children":[{"code":"230801","name":"市辖区"},{"code":"230803","name":"向阳区"},{"code":"230804","name":"前进区"},{"code":"230805","name":"东风区"},{"code":"230811","name":"郊区"},{"code":"230822","name":"桦南县"},{"code":"230826","name":"桦川县"},{"code":"230828","name":"汤原县"},{"code":"230833","name":"抚远县"},{"code":"230881","name":"同江市"},{"code":"230882","name":"富锦市"}]},{"code":"230900","name":"七台河市","children":[{"code":"230901","name":"市辖区"},{"code":"230902","name":"新兴区"},{"code":"230903","name":"桃山区"},{"code":"230904","name":"茄子河区"},{"code":"230921","name":"勃利县"}]},{"code":"231000","name":"牡丹江市","children":[{"code":"231001","name":"市辖区"},{"code":"231002","name":"东安区"},{"code":"231003","name":"阳明区"},{"code":"231004","name":"爱民区"},{"code":"231005","name":"西安区"},{"code":"231024","name":"东宁县"},{"code":"231025","name":"林口县"},{"code":"231081","name":"绥芬河市"},{"code":"231083","name":"海林市"},{"code":"231084","name":"宁安市"},{"code":"231085","name":"穆棱市"}]},{"code":"231100","name":"黑河市","children":[{"code":"231101","name":"市辖区"},{"code":"231102","name":"爱辉区"},{"code":"231121","name":"嫩江县"},{"code":"231123","name":"逊克县"},{"code":"231124","name":"孙吴县"},{"code":"231181","name":"北安市"},{"code":"231182","name":"五大连池市"}]},{"code":"231200","name":"绥化市","children":[{"code":"231201","name":"市辖区"},{"code":"231202","name":"北林区"},{"code":"231221","name":"望奎县"},{"code":"231222","name":"兰西县"},{"code":"231223","name":"青冈县"},{"code":"231224","name":"庆安县"},{"code":"231225","name":"明水县"},{"code":"231226","name":"绥棱县"},{"code":"231281","name":"安达市"},{"code":"231282","name":"肇东市"},{"code":"231283","name":"海伦市"}]},{"code":"232700","name":"大兴安岭地区","children":[{"code":"232721","name":"呼玛县"},{"code":"232722","name":"塔河县"},{"code":"232723","name":"漠河县"}]}]},{"code":"310000","name":"上海市","children":[{"code":"310100","name":"市辖区","children":[{"code":"310101","name":"黄浦区"},{"code":"310104","name":"徐汇区"},{"code":"310105","name":"长宁区"},{"code":"310106","name":"静安区"},{"code":"310107","name":"普陀区"},{"code":"310108","name":"闸北区"},{"code":"310109","name":"虹口区"},{"code":"310110","name":"杨浦区"},{"code":"310112","name":"闵行区"},{"code":"310113","name":"宝山区"},{"code":"310114","name":"嘉定区"},{"code":"310115","name":"浦东新区"},{"code":"310116","name":"金山区"},{"code":"310117","name":"松江区"},{"code":"310118","name":"青浦区"},{"code":"310120","name":"奉贤区"}]},{"code":"310200","name":"县","children":[{"code":"310230","name":"崇明县"}]}]},{"code":"320000","name":"江苏省","children":[{"code":"320100","name":"南京市","children":[{"code":"320101","name":"市辖区"},{"code":"320102","name":"玄武区"},{"code":"320104","name":"秦淮区"},{"code":"320105","name":"建邺区"},{"code":"320106","name":"鼓楼区"},{"code":"320111","name":"浦口区"},{"code":"320113","name":"栖霞区"},{"code":"320114","name":"雨花台区"},{"code":"320115","name":"江宁区"},{"code":"320116","name":"六合区"},{"code":"320117","name":"溧水区"},{"code":"320118","name":"高淳区"}]},{"code":"320200","name":"无锡市","children":[{"code":"320201","name":"市辖区"},{"code":"320202","name":"崇安区"},{"code":"320203","name":"南长区"},{"code":"320204","name":"北塘区"},{"code":"320205","name":"锡山区"},{"code":"320206","name":"惠山区"},{"code":"320211","name":"滨湖区"},{"code":"320281","name":"江阴市"},{"code":"320282","name":"宜兴市"}]},{"code":"320300","name":"徐州市","children":[{"code":"320301","name":"市辖区"},{"code":"320302","name":"鼓楼区"},{"code":"320303","name":"云龙区"},{"code":"320305","name":"贾汪区"},{"code":"320311","name":"泉山区"},{"code":"320312","name":"铜山区"},{"code":"320321","name":"丰县"},{"code":"320322","name":"沛县"},{"code":"320324","name":"睢宁县"},{"code":"320381","name":"新沂市"},{"code":"320382","name":"邳州市"}]},{"code":"320400","name":"常州市","children":[{"code":"320401","name":"市辖区"},{"code":"320402","name":"天宁区"},{"code":"320404","name":"钟楼区"},{"code":"320405","name":"戚墅堰区"},{"code":"320411","name":"新北区"},{"code":"320412","name":"武进区"},{"code":"320481","name":"溧阳市"},{"code":"320482","name":"金坛市"}]},{"code":"320500","name":"苏州市","children":[{"code":"320501","name":"市辖区"},{"code":"320505","name":"虎丘区"},{"code":"320506","name":"吴中区"},{"code":"320507","name":"相城区"},{"code":"320508","name":"姑苏区"},{"code":"320509","name":"吴江区"},{"code":"320581","name":"常熟市"},{"code":"320582","name":"张家港市"},{"code":"320583","name":"昆山市"},{"code":"320585","name":"太仓市"}]},{"code":"320600","name":"南通市","children":[{"code":"320601","name":"市辖区"},{"code":"320602","name":"崇川区"},{"code":"320611","name":"港闸区"},{"code":"320612","name":"通州区"},{"code":"320621","name":"海安县"},{"code":"320623","name":"如东县"},{"code":"320681","name":"启东市"},{"code":"320682","name":"如皋市"},{"code":"320684","name":"海门市"}]},{"code":"320700","name":"连云港市","children":[{"code":"320701","name":"市辖区"},{"code":"320703","name":"连云区"},{"code":"320706","name":"海州区"},{"code":"320707","name":"赣榆区"},{"code":"320722","name":"东海县"},{"code":"320723","name":"灌云县"},{"code":"320724","name":"灌南县"}]},{"code":"320800","name":"淮安市","children":[{"code":"320801","name":"市辖区"},{"code":"320802","name":"清河区"},{"code":"320803","name":"淮安区"},{"code":"320804","name":"淮阴区"},{"code":"320811","name":"清浦区"},{"code":"320826","name":"涟水县"},{"code":"320829","name":"洪泽县"},{"code":"320830","name":"盱眙县"},{"code":"320831","name":"金湖县"}]},{"code":"320900","name":"盐城市","children":[{"code":"320901","name":"市辖区"},{"code":"320902","name":"亭湖区"},{"code":"320903","name":"盐都区"},{"code":"320921","name":"响水县"},{"code":"320922","name":"滨海县"},{"code":"320923","name":"阜宁县"},{"code":"320924","name":"射阳县"},{"code":"320925","name":"建湖县"},{"code":"320981","name":"东台市"},{"code":"320982","name":"大丰市"}]},{"code":"321000","name":"扬州市","children":[{"code":"321001","name":"市辖区"},{"code":"321002","name":"广陵区"},{"code":"321003","name":"邗江区"},{"code":"321012","name":"江都区"},{"code":"321023","name":"宝应县"},{"code":"321081","name":"仪征市"},{"code":"321084","name":"高邮市"}]},{"code":"321100","name":"镇江市","children":[{"code":"321101","name":"市辖区"},{"code":"321102","name":"京口区"},{"code":"321111","name":"润州区"},{"code":"321112","name":"丹徒区"},{"code":"321181","name":"丹阳市"},{"code":"321182","name":"扬中市"},{"code":"321183","name":"句容市"}]},{"code":"321200","name":"泰州市","children":[{"code":"321201","name":"市辖区"},{"code":"321202","name":"海陵区"},{"code":"321203","name":"高港区"},{"code":"321204","name":"姜堰区"},{"code":"321281","name":"兴化市"},{"code":"321282","name":"靖江市"},{"code":"321283","name":"泰兴市"}]},{"code":"321300","name":"宿迁市","children":[{"code":"321301","name":"市辖区"},{"code":"321302","name":"宿城区"},{"code":"321311","name":"宿豫区"},{"code":"321322","name":"沭阳县"},{"code":"321323","name":"泗阳县"},{"code":"321324","name":"泗洪县"}]}]},{"code":"330000","name":"浙江省","children":[{"code":"330100","name":"杭州市","children":[{"code":"330101","name":"市辖区"},{"code":"330102","name":"上城区"},{"code":"330103","name":"下城区"},{"code":"330104","name":"江干区"},{"code":"330105","name":"拱墅区"},{"code":"330106","name":"西湖区"},{"code":"330108","name":"滨江区"},{"code":"330109","name":"萧山区"},{"code":"330110","name":"余杭区"},{"code":"330122","name":"桐庐县"},{"code":"330127","name":"淳安县"},{"code":"330182","name":"建德市"},{"code":"330183","name":"富阳市"},{"code":"330185","name":"临安市"}]},{"code":"330200","name":"宁波市","children":[{"code":"330201","name":"市辖区"},{"code":"330203","name":"海曙区"},{"code":"330204","name":"江东区"},{"code":"330205","name":"江北区"},{"code":"330206","name":"北仑区"},{"code":"330211","name":"镇海区"},{"code":"330212","name":"鄞州区"},{"code":"330225","name":"象山县"},{"code":"330226","name":"宁海县"},{"code":"330281","name":"余姚市"},{"code":"330282","name":"慈溪市"},{"code":"330283","name":"奉化市"}]},{"code":"330300","name":"温州市","children":[{"code":"330301","name":"市辖区"},{"code":"330302","name":"鹿城区"},{"code":"330303","name":"龙湾区"},{"code":"330304","name":"瓯海区"},{"code":"330322","name":"洞头县"},{"code":"330324","name":"永嘉县"},{"code":"330326","name":"平阳县"},{"code":"330327","name":"苍南县"},{"code":"330328","name":"文成县"},{"code":"330329","name":"泰顺县"},{"code":"330381","name":"瑞安市"},{"code":"330382","name":"乐清市"}]},{"code":"330400","name":"嘉兴市","children":[{"code":"330401","name":"市辖区"},{"code":"330402","name":"南湖区"},{"code":"330411","name":"秀洲区"},{"code":"330421","name":"嘉善县"},{"code":"330424","name":"海盐县"},{"code":"330481","name":"海宁市"},{"code":"330482","name":"平湖市"},{"code":"330483","name":"桐乡市"}]},{"code":"330500","name":"湖州市","children":[{"code":"330501","name":"市辖区"},{"code":"330502","name":"吴兴区"},{"code":"330503","name":"南浔区"},{"code":"330521","name":"德清县"},{"code":"330522","name":"长兴县"},{"code":"330523","name":"安吉县"}]},{"code":"330600","name":"绍兴市","children":[{"code":"330601","name":"市辖区"},{"code":"330602","name":"越城区"},{"code":"330603","name":"柯桥区"},{"code":"330604","name":"上虞区"},{"code":"330624","name":"新昌县"},{"code":"330681","name":"诸暨市"},{"code":"330683","name":"嵊州市"}]},{"code":"330700","name":"金华市","children":[{"code":"330701","name":"市辖区"},{"code":"330702","name":"婺城区"},{"code":"330703","name":"金东区"},{"code":"330723","name":"武义县"},{"code":"330726","name":"浦江县"},{"code":"330727","name":"磐安县"},{"code":"330781","name":"兰溪市"},{"code":"330782","name":"义乌市"},{"code":"330783","name":"东阳市"},{"code":"330784","name":"永康市"}]},{"code":"330800","name":"衢州市","children":[{"code":"330801","name":"市辖区"},{"code":"330802","name":"柯城区"},{"code":"330803","name":"衢江区"},{"code":"330822","name":"常山县"},{"code":"330824","name":"开化县"},{"code":"330825","name":"龙游县"},{"code":"330881","name":"江山市"}]},{"code":"330900","name":"舟山市","children":[{"code":"330901","name":"市辖区"},{"code":"330902","name":"定海区"},{"code":"330903","name":"普陀区"},{"code":"330921","name":"岱山县"},{"code":"330922","name":"嵊泗县"}]},{"code":"331000","name":"台州市","children":[{"code":"331001","name":"市辖区"},{"code":"331002","name":"椒江区"},{"code":"331003","name":"黄岩区"},{"code":"331004","name":"路桥区"},{"code":"331021","name":"玉环县"},{"code":"331022","name":"三门县"},{"code":"331023","name":"天台县"},{"code":"331024","name":"仙居县"},{"code":"331081","name":"温岭市"},{"code":"331082","name":"临海市"}]},{"code":"331100","name":"丽水市","children":[{"code":"331101","name":"市辖区"},{"code":"331102","name":"莲都区"},{"code":"331121","name":"青田县"},{"code":"331122","name":"缙云县"},{"code":"331123","name":"遂昌县"},{"code":"331124","name":"松阳县"},{"code":"331125","name":"云和县"},{"code":"331126","name":"庆元县"},{"code":"331127","name":"景宁畲族自治县"},{"code":"331181","name":"龙泉市"}]}]},{"code":"340000","name":"安徽省","children":[{"code":"340100","name":"合肥市","children":[{"code":"340101","name":"市辖区"},{"code":"340102","name":"瑶海区"},{"code":"340103","name":"庐阳区"},{"code":"340104","name":"蜀山区"},{"code":"340111","name":"包河区"},{"code":"340121","name":"长丰县"},{"code":"340122","name":"肥东县"},{"code":"340123","name":"肥西县"},{"code":"340124","name":"庐江县"},{"code":"340181","name":"巢湖市"}]},{"code":"340200","name":"芜湖市","children":[{"code":"340201","name":"市辖区"},{"code":"340202","name":"镜湖区"},{"code":"340203","name":"弋江区"},{"code":"340207","name":"鸠江区"},{"code":"340208","name":"三山区"},{"code":"340221","name":"芜湖县"},{"code":"340222","name":"繁昌县"},{"code":"340223","name":"南陵县"},{"code":"340225","name":"无为县"}]},{"code":"340300","name":"蚌埠市","children":[{"code":"340301","name":"市辖区"},{"code":"340302","name":"龙子湖区"},{"code":"340303","name":"蚌山区"},{"code":"340304","name":"禹会区"},{"code":"340311","name":"淮上区"},{"code":"340321","name":"怀远县"},{"code":"340322","name":"五河县"},{"code":"340323","name":"固镇县"}]},{"code":"340400","name":"淮南市","children":[{"code":"340401","name":"市辖区"},{"code":"340402","name":"大通区"},{"code":"340403","name":"田家庵区"},{"code":"340404","name":"谢家集区"},{"code":"340405","name":"八公山区"},{"code":"340406","name":"潘集区"},{"code":"340421","name":"凤台县"}]},{"code":"340500","name":"马鞍山市","children":[{"code":"340501","name":"市辖区"},{"code":"340503","name":"花山区"},{"code":"340504","name":"雨山区"},{"code":"340506","name":"博望区"},{"code":"340521","name":"当涂县"},{"code":"340522","name":"含山县"},{"code":"340523","name":"和县"}]},{"code":"340600","name":"淮北市","children":[{"code":"340601","name":"市辖区"},{"code":"340602","name":"杜集区"},{"code":"340603","name":"相山区"},{"code":"340604","name":"烈山区"},{"code":"340621","name":"濉溪县"}]},{"code":"340700","name":"铜陵市","children":[{"code":"340701","name":"市辖区"},{"code":"340702","name":"铜官山区"},{"code":"340703","name":"狮子山区"},{"code":"340711","name":"郊区"},{"code":"340721","name":"铜陵县"}]},{"code":"340800","name":"安庆市","children":[{"code":"340801","name":"市辖区"},{"code":"340802","name":"迎江区"},{"code":"340803","name":"大观区"},{"code":"340811","name":"宜秀区"},{"code":"340822","name":"怀宁县"},{"code":"340823","name":"枞阳县"},{"code":"340824","name":"潜山县"},{"code":"340825","name":"太湖县"},{"code":"340826","name":"宿松县"},{"code":"340827","name":"望江县"},{"code":"340828","name":"岳西县"},{"code":"340881","name":"桐城市"}]},{"code":"341000","name":"黄山市","children":[{"code":"341001","name":"市辖区"},{"code":"341002","name":"屯溪区"},{"code":"341003","name":"黄山区"},{"code":"341004","name":"徽州区"},{"code":"341021","name":"歙县"},{"code":"341022","name":"休宁县"},{"code":"341023","name":"黟县"},{"code":"341024","name":"祁门县"}]},{"code":"341100","name":"滁州市","children":[{"code":"341101","name":"市辖区"},{"code":"341102","name":"琅琊区"},{"code":"341103","name":"南谯区"},{"code":"341122","name":"来安县"},{"code":"341124","name":"全椒县"},{"code":"341125","name":"定远县"},{"code":"341126","name":"凤阳县"},{"code":"341181","name":"天长市"},{"code":"341182","name":"明光市"}]},{"code":"341200","name":"阜阳市","children":[{"code":"341201","name":"市辖区"},{"code":"341202","name":"颍州区"},{"code":"341203","name":"颍东区"},{"code":"341204","name":"颍泉区"},{"code":"341221","name":"临泉县"},{"code":"341222","name":"太和县"},{"code":"341225","name":"阜南县"},{"code":"341226","name":"颍上县"},{"code":"341282","name":"界首市"}]},{"code":"341300","name":"宿州市","children":[{"code":"341301","name":"市辖区"},{"code":"341302","name":"埇桥区"},{"code":"341321","name":"砀山县"},{"code":"341322","name":"萧县"},{"code":"341323","name":"灵璧县"},{"code":"341324","name":"泗县"}]},{"code":"341500","name":"六安市","children":[{"code":"341501","name":"市辖区"},{"code":"341502","name":"金安区"},{"code":"341503","name":"裕安区"},{"code":"341521","name":"寿县"},{"code":"341522","name":"霍邱县"},{"code":"341523","name":"舒城县"},{"code":"341524","name":"金寨县"},{"code":"341525","name":"霍山县"}]},{"code":"341600","name":"亳州市","children":[{"code":"341601","name":"市辖区"},{"code":"341602","name":"谯城区"},{"code":"341621","name":"涡阳县"},{"code":"341622","name":"蒙城县"},{"code":"341623","name":"利辛县"}]},{"code":"341700","name":"池州市","children":[{"code":"341701","name":"市辖区"},{"code":"341702","name":"贵池区"},{"code":"341721","name":"东至县"},{"code":"341722","name":"石台县"},{"code":"341723","name":"青阳县"}]},{"code":"341800","name":"宣城市","children":[{"code":"341801","name":"市辖区"},{"code":"341802","name":"宣州区"},{"code":"341821","name":"郎溪县"},{"code":"341822","name":"广德县"},{"code":"341823","name":"泾县"},{"code":"341824","name":"绩溪县"},{"code":"341825","name":"旌德县"},{"code":"341881","name":"宁国市"}]}]},{"code":"350000","name":"福建省","children":[{"code":"350100","name":"福州市","children":[{"code":"350101","name":"市辖区"},{"code":"350102","name":"鼓楼区"},{"code":"350103","name":"台江区"},{"code":"350104","name":"仓山区"},{"code":"350105","name":"马尾区"},{"code":"350111","name":"晋安区"},{"code":"350121","name":"闽侯县"},{"code":"350122","name":"连江县"},{"code":"350123","name":"罗源县"},{"code":"350124","name":"闽清县"},{"code":"350125","name":"永泰县"},{"code":"350128","name":"平潭县"},{"code":"350181","name":"福清市"},{"code":"350182","name":"长乐市"}]},{"code":"350200","name":"厦门市","children":[{"code":"350201","name":"市辖区"},{"code":"350203","name":"思明区"},{"code":"350205","name":"海沧区"},{"code":"350206","name":"湖里区"},{"code":"350211","name":"集美区"},{"code":"350212","name":"同安区"},{"code":"350213","name":"翔安区"}]},{"code":"350300","name":"莆田市","children":[{"code":"350301","name":"市辖区"},{"code":"350302","name":"城厢区"},{"code":"350303","name":"涵江区"},{"code":"350304","name":"荔城区"},{"code":"350305","name":"秀屿区"},{"code":"350322","name":"仙游县"}]},{"code":"350400","name":"三明市","children":[{"code":"350401","name":"市辖区"},{"code":"350402","name":"梅列区"},{"code":"350403","name":"三元区"},{"code":"350421","name":"明溪县"},{"code":"350423","name":"清流县"},{"code":"350424","name":"宁化县"},{"code":"350425","name":"大田县"},{"code":"350426","name":"尤溪县"},{"code":"350427","name":"沙县"},{"code":"350428","name":"将乐县"},{"code":"350429","name":"泰宁县"},{"code":"350430","name":"建宁县"},{"code":"350481","name":"永安市"}]},{"code":"350500","name":"泉州市","children":[{"code":"350501","name":"市辖区"},{"code":"350502","name":"鲤城区"},{"code":"350503","name":"丰泽区"},{"code":"350504","name":"洛江区"},{"code":"350505","name":"泉港区"},{"code":"350521","name":"惠安县"},{"code":"350524","name":"安溪县"},{"code":"350525","name":"永春县"},{"code":"350526","name":"德化县"},{"code":"350527","name":"金门县"},{"code":"350581","name":"石狮市"},{"code":"350582","name":"晋江市"},{"code":"350583","name":"南安市"}]},{"code":"350600","name":"漳州市","children":[{"code":"350601","name":"市辖区"},{"code":"350602","name":"芗城区"},{"code":"350603","name":"龙文区"},{"code":"350622","name":"云霄县"},{"code":"350623","name":"漳浦县"},{"code":"350624","name":"诏安县"},{"code":"350625","name":"长泰县"},{"code":"350626","name":"东山县"},{"code":"350627","name":"南靖县"},{"code":"350628","name":"平和县"},{"code":"350629","name":"华安县"},{"code":"350681","name":"龙海市"}]},{"code":"350700","name":"南平市","children":[{"code":"350701","name":"市辖区"},{"code":"350702","name":"延平区"},{"code":"350721","name":"顺昌县"},{"code":"350722","name":"浦城县"},{"code":"350723","name":"光泽县"},{"code":"350724","name":"松溪县"},{"code":"350725","name":"政和县"},{"code":"350781","name":"邵武市"},{"code":"350782","name":"武夷山市"},{"code":"350783","name":"建瓯市"},{"code":"350784","name":"建阳市"}]},{"code":"350800","name":"龙岩市","children":[{"code":"350801","name":"市辖区"},{"code":"350802","name":"新罗区"},{"code":"350821","name":"长汀县"},{"code":"350822","name":"永定县"},{"code":"350823","name":"上杭县"},{"code":"350824","name":"武平县"},{"code":"350825","name":"连城县"},{"code":"350881","name":"漳平市"}]},{"code":"350900","name":"宁德市","children":[{"code":"350901","name":"市辖区"},{"code":"350902","name":"蕉城区"},{"code":"350921","name":"霞浦县"},{"code":"350922","name":"古田县"},{"code":"350923","name":"屏南县"},{"code":"350924","name":"寿宁县"},{"code":"350925","name":"周宁县"},{"code":"350926","name":"柘荣县"},{"code":"350981","name":"福安市"},{"code":"350982","name":"福鼎市"}]}]},{"code":"360000","name":"江西省","children":[{"code":"360100","name":"南昌市","children":[{"code":"360101","name":"市辖区"},{"code":"360102","name":"东湖区"},{"code":"360103","name":"西湖区"},{"code":"360104","name":"青云谱区"},{"code":"360105","name":"湾里区"},{"code":"360111","name":"青山湖区"},{"code":"360121","name":"南昌县"},{"code":"360122","name":"新建县"},{"code":"360123","name":"安义县"},{"code":"360124","name":"进贤县"}]},{"code":"360200","name":"景德镇市","children":[{"code":"360201","name":"市辖区"},{"code":"360202","name":"昌江区"},{"code":"360203","name":"珠山区"},{"code":"360222","name":"浮梁县"},{"code":"360281","name":"乐平市"}]},{"code":"360300","name":"萍乡市","children":[{"code":"360301","name":"市辖区"},{"code":"360302","name":"安源区"},{"code":"360313","name":"湘东区"},{"code":"360321","name":"莲花县"},{"code":"360322","name":"上栗县"},{"code":"360323","name":"芦溪县"}]},{"code":"360400","name":"九江市","children":[{"code":"360401","name":"市辖区"},{"code":"360402","name":"庐山区"},{"code":"360403","name":"浔阳区"},{"code":"360421","name":"九江县"},{"code":"360423","name":"武宁县"},{"code":"360424","name":"修水县"},{"code":"360425","name":"永修县"},{"code":"360426","name":"德安县"},{"code":"360427","name":"星子县"},{"code":"360428","name":"都昌县"},{"code":"360429","name":"湖口县"},{"code":"360430","name":"彭泽县"},{"code":"360481","name":"瑞昌市"},{"code":"360482","name":"共青城市"}]},{"code":"360500","name":"新余市","children":[{"code":"360501","name":"市辖区"},{"code":"360502","name":"渝水区"},{"code":"360521","name":"分宜县"}]},{"code":"360600","name":"鹰潭市","children":[{"code":"360601","name":"市辖区"},{"code":"360602","name":"月湖区"},{"code":"360622","name":"余江县"},{"code":"360681","name":"贵溪市"}]},{"code":"360700","name":"赣州市","children":[{"code":"360701","name":"市辖区"},{"code":"360702","name":"章贡区"},{"code":"360703","name":"南康区"},{"code":"360721","name":"赣县"},{"code":"360722","name":"信丰县"},{"code":"360723","name":"大余县"},{"code":"360724","name":"上犹县"},{"code":"360725","name":"崇义县"},{"code":"360726","name":"安远县"},{"code":"360727","name":"龙南县"},{"code":"360728","name":"定南县"},{"code":"360729","name":"全南县"},{"code":"360730","name":"宁都县"},{"code":"360731","name":"于都县"},{"code":"360732","name":"兴国县"},{"code":"360733","name":"会昌县"},{"code":"360734","name":"寻乌县"},{"code":"360735","name":"石城县"},{"code":"360781","name":"瑞金市"}]},{"code":"360800","name":"吉安市","children":[{"code":"360801","name":"市辖区"},{"code":"360802","name":"吉州区"},{"code":"360803","name":"青原区"},{"code":"360821","name":"吉安县"},{"code":"360822","name":"吉水县"},{"code":"360823","name":"峡江县"},{"code":"360824","name":"新干县"},{"code":"360825","name":"永丰县"},{"code":"360826","name":"泰和县"},{"code":"360827","name":"遂川县"},{"code":"360828","name":"万安县"},{"code":"360829","name":"安福县"},{"code":"360830","name":"永新县"},{"code":"360881","name":"井冈山市"}]},{"code":"360900","name":"宜春市","children":[{"code":"360901","name":"市辖区"},{"code":"360902","name":"袁州区"},{"code":"360921","name":"奉新县"},{"code":"360922","name":"万载县"},{"code":"360923","name":"上高县"},{"code":"360924","name":"宜丰县"},{"code":"360925","name":"靖安县"},{"code":"360926","name":"铜鼓县"},{"code":"360981","name":"丰城市"},{"code":"360982","name":"樟树市"},{"code":"360983","name":"高安市"}]},{"code":"361000","name":"抚州市","children":[{"code":"361001","name":"市辖区"},{"code":"361002","name":"临川区"},{"code":"361021","name":"南城县"},{"code":"361022","name":"黎川县"},{"code":"361023","name":"南丰县"},{"code":"361024","name":"崇仁县"},{"code":"361025","name":"乐安县"},{"code":"361026","name":"宜黄县"},{"code":"361027","name":"金溪县"},{"code":"361028","name":"资溪县"},{"code":"361029","name":"东乡县"},{"code":"361030","name":"广昌县"}]},{"code":"361100","name":"上饶市","children":[{"code":"361101","name":"市辖区"},{"code":"361102","name":"信州区"},{"code":"361121","name":"上饶县"},{"code":"361122","name":"广丰县"},{"code":"361123","name":"玉山县"},{"code":"361124","name":"铅山县"},{"code":"361125","name":"横峰县"},{"code":"361126","name":"弋阳县"},{"code":"361127","name":"余干县"},{"code":"361128","name":"鄱阳县"},{"code":"361129","name":"万年县"},{"code":"361130","name":"婺源县"},{"code":"361181","name":"德兴市"}]}]},{"code":"370000","name":"山东省","children":[{"code":"370100","name":"济南市","children":[{"code":"370101","name":"市辖区"},{"code":"370102","name":"历下区"},{"code":"370103","name":"市中区"},{"code":"370104","name":"槐荫区"},{"code":"370105","name":"天桥区"},{"code":"370112","name":"历城区"},{"code":"370113","name":"长清区"},{"code":"370124","name":"平阴县"},{"code":"370125","name":"济阳县"},{"code":"370126","name":"商河县"},{"code":"370181","name":"章丘市"}]},{"code":"370200","name":"青岛市","children":[{"code":"370201","name":"市辖区"},{"code":"370202","name":"市南区"},{"code":"370203","name":"市北区"},{"code":"370211","name":"黄岛区"},{"code":"370212","name":"崂山区"},{"code":"370213","name":"李沧区"},{"code":"370214","name":"城阳区"},{"code":"370281","name":"胶州市"},{"code":"370282","name":"即墨市"},{"code":"370283","name":"平度市"},{"code":"370285","name":"莱西市"}]},{"code":"370300","name":"淄博市","children":[{"code":"370301","name":"市辖区"},{"code":"370302","name":"淄川区"},{"code":"370303","name":"张店区"},{"code":"370304","name":"博山区"},{"code":"370305","name":"临淄区"},{"code":"370306","name":"周村区"},{"code":"370321","name":"桓台县"},{"code":"370322","name":"高青县"},{"code":"370323","name":"沂源县"}]},{"code":"370400","name":"枣庄市","children":[{"code":"370401","name":"市辖区"},{"code":"370402","name":"市中区"},{"code":"370403","name":"薛城区"},{"code":"370404","name":"峄城区"},{"code":"370405","name":"台儿庄区"},{"code":"370406","name":"山亭区"},{"code":"370481","name":"滕州市"}]},{"code":"370500","name":"东营市","children":[{"code":"370501","name":"市辖区"},{"code":"370502","name":"东营区"},{"code":"370503","name":"河口区"},{"code":"370521","name":"垦利县"},{"code":"370522","name":"利津县"},{"code":"370523","name":"广饶县"}]},{"code":"370600","name":"烟台市","children":[{"code":"370601","name":"市辖区"},{"code":"370602","name":"芝罘区"},{"code":"370611","name":"福山区"},{"code":"370612","name":"牟平区"},{"code":"370613","name":"莱山区"},{"code":"370634","name":"长岛县"},{"code":"370681","name":"龙口市"},{"code":"370682","name":"莱阳市"},{"code":"370683","name":"莱州市"},{"code":"370684","name":"蓬莱市"},{"code":"370685","name":"招远市"},{"code":"370686","name":"栖霞市"},{"code":"370687","name":"海阳市"}]},{"code":"370700","name":"潍坊市","children":[{"code":"370701","name":"市辖区"},{"code":"370702","name":"潍城区"},{"code":"370703","name":"寒亭区"},{"code":"370704","name":"坊子区"},{"code":"370705","name":"奎文区"},{"code":"370724","name":"临朐县"},{"code":"370725","name":"昌乐县"},{"code":"370781","name":"青州市"},{"code":"370782","name":"诸城市"},{"code":"370783","name":"寿光市"},{"code":"370784","name":"安丘市"},{"code":"370785","name":"高密市"},{"code":"370786","name":"昌邑市"}]},{"code":"370800","name":"济宁市","children":[{"code":"370801","name":"市辖区"},{"code":"370811","name":"任城区"},{"code":"370812","name":"兖州区"},{"code":"370826","name":"微山县"},{"code":"370827","name":"鱼台县"},{"code":"370828","name":"金乡县"},{"code":"370829","name":"嘉祥县"},{"code":"370830","name":"汶上县"},{"code":"370831","name":"泗水县"},{"code":"370832","name":"梁山县"},{"code":"370881","name":"曲阜市"},{"code":"370883","name":"邹城市"}]},{"code":"370900","name":"泰安市","children":[{"code":"370901","name":"市辖区"},{"code":"370902","name":"泰山区"},{"code":"370911","name":"岱岳区"},{"code":"370921","name":"宁阳县"},{"code":"370923","name":"东平县"},{"code":"370982","name":"新泰市"},{"code":"370983","name":"肥城市"}]},{"code":"371000","name":"威海市","children":[{"code":"371001","name":"市辖区"},{"code":"371002","name":"环翠区"},{"code":"371003","name":"文登区"},{"code":"371082","name":"荣成市"},{"code":"371083","name":"乳山市"}]},{"code":"371100","name":"日照市","children":[{"code":"371101","name":"市辖区"},{"code":"371102","name":"东港区"},{"code":"371103","name":"岚山区"},{"code":"371121","name":"五莲县"},{"code":"371122","name":"莒县"}]},{"code":"371200","name":"莱芜市","children":[{"code":"371201","name":"市辖区"},{"code":"371202","name":"莱城区"},{"code":"371203","name":"钢城区"}]},{"code":"371300","name":"临沂市","children":[{"code":"371301","name":"市辖区"},{"code":"371302","name":"兰山区"},{"code":"371311","name":"罗庄区"},{"code":"371312","name":"河东区"},{"code":"371321","name":"沂南县"},{"code":"371322","name":"郯城县"},{"code":"371323","name":"沂水县"},{"code":"371324","name":"兰陵县"},{"code":"371325","name":"费县"},{"code":"371326","name":"平邑县"},{"code":"371327","name":"莒南县"},{"code":"371328","name":"蒙阴县"},{"code":"371329","name":"临沭县"}]},{"code":"371400","name":"德州市","children":[{"code":"371401","name":"市辖区"},{"code":"371402","name":"德城区"},{"code":"371403","name":"陵城区"},{"code":"371422","name":"宁津县"},{"code":"371423","name":"庆云县"},{"code":"371424","name":"临邑县"},{"code":"371425","name":"齐河县"},{"code":"371426","name":"平原县"},{"code":"371427","name":"夏津县"},{"code":"371428","name":"武城县"},{"code":"371481","name":"乐陵市"},{"code":"371482","name":"禹城市"}]},{"code":"371500","name":"聊城市","children":[{"code":"371501","name":"市辖区"},{"code":"371502","name":"东昌府区"},{"code":"371521","name":"阳谷县"},{"code":"371522","name":"莘县"},{"code":"371523","name":"茌平县"},{"code":"371524","name":"东阿县"},{"code":"371525","name":"冠县"},{"code":"371526","name":"高唐县"},{"code":"371581","name":"临清市"}]},{"code":"371600","name":"滨州市","children":[{"code":"371601","name":"市辖区"},{"code":"371602","name":"滨城区"},{"code":"371603","name":"沾化区"},{"code":"371621","name":"惠民县"},{"code":"371622","name":"阳信县"},{"code":"371623","name":"无棣县"},{"code":"371625","name":"博兴县"},{"code":"371626","name":"邹平县"}]},{"code":"371700","name":"菏泽市","children":[{"code":"371701","name":"市辖区"},{"code":"371702","name":"牡丹区"},{"code":"371721","name":"曹县"},{"code":"371722","name":"单县"},{"code":"371723","name":"成武县"},{"code":"371724","name":"巨野县"},{"code":"371725","name":"郓城县"},{"code":"371726","name":"鄄城县"},{"code":"371727","name":"定陶县"},{"code":"371728","name":"东明县"}]}]},{"code":"410000","name":"河南省","children":[{"code":"410100","name":"郑州市","children":[{"code":"410101","name":"市辖区"},{"code":"410102","name":"中原区"},{"code":"410103","name":"二七区"},{"code":"410104","name":"管城回族区"},{"code":"410105","name":"金水区"},{"code":"410106","name":"上街区"},{"code":"410108","name":"惠济区"},{"code":"410122","name":"中牟县"},{"code":"410181","name":"巩义市"},{"code":"410182","name":"荥阳市"},{"code":"410183","name":"新密市"},{"code":"410184","name":"新郑市"},{"code":"410185","name":"登封市"}]},{"code":"410200","name":"开封市","children":[{"code":"410201","name":"市辖区"},{"code":"410202","name":"龙亭区"},{"code":"410203","name":"顺河回族区"},{"code":"410204","name":"鼓楼区"},{"code":"410205","name":"禹王台区"},{"code":"410211","name":"金明区"},{"code":"410221","name":"杞县"},{"code":"410222","name":"通许县"},{"code":"410223","name":"尉氏县"},{"code":"410224","name":"开封县"},{"code":"410225","name":"兰考县"}]},{"code":"410300","name":"洛阳市","children":[{"code":"410301","name":"市辖区"},{"code":"410302","name":"老城区"},{"code":"410303","name":"西工区"},{"code":"410304","name":"瀍河回族区"},{"code":"410305","name":"涧西区"},{"code":"410306","name":"吉利区"},{"code":"410311","name":"洛龙区"},{"code":"410322","name":"孟津县"},{"code":"410323","name":"新安县"},{"code":"410324","name":"栾川县"},{"code":"410325","name":"嵩县"},{"code":"410326","name":"汝阳县"},{"code":"410327","name":"宜阳县"},{"code":"410328","name":"洛宁县"},{"code":"410329","name":"伊川县"},{"code":"410381","name":"偃师市"}]},{"code":"410400","name":"平顶山市","children":[{"code":"410401","name":"市辖区"},{"code":"410402","name":"新华区"},{"code":"410403","name":"卫东区"},{"code":"410404","name":"石龙区"},{"code":"410411","name":"湛河区"},{"code":"410421","name":"宝丰县"},{"code":"410422","name":"叶县"},{"code":"410423","name":"鲁山县"},{"code":"410425","name":"郏县"},{"code":"410481","name":"舞钢市"},{"code":"410482","name":"汝州市"}]},{"code":"410500","name":"安阳市","children":[{"code":"410501","name":"市辖区"},{"code":"410502","name":"文峰区"},{"code":"410503","name":"北关区"},{"code":"410505","name":"殷都区"},{"code":"410506","name":"龙安区"},{"code":"410522","name":"安阳县"},{"code":"410523","name":"汤阴县"},{"code":"410526","name":"滑县"},{"code":"410527","name":"内黄县"},{"code":"410581","name":"林州市"}]},{"code":"410600","name":"鹤壁市","children":[{"code":"410601","name":"市辖区"},{"code":"410602","name":"鹤山区"},{"code":"410603","name":"山城区"},{"code":"410611","name":"淇滨区"},{"code":"410621","name":"浚县"},{"code":"410622","name":"淇县"}]},{"code":"410700","name":"新乡市","children":[{"code":"410701","name":"市辖区"},{"code":"410702","name":"红旗区"},{"code":"410703","name":"卫滨区"},{"code":"410704","name":"凤泉区"},{"code":"410711","name":"牧野区"},{"code":"410721","name":"新乡县"},{"code":"410724","name":"获嘉县"},{"code":"410725","name":"原阳县"},{"code":"410726","name":"延津县"},{"code":"410727","name":"封丘县"},{"code":"410728","name":"长垣县"},{"code":"410781","name":"卫辉市"},{"code":"410782","name":"辉县市"}]},{"code":"410800","name":"焦作市","children":[{"code":"410801","name":"市辖区"},{"code":"410802","name":"解放区"},{"code":"410803","name":"中站区"},{"code":"410804","name":"马村区"},{"code":"410811","name":"山阳区"},{"code":"410821","name":"修武县"},{"code":"410822","name":"博爱县"},{"code":"410823","name":"武陟县"},{"code":"410825","name":"温县"},{"code":"410882","name":"沁阳市"},{"code":"410883","name":"孟州市"}]},{"code":"410900","name":"濮阳市","children":[{"code":"410901","name":"市辖区"},{"code":"410902","name":"华龙区"},{"code":"410922","name":"清丰县"},{"code":"410923","name":"南乐县"},{"code":"410926","name":"范县"},{"code":"410927","name":"台前县"},{"code":"410928","name":"濮阳县"}]},{"code":"411000","name":"许昌市","children":[{"code":"411001","name":"市辖区"},{"code":"411002","name":"魏都区"},{"code":"411023","name":"许昌县"},{"code":"411024","name":"鄢陵县"},{"code":"411025","name":"襄城县"},{"code":"411081","name":"禹州市"},{"code":"411082","name":"长葛市"}]},{"code":"411100","name":"漯河市","children":[{"code":"411101","name":"市辖区"},{"code":"411102","name":"源汇区"},{"code":"411103","name":"郾城区"},{"code":"411104","name":"召陵区"},{"code":"411121","name":"舞阳县"},{"code":"411122","name":"临颍县"}]},{"code":"411200","name":"三门峡市","children":[{"code":"411201","name":"市辖区"},{"code":"411202","name":"湖滨区"},{"code":"411221","name":"渑池县"},{"code":"411222","name":"陕县"},{"code":"411224","name":"卢氏县"},{"code":"411281","name":"义马市"},{"code":"411282","name":"灵宝市"}]},{"code":"411300","name":"南阳市","children":[{"code":"411301","name":"市辖区"},{"code":"411302","name":"宛城区"},{"code":"411303","name":"卧龙区"},{"code":"411321","name":"南召县"},{"code":"411322","name":"方城县"},{"code":"411323","name":"西峡县"},{"code":"411324","name":"镇平县"},{"code":"411325","name":"内乡县"},{"code":"411326","name":"淅川县"},{"code":"411327","name":"社旗县"},{"code":"411328","name":"唐河县"},{"code":"411329","name":"新野县"},{"code":"411330","name":"桐柏县"},{"code":"411381","name":"邓州市"}]},{"code":"411400","name":"商丘市","children":[{"code":"411401","name":"市辖区"},{"code":"411402","name":"梁园区"},{"code":"411403","name":"睢阳区"},{"code":"411421","name":"民权县"},{"code":"411422","name":"睢县"},{"code":"411423","name":"宁陵县"},{"code":"411424","name":"柘城县"},{"code":"411425","name":"虞城县"},{"code":"411426","name":"夏邑县"},{"code":"411481","name":"永城市"}]},{"code":"411500","name":"信阳市","children":[{"code":"411501","name":"市辖区"},{"code":"411502","name":"浉河区"},{"code":"411503","name":"平桥区"},{"code":"411521","name":"罗山县"},{"code":"411522","name":"光山县"},{"code":"411523","name":"新县"},{"code":"411524","name":"商城县"},{"code":"411525","name":"固始县"},{"code":"411526","name":"潢川县"},{"code":"411527","name":"淮滨县"},{"code":"411528","name":"息县"}]},{"code":"411600","name":"周口市","children":[{"code":"411601","name":"市辖区"},{"code":"411602","name":"川汇区"},{"code":"411621","name":"扶沟县"},{"code":"411622","name":"西华县"},{"code":"411623","name":"商水县"},{"code":"411624","name":"沈丘县"},{"code":"411625","name":"郸城县"},{"code":"411626","name":"淮阳县"},{"code":"411627","name":"太康县"},{"code":"411628","name":"鹿邑县"},{"code":"411681","name":"项城市"}]},{"code":"411700","name":"驻马店市","children":[{"code":"411701","name":"市辖区"},{"code":"411702","name":"驿城区"},{"code":"411721","name":"西平县"},{"code":"411722","name":"上蔡县"},{"code":"411723","name":"平舆县"},{"code":"411724","name":"正阳县"},{"code":"411725","name":"确山县"},{"code":"411726","name":"泌阳县"},{"code":"411727","name":"汝南县"},{"code":"411728","name":"遂平县"},{"code":"411729","name":"新蔡县"}]},{"code":"419000","name":"省直辖县级行政区划","children":[{"code":"419001","name":"济源市"}]}]},{"code":"420000","name":"湖北省","children":[{"code":"420100","name":"武汉市","children":[{"code":"420101","name":"市辖区"},{"code":"420102","name":"江岸区"},{"code":"420103","name":"江汉区"},{"code":"420104","name":"硚口区"},{"code":"420105","name":"汉阳区"},{"code":"420106","name":"武昌区"},{"code":"420107","name":"青山区"},{"code":"420111","name":"洪山区"},{"code":"420112","name":"东西湖区"},{"code":"420113","name":"汉南区"},{"code":"420114","name":"蔡甸区"},{"code":"420115","name":"江夏区"},{"code":"420116","name":"黄陂区"},{"code":"420117","name":"新洲区"}]},{"code":"420200","name":"黄石市","children":[{"code":"420201","name":"市辖区"},{"code":"420202","name":"黄石港区"},{"code":"420203","name":"西塞山区"},{"code":"420204","name":"下陆区"},{"code":"420205","name":"铁山区"},{"code":"420222","name":"阳新县"},{"code":"420281","name":"大冶市"}]},{"code":"420300","name":"十堰市","children":[{"code":"420301","name":"市辖区"},{"code":"420302","name":"茅箭区"},{"code":"420303","name":"张湾区"},{"code":"420304","name":"郧阳区"},{"code":"420322","name":"郧西县"},{"code":"420323","name":"竹山县"},{"code":"420324","name":"竹溪县"},{"code":"420325","name":"房县"},{"code":"420381","name":"丹江口市"}]},{"code":"420500","name":"宜昌市","children":[{"code":"420501","name":"市辖区"},{"code":"420502","name":"西陵区"},{"code":"420503","name":"伍家岗区"},{"code":"420504","name":"点军区"},{"code":"420505","name":"猇亭区"},{"code":"420506","name":"夷陵区"},{"code":"420525","name":"远安县"},{"code":"420526","name":"兴山县"},{"code":"420527","name":"秭归县"},{"code":"420528","name":"长阳土家族自治县"},{"code":"420529","name":"五峰土家族自治县"},{"code":"420581","name":"宜都市"},{"code":"420582","name":"当阳市"},{"code":"420583","name":"枝江市"}]},{"code":"420600","name":"襄阳市","children":[{"code":"420601","name":"市辖区"},{"code":"420602","name":"襄城区"},{"code":"420606","name":"樊城区"},{"code":"420607","name":"襄州区"},{"code":"420624","name":"南漳县"},{"code":"420625","name":"谷城县"},{"code":"420626","name":"保康县"},{"code":"420682","name":"老河口市"},{"code":"420683","name":"枣阳市"},{"code":"420684","name":"宜城市"}]},{"code":"420700","name":"鄂州市","children":[{"code":"420701","name":"市辖区"},{"code":"420702","name":"梁子湖区"},{"code":"420703","name":"华容区"},{"code":"420704","name":"鄂城区"}]},{"code":"420800","name":"荆门市","children":[{"code":"420801","name":"市辖区"},{"code":"420802","name":"东宝区"},{"code":"420804","name":"掇刀区"},{"code":"420821","name":"京山县"},{"code":"420822","name":"沙洋县"},{"code":"420881","name":"钟祥市"}]},{"code":"420900","name":"孝感市","children":[{"code":"420901","name":"市辖区"},{"code":"420902","name":"孝南区"},{"code":"420921","name":"孝昌县"},{"code":"420922","name":"大悟县"},{"code":"420923","name":"云梦县"},{"code":"420981","name":"应城市"},{"code":"420982","name":"安陆市"},{"code":"420984","name":"汉川市"}]},{"code":"421000","name":"荆州市","children":[{"code":"421001","name":"市辖区"},{"code":"421002","name":"沙市区"},{"code":"421003","name":"荆州区"},{"code":"421022","name":"公安县"},{"code":"421023","name":"监利县"},{"code":"421024","name":"江陵县"},{"code":"421081","name":"石首市"},{"code":"421083","name":"洪湖市"},{"code":"421087","name":"松滋市"}]},{"code":"421100","name":"黄冈市","children":[{"code":"421101","name":"市辖区"},{"code":"421102","name":"黄州区"},{"code":"421121","name":"团风县"},{"code":"421122","name":"红安县"},{"code":"421123","name":"罗田县"},{"code":"421124","name":"英山县"},{"code":"421125","name":"浠水县"},{"code":"421126","name":"蕲春县"},{"code":"421127","name":"黄梅县"},{"code":"421181","name":"麻城市"},{"code":"421182","name":"武穴市"}]},{"code":"421200","name":"咸宁市","children":[{"code":"421201","name":"市辖区"},{"code":"421202","name":"咸安区"},{"code":"421221","name":"嘉鱼县"},{"code":"421222","name":"通城县"},{"code":"421223","name":"崇阳县"},{"code":"421224","name":"通山县"},{"code":"421281","name":"赤壁市"}]},{"code":"421300","name":"随州市","children":[{"code":"421301","name":"市辖区"},{"code":"421303","name":"曾都区"},{"code":"421321","name":"随县"},{"code":"421381","name":"广水市"}]},{"code":"422800","name":"恩施土家族苗族自治州","children":[{"code":"422801","name":"恩施市"},{"code":"422802","name":"利川市"},{"code":"422822","name":"建始县"},{"code":"422823","name":"巴东县"},{"code":"422825","name":"宣恩县"},{"code":"422826","name":"咸丰县"},{"code":"422827","name":"来凤县"},{"code":"422828","name":"鹤峰县"}]},{"code":"429000","name":"省直辖县级行政区划","children":[{"code":"429004","name":"仙桃市"},{"code":"429005","name":"潜江市"},{"code":"429006","name":"天门市"},{"code":"429021","name":"神农架林区"}]}]},{"code":"430000","name":"湖南省","children":[{"code":"430100","name":"长沙市","children":[{"code":"430101","name":"市辖区"},{"code":"430102","name":"芙蓉区"},{"code":"430103","name":"天心区"},{"code":"430104","name":"岳麓区"},{"code":"430105","name":"开福区"},{"code":"430111","name":"雨花区"},{"code":"430112","name":"望城区"},{"code":"430121","name":"长沙县"},{"code":"430124","name":"宁乡县"},{"code":"430181","name":"浏阳市"}]},{"code":"430200","name":"株洲市","children":[{"code":"430201","name":"市辖区"},{"code":"430202","name":"荷塘区"},{"code":"430203","name":"芦淞区"},{"code":"430204","name":"石峰区"},{"code":"430211","name":"天元区"},{"code":"430221","name":"株洲县"},{"code":"430223","name":"攸县"},{"code":"430224","name":"茶陵县"},{"code":"430225","name":"炎陵县"},{"code":"430281","name":"醴陵市"}]},{"code":"430300","name":"湘潭市","children":[{"code":"430301","name":"市辖区"},{"code":"430302","name":"雨湖区"},{"code":"430304","name":"岳塘区"},{"code":"430321","name":"湘潭县"},{"code":"430381","name":"湘乡市"},{"code":"430382","name":"韶山市"}]},{"code":"430400","name":"衡阳市","children":[{"code":"430401","name":"市辖区"},{"code":"430405","name":"珠晖区"},{"code":"430406","name":"雁峰区"},{"code":"430407","name":"石鼓区"},{"code":"430408","name":"蒸湘区"},{"code":"430412","name":"南岳区"},{"code":"430421","name":"衡阳县"},{"code":"430422","name":"衡南县"},{"code":"430423","name":"衡山县"},{"code":"430424","name":"衡东县"},{"code":"430426","name":"祁东县"},{"code":"430481","name":"耒阳市"},{"code":"430482","name":"常宁市"}]},{"code":"430500","name":"邵阳市","children":[{"code":"430501","name":"市辖区"},{"code":"430502","name":"双清区"},{"code":"430503","name":"大祥区"},{"code":"430511","name":"北塔区"},{"code":"430521","name":"邵东县"},{"code":"430522","name":"新邵县"},{"code":"430523","name":"邵阳县"},{"code":"430524","name":"隆回县"},{"code":"430525","name":"洞口县"},{"code":"430527","name":"绥宁县"},{"code":"430528","name":"新宁县"},{"code":"430529","name":"城步苗族自治县"},{"code":"430581","name":"武冈市"}]},{"code":"430600","name":"岳阳市","children":[{"code":"430601","name":"市辖区"},{"code":"430602","name":"岳阳楼区"},{"code":"430603","name":"云溪区"},{"code":"430611","name":"君山区"},{"code":"430621","name":"岳阳县"},{"code":"430623","name":"华容县"},{"code":"430624","name":"湘阴县"},{"code":"430626","name":"平江县"},{"code":"430681","name":"汨罗市"},{"code":"430682","name":"临湘市"}]},{"code":"430700","name":"常德市","children":[{"code":"430701","name":"市辖区"},{"code":"430702","name":"武陵区"},{"code":"430703","name":"鼎城区"},{"code":"430721","name":"安乡县"},{"code":"430722","name":"汉寿县"},{"code":"430723","name":"澧县"},{"code":"430724","name":"临澧县"},{"code":"430725","name":"桃源县"},{"code":"430726","name":"石门县"},{"code":"430781","name":"津市市"}]},{"code":"430800","name":"张家界市","children":[{"code":"430801","name":"市辖区"},{"code":"430802","name":"永定区"},{"code":"430811","name":"武陵源区"},{"code":"430821","name":"慈利县"},{"code":"430822","name":"桑植县"}]},{"code":"430900","name":"益阳市","children":[{"code":"430901","name":"市辖区"},{"code":"430902","name":"资阳区"},{"code":"430903","name":"赫山区"},{"code":"430921","name":"南县"},{"code":"430922","name":"桃江县"},{"code":"430923","name":"安化县"},{"code":"430981","name":"沅江市"}]},{"code":"431000","name":"郴州市","children":[{"code":"431001","name":"市辖区"},{"code":"431002","name":"北湖区"},{"code":"431003","name":"苏仙区"},{"code":"431021","name":"桂阳县"},{"code":"431022","name":"宜章县"},{"code":"431023","name":"永兴县"},{"code":"431024","name":"嘉禾县"},{"code":"431025","name":"临武县"},{"code":"431026","name":"汝城县"},{"code":"431027","name":"桂东县"},{"code":"431028","name":"安仁县"},{"code":"431081","name":"资兴市"}]},{"code":"431100","name":"永州市","children":[{"code":"431101","name":"市辖区"},{"code":"431102","name":"零陵区"},{"code":"431103","name":"冷水滩区"},{"code":"431121","name":"祁阳县"},{"code":"431122","name":"东安县"},{"code":"431123","name":"双牌县"},{"code":"431124","name":"道县"},{"code":"431125","name":"江永县"},{"code":"431126","name":"宁远县"},{"code":"431127","name":"蓝山县"},{"code":"431128","name":"新田县"},{"code":"431129","name":"江华瑶族自治县"}]},{"code":"431200","name":"怀化市","children":[{"code":"431201","name":"市辖区"},{"code":"431202","name":"鹤城区"},{"code":"431221","name":"中方县"},{"code":"431222","name":"沅陵县"},{"code":"431223","name":"辰溪县"},{"code":"431224","name":"溆浦县"},{"code":"431225","name":"会同县"},{"code":"431226","name":"麻阳苗族自治县"},{"code":"431227","name":"新晃侗族自治县"},{"code":"431228","name":"芷江侗族自治县"},{"code":"431229","name":"靖州苗族侗族自治县"},{"code":"431230","name":"通道侗族自治县"},{"code":"431281","name":"洪江市"}]},{"code":"431300","name":"娄底市","children":[{"code":"431301","name":"市辖区"},{"code":"431302","name":"娄星区"},{"code":"431321","name":"双峰县"},{"code":"431322","name":"新化县"},{"code":"431381","name":"冷水江市"},{"code":"431382","name":"涟源市"}]},{"code":"433100","name":"湘西土家族苗族自治州","children":[{"code":"433101","name":"吉首市"},{"code":"433122","name":"泸溪县"},{"code":"433123","name":"凤凰县"},{"code":"433124","name":"花垣县"},{"code":"433125","name":"保靖县"},{"code":"433126","name":"古丈县"},{"code":"433127","name":"永顺县"},{"code":"433130","name":"龙山县"}]}]},{"code":"440000","name":"广东省","children":[{"code":"440100","name":"广州市","children":[{"code":"440101","name":"市辖区"},{"code":"440103","name":"荔湾区"},{"code":"440104","name":"越秀区"},{"code":"440105","name":"海珠区"},{"code":"440106","name":"天河区"},{"code":"440111","name":"白云区"},{"code":"440112","name":"黄埔区"},{"code":"440113","name":"番禺区"},{"code":"440114","name":"花都区"},{"code":"440115","name":"南沙区"},{"code":"440116","name":"萝岗区"},{"code":"440117","name":"从化区"},{"code":"440118","name":"增城区"}]},{"code":"440200","name":"韶关市","children":[{"code":"440201","name":"市辖区"},{"code":"440203","name":"武江区"},{"code":"440204","name":"浈江区"},{"code":"440205","name":"曲江区"},{"code":"440222","name":"始兴县"},{"code":"440224","name":"仁化县"},{"code":"440229","name":"翁源县"},{"code":"440232","name":"乳源瑶族自治县"},{"code":"440233","name":"新丰县"},{"code":"440281","name":"乐昌市"},{"code":"440282","name":"南雄市"}]},{"code":"440300","name":"深圳市","children":[{"code":"440301","name":"市辖区"},{"code":"440303","name":"罗湖区"},{"code":"440304","name":"福田区"},{"code":"440305","name":"南山区"},{"code":"440306","name":"宝安区"},{"code":"440307","name":"龙岗区"},{"code":"440308","name":"盐田区"}]},{"code":"440400","name":"珠海市","children":[{"code":"440401","name":"市辖区"},{"code":"440402","name":"香洲区"},{"code":"440403","name":"斗门区"},{"code":"440404","name":"金湾区"}]},{"code":"440500","name":"汕头市","children":[{"code":"440501","name":"市辖区"},{"code":"440507","name":"龙湖区"},{"code":"440511","name":"金平区"},{"code":"440512","name":"濠江区"},{"code":"440513","name":"潮阳区"},{"code":"440514","name":"潮南区"},{"code":"440515","name":"澄海区"},{"code":"440523","name":"南澳县"}]},{"code":"440600","name":"佛山市","children":[{"code":"440601","name":"市辖区"},{"code":"440604","name":"禅城区"},{"code":"440605","name":"南海区"},{"code":"440606","name":"顺德区"},{"code":"440607","name":"三水区"},{"code":"440608","name":"高明区"}]},{"code":"440700","name":"江门市","children":[{"code":"440701","name":"市辖区"},{"code":"440703","name":"蓬江区"},{"code":"440704","name":"江海区"},{"code":"440705","name":"新会区"},{"code":"440781","name":"台山市"},{"code":"440783","name":"开平市"},{"code":"440784","name":"鹤山市"},{"code":"440785","name":"恩平市"}]},{"code":"440800","name":"湛江市","children":[{"code":"440801","name":"市辖区"},{"code":"440802","name":"赤坎区"},{"code":"440803","name":"霞山区"},{"code":"440804","name":"坡头区"},{"code":"440811","name":"麻章区"},{"code":"440823","name":"遂溪县"},{"code":"440825","name":"徐闻县"},{"code":"440881","name":"廉江市"},{"code":"440882","name":"雷州市"},{"code":"440883","name":"吴川市"}]},{"code":"440900","name":"茂名市","children":[{"code":"440901","name":"市辖区"},{"code":"440902","name":"茂南区"},{"code":"440904","name":"电白区"},{"code":"440981","name":"高州市"},{"code":"440982","name":"化州市"},{"code":"440983","name":"信宜市"}]},{"code":"441200","name":"肇庆市","children":[{"code":"441201","name":"市辖区"},{"code":"441202","name":"端州区"},{"code":"441203","name":"鼎湖区"},{"code":"441223","name":"广宁县"},{"code":"441224","name":"怀集县"},{"code":"441225","name":"封开县"},{"code":"441226","name":"德庆县"},{"code":"441283","name":"高要市"},{"code":"441284","name":"四会市"}]},{"code":"441300","name":"惠州市","children":[{"code":"441301","name":"市辖区"},{"code":"441302","name":"惠城区"},{"code":"441303","name":"惠阳区"},{"code":"441322","name":"博罗县"},{"code":"441323","name":"惠东县"},{"code":"441324","name":"龙门县"}]},{"code":"441400","name":"梅州市","children":[{"code":"441401","name":"市辖区"},{"code":"441402","name":"梅江区"},{"code":"441403","name":"梅县区"},{"code":"441422","name":"大埔县"},{"code":"441423","name":"丰顺县"},{"code":"441424","name":"五华县"},{"code":"441426","name":"平远县"},{"code":"441427","name":"蕉岭县"},{"code":"441481","name":"兴宁市"}]},{"code":"441500","name":"汕尾市","children":[{"code":"441501","name":"市辖区"},{"code":"441502","name":"城区"},{"code":"441521","name":"海丰县"},{"code":"441523","name":"陆河县"},{"code":"441581","name":"陆丰市"}]},{"code":"441600","name":"河源市","children":[{"code":"441601","name":"市辖区"},{"code":"441602","name":"源城区"},{"code":"441621","name":"紫金县"},{"code":"441622","name":"龙川县"},{"code":"441623","name":"连平县"},{"code":"441624","name":"和平县"},{"code":"441625","name":"东源县"}]},{"code":"441700","name":"阳江市","children":[{"code":"441701","name":"市辖区"},{"code":"441702","name":"江城区"},{"code":"441721","name":"阳西县"},{"code":"441723","name":"阳东县"},{"code":"441781","name":"阳春市"}]},{"code":"441800","name":"清远市","children":[{"code":"441801","name":"市辖区"},{"code":"441802","name":"清城区"},{"code":"441803","name":"清新区"},{"code":"441821","name":"佛冈县"},{"code":"441823","name":"阳山县"},{"code":"441825","name":"连山壮族瑶族自治县"},{"code":"441826","name":"连南瑶族自治县"},{"code":"441881","name":"英德市"},{"code":"441882","name":"连州市"}]},{"code":"441900","name":"东莞市"},{"code":"442000","name":"中山市"},{"code":"445100","name":"潮州市","children":[{"code":"445101","name":"市辖区"},{"code":"445102","name":"湘桥区"},{"code":"445103","name":"潮安区"},{"code":"445122","name":"饶平县"}]},{"code":"445200","name":"揭阳市","children":[{"code":"445201","name":"市辖区"},{"code":"445202","name":"榕城区"},{"code":"445203","name":"揭东区"},{"code":"445222","name":"揭西县"},{"code":"445224","name":"惠来县"},{"code":"445281","name":"普宁市"}]},{"code":"445300","name":"云浮市","children":[{"code":"445301","name":"市辖区"},{"code":"445302","name":"云城区"},{"code":"445303","name":"云安区"},{"code":"445321","name":"新兴县"},{"code":"445322","name":"郁南县"},{"code":"445381","name":"罗定市"}]}]},{"code":"450000","name":"广西壮族自治区","children":[{"code":"450100","name":"南宁市","children":[{"code":"450101","name":"市辖区"},{"code":"450102","name":"兴宁区"},{"code":"450103","name":"青秀区"},{"code":"450105","name":"江南区"},{"code":"450107","name":"西乡塘区"},{"code":"450108","name":"良庆区"},{"code":"450109","name":"邕宁区"},{"code":"450122","name":"武鸣县"},{"code":"450123","name":"隆安县"},{"code":"450124","name":"马山县"},{"code":"450125","name":"上林县"},{"code":"450126","name":"宾阳县"},{"code":"450127","name":"横县"}]},{"code":"450200","name":"柳州市","children":[{"code":"450201","name":"市辖区"},{"code":"450202","name":"城中区"},{"code":"450203","name":"鱼峰区"},{"code":"450204","name":"柳南区"},{"code":"450205","name":"柳北区"},{"code":"450221","name":"柳江县"},{"code":"450222","name":"柳城县"},{"code":"450223","name":"鹿寨县"},{"code":"450224","name":"融安县"},{"code":"450225","name":"融水苗族自治县"},{"code":"450226","name":"三江侗族自治县"}]},{"code":"450300","name":"桂林市","children":[{"code":"450301","name":"市辖区"},{"code":"450302","name":"秀峰区"},{"code":"450303","name":"叠彩区"},{"code":"450304","name":"象山区"},{"code":"450305","name":"七星区"},{"code":"450311","name":"雁山区"},{"code":"450312","name":"临桂区"},{"code":"450321","name":"阳朔县"},{"code":"450323","name":"灵川县"},{"code":"450324","name":"全州县"},{"code":"450325","name":"兴安县"},{"code":"450326","name":"永福县"},{"code":"450327","name":"灌阳县"},{"code":"450328","name":"龙胜各族自治县"},{"code":"450329","name":"资源县"},{"code":"450330","name":"平乐县"},{"code":"450331","name":"荔浦县"},{"code":"450332","name":"恭城瑶族自治县"}]},{"code":"450400","name":"梧州市","children":[{"code":"450401","name":"市辖区"},{"code":"450403","name":"万秀区"},{"code":"450405","name":"长洲区"},{"code":"450406","name":"龙圩区"},{"code":"450421","name":"苍梧县"},{"code":"450422","name":"藤县"},{"code":"450423","name":"蒙山县"},{"code":"450481","name":"岑溪市"}]},{"code":"450500","name":"北海市","children":[{"code":"450501","name":"市辖区"},{"code":"450502","name":"海城区"},{"code":"450503","name":"银海区"},{"code":"450512","name":"铁山港区"},{"code":"450521","name":"合浦县"}]},{"code":"450600","name":"防城港市","children":[{"code":"450601","name":"市辖区"},{"code":"450602","name":"港口区"},{"code":"450603","name":"防城区"},{"code":"450621","name":"上思县"},{"code":"450681","name":"东兴市"}]},{"code":"450700","name":"钦州市","children":[{"code":"450701","name":"市辖区"},{"code":"450702","name":"钦南区"},{"code":"450703","name":"钦北区"},{"code":"450721","name":"灵山县"},{"code":"450722","name":"浦北县"}]},{"code":"450800","name":"贵港市","children":[{"code":"450801","name":"市辖区"},{"code":"450802","name":"港北区"},{"code":"450803","name":"港南区"},{"code":"450804","name":"覃塘区"},{"code":"450821","name":"平南县"},{"code":"450881","name":"桂平市"}]},{"code":"450900","name":"玉林市","children":[{"code":"450901","name":"市辖区"},{"code":"450902","name":"玉州区"},{"code":"450903","name":"福绵区"},{"code":"450921","name":"容县"},{"code":"450922","name":"陆川县"},{"code":"450923","name":"博白县"},{"code":"450924","name":"兴业县"},{"code":"450981","name":"北流市"}]},{"code":"451000","name":"百色市","children":[{"code":"451001","name":"市辖区"},{"code":"451002","name":"右江区"},{"code":"451021","name":"田阳县"},{"code":"451022","name":"田东县"},{"code":"451023","name":"平果县"},{"code":"451024","name":"德保县"},{"code":"451025","name":"靖西县"},{"code":"451026","name":"那坡县"},{"code":"451027","name":"凌云县"},{"code":"451028","name":"乐业县"},{"code":"451029","name":"田林县"},{"code":"451030","name":"西林县"},{"code":"451031","name":"隆林各族自治县"}]},{"code":"451100","name":"贺州市","children":[{"code":"451101","name":"市辖区"},{"code":"451102","name":"八步区"},{"code":"451121","name":"昭平县"},{"code":"451122","name":"钟山县"},{"code":"451123","name":"富川瑶族自治县"}]},{"code":"451200","name":"河池市","children":[{"code":"451201","name":"市辖区"},{"code":"451202","name":"金城江区"},{"code":"451221","name":"南丹县"},{"code":"451222","name":"天峨县"},{"code":"451223","name":"凤山县"},{"code":"451224","name":"东兰县"},{"code":"451225","name":"罗城仫佬族自治县"},{"code":"451226","name":"环江毛南族自治县"},{"code":"451227","name":"巴马瑶族自治县"},{"code":"451228","name":"都安瑶族自治县"},{"code":"451229","name":"大化瑶族自治县"},{"code":"451281","name":"宜州市"}]},{"code":"451300","name":"来宾市","children":[{"code":"451301","name":"市辖区"},{"code":"451302","name":"兴宾区"},{"code":"451321","name":"忻城县"},{"code":"451322","name":"象州县"},{"code":"451323","name":"武宣县"},{"code":"451324","name":"金秀瑶族自治县"},{"code":"451381","name":"合山市"}]},{"code":"451400","name":"崇左市","children":[{"code":"451401","name":"市辖区"},{"code":"451402","name":"江州区"},{"code":"451421","name":"扶绥县"},{"code":"451422","name":"宁明县"},{"code":"451423","name":"龙州县"},{"code":"451424","name":"大新县"},{"code":"451425","name":"天等县"},{"code":"451481","name":"凭祥市"}]}]},{"code":"460000","name":"海南省","children":[{"code":"460100","name":"海口市","children":[{"code":"460101","name":"市辖区"},{"code":"460105","name":"秀英区"},{"code":"460106","name":"龙华区"},{"code":"460107","name":"琼山区"},{"code":"460108","name":"美兰区"}]},{"code":"460200","name":"三亚市","children":[{"code":"460201","name":"市辖区"},{"code":"460202","name":"海棠区"},{"code":"460203","name":"吉阳区"},{"code":"460204","name":"天涯区"},{"code":"460205","name":"崖州区"}]},{"code":"460300","name":"三沙市"},{"code":"469000","name":"省直辖县级行政区划","children":[{"code":"469001","name":"五指山市"},{"code":"469002","name":"琼海市"},{"code":"469003","name":"儋州市"},{"code":"469005","name":"文昌市"},{"code":"469006","name":"万宁市"},{"code":"469007","name":"东方市"},{"code":"469021","name":"定安县"},{"code":"469022","name":"屯昌县"},{"code":"469023","name":"澄迈县"},{"code":"469024","name":"临高县"},{"code":"469025","name":"白沙黎族自治县"},{"code":"469026","name":"昌江黎族自治县"},{"code":"469027","name":"乐东黎族自治县"},{"code":"469028","name":"陵水黎族自治县"},{"code":"469029","name":"保亭黎族苗族自治县"},{"code":"469030","name":"琼中黎族苗族自治县"}]}]},{"code":"500000","name":"重庆市","children":[{"code":"500100","name":"市辖区","children":[{"code":"500101","name":"万州区"},{"code":"500102","name":"涪陵区"},{"code":"500103","name":"渝中区"},{"code":"500104","name":"大渡口区"},{"code":"500105","name":"江北区"},{"code":"500106","name":"沙坪坝区"},{"code":"500107","name":"九龙坡区"},{"code":"500108","name":"南岸区"},{"code":"500109","name":"北碚区"},{"code":"500110","name":"綦江区"},{"code":"500111","name":"大足区"},{"code":"500112","name":"渝北区"},{"code":"500113","name":"巴南区"},{"code":"500114","name":"黔江区"},{"code":"500115","name":"长寿区"},{"code":"500116","name":"江津区"},{"code":"500117","name":"合川区"},{"code":"500118","name":"永川区"},{"code":"500119","name":"南川区"},{"code":"500120","name":"璧山区"},{"code":"500151","name":"铜梁区"}]},{"code":"500200","name":"县","children":[{"code":"500223","name":"潼南县"},{"code":"500226","name":"荣昌县"},{"code":"500228","name":"梁平县"},{"code":"500229","name":"城口县"},{"code":"500230","name":"丰都县"},{"code":"500231","name":"垫江县"},{"code":"500232","name":"武隆县"},{"code":"500233","name":"忠县"},{"code":"500234","name":"开县"},{"code":"500235","name":"云阳县"},{"code":"500236","name":"奉节县"},{"code":"500237","name":"巫山县"},{"code":"500238","name":"巫溪县"},{"code":"500240","name":"石柱土家族自治县"},{"code":"500241","name":"秀山土家族苗族自治县"},{"code":"500242","name":"酉阳土家族苗族自治县"},{"code":"500243","name":"彭水苗族土家族自治县"}]}]},{"code":"510000","name":"四川省","children":[{"code":"510100","name":"成都市","children":[{"code":"510101","name":"市辖区"},{"code":"510104","name":"锦江区"},{"code":"510105","name":"青羊区"},{"code":"510106","name":"金牛区"},{"code":"510107","name":"武侯区"},{"code":"510108","name":"成华区"},{"code":"510112","name":"龙泉驿区"},{"code":"510113","name":"青白江区"},{"code":"510114","name":"新都区"},{"code":"510115","name":"温江区"},{"code":"510121","name":"金堂县"},{"code":"510122","name":"双流县"},{"code":"510124","name":"郫县"},{"code":"510129","name":"大邑县"},{"code":"510131","name":"蒲江县"},{"code":"510132","name":"新津县"},{"code":"510181","name":"都江堰市"},{"code":"510182","name":"彭州市"},{"code":"510183","name":"邛崃市"},{"code":"510184","name":"崇州市"}]},{"code":"510300","name":"自贡市","children":[{"code":"510301","name":"市辖区"},{"code":"510302","name":"自流井区"},{"code":"510303","name":"贡井区"},{"code":"510304","name":"大安区"},{"code":"510311","name":"沿滩区"},{"code":"510321","name":"荣县"},{"code":"510322","name":"富顺县"}]},{"code":"510400","name":"攀枝花市","children":[{"code":"510401","name":"市辖区"},{"code":"510402","name":"东区"},{"code":"510403","name":"西区"},{"code":"510411","name":"仁和区"},{"code":"510421","name":"米易县"},{"code":"510422","name":"盐边县"}]},{"code":"510500","name":"泸州市","children":[{"code":"510501","name":"市辖区"},{"code":"510502","name":"江阳区"},{"code":"510503","name":"纳溪区"},{"code":"510504","name":"龙马潭区"},{"code":"510521","name":"泸县"},{"code":"510522","name":"合江县"},{"code":"510524","name":"叙永县"},{"code":"510525","name":"古蔺县"}]},{"code":"510600","name":"德阳市","children":[{"code":"510601","name":"市辖区"},{"code":"510603","name":"旌阳区"},{"code":"510623","name":"中江县"},{"code":"510626","name":"罗江县"},{"code":"510681","name":"广汉市"},{"code":"510682","name":"什邡市"},{"code":"510683","name":"绵竹市"}]},{"code":"510700","name":"绵阳市","children":[{"code":"510701","name":"市辖区"},{"code":"510703","name":"涪城区"},{"code":"510704","name":"游仙区"},{"code":"510722","name":"三台县"},{"code":"510723","name":"盐亭县"},{"code":"510724","name":"安县"},{"code":"510725","name":"梓潼县"},{"code":"510726","name":"北川羌族自治县"},{"code":"510727","name":"平武县"},{"code":"510781","name":"江油市"}]},{"code":"510800","name":"广元市","children":[{"code":"510801","name":"市辖区"},{"code":"510802","name":"利州区"},{"code":"510811","name":"昭化区"},{"code":"510812","name":"朝天区"},{"code":"510821","name":"旺苍县"},{"code":"510822","name":"青川县"},{"code":"510823","name":"剑阁县"},{"code":"510824","name":"苍溪县"}]},{"code":"510900","name":"遂宁市","children":[{"code":"510901","name":"市辖区"},{"code":"510903","name":"船山区"},{"code":"510904","name":"安居区"},{"code":"510921","name":"蓬溪县"},{"code":"510922","name":"射洪县"},{"code":"510923","name":"大英县"}]},{"code":"511000","name":"内江市","children":[{"code":"511001","name":"市辖区"},{"code":"511002","name":"市中区"},{"code":"511011","name":"东兴区"},{"code":"511024","name":"威远县"},{"code":"511025","name":"资中县"},{"code":"511028","name":"隆昌县"}]},{"code":"511100","name":"乐山市","children":[{"code":"511101","name":"市辖区"},{"code":"511102","name":"市中区"},{"code":"511111","name":"沙湾区"},{"code":"511112","name":"五通桥区"},{"code":"511113","name":"金口河区"},{"code":"511123","name":"犍为县"},{"code":"511124","name":"井研县"},{"code":"511126","name":"夹江县"},{"code":"511129","name":"沐川县"},{"code":"511132","name":"峨边彝族自治县"},{"code":"511133","name":"马边彝族自治县"},{"code":"511181","name":"峨眉山市"}]},{"code":"511300","name":"南充市","children":[{"code":"511301","name":"市辖区"},{"code":"511302","name":"顺庆区"},{"code":"511303","name":"高坪区"},{"code":"511304","name":"嘉陵区"},{"code":"511321","name":"南部县"},{"code":"511322","name":"营山县"},{"code":"511323","name":"蓬安县"},{"code":"511324","name":"仪陇县"},{"code":"511325","name":"西充县"},{"code":"511381","name":"阆中市"}]},{"code":"511400","name":"眉山市","children":[{"code":"511401","name":"市辖区"},{"code":"511402","name":"东坡区"},{"code":"511421","name":"仁寿县"},{"code":"511422","name":"彭山县"},{"code":"511423","name":"洪雅县"},{"code":"511424","name":"丹棱县"},{"code":"511425","name":"青神县"}]},{"code":"511500","name":"宜宾市","children":[{"code":"511501","name":"市辖区"},{"code":"511502","name":"翠屏区"},{"code":"511503","name":"南溪区"},{"code":"511521","name":"宜宾县"},{"code":"511523","name":"江安县"},{"code":"511524","name":"长宁县"},{"code":"511525","name":"高县"},{"code":"511526","name":"珙县"},{"code":"511527","name":"筠连县"},{"code":"511528","name":"兴文县"},{"code":"511529","name":"屏山县"}]},{"code":"511600","name":"广安市","children":[{"code":"511601","name":"市辖区"},{"code":"511602","name":"广安区"},{"code":"511603","name":"前锋区"},{"code":"511621","name":"岳池县"},{"code":"511622","name":"武胜县"},{"code":"511623","name":"邻水县"},{"code":"511681","name":"华蓥市"}]},{"code":"511700","name":"达州市","children":[{"code":"511701","name":"市辖区"},{"code":"511702","name":"通川区"},{"code":"511703","name":"达川区"},{"code":"511722","name":"宣汉县"},{"code":"511723","name":"开江县"},{"code":"511724","name":"大竹县"},{"code":"511725","name":"渠县"},{"code":"511781","name":"万源市"}]},{"code":"511800","name":"雅安市","children":[{"code":"511801","name":"市辖区"},{"code":"511802","name":"雨城区"},{"code":"511803","name":"名山区"},{"code":"511822","name":"荥经县"},{"code":"511823","name":"汉源县"},{"code":"511824","name":"石棉县"},{"code":"511825","name":"天全县"},{"code":"511826","name":"芦山县"},{"code":"511827","name":"宝兴县"}]},{"code":"511900","name":"巴中市","children":[{"code":"511901","name":"市辖区"},{"code":"511902","name":"巴州区"},{"code":"511903","name":"恩阳区"},{"code":"511921","name":"通江县"},{"code":"511922","name":"南江县"},{"code":"511923","name":"平昌县"}]},{"code":"512000","name":"资阳市","children":[{"code":"512001","name":"市辖区"},{"code":"512002","name":"雁江区"},{"code":"512021","name":"安岳县"},{"code":"512022","name":"乐至县"},{"code":"512081","name":"简阳市"}]},{"code":"513200","name":"阿坝藏族羌族自治州","children":[{"code":"513221","name":"汶川县"},{"code":"513222","name":"理县"},{"code":"513223","name":"茂县"},{"code":"513224","name":"松潘县"},{"code":"513225","name":"九寨沟县"},{"code":"513226","name":"金川县"},{"code":"513227","name":"小金县"},{"code":"513228","name":"黑水县"},{"code":"513229","name":"马尔康县"},{"code":"513230","name":"壤塘县"},{"code":"513231","name":"阿坝县"},{"code":"513232","name":"若尔盖县"},{"code":"513233","name":"红原县"}]},{"code":"513300","name":"甘孜藏族自治州","children":[{"code":"513321","name":"康定县"},{"code":"513322","name":"泸定县"},{"code":"513323","name":"丹巴县"},{"code":"513324","name":"九龙县"},{"code":"513325","name":"雅江县"},{"code":"513326","name":"道孚县"},{"code":"513327","name":"炉霍县"},{"code":"513328","name":"甘孜县"},{"code":"513329","name":"新龙县"},{"code":"513330","name":"德格县"},{"code":"513331","name":"白玉县"},{"code":"513332","name":"石渠县"},{"code":"513333","name":"色达县"},{"code":"513334","name":"理塘县"},{"code":"513335","name":"巴塘县"},{"code":"513336","name":"乡城县"},{"code":"513337","name":"稻城县"},{"code":"513338","name":"得荣县"}]},{"code":"513400","name":"凉山彝族自治州","children":[{"code":"513401","name":"西昌市"},{"code":"513422","name":"木里藏族自治县"},{"code":"513423","name":"盐源县"},{"code":"513424","name":"德昌县"},{"code":"513425","name":"会理县"},{"code":"513426","name":"会东县"},{"code":"513427","name":"宁南县"},{"code":"513428","name":"普格县"},{"code":"513429","name":"布拖县"},{"code":"513430","name":"金阳县"},{"code":"513431","name":"昭觉县"},{"code":"513432","name":"喜德县"},{"code":"513433","name":"冕宁县"},{"code":"513434","name":"越西县"},{"code":"513435","name":"甘洛县"},{"code":"513436","name":"美姑县"},{"code":"513437","name":"雷波县"}]}]},{"code":"520000","name":"贵州省","children":[{"code":"520100","name":"贵阳市","children":[{"code":"520101","name":"市辖区"},{"code":"520102","name":"南明区"},{"code":"520103","name":"云岩区"},{"code":"520111","name":"花溪区"},{"code":"520112","name":"乌当区"},{"code":"520113","name":"白云区"},{"code":"520115","name":"观山湖区"},{"code":"520121","name":"开阳县"},{"code":"520122","name":"息烽县"},{"code":"520123","name":"修文县"},{"code":"520181","name":"清镇市"}]},{"code":"520200","name":"六盘水市","children":[{"code":"520201","name":"钟山区"},{"code":"520203","name":"六枝特区"},{"code":"520221","name":"水城县"},{"code":"520222","name":"盘县"}]},{"code":"520300","name":"遵义市","children":[{"code":"520301","name":"市辖区"},{"code":"520302","name":"红花岗区"},{"code":"520303","name":"汇川区"},{"code":"520321","name":"遵义县"},{"code":"520322","name":"桐梓县"},{"code":"520323","name":"绥阳县"},{"code":"520324","name":"正安县"},{"code":"520325","name":"道真仡佬族苗族自治县"},{"code":"520326","name":"务川仡佬族苗族自治县"},{"code":"520327","name":"凤冈县"},{"code":"520328","name":"湄潭县"},{"code":"520329","name":"余庆县"},{"code":"520330","name":"习水县"},{"code":"520381","name":"赤水市"},{"code":"520382","name":"仁怀市"}]},{"code":"520400","name":"安顺市","children":[{"code":"520401","name":"市辖区"},{"code":"520402","name":"西秀区"},{"code":"520421","name":"平坝县"},{"code":"520422","name":"普定县"},{"code":"520423","name":"镇宁布依族苗族自治县"},{"code":"520424","name":"关岭布依族苗族自治县"},{"code":"520425","name":"紫云苗族布依族自治县"}]},{"code":"520500","name":"毕节市","children":[{"code":"520501","name":"市辖区"},{"code":"520502","name":"七星关区"},{"code":"520521","name":"大方县"},{"code":"520522","name":"黔西县"},{"code":"520523","name":"金沙县"},{"code":"520524","name":"织金县"},{"code":"520525","name":"纳雍县"},{"code":"520526","name":"威宁彝族回族苗族自治县"},{"code":"520527","name":"赫章县"}]},{"code":"520600","name":"铜仁市","children":[{"code":"520601","name":"市辖区"},{"code":"520602","name":"碧江区"},{"code":"520603","name":"万山区"},{"code":"520621","name":"江口县"},{"code":"520622","name":"玉屏侗族自治县"},{"code":"520623","name":"石阡县"},{"code":"520624","name":"思南县"},{"code":"520625","name":"印江土家族苗族自治县"},{"code":"520626","name":"德江县"},{"code":"520627","name":"沿河土家族自治县"},{"code":"520628","name":"松桃苗族自治县"}]},{"code":"522300","name":"黔西南布依族苗族自治州","children":[{"code":"522301","name":"兴义市"},{"code":"522322","name":"兴仁县"},{"code":"522323","name":"普安县"},{"code":"522324","name":"晴隆县"},{"code":"522325","name":"贞丰县"},{"code":"522326","name":"望谟县"},{"code":"522327","name":"册亨县"},{"code":"522328","name":"安龙县"}]},{"code":"522600","name":"黔东南苗族侗族自治州","children":[{"code":"522601","name":"凯里市"},{"code":"522622","name":"黄平县"},{"code":"522623","name":"施秉县"},{"code":"522624","name":"三穗县"},{"code":"522625","name":"镇远县"},{"code":"522626","name":"岑巩县"},{"code":"522627","name":"天柱县"},{"code":"522628","name":"锦屏县"},{"code":"522629","name":"剑河县"},{"code":"522630","name":"台江县"},{"code":"522631","name":"黎平县"},{"code":"522632","name":"榕江县"},{"code":"522633","name":"从江县"},{"code":"522634","name":"雷山县"},{"code":"522635","name":"麻江县"},{"code":"522636","name":"丹寨县"}]},{"code":"522700","name":"黔南布依族苗族自治州","children":[{"code":"522701","name":"都匀市"},{"code":"522702","name":"福泉市"},{"code":"522722","name":"荔波县"},{"code":"522723","name":"贵定县"},{"code":"522725","name":"瓮安县"},{"code":"522726","name":"独山县"},{"code":"522727","name":"平塘县"},{"code":"522728","name":"罗甸县"},{"code":"522729","name":"长顺县"},{"code":"522730","name":"龙里县"},{"code":"522731","name":"惠水县"},{"code":"522732","name":"三都水族自治县"}]}]},{"code":"530000","name":"云南省","children":[{"code":"530100","name":"昆明市","children":[{"code":"530101","name":"市辖区"},{"code":"530102","name":"五华区"},{"code":"530103","name":"盘龙区"},{"code":"530111","name":"官渡区"},{"code":"530112","name":"西山区"},{"code":"530113","name":"东川区"},{"code":"530114","name":"呈贡区"},{"code":"530122","name":"晋宁县"},{"code":"530124","name":"富民县"},{"code":"530125","name":"宜良县"},{"code":"530126","name":"石林彝族自治县"},{"code":"530127","name":"嵩明县"},{"code":"530128","name":"禄劝彝族苗族自治县"},{"code":"530129","name":"寻甸回族彝族自治县"},{"code":"530181","name":"安宁市"}]},{"code":"530300","name":"曲靖市","children":[{"code":"530301","name":"市辖区"},{"code":"530302","name":"麒麟区"},{"code":"530321","name":"马龙县"},{"code":"530322","name":"陆良县"},{"code":"530323","name":"师宗县"},{"code":"530324","name":"罗平县"},{"code":"530325","name":"富源县"},{"code":"530326","name":"会泽县"},{"code":"530328","name":"沾益县"},{"code":"530381","name":"宣威市"}]},{"code":"530400","name":"玉溪市","children":[{"code":"530401","name":"市辖区"},{"code":"530402","name":"红塔区"},{"code":"530421","name":"江川县"},{"code":"530422","name":"澄江县"},{"code":"530423","name":"通海县"},{"code":"530424","name":"华宁县"},{"code":"530425","name":"易门县"},{"code":"530426","name":"峨山彝族自治县"},{"code":"530427","name":"新平彝族傣族自治县"},{"code":"530428","name":"元江哈尼族彝族傣族自治县"}]},{"code":"530500","name":"保山市","children":[{"code":"530501","name":"市辖区"},{"code":"530502","name":"隆阳区"},{"code":"530521","name":"施甸县"},{"code":"530522","name":"腾冲县"},{"code":"530523","name":"龙陵县"},{"code":"530524","name":"昌宁县"}]},{"code":"530600","name":"昭通市","children":[{"code":"530601","name":"市辖区"},{"code":"530602","name":"昭阳区"},{"code":"530621","name":"鲁甸县"},{"code":"530622","name":"巧家县"},{"code":"530623","name":"盐津县"},{"code":"530624","name":"大关县"},{"code":"530625","name":"永善县"},{"code":"530626","name":"绥江县"},{"code":"530627","name":"镇雄县"},{"code":"530628","name":"彝良县"},{"code":"530629","name":"威信县"},{"code":"530630","name":"水富县"}]},{"code":"530700","name":"丽江市","children":[{"code":"530701","name":"市辖区"},{"code":"530702","name":"古城区"},{"code":"530721","name":"玉龙纳西族自治县"},{"code":"530722","name":"永胜县"},{"code":"530723","name":"华坪县"},{"code":"530724","name":"宁蒗彝族自治县"}]},{"code":"530800","name":"普洱市","children":[{"code":"530801","name":"市辖区"},{"code":"530802","name":"思茅区"},{"code":"530821","name":"宁洱哈尼族彝族自治县"},{"code":"530822","name":"墨江哈尼族自治县"},{"code":"530823","name":"景东彝族自治县"},{"code":"530824","name":"景谷傣族彝族自治县"},{"code":"530825","name":"镇沅彝族哈尼族拉祜族自治县"},{"code":"530826","name":"江城哈尼族彝族自治县"},{"code":"530827","name":"孟连傣族拉祜族佤族自治县"},{"code":"530828","name":"澜沧拉祜族自治县"},{"code":"530829","name":"西盟佤族自治县"}]},{"code":"530900","name":"临沧市","children":[{"code":"530901","name":"市辖区"},{"code":"530902","name":"临翔区"},{"code":"530921","name":"凤庆县"},{"code":"530922","name":"云县"},{"code":"530923","name":"永德县"},{"code":"530924","name":"镇康县"},{"code":"530925","name":"双江拉祜族佤族布朗族傣族自治县"},{"code":"530926","name":"耿马傣族佤族自治县"},{"code":"530927","name":"沧源佤族自治县"}]},{"code":"532300","name":"楚雄彝族自治州","children":[{"code":"532301","name":"楚雄市"},{"code":"532322","name":"双柏县"},{"code":"532323","name":"牟定县"},{"code":"532324","name":"南华县"},{"code":"532325","name":"姚安县"},{"code":"532326","name":"大姚县"},{"code":"532327","name":"永仁县"},{"code":"532328","name":"元谋县"},{"code":"532329","name":"武定县"},{"code":"532331","name":"禄丰县"}]},{"code":"532500","name":"红河哈尼族彝族自治州","children":[{"code":"532501","name":"个旧市"},{"code":"532502","name":"开远市"},{"code":"532503","name":"蒙自市"},{"code":"532504","name":"弥勒市"},{"code":"532523","name":"屏边苗族自治县"},{"code":"532524","name":"建水县"},{"code":"532525","name":"石屏县"},{"code":"532527","name":"泸西县"},{"code":"532528","name":"元阳县"},{"code":"532529","name":"红河县"},{"code":"532530","name":"金平苗族瑶族傣族自治县"},{"code":"532531","name":"绿春县"},{"code":"532532","name":"河口瑶族自治县"}]},{"code":"532600","name":"文山壮族苗族自治州","children":[{"code":"532601","name":"文山市"},{"code":"532622","name":"砚山县"},{"code":"532623","name":"西畴县"},{"code":"532624","name":"麻栗坡县"},{"code":"532625","name":"马关县"},{"code":"532626","name":"丘北县"},{"code":"532627","name":"广南县"},{"code":"532628","name":"富宁县"}]},{"code":"532800","name":"西双版纳傣族自治州","children":[{"code":"532801","name":"景洪市"},{"code":"532822","name":"勐海县"},{"code":"532823","name":"勐腊县"}]},{"code":"532900","name":"大理白族自治州","children":[{"code":"532901","name":"大理市"},{"code":"532922","name":"漾濞彝族自治县"},{"code":"532923","name":"祥云县"},{"code":"532924","name":"宾川县"},{"code":"532925","name":"弥渡县"},{"code":"532926","name":"南涧彝族自治县"},{"code":"532927","name":"巍山彝族回族自治县"},{"code":"532928","name":"永平县"},{"code":"532929","name":"云龙县"},{"code":"532930","name":"洱源县"},{"code":"532931","name":"剑川县"},{"code":"532932","name":"鹤庆县"}]},{"code":"533100","name":"德宏傣族景颇族自治州","children":[{"code":"533102","name":"瑞丽市"},{"code":"533103","name":"芒市"},{"code":"533122","name":"梁河县"},{"code":"533123","name":"盈江县"},{"code":"533124","name":"陇川县"}]},{"code":"533300","name":"怒江傈僳族自治州","children":[{"code":"533321","name":"泸水县"},{"code":"533323","name":"福贡县"},{"code":"533324","name":"贡山独龙族怒族自治县"},{"code":"533325","name":"兰坪白族普米族自治县"}]},{"code":"533400","name":"迪庆藏族自治州","children":[{"code":"533421","name":"香格里拉县"},{"code":"533422","name":"德钦县"},{"code":"533423","name":"维西傈僳族自治县"}]}]},{"code":"540000","name":"西藏自治区","children":[{"code":"540100","name":"拉萨市","children":[{"code":"540101","name":"市辖区"},{"code":"540102","name":"城关区"},{"code":"540121","name":"林周县"},{"code":"540122","name":"当雄县"},{"code":"540123","name":"尼木县"},{"code":"540124","name":"曲水县"},{"code":"540125","name":"堆龙德庆县"},{"code":"540126","name":"达孜县"},{"code":"540127","name":"墨竹工卡县"}]},{"code":"540200","name":"日喀则市","children":[{"code":"540202","name":"桑珠孜区"},{"code":"540221","name":"南木林县"},{"code":"540222","name":"江孜县"},{"code":"540223","name":"定日县"},{"code":"540224","name":"萨迦县"},{"code":"540225","name":"拉孜县"},{"code":"540226","name":"昂仁县"},{"code":"540227","name":"谢通门县"},{"code":"540228","name":"白朗县"},{"code":"540229","name":"仁布县"},{"code":"540230","name":"康马县"},{"code":"540231","name":"定结县"},{"code":"540232","name":"仲巴县"},{"code":"540233","name":"亚东县"},{"code":"540234","name":"吉隆县"},{"code":"540235","name":"聂拉木县"},{"code":"540236","name":"萨嘎县"},{"code":"540237","name":"岗巴县"}]},{"code":"542100","name":"昌都地区","children":[{"code":"542121","name":"昌都县"},{"code":"542122","name":"江达县"},{"code":"542123","name":"贡觉县"},{"code":"542124","name":"类乌齐县"},{"code":"542125","name":"丁青县"},{"code":"542126","name":"察雅县"},{"code":"542127","name":"八宿县"},{"code":"542128","name":"左贡县"},{"code":"542129","name":"芒康县"},{"code":"542132","name":"洛隆县"},{"code":"542133","name":"边坝县"}]},{"code":"542200","name":"山南地区","children":[{"code":"542221","name":"乃东县"},{"code":"542222","name":"扎囊县"},{"code":"542223","name":"贡嘎县"},{"code":"542224","name":"桑日县"},{"code":"542225","name":"琼结县"},{"code":"542226","name":"曲松县"},{"code":"542227","name":"措美县"},{"code":"542228","name":"洛扎县"},{"code":"542229","name":"加查县"},{"code":"542231","name":"隆子县"},{"code":"542232","name":"错那县"},{"code":"542233","name":"浪卡子县"}]},{"code":"542400","name":"那曲地区","children":[{"code":"542421","name":"那曲县"},{"code":"542422","name":"嘉黎县"},{"code":"542423","name":"比如县"},{"code":"542424","name":"聂荣县"},{"code":"542425","name":"安多县"},{"code":"542426","name":"申扎县"},{"code":"542427","name":"索县"},{"code":"542428","name":"班戈县"},{"code":"542429","name":"巴青县"},{"code":"542430","name":"尼玛县"},{"code":"542431","name":"双湖县"}]},{"code":"542500","name":"阿里地区","children":[{"code":"542521","name":"普兰县"},{"code":"542522","name":"札达县"},{"code":"542523","name":"噶尔县"},{"code":"542524","name":"日土县"},{"code":"542525","name":"革吉县"},{"code":"542526","name":"改则县"},{"code":"542527","name":"措勤县"}]},{"code":"542600","name":"林芝地区","children":[{"code":"542621","name":"林芝县"},{"code":"542622","name":"工布江达县"},{"code":"542623","name":"米林县"},{"code":"542624","name":"墨脱县"},{"code":"542625","name":"波密县"},{"code":"542626","name":"察隅县"},{"code":"542627","name":"朗县"}]}]},{"code":"610000","name":"陕西省","children":[{"code":"610100","name":"西安市","children":[{"code":"610101","name":"市辖区"},{"code":"610102","name":"新城区"},{"code":"610103","name":"碑林区"},{"code":"610104","name":"莲湖区"},{"code":"610111","name":"灞桥区"},{"code":"610112","name":"未央区"},{"code":"610113","name":"雁塔区"},{"code":"610114","name":"阎良区"},{"code":"610115","name":"临潼区"},{"code":"610116","name":"长安区"},{"code":"610122","name":"蓝田县"},{"code":"610124","name":"周至县"},{"code":"610125","name":"户县"},{"code":"610126","name":"高陵县"}]},{"code":"610200","name":"铜川市","children":[{"code":"610201","name":"市辖区"},{"code":"610202","name":"王益区"},{"code":"610203","name":"印台区"},{"code":"610204","name":"耀州区"},{"code":"610222","name":"宜君县"}]},{"code":"610300","name":"宝鸡市","children":[{"code":"610301","name":"市辖区"},{"code":"610302","name":"渭滨区"},{"code":"610303","name":"金台区"},{"code":"610304","name":"陈仓区"},{"code":"610322","name":"凤翔县"},{"code":"610323","name":"岐山县"},{"code":"610324","name":"扶风县"},{"code":"610326","name":"眉县"},{"code":"610327","name":"陇县"},{"code":"610328","name":"千阳县"},{"code":"610329","name":"麟游县"},{"code":"610330","name":"凤县"},{"code":"610331","name":"太白县"}]},{"code":"610400","name":"咸阳市","children":[{"code":"610401","name":"市辖区"},{"code":"610402","name":"秦都区"},{"code":"610403","name":"杨陵区"},{"code":"610404","name":"渭城区"},{"code":"610422","name":"三原县"},{"code":"610423","name":"泾阳县"},{"code":"610424","name":"乾县"},{"code":"610425","name":"礼泉县"},{"code":"610426","name":"永寿县"},{"code":"610427","name":"彬县"},{"code":"610428","name":"长武县"},{"code":"610429","name":"旬邑县"},{"code":"610430","name":"淳化县"},{"code":"610431","name":"武功县"},{"code":"610481","name":"兴平市"}]},{"code":"610500","name":"渭南市","children":[{"code":"610501","name":"市辖区"},{"code":"610502","name":"临渭区"},{"code":"610521","name":"华县"},{"code":"610522","name":"潼关县"},{"code":"610523","name":"大荔县"},{"code":"610524","name":"合阳县"},{"code":"610525","name":"澄城县"},{"code":"610526","name":"蒲城县"},{"code":"610527","name":"白水县"},{"code":"610528","name":"富平县"},{"code":"610581","name":"韩城市"},{"code":"610582","name":"华阴市"}]},{"code":"610600","name":"延安市","children":[{"code":"610601","name":"市辖区"},{"code":"610602","name":"宝塔区"},{"code":"610621","name":"延长县"},{"code":"610622","name":"延川县"},{"code":"610623","name":"子长县"},{"code":"610624","name":"安塞县"},{"code":"610625","name":"志丹县"},{"code":"610626","name":"吴起县"},{"code":"610627","name":"甘泉县"},{"code":"610628","name":"富县"},{"code":"610629","name":"洛川县"},{"code":"610630","name":"宜川县"},{"code":"610631","name":"黄龙县"},{"code":"610632","name":"黄陵县"}]},{"code":"610700","name":"汉中市","children":[{"code":"610701","name":"市辖区"},{"code":"610702","name":"汉台区"},{"code":"610721","name":"南郑县"},{"code":"610722","name":"城固县"},{"code":"610723","name":"洋县"},{"code":"610724","name":"西乡县"},{"code":"610725","name":"勉县"},{"code":"610726","name":"宁强县"},{"code":"610727","name":"略阳县"},{"code":"610728","name":"镇巴县"},{"code":"610729","name":"留坝县"},{"code":"610730","name":"佛坪县"}]},{"code":"610800","name":"榆林市","children":[{"code":"610801","name":"市辖区"},{"code":"610802","name":"榆阳区"},{"code":"610821","name":"神木县"},{"code":"610822","name":"府谷县"},{"code":"610823","name":"横山县"},{"code":"610824","name":"靖边县"},{"code":"610825","name":"定边县"},{"code":"610826","name":"绥德县"},{"code":"610827","name":"米脂县"},{"code":"610828","name":"佳县"},{"code":"610829","name":"吴堡县"},{"code":"610830","name":"清涧县"},{"code":"610831","name":"子洲县"}]},{"code":"610900","name":"安康市","children":[{"code":"610901","name":"市辖区"},{"code":"610902","name":"汉滨区"},{"code":"610921","name":"汉阴县"},{"code":"610922","name":"石泉县"},{"code":"610923","name":"宁陕县"},{"code":"610924","name":"紫阳县"},{"code":"610925","name":"岚皋县"},{"code":"610926","name":"平利县"},{"code":"610927","name":"镇坪县"},{"code":"610928","name":"旬阳县"},{"code":"610929","name":"白河县"}]},{"code":"611000","name":"商洛市","children":[{"code":"611001","name":"市辖区"},{"code":"611002","name":"商州区"},{"code":"611021","name":"洛南县"},{"code":"611022","name":"丹凤县"},{"code":"611023","name":"商南县"},{"code":"611024","name":"山阳县"},{"code":"611025","name":"镇安县"},{"code":"611026","name":"柞水县"}]}]},{"code":"620000","name":"甘肃省","children":[{"code":"620100","name":"兰州市","children":[{"code":"620101","name":"市辖区"},{"code":"620102","name":"城关区"},{"code":"620103","name":"七里河区"},{"code":"620104","name":"西固区"},{"code":"620105","name":"安宁区"},{"code":"620111","name":"红古区"},{"code":"620121","name":"永登县"},{"code":"620122","name":"皋兰县"},{"code":"620123","name":"榆中县"}]},{"code":"620200","name":"嘉峪关市","children":[{"code":"620201","name":"市辖区"}]},{"code":"620300","name":"金昌市","children":[{"code":"620301","name":"市辖区"},{"code":"620302","name":"金川区"},{"code":"620321","name":"永昌县"}]},{"code":"620400","name":"白银市","children":[{"code":"620401","name":"市辖区"},{"code":"620402","name":"白银区"},{"code":"620403","name":"平川区"},{"code":"620421","name":"靖远县"},{"code":"620422","name":"会宁县"},{"code":"620423","name":"景泰县"}]},{"code":"620500","name":"天水市","children":[{"code":"620501","name":"市辖区"},{"code":"620502","name":"秦州区"},{"code":"620503","name":"麦积区"},{"code":"620521","name":"清水县"},{"code":"620522","name":"秦安县"},{"code":"620523","name":"甘谷县"},{"code":"620524","name":"武山县"},{"code":"620525","name":"张家川回族自治县"}]},{"code":"620600","name":"武威市","children":[{"code":"620601","name":"市辖区"},{"code":"620602","name":"凉州区"},{"code":"620621","name":"民勤县"},{"code":"620622","name":"古浪县"},{"code":"620623","name":"天祝藏族自治县"}]},{"code":"620700","name":"张掖市","children":[{"code":"620701","name":"市辖区"},{"code":"620702","name":"甘州区"},{"code":"620721","name":"肃南裕固族自治县"},{"code":"620722","name":"民乐县"},{"code":"620723","name":"临泽县"},{"code":"620724","name":"高台县"},{"code":"620725","name":"山丹县"}]},{"code":"620800","name":"平凉市","children":[{"code":"620801","name":"市辖区"},{"code":"620802","name":"崆峒区"},{"code":"620821","name":"泾川县"},{"code":"620822","name":"灵台县"},{"code":"620823","name":"崇信县"},{"code":"620824","name":"华亭县"},{"code":"620825","name":"庄浪县"},{"code":"620826","name":"静宁县"}]},{"code":"620900","name":"酒泉市","children":[{"code":"620901","name":"市辖区"},{"code":"620902","name":"肃州区"},{"code":"620921","name":"金塔县"},{"code":"620922","name":"瓜州县"},{"code":"620923","name":"肃北蒙古族自治县"},{"code":"620924","name":"阿克塞哈萨克族自治县"},{"code":"620981","name":"玉门市"},{"code":"620982","name":"敦煌市"}]},{"code":"621000","name":"庆阳市","children":[{"code":"621001","name":"市辖区"},{"code":"621002","name":"西峰区"},{"code":"621021","name":"庆城县"},{"code":"621022","name":"环县"},{"code":"621023","name":"华池县"},{"code":"621024","name":"合水县"},{"code":"621025","name":"正宁县"},{"code":"621026","name":"宁县"},{"code":"621027","name":"镇原县"}]},{"code":"621100","name":"定西市","children":[{"code":"621101","name":"市辖区"},{"code":"621102","name":"安定区"},{"code":"621121","name":"通渭县"},{"code":"621122","name":"陇西县"},{"code":"621123","name":"渭源县"},{"code":"621124","name":"临洮县"},{"code":"621125","name":"漳县"},{"code":"621126","name":"岷县"}]},{"code":"621200","name":"陇南市","children":[{"code":"621201","name":"市辖区"},{"code":"621202","name":"武都区"},{"code":"621221","name":"成县"},{"code":"621222","name":"文县"},{"code":"621223","name":"宕昌县"},{"code":"621224","name":"康县"},{"code":"621225","name":"西和县"},{"code":"621226","name":"礼县"},{"code":"621227","name":"徽县"},{"code":"621228","name":"两当县"}]},{"code":"622900","name":"临夏回族自治州","children":[{"code":"622901","name":"临夏市"},{"code":"622921","name":"临夏县"},{"code":"622922","name":"康乐县"},{"code":"622923","name":"永靖县"},{"code":"622924","name":"广河县"},{"code":"622925","name":"和政县"},{"code":"622926","name":"东乡族自治县"},{"code":"622927","name":"积石山保安族东乡族撒拉族自治县"}]},{"code":"623000","name":"甘南藏族自治州","children":[{"code":"623001","name":"合作市"},{"code":"623021","name":"临潭县"},{"code":"623022","name":"卓尼县"},{"code":"623023","name":"舟曲县"},{"code":"623024","name":"迭部县"},{"code":"623025","name":"玛曲县"},{"code":"623026","name":"碌曲县"},{"code":"623027","name":"夏河县"}]}]},{"code":"630000","name":"青海省","children":[{"code":"630100","name":"西宁市","children":[{"code":"630101","name":"市辖区"},{"code":"630102","name":"城东区"},{"code":"630103","name":"城中区"},{"code":"630104","name":"城西区"},{"code":"630105","name":"城北区"},{"code":"630121","name":"大通回族土族自治县"},{"code":"630122","name":"湟中县"},{"code":"630123","name":"湟源县"}]},{"code":"630200","name":"海东市","children":[{"code":"630202","name":"乐都区"},{"code":"630221","name":"平安县"},{"code":"630222","name":"民和回族土族自治县"},{"code":"630223","name":"互助土族自治县"},{"code":"630224","name":"化隆回族自治县"},{"code":"630225","name":"循化撒拉族自治县"}]},{"code":"632200","name":"海北藏族自治州","children":[{"code":"632221","name":"门源回族自治县"},{"code":"632222","name":"祁连县"},{"code":"632223","name":"海晏县"},{"code":"632224","name":"刚察县"}]},{"code":"632300","name":"黄南藏族自治州","children":[{"code":"632321","name":"同仁县"},{"code":"632322","name":"尖扎县"},{"code":"632323","name":"泽库县"},{"code":"632324","name":"河南蒙古族自治县"}]},{"code":"632500","name":"海南藏族自治州","children":[{"code":"632521","name":"共和县"},{"code":"632522","name":"同德县"},{"code":"632523","name":"贵德县"},{"code":"632524","name":"兴海县"},{"code":"632525","name":"贵南县"}]},{"code":"632600","name":"果洛藏族自治州","children":[{"code":"632621","name":"玛沁县"},{"code":"632622","name":"班玛县"},{"code":"632623","name":"甘德县"},{"code":"632624","name":"达日县"},{"code":"632625","name":"久治县"},{"code":"632626","name":"玛多县"}]},{"code":"632700","name":"玉树藏族自治州","children":[{"code":"632701","name":"玉树市"},{"code":"632722","name":"杂多县"},{"code":"632723","name":"称多县"},{"code":"632724","name":"治多县"},{"code":"632725","name":"囊谦县"},{"code":"632726","name":"曲麻莱县"}]},{"code":"632800","name":"海西蒙古族藏族自治州","children":[{"code":"632801","name":"格尔木市"},{"code":"632802","name":"德令哈市"},{"code":"632821","name":"乌兰县"},{"code":"632822","name":"都兰县"},{"code":"632823","name":"天峻县"}]}]},{"code":"640000","name":"宁夏回族自治区","children":[{"code":"640100","name":"银川市","children":[{"code":"640101","name":"市辖区"},{"code":"640104","name":"兴庆区"},{"code":"640105","name":"西夏区"},{"code":"640106","name":"金凤区"},{"code":"640121","name":"永宁县"},{"code":"640122","name":"贺兰县"},{"code":"640181","name":"灵武市"}]},{"code":"640200","name":"石嘴山市","children":[{"code":"640201","name":"市辖区"},{"code":"640202","name":"大武口区"},{"code":"640205","name":"惠农区"},{"code":"640221","name":"平罗县"}]},{"code":"640300","name":"吴忠市","children":[{"code":"640301","name":"市辖区"},{"code":"640302","name":"利通区"},{"code":"640303","name":"红寺堡区"},{"code":"640323","name":"盐池县"},{"code":"640324","name":"同心县"},{"code":"640381","name":"青铜峡市"}]},{"code":"640400","name":"固原市","children":[{"code":"640401","name":"市辖区"},{"code":"640402","name":"原州区"},{"code":"640422","name":"西吉县"},{"code":"640423","name":"隆德县"},{"code":"640424","name":"泾源县"},{"code":"640425","name":"彭阳县"}]},{"code":"640500","name":"中卫市","children":[{"code":"640501","name":"市辖区"},{"code":"640502","name":"沙坡头区"},{"code":"640521","name":"中宁县"},{"code":"640522","name":"海原县"}]}]},{"code":"650000","name":"新疆维吾尔自治区","children":[{"code":"650100","name":"乌鲁木齐市","children":[{"code":"650101","name":"市辖区"},{"code":"650102","name":"天山区"},{"code":"650103","name":"沙依巴克区"},{"code":"650104","name":"新市区"},{"code":"650105","name":"水磨沟区"},{"code":"650106","name":"头屯河区"},{"code":"650107","name":"达坂城区"},{"code":"650109","name":"米东区"},{"code":"650121","name":"乌鲁木齐县"}]},{"code":"650200","name":"克拉玛依市","children":[{"code":"650201","name":"市辖区"},{"code":"650202","name":"独山子区"},{"code":"650203","name":"克拉玛依区"},{"code":"650204","name":"白碱滩区"},{"code":"650205","name":"乌尔禾区"}]},{"code":"652100","name":"吐鲁番地区","children":[{"code":"652101","name":"吐鲁番市"},{"code":"652122","name":"鄯善县"},{"code":"652123","name":"托克逊县"}]},{"code":"652200","name":"哈密地区","children":[{"code":"652201","name":"哈密市"},{"code":"652222","name":"巴里坤哈萨克自治县"},{"code":"652223","name":"伊吾县"}]},{"code":"652300","name":"昌吉回族自治州","children":[{"code":"652301","name":"昌吉市"},{"code":"652302","name":"阜康市"},{"code":"652323","name":"呼图壁县"},{"code":"652324","name":"玛纳斯县"},{"code":"652325","name":"奇台县"},{"code":"652327","name":"吉木萨尔县"},{"code":"652328","name":"木垒哈萨克自治县"}]},{"code":"652700","name":"博尔塔拉蒙古自治州","children":[{"code":"652701","name":"博乐市"},{"code":"652702","name":"阿拉山口市"},{"code":"652722","name":"精河县"},{"code":"652723","name":"温泉县"}]},{"code":"652800","name":"巴音郭楞蒙古自治州","children":[{"code":"652801","name":"库尔勒市"},{"code":"652822","name":"轮台县"},{"code":"652823","name":"尉犁县"},{"code":"652824","name":"若羌县"},{"code":"652825","name":"且末县"},{"code":"652826","name":"焉耆回族自治县"},{"code":"652827","name":"和静县"},{"code":"652828","name":"和硕县"},{"code":"652829","name":"博湖县"}]},{"code":"652900","name":"阿克苏地区","children":[{"code":"652901","name":"阿克苏市"},{"code":"652922","name":"温宿县"},{"code":"652923","name":"库车县"},{"code":"652924","name":"沙雅县"},{"code":"652925","name":"新和县"},{"code":"652926","name":"拜城县"},{"code":"652927","name":"乌什县"},{"code":"652928","name":"阿瓦提县"},{"code":"652929","name":"柯坪县"}]},{"code":"653000","name":"克孜勒苏柯尔克孜自治州","children":[{"code":"653001","name":"阿图什市"},{"code":"653022","name":"阿克陶县"},{"code":"653023","name":"阿合奇县"},{"code":"653024","name":"乌恰县"}]},{"code":"653100","name":"喀什地区","children":[{"code":"653101","name":"喀什市"},{"code":"653121","name":"疏附县"},{"code":"653122","name":"疏勒县"},{"code":"653123","name":"英吉沙县"},{"code":"653124","name":"泽普县"},{"code":"653125","name":"莎车县"},{"code":"653126","name":"叶城县"},{"code":"653127","name":"麦盖提县"},{"code":"653128","name":"岳普湖县"},{"code":"653129","name":"伽师县"},{"code":"653130","name":"巴楚县"},{"code":"653131","name":"塔什库尔干塔吉克自治县"}]},{"code":"653200","name":"和田地区","children":[{"code":"653201","name":"和田市"},{"code":"653221","name":"和田县"},{"code":"653222","name":"墨玉县"},{"code":"653223","name":"皮山县"},{"code":"653224","name":"洛浦县"},{"code":"653225","name":"策勒县"},{"code":"653226","name":"于田县"},{"code":"653227","name":"民丰县"}]},{"code":"654000","name":"伊犁哈萨克自治州","children":[{"code":"654002","name":"伊宁市"},{"code":"654003","name":"奎屯市"},{"code":"654021","name":"伊宁县"},{"code":"654022","name":"察布查尔锡伯自治县"},{"code":"654023","name":"霍城县"},{"code":"654024","name":"巩留县"},{"code":"654025","name":"新源县"},{"code":"654026","name":"昭苏县"},{"code":"654027","name":"特克斯县"},{"code":"654028","name":"尼勒克县"}]},{"code":"654200","name":"塔城地区","children":[{"code":"654201","name":"塔城市"},{"code":"654202","name":"乌苏市"},{"code":"654221","name":"额敏县"},{"code":"654223","name":"沙湾县"},{"code":"654224","name":"托里县"},{"code":"654225","name":"裕民县"},{"code":"654226","name":"和布克赛尔蒙古自治县"}]},{"code":"654300","name":"阿勒泰地区","children":[{"code":"654301","name":"阿勒泰市"},{"code":"654321","name":"布尔津县"},{"code":"654322","name":"富蕴县"},{"code":"654323","name":"福海县"},{"code":"654324","name":"哈巴河县"},{"code":"654325","name":"青河县"},{"code":"654326","name":"吉木乃县"}]},{"code":"659000","name":"自治区直辖县级行政区划","children":[{"code":"659001","name":"石河子市"},{"code":"659002","name":"阿拉尔市"},{"code":"659003","name":"图木舒克市"},{"code":"659004","name":"五家渠市"}]}]}]

/***/ }),

/***/ 762:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  accountTitle: 'My Profile',
  userId: 'User ID',
  nickname: 'Nickname',
  mobile: 'Mobile phone',
  email: 'Email',
  residentInfo: 'Resident info',
  logout: 'Logout',
  notBound: 'Not set',
  bind: 'Set',
  update: 'Update',
  notAuthenticated: 'Not set',
  fetchVeiryCode: 'Send code',
  cooldownText: 'Resend({timer}s)',

  hint: {
    currentBoundMobile: 'Hint: Your current mobile number is \'{mobile}\'',
    currentBoundEmail: 'Hint: Your current email is \'{email}\'',
    currentNickName: 'Hint: Your current nickname is \'{nickname}\''
  },

  placeholder: {
    inputMobileNumber: 'Mobile number',
    inputVerifyCode: 'Verify code',
    inputEmail: 'Email address',
    inputPassword: 'Password',
    inputNickname: 'New nickname',
    inputResidentName: 'Resident name',
    inputResidentId: 'Social security number'
  },

  messages: {
    mobileBindSuccess: 'Mobile {mobile} is bound to your account',
    emailBindSuccess: 'Email {email} is bound to your account',
    nicknameUpdated: 'Your nickname has been updated',
    residentInfoUpdated: 'Resident info updated'
  }
});

/***/ }),

/***/ 763:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  title: '客服',
  commonIssues: {
    title: '常见问题',
    searchPlaceHolder: '请输入问题关键词',
    btnTitle: '搜索问题'
  },
  contactService: {
    title: '联系客服',
    hotline: '客服热线',
    weChat: '微信公众号',
    officialHomePage: '官方主页',
    officialForum: '官方论坛',
    officialPostBar: '官方贴吧',
    officialMicroBlog: '官方微博',
    addSuccess: '提交成功'
  },
  myService: {
    title: '服务记录',
    noReply: '未回复',
    alreadyReply: '已回复'
  },
  searchBtn: '搜索问题',
  searchPlaceHolder: '请输入问题关键词',
  issueTitle: '问题：{title}',
  reply: '回复 :',
  contactPlaceHolder: '请输入您的问题或建议',
  submitBtn: '提交'
});

/***/ }),

/***/ 764:
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

/***/ 765:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  title: '活动',

  tab: {
    activity: '游戏活动',
    notice: '游戏公告',
    news: '官方新闻'
  },

  buttons: {
    back: '返回'
  }

});

/***/ }),

/***/ 766:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__account__ = __webpack_require__(762);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__customerService__ = __webpack_require__(763);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__forum__ = __webpack_require__(764);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__payment__ = __webpack_require__(768);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__games__ = __webpack_require__(765);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_i18n_en_upload__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_common_i18n_en_common__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_common_i18n_en_error__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mall__ = __webpack_require__(767);










/* harmony default export */ __webpack_exports__["a"] = ({
  account: __WEBPACK_IMPORTED_MODULE_0__account__["a" /* default */], customerService: __WEBPACK_IMPORTED_MODULE_1__customerService__["a" /* default */], forum: __WEBPACK_IMPORTED_MODULE_2__forum__["a" /* default */], payment: __WEBPACK_IMPORTED_MODULE_3__payment__["a" /* default */], games: __WEBPACK_IMPORTED_MODULE_4__games__["a" /* default */], upload: __WEBPACK_IMPORTED_MODULE_5_common_i18n_en_upload__["a" /* default */], common: __WEBPACK_IMPORTED_MODULE_6_common_i18n_en_common__["a" /* default */], mall: __WEBPACK_IMPORTED_MODULE_8__mall__["a" /* default */], error: __WEBPACK_IMPORTED_MODULE_7_common_i18n_en_error__["a" /* default */]
});

/***/ }),

/***/ 767:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  goods: {
    description: '商品详情',
    price: '单价',
    postage: '邮费',
    stock: '库存',
    buyNow: '立即购买',
    soldOut: '已售罄'
  },
  order: {
    addressPlaceholder: '请填写收货地址',
    stockOut: '该商品已售罄',
    totalPrice: '合计：{price}（含邮费 {postage}）',
    addSuccess: '订单添加成功',
    snapshotsPlaceholder: '当前页面内容为订单快照，包含订单创建时的商品描述和下单信息，在发生交易争议时，该页面作为判定依据。',
    messages: {
      illegal: '非法操作',
      repeatRecieved: '请勿重复确认收货',
      recievedSuccess: '确认收货成功'
    },
    buttons: {
      wechatPay: '微信支付 ',
      aliPay: '支付宝',
      reciept: '确认收货',
      reOrder: '再来一单'
    },
    fields: {
      id: '订单号',
      postage: '邮费',
      with_postage: '含邮费',
      total: '合计',
      status: '订单状态',
      inserted_at: '下单时间',
      email: '用户帐号',
      paid_type: {
        label: '支付渠道',
        wechat: '微信'
      },
      transaction_id: '支付单号',
      address: {
        name: '姓名',
        mobile: '电话',
        address: '地址'
      }
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
  mine: {
    myOrder: {
      tabs: {
        all: '全部',
        waitPay: '待付款',
        waitConfirm: '待收货'
      }
    }
  },
  titles: {
    goodsDetail: '商品详情',
    mallOrder: '订单详情',
    mine: '我的',
    myOrders: '我的订单',
    myOrderDetail: '订单详情',
    myAddresses: '我的地址',
    editAddress: '编辑地址',
    newAddress: '添加地址',
    selectAddress: '选择地址',
    goodsSnapshots: '交易快照'
  },
  address: {
    add: '添加地址',
    deleteSuccess: '地址删除成功',
    setDefault: '设为默认',
    setDefaultSuccess: '设置默认地址成功',
    addSuccess: '地址添加成功',
    updateSuccess: '地址更新成功',
    namePlaceholder: '请输入您的大名',
    mobilePlaceholder: '请输入您的手机号码',
    areaPlaceholder: '请选择您所在的地区',
    addressPlaceholder: '请输入您的地址',
    fields: {
      name: '姓名',
      mobile: '手机',
      address: '地址',
      area: '地区',
      is_default: '默认地址'
    }
  }
});

/***/ }),

/***/ 768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  paymentTitle: '购买商品',
  orderDetail: '商品详情',
  orderPrice: '商品价格',
  selectPaymentChannel: '请选择充值方式:',
  channel: {
    alipay: '支付宝',
    wechat: '微信支付',
    ggplay: '谷歌市场'
  },
  slogan: {
    alipay: '网页支付',
    wechat: '亿万用户的选择，更快更安全',
    ggplay: ''
  },
  buyNow: '立即支付'
});

/***/ }),

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  accountTitle: '个人中心',
  userId: '用户ID',
  nickname: '昵称',
  mobile: '绑定手机',
  email: '绑定邮箱',
  residentInfo: '实名认证',
  logout: '退出登录',
  notBound: '未绑定',
  bind: '绑定',
  update: '修改',
  notAuthenticated: '未认证',
  fetchVeiryCode: '获取验证码',
  cooldownText: '重新发送({timer}s)',

  hint: {
    currentBoundMobile: '提示: 您当前已绑定手机"{mobile}"',
    currentBoundEmail: '提示: 您当前已绑定邮箱"{email}"',
    currentNickName: '提示: 您当前的昵称为"{nickname}"'
  },

  placeholder: {
    inputMobileNumber: '请输入手机号码',
    inputVerifyCode: '请输入验证码',
    inputEmail: '请输入邮箱地址',
    inputPassword: '请输入密码',
    inputNickname: '请输入新的昵称',
    inputResidentName: '请输入您的真实姓名',
    inputResidentId: '请输入您的身份证号码'
  },

  messages: {
    mobileBindSuccess: '已绑定手机{mobile}',
    emailBindSuccess: '已绑定邮箱{email}',
    nicknameUpdated: '昵称已成功修改',
    residentInfoUpdated: '实名制信息已成功更新'
  },

  error: {
    userIdCheckFail: '用户信息中含有敏感词汇，请修改后重新提交',
    nickNameError: '用户昵称只允许【中文/数字/字母/下划线】'
  }
});

/***/ }),

/***/ 770:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  title: '客服',
  commonIssues: {
    title: '常见问题',
    searchPlaceHolder: '请输入问题关键词',
    btnTitle: '搜索问题'
  },
  contactService: {
    title: '联系客服',
    hotline: '客服热线',
    weChat: '微信公众号',
    officialHomePage: '官方主页',
    officialForum: '官方论坛',
    officialPostBar: '官方贴吧',
    officialMicroBlog: '官方微博',
    addSuccess: '提交成功'
  },
  myService: {
    title: '服务记录',
    noReply: '未回复',
    alreadyReply: '已回复'
  },
  searchBtn: '搜索问题',
  searchPlaceHolder: '请输入问题关键词',
  issueTitle: '问题：{title}',
  reply: '回复 :',
  contactPlaceHolder: '请输入您的问题或建议',
  submitBtn: '提交'
});

/***/ }),

/***/ 771:
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

/***/ 772:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  title: '活动',

  tab: {
    activity: '游戏活动',
    notice: '游戏公告',
    news: '官方新闻'
  },

  buttons: {
    back: '返回'
  }

});

/***/ }),

/***/ 773:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__account__ = __webpack_require__(769);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__customerService__ = __webpack_require__(770);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__forum__ = __webpack_require__(771);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__payment__ = __webpack_require__(775);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__games__ = __webpack_require__(772);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_i18n_zh_hans_upload__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_common_i18n_zh_hans_common__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_common_i18n_zh_hans_error__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mall__ = __webpack_require__(774);










/* harmony default export */ __webpack_exports__["a"] = ({
  account: __WEBPACK_IMPORTED_MODULE_0__account__["a" /* default */], customerService: __WEBPACK_IMPORTED_MODULE_1__customerService__["a" /* default */], forum: __WEBPACK_IMPORTED_MODULE_2__forum__["a" /* default */], payment: __WEBPACK_IMPORTED_MODULE_3__payment__["a" /* default */], games: __WEBPACK_IMPORTED_MODULE_4__games__["a" /* default */], upload: __WEBPACK_IMPORTED_MODULE_5_common_i18n_zh_hans_upload__["a" /* default */], common: __WEBPACK_IMPORTED_MODULE_6_common_i18n_zh_hans_common__["a" /* default */], mall: __WEBPACK_IMPORTED_MODULE_8__mall__["a" /* default */], error: __WEBPACK_IMPORTED_MODULE_7_common_i18n_zh_hans_error__["a" /* default */]
});

/***/ }),

/***/ 774:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  goods: {
    description: '商品详情',
    price: '单价',
    postage: '邮费',
    stock: '库存',
    buyNow: '立即购买',
    soldOut: '已售罄'
  },
  order: {
    addressPlaceholder: '请填写收货地址',
    stockOut: '该商品已售罄',
    totalPrice: '合计：{price}（含邮费 {postage}）',
    addSuccess: '订单添加成功',
    snapshotsPlaceholder: '当前页面内容为订单快照，包含订单创建时的商品描述和下单信息，在发生交易争议时，该页面作为判定依据。',
    messages: {
      illegal: '非法操作',
      repeatRecieved: '请勿重复确认收货',
      recievedSuccess: '确认收货成功'
    },
    buttons: {
      wechatPay: '微信支付 ',
      aliPay: '支付宝',
      reciept: '确认收货',
      reOrder: '再来一单'
    },
    fields: {
      id: '订单号',
      postage: '邮费',
      with_postage: '含邮费',
      total: '合计',
      status: '订单状态',
      inserted_at: '下单时间',
      email: '用户帐号',
      paid_type: {
        label: '支付渠道',
        wechat: '微信'
      },
      transaction_id: '支付单号',
      address: {
        name: '姓名',
        mobile: '电话',
        address: '地址'
      }
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
  mine: {
    myOrder: {
      tabs: {
        all: '全部',
        waitPay: '待付款',
        waitConfirm: '待收货'
      }
    }
  },
  titles: {
    goodsDetail: '商品详情',
    mallOrder: '订单详情',
    mine: '我的',
    myOrders: '我的订单',
    myOrderDetail: '订单详情',
    myAddresses: '我的地址',
    editAddress: '编辑地址',
    newAddress: '添加地址',
    selectAddress: '选择地址',
    goodsSnapshots: '交易快照'
  },
  address: {
    add: '添加地址',
    deleteSuccess: '地址删除成功',
    setDefault: '设为默认',
    setDefaultSuccess: '设置默认地址成功',
    addSuccess: '地址添加成功',
    updateSuccess: '地址更新成功',
    namePlaceholder: '请输入您的大名',
    mobilePlaceholder: '请输入您的手机号码',
    areaPlaceholder: '请选择您所在的地区',
    addressPlaceholder: '请输入您的地址',
    fields: {
      name: '姓名',
      mobile: '手机',
      address: '地址',
      area: '地区',
      is_default: '默认地址'
    }
  }
});

/***/ }),

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  paymentTitle: '购买商品',
  orderDetail: '商品详情',
  orderPrice: '商品价格',
  selectPaymentChannel: '请选择充值方式:',
  channel: {
    alipay: '支付宝',
    wechat: '微信支付',
    ggplay: '谷歌市场'
  },
  slogan: {
    alipay: '网页支付',
    wechat: '亿万用户的选择，更快更安全',
    ggplay: ''
  },
  buyNow: '立即支付'
});

/***/ }),

/***/ 776:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  accountTitle: '個人中心',
  userId: '用戶ID',
  nickname: '暱稱',
  mobile: '綁定手機',
  email: '綁定郵箱',
  residentInfo: '實名認證',
  logout: '退出登錄',
  notBound: '未綁定',
  bind: '綁定',
  update: '修改',
  notAuthenticated: '未認證',
  fetchVeiryCode: '獲取驗證碼',
  cooldownText: '重新發送({timer}s)',

  hint: {
    currentBoundMobile: '提示: 您當前已綁定手機"{mobile}"',
    currentBoundEmail: '提示: 您當前已綁定郵箱"{email}"',
    currentNickName: '提示: 您當前的暱稱為"{nickname}"'
  },

  placeholder: {
    inputMobileNumber: '請輸入手機號碼',
    inputVerifyCode: '請輸入驗證碼',
    inputEmail: '請輸入郵箱地址',
    inputPassword: '請輸入密碼',
    inputNickname: '請輸入新的暱稱',
    inputResidentName: '請輸入您的真實姓名',
    inputResidentId: '請輸入您的身份證號碼'
  },

  messages: {
    mobileBindSuccess: '已綁定手機{mobile}',
    emailBindSuccess: '已綁定郵箱{email}',
    nicknameUpdated: '暱稱已成功修改',
    residentInfoUpdated: '實名制信息已成功更新'
  }
});

/***/ }),

/***/ 777:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  title: '客服',
  commonIssues: {
    title: '常見問題',
    searchPlaceHolder: '請輸入問題關鍵詞',
    btnTitle: '搜索問題'
  },
  contactService: {
    title: '聯繫客服',
    hotline: '客服熱線',
    weChat: '微信公眾號',
    officialHomePage: '官方主頁',
    officialForum: '官方論壇',
    officialPostBar: '官方貼吧',
    officialMicroBlog: '官方微博',
    addSuccess: '提交成功'
  },
  myService: {
    title: '服務記錄',
    noReply: '未回复',
    alreadyReply: '已回复'
  },
  searchBtn: '搜索問題',
  searchPlaceHolder: '請輸入問題關鍵詞',
  issueTitle: '問題：{title}',
  reply: '回复 :',
  contactPlaceHolder: '請輸入您的問題或建議',
  submitBtn: '提交'
});

/***/ }),

/***/ 778:
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

/***/ 779:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  title: '活動',

  tab: {
    activity: '遊戲活動',
    notice: '遊戲公告',
    news: '官方新聞'
  },

  buttons: {
    back: '返回'
  }

});

/***/ }),

/***/ 780:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__account__ = __webpack_require__(776);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__customerService__ = __webpack_require__(777);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__forum__ = __webpack_require__(778);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__payment__ = __webpack_require__(782);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__games__ = __webpack_require__(779);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_i18n_zh_hant_upload__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_common_i18n_zh_hant_common__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_common_i18n_zh_hant_error__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mall__ = __webpack_require__(781);










/* harmony default export */ __webpack_exports__["a"] = ({
  account: __WEBPACK_IMPORTED_MODULE_0__account__["a" /* default */], customerService: __WEBPACK_IMPORTED_MODULE_1__customerService__["a" /* default */], forum: __WEBPACK_IMPORTED_MODULE_2__forum__["a" /* default */], payment: __WEBPACK_IMPORTED_MODULE_3__payment__["a" /* default */], games: __WEBPACK_IMPORTED_MODULE_4__games__["a" /* default */], upload: __WEBPACK_IMPORTED_MODULE_5_common_i18n_zh_hant_upload__["a" /* default */], common: __WEBPACK_IMPORTED_MODULE_6_common_i18n_zh_hant_common__["a" /* default */], mall: __WEBPACK_IMPORTED_MODULE_8__mall__["a" /* default */], error: __WEBPACK_IMPORTED_MODULE_7_common_i18n_zh_hant_error__["a" /* default */]
});

/***/ }),

/***/ 781:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  goods: {
    description: '商品詳情',
    price: '單價',
    postage: '郵費',
    stock: '庫存',
    buyNow: '立即購買',
    soldOut: '已售罄'
  },
  order: {
    addressPlaceholder: '請填寫收貨地址',
    stockOut: '該商品已售罄',
    totalPrice: '合計：{price}（含郵費 {postage}）',
    addSuccess: '訂單添加成功',
    snapshotsPlaceholder: '當前頁面內容爲訂單快照，包含訂單創建時的商品描述和下單信息，在發生交易爭議時，該頁面作爲判定依據。',
    messages: {
      illegal: '非法操作',
      repeatRecieved: '請勿重複確認收貨',
      recievedSuccess: '確認收貨成功'
    },
    buttons: {
      wechatPay: '微信支付 ',
      aliPay: '支付寶',
      reciept: '確認收貨',
      reOrder: '再來壹單'
    },
    fields: {
      id: '訂單號',
      postage: '郵費',
      with_postage: '含郵費',
      total: '合計',
      status: '訂單狀態',
      inserted_at: '下單時間',
      email: '用戶帳號',
      paid_type: {
        label: '支付渠道',
        wechat: '微信'
      },
      transaction_id: '支付單號',
      address: {
        name: '姓名',
        mobile: '電話',
        address: '地址'
      }
    },
    status: {
      '-3': '已退款',
      '-2': '已退貨',
      '-1': '已關閉',
      '0': '待支付',
      '1': '已支付',
      '2': '待收貨',
      '3': '待確認',
      '4': '已完成'
    }
  },
  mine: {
    myOrder: {
      tabs: {
        all: '全部',
        waitPay: '待付款',
        waitConfirm: '待收貨'
      }
    }
  },
  titles: {
    goodsDetail: '商品詳情',
    mallOrder: '訂單詳情',
    mine: '我的',
    myOrders: '我的訂單',
    myOrderDetail: '訂單詳情',
    myAddresses: '我的地址',
    editAddress: '編輯地址',
    newAddress: '添加地址',
    selectAddress: '選擇地址',
    goodsSnapshots: '交易快照'
  },
  address: {
    add: '添加地址',
    deleteSuccess: '地址刪除成功',
    setDefault: '設為默認',
    setDefaultSuccess: '設置默認地址成功',
    addSuccess: '地址添加成功',
    updateSuccess: '地址更新成功',
    namePlaceholder: '請輸入您的大名',
    mobilePlaceholder: '請輸入您的手機號碼',
    areaPlaceholder: '請選擇您所在的地區',
    addressPlaceholder: '請輸入您的地址',
    fields: {
      name: '姓名',
      mobile: '手機',
      address: '地址',
      area: '地區',
      is_default: '默認地址'
    }
  }
});

/***/ }),

/***/ 782:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  paymentTitle: '購買商品',
  orderDetail: '商品詳情',
  orderPrice: '商品價格',
  selectPaymentChannel: '請選擇充值方式:',
  channel: {
    alipay: '支付寶',
    wechat: '微信支付',
    ggplay: '谷歌市場'
  },
  slogan: {
    alipay: '網頁支付',
    wechat: '億萬用戶的選擇，更快更安全',
    ggplay: ''
  },
  buyNow: '立即支付'
});

/***/ }),

/***/ 783:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ([{
  path: '/account',
  component: __webpack_require__(1289),
  children: [{
    path: 'my_profile',
    name: 'MyProfile',
    component: __webpack_require__(1290)
  }, {
    path: 'edit_nickname',
    component: __webpack_require__(1287)
  }, {
    path: 'edit_mobile',
    component: __webpack_require__(1286)
  }, {
    path: 'edit_email',
    component: __webpack_require__(1285)
  }, {
    path: 'edit_resident',
    component: __webpack_require__(1288)
  }]
}]);

/***/ }),

/***/ 784:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ([{
  path: '/bbs/error',
  name: 'error',
  component: __webpack_require__(1291)
}, {
  path: '/bbs/index',
  name: 'bbsList',
  component: __webpack_require__(1292)
}, {
  path: '/bbs/:forumId',
  name: 'bbs',
  component: __webpack_require__(1293),
  children: [{
    path: 'index',
    name: 'postList',
    component: __webpack_require__(1298)
  }, {
    path: 'search',
    name: 'search',
    component: __webpack_require__(1300)
  }, {
    path: 'detail/:postId',
    name: 'detail',
    component: __webpack_require__(1297)
  }, {
    path: 'comment/:postId',
    name: 'newComment',
    component: __webpack_require__(1294)
  }, {
    path: 'newPost',
    name: 'newPost',
    component: __webpack_require__(1295)
  }, {
    path: 'preview',
    name: 'preview',
    component: __webpack_require__(1299)
  }, {
    path: 'personalPage',
    name: 'personalPage',
    component: __webpack_require__(1296)
  }]
}]);

/***/ }),

/***/ 785:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ([{
  path: '/customerService/:appId',
  name: 'customerService',
  component: __webpack_require__(1303),
  children: [{
    path: 'index',
    name: 'commonIssues',
    component: __webpack_require__(1301)
  }, {
    path: 'contactService',
    name: 'contactService',
    component: __webpack_require__(1302)
  }, {
    path: 'myService',
    name: 'myService',
    component: __webpack_require__(1304)
  }]
}]);

/***/ }),

/***/ 786:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ([{
  path: '/games/error',
  name: 'gamesError',
  component: __webpack_require__(1305)
}, {
  path: '/games/list',
  name: 'gamesList',
  component: __webpack_require__(1309)
}, {
  path: '/games/:app_id',
  name: 'gamesIndex',
  component: __webpack_require__(1310),
  children: [{
    path: 'activity',
    name: 'gameActivity',
    component: __webpack_require__(1306)
  }, {
    path: 'activity/:newsId(\\d+)',
    component: __webpack_require__(697)
  }, {
    path: 'notice',
    name: 'gameNotice',
    component: __webpack_require__(1308)
  }, {
    path: 'news',
    name: 'gameNews',
    component: __webpack_require__(1307)
  }, {
    path: 'news/:newsId(\\d+)',
    component: __webpack_require__(697)
  }, {
    path: '*',
    redirect: 'activity'
  }]
}]);

/***/ }),

/***/ 787:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bbs__ = __webpack_require__(784);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__payment__ = __webpack_require__(789);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__customerService__ = __webpack_require__(785);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__account__ = __webpack_require__(783);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__games__ = __webpack_require__(786);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mall__ = __webpack_require__(788);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }








/* harmony default export */ __webpack_exports__["a"] = (function (VueRouter) {
  return new VueRouter({
    mode: 'history',
    routes: [].concat(_toConsumableArray(__WEBPACK_IMPORTED_MODULE_0__bbs__["a" /* default */]), _toConsumableArray(__WEBPACK_IMPORTED_MODULE_2__customerService__["a" /* default */]), _toConsumableArray(__WEBPACK_IMPORTED_MODULE_4__games__["a" /* default */]), _toConsumableArray(__WEBPACK_IMPORTED_MODULE_3__account__["a" /* default */]), _toConsumableArray(__WEBPACK_IMPORTED_MODULE_1__payment__["a" /* default */]), _toConsumableArray(__WEBPACK_IMPORTED_MODULE_5__mall__["a" /* default */]))
  });
});

/***/ }),

/***/ 788:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ([{
  path: '/mall/:appId',
  name: 'mall',
  component: __webpack_require__(1315),
  children: [{
    path: 'index',
    name: 'goodsIndex',
    component: __webpack_require__(1313)
  }, {
    path: 'order',
    name: 'mallOrder',
    component: __webpack_require__(1320)
  }, {
    path: 'mine',
    name: 'mine',
    component: __webpack_require__(1316)
  }, {
    path: 'mine/myOrders',
    name: 'myOrders',
    component: __webpack_require__(1318)
  }, {
    path: 'mine/orderDetail/:orderId',
    name: 'myOrderDetail',
    component: __webpack_require__(1321)
  }, {
    path: 'mine/myAddresses',
    name: 'myAddresses',
    component: __webpack_require__(1317)
  }, {
    path: 'goods/:goodsId',
    name: 'goodsDetail',
    component: __webpack_require__(1312)
  }, {
    path: 'address/new',
    name: 'newAddress',
    component: __webpack_require__(1319)
  }, {
    path: 'selectAddress',
    name: 'selectAddress',
    component: __webpack_require__(1322)
  }, {
    path: 'address/edit/:addressId',
    name: 'editAddress',
    component: __webpack_require__(1311)
  }, {
    path: 'order/goodsSnapshots/:goods',
    name: 'goodsSnapshots',
    component: __webpack_require__(1314)
  }]
}]);

/***/ }),

/***/ 789:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ([{
  path: '/payment',
  component: __webpack_require__(1323),
  children: [{
    path: 'pay_proxy',
    name: 'payProxy',
    component: __webpack_require__(1324)
  }]
}]);

/***/ }),

/***/ 790:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_components_toast__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_i18n__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(81);
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
        return post('/games_actions/list_thin_apps', {});
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
        return post('/mall_actions/get_mall_goods_detail', {
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
      getMallOrder: function getMallOrder(params) {
        return post('/mall_actions/get_mall_order', params);
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

/***/ 791:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_utils__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mutationTypes__ = __webpack_require__(402);




var setCurrentSectionId = function setCurrentSectionId(_ref, sectionId) {
  var commit = _ref.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["e" /* SET_CURRENT_SECTION_ID */], sectionId);
};

var setCurrentPostTitle = function setCurrentPostTitle(_ref2, title) {
  var commit = _ref2.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["f" /* SET_CURRENT_POST_TITLE */], title);
};

var setPostsOrderByField = function setPostsOrderByField(_ref3, fieldName) {
  var commit = _ref3.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["g" /* SET_POSTS_ORDER_BY_FIELD */], fieldName);
};

var addSearchHistory = function addSearchHistory(_ref4, key) {
  var commit = _ref4.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["s" /* ADD_SEARCH_HISTORY */], key);
};

var resetPostEditingData = function resetPostEditingData(_ref5) {
  var commit = _ref5.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["i" /* RESET_POST_EDITING_DATA */]);
};

var clearSearchHistory = function clearSearchHistory(_ref6, key) {
  var commit = _ref6.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["t" /* CLEAR_SEARCH_HISTORY */], key);
};

var setUserProfile = function setUserProfile(_ref7, user) {
  var commit = _ref7.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["k" /* SET_USER_PROFILE */], user);
};

var updateUserMobile = function updateUserMobile(_ref8, mobile) {
  var commit = _ref8.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["l" /* UPDATE_USER_MOBILE */], mobile);
};

var updateUserEmail = function updateUserEmail(_ref9, email) {
  var commit = _ref9.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["m" /* UPDATE_USER_EMAIL */], email);
};

var updateUserNickname = function updateUserNickname(_ref10, nickname) {
  var commit = _ref10.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["n" /* UPDATE_USER_NICKNAME */], nickname);
};

var updateUserAvatar = function updateUserAvatar(_ref11, avatar_url) {
  var commit = _ref11.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["o" /* UPDATE_USER_AVATAR */], avatar_url);
};

var updateUserResidentInfo = function updateUserResidentInfo(_ref12, residentInfo) {
  var commit = _ref12.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["p" /* UPDATE_USER_RESIDENT_INFO */], residentInfo);
};

var updateUserPostCount = function updateUserPostCount(_ref13, postCount) {
  var commit = _ref13.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["q" /* UPDATE_USER_POST_COUNT */], postCount);
};

var decrUserPostCount = function decrUserPostCount(_ref14) {
  var commit = _ref14.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["r" /* DECR_USER_POST_COUNT */]);
};

var setCommonIssues = function setCommonIssues(_ref15, issues) {
  var commit = _ref15.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["j" /* SET_COMMON_ISSUES */], issues);
};

var updateForumInfo = function updateForumInfo(_ref16, forum) {
  var commit = _ref16.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["h" /* UPDATE_FORUM_INFO */], forum);
};

var updateShoppingCart = function updateShoppingCart(_ref17, goodsItem) {
  var commit = _ref17.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["a" /* UPDATE_MALL_SHOPPINGCART */], goodsItem);
};

var updateSelectedAddress = function updateSelectedAddress(_ref18, userAddress) {
  var commit = _ref18.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["b" /* UPDATE_SELECTED_ADDRESS */], userAddress);
};
var updateSelectedGoods = function updateSelectedGoods(_ref19, goods) {
  var commit = _ref19.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["c" /* UPDATE_SELECTED_GOODS */], goods);
};
var updateSelectedOrder = function updateSelectedOrder(_ref20, order) {
  var commit = _ref20.commit;

  commit(__WEBPACK_IMPORTED_MODULE_2__mutationTypes__["d" /* UPDATE_SELECTED_ORDER */], order);
};

/***/ }),

/***/ 792:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
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

/***/ 793:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions__ = __webpack_require__(791);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__getters__ = __webpack_require__(792);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_app__ = __webpack_require__(794);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_search__ = __webpack_require__(798);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_user__ = __webpack_require__(799);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_forum__ = __webpack_require__(796);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_commonIssue__ = __webpack_require__(795);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_mall__ = __webpack_require__(797);













__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* default */]);

var store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["c" /* default */].Store({
  strict: false,
  actions: __WEBPACK_IMPORTED_MODULE_2__actions__,
  getters: __WEBPACK_IMPORTED_MODULE_3__getters__,
  modules: {
    app: __WEBPACK_IMPORTED_MODULE_4__modules_app__["a" /* default */],
    search: __WEBPACK_IMPORTED_MODULE_5__modules_search__["a" /* default */],
    user: __WEBPACK_IMPORTED_MODULE_6__modules_user__["a" /* default */],
    commonIssues: __WEBPACK_IMPORTED_MODULE_8__modules_commonIssue__["a" /* default */],
    forum: __WEBPACK_IMPORTED_MODULE_7__modules_forum__["a" /* default */],
    mall: __WEBPACK_IMPORTED_MODULE_9__modules_mall__["a" /* default */]
  },
  mutations: {}
});

/* harmony default export */ __webpack_exports__["a"] = (store);

/***/ }),

/***/ 794:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutationTypes__ = __webpack_require__(402);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = {
  transitionName: 'slide-left'
};

var mutations = _defineProperty({}, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["u" /* SET_TRANSITION_NAME */], function (state, transitionName) {
  state.transitionName = transitionName;
});

/* harmony default export */ __webpack_exports__["a"] = ({
  state: state,
  mutations: mutations
});

/***/ }),

/***/ 795:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutationTypes__ = __webpack_require__(402);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = {
  issues: ['闪退1', '闪退2']
};

var mutations = _defineProperty({}, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["j" /* SET_COMMON_ISSUES */], function (state, issues) {
  state = issues;
});

/* harmony default export */ __webpack_exports__["a"] = ({
  state: state,
  mutations: mutations
});

/***/ }),

/***/ 796:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutationTypes__ = __webpack_require__(402);
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

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["e" /* SET_CURRENT_SECTION_ID */], function (state, sectionId) {
  state.currentSectionId = sectionId;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["f" /* SET_CURRENT_POST_TITLE */], function (state, title) {
  state.currentPostTitle = title;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["g" /* SET_POSTS_ORDER_BY_FIELD */], function (state, fieldName) {
  state.postsOrderByField = fieldName;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["h" /* UPDATE_FORUM_INFO */], function (state, forum) {
  state.info = forum;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["i" /* RESET_POST_EDITING_DATA */], function (state) {
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

/***/ 797:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutationTypes__ = __webpack_require__(402);
var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = {
  shoppingCart: {
    goodsId: "",
    quantity: 0
  },

  selectedAddress: {
    id: 0,
    name: "",
    mobile: "",
    area: "",
    address: "",
    area_code: ""
  },
  selectedGoods: {
    id: 0,
    name: "",
    description: "",
    price: 0,
    currency: "",
    postage: 0,
    stock: 0
  },
  selectedOrder: {
    id: "",
    price: 0,
    postage: 0,
    final_price: 0,
    currency: "",
    status: 0,
    address: {},
    details: [],
    inserted_at: "",
    snapshots: []
  }
};

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["a" /* UPDATE_MALL_SHOPPINGCART */], function (state, goodsItem) {
  if (goodsItem) {
    state.shoppingCart.goodsId = goodsItem.goodsId;
    state.shoppingCart.quantity = goodsItem.quantity;
  }
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["b" /* UPDATE_SELECTED_ADDRESS */], function (state, addressItem) {
  if (addressItem) {
    state.selectedAddress = addressItem;
  }
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["c" /* UPDATE_SELECTED_GOODS */], function (state, goodsItem) {
  if (goodsItem) {
    state.selectedGoods = goodsItem;
  }
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["d" /* UPDATE_SELECTED_ORDER */], function (state, orderItem) {
  if (orderItem) {
    state.selectedOrder = orderItem;
  }
}), _mutations);

/* harmony default export */ __webpack_exports__["a"] = ({
  state: state,
  mutations: mutations
});

/***/ }),

/***/ 798:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutationTypes__ = __webpack_require__(402);
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

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["s" /* ADD_SEARCH_HISTORY */], function (state, keyword) {
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
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["t" /* CLEAR_SEARCH_HISTORY */], function (state) {
  state.historyKeywords = [];
  localStorage.removeItem(storage_search_history);
}), _mutations);

/* harmony default export */ __webpack_exports__["a"] = ({
  state: state,
  mutations: mutations
});

/***/ }),

/***/ 799:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutationTypes__ = __webpack_require__(402);
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

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["k" /* SET_USER_PROFILE */], function (state, user) {
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
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["l" /* UPDATE_USER_MOBILE */], function (state, mobile) {
  state.mobile = mobile;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["m" /* UPDATE_USER_EMAIL */], function (state, email) {
  state.email = email;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["n" /* UPDATE_USER_NICKNAME */], function (state, nickname) {
  state.nickname = nickname;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["o" /* UPDATE_USER_AVATAR */], function (state, avatar_url) {
  state.avatar_url = avatar_url;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["p" /* UPDATE_USER_RESIDENT_INFO */], function (state, residentInfo) {
  state.resident_id = residentInfo.resident_id;
  state.resident_name = residentInfo.resident_name;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["q" /* UPDATE_USER_POST_COUNT */], function (state, post_count) {
  state.post_count = post_count;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutationTypes__["r" /* DECR_USER_POST_COUNT */], function (state) {
  state.post_count = state.post_count - 1;
}), _mutations);

/* harmony default export */ __webpack_exports__["a"] = ({
  state: state,
  mutations: mutations
});

/***/ }),

/***/ 908:
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

/***/ 909:
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

/***/ 910:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_components_alertDialog__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_toast__ = __webpack_require__(51);
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
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_) {
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

/***/ 911:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_components_alertDialog__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_toast__ = __webpack_require__(51);
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
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_) {
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
          var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_) {
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

/***/ 912:
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
    itemData: {
      type: Object,
      default: null
    }
  }
});

/***/ }),

/***/ 913:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_filters__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
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
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    order: {
      type: Object,
      default: null
    }
  },
  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['updateSelectedOrder']), {
    viewOrderDetail: function viewOrderDetail(order) {
      var orderItem = {};
      orderItem.id = order.id;
      orderItem.snapshots = order.snapshots;
      orderItem.price = order.price;
      orderItem.final_price = order.final_price;
      orderItem.currency = order.currency;
      orderItem.status = order.status;
      orderItem.postage = order.postage;
      orderItem.inserted_at = order.inserted_at;
      orderItem.address = order.address;
      orderItem.details = order.details;

      this.updateSelectedOrder(orderItem);
      this.$router.push({
        name: 'myOrderDetail',
        params: {
          orderId: order.id
        }
      });
    }
  })

});

/***/ }),

/***/ 914:
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

/***/ 915:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_alertDialog__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_components_toast__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_filters__ = __webpack_require__(59);
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
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_) {
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

/***/ 916:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_toast__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_acs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_filters__ = __webpack_require__(59);
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
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_) {
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(params, pos) {
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

/***/ 917:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_filters__ = __webpack_require__(59);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/***/ 918:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_filters__ = __webpack_require__(59);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    question: {
      type: Object,
      default: null
    }
  },
  data: function data() {
    return {
      selectedId: ''
    };
  }
});

/***/ }),

/***/ 919:
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

/***/ 920:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validators__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__formMixin__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_js_utils__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_components_toast__ = __webpack_require__(51);
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













/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      email: '',
      verifyCode: '',
      password: null,
      errorMessage: '',
      showPassword: false,
      sendingVerifyCode: false,
      cooldownCounter: 0,
      processing: false
    };
  },
  validations: function validations() {
    var email = {
      required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
      valid: function valid(val) {
        return __WEBPACK_IMPORTED_MODULE_4_common_js_utils__["h" /* isValidEmail */](val);
      },
      changed: function changed(val) {
        return __WEBPACK_IMPORTED_MODULE_4_common_js_utils__["h" /* isValidEmail */](this.userInfo.email) ? val != this.userInfo.email : true;
      }
    };

    var password = {
      required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
      minLength: __WEBPACK_IMPORTED_MODULE_4_common_js_utils__["e" /* minLength */](6),
      maxLength: __WEBPACK_IMPORTED_MODULE_4_common_js_utils__["f" /* maxLength */](20)
    };
    if (this.userInfo.nil_password) {
      return {
        email: email,
        password: password,
        verifyCode: __WEBPACK_IMPORTED_MODULE_2__validators__["a" /* verifyCode */]
      };
    } else {
      return {
        email: email,
        verifyCode: __WEBPACK_IMPORTED_MODULE_2__validators__["a" /* verifyCode */]
      };
    }
  },
  mounted: function mounted() {},


  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['userInfo']), {
    btnFetchVerifyCodeTitle: function btnFetchVerifyCodeTitle() {
      if (this.cooldownCounter > 0) {
        return this.$t('account.cooldownText', {
          timer: this.cooldownCounter
        });
      } else {
        return this.$t('account.fetchVeiryCode');
      }
    },
    boundEmail: function boundEmail() {
      return this.userInfo.email ? __WEBPACK_IMPORTED_MODULE_4_common_js_utils__["b" /* emailMask */](this.userInfo.email) : '';
    }
  }),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['updateUserEmail']), {

    onSubmit: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.processing) {
                  _context.next = 7;
                  break;
                }

                this.processing = true;
                _context.next = 4;
                return this.$acs.updateUserEmail({
                  email: this.email,
                  verify_code: this.verifyCode,
                  password: this.password
                });

              case 4:
                result = _context.sent;

                if (result.success) {
                  this.updateUserEmail(this.email);
                  window.acsConfig.user.email = this.email;

                  this.$nextTick(function (_) {
                    __WEBPACK_IMPORTED_MODULE_5_common_components_toast__["a" /* default */].show(_this.$t('account.messages.emailBindSuccess', {
                      email: _this.email
                    }));
                    _this.$router.back();
                  });
                } else {
                  this.setErrorMessage(this.$t(result.i18n_message, result.i18n_message_object));
                }
                this.processing = false;

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onSubmit() {
        return _ref.apply(this, arguments);
      }

      return onSubmit;
    }(),

    cooldownTimer: function cooldownTimer() {
      if (this.cooldownCounter > 0) {
        this.cooldownCounter--;
        setTimeout(this.cooldownTimer, 1000);
      }
    },

    sendEmailVerifyCode: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (__WEBPACK_IMPORTED_MODULE_4_common_js_utils__["h" /* isValidEmail */](this.email)) {
                  _context2.next = 5;
                  break;
                }

                this.errorHint = this.$t('error.validation.invalidEmailAddress');
                _context2.next = 11;
                break;

              case 5:
                this.sendingVerifyCode = true;
                _context2.next = 8;
                return this.$acs.sendBindEmailVerifyCode(this.email);

              case 8:
                result = _context2.sent;

                if (result.success) {
                  this.cooldownCounter = 60;
                  setTimeout(this.cooldownTimer, 1000);
                } else {
                  this.setErrorMessage(this.$t(result.i18n_message, result.i18n_message_object));
                }
                this.sendingVerifyCode = false;

              case 11:
                _context2.next = 17;
                break;

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2['catch'](0);

                this.setErrorMessage(this.$t('error.server.networkError'));
                this.sendingVerifyCode = false;

              case 17:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 13]]);
      }));

      function sendEmailVerifyCode() {
        return _ref2.apply(this, arguments);
      }

      return sendEmailVerifyCode;
    }()
  }),

  mixins: [__WEBPACK_IMPORTED_MODULE_3__formMixin__["a" /* default */]]
});

/***/ }),

/***/ 921:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validators__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__formMixin__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_js_utils__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_components_toast__ = __webpack_require__(51);
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













/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      mobile: '',
      verifyCode: '',
      password: '',
      errorMessage: '',
      showPassword: false,
      sendingVerifyCode: false,
      cooldownCounter: 0,
      processing: false
    };
  },
  validations: function validations() {
    var mobile = {
      required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
      valid: function valid(val) {
        return __WEBPACK_IMPORTED_MODULE_4_common_js_utils__["i" /* isValidMobileNumber */](val);
      },
      changed: function changed(val) {
        return __WEBPACK_IMPORTED_MODULE_4_common_js_utils__["i" /* isValidMobileNumber */](this.userInfo.mobile) ? val != this.userInfo.mobile : true;
      }
    };

    var password = {
      required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
      minLength: __WEBPACK_IMPORTED_MODULE_4_common_js_utils__["e" /* minLength */](6),
      maxLength: __WEBPACK_IMPORTED_MODULE_4_common_js_utils__["f" /* maxLength */](20)
    };

    if (this.userInfo.nil_password) {
      return {
        mobile: mobile,
        password: password,
        verifyCode: __WEBPACK_IMPORTED_MODULE_2__validators__["a" /* verifyCode */]
      };
    } else {
      return {
        mobile: mobile,
        verifyCode: __WEBPACK_IMPORTED_MODULE_2__validators__["a" /* verifyCode */]
      };
    }
  },
  mounted: function mounted() {},


  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['userInfo']), {
    btnFetchVerifyCodeTitle: function btnFetchVerifyCodeTitle() {
      if (this.cooldownCounter > 0) {
        return this.$t('account.cooldownText', {
          timer: this.cooldownCounter
        });
      } else {
        return this.$t('account.fetchVeiryCode');
      }
    },
    boundMobile: function boundMobile() {
      return this.userInfo.mobile ? __WEBPACK_IMPORTED_MODULE_4_common_js_utils__["c" /* mobileMask */](this.userInfo.mobile) : '';
    }
  }),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['updateUserMobile']), {

    onSubmit: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.processing) {
                  _context.next = 7;
                  break;
                }

                this.processing = true;
                _context.next = 4;
                return this.$acs.updateUserMobileNumber({
                  mobile: this.mobile,
                  verify_code: this.verifyCode,
                  password: this.password
                });

              case 4:
                result = _context.sent;

                if (result.success) {
                  this.updateUserMobile(this.mobile);
                  window.acsConfig.user.mobile = this.mobile;

                  this.$nextTick(function (_) {
                    __WEBPACK_IMPORTED_MODULE_5_common_components_toast__["a" /* default */].show(_this.$t('account.messages.mobileBindSuccess', {
                      mobile: _this.mobile
                    }));
                    _this.$router.back();
                  });
                } else {
                  this.setErrorMessage(this.$t(result.i18n_message, result.i18n_message_object));
                }
                this.processing = false;

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onSubmit() {
        return _ref.apply(this, arguments);
      }

      return onSubmit;
    }(),

    cooldownTimer: function cooldownTimer() {
      if (this.cooldownCounter > 0) {
        this.cooldownCounter--;
        setTimeout(this.cooldownTimer, 1000);
      }
    },

    sendMobileVerifyCode: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (!__WEBPACK_IMPORTED_MODULE_4_common_js_utils__["i" /* isValidMobileNumber */](this.mobile)) {
                  _context2.next = 8;
                  break;
                }

                this.sendingVerifyCode = true;
                _context2.next = 5;
                return this.$acs.sendBindMobileVerifyCode(this.mobile);

              case 5:
                result = _context2.sent;

                if (result.success) {
                  this.cooldownCounter = 60;
                  setTimeout(this.cooldownTimer, 1000);
                } else {
                  this.setErrorMessage(this.$t(result.i18n_message, result.i18n_message_object));
                }
                this.sendingVerifyCode = false;

              case 8:
                _context2.next = 14;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2['catch'](0);

                this.setErrorMessage(this.$t('error.server.networkError'));
                this.sendingVerifyCode = false;

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 10]]);
      }));

      function sendMobileVerifyCode() {
        return _ref2.apply(this, arguments);
      }

      return sendMobileVerifyCode;
    }()
  }),

  mixins: [__WEBPACK_IMPORTED_MODULE_3__formMixin__["a" /* default */]]
});

/***/ }),

/***/ 922:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__formMixin__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_utils__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_components_toast__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_js_nativeApi__ = __webpack_require__(49);
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













/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      nickname: '',
      errorMessage: '',
      processing: false
    };
  },


  validations: {
    nickname: {
      required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
      minLength: __WEBPACK_IMPORTED_MODULE_3_common_js_utils__["e" /* minLength */](4),
      maxLength: __WEBPACK_IMPORTED_MODULE_3_common_js_utils__["f" /* maxLength */](20),
      valid: function valid(val) {
        return !/\%/.test(val);
      },
      emoji: function emoji(val) {
        return !/\ud83d[\ude00-\ude4f]/.test(val);
      }
    }
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['userInfo'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['updateUserNickname']), {

    checkCharacter: function checkCharacter(val) {
      return (/^[\w\u4e00-\u9fa5]+$/gi.test(this.nickname)
      );
    },

    onSubmit: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.checkCharacter(this.nickname)) {
                  _context.next = 3;
                  break;
                }

                __WEBPACK_IMPORTED_MODULE_4_common_components_toast__["a" /* default */].show(this.$t('account.error.nickNameError'));
                return _context.abrupt('return');

              case 3:
                if (this.processing) {
                  _context.next = 10;
                  break;
                }

                this.processing = true;
                _context.next = 7;
                return this.$acs.updateUserNickname({
                  nickname: __WEBPACK_IMPORTED_MODULE_3_common_js_utils__["j" /* formatEmojiChars */](this.nickname)
                });

              case 7:
                result = _context.sent;

                if (result.success) {
                  this.updateUserNickname(this.nickname);
                  window.acsConfig.user.nickname = this.nickname;
                  __WEBPACK_IMPORTED_MODULE_5_common_js_nativeApi__["a" /* default */].updateNickname(this.nickname);

                  this.$nextTick(function (_) {
                    __WEBPACK_IMPORTED_MODULE_4_common_components_toast__["a" /* default */].show(_this.$t('account.messages.nicknameUpdated', {
                      nickname: _this.nickname
                    }));
                    _this.$router.back();
                  });
                } else {
                  this.setErrorMessage(this.$t(result.i18n_message, result.i18n_message_object));
                }
                this.processing = false;

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onSubmit() {
        return _ref.apply(this, arguments);
      }

      return onSubmit;
    }()
  }),

  mixins: [__WEBPACK_IMPORTED_MODULE_2__formMixin__["a" /* default */]]
});

/***/ }),

/***/ 923:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__formMixin__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_utils__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_components_toast__ = __webpack_require__(51);
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











/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      residentId: '',
      residentName: '',
      errorMessage: '',
      processing: false
    };
  },
  mounted: function mounted() {
    this.residentId = this.userInfo.resident_id;
    this.residentName = this.userInfo.resident_name;
  },


  validations: {
    residentName: {
      required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
      minLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["minLength"])(2),
      maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["maxLength"])(30)
    },
    residentId: {
      required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
      minLength: __WEBPACK_IMPORTED_MODULE_3_common_js_utils__["e" /* minLength */](15),
      maxLength: __WEBPACK_IMPORTED_MODULE_3_common_js_utils__["f" /* maxLength */](18),
      valid: __WEBPACK_IMPORTED_MODULE_3_common_js_utils__["g" /* isValidResidentId */]
    }
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['userInfo'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['updateUserResidentInfo']), {

    onSubmit: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.processing) {
                  _context.next = 7;
                  break;
                }

                this.processing = true;
                _context.next = 4;
                return this.$acs.updateUserResidentInfo({
                  resident_id: this.residentId,
                  resident_name: this.residentName
                });

              case 4:
                result = _context.sent;

                if (result.success) {
                  this.updateUserResidentInfo({
                    resident_id: this.residentId,
                    resident_name: this.residentName
                  });
                  window.acsConfig.user.resident_id = this.residentId;
                  window.acsConfig.user.resident_name = this.residentName;

                  this.$nextTick(function (_) {
                    __WEBPACK_IMPORTED_MODULE_4_common_components_toast__["a" /* default */].show(_this.$t('account.messages.residentInfoUpdateds'));
                    _this.$router.back();
                  });
                } else {
                  this.setErrorMessage(this.$t(result.i18n_message, result.i18n_message_object));
                }
                this.processing = false;

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onSubmit() {
        return _ref.apply(this, arguments);
      }

      return onSubmit;
    }()
  }),

  mixins: [__WEBPACK_IMPORTED_MODULE_2__formMixin__["a" /* default */]]
});

/***/ }),

/***/ 924:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_nativeApi__ = __webpack_require__(49);
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





/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      inApp: window.acsConfig.inApp,
      canGoBack: false
    };
  },

  created: function created() {
    if (window.acsConfig.user) {
      this.setUserProfile(window.acsConfig.user);
    }
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['transitionName'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['setTransitionName', 'setUserProfile']), {

    onBtnBackClicked: function onBtnBackClicked() {
      if (this.canGoBack) {
        this.$router.back();
      } else if (this.inApp) {
        __WEBPACK_IMPORTED_MODULE_1_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
          success: false
        });
      }
    }
  }),

  watch: {
    '$route': function $route(to, from) {
      this.canGoBack = history.state != null;
    }
  }
});

/***/ }),

/***/ 925:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_utils__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_acs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_components_mobileMenu__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_components_progress__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_common_components_imageCropUpload__ = __webpack_require__(552);
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













/* harmony default export */ __webpack_exports__["default"] = ({
  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['userInfo']), {
    isInApp: function isInApp() {
      return __WEBPACK_IMPORTED_MODULE_2_common_js_acs__["d" /* isInApp */];
    },
    isMobileAccountSupported: function isMobileAccountSupported() {
      return __WEBPACK_IMPORTED_MODULE_2_common_js_acs__["e" /* isMobileAccountSupported */];
    },
    showLogout: function showLogout() {
      return __WEBPACK_IMPORTED_MODULE_2_common_js_acs__["f" /* showLogout */];
    },
    avatarUrl: function avatarUrl() {
      return this.userInfo.avatar_url ? this.userInfo.avatar_url : window.acsConfig.defaultAvatarUrl;
    },
    email: function email() {
      return this.userInfo.email ? __WEBPACK_IMPORTED_MODULE_1_common_js_utils__["b" /* emailMask */](this.userInfo.email) : this.$t('account.notBound');
    },
    mobile: function mobile() {
      return this.userInfo.mobile ? __WEBPACK_IMPORTED_MODULE_1_common_js_utils__["c" /* mobileMask */](this.userInfo.mobile) : this.$t('account.notBound');
    }
  }),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['updateUserAvatar']), {

    onUpdateAvatar: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var items, isPhotoLibAvailable, isCameraAvailable, menu;
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
                return __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__["a" /* default */].isMediaSourceTypeAvailable('photoLib');

              case 4:
                isPhotoLibAvailable = _context.sent;

                if (isPhotoLibAvailable) {
                  items.unshift({
                    title: this.$t('common.photoLib'),
                    value: 'photoLib'
                  });
                }

                _context.next = 8;
                return __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__["a" /* default */].isMediaSourceTypeAvailable('camera');

              case 8:
                isCameraAvailable = _context.sent;

                if (isCameraAvailable) {
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
                      __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__["a" /* default */].pickAvatarFrom('camera', function (result) {
                        return _this.handlePickAvatarResult(result);
                      });
                      break;

                    case 'photoLib':
                      __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__["a" /* default */].pickAvatarFrom('photoLib', function (result) {
                        return _this.handlePickAvatarResult(result);
                      });
                      break;
                  }
                });

                _context.next = 15;
                break;

              case 14:
                __WEBPACK_IMPORTED_MODULE_6_common_components_imageCropUpload__["a" /* default */].show({
                  url: '/user/update_avatar',
                  callback: function callback(result) {
                    if (result.success) {
                      _this.updateUserAvatar(result.user.avatar_url);
                      window.acsConfig.user.avatar_url = result.user.avatar_url;
                      __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__["a" /* default */].updateAvatar(result.user.avatar_url);
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

      function onUpdateAvatar() {
        return _ref.apply(this, arguments);
      }

      return onUpdateAvatar;
    }(),

    handlePickAvatarResult: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(result) {
        var progress, upload_result;
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
                return this.$acs.updateUserAvatar({
                  file: {
                    base64_content: result.image
                  }
                }, function (value) {
                  progress.setProgress(value);
                });

              case 4:
                upload_result = _context2.sent;


                progress.close();

                if (upload_result.success) {
                  this.updateUserAvatar(upload_result.user.avatar_url);
                  window.acsConfig.user.avatar_url = result.user.avatar_url;
                }

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handlePickAvatarResult(_x) {
        return _ref2.apply(this, arguments);
      }

      return handlePickAvatarResult;
    }(),

    logout: function logout() {
      __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
        success: false,
        action: 'logout'
      });
    }

  })
});

/***/ }),

/***/ 926:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_nativeApi__ = __webpack_require__(49);
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
    return {};
  },

  methods: {
    onClose: function onClose() {
      __WEBPACK_IMPORTED_MODULE_2_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
        success: false
      });
    }
  }
});

/***/ }),

/***/ 927:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_acs__ = __webpack_require__(52);
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
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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

/***/ 928:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_nativeApi__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_acs__ = __webpack_require__(52);
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
      inApp: window.acsConfig.inApp,
      canGoBack: false
    };
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])(['transitionName', 'forumInfo'])),

  beforeRouteEnter: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(to, from, next) {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return __WEBPACK_IMPORTED_MODULE_0__vue_installed__["a" /* default */].axios.post('/forum_actions/get_fat_forum', {
                forum_id: to.params.forumId
              }).then(function (response) {
                return response.data;
              });

            case 3:
              result = _context.sent;


              if (result.success) {
                next(function (vm) {
                  vm.updateForumInfo(result.forum);

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

/***/ 929:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_menuModal__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_components_imageUpload__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_components_mobileMenu__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_components_progress__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_components_toast__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_common_js_nativeApi__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_common_js_utils__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vuelidate_lib_validators__ = __webpack_require__(80);
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
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
      minLength: __WEBPACK_IMPORTED_MODULE_7_common_js_utils__["e" /* minLength */](5)
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(editor) {
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
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(editor, result) {
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
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
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

/***/ 930:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_menuModal__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_components_imageUpload__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_components_mobileMenu__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_components_progress__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_common_components_toast__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_common_js_nativeApi__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_common_js_utils__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_common_js_acs__ = __webpack_require__(52);
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
        minLength: __WEBPACK_IMPORTED_MODULE_8_common_js_utils__["e" /* minLength */](10),
        maxLength: __WEBPACK_IMPORTED_MODULE_8_common_js_utils__["f" /* maxLength */](250),
        emoji: function emoji(val) {
          return !/\ud83d[\ude00-\ude4f]/.test(val);
        }
      },
      content: {
        required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
        minLength: __WEBPACK_IMPORTED_MODULE_8_common_js_utils__["e" /* minLength */](10)
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
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(editor) {
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(editor, result) {
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
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
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

/***/ 931:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_mobileMenu__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_sliderNav__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_sliderNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_sliderNav__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_myPostListItem__ = __webpack_require__(1279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_myPostListItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_myPostListItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_myFavoriteListItem__ = __webpack_require__(1278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_myFavoriteListItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_myFavoriteListItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_myCommentListItem__ = __webpack_require__(1277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_myCommentListItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_myCommentListItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_common_components_imageCropUpload__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_common_js_filters__ = __webpack_require__(59);
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
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
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
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
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
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
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
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
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

/***/ 932:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_postDetailView_vue__ = __webpack_require__(1284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_postDetailView_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_postDetailView_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_postCommentView_vue__ = __webpack_require__(1283);
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
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
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
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
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

/***/ 933:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_postListItem__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_postListItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_postListItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_menuModal__ = __webpack_require__(508);
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
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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

/***/ 934:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_toast__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_utils__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_filters__ = __webpack_require__(59);
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
      nowdate: __WEBPACK_IMPORTED_MODULE_2_common_js_utils__["k" /* nowFromServer */](),
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
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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

/***/ 935:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_postListItem__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_postListItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_postListItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_menuModal__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_pagination__ = __webpack_require__(1282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_pagination__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_js_utils__ = __webpack_require__(33);
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
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(keyword) {
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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

/***/ 936:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_utils__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_questionItem__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_questionItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_questionItem__);
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
  components: {
    questionItem: __WEBPACK_IMPORTED_MODULE_2__components_questionItem___default.a
  },
  data: function data() {
    return {
      keywords: [],
      questions: undefined,
      keyword: "",
      searching: false,
      page: 0,
      total: 1,
      records_per_page: 10,
      historyTableColumns: 2
    };
  },

  mounted: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this = this;

      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.resize();
              window.addEventListener('resize', function (e) {
                _this.resize();
              });

              _context.next = 4;
              return this.$acs.getCommonIssues(this.$route.params.appId);

            case 4:
              result = _context.sent;

              if (result.success) {
                this.keywords = result.issues;
              }

            case 6:
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

  computed: {
    searchHistoryTable: function searchHistoryTable() {
      var size = this.keywords.length;
      var row = 0;
      var result = [];

      if (size > 0) {
        while (row < Math.floor(size / this.historyTableColumns)) {
          result.push(this.keywords.slice(row * this.historyTableColumns, (row + 1) * this.historyTableColumns));
          row++;
        }
        var n = this.historyTableColumns - size % this.historyTableColumns;
        if (n < this.historyTableColumns) {
          var last = this.keywords.slice(row * this.historyTableColumns);
          while (n > 0) {
            last.push('');
            n--;
          }
          result.push(last);
        }
      }

      return result;
    }
  },

  methods: {
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
    search: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(keyword) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (keyword && typeof keyword == 'string') {
                  this.keyword = keyword;
                }

                this.searching = true;
                this.page = 0;
                this.resetScroller();
                _context2.next = 6;
                return this.loadmore();

              case 6:
                this.searching = false;

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function search(_x) {
        return _ref2.apply(this, arguments);
      }

      return search;
    }(),
    resetScroller: function resetScroller() {
      if (this.$refs.scroller) {
        this.$refs.scroller.$emit('reset');
      }
    },
    loadmore: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // cancel last get paged post if we're requesting 
                this.$acs.cancelSearchQuestion();

                _context3.next = 3;
                return this.$acs.searchQuestion(this.$route.params.appId, this.keyword, this.page + 1, this.records_per_page);

              case 3:
                result = _context3.sent;


                if (result.success) {
                  this.questions = this.page == 0 ? result.questions : this.questions.concat(result.questions);
                  this.total = result.total;
                  this.page = this.page + 1;

                  if (this.$refs.scroller && this.page >= this.total) {
                    this.$refs.scroller.$emit('all-loaded');
                  }
                }

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadmore() {
        return _ref3.apply(this, arguments);
      }

      return loadmore;
    }()
  },
  watch: {
    keyword: function keyword(val) {
      if (!val) {
        this.questions = undefined;
      }
    }
  }
});

/***/ }),

/***/ 937:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_components_toast__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_utils__ = __webpack_require__(33);
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







/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.getAppDetail();

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
      title: '',
      processing: false,
      appDetail: {}
    };
  },

  validations: {
    title: {
      required: __WEBPACK_IMPORTED_MODULE_1_vuelidate_lib_validators__["required"],
      minLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_common_js_utils__["e" /* minLength */])(5),
      maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_common_js_utils__["f" /* maxLength */])(300)
    }
  },
  methods: {
    handleSubmit: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var appId, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!this.$v.$invalid && !this.processing)) {
                  _context2.next = 8;
                  break;
                }

                this.processing = true;
                appId = this.$router.currentRoute.params.appId;
                _context2.next = 5;
                return this.$acs.addContact(appId, this.title);

              case 5:
                result = _context2.sent;


                if (result.success) {
                  __WEBPACK_IMPORTED_MODULE_0_common_components_toast__["a" /* default */].show(this.$t('customerService.contactService.addSuccess'));
                  this.$router.replace({
                    name: 'myService'
                  });
                }
                this.processing = false;

              case 8:
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
    }(),
    getAppDetail: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var appId, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                appId = this.$router.currentRoute.params.appId;
                _context3.next = 3;
                return this.$acs.getAppDetail(appId);

              case 3:
                result = _context3.sent;

                if (result.success) {
                  this.appDetail = result.app;
                }

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getAppDetail() {
        return _ref3.apply(this, arguments);
      }

      return getAppDetail;
    }()
  }
});

/***/ }),

/***/ 938:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_sliderNav__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_sliderNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_sliderNav__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_js_acs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_components_toast__ = __webpack_require__(51);
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
  components: {
    sliderNav: __WEBPACK_IMPORTED_MODULE_2__components_sliderNav___default.a
  },
  data: function data() {
    return {
      inApp: window.acsConfig.inApp,
      canGoBack: false,
      menus: [{
        text: this.$t('customerService.commonIssues.title'),
        value: 'commonIssues'
      }, {
        text: this.$t('customerService.contactService.title'),
        value: 'contactService'
      }, {
        text: this.$t('customerService.myService.title'),
        value: 'myService'
      }]
    };
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])(['transitionName'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['setTransitionName', 'setUserProfile']), {

    onBtnBackClicked: function onBtnBackClicked() {
      if (this.canGoBack) {
        this.$router.back();
      } else if (this.inApp) {
        __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
          success: false
        });
      }
    },

    switchMenu: function switchMenu(item, index) {
      this.$router.push({
        name: item.value
      });
    }
  }),

  watch: {
    '$route': function $route(to, from) {
      this.canGoBack = history.state != null;
      this.$refs.nav.$emit('select', to.name);
    }
  }
});

/***/ }),

/***/ 939:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_questionItem__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_questionItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_questionItem__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
    questionItem: __WEBPACK_IMPORTED_MODULE_0__components_questionItem___default.a
  },
  data: function data() {
    return {
      questionList: [],
      page: 0,
      total: 1,
      recordsPerPage: 12,
      postRecords: 0
    };
  },

  methods: {
    resetScroller: function resetScroller() {
      this.page = 0;
      this.total = 1;
      this.questionList = [];
      if (this.$refs.scroller) {
        this.$refs.scroller.$emit('reset');
      }
    },
    loadmore: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var appId, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // cancel last get paged post if we're requesting 
                this.$acs.cancelGetServicePaged();

                appId = this.$router.currentRoute.params.appId;
                _context.next = 4;
                return this.$acs.getServicePaged(appId, this.page + 1, this.recordsPerPage);

              case 4:
                result = _context.sent;


                if (result.success) {
                  this.questionList = this.page == 0 ? result.questions : this.questionList.concat(result.questions);
                  this.total = result.total;
                  this.page = this.page + 1;

                  if (this.$refs.scroller && this.page >= this.total) {
                    this.$refs.scroller.$emit('all-loaded');
                  }
                }

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadmore() {
        return _ref.apply(this, arguments);
      }

      return loadmore;
    }()
  }
});

/***/ }),

/***/ 940:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_nativeApi__ = __webpack_require__(49);
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
    return {};
  },

  methods: {
    onClose: function onClose() {
      __WEBPACK_IMPORTED_MODULE_2_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
        success: false
      });
    }
  }
});

/***/ }),

/***/ 941:
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

/* harmony default export */ __webpack_exports__["default"] = ({
  created: function created() {
    this.fetchData();
  },

  watch: {
    '$route': 'fetchData'
  },

  data: function data() {
    return {
      activityList: [],
      detail: Object
    };
  },


  methods: {
    fetchData: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var app_id, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                app_id = this.$route.params.app_id;
                _context.next = 3;
                return this.$acs.getPagedNews(app_id, "activity", 1, 12);

              case 3:
                result = _context.sent;


                if (result.success) {
                  this.activityList = result.news;
                }

              case 5:
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
    }(),

    showActivityDetail: function showActivityDetail(item) {
      this.$router.push({
        path: '/games/' + this.$route.params.app_id + '/activity/' + item.id
      });
    }
  }
});

/***/ }),

/***/ 942:
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
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  created: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.fetchTopNews();

            case 2:
            case "end":
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

  data: function data() {
    return {
      topNews: [],
      news: [],
      detail: Object,
      page: 0,
      total: 1,
      recordsPerPage: 5
    };
  },


  methods: {
    fetchTopNews: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var app_id, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                app_id = this.$router.currentRoute.params.app_id;
                _context2.next = 3;
                return this.$acs.getTopNews(app_id, 3);

              case 3:
                result = _context2.sent;


                if (result.success) {
                  this.topNews = result.news;
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchTopNews() {
        return _ref2.apply(this, arguments);
      }

      return fetchTopNews;
    }(),

    loadMore: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var app_id, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                app_id = this.$router.currentRoute.params.app_id;
                _context3.next = 3;
                return this.$acs.getPagedNews(app_id, "news", this.page + 1, this.recordsPerPage);

              case 3:
                result = _context3.sent;


                if (result.success) {
                  this.news = this.page == 0 ? result.news : this.news.concat(result.news);

                  this.total = result.total;
                  this.page = this.page + 1;

                  if (this.$refs.scroller && this.page >= this.total) {
                    this.$refs.scroller.$emit('all-loaded');
                  }
                }

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadMore() {
        return _ref3.apply(this, arguments);
      }

      return loadMore;
    }(),

    refresh: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.page = 0;
                this.total = 1;
                _context4.next = 4;
                return this.loadMore();

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function refresh() {
        return _ref4.apply(this, arguments);
      }

      return refresh;
    }(),

    showNewsDetail: function showNewsDetail(item) {
      this.$router.push({
        path: "/games/" + this.$route.params.app_id + "/news/" + item.id
      });
    }
  }

});

/***/ }),

/***/ 943:
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

/* harmony default export */ __webpack_exports__["default"] = ({
  created: function created() {
    this.fetchData();
  },

  data: function data() {
    return {
      notices: [],
      itemData: {},
      selectedId: 0
    };
  },


  methods: {
    showNoticeDetail: function showNoticeDetail(item) {
      this.selectedId = item.id;
      this.itemData = item;
    },


    fetchData: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var app_id, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                app_id = this.$router.currentRoute.params.app_id;
                _context.next = 3;
                return this.$acs.getPagedNews(app_id, "notice", 1, 30);

              case 3:
                result = _context.sent;


                if (result.success) {
                  this.notices = result.news;
                  this.notices && this.notices.length ? this.showNoticeDetail(this.notices[0]) : '';
                }

              case 5:
              case "end":
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
  }
});

/***/ }),

/***/ 944:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
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
  data: function data() {
    return {
      appList: []
    };
  },


  mounted: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.loadData();

            case 2:
            case "end":
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
    loadData: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$acs.getApps();

              case 2:
                result = _context2.sent;


                if (result.success) {
                  this.appList = result.apps;
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadData() {
        return _ref2.apply(this, arguments);
      }

      return loadData;
    }(),

    showGames: function showGames(app_id) {
      this.$router.push({
        name: "gamesIndex",
        params: {
          app_id: app_id
        }
      });
    }

  }
});

/***/ }),

/***/ 945:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_nativeApi__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_sliderNav__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_sliderNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_sliderNav__);
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






/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      inApp: window.acsConfig.inApp,
      canGoBack: false,
      currentTab: "activity",
      menus: [{
        text: this.$t('games.tab.activity'),
        value: 'activity'
      }, {
        text: this.$t('games.tab.notice'),
        value: 'notice'
      }, {
        text: this.$t('games.tab.news'),
        value: 'news'
      }]
    };
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['transitionName'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['setTransitionName']), {

    switchMenu: function switchMenu(menu) {
      if (menu.value != this.currentTab) {
        this.currentTab = menu.value;
        this.$router.push({
          path: '/games/' + this.$route.params.app_id + '/' + menu.value
        });
      }
    },

    onBtnBackClicked: function onBtnBackClicked() {
      this.$router.back();
    },

    onBtnCloseClicked: function onBtnCloseClicked() {
      __WEBPACK_IMPORTED_MODULE_1_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
        success: false
      });
    }
  }),

  watch: {
    '$route': function $route(to, from) {
      this.canGoBack = history.state != null;
      switch (to.name) {
        case 'gameActivity':
          this.$refs.nav && this.$refs.nav.$emit('select', 'activity');
          this.currentTab = 'activity';
          break;
        case 'gameNotice':
          this.$refs.nav && this.$refs.nav.$emit('select', 'notice');
          this.currentTab = 'notice';
          break;
        case 'gameNews':
          this.$refs.nav && this.$refs.nav.$emit('select', 'news');
          this.currentTab = 'news';
          break;
      }
    }
  },

  components: {
    sliderNav: __WEBPACK_IMPORTED_MODULE_2__components_sliderNav___default.a
  }
});

/***/ }),

/***/ 946:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_newsDetailView__ = __webpack_require__(1280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_newsDetailView___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_newsDetailView__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      news: undefined
    };
  },


  created: function created() {
    this.fetchData();
  },

  watch: {
    '$route': 'fetchData'
  },

  methods: {
    fetchData: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var newsId, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                newsId = this.$route.params.newsId;
                _context.next = 3;
                return this.$acs.getNewsDetail(newsId);

              case 3:
                result = _context.sent;


                if (result.success) {
                  this.news = result.news;
                }

              case 5:
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
    newsDetailView: __WEBPACK_IMPORTED_MODULE_0__components_newsDetailView___default.a
  }
});

/***/ }),

/***/ 947:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_acs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_nativeApi__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_components_citySelect_citySelect__ = __webpack_require__(698);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_components_citySelect_citySelect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_common_components_citySelect_citySelect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuelidate_lib_validators__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_common_js_utils__ = __webpack_require__(33);
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








/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    citySelect: __WEBPACK_IMPORTED_MODULE_3_common_components_citySelect_citySelect___default.a
  },

  mounted: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              __WEBPACK_IMPORTED_MODULE_1_common_js_acs__["a" /* checkIsLogin */](function (_) {});
              _context.next = 3;
              return this.getAddressDetail();

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

  computed: {
    errorHint: function errorHint() {
      if (!this.$v.address.name.required) {
        return this.$t('mall.address.namePlaceholder');
      } else if (!this.$v.address.name.minLength) {
        return this.$t('error.validation.minResidentNameLength');
      } else if (!this.$v.address.name.maxLength) {
        return this.$t('error.validation.maxResidentNameLength');
      } else if (!this.$v.address.mobile.required) {
        return this.$t('mall.address.mobilePlaceholder');
      } else if (!this.$v.address.mobile.isValidMobileNumber) {
        return this.$t('error.validation.invalidMobileNumber');
      } else if (!this.$v.address.area.required) {
        return this.$t('mall.address.areaPlaceholder');
      } else if (!this.$v.address.address.required) {
        return this.$t('mall.address.addressPlaceholder');
      } else if (!this.$v.address.address.minLength) {
        return this.$t('error.validation.minAddressLength');
      } else if (!this.$v.address.address.maxLength) {
        return this.$t('error.validation.maxAddressLength');
      }

      return '';
    }
  },

  validations: {
    address: {
      name: {
        required: __WEBPACK_IMPORTED_MODULE_4_vuelidate_lib_validators__["required"],
        minLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_common_js_utils__["e" /* minLength */])(4),
        maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_common_js_utils__["f" /* maxLength */])(50)
      },
      mobile: {
        required: __WEBPACK_IMPORTED_MODULE_4_vuelidate_lib_validators__["required"],
        isValidMobileNumber: __WEBPACK_IMPORTED_MODULE_5_common_js_utils__["i" /* isValidMobileNumber */]
      },
      address: {
        required: __WEBPACK_IMPORTED_MODULE_4_vuelidate_lib_validators__["required"],
        minLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_common_js_utils__["e" /* minLength */])(10),
        maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_common_js_utils__["f" /* maxLength */])(250)
      },
      area: {
        required: __WEBPACK_IMPORTED_MODULE_4_vuelidate_lib_validators__["required"],
        minLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_common_js_utils__["e" /* minLength */])(5),
        maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_common_js_utils__["f" /* maxLength */])(90)
      },
      area_code: {
        required: __WEBPACK_IMPORTED_MODULE_4_vuelidate_lib_validators__["required"],
        minLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_common_js_utils__["e" /* minLength */])(5),
        maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_common_js_utils__["f" /* maxLength */])(30)
      }
    }
  },

  data: function data() {
    return {
      processing: false,
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      address: {
        id: 0,
        name: '',
        mobile: '',
        address: '',
        area: '',
        area_code: ''
      },
      province: '',
      city: '',
      district: '',
      provinceCode: '',
      cityCode: '',
      districtCode: ''
    };
  },

  methods: {
    handleSubmit: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var area, area_code, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.processing) {
                  _context2.next = 9;
                  break;
                }

                this.processing = true;
                area = this.district == "" ? null : this.province + "-" + this.city + "-" + this.district;
                area_code = this.districtCode == "" ? null : this.provinceCode + "-" + this.cityCode + "-" + this.districtCode;
                _context2.next = 6;
                return this.$acs.updateAddress({
                  id: this.address.id,
                  name: this.address.name,
                  mobile: this.address.mobile,
                  area: area,
                  address: this.address.address,
                  area_code: area_code,
                  is_default: this.address.is_default
                });

              case 6:
                result = _context2.sent;

                if (result.success) {
                  this.$router.replace({
                    name: 'myAddresses'
                  });
                }
                this.processing = false;

              case 9:
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
    }(),
    onBtnBackClicked: function onBtnBackClicked() {
      if (this.canGoBack) {
        this.$router.back();
      } else if (this.inApp) {
        __WEBPACK_IMPORTED_MODULE_2_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
          success: false
        });
      }
    },
    getAddressDetail: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var addressId, result, areaItem, codeItem;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                addressId = this.$router.currentRoute.params.addressId;
                _context3.next = 3;
                return this.$acs.getAddressDetail(addressId);

              case 3:
                result = _context3.sent;

                if (result.success) {
                  this.address = result.address;
                  areaItem = this.address.area.split('-');
                  codeItem = this.address.area_code.split('-');

                  this.province = areaItem[0];
                  this.city = areaItem[1];
                  this.district = areaItem[2];
                  this.provinceCode = codeItem[0];
                  this.cityCode = codeItem[1];
                  this.districtCode = codeItem[2];
                }

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getAddressDetail() {
        return _ref3.apply(this, arguments);
      }

      return getAddressDetail;
    }(),
    onSelect: function onSelect(province, city, district) {
      this.province = province.name;
      this.provinceCode = province.code;
      this.city = city.name;
      this.cityCode = city.code;
      this.district = district.name;
      this.districtCode = district.code;
    }
  },
  watch: {
    '$route': function $route(to, from) {
      this.canGoBack = history.state != null;
    }
  }
});

/***/ }),

/***/ 948:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_acs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_nativeApi__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_awesome_swiper__ = __webpack_require__(1186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_awesome_swiper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_awesome_swiper__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vuex__ = __webpack_require__(8);
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







/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    swiper: __WEBPACK_IMPORTED_MODULE_3_vue_awesome_swiper__["swiper"],
    swiperSlide: __WEBPACK_IMPORTED_MODULE_3_vue_awesome_swiper__["swiperSlide"]
  },
  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_vuex__["a" /* mapGetters */])(['selectedGoods']), {
    swiper: function swiper() {
      return this.$refs.goodsSwiper.swiper;
    }
  }),
  mounted: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(this.selectedGoods.id == 0)) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return this.getGoodsDetail();

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
  data: function data() {
    return {
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      quantity: 1,
      swiperOption: {
        autoplay: 5000,
        notNextTick: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30
      }
    };
  },
  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_vuex__["b" /* mapActions */])(['updateSelectedGoods']), {
    getGoodsDetail: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var goodsId, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                goodsId = this.$router.currentRoute.params.goodsId;
                _context2.next = 3;
                return this.$acs.getGoodsDetail(goodsId);

              case 3:
                result = _context2.sent;

                if (result.success) {
                  this.updateSelectedGoods(result.goods);
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getGoodsDetail() {
        return _ref2.apply(this, arguments);
      }

      return getGoodsDetail;
    }(),
    onBtnBackClicked: function onBtnBackClicked() {
      if (this.canGoBack) {
        this.$router.back();
      } else if (this.inApp) {
        __WEBPACK_IMPORTED_MODULE_2_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
          success: false
        });
      }
    },
    quantityPlus: function quantityPlus() {
      if (this.quantity <= 1) this.quantity = 1;else this.quantity = this.quantity - 1;
    },
    quantityReduce: function quantityReduce() {
      if (this.selectedGoods.stock <= this.quantity) this.quantity = this.selectedGoods.stock;else if (this.quantity >= 99) this.quantity = 99;else this.quantity = parseInt(this.quantity) + 1;
    },
    quantityChange: function quantityChange() {
      if (this.quantity >= 99) this.quantity = 99;else if (this.quantity <= 0) this.quantity = 1;else if (this.selectedGoods.stock <= this.quantity) this.quantity = this.selectedGoods.stock;
    },
    buyNow: function buyNow() {
      var _this = this;

      __WEBPACK_IMPORTED_MODULE_1_common_js_acs__["a" /* checkIsLogin */](function (_) {
        _this.$router.push({
          name: 'mallOrder',
          params: {
            goodsId: _this.selectedGoods.id,
            quantity: _this.quantity
          }
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

/***/ 949:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
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




/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      goodsList: [],
      page: 0,
      total: 1,
      recordsPerPage: 8,
      postRecords: 0
    };
  },
  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['updateSelectedGoods']), {
    resetScroller: function resetScroller() {
      this.page = 0;
      this.total = 1;
      this.goodsList = [];
      if (this.$refs.scroller) {
        this.$refs.scroller.$emit('reset');
      }
    },
    loadmore: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var appId, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // cancel last get paged post if we're requesting 
                this.$acs.cancelGetActiveGoodsPaged();

                appId = this.$router.currentRoute.params.appId;
                _context.next = 4;
                return this.$acs.getActiveGoodsPaged(appId, this.page + 1, this.recordsPerPage);

              case 4:
                result = _context.sent;


                if (result.success) {
                  this.goodsList = this.page == 0 ? result.goodses : this.goodsList.concat(result.goodses);
                  this.total = result.total;
                  this.page = this.page + 1;

                  if (this.$refs.scroller && this.page >= this.total) {
                    this.$refs.scroller.$emit('all-loaded');
                  }
                }

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadmore() {
        return _ref.apply(this, arguments);
      }

      return loadmore;
    }(),
    showGoodsDetail: function showGoodsDetail(goods) {
      this.updateSelectedGoods(goods);
      this.$router.push({
        name: 'goodsDetail',
        params: {
          goodsId: goods.id
        }
      });
    }
  })
});

/***/ }),

/***/ 950:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_acs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_nativeApi__ = __webpack_require__(49);
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





/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.getGoodsDetail();

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
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      goods: undefined
    };
  },
  methods: {
    onBtnBackClicked: function onBtnBackClicked() {
      if (this.canGoBack) {
        this.$router.back();
      } else if (this.inApp) {
        __WEBPACK_IMPORTED_MODULE_2_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
          success: false
        });
      }
    },
    getGoodsDetail: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.goods = this.$router.currentRoute.params.goods;

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getGoodsDetail() {
        return _ref2.apply(this, arguments);
      }

      return getGoodsDetail;
    }()
  },
  watch: {
    '$route': function $route(to, from) {
      this.canGoBack = history.state != null;
    }
  }
});

/***/ }),

/***/ 951:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_nativeApi__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_acs__ = __webpack_require__(52);
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







/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.getMallDetail();

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
      mall: {}
    };
  },

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])(['transitionName'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['setTransitionName']), {
    getMallDetail: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var appId, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                appId = this.$router.currentRoute.params.appId;
                _context2.next = 3;
                return this.$acs.getMallDetail(appId);

              case 3:
                result = _context2.sent;

                if (result.success) {
                  this.mall = result.mall;
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getMallDetail() {
        return _ref2.apply(this, arguments);
      }

      return getMallDetail;
    }(),
    onBtnBackClicked: function onBtnBackClicked() {
      if (this.canGoBack) {
        this.$router.back();
      } else if (this.inApp) {
        __WEBPACK_IMPORTED_MODULE_2_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
          success: false
        });
      }
    }
  }),

  watch: {
    '$route': function $route(to, from) {
      this.canGoBack = history.state != null;
    }
  }
});

/***/ }),

/***/ 952:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_acs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_js_filters__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_sliderNav__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_sliderNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_sliderNav__);
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










/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    sliderNav: __WEBPACK_IMPORTED_MODULE_5__components_sliderNav___default.a
  },
  mounted: function mounted() {
    __WEBPACK_IMPORTED_MODULE_2_common_js_acs__["a" /* checkIsLogin */](function (_) {});
  },
  data: function data() {
    return {
      menus: [{
        text: this.$t('customerService.commonIssues.title'),
        value: 'commonIssues'
      }, {
        text: this.$t('customerService.contactService.title'),
        value: 'contactService'
      }, {
        text: this.$t('customerService.myService.title'),
        value: 'myService'
      }]
    };
  },
  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])(['transitionName'])),
  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['setTransitionName']), {
    switchMenu: function switchMenu(item, index) {
      this.$router.push({
        name: item.value
      });
    }
  })
});

/***/ }),

/***/ 953:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_components_toast__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_components_alertDialog__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_acs__ = __webpack_require__(52);
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






/* harmony default export */ __webpack_exports__["default"] = ({
  mounted: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              __WEBPACK_IMPORTED_MODULE_3_common_js_acs__["a" /* checkIsLogin */](function (_) {});
              _context.next = 3;
              return this.loadAddress();

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
  data: function data() {
    return {
      loading: false,
      processing: false,
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      addressesList: []
    };
  },
  methods: {
    loadAddress: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$acs.getUserAddresses();

              case 2:
                result = _context2.sent;

                if (result.success) {
                  this.addressesList = result.addresses;
                  this.loading = true;
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadAddress() {
        return _ref2.apply(this, arguments);
      }

      return loadAddress;
    }(),
    showAddressDetail: function showAddressDetail(addressId) {
      this.$router.push({
        name: 'editAddress',
        params: {
          addressId: addressId
        }
      });
    },
    setDefaultAddress: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(addressId) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.processing) {
                  _context3.next = 7;
                  break;
                }

                this.processing = true;
                _context3.next = 4;
                return this.$acs.setDefaultAddress(addressId);

              case 4:
                result = _context3.sent;

                if (result.success) {
                  __WEBPACK_IMPORTED_MODULE_1_common_components_toast__["a" /* default */].show(this.$t('mall.address.setDefaultSuccess'));
                  this.loadAddress();
                }
                this.processing = false;

              case 7:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setDefaultAddress(_x) {
        return _ref3.apply(this, arguments);
      }

      return setDefaultAddress;
    }(),
    deleteAddress: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(addressId) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                __WEBPACK_IMPORTED_MODULE_2_common_components_alertDialog__["a" /* default */].show({
                  visible: true,
                  message: this.$t('common.confirmDelete'),
                  okText: this.$t('common.ok'),
                  cancelText: this.$t('common.cancel'),
                  onOk: function () {
                    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_) {
                      var result;
                      return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:
                              if (_this.processing) {
                                _context4.next = 7;
                                break;
                              }

                              _this.processing = true;
                              _context4.next = 4;
                              return _this.$acs.deleteAddress(addressId);

                            case 4:
                              result = _context4.sent;

                              if (result.success) {
                                __WEBPACK_IMPORTED_MODULE_1_common_components_toast__["a" /* default */].show(_this.$t('mall.address.deleteSuccess'));
                                _this.loadAddress();
                              }
                              _this.processing = false;

                            case 7:
                            case 'end':
                              return _context4.stop();
                          }
                        }
                      }, _callee4, _this);
                    }));

                    return function onOk(_x3) {
                      return _ref5.apply(this, arguments);
                    };
                  }()
                });

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deleteAddress(_x2) {
        return _ref4.apply(this, arguments);
      }

      return deleteAddress;
    }(),
    newAddress: function newAddress() {
      this.$router.push({
        name: 'newAddress'
      });
    }
  }
});

/***/ }),

/***/ 954:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_acs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_js_filters__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_sliderNav__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_sliderNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_sliderNav__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_orderItem__ = __webpack_require__(1281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_orderItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_orderItem__);
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











/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    sliderNav: __WEBPACK_IMPORTED_MODULE_5__components_sliderNav___default.a,
    orderItem: __WEBPACK_IMPORTED_MODULE_6__components_orderItem___default.a
  },
  mounted: function mounted() {
    __WEBPACK_IMPORTED_MODULE_2_common_js_acs__["a" /* checkIsLogin */](function (_) {});
  },
  data: function data() {
    return {
      menus: [{
        text: this.$t('mall.mine.myOrder.tabs.all'),
        value: 'all'
      }, {
        text: this.$t('mall.mine.myOrder.tabs.waitPay'),
        value: 'waitPay'
      }, {
        text: this.$t('mall.mine.myOrder.tabs.waitConfirm'),
        value: 'waitConfirm'
      }],
      type: 'all',
      page: 0,
      total: 1,
      records_per_page: 10,
      orders: []
    };
  },
  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])(['transitionName'])),
  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['setTransitionName']), {
    switchMenu: function switchMenu(item, index) {
      this.resetScroller();
      this.page = 0;
      this.type = item.value;
      this.orders = [];
    },
    resetScroller: function resetScroller() {
      if (this.$refs.scroller) {
        this.$refs.scroller.$emit('reset');
      }
    },
    loadmore: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // cancel last get paged post if we're requesting 
                this.$acs.cancelfetchMyOrders();

                _context.next = 3;
                return this.$acs.fetchMyOrders(this.type, this.page + 1, this.records_per_page);

              case 3:
                result = _context.sent;


                if (result.success) {
                  this.orders = this.page == 0 ? result.orders : this.orders.concat(result.orders);
                  this.total = result.total;
                  this.page = this.page + 1;

                  if (this.$refs.scroller && this.page >= this.total) {
                    this.$refs.scroller.$emit('all-loaded');
                  }
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadmore() {
        return _ref.apply(this, arguments);
      }

      return loadmore;
    }()
  })
});

/***/ }),

/***/ 955:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_acs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_components_citySelect_citySelect__ = __webpack_require__(698);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_components_citySelect_citySelect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_common_components_citySelect_citySelect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuelidate_lib_validators__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuelidate_lib_validators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vuelidate_lib_validators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_common_js_utils__ = __webpack_require__(33);
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
    citySelect: __WEBPACK_IMPORTED_MODULE_4_common_components_citySelect_citySelect___default.a
  },
  mounted: function mounted() {
    __WEBPACK_IMPORTED_MODULE_2_common_js_acs__["a" /* checkIsLogin */](function (_) {});
  },
  computed: {
    errorHint: function errorHint() {
      if (!this.$v.addressModel.name.required) {
        return this.$t('mall.address.namePlaceholder');
      } else if (!this.$v.addressModel.name.minLength) {
        return this.$t('error.validation.minResidentNameLength');
      } else if (!this.$v.addressModel.name.maxLength) {
        return this.$t('error.validation.maxResidentNameLength');
      } else if (!this.$v.addressModel.mobile.required) {
        return this.$t('mall.address.mobilePlaceholder');
      } else if (!this.$v.addressModel.mobile.isValidMobileNumber) {
        return this.$t('error.validation.invalidMobileNumber');
      } else if (!this.$v.addressModel.area.required) {
        return this.$t('mall.address.areaPlaceholder');
      } else if (!this.$v.addressModel.address.required) {
        return this.$t('mall.address.addressPlaceholder');
      } else if (!this.$v.addressModel.address.minLength) {
        return this.$t('error.validation.minAddressLength');
      } else if (!this.$v.addressModel.address.maxLength) {
        return this.$t('error.validation.maxAddressLength');
      }

      return '';
    }
  },
  data: function data() {
    return {
      processing: false,
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      addressModel: {
        mobile: '',
        name: '',
        address: '',
        area: '',
        area_code: ''
      },
      province: '',
      city: '',
      district: '',
      provinceCode: '',
      cityCode: '',
      districtCode: ''
    };
  },
  validations: {
    addressModel: {
      name: {
        required: __WEBPACK_IMPORTED_MODULE_5_vuelidate_lib_validators__["required"],
        minLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_common_js_utils__["e" /* minLength */])(4),
        maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_common_js_utils__["f" /* maxLength */])(50)
      },
      mobile: {
        required: __WEBPACK_IMPORTED_MODULE_5_vuelidate_lib_validators__["required"],
        isValidMobileNumber: __WEBPACK_IMPORTED_MODULE_6_common_js_utils__["i" /* isValidMobileNumber */]
      },
      address: {
        required: __WEBPACK_IMPORTED_MODULE_5_vuelidate_lib_validators__["required"],
        minLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_common_js_utils__["e" /* minLength */])(10),
        maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_common_js_utils__["f" /* maxLength */])(250)
      },
      area: {
        required: __WEBPACK_IMPORTED_MODULE_5_vuelidate_lib_validators__["required"],
        minLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_common_js_utils__["e" /* minLength */])(5),
        maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_common_js_utils__["f" /* maxLength */])(90)
      },
      area_code: {
        required: __WEBPACK_IMPORTED_MODULE_5_vuelidate_lib_validators__["required"],
        minLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_common_js_utils__["e" /* minLength */])(5),
        maxLength: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_common_js_utils__["f" /* maxLength */])(30)
      }
    }
  },
  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['updateSelectedAddress']), {
    handleSubmit: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.processing) {
                  _context.next = 7;
                  break;
                }

                this.processing = true;
                _context.next = 4;
                return this.$acs.insertAddress({
                  name: this.addressModel.name,
                  mobile: this.addressModel.mobile,
                  area: this.addressModel.area,
                  area_code: this.addressModel.area_code,
                  address: this.addressModel.address
                });

              case 4:
                result = _context.sent;

                if (result.success) {
                  this.updateSelectedAddress(result.address);
                  this.$router.back();
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
    }(),
    onBtnBackClicked: function onBtnBackClicked() {
      if (this.canGoBack) {
        this.$router.back();
      } else if (this.inApp) {
        __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
          success: false
        });
      }
    },
    onSelect: function onSelect(province, city, district) {
      this.province = province.name;
      this.provinceCode = province.code;
      this.city = city.name;
      this.cityCode = city.code;
      this.district = district.name;
      this.districtCode = district.code;

      this.addressModel.area = this.district == "" ? null : this.province + "-" + this.city + "-" + this.district;
      this.addressModel.area_code = this.districtCode == "" ? null : this.provinceCode + "-" + this.cityCode + "-" + this.districtCode;
    }
  }),
  watch: {
    '$route': function $route(to, from) {
      this.canGoBack = history.state != null;
    }
  }
});

/***/ }),

/***/ 956:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_components_toast__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_common_js_filters__ = __webpack_require__(59);
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








/* harmony default export */ __webpack_exports__["default"] = ({
  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])(['shoppingCart', 'selectedAddress'])),

  mounted: function mounted() {
    this.goodsItem.goodsId = this.$route.params.goodsId ? this.$route.params.goodsId : this.shoppingCart.goodsId;
    this.goodsItem.quantity = this.$route.params.quantity ? this.$route.params.quantity : this.shoppingCart.quantity;
    if (this.goodsItem.goodsId && this.goodsItem.quantity) {
      this.getGoodsDetail();
    } else {
      this.$router.replace({
        name: 'goodsIndex',
        params: {
          appId: this.$route.params.appId
        }
      });
    }

    if (this.selectedAddress.id == 0) {
      this.getDefaultAddress();
    }
  },
  data: function data() {
    return {
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      goodsItem: {
        goodsId: "",
        quantity: 1,
        goods: {}
      },
      aliPayLoading: false,
      aliPayDisabled: false,
      wechatPayLoading: false,
      wechatPayDisabled: false,
      totalPrice: "0",
      orderId: ""
    };
  },
  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['updateShoppingCart', 'updateSelectedAddress']), {

    selectAddress: function selectAddress() {
      this.$router.push({
        name: 'selectAddress'
      });
    },

    isSupportWechat: function isSupportWechat() {
      return window.acsConfig.inApp && __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__["a" /* default */].isWechatPaySupport();
    },

    getPrice: function getPrice(price) {
      return "¥ " + __WEBPACK_IMPORTED_MODULE_4_common_js_filters__["formatPrice"](price);
    },
    onBtnBackClicked: function onBtnBackClicked() {
      if (this.canGoBack) {
        this.$router.back();
      } else if (this.inApp) {
        __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
          success: false
        });
      }
    },
    getDefaultAddress: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$acs.getDefaultAddress();

              case 2:
                result = _context.sent;

                if (result.success) {
                  if (result.address) {
                    this.updateSelectedAddress(result.address);
                  }
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getDefaultAddress() {
        return _ref.apply(this, arguments);
      }

      return getDefaultAddress;
    }(),
    getGoodsDetail: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$acs.getGoodsDetail(this.goodsItem.goodsId);

              case 2:
                result = _context2.sent;

                if (result.success) {
                  this.goodsItem.goods = result.goods;
                  this.totalPrice = parseFloat(this.goodsItem.goods.price * this.goodsItem.quantity + this.goodsItem.goods.postage);
                  this.updateShoppingCart(this.goodsItem);
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getGoodsDetail() {
        return _ref2.apply(this, arguments);
      }

      return getGoodsDetail;
    }(),
    onPrepay: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(payType) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.selectedAddress.id == 0)) {
                  _context3.next = 3;
                  break;
                }

                __WEBPACK_IMPORTED_MODULE_2_common_components_toast__["a" /* default */].show(this.$t('mall.order.addressPlaceholder'));
                return _context3.abrupt('return');

              case 3:
                _context3.t0 = payType;
                _context3.next = _context3.t0 === 'alipay' ? 6 : _context3.t0 === 'wechat' ? 9 : 12;
                break;

              case 6:
                this.aliPayLoading = true;
                this.wechatPayDisabled = true;
                return _context3.abrupt('break', 12);

              case 9:
                this.wechatPayLoading = true;
                this.aliPayDisabled = true;
                return _context3.abrupt('break', 12);

              case 12:
                //check stock
                this.checkStock(payType);

              case 13:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onPrepay(_x) {
        return _ref3.apply(this, arguments);
      }

      return onPrepay;
    }(),
    checkStock: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(payType) {
        var _this = this;

        var result, stock;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.$acs.getGoodsStock(this.goodsItem.goodsId);

              case 2:
                result = _context4.sent;

                if (result.success) {
                  stock = result.stock;

                  if (this.goodsItem.quantity > stock) {
                    __WEBPACK_IMPORTED_MODULE_2_common_components_toast__["a" /* default */].show(this.$t('mall.order.stockOut'));
                    this.aliPayLoading = false;
                    this.aliPayDisabled = false;
                    this.wechatPayLoading = false;
                    this.wechatPayDisabled = false;
                  } else {
                    this.prepay(payType);

                    setInterval(function () {
                      _this.aliPayLoading = false;
                      _this.aliPayDisabled = false;
                      _this.wechatPayLoading = false;
                      _this.wechatPayDisabled = false;
                    }, 3500);
                  }
                }

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function checkStock(_x2) {
        return _ref4.apply(this, arguments);
      }

      return checkStock;
    }(),
    prepay: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(payType) {
        var result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.$acs.createMallOrder(this.goodsItem.goodsId, parseInt(this.goodsItem.quantity), payType, this.selectedAddress);

              case 2:
                result = _context5.sent;

                if (!result.success) {
                  _context5.next = 12;
                  break;
                }

                this.orderId = result.order_id;
                _context5.t0 = payType;
                _context5.next = _context5.t0 === 'alipay' ? 8 : _context5.t0 === 'wechat' ? 10 : 12;
                break;

              case 8:
                this.alipayRedirect(this.orderId);
                return _context5.abrupt('break', 12);

              case 10:
                this.wechatPay(this.orderId);
                return _context5.abrupt('break', 12);

              case 12:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function prepay(_x3) {
        return _ref5.apply(this, arguments);
      }

      return prepay;
    }(),
    wechatPay: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(order_id) {
        var _this2 = this;

        var result;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.$acs.wechatMallPrepay(order_id);

              case 2:
                result = _context7.sent;

                if (result.success) {
                  __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__["a" /* default */].openWechatPayWithCallback(JSON.stringify(result), function () {
                    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(rst) {
                      return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                          switch (_context6.prev = _context6.next) {
                            case 0:
                              if (_this2.orderId) {
                                _this2.$router.push({
                                  name: 'myOrderDetail',
                                  params: {
                                    orderId: _this2.orderId
                                  }
                                });
                              }

                            case 1:
                            case 'end':
                              return _context6.stop();
                          }
                        }
                      }, _callee6, _this2);
                    }));

                    return function (_x5) {
                      return _ref7.apply(this, arguments);
                    };
                  }());
                }

              case 4:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function wechatPay(_x4) {
        return _ref6.apply(this, arguments);
      }

      return wechatPay;
    }(),
    alipayRedirect: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(order_id) {
        var result;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.$acs.alipayMallRedirect(order_id, window.location.protocol + '//' + window.location.hostname + window.location.pathname + '?merchant_order_id=' + order_id, window.location.protocol + '//' + window.location.hostname + window.location.pathname, window.location.protocol + '//' + window.location.hostname + '/api/pay/alipay/mall_notify');

              case 2:
                result = _context8.sent;

                if (result.success) {
                  window.location = result.redirect_uri;
                }

              case 4:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function alipayRedirect(_x6) {
        return _ref8.apply(this, arguments);
      }

      return alipayRedirect;
    }()
  }),
  watch: {
    '$route': function $route(to, from) {
      this.canGoBack = history.state != null;
    }
  }
});

/***/ }),

/***/ 957:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_utils__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_js_acs__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__ = __webpack_require__(49);
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
  components: {},
  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['selectedOrder'])),
  mounted: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              __WEBPACK_IMPORTED_MODULE_2_common_js_acs__["a" /* checkIsLogin */](function (_) {});

              if (!(this.selectedOrder.id == "")) {
                _context.next = 6;
                break;
              }

              _context.next = 4;
              return this.$acs.getMallOrder({
                order_id: this.$route.params.orderId
              });

            case 4:
              result = _context.sent;


              if (result.success) {
                this.updateSelectedOrder(result.order);
              }

            case 6:
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
      aliPayLoading: false,
      aliPayDisabled: false,
      wechatPayLoading: false,
      wechatPayDisabled: false
    };
  },
  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['updateSelectedOrder']), {
    isSupportWechat: function isSupportWechat() {
      return window.acsConfig.inApp && __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__["a" /* default */].isWechatPaySupport();
    },
    viewSnapshot: function viewSnapshot(goodsId) {
      var snapshot = this.selectedOrder.snapshots[goodsId];
      this.$router.push({
        name: 'goodsSnapshots',
        params: {
          goods: snapshot
        }
      });
    },

    onReOrder: function onReOrder() {
      this.$router.push({
        name: 'mallOrder',
        params: {
          goodsId: this.selectedOrder.details[0].mall_goods_id,
          quantity: this.selectedOrder.details[0].amount
        }
      });
    },
    onPrepay: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(payType) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = payType;
                _context2.next = _context2.t0 === 'alipay' ? 3 : _context2.t0 === 'wechat' ? 6 : 9;
                break;

              case 3:
                this.aliPayLoading = true;
                this.wechatPayDisabled = true;
                return _context2.abrupt('break', 9);

              case 6:
                this.wechatPayLoading = true;
                this.aliPayDisabled = true;
                return _context2.abrupt('break', 9);

              case 9:
                //check stock
                this.checkStock(payType);

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onPrepay(_x) {
        return _ref2.apply(this, arguments);
      }

      return onPrepay;
    }(),
    checkStock: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(payType) {
        var _this = this;

        var result, stock;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.$acs.getGoodsStock(this.selectedOrder.details[0].mall_goods_id);

              case 2:
                result = _context3.sent;

                if (!result.success) {
                  _context3.next = 21;
                  break;
                }

                stock = result.stock;

                if (!(this.selectedOrder.details[0].amount > stock)) {
                  _context3.next = 13;
                  break;
                }

                Toast.show(this.$t('mall.order.stockOut'));
                this.aliPayLoading = false;
                this.aliPayDisabled = false;
                this.wechatPayLoading = false;
                this.wechatPayDisabled = false;
                _context3.next = 21;
                break;

              case 13:
                _context3.t0 = payType;
                _context3.next = _context3.t0 === 'alipay' ? 16 : _context3.t0 === 'wechat' ? 18 : 20;
                break;

              case 16:
                this.alipayRedirect(this.selectedOrder.id);
                return _context3.abrupt('break', 20);

              case 18:
                this.wechatPay(this.selectedOrder.id);
                return _context3.abrupt('break', 20);

              case 20:
                setInterval(function () {
                  _this.aliPayLoading = false;
                  _this.aliPayDisabled = false;
                  _this.wechatPayLoading = false;
                  _this.wechatPayDisabled = false;
                }, 3500);

              case 21:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function checkStock(_x2) {
        return _ref3.apply(this, arguments);
      }

      return checkStock;
    }(),
    wechatPay: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(order_id) {
        var _this2 = this;

        var result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.$acs.wechatMallPrepay(order_id);

              case 2:
                result = _context5.sent;

                if (result.success) {
                  __WEBPACK_IMPORTED_MODULE_3_common_js_nativeApi__["a" /* default */].openWechatPayWithCallback(JSON.stringify(result), function () {
                    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(rst) {
                      return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                          switch (_context4.prev = _context4.next) {
                            case 0:
                              if (order_id) {
                                _this2.$router.push({
                                  name: 'myOrderDetail',
                                  params: {
                                    orderId: order_id
                                  }
                                });
                              }

                            case 1:
                            case 'end':
                              return _context4.stop();
                          }
                        }
                      }, _callee4, _this2);
                    }));

                    return function (_x4) {
                      return _ref5.apply(this, arguments);
                    };
                  }());
                }

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function wechatPay(_x3) {
        return _ref4.apply(this, arguments);
      }

      return wechatPay;
    }(),
    alipayRedirect: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(order_id) {
        var result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.$acs.alipayMallRedirect(order_id, window.location.protocol + '//' + window.location.hostname + window.location.pathname + '?merchant_order_id=' + order_id, window.location.protocol + '//' + window.location.hostname + window.location.pathname, window.location.protocol + '//' + window.location.hostname + '/api/pay/alipay/mall_notify');

              case 2:
                result = _context6.sent;

                if (result.success) {
                  window.location = result.redirect_uri;
                }

              case 4:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function alipayRedirect(_x5) {
        return _ref6.apply(this, arguments);
      }

      return alipayRedirect;
    }(),
    confirmRecieved: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var result;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.$acs.confirmRecieved({
                  order_id: this.selectedOrder.id
                });

              case 2:
                result = _context7.sent;

                if (result.success) {
                  this.order = result.order;
                }

              case 4:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function confirmRecieved() {
        return _ref7.apply(this, arguments);
      }

      return confirmRecieved;
    }()
  })
});

/***/ }),

/***/ 958:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_installed__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_common_components_toast__ = __webpack_require__(51);
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
  mounted: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.loadAddress();

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
      loading: false,
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      addressesList: []
    };
  },
  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['updateSelectedAddress']), {
    loadAddress: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$acs.getUserAddresses();

              case 2:
                result = _context2.sent;

                if (result.success) {
                  this.addressesList = result.addresses;
                }
                this.loading = true;

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadAddress() {
        return _ref2.apply(this, arguments);
      }

      return loadAddress;
    }(),
    selectAddress: function selectAddress(index) {
      this.updateSelectedAddress(this.addressesList[index]);
      this.$router.back();
    },
    newAddress: function newAddress() {
      this.$router.replace({
        name: 'newAddress'
      });
    }
  })
});

/***/ }),

/***/ 959:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_common_js_nativeApi__ = __webpack_require__(49);
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





/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      inApp: window.acsConfig.inApp,
      canGoBack: false
    };
  },

  created: function created() {},

  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["a" /* mapGetters */])(['transitionName'])),

  methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapActions */])(['setTransitionName']), {

    onBtnBackClicked: function onBtnBackClicked() {
      if (this.canGoBack) {
        this.$router.back();
      } else if (this.inApp) {
        __WEBPACK_IMPORTED_MODULE_1_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
          success: false
        });
      }
    }
  }),

  watch: {
    '$route': function $route(to, from) {
      this.canGoBack = history.state != null;
    }
  }
});

/***/ }),

/***/ 960:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
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





/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    var channels = [];

    if (__WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__["a" /* default */].isGGPlayPaySupported()) {
      channels.push('ggplay');
    } else {
      channels = __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__["a" /* default */].isWechatPaySupport() ? ['wechat', 'alipay'] : ['alipay'];
    }

    return {
      icon: window.acsConfig.goods_icon,
      channels: channels,
      activeChannel: channels[0],
      goodsName: window.acsConfig.goods_name,
      price: (window.acsConfig.price / 100).toFixed(2),
      currency: window.acsConfig.currency
    };
  },

  mounted: function mounted() {
    if (this.$route.query.result) {
      __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
        success: this.$route.query.result == "success",
        order_id: this.$route.query.out_trade_no,
        trade_no: this.$route.trade_no
      });
    }
  },

  methods: {
    setActiveChannel: function setActiveChannel(channel) {
      this.activeChannel = channel;
    },

    onPurchaseByChannel: function onPurchaseByChannel() {
      switch (this.activeChannel) {
        case 'alipay':
          this.alipayRedirect();
          break;

        case 'wechat':
          this.wechatPay();
          break;

        case 'ggplay':
          __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__["a" /* default */].closeWebviewWithResult({
            success: false,
            channel: 'ggplay',
            order_id: window.acsConfig.order_id,
            goods_id: window.acsConfig.goodsId
          });
          break;
      }
    },

    alipayRedirect: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.$acs.alipayRedirect(window.acsConfig.order_id, window.location.protocol + '//' + window.location.hostname + window.location.pathname + '?merchant_order_id=' + window.acsConfig.order_id, window.location.protocol + '//' + window.location.hostname + window.location.pathname);

              case 2:
                result = _context.sent;

                if (result.success) {
                  window.location = result.redirect_uri;
                }

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function alipayRedirect() {
        return _ref.apply(this, arguments);
      }

      return alipayRedirect;
    }(),

    wechatPay: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.$acs.wechatPrepay(window.acsConfig.order_id);

              case 2:
                result = _context2.sent;

                if (result.success) {
                  __WEBPACK_IMPORTED_MODULE_0_common_js_nativeApi__["a" /* default */].openWechatPay(JSON.stringify(result));
                }

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function wechatPay() {
        return _ref2.apply(this, arguments);
      }

      return wechatPay;
    }()
  }
});

/***/ }),

/***/ 961:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__citydata_json__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__citydata_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__citydata_json__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    this.provinces = __WEBPACK_IMPORTED_MODULE_0__citydata_json___default.a;
    this.oldProvince = this.province;
    this.oldCity = this.city;
    this.oldDistrict = this.district;

    if (this.oldProvince != "") {
      var seletedProvince = this.provinces.filter(function (item) {
        return item.code == this.province;
      }.bind(this));

      if (seletedProvince.length) {
        this.oldProvince = seletedProvince[0];
        this.cities = seletedProvince[0]['children'];
      }
      var seletedCity = this.cities.filter(function (item) {
        return item["code"] == this.city;
      }.bind(this));
      if (seletedCity.length) {
        this.oldCity = seletedCity[0];
        this.districts = seletedCity[0]['children'];
      }
    }
  },
  props: {
    _province: {
      twoWay: true,
      default: ''
    },
    _city: {
      twoWay: true,
      default: ''
    },
    _district: {
      twoWay: true,
      default: ''
    }
  },
  data: function data() {
    return {
      province: this._province,
      city: this._city,
      district: this._district,
      oldProvince: undefined,
      oldCity: undefined,
      oldDistrict: undefined,
      provinces: [],
      cities: [],
      districts: []
    };
  },

  methods: {
    onSelect: function onSelect() {}
  },
  watch: {
    province: function province() {
      var seletedItem = this.provinces.filter(function (item) {
        return item.code == this.province;
      }.bind(this));

      if (seletedItem.length) {
        this.oldProvince = seletedItem[0];
        this.cities = seletedItem[0]['children'];
        this.city = this.cities[0].code;
      } else {
        this.city = '';
        this.cities = [];
      }
    },
    city: function city() {
      var seletedItem = this.cities.filter(function (item) {
        return item.code == this.city;
      }.bind(this));
      if (seletedItem.length) {
        this.oldCity = seletedItem[0];
        this.districts = seletedItem[0]['children'];
        this.district = this.districts[0].code;
      } else {
        this.district = '';
        this.districts = [];
      }
    },
    district: function district() {
      var seletedItem = this.districts.filter(function (item) {
        return item.code == this.district;
      }.bind(this));

      if (seletedItem.length) {
        this.oldDistrict = seletedItem[0];
      }
      this.$emit('onSelect', this.oldProvince, this.oldCity, this.oldDistrict);
    }
  },
  computed: {}
});

/***/ }),

/***/ 963:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_image_crop_upload_upload_2_vue__ = __webpack_require__(1374);
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

/***/ })

},[1588]);
//# sourceMappingURL=app.js.map