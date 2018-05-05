'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // 
// DATE-TIME
// FORM #1: DATE WITH LOCAL TIME
// 
// The date with local time form is simply a DATE-TIME value that
// does not contain the UTC designator nor does it reference a time
// zone. DATE-TIME values of this type are said to be "floating" 
// and are not bound to any time zone in particular.
// 
// For example, the following represents
// January 18, 1998, at 11 PM:
// 
// 19980118T230000
// 

exports.default = setDateWithLocalTime;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setDateWithLocalTime() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  if (args.length > 0) {
    var _args = _slicedToArray(args, 6),
        year = _args[0],
        month = _args[1],
        date = _args[2],
        _args$ = _args[3],
        hours = _args$ === undefined ? 0 : _args$,
        _args$2 = _args[4],
        minutes = _args$2 === undefined ? 0 : _args$2,
        _args$3 = _args[5],
        seconds = _args$3 === undefined ? 0 : _args$3;

    var formattedDate = (0, _moment2.default)([year, month - 1, date, hours, minutes, seconds]).format('YYYYMMDDTHHmm00');
    return formattedDate;
  }

  return (0, _moment2.default)().format('YYYYMMDDTHHmm00');
}