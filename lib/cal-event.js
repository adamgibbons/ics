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

function CalEvent(options) {
  var options = options || {};
  this._init(options);
  this._create();
}

// CalEvents
CalEvent.prototype._init = function(options) {
  this.dtstamp = getDTStamp(options);
  this.organizer = getOrganizer(options);
  this.dtstart = getDTStart(options);
  this.dtend = getDTEnd(options);
  this.summary = options.eventName || 'New Event';
  this.description = options.description || false;
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

module.exports = CalEvent;
