var fs = require('fs');
var path = require('path');

var TMPDIR = require('os').tmpdir();

// Helpers
function formatDateTimeStamp(date) {
  var formatted = date.toISOString()
    .replace(/-|:/g, '')
    .slice(0, 13)
    .concat('00Z');

  return formatted;
}

function getDTStamp(options) {
  if (options.dtstamp) {
    return formatDateTimeStamp(new Date(options.dtstamp));
  }

  return formatDateTimeStamp(new Date());
}

function getDTStart(options) {
  if (options.dtstart) {
    return formatDateTimeStamp(new Date(options.dtstart));
  }

  return formatDateTimeStamp(new Date());
}

function getDTEnd(options) {
  if (options.dtend) {
    return formatDateTimeStamp(new Date(options.dtend));
  }

  var start = options.dtstart ? new Date(options.dtstart) : new Date();
  var end = start.setHours(start.getHours() + 1)

  return formatDateTimeStamp(new Date(end));
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

function setFileExtension(dest) {
  return dest.slice(-4) === '.ics' ? dest : dest.concat('.ics');
}

// CalEvent prototype
function CalEvent(options) {
  var options = options || {};
  this._init(options);
  this._create();
}

CalEvent.prototype._init = function(options) {
  this.dtstamp = getDTStamp(options);
  this.organizer = getOrganizer(options);
  this.dtstart = getDTStart(options);
  this.dtend = getDTEnd(options);
  this.summary = options.eventName || 'New Event';
  this.description = options.description || false;
  this.location = options.location || false;
}

CalEvent.prototype._create = function() {
  var props = [];

  props.push('BEGIN:VCALENDAR');
  props.push('VERSION:2.0');
  props.push('BEGIN:VEVENT');
  props.push('DTSTAMP:' + this.dtstamp);
  if (this.organizer) {
    var organizer = 'ORGANIZER;CN=' + this.organizer.name;
    organizer += ':MAILTO:' + this.organizer.email;
    props.push(organizer);
  }
  props.push('DTSTART:' + this.dtstart);
  props.push('DTEND:' + this.dtend);
  if (this.location) {
    props.push('LOCATION:' + this.location);
  }
  if (this.description) {
    props.push('DESCRIPTION:' + this.description);
  }
  props.push('SUMMARY:' + this.summary);
  props.push('END:VEVENT');
  props.push('END:VCALENDAR');

  this.formattedICSFile = props.join('\r\n');
}

CalEvent.prototype.getEvent = function() {
  return this.formattedICSFile;
};

function getEvent(options) {
  return new CalEvent(options).formattedICSFile;
}

function createEvent(options, filepath, cb) {
  var dest;
  var options = options || {};
  var cal = new CalEvent(options);
  var data = cal.getEvent();

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

module.exports = {
  createEvent: createEvent,
  getEvent: getEvent
}
