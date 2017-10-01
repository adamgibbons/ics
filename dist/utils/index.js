'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDuration = exports.setAlarm = exports.setContact = exports.setGeolocation = exports.setDateWithLocalTime = exports.setDateWithUTCtime = exports.setDate = undefined;

var _setDate = require('./set-date');

var _setDate2 = _interopRequireDefault(_setDate);

var _setDateWithUtcTime = require('./set-date-with-utc-time');

var _setDateWithUtcTime2 = _interopRequireDefault(_setDateWithUtcTime);

var _setDateWithLocalTime = require('./set-date-with-local-time');

var _setDateWithLocalTime2 = _interopRequireDefault(_setDateWithLocalTime);

var _setGeolocation = require('./set-geolocation');

var _setGeolocation2 = _interopRequireDefault(_setGeolocation);

var _setContact = require('./set-contact');

var _setContact2 = _interopRequireDefault(_setContact);

var _setAlarm = require('./set-alarm');

var _setAlarm2 = _interopRequireDefault(_setAlarm);

var _formatDuration = require('./format-duration');

var _formatDuration2 = _interopRequireDefault(_formatDuration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.setDate = _setDate2.default;
exports.setDateWithUTCtime = _setDateWithUtcTime2.default;
exports.setDateWithLocalTime = _setDateWithLocalTime2.default;
exports.setGeolocation = _setGeolocation2.default;
exports.setContact = _setContact2.default;
exports.setAlarm = _setAlarm2.default;
exports.formatDuration = _formatDuration2.default;