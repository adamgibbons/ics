'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = setDate;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setDate() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utc';

  var _args = _slicedToArray(args, 6),
      year = _args[0],
      month = _args[1],
      date = _args[2],
      hours = _args[3],
      minutes = _args[4],
      seconds = _args[5];

  if (args.length === 3) {
    return (0, _moment2.default)([year, month - 1, date]).format('YYYYMMDD');
  }

  if (type === 'local') {
    return (0, _index.setDateWithLocalTime)([year, month, date, hours, minutes, seconds || 0]);
  }

  // type === 'utc'
  return (0, _index.setDateWithUTCtime)([year, month, date, hours, minutes, seconds || 0]);
}