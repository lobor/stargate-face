/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _toolboxFront = __webpack_require__(1);

	var _navigation = __webpack_require__(2);

	var _navigation2 = _interopRequireDefault(_navigation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var conf = __webpack_require__(3);
	//
	// import Routes from './routes/routes';

	__webpack_require__(4);

	(0, _toolboxFront.setNavigation)(_navigation2.default, conf.name);
	// setRoutes(Routes);

	// event for delete plugin
	window.addEventListener('face:delete', function (e) {
	  (0, _toolboxFront.deleteRoutes)(Routes);
	  (0, _toolboxFront.deleteNavigation)(_navigation2.default);
	}, false);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	/**
	 * Toolbox of front for add, remove navigation and routes on General app of react
	 */

	var app = window.App;

	function setNavigation(navigation, name) {
	  if (name) {
	    navigation = navigation.map(function (el) {
	      el.plugin = name;
	      return el;
	    });
	  }
	  var navApp = app.state.navigation;
	  navApp = navApp.concat(navigation);
	  app.setState({ navigation: navApp });
	}

	function setRoutes(routes) {
	  var routesApp = app.state.routes;
	  routesApp = routesApp.concat(routes);
	  app.setState({ routes: routesApp });
	}

	function deleteNavigation(navigation) {
	  var navApp = app.state.navigation;
	  navApp = navApp.filter(function (nav) {
	    return -1 === navigation.indexOf(nav);
	  });
	  app.setState({ navigation: navApp });
	}

	function deleteRoutes(routes) {
	  var routesApp = app.state.routes;
	  routesApp = routesApp.filter(function (route) {
	    return -1 === routes.indexOf(route);
	  });
	  app.setState({ routes: routesApp });
	}

	function setConfig(name, config) {
	  app.setState({ config: _defineProperty({}, name, config) });
	}

	module.exports = {
	  setNavigation: setNavigation,
	  setRoutes: setRoutes,
	  deleteNavigation: deleteNavigation,
	  deleteRoutes: deleteRoutes,
	  setConfig: setConfig
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	module.exports = [{
		"label": "faceRecognition",
		"href": "/face",
		"icon": "camera alt"
	}];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  name: 'face',
	  collections: []
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var conf = __webpack_require__(3);

	Lang.addTrad({
	  en: _defineProperty({}, conf.name, __webpack_require__(5)),
	  fr: _defineProperty({}, conf.name, __webpack_require__(6))
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  faceRecognition: 'Face recognition'
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  faceRecognition: 'Reconnaissance faciale'
	};

/***/ }
/******/ ]);