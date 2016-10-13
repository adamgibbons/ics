var fs = require('fs');
var path = require('path');

var TMPDIR = require('os').tmpdir();

var moment = require('moment');
var uuid = require('node-uuid');

var _ = require('lodash');

// Helpers
function formatDateTimeStamp(date, hasTZID) {

  if (hasTZID) {
    return moment(date).format('YYYYMMDDTHHmm00');
  }

  return date
    .toISOString()
    .replace(/-|:/g, '')
    .slice(0, 13)
    .concat('00Z');
}

function getDTStamp(options) {
  if (options.dtstamp) {
    return formatDateTimeStamp(new Date(options.dtstamp));
  }

  return formatDateTimeStamp(new Date());
}

function getDTStart(options) {
  if (options.dtstart) {
    return formatDateTimeStamp(new Date(options.dtstart), options.tzid);
  }

  return formatDateTimeStamp(new Date());
}

function getDTEnd(options) {
  if (options.dtend) {
    return formatDateTimeStamp(new Date(options.dtend), options.tzid);
  }

  var start = options.dtstart ? new Date(options.dtstart) : new Date();
  var end = start.setHours(start.getHours() + 1)

  return formatDateTimeStamp(new Date(end));
}

function getTZID(options) {
  if(options.tzid) {
    return ';TZID=' + options.tzid;
  }
  return '';
}

function getOrganizer(options) {
  var organizer = false;
  var org = options.organizer;
  var organizerIsValid = org && org.email && org.name;
  if (organizerIsValid) {
    organizer = {
      name: org.name,
      email: org.email
    };
  }

  return organizer;
}

function getAttendees(options) {
  var attendees = false;
  var att = options.attendees;
  var attendeesIsValid = att && att[0].email && att[0].name;
  if (attendeesIsValid) {
    attendees = options.attendees
  }

  return attendees;
}

function generateUID() {
  return uuid.v1() + '@agibbons.com';
}

function setFileExtension(dest) {
  return dest.slice(-4) === '.ics' ? dest : dest.concat('.ics');
}

// CalEvent.prototype.init = function(attributes) {
  // this.dtstamp = getDTStamp(options);
  // this.organizer = getOrganizer(options);
  // this.dtstart = getDTStart(options);
  // this.dtend = getDTEnd(options);
  // this.tzid = getTZID(options);
  // this.summary = options.eventName || 'New Event';
  // this.description = options.description || false;
  // this.location = options.location || false;
  // this.attendees = getAttendees(options);
  // this.uid = generateUID();
// }

// CalEvent.prototype._create = function() {
//   var props = [];

//   props.push('BEGIN:VCALENDAR');
//   props.push('VERSION:2.0');
//   props.push('PRODID:-//Adam Gibbons//agibbons.com//ICS: iCalendar Generator');
//   props.push('BEGIN:VEVENT');
//   props.push('DTSTAMP:' + this.dtstamp);
//   props.push('UID:' + this.uid);

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
//   }
//   props.push('DTSTART'+ this.tzid +':' + this.dtstart);
//   props.push('DTEND'+ this.tzid +':' + this.dtend);
//   if (this.location) {
//     props.push('LOCATION:' + this.location);
//   }
//   if (this.description) {
//     props.push('DESCRIPTION:' + this.description);
//   }
//   props.push('SUMMARY:' + this.summary);
//   props.push('END:VEVENT');
//   props.push('END:VCALENDAR');

//   this.formattedICSFile = props.join('\r\n');
// }

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
    'UID:' + generateUID(),
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


  // ; The following are OPTIONAL,
  // ; but MUST NOT occur more than once.
  // ;
  // class / created / description / geo /
  // last-mod / location / organizer / priority /
  // seq / status / summary / transp /
  // url / recurid /

  // attachment (uri)


  // ; The following are OPTIONAL,
  // ; and MAY occur more than once.
  // ;
  // attach / attendee / categories / comment /
  // contact / exdate / rstatus / related /
  // resources / rdate / x-prop / iana-prop

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
    'UID:' + generateUID(),
    'DTSTAMP:' + generateDateTimeStamp(),
    attributes.start ? 'DTSTART:' + formatDTSTART(attributes.start) : null,
    formatDTEND(attributes.start, attributes.end),
    formatProperty('SUMMARY', attributes.eventName),
    formatProperty('DESCRIPTION', attributes.description),
    formatProperty('LOCATION', attributes.location),
    formatProperty('URL', attributes.url)
  ]
  .concat(formatCategories(attributes))
  .concat(formatAttachments(attributes))
  .concat(['END:VEVENT', 'END:VCALENDAR']);

  // .concat(formatAttachments(attributes))


  // console.log(file);

  return _.compact(file).join('\r\n');

  // description
  // summary
  // url
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

module.exports = ICS;
