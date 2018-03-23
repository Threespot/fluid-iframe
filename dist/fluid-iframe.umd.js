(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["fluid-iframeLink"] = factory();
	else
		root["fluid-iframeLink"] = factory();
})(window, function() {
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Wrap the last X words in an HTML tag to prevent them from wrapping (i.e. orphans)\n * @param {HTMLElement} el - iframe element\n * @param {Object} opts - Options\n * @param {number} [opts.defaultAspectRatio=9/16] - Fallback aspect ratio if height and width are undefined\n * @param {number|boolean} [opts.forceRatio=false] - Aspect ratio override (ignores iframe’s actual dimensions)\n * @param {boolean} [opts.inlineStyles=true] - Apply inline styles (set to “false” if using CSS)\n * @param {boolean} [opts.wrap=true] - Whether or not to add a wrapper div to the iframe. Setting to “false” means the video can’t be displayed wider than its original width.\n * @param {string} [opts.classes=\"\"] - Class(es) to add to the wrapper or iframe (depends on wrap option)\n */\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar FluidFrame = function FluidFrame(el, opts) {\n  _classCallCheck(this, FluidFrame);\n\n  var self = this;\n  this.el = el;\n\n  // Check if target element is an iframe\n  if (this.el.tagName.toLowerCase() !== \"iframe\") {\n    console.warn(\"FluidFrame only works on iframes, not <\" + this.el.tagName.toLowerCase() + \"> tags\");\n    return false;\n  }\n\n  // Use Object.assign() to merge “opts” object with default values in this.options\n  this.options = Object.assign({}, {\n    defaultAspectRatio: 9 / 16,\n    forceRatio: false, // set aspect ratio to use regardless of actual dimensions of iframe\n    inlineStyles: true, // apply inline styles to wrapper or iframe (depends on wrap option)\n    wrap: true, // adds a div wrapper around the iframe\n    classes: \"\" // custom class(es) to add to the wrapper or iframe (depends on wrap option)\n  }, opts);\n\n  // If inline styles are disabled, “classes” and “forceRatio” must be defined.\n  if (!this.options.inlineStyles && !this.options.classes && !this.options.forceRatio) {\n    console.warn(\"FluidFrame: If inline styles are disabled, a fixed aspect ratio must be defined along with custom classes.\");\n    return false;\n  }\n\n  // Get intrinsic dimensions\n  this.width = this.el.width ? parseInt(this.el.width) : this.el.offsetWidth;\n  this.height = this.el.height ? parseInt(this.el.height) : this.el.offsetHeight;\n\n  // Determine the aspect ratio\n  if (parseFloat(this.options.forceRatio)) {\n    this.aspectRatio = parseFloat(this.options.forceRatio);\n  } else {\n    this.aspectRatio = !this.width && !this.height ? this.options.defaultAspectRatio : this.height / this.width;\n  }\n\n  // Wrap iframe in div with padding-top equal to aspect ratio as a percentage\n  if (this.options.wrap) {\n    this.wrapper = document.createElement(\"div\");\n    this.el.parentNode.insertBefore(this.wrapper, this.el);\n    this.wrapper.appendChild(this.el);\n  }\n\n  // Check for custom classes\n  if (this.options.classes.length) {\n    // Check if string contains multiple classes\n    if (this.options.classes.indexOf(\" \") > -1) {\n      // Convert to array and remove empty items (caused by extra whitespace)\n      this.options.classes = this.options.classes.split(\" \").filter(function (n) {\n        return n.length;\n      });\n    } else {\n      // We still need to convert a single class to an array\n      // in order to use the spread syntax below.\n      this.options.classes = [this.options.classes];\n    }\n\n    // Add classes\n    if (this.options.wrap) {\n      var _wrapper$classList;\n\n      (_wrapper$classList = this.wrapper.classList).add.apply(_wrapper$classList, _toConsumableArray(this.options.classes));\n    } else {\n      var _el$classList;\n\n      (_el$classList = this.el.classList).add.apply(_el$classList, _toConsumableArray(this.options.classes));\n    }\n  }\n\n  // Add inline styles\n  if (this.options.inlineStyles) {\n    if (this.options.wrap) {\n      this.wrapper.setAttribute(\"style\", \"padding-top: \" + 100 * this.aspectRatio + \"%; position: relative;\");\n\n      // Set iframe to absolutely fill the parent div\n      this.el.setAttribute(\"style\", \"height: 100%; left: 0; position: absolute; top: 0; width: 100%;\");\n    } else {\n      // Inspired by https://github.com/dollarshaveclub/reframe.js#-noframejs\n      this.el.setAttribute(\"style\", \"display: block; height: \" + 100 * this.aspectRatio + \"vw; margin-left: auto; margin-right: auto; max-height: \" + this.height + \"px; max-width: 100%; width: \" + this.width + \"px;\");\n    }\n  }\n};\n\nexports.default = FluidFrame;\n\n//# sourceURL=webpack://%5Bname%5DLink/./index.js?");

/***/ })

/******/ });
});
//# sourceMappingURL=fluid-iframe.umd.js.map