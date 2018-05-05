'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setTimezone;
function setTimezone(timezone) {
  if (!timezone) {
    return '';
  }

  return ';TZID=' + timezone;
}