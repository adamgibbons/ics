// Helpers
function formatTimeStamp(date) {
  return '19970714T170000Z';
}

function getDTStart() {
  return '19970714T170000Z';
}

function getDTEnd() {
  return '19970714T170000Z';
}

function CalEvent(options) {
  var options = options || {};
  this._init(options);
  this._create();
}

// CalEvent
CalEvent.prototype._init = function(options) {
  this.dtstamp = options.dtstamp || formatTimeStamp(new Date());
  this.organizer = options.organizer || false;
  this.dtstart = options.dtstart || getDTStart();
  this.dtend = options.dtend || getDTEnd();
  this.summary = options.summary || 'New Event';
}

CalEvent.prototype._create = function() {
  var props = [];

  props.push('BEGIN:VCALENDAR');
  props.push('VERSION:2.0');
  props.push('BEGIN:VEVENT');
  props.push('DTSTAMP:' + this.dtstamp);
  if (this.organizer) props.push('ORGANIZER:' + this.organizer);
  props.push('DTSTART:' + this.dtstart);
  props.push('DTEND:' + this.dtend);
  props.push('SUMMARY:' + this.summary);
  props.push('END:VEVENT');
  props.push('END:VCALENDAR');

  this.formattedICSFile = props.join('\r\n');
}

CalEvent.prototype.getEvent = function() {
  return this.formattedICSFile;
};

module.exports = CalEvent;
