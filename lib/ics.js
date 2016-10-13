var fs = require('fs');
var path = require('path');

var TMPDIR = require('os').tmpdir();

var moment = require('moment');
var uuid = require('node-uuid');

var _ = require('lodash');


// function formatDateTimeStamp(date, hasTZID) {

//   if (hasTZID) {
//     return moment(date).format('YYYYMMDDTHHmm00');
//   }

// function getTZID(options) {
//   if(options.tzid) {
//     return ';TZID=' + options.tzid;
//   }
//   return '';
// }

// function getOrganizer(options) {
//   var organizer = false;
//   var org = options.organizer;
//   var organizerIsValid = org && org.email && org.name;
//   if (organizerIsValid) {
//     organizer = {
//       name: org.name,
//       email: org.email
//     };
//   }

//   return organizer;
// }

// function getAttendees(options) {
//   var attendees = false;
//   var att = options.attendees;
//   var attendeesIsValid = att && att[0].email && att[0].name;
//   if (attendeesIsValid) {
//     attendees = options.attendees
//   }

//   return attendees;
// }

function generateUID() {
  return 'UID:' + uuid.v1() + '@agibbons.com';
}

function setFileExtension(dest) {
  return dest.slice(-4) === '.ics' ? dest : dest.concat('.ics');
}

// }


//   if (this.organizer) {
//     var organizer = 'ORGANIZER;CN=' + this.organizer.name;
//     organizer += ':MAILTO:' + this.organizer.email;
//     props.push(organizer);
//   }

//   if (this.attendees){
//     this.attendees.forEach(function(obj){
//       function check(type) { return type ? 'TRUE' : 'FALSE'; }
//       var attendee = 'ATTENDEE;CN="' + obj.name + '";RSVP=' + check(obj.rsvp || false) + ':mailto:' + obj.email;
//       props.push(attendee);
//     })

//   if (this.location) {
//     props.push('LOCATION:' + this.location);
//   }


// function buildEvent(options) {
//   return new CalEvent(options).formattedICSFile;
// }

function createEvent(options, filepath, cb) {
  var dest;
  var options = options || {};
  var cal = new CalEvent(options);
  var data = cal.buildEvent();

  if (filepath) {
    dest = path.join(filepath);
  } else if (options.filename) {
    dest = setFileExtension(path.join(TMPDIR, options.filename));
  } else {
    dest = path.join(TMPDIR, 'calendar-event.ics');
  }

  fs.writeFile(dest, data, function(err) {
    if (err) { return cb(err) };
    return cb(null, dest);
  });
}

function ICS() {}

ICS.prototype.buildEvent = function(attributes) {
  return buildEvent(attributes);
};

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

// support: 

// DTSTART
// DTEND
// SUMMARY
// DESCRIPTION
// LOCATION
// URL
// CATEGORIES
// GEO


// ATTACH




  // ; The following are OPTIONAL,
  // ; but MUST NOT occur more than once.
  // ;
  // organizer
  // recurid

  // ; The following are OPTIONAL,
  // ; and MAY occur more than once.
  // ;
  // attendee
  // comment
  // contact

  // RRULE:FREQ=YEARLY


function buildEvent(attributes) {
  // Return a default event if no attributes are passed
  if (!attributes || _.isEmpty(attributes)) {
    return buildDefaultEvent();
  }

  var file = [
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
  .concat(['END:VEVENT', 'END:VCALENDAR']);

  return _.compact(file).join('\r\n');
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

module.exports = ICS;
