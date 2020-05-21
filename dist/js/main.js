/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  // ** V A R I A B I L I ** // 
  var list = $(".main-element");
  var input = $(".input");
  var status = false;
  var result = $(".result");
  var home = $("#home");
  var source = $("#card-template").html();
  var template = Handlebars.compile(source);
  run(list, template, status);
  input.keypress(function (e) {
    if (e.which == 13) {
      if (input.val() !== "") {
        status = true;
        resetList(list);
        searchRun(list, template, input, status, result);
        ;
      } else {
        resetList(list);
        result.text("Inserisci un valore");
        status = false;
      }
    }
  });
  home.click(function () {
    resetList(list);
    run(list, template, status);
  });
}); // end document ready
//** F U N C T I O N S **//
//R U N 

function run(list, template, status) {
  $.ajax({
    url: 'http://localhost:8888/php-ajax-dischi/dist/partials/db-json.php',
    method: 'GET',
    success: function success(data) {
      getResults(data, list, template, status);
    },
    error: function error() {
      console.log("errore chiamata api");
    }
  });
} //S E A R C H  R U N 


function searchRun(list, template, input, status, text) {
  var value = input.val().trim();
  $.ajax({
    url: 'http://localhost:8888/php-ajax-dischi/dist/partials/db-json.php',
    method: 'GET',
    success: function success(data) {
      getResults(data, list, template, value, status, text);
    },
    error: function error() {
      console.log("errore chiamata api");
    }
  });
} //G E T  R E S U L T S 


function getResults(data, list, template, value, status, text) {
  if (status) {
    for (var i = 0; i < data.length; i++) {
      if (value == data[i].author) {
        var current = data[i];
        var result = {
          poster: current.poster,
          title: current.title,
          author: current.author,
          year: current.year
        };
        text.text("I tuoi risultati per: " + value);
        append(result, list, template);
      }
    }
  } else {
    for (var i = 0; i < data.length; i++) {
      var current = data[i];
      var result = {
        poster: current.poster,
        title: current.title,
        author: current.author,
        year: current.year
      };
      append(result, list, template);
    }
  }
} //R E S E T  L I S T 


function resetList(list) {
  list.children().remove();
} //A P P E N D


function append(result, list, template) {
  var set = template(result);
  list.append(set);
}

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***************************************************!*\
  !*** multi ./src/js/main.js ./src/scss/main.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Applications/MAMP/htdocs/php-ajax-dischi/src/js/main.js */"./src/js/main.js");
module.exports = __webpack_require__(/*! /Applications/MAMP/htdocs/php-ajax-dischi/src/scss/main.scss */"./src/scss/main.scss");


/***/ })

/******/ });