(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JsonTreeViewer"] = factory();
	else
		root["JsonTreeViewer"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(15)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getValue; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__checkVarType__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__genTreeData__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__genTreeData__["a"]; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




var utils = _extends({}, __WEBPACK_IMPORTED_MODULE_0__checkVarType__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__genTreeData__["a" /* default */]);

var getKey = function getKey(data) {
  var keyNameQuote = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'double';

  if (!isNaN(data.key) || !keyNameQuote) {
    return data.key;
  }
  switch (keyNameQuote) {
    case 'double':
      return '"' + data.key + '"';
    case 'single':
      return '\'' + data.key + '\'';
    default:
      throw new Error('Params Error at keyNameQuote.');
  }
};
var isString = utils.isString,
    isNumber = utils.isNumber,
    isNull = utils.isNull,
    isUndefined = utils.isUndefined,
    isBoolean = utils.isBoolean,
    isFunction = utils.isFunction;

var getValue = function getValue(data) {
  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { parseLink: true, valueNameQuote: 'double' };
  var value = data.value;

  var divider = opt.valueNameQuote === 'single' ? '\'' : '"';
  if (isNumber(value) || isBoolean(value)) {
    return value;
  } else if (isString(value)) {
    var linkReg = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
    if (opt.parseLink && linkReg.test(value)) {
      return value.replace(linkReg, '<a href="$1" target="_blank"/>$1</a>');
    } else {
      return ('"' + value + '"').replace(/^"|"$/g, divider);
    }
  } else if (isNull(value) || isUndefined(value)) {
    return 'null';
  } else if (isFunction(value)) {
    return '&lt;function&gt;';
  } else {
    return ('"' + value + '"').replace(/^"|"$/g, divider);
  }
};
/* harmony default export */ __webpack_exports__["a"] = (utils);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__JsonTreeViewItem__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__options__ = __webpack_require__(28);
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'JsonTreeViewer',
  components: {
    JsonTreeViewItem: __WEBPACK_IMPORTED_MODULE_1__JsonTreeViewItem__["a" /* default */]
  },
  data: function data() {
    return {
      treeData: {},
      opt: {}
    };
  },

  props: {
    value: {
      type: [Object, Array, String],
      default: function _default() {
        return {};
      }
    },
    options: {
      type: Object,
      default: function _default() {
        return __WEBPACK_IMPORTED_MODULE_2__options__["a" /* default */];
      }
    }
  },
  created: function created() {
    this.opt = Object.assign({}, __WEBPACK_IMPORTED_MODULE_2__options__["a" /* default */], this.options);
    this.treeData = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* genJsonTree */])(this.value, this.opt);
  }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var SUPPORT_VARIABLE_TYPE = ['Number', 'Boolean', 'Null', 'Object', 'Function', 'Array', 'String', 'Undefined'];
var checkFunction = {};
SUPPORT_VARIABLE_TYPE.map(function (item) {
  checkFunction['is' + item] = function (value) {
    return Object.prototype.toString.call(value) === '[object ' + item + ']';
  };
});
checkFunction.isBase = function (value) {
  return !checkFunction.isArray(value) && !checkFunction.isObject(value);
};
/* harmony default export */ __webpack_exports__["a"] = (checkFunction);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_JsonTreeViewItem_vue__ = __webpack_require__(7);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_c63f988a_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_JsonTreeViewItem_vue__ = __webpack_require__(27);
function injectStyle (ssrContext) {
  __webpack_require__(17)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_JsonTreeViewItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_c63f988a_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_JsonTreeViewItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__render__ = __webpack_require__(19);
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'JsonTreeViewItem',
  props: ['treeNode', 'options', 'currentDepth'],
  data: function data() {
    return {
      renderComponent: null
    };
  },
  created: function created() {
    console.log(this.treeNode);
    this.renderComponent = __WEBPACK_IMPORTED_MODULE_0__render__["a" /* default */][this.treeNode.type];
  }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_JsonTreeViewBase_vue__ = __webpack_require__(9);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_4163969a_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_JsonTreeViewBase_vue__ = __webpack_require__(22);
function injectStyle (ssrContext) {
  __webpack_require__(20)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_JsonTreeViewBase_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_4163969a_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_JsonTreeViewBase_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(3);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var isString = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isString,
    isNull = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isNull,
    isNumber = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isNumber,
    isBoolean = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isBoolean,
    isFunction = __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* default */].isFunction;

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'JsonTreeViewBase',
  props: ['treeNode', 'options'],
  data: function data() {
    return {
      key: '',
      value: '',
      className: '',
      keyClassName: '',
      typemaps: {
        isString: isString,
        isNull: isNull,
        isNumber: isNumber,
        isBoolean: isBoolean,
        isFunction: isFunction
      }
    };
  },
  created: function created() {
    this.key = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* getKey */])(this.treeNode, this.options.keyNameQuote);
    this.value = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* getValue */])(this.treeNode, this.options);
    this.valueClassName = this.getClassName();
    this.keyClassName = isNaN(this.treeNode.key) ? _typeof(this.treeNode.key) : 'number';
  },

  methods: {
    getClassName: function getClassName() {
      for (var key in this.typemaps) {
        if (this.typemaps[key](this.treeNode.value)) {
          return key.replace(/is/g, '').toLowerCase();
        }
      }
    }
  }
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(3);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'JsonTreeViewObject',
  props: ['treeNode', 'options', 'currentDepth'],
  data: function data() {
    return {
      key: '',
      len: 0,
      unit: {
        object: ['property', 'propertys'],
        array: ['item', 'items']
      },
      property: '',
      keyClassName: '',
      isOpen: false
    };
  },

  methods: {
    toggle: function toggle() {
      this.isOpen = !this.isOpen;
      this.treeNode.isOpen = this.isOpen;
      this.treeNode.init = true;
    }
  },
  created: function created() {
    if (!this.treeNode.init) {
      this.isOpen = this.treeNode.isOpen && this.currentDepth < this.options.defaultOpenDepth;
    } else {
      this.isOpen = this.treeNode.isOpen;
    }

    if (this.options.hints) {
      this.unit = this.options.hints;
      this.len = this.treeNode.children.length;
      var unit = this.unit[this.treeNode.type];
      this.property = this.len > 1 ? unit[1] : unit[0];
    }
    this.key = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* getKey */])(this.treeNode, this.options.keyNameQuote);
    this.keyClassName = isNaN(this.treeNode.key) ? _typeof(this.treeNode.key) : 'number';
  },

  computed: {
    isShowHint: function isShowHint() {
      return !this.isOpen && this.options.hints;
    }
  }
});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_JsonTreeViewer__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_JsonTreeViewItem__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_JsonTreeViewBase__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "JsonTreeViewer", function() { return __WEBPACK_IMPORTED_MODULE_0__components_JsonTreeViewer__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "JsonTreeViewItem", function() { return __WEBPACK_IMPORTED_MODULE_1__components_JsonTreeViewItem__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "JsonTreeViewBase", function() { return __WEBPACK_IMPORTED_MODULE_2__components_JsonTreeViewBase__["a"]; });




if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('JsonTreeViewer', __WEBPACK_IMPORTED_MODULE_0__components_JsonTreeViewer__["a" /* default */]);
  window.Vue.component('JsonTreeViewItem', __WEBPACK_IMPORTED_MODULE_1__components_JsonTreeViewItem__["a" /* default */]);
  window.Vue.component('JsonTreeViewBase', __WEBPACK_IMPORTED_MODULE_2__components_JsonTreeViewBase__["a" /* default */]);
}

var install = function install(Vue) {
  Vue.component('JsonTreeViewer', __WEBPACK_IMPORTED_MODULE_0__components_JsonTreeViewer__["a" /* default */]);
  Vue.component('JsonTreeViewItem', __WEBPACK_IMPORTED_MODULE_1__components_JsonTreeViewItem__["a" /* default */]);
  Vue.component('JsonTreeViewBase', __WEBPACK_IMPORTED_MODULE_2__components_JsonTreeViewBase__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["default"] = (install);



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_JsonTreeViewer_vue__ = __webpack_require__(4);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_7f588792_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_JsonTreeViewer_vue__ = __webpack_require__(29);
function injectStyle (ssrContext) {
  __webpack_require__(13)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_JsonTreeViewer_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_7f588792_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_JsonTreeViewer_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("6458cef8", content, true, {});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.json-tree-container {\n  font-family: \"Consolas\", \"Menlo\", \"Courier\", \"monospace\";\n  position: relative;\n  width: 100%;\n  color: #666;\n  font-size: 14px;\n}\n", "", {"version":3,"sources":["G:/webStack/Vue/json-tree-viewer/src/components/JsonTreeViewer.vue"],"names":[],"mappings":";AACA;EACE,yDAAyD;EACzD,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,gBAAgB;CACjB","file":"JsonTreeViewer.vue","sourcesContent":["\n.json-tree-container {\n  font-family: \"Consolas\", \"Menlo\", \"Courier\", \"monospace\";\n  position: relative;\n  width: 100%;\n  color: #666;\n  font-size: 14px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__checkVarType__ = __webpack_require__(5);

var isArray = __WEBPACK_IMPORTED_MODULE_0__checkVarType__["a" /* default */].isArray,
    isObject = __WEBPACK_IMPORTED_MODULE_0__checkVarType__["a" /* default */].isObject,
    isBase = __WEBPACK_IMPORTED_MODULE_0__checkVarType__["a" /* default */].isBase;


var transformArray = function transformArray(key, value) {
  var isOpen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isSortable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var isEditable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  return {
    key: key,
    type: 'array',
    children: genChildTreeData(value, isOpen, isSortable),
    isOpen: isOpen,
    init: false,
    editable: isEditable
  };
};

var transformObject = function transformObject(key, value) {
  var isRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isOpen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var isSortable = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var isEditable = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  return {
    key: key,
    children: genChildTreeData(value, isOpen, isSortable, isEditable),
    isRoot: isRoot,
    type: 'object',
    isOpen: isOpen,
    init: false,
    editable: isEditable
  };
};

var transformBase = function transformBase(key, value) {
  var isEditable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return {
    key: key,
    value: value,
    type: 'base',
    editable: isEditable
  };
};

var genChildTreeData = function genChildTreeData(list) {
  var isOpen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var isSortable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isEditable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var children = [];
  for (var key in list) {
    var item = list[key];
    if (isArray(item)) {
      children.push(transformArray(key, item, isOpen, isSortable, isEditable));
    } else if (isObject(item)) {
      children.push(transformObject(key, item, false, isOpen, isSortable, isEditable));
    } else if (isBase(item)) {
      children.push(transformBase(key, item, isEditable));
    } else {
      children.push('unknow');
    }
  }
  if (isSortable) {
    children.sort(function (a, b) {
      var aKey = a.key;
      var bKey = b.key;
      if (aKey > bKey) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  return children;
};

var genJsonTree = function genJsonTree(data, options) {
  var rootKeyName = options.rootKeyName,
      defaultOpen = options.defaultOpen,
      sortable = options.sortable,
      editable = options.editable;

  if (isBase(data)) {
    return transformBase(rootKeyName, data, editable);
  }
  return transformObject(rootKeyName, data, true, defaultOpen, sortable, editable);
};

/* harmony default export */ __webpack_exports__["a"] = (genJsonTree);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("d7c4de68", content, true, {});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.json-tree-item {\n  padding-left: 14px;\n}\n", "", {"version":3,"sources":["G:/webStack/Vue/json-tree-viewer/src/components/JsonTreeViewItem.vue"],"names":[],"mappings":";AACA;EACE,mBAAmB;CACpB","file":"JsonTreeViewItem.vue","sourcesContent":["\n.json-tree-item {\n  padding-left: 14px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__JsonTreeViewBase__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__JsonTreeViewObject__ = __webpack_require__(23);


var renderComponentMaps = {
  base: __WEBPACK_IMPORTED_MODULE_0__JsonTreeViewBase__["a" /* default */],
  array: __WEBPACK_IMPORTED_MODULE_1__JsonTreeViewObject__["a" /* default */],
  object: __WEBPACK_IMPORTED_MODULE_1__JsonTreeViewObject__["a" /* default */]
};

/* harmony default export */ __webpack_exports__["a"] = (renderComponentMaps);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("b4fec9d2", content, true, {});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.json-tree-view-base .json-tree-view-base-key.json-tree-view-base-key-number {\n  font-weight: normal;\n  color: #881391;\n}\n.json-tree-view-base .json-tree-view-base-value.json-tree-view-base-value-string {\n  color: #c41a16;\n}\n.json-tree-view-base .json-tree-view-base-value.json-tree-view-base-value-number {\n  color: #1c00cf;\n}\n.json-tree-view-base .json-tree-view-base-value.json-tree-view-base-value-boolean {\n  color: #0d22aa;\n}\n.json-tree-view-base .json-tree-view-base-value.json-tree-view-base-value-function {\n  color: #067bca;\n}\n.json-tree-view-base .json-tree-view-base-value.json-tree-view-base-value-null {\n  color: #e08331;\n}\n.json-tree-view-base .json-tree-view-base-value.json-tree-view-base-value-undefined {\n  color: #e08331;\n}\n.json-tree-view-base .json-tree-view-base-value a {\n  color: #0366d6;\n}\n", "", {"version":3,"sources":["G:/webStack/Vue/json-tree-viewer/src/components/JsonTreeViewBase.vue"],"names":[],"mappings":";AACA;EACE,oBAAoB;EACpB,eAAe;CAChB;AACD;EACE,eAAe;CAChB;AACD;EACE,eAAe;CAChB;AACD;EACE,eAAe;CAChB;AACD;EACE,eAAe;CAChB;AACD;EACE,eAAe;CAChB;AACD;EACE,eAAe;CAChB;AACD;EACE,eAAe;CAChB","file":"JsonTreeViewBase.vue","sourcesContent":["\n.json-tree-view-base .json-tree-view-base-key.json-tree-view-base-key-number {\n  font-weight: normal;\n  color: #881391;\n}\n.json-tree-view-base .json-tree-view-base-value.json-tree-view-base-value-string {\n  color: #c41a16;\n}\n.json-tree-view-base .json-tree-view-base-value.json-tree-view-base-value-number {\n  color: #1c00cf;\n}\n.json-tree-view-base .json-tree-view-base-value.json-tree-view-base-value-boolean {\n  color: #0d22aa;\n}\n.json-tree-view-base .json-tree-view-base-value.json-tree-view-base-value-function {\n  color: #067bca;\n}\n.json-tree-view-base .json-tree-view-base-value.json-tree-view-base-value-null {\n  color: #e08331;\n}\n.json-tree-view-base .json-tree-view-base-value.json-tree-view-base-value-undefined {\n  color: #e08331;\n}\n.json-tree-view-base .json-tree-view-base-value a {\n  color: #0366d6;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"json-tree-view-base"},[_c('span',{staticClass:"json-tree-view-base-key",class:("json-tree-view-base-key-" + _vm.keyClassName),style:({
    color:_vm.options.styles.key[_vm.keyClassName]
  })},[_vm._v(_vm._s(_vm.key)+":")]),_vm._v(" "),_c('span',{staticClass:"json-tree-view-base-value",class:("json-tree-view-base-value-" + _vm.valueClassName),style:({
     color:_vm.options.styles.value[_vm.valueClassName]
   }),domProps:{"innerHTML":_vm._s(_vm.value)}})])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_JsonTreeViewObject_vue__ = __webpack_require__(10);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_1c60786a_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_JsonTreeViewObject_vue__ = __webpack_require__(26);
function injectStyle (ssrContext) {
  __webpack_require__(24)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_script_index_0_JsonTreeViewObject_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_7_3_vue_loader_lib_template_compiler_index_id_data_v_1c60786a_hasScoped_false_transformToRequire_video_src_poster_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_13_7_3_vue_loader_lib_selector_type_template_index_0_JsonTreeViewObject_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("1b315a5a", content, true, {});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.json-tree-item-leaf {\n  position: relative;\n}\n.json-tree-item-leaf .json-tree-item-node .json-tree-item-key {\n  font-weight: bold;\n  cursor: pointer;\n}\n.json-tree-item-leaf .json-tree-item-node .json-tree-item-key.json-tree-item-key-number {\n  font-weight: normal;\n  color: #881391;\n}\n.json-tree-item-leaf .json-tree-item-node .json-tree-item-key::before {\n  content: \"\";\n  position: absolute;\n  top: 3px;\n  left: -16px;\n  width: 1px;\n  height: 0;\n  border: 10px solid transparent;\n  border-top-color: #555;\n  border-width: 10px 8px;\n  border-radius: 3px;\n  overflow: hidden;\n  color: #555;\n  font-size: 12px;\n  -webkit-transform-origin: center 5px;\n          transform-origin: center 5px;\n  -webkit-transform: scale(0.7) rotate(-90deg);\n          transform: scale(0.7) rotate(-90deg);\n  -webkit-transition: all 0.35s;\n  transition: all 0.35s;\n}\n.json-tree-item-leaf .json-tree-item-node.opened .json-tree-item-key::before {\n  -webkit-transform: scale(0.7) rotate(0);\n          transform: scale(0.7) rotate(0);\n}\n.json-tree-item-leaf .json-tree-item-node .json-tree-item-hint {\n  color: #ddd;\n}\n.json-tree-item-leaf .json-tree-item-node .json-tree-item-ellipsis i {\n  display: inline-block;\n  height: 14px;\n  line-height: 7px;\n  background-color: #f9f9f9;\n  color: orangered;\n  letter-spacing: -2px;\n  border-radius: 3px;\n  vertical-align: middle;\n  padding: 0 3px;\n  margin: 0 5px;\n  cursor: pointer;\n}\n", "", {"version":3,"sources":["G:/webStack/Vue/json-tree-viewer/src/components/JsonTreeViewObject.vue"],"names":[],"mappings":";AACA;EACE,mBAAmB;CACpB;AACD;EACE,kBAAkB;EAClB,gBAAgB;CACjB;AACD;EACE,oBAAoB;EACpB,eAAe;CAChB;AACD;EACE,YAAY;EACZ,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,WAAW;EACX,UAAU;EACV,+BAA+B;EAC/B,uBAAuB;EACvB,uBAAuB;EACvB,mBAAmB;EACnB,iBAAiB;EACjB,YAAY;EACZ,gBAAgB;EAChB,qCAAqC;UAC7B,6BAA6B;EACrC,6CAA6C;UACrC,qCAAqC;EAC7C,8BAA8B;EAC9B,sBAAsB;CACvB;AACD;EACE,wCAAwC;UAChC,gCAAgC;CACzC;AACD;EACE,YAAY;CACb;AACD;EACE,sBAAsB;EACtB,aAAa;EACb,iBAAiB;EACjB,0BAA0B;EAC1B,iBAAiB;EACjB,qBAAqB;EACrB,mBAAmB;EACnB,uBAAuB;EACvB,eAAe;EACf,cAAc;EACd,gBAAgB;CACjB","file":"JsonTreeViewObject.vue","sourcesContent":["\n.json-tree-item-leaf {\n  position: relative;\n}\n.json-tree-item-leaf .json-tree-item-node .json-tree-item-key {\n  font-weight: bold;\n  cursor: pointer;\n}\n.json-tree-item-leaf .json-tree-item-node .json-tree-item-key.json-tree-item-key-number {\n  font-weight: normal;\n  color: #881391;\n}\n.json-tree-item-leaf .json-tree-item-node .json-tree-item-key::before {\n  content: \"\";\n  position: absolute;\n  top: 3px;\n  left: -16px;\n  width: 1px;\n  height: 0;\n  border: 10px solid transparent;\n  border-top-color: #555;\n  border-width: 10px 8px;\n  border-radius: 3px;\n  overflow: hidden;\n  color: #555;\n  font-size: 12px;\n  -webkit-transform-origin: center 5px;\n          transform-origin: center 5px;\n  -webkit-transform: scale(0.7) rotate(-90deg);\n          transform: scale(0.7) rotate(-90deg);\n  -webkit-transition: all 0.35s;\n  transition: all 0.35s;\n}\n.json-tree-item-leaf .json-tree-item-node.opened .json-tree-item-key::before {\n  -webkit-transform: scale(0.7) rotate(0);\n          transform: scale(0.7) rotate(0);\n}\n.json-tree-item-leaf .json-tree-item-node .json-tree-item-hint {\n  color: #ddd;\n}\n.json-tree-item-leaf .json-tree-item-node .json-tree-item-ellipsis i {\n  display: inline-block;\n  height: 14px;\n  line-height: 7px;\n  background-color: #f9f9f9;\n  color: orangered;\n  letter-spacing: -2px;\n  border-radius: 3px;\n  vertical-align: middle;\n  padding: 0 3px;\n  margin: 0 5px;\n  cursor: pointer;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"json-tree-item-leaf"},[_c('div',{staticClass:"json-tree-item-node",class:{opened:_vm.isOpen}},[_c('span',{staticClass:"json-tree-item-key",class:("json-tree-item-key-" + _vm.keyClassName),style:({
           color:_vm.options.styles.key[_vm.keyClassName]
           }),on:{"click":_vm.toggle}},[_vm._v(_vm._s(_vm.key)+":")]),_vm._v(" "),(_vm.isShowHint)?_c('span',{staticClass:"json-tree-item-hint"},[_vm._v(_vm._s(_vm.len)+" "+_vm._s(_vm.property))]):_vm._e(),_vm._v(" "),(!_vm.isOpen && !_vm.isShowHint && _vm.treeNode.type=='object')?_c('span',{staticClass:"json-tree-item-ellipsis"},[_vm._v("{"),_c('i',{on:{"click":_vm.toggle}},[_vm._v("...")]),_vm._v("}")]):_vm._e(),_vm._v(" "),(!_vm.isOpen && !_vm.isShowHint && _vm.treeNode.type=='array')?_c('span',{staticClass:"json-tree-item-ellipsis"},[_vm._v("["),_c('i',{on:{"click":_vm.toggle}},[_vm._v("...")]),_vm._v("]")]):_vm._e()]),_vm._v(" "),(_vm.isOpen)?_c('div',_vm._l((_vm.treeNode.children),function(childNode){return _c('JsonTreeViewItem',{key:childNode.key,attrs:{"treeNode":childNode,"options":_vm.options,"current-depth":_vm.currentDepth+1}})}),1):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"json-tree-item"},[_c(_vm.renderComponent,{tag:"component",attrs:{"treeNode":_vm.treeNode,"options":_vm.options,"current-depth":_vm.currentDepth}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// default options
var defaultOptions = {
  defaultOpen: true, // default extend
  rootKeyName: 'root', // root key name
  editable: false, //
  sortable: false, // sortable for key
  defaultOpenDepth: 1, // default extend max depth
  styles: { // Text color
    key: { // key text color
      string: '#555',
      number: '#881391'
    },
    value: { // value text color
      string: '#c41a16',
      number: ' #1c00cf',
      boolean: '#0d22aa',
      null: '#e08331',
      undefined: '#e08331',
      function: '#067bca'
    }
  },
  parseLink: true, // Parsing text link
  keyNameQuote: false, // The key name quote  value: false / single / double
  valueNameQuote: 'double', //  single / double
  hints: { // Prompt when folding word
    array: ['item', 'items'],
    object: ['property', 'propertys']
  }
};

/* harmony default export */ __webpack_exports__["a"] = (defaultOptions);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"json-tree-container"},[_c('JsonTreeViewItem',{staticClass:"json-tree-item-root",attrs:{"treeNode":_vm.treeData,"options":_vm.opt,"current-depth":0}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map