'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // 
// FORM #2: DATE WITH UTC TIME
// 
// The date with UTC time, or absolute time, is identified by a LATIN
// CAPITAL LETTER Z suffix character, the UTC designator, appended to
// the time value.  For example, the following represents January 19,
// 1998, at 0700 UTC:
// 
// 19980119T070000Z
// 
// The "TZID" property parameter MUST NOT be applied to DATE-TIME
// properties whose time values are specified in UTC.
// 

exports.default = setDateWithUTCtime;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setDateWithUTCtime() {
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

    var formattedDate = (0, _moment2.default)([year, month - 1, date, hours, minutes, seconds]).utc().format('YYYYMMDDTHHmm00') + 'Z';

    return formattedDate;
  }

  return (0, _moment2.default)().utc().format('YYYYMMDDTHHmm00') + 'Z';
}