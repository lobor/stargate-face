/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _toolboxFront = __webpack_require__(1);
	
	var _routes = __webpack_require__(2);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _navigation = __webpack_require__(17);
	
	var _navigation2 = _interopRequireDefault(_navigation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//
	var conf = __webpack_require__(18);
	__webpack_require__(19);
	
	(0, _toolboxFront.setNavigation)(_navigation2.default, conf.name);
	(0, _toolboxFront.setRoutes)(_routes2.default);
	
	// event for delete plugin
	window.addEventListener('face:delete', function (e) {
	  (0, _toolboxFront.deleteRoutes)(_routes2.default);
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Face = __webpack_require__(3);
	
	var _Face2 = _interopRequireDefault(_Face);
	
	var _EditCollection = __webpack_require__(13);
	
	var _EditCollection2 = _interopRequireDefault(_EditCollection);
	
	var _NewCollection = __webpack_require__(16);
	
	var _NewCollection2 = _interopRequireDefault(_NewCollection);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = [{
		pattern: '/face',
		component: _Face2.default,
		name: 'face',
		exactly: false
	}, {
		pattern: '/face/collections/edit/:id',
		component: _EditCollection2.default,
		name: 'edit_collection',
		exactly: true
	}, {
		pattern: '/face/collections/new',
		component: _NewCollection2.default,
		name: 'new_collection',
		exactly: true
	}];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ListRecognized = __webpack_require__(4);
	
	var _ListRecognized2 = _interopRequireDefault(_ListRecognized);
	
	var _ListNotRecognized = __webpack_require__(7);
	
	var _ListNotRecognized2 = _interopRequireDefault(_ListNotRecognized);
	
	var _ListCollections = __webpack_require__(12);
	
	var _ListCollections2 = _interopRequireDefault(_ListCollections);
	
	var _EditCollection = __webpack_require__(13);
	
	var _EditCollection2 = _interopRequireDefault(_EditCollection);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // import FormChangePassword from 'components/forms/user/changePassword.jsx';
	// import EditUser from 'components/forms/user/edit.jsx';
	// import ListUser from 'components/user/listUser.jsx';
	// // import NewUser from 'components/user/newUser.jsx';
	
	
	var Result = function (_React$Component) {
	  _inherits(Result, _React$Component);
	
	  function Result() {
	    _classCallCheck(this, Result);
	
	    var _this = _possibleConstructorReturn(this, (Result.__proto__ || Object.getPrototypeOf(Result)).call(this));
	
	    _this.state = {
	      redirect: false,
	      buttons: [{
	        title: "Recognized",
	        url: '/face',
	        component: _ListRecognized2.default
	      }, {
	        title: "Not recognized",
	        url: '/face/notrecognized',
	        component: _ListNotRecognized2.default
	      }, {
	        title: "Collections",
	        url: '/face/collections',
	        component: _ListCollections2.default
	      }]
	    };
	    return _this;
	  }
	
	  _createClass(Result, [{
	    key: 'goTo',
	    value: function goTo(redirect) {
	      this.setState({ redirect: redirect });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.state.redirect) {
	        return React.createElement(ReactRouter.Redirect, { to: this.state.redirect });
	      }
	
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          Ui.Toolbar,
	          null,
	          React.createElement(
	            Ui.ToolbarGroup,
	            { style: { alignItems: "center" } },
	            React.createElement(Ui.ToolbarTitle, { text: 'Face recognition' }),
	            this.state.buttons.map(function (button, i) {
	              return React.createElement(
	                ReactRouter.Link,
	                { key: i, to: button.url, isActive: function isActive(location) {
	                    return location.pathname === button.url;
	                  } },
	                function (_ref) {
	                  var isActive = _ref.isActive;
	                  var location = _ref.location;
	                  var href = _ref.href;
	                  var onClick = _ref.onClick;
	                  var transition = _ref.transition;
	                  return React.createElement(Ui.FlatButton, { primary: isActive, onClick: onClick, href: href, key: i, label: button.title });
	                }
	              );
	            })
	          )
	        ),
	        React.createElement(
	          'div',
	          null,
	          this.state.buttons.map(function (button, i) {
	            return React.createElement(ReactRouter.Match, { pattern: button.url, exactly: true, key: i, component: button.component });
	          })
	        )
	      );
	    }
	  }]);
	
	  return Result;
	}(React.Component);
	
	Result.contextTypes = {
	  auth: React.PropTypes.func,
	  io: React.PropTypes.object
	};
	
	exports.default = Result;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Loading = __webpack_require__(5);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ListRecognized = function (_React$Component) {
	  _inherits(ListRecognized, _React$Component);
	
	  function ListRecognized() {
	    _classCallCheck(this, ListRecognized);
	
	    var _this = _possibleConstructorReturn(this, (ListRecognized.__proto__ || Object.getPrototypeOf(ListRecognized)).call(this));
	
	    _this.state = {
	      render: false,
	      fr: [],
	      sort: {
	        date: false,
	        who: false,
	        prediction: false
	      }
	    };
	    return _this;
	  }
	
	  _createClass(ListRecognized, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;
	
	      this.context.io.run('fr:list', {}, function (data) {
	        _this2.setState({ render: true, fr: data });
	      });
	    }
	  }, {
	    key: 'sort',
	    value: function sort(column) {
	      var sort = this.state.sort;
	
	      if (false === sort[column]) {
	        sort[column] = 'asc';
	      } else if ('asc' === sort[column]) {
	        sort[column] = 'desc';
	      } else {
	        sort[column] = false;
	      }
	
	      var result = this.state.fr.sort(function (a, b) {
	        var dateA = new Date(a[column]).getTime();
	        var dateB = new Date(b[column]).getTime();
	        if (sort[column] === 'asc') {
	          return dateA - dateB;
	        } else if (sort[column] === 'desc') {
	          return dateB - dateA;
	        }
	        return 0;
	      });
	
	      // sort[column] = true;
	      this.setState({ fr: result, sort: sort });
	    }
	  }, {
	    key: 'getIcon',
	    value: function getIcon(column) {
	      if (this.state.sort[column]) {
	        return React.createElement(
	          Ui.FontIcon,
	          { className: 'material-icons' },
	          this.state.sort[column] === 'desc' ? 'arrow_drop_downward' : 'arrow_drop_upward'
	        );
	      }
	      return false;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var styleLabel = { padding: 0 };
	      var style = { width: '100%', textAlign: 'left' };
	      var hoverColor = "white";
	
	      return React.createElement(
	        _Loading2.default,
	        { render: this.state.render },
	        React.createElement(
	          Ui.Table,
	          { onRowSelection: this.goToUser },
	          React.createElement(
	            Ui.TableHeader,
	            { displaySelectAll: false, adjustForCheckbox: false },
	            React.createElement(
	              Ui.TableRow,
	              null,
	              React.createElement(
	                Ui.TableHeaderColumn,
	                null,
	                React.createElement(Ui.FlatButton, { label: 'Who', hoverColor: hoverColor, style: style, labelStyle: styleLabel })
	              ),
	              React.createElement(
	                Ui.TableHeaderColumn,
	                null,
	                React.createElement(Ui.FlatButton, { onClick: this.sort.bind(this, 'date'), label: 'When', hoverColor: hoverColor, style: style, labelStyle: styleLabel, labelPosition: this.state.sort['date'] ? 'after' : 'before', icon: this.getIcon('date') })
	              ),
	              React.createElement(
	                Ui.TableHeaderColumn,
	                null,
	                React.createElement(Ui.FlatButton, { label: 'Prediction', hoverColor: hoverColor, style: style, labelStyle: styleLabel })
	              )
	            )
	          ),
	          React.createElement(
	            Ui.TableBody,
	            { displayRowCheckbox: false, showRowHover: true },
	            this.state.fr.map(function (user, i) {
	              var parseDate = new Date(user.date);
	              var hour = parseDate.getHours();
	              var minutes = parseDate.getMinutes();
	              var day = parseDate.getDate();
	              var month = parseDate.getMonth() + 1;
	
	              hour = (hour + '').length === 1 ? "0" + hour : hour;
	              minutes = (minutes + '').length === 1 ? "0" + minutes : minutes;
	              day = (day + '').length === 1 ? "0" + day : day;
	              month = (month + '').length === 1 ? "0" + month : month;
	
	              var date = day + '/' + month + '/' + parseDate.getFullYear() + ' ' + hour + ':' + minutes;
	              return React.createElement(
	                Ui.TableRow,
	                { key: i },
	                React.createElement(
	                  Ui.TableRowColumn,
	                  null,
	                  user.who
	                ),
	                React.createElement(
	                  Ui.TableRowColumn,
	                  null,
	                  date
	                ),
	                React.createElement(
	                  Ui.TableRowColumn,
	                  null,
	                  user.prediction
	                )
	              );
	            })
	          )
	        )
	      );
	    }
	  }]);
	
	  return ListRecognized;
	}(React.Component);
	
	ListRecognized.contextTypes = {
	  io: React.PropTypes.object
	};
	
	exports.default = ListRecognized;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _style = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Loading = function (_React$Component) {
		_inherits(Loading, _React$Component);
	
		function Loading() {
			var _ref;
	
			_classCallCheck(this, Loading);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			return _possibleConstructorReturn(this, (_ref = Loading.__proto__ || Object.getPrototypeOf(Loading)).call.apply(_ref, [this].concat(args)));
		}
	
		_createClass(Loading, [{
			key: 'render',
			value: function render() {
				if (this.props.render) {
					if (this.props.children.length && Array.isArray(this.props.children)) {
						return React.createElement(
							'div',
							null,
							this.props.children.map(function (el, i) {
								return el;
							})
						);
					} else {
						return React.createElement(
							'div',
							null,
							this.props.children
						);
					}
				}
				return React.createElement(Ui.CircularProgress, { style: _style.style, size: 80, thickness: 5 });
			}
		}]);
	
		return Loading;
	}(React.Component);
	
	exports.default = Loading;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports.style = {
	  left: '50%',
	  marginLeft: '-40px'
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Loading = __webpack_require__(5);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _ButtonDelete = __webpack_require__(8);
	
	var _ButtonDelete2 = _interopRequireDefault(_ButtonDelete);
	
	var _Lightbox = __webpack_require__(10);
	
	var _Lightbox2 = _interopRequireDefault(_Lightbox);
	
	var _Attribute = __webpack_require__(11);
	
	var _Attribute2 = _interopRequireDefault(_Attribute);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ListRecognized = function (_React$Component) {
		_inherits(ListRecognized, _React$Component);
	
		function ListRecognized() {
			_classCallCheck(this, ListRecognized);
	
			var _this = _possibleConstructorReturn(this, (ListRecognized.__proto__ || Object.getPrototypeOf(ListRecognized)).call(this));
	
			_this.state = {
				render: false,
				fr: [],
				popup: {
					open: false,
					data: {}
				}
			};
			return _this;
		}
	
		_createClass(ListRecognized, [{
			key: 'getList',
			value: function getList() {
				var _this2 = this;
	
				this.context.io.run('fr:notRecognition', {}, function (data) {
					_this2.setState({
						render: true,
						fr: data,
						popup: {
							open: false,
							data: {}
						}
					});
				});
			}
		}, {
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.getList();
			}
		}, {
			key: 'handlePopup',
			value: function handlePopup(rows) {
				this.setState({
					popup: {
						open: !this.state.popup.open,
						data: this.state.fr[rows]
					}
				});
			}
		}, {
			key: 'delete',
			value: function _delete(index) {
				var _this3 = this;
	
				this.setState({
					render: false
				});
	
				this.context.io.run('fr:notRecognize:delete', this.state.fr[index], function (data) {
					if (data.success) {
						_this3.getList();
					} else {}
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this4 = this;
	
				return React.createElement(
					_Loading2.default,
					{ render: this.state.render },
					React.createElement(_Attribute2.default, { open: this.state.popup.open, data: this.state.popup.data }),
					React.createElement(
						Ui.Table,
						null,
						React.createElement(
							Ui.TableHeader,
							{ displaySelectAll: false, adjustForCheckbox: false },
							React.createElement(
								Ui.TableRow,
								null,
								React.createElement(Ui.TableHeaderColumn, null),
								React.createElement(
									Ui.TableHeaderColumn,
									null,
									'Who'
								),
								React.createElement(
									Ui.TableHeaderColumn,
									null,
									'When'
								),
								React.createElement(
									Ui.TableHeaderColumn,
									null,
									'Prediction'
								),
								React.createElement(
									Ui.TableHeaderColumn,
									null,
									'Actions'
								)
							)
						),
						React.createElement(
							Ui.TableBody,
							{ displayRowCheckbox: false, showRowHover: true },
							this.state.fr.map(function (user, i) {
								var parseDate = new Date(user.date);
								var date = parseDate.getDate() + '/' + (parseDate.getMonth() + 1) + '/' + parseDate.getFullYear() + ' ' + parseDate.getHours() + ':' + parseDate.getMinutes();
	
								var avatar = React.createElement(Ui.Avatar, { icon: React.createElement(
										Ui.FontIcon,
										{ className: 'material-icons' },
										' face '
									), size: 30 });
	
								if (user.img) {
									avatar = React.createElement(_Lightbox2.default, { src: '/face/img/' + user.img, size: 30, style: {
											cursor: 'pointer'
										} });
								}
	
								return React.createElement(
									Ui.TableRow,
									{ key: i },
									React.createElement(
										Ui.TableRowColumn,
										null,
										avatar
									),
									React.createElement(
										Ui.TableRowColumn,
										null,
										user.who
									),
									React.createElement(
										Ui.TableRowColumn,
										null,
										date
									),
									React.createElement(
										Ui.TableRowColumn,
										null,
										user.prediction
									),
									React.createElement(
										Ui.TableRowColumn,
										{ style: {
												display: 'flex',
												alignItems: 'center'
											} },
										React.createElement(Ui.RaisedButton, { label: 'Attribute', primary: true, onClick: _this4.handlePopup.bind(_this4, i) }),
										React.createElement(_ButtonDelete2.default, { confirmDelete: _this4.delete.bind(_this4, i) })
									)
								);
							})
						)
					)
				);
			}
		}]);
	
		return ListRecognized;
	}(React.Component);
	
	ListRecognized.contextTypes = {
		io: React.PropTypes.object
	};
	
	exports.default = ListRecognized;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _styles = __webpack_require__(9);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ButtonDelete = function (_React$Component) {
	  _inherits(ButtonDelete, _React$Component);
	
	  function ButtonDelete() {
	    var _ref;
	
	    _classCallCheck(this, ButtonDelete);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var _this = _possibleConstructorReturn(this, (_ref = ButtonDelete.__proto__ || Object.getPrototypeOf(ButtonDelete)).call.apply(_ref, [this].concat(args)));
	
	    _this.state = {
	      confirmOpen: false
	    };
	
	    _this.handleShowConfirm = _this.handleShowConfirm.bind(_this);
	    _this.confirmDelete = _this.confirmDelete.bind(_this);
	    return _this;
	  }
	
	  _createClass(ButtonDelete, [{
	    key: "handleShowConfirm",
	    value: function handleShowConfirm() {
	      this.setState({
	        confirmOpen: !this.state.confirmOpen
	      });
	    }
	  }, {
	    key: "confirmDelete",
	    value: function confirmDelete() {
	      if (this.props.confirmDelete) this.props.confirmDelete();
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var html = React.createElement(Ui.RaisedButton, { icon: React.createElement(
	          Ui.FontIcon,
	          { color: "white", className: "material-icons" },
	          " delete "
	        ), onClick: this.handleShowConfirm, backgroundColor: Colors.red800 });
	      if (this.state.confirmOpen) {
	        html = React.createElement(
	          "div",
	          { style: _styles.StyleContainer },
	          React.createElement(
	            "div",
	            { style: _styles.StyleText },
	            "are you sure?"
	          ),
	          React.createElement(
	            "div",
	            { style: _styles.StyleContainerButton },
	            React.createElement(
	              Ui.FloatingActionButton,
	              { mini: true, backgroundColor: Colors.lightGreen500, style: _styles.StyleButton, onClick: this.confirmDelete },
	              React.createElement(
	                Ui.FontIcon,
	                { className: "material-icons" },
	                " check "
	              )
	            ),
	            React.createElement(
	              Ui.FloatingActionButton,
	              { mini: true, backgroundColor: Colors.red800, style: _styles.StyleButton, onClick: this.handleShowConfirm },
	              React.createElement(
	                Ui.FontIcon,
	                { className: "material-icons" },
	                " cancel "
	              )
	            )
	          )
	        );
	      }
	
	      return html;
	    }
	  }]);
	
	  return ButtonDelete;
	}(React.Component);
	
	exports.default = ButtonDelete;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports.StyleContainer = {
	  display: "flex",
	  flexDirection: 'column',
	  marginLeft: "10px",
	  position: "absolute",
	  left: 0,
	  margin: 0,
	  width: "100%",
	  backgroundColor: 'rgba(158, 158, 158, 0.8)',
	  zIndex: 1
	};
	
	module.exports.StyleText = {
	  textAlign: 'center',
	  marginBottom: '10px',
	  marginTop: '10px',
	  fontWeight: 'bold'
	};
	
	module.exports.StyleContainerButton = {
	  display: "flex",
	  justifyContent: "center",
	  marginBottom: '10px'
	};
	
	module.exports.StyleButton = {
	  minWidth: "auto",
	  marginRight: "10px",
	  marginleft: "10px"
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// import { style } from './style';
	
	var Lightbox = function (_React$Component) {
		_inherits(Lightbox, _React$Component);
	
		function Lightbox() {
			var _ref;
	
			_classCallCheck(this, Lightbox);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			var _this = _possibleConstructorReturn(this, (_ref = Lightbox.__proto__ || Object.getPrototypeOf(Lightbox)).call.apply(_ref, [this].concat(args)));
	
			_this.state = {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				display: 'none',
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: '10001',
				background: 'rgba(31, 30, 30, 0.71)'
			};
	
			_this.onClick = _this.onClick.bind(_this);
			_this.close = _this.close.bind(_this);
			return _this;
		}
	
		_createClass(Lightbox, [{
			key: 'onClick',
			value: function onClick() {
				this.setState({
					display: 'flex'
				});
	
				if (this.props.onClick) {
					var _props;
	
					(_props = this.props).onClick.apply(_props, arguments);
				}
			}
		}, {
			key: 'close',
			value: function close() {
				this.setState({
					display: 'none'
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					null,
					React.createElement(
						'div',
						{ style: this.state, onClick: this.close },
						React.createElement(
							Ui.Paper,
							{ zDepth: 5, rounded: false },
							React.createElement('img', { src: this.props.src, style: {
									maxWidth: '100%',
									maxHeight: '100%',
									display: 'block'
								} })
						)
					),
					React.createElement(Ui.Avatar, { src: this.props.src, size: this.props.size, onClick: this.onClick, style: this.props.style })
				);
			}
		}]);
	
		return Lightbox;
	}(React.Component);
	
	exports.default = Lightbox;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Loading = __webpack_require__(5);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Attribute = function (_React$Component) {
		_inherits(Attribute, _React$Component);
	
		function Attribute() {
			var _ref;
	
			_classCallCheck(this, Attribute);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			var _this = _possibleConstructorReturn(this, (_ref = Attribute.__proto__ || Object.getPrototypeOf(Attribute)).call.apply(_ref, [this].concat(args)));
	
			_this.state = {
				open: _this.props.open,
				render: false,
				form: {},
				dataSource: []
			};
	
			_this.handleClose = _this.handleClose.bind(_this);
			_this.submit = _this.submit.bind(_this);
			_this.handleValue = _this.handleValue.bind(_this);
			return _this;
		}
	
		_createClass(Attribute, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(props) {
				this.setState({
					open: !props.open || !this.state.open ? true : false
				});
			}
		}, {
			key: 'componentWillMount',
			value: function componentWillMount() {
				var _this2 = this;
	
				this.context.io.run('fr:collections:get', {}, function (data) {
					_this2.setState({
						render: true,
						dataSource: data || []
					});
				});
			}
		}, {
			key: 'handleClose',
			value: function handleClose() {
				this.setState({ open: !this.state.open });
			}
		}, {
			key: 'handleValue',
			value: function handleValue(value) {
				this.setState({
					form: { collection: value, recognize: this.props.data }
				});
			}
		}, {
			key: 'submit',
			value: function submit() {
				var _this3 = this;
	
				this.setState({
					render: false
				});
				this.context.io.run('fr:notRecognize:moveToCollections', this.state.form, function (data) {
					_this3.setState({
						render: true
					});
	
					_this3.handleClose();
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var actions = [React.createElement(Ui.FlatButton, {
					label: 'Cancel',
					primary: true,
					onTouchTap: this.handleClose
				}), React.createElement(Ui.FlatButton, {
					label: 'Submit',
					primary: true,
					keyboardFocused: true,
					onTouchTap: this.submit
				})];
	
				return React.createElement(
					Ui.Dialog,
					{ title: 'Attribute', actions: actions, modal: false, onRequestClose: this.handleClose, open: this.state.open },
					React.createElement(
						_Loading2.default,
						{ render: this.state.render },
						React.createElement(Ui.AutoComplete, {
							hintText: 'Name of collection',
							floatingLabelText: 'Attribute on a collections',
							dataSource: this.state.dataSource,
							dataSourceConfig: { text: 'name', value: 'id' },
							onNewRequest: this.handleValue
						})
					)
				);
			}
		}]);
	
		return Attribute;
	}(React.Component);
	
	Attribute.contextTypes = {
		io: React.PropTypes.object
	};
	
	exports.default = Attribute;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Loading = __webpack_require__(5);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _ButtonDelete = __webpack_require__(8);
	
	var _ButtonDelete2 = _interopRequireDefault(_ButtonDelete);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Collections = function (_React$Component) {
	  _inherits(Collections, _React$Component);
	
	  function Collections() {
	    var _ref;
	
	    _classCallCheck(this, Collections);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var _this = _possibleConstructorReturn(this, (_ref = Collections.__proto__ || Object.getPrototypeOf(Collections)).call.apply(_ref, [this].concat(args)));
	
	    _this.state = {
	      models: [],
	      active: false
	    };
	
	    _this.delete = _this.delete.bind(_this);
	    _this.handleToggle = _this.handleToggle.bind(_this);
	    _this.submit = _this.submit.bind(_this);
	    _this.train = _this.train.bind(_this);
	    return _this;
	  }
	
	  _createClass(Collections, [{
	    key: 'delete',
	    value: function _delete() {
	      var _this2 = this;
	
	      this.context.io.run('fr:delete', { id: this.props.location.state.id }, function (data) {
	        if (data) {
	          _this2.context.router.push('config');
	        }
	      });
	    }
	  }, {
	    key: 'actions',
	    value: function actions() {
	      return [{ label: "Cancel", onClick: this.handleToggle }, { label: "Delete", onClick: this.delete }];
	    }
	  }, {
	    key: 'handleToggle',
	    value: function handleToggle() {
	      this.setState({ active: !this.state.active });
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this3 = this;
	
	      this.context.io.run('fr:collections:list', {}, function (data) {
	        _this3.setState({ models: data, render: true });
	      });
	    }
	  }, {
	    key: 'submit',
	    value: function submit(e) {
	      var _this4 = this;
	
	      e.preventDefault();
	      this.context.io.run('fr:update', { name: this.props.location.state.id, files: this.refs.upload.state.preview }, function (res) {
	        if (res.state) {
	          _this4.context.router.push('/config');
	        }
	      });
	    }
	  }, {
	    key: 'train',
	    value: function train() {
	      this.context.io.run('fr:collections:train', {}, function () {});
	    }
	  }, {
	    key: 'delete',
	    value: function _delete() {}
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this5 = this;
	
	      return React.createElement(
	        _Loading2.default,
	        { render: this.state.render },
	        React.createElement(
	          Ui.Table,
	          { onRowSelection: this.goToUser },
	          React.createElement(
	            Ui.TableHeader,
	            { displaySelectAll: false, adjustForCheckbox: false },
	            React.createElement(
	              Ui.TableRow,
	              null,
	              React.createElement(
	                Ui.TableHeaderColumn,
	                null,
	                'Model Name'
	              ),
	              React.createElement(
	                Ui.TableHeaderColumn,
	                null,
	                'Number of picture'
	              ),
	              React.createElement(
	                Ui.TableHeaderColumn,
	                null,
	                React.createElement(
	                  ReactRouter.Link,
	                  { to: '/face/collections/new' },
	                  function (_ref2) {
	                    var isActive = _ref2.isActive;
	                    var location = _ref2.location;
	                    var href = _ref2.href;
	                    var onClick = _ref2.onClick;
	                    var transition = _ref2.transition;
	                    return React.createElement(Ui.RaisedButton, { href: href, onClick: onClick, icon: React.createElement(
	                        Ui.FontIcon,
	                        { className: 'material-icons' },
	                        ' add '
	                      ) });
	                  }
	                ),
	                React.createElement(Ui.RaisedButton, { onClick: this.train, label: 'Train' })
	              )
	            )
	          ),
	          React.createElement(
	            Ui.TableBody,
	            { displayRowCheckbox: false, showRowHover: true },
	            this.state.models.map(function (model, i) {
	              return React.createElement(
	                Ui.TableRow,
	                { key: i },
	                React.createElement(
	                  Ui.TableRowColumn,
	                  null,
	                  model.name
	                ),
	                React.createElement(
	                  Ui.TableRowColumn,
	                  null,
	                  model.nbPortrait
	                ),
	                React.createElement(
	                  Ui.TableRowColumn,
	                  { style: { display: 'flex', alignItems: 'center' } },
	                  React.createElement(
	                    ReactRouter.Link,
	                    { to: "/face/collections/edit/" + model.id },
	                    function (_ref3) {
	                      var isActive = _ref3.isActive;
	                      var location = _ref3.location;
	                      var href = _ref3.href;
	                      var onClick = _ref3.onClick;
	                      var transition = _ref3.transition;
	                      return React.createElement(Ui.RaisedButton, { primary: true, href: href, onClick: onClick, icon: React.createElement(
	                          Ui.FontIcon,
	                          { className: 'material-icons' },
	                          ' edit '
	                        ) });
	                    }
	                  ),
	                  React.createElement(_ButtonDelete2.default, { confirmDelete: _this5.delete.bind(_this5, i) })
	                )
	              );
	            })
	          )
	        )
	      );
	    }
	  }]);
	
	  return Collections;
	}(React.Component);
	
	Collections.contextTypes = {
	  io: React.PropTypes.object
	};
	
	exports.default = Collections;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Loading = __webpack_require__(5);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _ButtonDelete = __webpack_require__(8);
	
	var _ButtonDelete2 = _interopRequireDefault(_ButtonDelete);
	
	var _Upload = __webpack_require__(14);
	
	var _Upload2 = _interopRequireDefault(_Upload);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var EditCollection = function (_React$Component) {
	  _inherits(EditCollection, _React$Component);
	
	  function EditCollection() {
	    var _ref;
	
	    _classCallCheck(this, EditCollection);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var _this = _possibleConstructorReturn(this, (_ref = EditCollection.__proto__ || Object.getPrototypeOf(EditCollection)).call.apply(_ref, [this].concat(args)));
	
	    _this.state = {
	      model: false,
	      images: [],
	      active: false
	    };
	    return _this;
	  }
	
	  _createClass(EditCollection, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var _this2 = this;
	
	      this.context.io.run('fr:collections:get', { id: this.props.params.id }, function (data) {
	        _this2.setState({ model: data, render: true });
	      });
	
	      this.context.io.run('fr:collections:get:image', { id: this.props.params.id }, function (data) {
	        _this2.setState({ images: data.datas, render: true });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;
	
	      return React.createElement(
	        _Loading2.default,
	        { render: this.state.render },
	        React.createElement(
	          'h2',
	          null,
	          this.state.model.name
	        ),
	        this.state.images.map(function (item, i) {
	          return React.createElement(Ui.Avatar, { key: i, src: "/face/img/collection/" + _this3.state.model.name + '/' + item, size: 100 });
	        }),
	        React.createElement(_Upload2.default, null)
	      );
	    }
	  }]);
	
	  return EditCollection;
	}(React.Component);
	
	EditCollection.contextTypes = {
	  io: React.PropTypes.object
	};
	
	exports.default = EditCollection;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _styles = __webpack_require__(15);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Upload = function (_React$Component) {
	  _inherits(Upload, _React$Component);
	
	  function Upload() {
	    var _ref;
	
	    _classCallCheck(this, Upload);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var _this = _possibleConstructorReturn(this, (_ref = Upload.__proto__ || Object.getPrototypeOf(Upload)).call.apply(_ref, [this].concat(args)));
	
	    _this.state = {
	      images: [],
	      preview: []
	    };
	    return _this;
	  }
	
	  _createClass(Upload, [{
	    key: "change",
	    value: function change(name, value, e) {
	
	      this.setState({ images: value.target.files, preview: [] });
	
	      var file;
	      var reader = [];
	      var index = 0;
	
	      for (var i = 0, len = value.target.files.length; i < len; i++) {
	        file = value.target.files[i];
	        reader.push(new FileReader());
	        index = reader.length - 1;
	        reader[index].onloadend = function (t, fileReady) {
	          var preview = this.state.preview;
	
	          preview.push({
	            data: reader[t].result,
	            name: fileReady.name
	          });
	          this.setState({ preview: preview });
	          if (i === len) {
	            if (this.props.onChange) {
	              this.props.onChange(this.state.preview);
	            }
	          }
	        }.bind(this, index, file);
	
	        if (file) {
	          reader[index].readAsDataURL(file);
	        }
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { style: _styles.StyleContainer },
	        React.createElement(
	          "div",
	          { className: "container-upload", style: _styles.StyleContainerInput },
	          React.createElement("input", { type: "file", id: "fileinput", multiple: "multiple", className: "upload", accept: "image/*", onChange: this.change.bind(this, 'img') }),
	          React.createElement(Ui.RaisedButton, { className: "fake-button", label: "Add picture", primary: true })
	        ),
	        React.createElement(
	          "div",
	          { style: _styles.StyleContainerPreview },
	          this.state.preview.map(function (el, i) {
	            return React.createElement("img", { src: el.data, key: i, width: "100" });
	          })
	        )
	      );
	    }
	  }]);
	
	  return Upload;
	}(React.Component);
	
	exports.default = Upload;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports.StyleContainer = {
	  border: '1px solid ' + Colors.grey300,
	  borderRadius: "2px",
	  padding: '5px'
	};
	
	module.exports.StyleContainerPreview = {};
	
	module.exports.StyleContainerInput = {
	  width: '200px'
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Loading = __webpack_require__(5);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _ButtonDelete = __webpack_require__(8);
	
	var _ButtonDelete2 = _interopRequireDefault(_ButtonDelete);
	
	var _Upload = __webpack_require__(14);
	
	var _Upload2 = _interopRequireDefault(_Upload);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NewCollection = function (_React$Component) {
	  _inherits(NewCollection, _React$Component);
	
	  function NewCollection() {
	    var _ref;
	
	    _classCallCheck(this, NewCollection);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var _this = _possibleConstructorReturn(this, (_ref = NewCollection.__proto__ || Object.getPrototypeOf(NewCollection)).call.apply(_ref, [this].concat(args)));
	
	    _this.state = {
	      form: {
	        name: false,
	        files: []
	      },
	      render: true,
	      redirect: false
	    };
	
	    _this.submit = _this.submit.bind(_this);
	    _this.changeFile = _this.changeFile.bind(_this);
	    return _this;
	  }
	
	  _createClass(NewCollection, [{
	    key: 'handleValue',
	    value: function handleValue(label, e, value) {
	      var form = this.state.form;
	
	      form[label] = value;
	
	      this.setState({ form: form });
	    }
	  }, {
	    key: 'changeFile',
	    value: function changeFile(files) {
	      var form = this.state.form;
	      form.files = files;
	      this.setState({ form: form });
	    }
	  }, {
	    key: 'submit',
	    value: function submit() {
	      var _this2 = this;
	
	      this.context.io.run('fr:collections:new', this.state.form, function (data) {
	        _this2.setState({ redirect: true });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.state.redirect) {
	        return React.createElement(Redirect, { to: '/face/collections' });
	      }
	      return React.createElement(
	        _Loading2.default,
	        { render: this.state.render },
	        React.createElement(Ui.TextField, { hintText: 'Franck', onChange: this.handleValue.bind(this, 'name'), floatingLabelText: 'Enter name of model' }),
	        React.createElement(_Upload2.default, { ref: 'upload', onChange: this.changeFile }),
	        React.createElement(Ui.RaisedButton, { label: Lang.save, primary: true, style: { marginTop: '20px', float: 'right' }, onClick: this.submit })
	      );
	    }
	  }]);
	
	  return NewCollection;
	}(React.Component);
	
	NewCollection.contextTypes = {
	  io: React.PropTypes.object
	};
	
	exports.default = NewCollection;

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = [{
		"label": "faceRecognition",
		"href": "/face",
		"icon": "camera alt"
	}];

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  name: 'face',
	  collections: []
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var conf = __webpack_require__(18);
	
	Lang.addTrad({
	  en: _defineProperty({}, conf.name, __webpack_require__(20)),
	  fr: _defineProperty({}, conf.name, __webpack_require__(21))
	});

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  faceRecognition: 'Face recognition'
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  faceRecognition: 'Reconnaissance faciale'
	};

/***/ }
/******/ ]);
//# sourceMappingURL=face.js.map