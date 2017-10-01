'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setAlarm;

var _setDate = require('./set-date');

var _setDate2 = _interopRequireDefault(_setDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setDuration(_ref) {
  var weeks = _ref.weeks,
      days = _ref.days,
      hours = _ref.hours,
      minutes = _ref.minutes,
      seconds = _ref.seconds;

  var formattedString = 'P';
  formattedString += weeks ? weeks + 'W' : '';
  formattedString += days ? days + 'D' : '';
  formattedString += 'T';
  formattedString += hours ? hours + 'H' : '';
  formattedString += minutes ? minutes + 'M' : '';
  formattedString += seconds ? seconds + 'S' : '';

  return formattedString;
}

function setAlarm() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = attributes.action,
      repeat = attributes.repeat,
      description = attributes.description,
      duration = attributes.duration,
      attach = attributes.attach,
      trigger = attributes.trigger,
      summary = attributes.summary;


  var formattedString = 'BEGIN:VALARM\r\n';
  formattedString += 'ACTION:' + action + '\r\n';
  formattedString += repeat ? 'REPEAT:' + repeat + '\r\n' : '';
  formattedString += description ? 'DESCRIPTION:' + description + '\r\n' : '';
  formattedString += duration ? 'DURATION:' + setDuration(duration) + '\r\n' : '';
  formattedString += attach ? 'ATTACH;FMTTYPE=audio/basic:' + attach + '\r\n' : '';
  formattedString += trigger ? 'TRIGGER;VALUE=DATE-TIME:' + (0, _setDate2.default)(trigger) + '\r\n' : '';
  formattedString += summary ? 'SUMMARY:' + summary + '\r\n' : '';
  formattedString += 'END:VALARM\r\n';

  return formattedString;
}

// Example:  A duration of 15 days, 5 hours, and 20 seconds would be:

// P15DT5H0M20S

// A duration of 7 weeks would be:

// P7W