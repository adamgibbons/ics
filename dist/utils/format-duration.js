'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDuration;
function formatDuration() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var weeks = attributes.weeks,
      days = attributes.days,
      hours = attributes.hours,
      minutes = attributes.minutes,
      seconds = attributes.seconds;


  var formattedDuration = 'P';
  formattedDuration += weeks ? weeks + 'W' : '';
  formattedDuration += days ? days + 'D' : '';
  formattedDuration += 'T';
  formattedDuration += hours ? hours + 'H' : '';
  formattedDuration += minutes ? minutes + 'M' : '';
  formattedDuration += seconds ? seconds + 'S' : '';

  return formattedDuration;
}