var _ = require('lodash');
var moment = require('moment');
var uuid = require('node-uuid');


function ICS() {}

ICS.prototype.buildEvent = function(attributes) {
  return buildEvent(attributes);

  function buildEvent(attributes) {
    // Return a default event if no attributes are passed
    if (!attributes || _.isEmpty(attributes)) {
      return buildDefaultEvent();
    } else {  
      return _.compact([
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Adam Gibbons//agibbons.com//ICS: iCalendar Generator',
        'BEGIN:VEVENT',
        generateUID(),
        'DTSTAMP:' + generateDateTimeStamp(),
        attributes.start ? 'DTSTART:' + formatDTSTART(attributes.start) : null,
        formatDTEND(attributes.start, attributes.end),
        formatProperty('SUMMARY', attributes.eventName),
        formatProperty('DESCRIPTION', attributes.description),
        formatProperty('LOCATION', attributes.location),
        formatProperty('URL', attributes.url),
        formatProperty('LOCATION', attributes.location),
        formatStatus(attributes.status),
        formatGeo(attributes.geo)
      ]
      .concat(formatCategories(attributes))
      .concat(formatAttachments(attributes))
      .concat(['END:VEVENT', 'END:VCALENDAR'])).join('\r\n');
    }

    function buildDefaultEvent() {
      var file = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Adam Gibbons//agibbons.com//ICS: iCalendar Generator',
        'BEGIN:VEVENT',
        generateUID(),
        'DTSTAMP:' + generateDateTimeStamp(),
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      return file;
    }

    function generateUID() {
      return 'UID:' + uuid.v1() + '@agibbons.com';
    }

    function setFileExtension(dest) {
      return dest.slice(-4) === '.ics' ? dest : dest.concat('.ics');
    }

    // Follow ISO 8601 string rules:
    // If `start` contains an uppercase T or a space,
    // it's a date-time; otherwise, it's just a date.
    function formatDTSTART(string) {
      var date = new Date(string);

      if (isDateTime(string)) {
        return moment(date).format('YYYYMMDDTHHmm00') + 'Z';
      }

      return moment(date).format('YYYYMMDD');
    }

    function formatDTEND(startString, endString) {
      var endDate = endString ? new Date(endString) : new Date(startString);

      if (!endString && isDateTime(startString)) {
        return 'DTEND:' + moment(new Date(startString)).format('YYYYMMDDTHHmm00') + 'Z';
      }

      if (isDateTime(startString)) {
        return 'DTEND:' + moment(endDate).format('YYYYMMDDTHHmm00') + 'Z';
      }

      return 'DTEND:' + moment(endDate).format('YYYYMMDD');
    }

    function isDateTime(string) {
      return ['T', ' '].some(function (char) {
        return string.search(char) !== -1;
      });
    }

    function generateDateTimeStamp() {
      return moment().format('YYYYMMDDTHHmmss') + 'Z';
    }

    function formatProperty(key, value) {
      if (value) {
        return key + ':' + value;
      }

      return null;
    }

    function formatAttachments(attributes) {
      if (attributes.attachments) {
        return attributes.attachments.map(function (path) {
          return 'ATTACH:' + path;
        });
      }
      return null;
    }

    function formatCategories(attributes) {
      if (attributes.categories) {
        return 'CATEGORIES:' + attributes.categories.join(',');
      }
      
      return null;
    }

    function formatGeo(geo) {
      if (geo && geo.lat && geo.lon) {
        return 'GEO:' + parseFloat(geo.lat) + ';' + parseFloat(geo.lon);
      }

      return null;
    }

    function formatStatus(status) {
      if (status && ['TENTATIVE', 'CONFIRMED', 'CANCELLED'].indexOf(status.toUpperCase()) !== -1) {
        return 'STATUS:' + status;
      }

      return null;
    }
  }
};

module.exports = ICS;