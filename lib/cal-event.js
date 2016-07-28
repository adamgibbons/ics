var fs = require('fs');
var path = require('path');

var TMPDIR = require('os').tmpdir();

var ACTION = {
	INVITE : 'REQUEST',
	CANCEL : 'CANCEL'
};

var STATUS = {
	INVITE : 'TENTATIVE',
	CANCEL : 'CANCELLED'
};

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
		return new Date(options.dtstart);
	}

	return new Date();
}

function getDTEnd(options) {
	if (options.dtend) {
		return new Date(options.dtend);
	}

	var start = options.dtstart ? new Date(options.dtstart) : new Date();
	var end = start.setHours(start.getHours() + 1)

	return new Date(end);
}

function getOrganizer(options) {
	var organizer = false;
	var org = options.organizer;
	var organizerIsValid = org && org.email && org.name;
	if (organizerIsValid) {
		organizer = {
			name : org.name,
			email : org.email
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
	this.summary = options.eventName || 'Event';
	this.description = options.description || false;
	this.location = options.location || false;
	this.attendees = getAttendees(options);

	this.uid = options.uid;
	this.sequence = options.sequence;

	if (options.action === ACTION.CANCEL) {
		this.method = ACTION.CANCEL;
		this.status = STATUS.CANCEL;
	} else {
		this.method = ACTION.INVITE;
		this.status = STATUS.INVITE;
	}
}

CalEvent.prototype._create = function() {
	var props = [];
	var createdDate = formatDateTimeStamp(new Date());

	props.push('BEGIN:VCALENDAR');
	props.push('PRODID:-//Microsoft Corporation//Outlook 14.0 MIMEDIR//EN');
	props.push('VERSION:2.0');
	props.push('CALSCALE:GREGORIAN');
	props.push('METHOD:' + this.method);

	props.push('BEGIN:VTIMEZONE');
	props.push('TZID:UTC');
	props.push('BEGIN:STANDARD');
	props.push('DTSTART:16010101T000000');
	props.push('TZOFFSETFROM:-0000');
	props.push('TZOFFSETTO:-0000');
	props.push('END:STANDARD');
	props.push('END:VTIMEZONE');

	props.push('BEGIN:VEVENT');
	props.push('CLASS:PUBLIC');
	props.push('CREATED:' + createdDate);
	props.push('LAST-MODIFIED:' + createdDate);
	props.push('UID:' + this.uid);
	props.push('SEQUENCE:' + this.sequence);
	props.push('PRIORITY:5');
	if (this.description) {
		//Must escape linebreaks, semicolon and comma
		props.push('DESCRIPTION:' + this.description.replace(/\r/g, "").replace(/\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,"));
	}
	props.push('DTSTAMP:' + this.dtstamp);
	props.push('DTSTART;TZID=UTC:' + formatDateTimeStamp(this.dtstart));
	props.push('DTEND;TZID=UTC:' + formatDateTimeStamp(this.dtend));

	if (this.location) {
		props.push('LOCATION:' + this.location);
	}
	props.push('STATUS:' + this.status);

	if (this.organizer) {
		var organizer = 'ORGANIZER;CN=' + this.organizer.name;
		organizer += ':MAILTO:' + this.organizer.email;
		props.push(organizer);
	}

	if (this.attendees) {
		this.attendees.forEach(function(obj) {
			function check(type) {
				return type ? 'TRUE' : 'FALSE';
			}

			var attendee = 'ATTENDEE;CN=' + obj.name + ';RSVP=TRUE:mailto:' + obj.email;
			props.push(attendee);
		})
	}
	props.push('SUMMARY:' + this.summary);
	props.push('TRANSP:OPAQUE');
	props.push('BEGIN:VALARM');
	props.push('TRIGGER:-PT60M');
	props.push('ACTION:DISPLAY');
	props.push('DESCRIPTION:Reminder');
	props.push('END:VALARM');

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
		if (err) {
			return cb(err);
		}
		return cb(null, dest);
	});
}

module.exports = {
	ACTION : ACTION,
	createEvent : createEvent,
	getEvent : getEvent
}