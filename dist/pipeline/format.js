'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatCalendar = exports.formatEvent = undefined;

var _utils = require('../utils');

function formatEvent() {
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var title = attributes.title,
      productId = attributes.productId,
      uid = attributes.uid,
      timestamp = attributes.timestamp,
      start = attributes.start,
      startType = attributes.startType,
      duration = attributes.duration,
      end = attributes.end,
      description = attributes.description,
      url = attributes.url,
      geo = attributes.geo,
      location = attributes.location,
      status = attributes.status,
      categories = attributes.categories,
      organizer = attributes.organizer,
      attendees = attributes.attendees,
      alarms = attributes.alarms;


  var icsFormat = '';
  icsFormat += 'BEGIN:VEVENT\r\n';
  icsFormat += 'UID:' + uid + '\r\n';
  icsFormat += 'SUMMARY:' + title + '\r\n';
  icsFormat += 'DTSTAMP:' + timestamp + '\r\n';
  icsFormat += 'DTSTART:' + (0, _utils.setDate)(start, startType) + '\r\n';
  icsFormat += end ? 'DTEND:' + (0, _utils.setDate)(end, startType) + '\r\n' : '';
  icsFormat += description ? 'DESCRIPTION:' + description + '\r\n' : '';
  icsFormat += url ? 'URL:' + url + '\r\n' : '';
  icsFormat += geo ? 'GEO:' + (0, _utils.setGeolocation)(geo) + '\r\n' : '';
  icsFormat += location ? 'LOCATION:' + location + '\r\n' : '';
  icsFormat += status ? 'STATUS:' + status + '\r\n' : '';
  icsFormat += categories ? 'CATEGORIES:' + categories + '\r\n' : '';
  icsFormat += organizer ? 'ORGANIZER;' + (0, _utils.setContact)(organizer) + '\r\n' : '';
  if (attendees) {
    attendees.map(function (attendee) {
      icsFormat += 'ATTENDEE;' + (0, _utils.setContact)(attendee) + '\r\n';
    });
  }
  if (alarms) {
    alarms.map(function (alarm) {
      icsFormat += (0, _utils.setAlarm)(alarm);
    });
  }

  icsFormat += duration ? 'DURATION:' + (0, _utils.formatDuration)(duration) + '\r\n' : '';
  icsFormat += 'END:VEVENT\r\n';
  return icsFormat;
}
function formatCalendar(icsEvents, productId) {
  // if(icsEvents=="") throw "Events Required"
  var icsFormat = '';
  icsFormat += 'BEGIN:VCALENDAR\r\n';
  icsFormat += 'VERSION:2.0\r\n';
  icsFormat += 'CALSCALE:GREGORIAN\r\n';
  icsFormat += 'PRODID:' + productId + '\r\n';
  icsFormat += icsEvents;

  icsFormat += 'END:VCALENDAR\r\n';
  return icsFormat;
}

exports.formatEvent = formatEvent;
exports.formatCalendar = formatCalendar;