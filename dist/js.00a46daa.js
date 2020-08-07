// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles/index.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/select.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _renderOption = new WeakSet();

var _renderOptions = new WeakSet();

var _render = new WeakSet();

var Select = /*#__PURE__*/function () {
  function Select(selector) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$options = _ref.options,
        _options = _ref$options === void 0 ? [] : _ref$options,
        _ref$placeholder = _ref.placeholder,
        placeholder = _ref$placeholder === void 0 ? 'Выберите пункт' : _ref$placeholder,
        _ref$onChange = _ref.onChange,
        onChange = _ref$onChange === void 0 ? null : _ref$onChange;

    _classCallCheck(this, Select);

    _render.add(this);

    _renderOptions.add(this);

    _renderOption.add(this);

    this.$el = document.querySelector(selector);
    this.options = _options;
    this.placeholder = placeholder;
    this.isOpen = false;
    this.value = null;
    this.onChange = onChange;
    !this.$el.classList.contains('select') && this.$el.classList.add('select');

    _classPrivateMethodGet(this, _render, _render2).call(this, _options);

    this.clickHandler = this.clickHandler.bind(this);
    window.addEventListener('click', this.clickHandler);
  }

  _createClass(Select, [{
    key: "open",
    value: function open() {
      this.$el.classList.add('open');
      this.isOpen = true;
    }
  }, {
    key: "close",
    value: function close() {
      this.$el.classList.remove('open');
      this.isOpen = false;
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(event) {
      if (!this.$el.contains(event.target)) {
        this.close();
        return;
      }

      var type = event.target.dataset.selectType;

      switch (type) {
        case 'input':
          this.isOpen ? this.close() : this.open();
          break;

        case 'option':
          var label = event.target.innerText;
          this.value = {
            value: event.target.dataset.value,
            label: label,
            id: event.target.dataset.id
          };

          _classPrivateMethodGet(this, _render, _render2).call(this);

          this.close();
          this.onChange && this.onChange(this.value);
          break;

        default:
          this.isOpen && this.close();
      }
    }
  }]);

  return Select;
}();

exports.Select = Select;

var _renderOption2 = function _renderOption2(_ref2) {
  var value = _ref2.value,
      id = _ref2.id,
      label = _ref2.label;
  return "<div\n            class=\"select__option".concat(this.value && value === this.value.value ? ' selected' : '', "\"\n            data-value=\"").concat(value, "\"\n            data-id=\"").concat(id, "\"\n            data-select-type=\"option\"\n        >").concat(label, "</div>");
};

var _renderOptions2 = function _renderOptions2(options) {
  var _this = this;

  return options.map(function (option) {
    return _classPrivateMethodGet(_this, _renderOption, _renderOption2).call(_this, option);
  }).join('');
};

var _render2 = function _render2() {
  this.$el.innerHTML = "\n            <div class=\"select__input\" data-select-type=\"input\">\n                <span data-select-type=\"input\">".concat(this.value && this.value.label || this.placeholder, "</span>\n                <svg\n                    data-select-type=\"input\"\n                    class=\"select__input__icon\"\n                    focusable=\"false\"\n                    viewBox=\"0 0 24 24\"\n                    aria-hidden=\"true\"\n                    role=\"presentation\"\n                >\n                    <path d=\"M7 10l5 5 5-5z\"/>\n                </svg>\n            </div>\n            <div class=\"select__options\" data-select-type=\"options\">").concat(_classPrivateMethodGet(this, _renderOptions, _renderOptions2).call(this, this.options), "</div>\n        ");
};
},{}],"assets/ranks/default.webp":[function(require,module,exports) {
module.exports = "/default.9e409562.webp";
},{}],"assets/separator.svg":[function(require,module,exports) {
module.exports = "/separator.9efe58e6.svg";
},{}],"js/partials.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderHeaderOptions = renderHeaderOptions;
exports.renderOptions = renderOptions;
exports.renderBody = renderBody;
exports.renderFooter = renderFooter;

var _select = require("./select");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function renderHeaderOptions() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? [] : _ref$options,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? null : _ref$onChange,
      _ref$parent = _ref.parent,
      parent = _ref$parent === void 0 ? '' : _ref$parent;

  var root = document.querySelector(parent);
  root.insertAdjacentHTML('beforeEnd', render());
  root.querySelectorAll('.calc__header__type').forEach(function (element) {
    element.addEventListener('click', onChange);
  });

  function render() {
    return options.map(function (option) {
      return "<button\n                class=\"calc__header__type".concat(option.isActive ? ' active' : '', "\"\n                ").concat(option.isActive ? ' disabled' : '', "\n                data-page=\"").concat(option.value, "\"\n            >").concat(option.label, "</button>");
    }).join('');
  }
}

function renderOptions() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$options = _ref2.options,
      options = _ref2$options === void 0 ? [] : _ref2$options,
      _ref2$onChange = _ref2.onChange,
      onChange = _ref2$onChange === void 0 ? function () {
    return null;
  } : _ref2$onChange,
      _ref2$parent = _ref2.parent,
      parent = _ref2$parent === void 0 ? '' : _ref2$parent;

  var parentElement = document.querySelector(parent);
  parentElement.insertAdjacentHTML('beforeEnd', render(options));
  parentElement.querySelectorAll('.calc__body__option').forEach(function (element) {
    return element.addEventListener('click', onChange);
  });

  function render(options) {
    return options.map(function (option) {
      return "\n            <label class=\"calc__body__option\">\n                <div class=\"calc__checkbox\">\n                    <input\n                        type=\"checkbox\"\n                        data-id=\"".concat(option.id, "\"\n                        class=\"calc__checkbox__input\"\n                        ").concat(option.checked ? ' checked' : '', "\n                    >\n                    <div class=\"calc__checkbox__face\">\n                        <svg\n                                fill=\"#000000\"\n                                viewBox=\"0 0 30 30\"\n                                width=\"30px\"\n                                height=\"30px\"\n                                class=\"calc__checkbox__face__icon\"\n                        >\n                            <path d=\"M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z\"/>\n                        </svg>\n                    </div>\n                </div>\n                <span class=\"calc__body__option__label\">").concat(option.label, "</span>\n                <svg\n                        class=\"calc__body__option__info\"\n                        focusable=\"false\"\n                        viewBox=\"0 0 24 24\"\n                        aria-hidden=\"true\"\n                        role=\"presentation\"\n                        data-title=\"").concat(option.description, "\"\n                >\n                    <path d=\"M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z\" />\n                </svg>\n            </label>\n        ");
    }).join('');
  }
}

function renderBody() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref3$selects = _ref3.selects,
      selects = _ref3$selects === void 0 ? [] : _ref3$selects,
      _ref3$options = _ref3.options,
      options = _ref3$options === void 0 ? [] : _ref3$options,
      _ref3$parent = _ref3.parent,
      parentSelector = _ref3$parent === void 0 ? '' : _ref3$parent,
      _ref3$onOptionsChange = _ref3.onOptionsChange,
      onOptionsChange = _ref3$onOptionsChange === void 0 ? null : _ref3$onOptionsChange;

  var parent = document.querySelector(parentSelector);
  parent.insertAdjacentHTML('beforeEnd', render(options));
  var selectControllers = selects.map(function (select) {
    return new _select.Select(select.selector, select.options);
  });

  var _onOptionsChange = function _onOptionsChange(event) {
    event.preventDefault();
    var id = event.currentTarget.querySelector('input[type="checkbox"]').dataset.id;
    options = options.map(function (option) {
      return _objectSpread(_objectSpread({}, option), {}, {
        checked: option.id == id ? !option.checked : option.checked
      });
    });
    onOptionsChange && onOptionsChange({
      options: options,
      selects: selectControllers.map(function (select) {
        return select.value;
      })
    });
    parent.querySelector('.calc__body__optional').innerHTML = '';
    renderOptions({
      options: options,
      onChange: _onOptionsChange,
      parent: '.calc__body__optional'
    });
  };

  renderOptions({
    options: options,
    onChange: _onOptionsChange,
    parent: '.calc__body__optional'
  });

  function render() {
    return "\n<div class=\"calc__body__main\">\n<div class=\"calc__body__column\">\n<img src=\"".concat(require('../assets/ranks/default.webp'), "\" alt=\"\" id=\"image-from\" class=\"calc__body__column__image\">\n<div id=\"select-from\"></div>\n</div>\n<img src=\"").concat(require('../assets/separator.svg'), "\" alt=\">>>\" class=\"calc__body__separator\">\n<div class=\"calc__body__column\">\n<div id=\"select-to\"></div>\n<img src=\"").concat(require('../assets/ranks/default.webp'), "\" alt=\"\" class=\"calc__body__column__image\" id=\"image-to\">\n</div>\n</div>\n<div class=\"calc__body__optional\"></div>\n");
  }
}

function renderFooter() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref4$total = _ref4.total,
      total = _ref4$total === void 0 ? 0 : _ref4$total,
      _ref4$isValid = _ref4.isValid,
      isValid = _ref4$isValid === void 0 ? false : _ref4$isValid,
      _ref4$parent = _ref4.parent,
      parent = _ref4$parent === void 0 ? '' : _ref4$parent;

  document.querySelector(parent).insertAdjacentHTML('beforeEnd', render());

  function render() {
    return "\n            <span class=\"calc__footer__price\">\u041A \u043E\u043F\u043B\u0430\u0442\u0435: <em id=\"total\">".concat(total, "</em></span>\n            ").concat(isValid ? '<button id="submit" class="calc__footer__submit">Заказать!</button>' : '', "\n        ");
  }
}
},{"./select":"js/select.js","../assets/ranks/default.webp":"assets/ranks/default.webp","../assets/separator.svg":"assets/separator.svg"}],"assets/ranks/silver-1.jpg":[function(require,module,exports) {
module.exports = "/silver-1.9a8a47ff.jpg";
},{}],"assets/ranks/silver-2.jpg":[function(require,module,exports) {
module.exports = "/silver-2.8888ea30.jpg";
},{}],"assets/ranks/silver-3.jpg":[function(require,module,exports) {
module.exports = "/silver-3.3ddb42d1.jpg";
},{}],"assets/ranks/silver-4.jpg":[function(require,module,exports) {
module.exports = "/silver-4.2694f243.jpg";
},{}],"assets/ranks/silver-5.jpg":[function(require,module,exports) {
module.exports = "/silver-5.cd5daa3a.jpg";
},{}],"assets/ranks/silver-6.jpg":[function(require,module,exports) {
module.exports = "/silver-6.dac3fe67.jpg";
},{}],"assets/ranks/gn-1.jpg":[function(require,module,exports) {
module.exports = "/gn-1.0bbd7c66.jpg";
},{}],"assets/ranks/gn-2.jpg":[function(require,module,exports) {
module.exports = "/gn-2.d095b071.jpg";
},{}],"assets/ranks/gn-3.jpg":[function(require,module,exports) {
module.exports = "/gn-3.937013d5.jpg";
},{}],"assets/ranks/gn-4.jpg":[function(require,module,exports) {
module.exports = "/gn-4.1ecc2ac8.jpg";
},{}],"assets/ranks/ak-1.jpg":[function(require,module,exports) {
module.exports = "/ak-1.71e6b339.jpg";
},{}],"assets/ranks/ak-2.jpg":[function(require,module,exports) {
module.exports = "/ak-2.2ff75512.jpg";
},{}],"assets/ranks/ak-3.jpg":[function(require,module,exports) {
module.exports = "/ak-3.bdf6062a.jpg";
},{}],"assets/ranks/bs.jpg":[function(require,module,exports) {
module.exports = "/bs.bd4ad2d1.jpg";
},{}],"assets/ranks/le.jpg":[function(require,module,exports) {
module.exports = "/le.fb3c4ff7.jpg";
},{}],"assets/ranks/lem.jpg":[function(require,module,exports) {
module.exports = "/lem.71974a37.jpg";
},{}],"assets/ranks/sup.jpg":[function(require,module,exports) {
module.exports = "/sup.5450f967.jpg";
},{}],"assets/ranks/glob.jpg":[function(require,module,exports) {
module.exports = "/glob.cf8c1cb7.jpg";
},{}],"js/pages.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _select = require("./select");

var _partials = require("./partials");

var rankImages = {
  0: require('../assets/ranks/silver-1.jpg'),
  1: require('../assets/ranks/silver-2.jpg'),
  2: require('../assets/ranks/silver-3.jpg'),
  3: require('../assets/ranks/silver-4.jpg'),
  4: require('../assets/ranks/silver-5.jpg'),
  5: require('../assets/ranks/silver-6.jpg'),
  6: require('../assets/ranks/gn-1.jpg'),
  7: require('../assets/ranks/gn-2.jpg'),
  8: require('../assets/ranks/gn-3.jpg'),
  9: require('../assets/ranks/gn-4.jpg'),
  10: require('../assets/ranks/ak-1.jpg'),
  11: require('../assets/ranks/ak-2.jpg'),
  12: require('../assets/ranks/ak-3.jpg'),
  13: require('../assets/ranks/bs.jpg'),
  14: require('../assets/ranks/le.jpg'),
  15: require('../assets/ranks/lem.jpg'),
  16: require('../assets/ranks/sup.jpg'),
  17: require('../assets/ranks/glob.jpg')
};
var rankOptions = [{
  id: 0,
  label: 'Серебро - |',
  value: '170'
}, {
  id: 1,
  label: 'Серебро - ||',
  value: '170'
}, {
  id: 2,
  label: 'Серебро - |||',
  value: '170'
}, {
  id: 3,
  label: 'Серебро - |V',
  value: '170'
}, {
  id: 4,
  label: 'Серебро - Элита',
  value: '170'
}, {
  id: 5,
  label: 'Серебро - Великий Магистр',
  value: '170'
}, {
  id: 6,
  label: 'Золотая звезда - |',
  value: '270'
}, {
  id: 7,
  label: 'Золотая звезда - ||',
  value: '270'
}, {
  id: 8,
  label: 'Золотая звезда - |||',
  value: '270'
}, {
  id: 9,
  label: 'Золотая звезда - Магистр',
  value: '270'
}, {
  id: 10,
  label: 'Магистр-Хранитель - |',
  value: '350'
}, {
  id: 11,
  label: 'Магистр-Хранитель - ||',
  value: '350'
}, {
  id: 12,
  label: 'Магистр-Хранитель - Элита',
  value: '350'
}, {
  id: 13,
  label: 'Заслуженный Магистр-Хранитель',
  value: '400'
}, {
  id: 14,
  label: 'Легендарный Беркут',
  value: '650'
}, {
  id: 15,
  label: 'Легендарный Беркут-Магистр ',
  value: '850'
}, {
  id: 16,
  label: 'Великий Магистр высшего ранга',
  value: '1270'
}, {
  id: 17,
  label: 'Всемирная Элина',
  value: '1790'
}];
var wingmanRankOptions = [{
  id: 0,
  label: 'Серебро - |',
  value: '125'
}, {
  id: 1,
  label: 'Серебро - ||',
  value: '125'
}, {
  id: 2,
  label: 'Серебро - |||',
  value: '125'
}, {
  id: 3,
  label: 'Серебро - |V',
  value: '125'
}, {
  id: 4,
  label: 'Серебро - Элита',
  value: '125'
}, {
  id: 5,
  label: 'Серебро - Великий Магистр',
  value: '125'
}, {
  id: 6,
  label: 'Золотая звезда - |',
  value: '200'
}, {
  id: 7,
  label: 'Золотая звезда - ||',
  value: '200'
}, {
  id: 8,
  label: 'Золотая звезда - |||',
  value: '200'
}, {
  id: 9,
  label: 'Золотая звезда - Магистр',
  value: '200'
}, {
  id: 10,
  label: 'Магистр-Хранитель - |',
  value: '260'
}, {
  id: 11,
  label: 'Магистр-Хранитель - ||',
  value: '260'
}, {
  id: 12,
  label: 'Магистр-Хранитель - Элита',
  value: '260'
}, {
  id: 13,
  label: 'Заслуженный Магистр-Хранитель',
  value: '335'
}, {
  id: 14,
  label: 'Легендарный Беркут',
  value: '485'
}, {
  id: 15,
  label: 'Легендарный Беркут-Магистр ',
  value: '635'
}, {
  id: 16,
  label: 'Великий Магистр высшего ранга',
  value: '950'
}, {
  id: 17,
  label: 'Всемирная Элина',
  value: '1340'
}];

function mmPage(_ref) {
  var parent = _ref.parent;
  var tabs = [{
    id: 0,
    value: 'mm',
    label: 'По званию',
    isActive: true
  }, {
    id: 1,
    value: 'wingman',
    label: 'По званию напарники',
    isActive: false
  }];
  var optionalFields = [{
    id: 0,
    value: function value(_value) {
      return _value * 1.5;
    },
    label: 'Без передачи аккаунта',
    description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
    checked: false
  }, {
    id: 1,
    value: function value(_value2) {
      return _value2 * 1.3;
    },
    label: 'Приорити',
    description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
    checked: false
  }, {
    id: 2,
    value: function value(_value3) {
      return _value3 + 490;
    },
    label: 'Стрим заказа',
    description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
    checked: false
  }];
  var rankUp = {
    from: null,
    to: null,
    options: optionalFields
  };

  function updatePrice(settings) {
    if (settings.from === null || settings.to === null) {
      document.querySelector('.calc__footer').innerHTML = '';
      (0, _partials.renderFooter)({
        total: 'Выберите звания',
        isValid: false,
        parent: '.calc__footer'
      });
      return;
    }

    if (settings.to.id <= settings.from.id) {
      document.querySelector('.calc__footer').innerHTML = '';
      (0, _partials.renderFooter)({
        total: 'Желаемое звание должно быть выше нынешего',
        isValid: false,
        parent: '.calc__footer'
      });
      return;
    }

    var total = 0;

    for (var i = parseInt(settings.from.id) + 1; i <= settings.to.id; i++) {
      total += parseInt(rankOptions[i].value);
    }

    settings.options.forEach(function (param) {
      if (param.checked) total = param.value(total);
    });
    total = Math.ceil(total);
    document.querySelector('.calc__footer').innerHTML = '';
    (0, _partials.renderFooter)({
      total: total,
      isValid: true,
      parent: '.calc__footer'
    });
  }

  var fromSelect = {
    options: {
      placeholder: 'Текущее звание',
      options: rankOptions,
      onChange: function onChange(value) {
        rankUp.from = value;
        updatePrice(rankUp);
        document.querySelector('[id="image-from"]').src = rankImages[value.id];
      }
    },
    selector: '[id="select-from"]'
  };
  var toSelect = {
    selector: '[id="select-to"]',
    options: {
      placeholder: 'Желаемое звание звание',
      options: rankOptions,
      onChange: function onChange(value) {
        rankUp.to = value;
        updatePrice(rankUp);
        document.querySelector('[id="image-to"]').src = rankImages[value.id];
      }
    }
  };
  var children = [function () {
    return (0, _partials.renderHeaderOptions)({
      options: tabs,
      onChange: function onChange(option) {
        renderPage({
          page: option.currentTarget.dataset.page,
          parent: '.calc-wrapper'
        });
      },
      parent: '.calc__header'
    });
  }, function () {
    return (0, _partials.renderBody)({
      parent: '.calc__body',
      selects: [fromSelect, toSelect],
      options: optionalFields,
      onOptionsChange: function onOptionsChange(_ref2) {
        var selects = _ref2.selects,
            options = _ref2.options;
        rankUp.options = options;

        if (selects.find(function (value) {
          return value === null;
        }) !== undefined) {
          document.querySelector('.calc__footer').innerHTML = '';
          (0, _partials.renderFooter)({
            total: 'Выберите звания',
            isValid: false,
            parent: '.calc__footer'
          });
          return;
        }

        updatePrice(rankUp);
      }
    });
  }, function () {
    return (0, _partials.renderFooter)({
      total: 'Выберите звания',
      isValid: false,
      parent: '.calc__footer'
    });
  }];

  function render() {
    return "\n            <div class=\"calc__header\"></div>\n            <div class=\"calc__body\"></div>\n            <div class=\"calc__footer\"></div>\n        ";
  }

  document.querySelector(parent).insertAdjacentHTML('beforeEnd', render());
  children.forEach(function (child) {
    return child();
  });
}

function wingmanPage(_ref3) {
  var parent = _ref3.parent;
  var tabs = [{
    id: 0,
    value: 'mm',
    label: 'По званию',
    isActive: false
  }, {
    id: 1,
    value: 'wingman',
    label: 'По званию напарники',
    isActive: true
  }];
  var optionalFields = [{
    id: 0,
    value: function value(_value4) {
      return _value4 * 1.5;
    },
    label: 'Без передачи аккаунта',
    description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
    checked: false
  }, {
    id: 1,
    value: function value(_value5) {
      return _value5 * 1.3;
    },
    label: 'Приорити',
    description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
    checked: false
  }, {
    id: 2,
    value: function value(_value6) {
      return _value6 + 490;
    },
    label: 'Стрим заказа',
    description: 'Эта услуга позволяет вам играть с нами, без передачи аккаунта',
    checked: false
  }];
  var rankUp = {
    from: null,
    to: null,
    options: optionalFields
  };

  function updatePrice(settings) {
    if (settings.from === null || settings.to === null) {
      document.querySelector('.calc__footer').innerHTML = '';
      (0, _partials.renderFooter)({
        total: 'Выберите звания',
        isValid: false,
        parent: '.calc__footer'
      });
      return;
    }

    if (settings.to.id <= settings.from.id) {
      document.querySelector('.calc__footer').innerHTML = '';
      (0, _partials.renderFooter)({
        total: 'Желаемое звание должно быть выше нынешего',
        isValid: false,
        parent: '.calc__footer'
      });
      return;
    }

    var total = 0;

    for (var i = parseInt(settings.from.id) + 1; i <= settings.to.id; i++) {
      total += parseInt(rankOptions[i].value);
    }

    settings.options.forEach(function (param) {
      if (param.checked) total = param.value(total);
    });
    total = Math.ceil(total);
    document.querySelector('.calc__footer').innerHTML = '';
    (0, _partials.renderFooter)({
      total: total,
      isValid: true,
      parent: '.calc__footer'
    });
  }

  var fromSelect = {
    options: {
      placeholder: 'Текущее звание',
      options: rankOptions,
      onChange: function onChange(value) {
        rankUp.from = value;
        updatePrice(rankUp);
        document.querySelector('[id="image-from"]').src = rankImages[value.id];
      }
    },
    selector: '[id="select-from"]'
  };
  var toSelect = {
    selector: '[id="select-to"]',
    options: {
      placeholder: 'Желаемое звание звание',
      options: rankOptions,
      onChange: function onChange(value) {
        rankUp.to = value;
        updatePrice(rankUp);
        document.querySelector('[id="image-to"]').src = rankImages[value.id];
      }
    }
  };
  var children = [function () {
    return (0, _partials.renderHeaderOptions)({
      options: tabs,
      onChange: function onChange(option) {
        renderPage({
          page: option.currentTarget.dataset.page,
          parent: '.calc-wrapper'
        });
      },
      parent: '.calc__header'
    });
  }, function () {
    return (0, _partials.renderBody)({
      parent: '.calc__body',
      selects: [fromSelect, toSelect],
      options: optionalFields,
      onOptionsChange: function onOptionsChange(_ref4) {
        var selects = _ref4.selects,
            options = _ref4.options;
        rankUp.options = options;

        if (selects.find(function (value) {
          return value === null;
        }) !== undefined) {
          document.querySelector('.calc__footer').innerHTML = '';
          (0, _partials.renderFooter)({
            total: 'Выберите звания',
            isValid: false,
            parent: '.calc__footer'
          });
          return;
        }

        updatePrice(rankUp);
      }
    });
  }, function () {
    return (0, _partials.renderFooter)({
      total: 'Выберите звания',
      isValid: false,
      parent: '.calc__footer'
    });
  }];

  function render() {
    return "\n            <div class=\"calc__header\"></div>\n            <div class=\"calc__body\"></div>\n            <div class=\"calc__footer\"></div>\n        ";
  }

  document.querySelector(parent).insertAdjacentHTML('beforeEnd', render());
  children.forEach(function (child) {
    return child();
  });
}

function renderPage(_ref5) {
  var page = _ref5.page,
      parent = _ref5.parent;
  document.querySelector(parent).innerHTML = " \n        <div class=\"calc\"></div>\n    ";

  function render() {
    switch (page) {
      case 'wingman':
        wingmanPage({
          parent: '.calc'
        });
        break;

      case 'mm':
      default:
        mmPage({
          parent: '.calc'
        });
    }
  }

  render();
}

var _default = renderPage;
exports.default = _default;
},{"./select":"js/select.js","./partials":"js/partials.js","../assets/ranks/silver-1.jpg":"assets/ranks/silver-1.jpg","../assets/ranks/silver-2.jpg":"assets/ranks/silver-2.jpg","../assets/ranks/silver-3.jpg":"assets/ranks/silver-3.jpg","../assets/ranks/silver-4.jpg":"assets/ranks/silver-4.jpg","../assets/ranks/silver-5.jpg":"assets/ranks/silver-5.jpg","../assets/ranks/silver-6.jpg":"assets/ranks/silver-6.jpg","../assets/ranks/gn-1.jpg":"assets/ranks/gn-1.jpg","../assets/ranks/gn-2.jpg":"assets/ranks/gn-2.jpg","../assets/ranks/gn-3.jpg":"assets/ranks/gn-3.jpg","../assets/ranks/gn-4.jpg":"assets/ranks/gn-4.jpg","../assets/ranks/ak-1.jpg":"assets/ranks/ak-1.jpg","../assets/ranks/ak-2.jpg":"assets/ranks/ak-2.jpg","../assets/ranks/ak-3.jpg":"assets/ranks/ak-3.jpg","../assets/ranks/bs.jpg":"assets/ranks/bs.jpg","../assets/ranks/le.jpg":"assets/ranks/le.jpg","../assets/ranks/lem.jpg":"assets/ranks/lem.jpg","../assets/ranks/sup.jpg":"assets/ranks/sup.jpg","../assets/ranks/glob.jpg":"assets/ranks/glob.jpg"}],"js/index.js":[function(require,module,exports) {
"use strict";

require("../styles/index.scss");

var _select = require("./select.js");

var _pages = _interopRequireDefault(require("./pages.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _pages.default)({
  page: 'mm',
  parent: '.calc-wrapper'
});
},{"../styles/index.scss":"styles/index.scss","./select.js":"js/select.js","./pages.js":"js/pages.js"}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57900" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map