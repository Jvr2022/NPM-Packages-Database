'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _buildURL = require('axios/lib/helpers/buildURL');

var _buildURL2 = _interopRequireDefault(_buildURL);

var _transformData = require('axios/lib/helpers/transformData');

var _transformData2 = _interopRequireDefault(_transformData);

var _isURLSameOrigin = require('axios/lib/helpers/isURLSameOrigin');

var _isURLSameOrigin2 = _interopRequireDefault(_isURLSameOrigin);

var _btoa = require('axios/lib/helpers/btoa');

var _btoa2 = _interopRequireDefault(_btoa);

var _cookies = require('axios/lib/helpers/cookies');

var _cookies2 = _interopRequireDefault(_cookies);

var _settle = require('axios/lib/helpers/settle');

var _settle2 = _interopRequireDefault(_settle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_WAIT_DELAY = 100;

// The default adapter
var defaultAdapter = void 0;

/**
 * The mock adapter that gets installed.
 *
 * @param {Function} resolve The function to call when Promise is resolved
 * @param {Function} reject The function to call when Promise is rejected
 * @param {Object} config The config object to be used for the request
 */
var mockAdapter = function mockAdapter(resolve, reject, config) {
  var request = new Request(resolve, reject, config);
  moxios.requests.track(request);

  // Check for matching stub to auto respond with
  for (var i = 0, l = moxios.stubs.count(); i < l; i++) {
    var stub = moxios.stubs.at(i);
    if (stub.url === request.url || stub.url instanceof RegExp && stub.url.test(request.url)) {
      request.respondWith(stub.response);
      break;
    }
  }
};

var Tracker = function () {
  function Tracker() {
    _classCallCheck(this, Tracker);

    this.__items = [];
  }

  /**
   * Reset all the items being tracked
   */


  _createClass(Tracker, [{
    key: 'reset',
    value: function reset() {
      this.__items.splice(0);
    }

    /**
     * Add an item to be tracked
     *
     * @param {Object} item An item to be tracked
     */

  }, {
    key: 'track',
    value: function track(item) {
      this.__items.push(item);
    }

    /**
     * The count of items being tracked
     *
     * @return {Number}
     */

  }, {
    key: 'count',
    value: function count() {
      return this.__items.length;
    }

    /**
     * Get an item being tracked at a given index
     *
     * @param {Number} index The index for the item to retrieve
     * @return {Object}
     */

  }, {
    key: 'at',
    value: function at(index) {
      return this.__items[index];
    }

    /**
     * Get the first item being tracked
     *
     * @return {Object}
     */

  }, {
    key: 'first',
    value: function first() {
      return this.at(0);
    }

    /**
     * Get the most recent (last) item being tracked
     *
     * @return {Object}
     */

  }, {
    key: 'mostRecent',
    value: function mostRecent() {
      return this.at(this.count() - 1);
    }
  }]);

  return Tracker;
}();

var Request = function () {
  /**
   * Create a new Request object
   *
   * @param {Function} resolve The function to call when Promise is resolved
   * @param {Function} reject The function to call when Promise is rejected
   * @param {Object} config The config object to be used for the request
   */

  function Request(resolve, reject, config) {
    _classCallCheck(this, Request);

    this.resolve = resolve;
    this.reject = reject;
    this.config = config;

    this.headers = config.headers;
    this.url = (0, _buildURL2.default)(config.url, config.params, config.paramsSerializer);
    this.timeout = config.timeout;
    this.withCredentials = config.withCredentials || false;
    this.responseType = config.responseType;

    // Set auth header
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      this.headers.Authorization = 'Basic ' + (0, _btoa2.default)(username + ':' + password);
    }

    // Set xsrf header
    if (typeof document !== 'undefined' && typeof document.cookie !== 'undefined') {
      var xsrfValue = config.withCredentials || (0, _isURLSameOrigin2.default)(config.url) ? _cookies2.default.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        this.headers[config.xsrfHeaderName] = xsrfValue;
      }
    }
  }

  /**
   * Respond to this request with a specified result
   *
   * @param {Object} res The data representing the result of the request
   * @return {Promise} A Promise that resolves once the response is ready
   */


  _createClass(Request, [{
    key: 'respondWith',
    value: function respondWith(res) {
      var response = new Response(this, res);
      (0, _settle2.default)(this.resolve, this.reject, response);
      return new Promise(function (resolve) {
        moxios.wait(function () {
          resolve(response);
        });
      });
    }
  }]);

  return Request;
}();

var Response =
/**
 * Create a new Response object
 *
 * @param {Request} req The Request that this Response is associated with
 * @param {Object} res The data representing the result of the request
 */
function Response(req, res) {
  _classCallCheck(this, Response);

  this.config = req.config;
  this.data = (0, _transformData2.default)(res.responseText || res.response, res.headers, this.config.transformResponse);
  this.status = res.status;
  this.statusText = res.statusText;
  this.headers = res.headers;
  this.request = req;
};

var moxios = {
  stubs: new Tracker(),
  requests: new Tracker(),
  delay: DEFAULT_WAIT_DELAY,

  /**
   * Install the mock adapter for axios
   */
  install: function install() {
    var instance = arguments.length <= 0 || arguments[0] === undefined ? _axios2.default : arguments[0];

    defaultAdapter = instance.defaults.adapter;
    instance.defaults.adapter = mockAdapter;
  },

  /**
  * Uninstall the mock adapter and reset state
  */
  uninstall: function uninstall() {
    var instance = arguments.length <= 0 || arguments[0] === undefined ? _axios2.default : arguments[0];

    instance.defaults.adapter = defaultAdapter;
    this.stubs.reset();
    this.requests.reset();
  },

  /**
  * Stub a response to be used to respond to a request matching a URL or RegExp
  *
  * @param {String|RegExp} urlOrRegExp A URL or RegExp to test against
  * @param {Object} response The response to use when a match is made
  */
  stubRequest: function stubRequest(urlOrRegExp, response) {
    this.stubs.track({ url: urlOrRegExp, response: response });
  },

  /**
  * Run a single test with mock adapter installed.
  * This will install the mock adapter, execute the function provided,
  * then uninstall the mock adapter once complete.
  *
  * @param {Function} fn The function to be executed
  */
  withMock: function withMock(fn) {
    this.install();
    try {
      fn();
    } finally {
      this.uninstall();
    }
  },

  /**
  * Wait for request to be made before proceding.
  * This is naively using a `setTimeout`.
  * May need to beef this up a bit in the future.
  *
  * @param {Function} fn The function to execute once waiting is over
  * @param {Number} delay How much time in milliseconds to wait
  */
  wait: function wait(fn) {
    var delay = arguments.length <= 1 || arguments[1] === undefined ? this.delay : arguments[1];

    setTimeout(fn, delay);
  }
};

exports.default = moxios;