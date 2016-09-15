module.exports = (function () {
  'use strict';

  // Imports
  var fs = require('fs');
  var os = require('os');
  var path = require('path');
  var util = require('util');

  var _ = require('lodash');
  var moment = require('moment');
  var momenttz = require('moment-timezone');

  // System stuff
  var TMPDIR = os.tmpdir();
  var SYSTEM_LINE_BREAK = os.EOL;
  var timezone = momenttz.tz.guess();

  // Configuration
  var DEFAULT_EVENT_NAME = 'New Event';
  var DEFAULT_FILE_NAME = 'calendar-event.ics';
  var DEFAULT_ATTENDEE_RSVP = false;

  // Ical format stuff
  var inputTimeFormat = 'YYYY-MM-DDTHH:mm:ssZ'; // Basically, ISO_8601
  var icalTimeFormat = 'YYYYMMDDTHHmmss';
  var timeProperty = function (name, dtstamp) {
    return name + ';TZID=' + timezone + ':' + dtstamp;
  };

  var ICAL_FORMATTERS = {
    calendarHeader: function () { return [ 'BEGIN:VCALENDAR', 'VERSION:2.0' ].join(SYSTEM_LINE_BREAK); },
    calendarFooter: function () { return 'END:VCALENDAR'; },

    eventHeader: function (dtstamp) { return [ 'BEGIN:VEVENT', timeProperty('DTSTAMP', dtstamp) ].join(SYSTEM_LINE_BREAK); },
    eventFooter: function () { return 'END:VEVENT'; },

    organizer: function (organizer) { return 'ORGANIZER;CN=' + organizer.name + ':MAILTO:' + organizer.email; },
    attendee: function (attendee) { return 'ATTENDEE;CN="' + attendee.name + '";RSVP=' + attendee.rsvp + ':MAILTO:' + attendee.email; },
    dtstart: function (dtstamp) { return timeProperty('DTSTART', dtstamp); },
    dtend: function (dtstamp) { return timeProperty('DTEND', dtstamp); },
    location: function (location) { return 'LOCATION:' + location; },
    description: function (description) { return 'DESCRIPTION:' + description; },
    summary: function (summary) { return 'SUMMARY:' + summary; }
  };

  // Declarations
  var validateDateStamp, validateDateStart, validateDateEnd,
  validatePerson, validateOrganizer, validateAttendees,
  validateFilePath, validateCalendarOptions, validateEventOptions,
  formatCalendar, formatEvent, toFile, getEvent, createEvent,
  getCalendar, createCalendar;

  // Validation
  validateDateStamp = function (dtstamp, hoursToAddIfEmpty) {
    return dtstamp
    ? moment(dtstamp, inputTimeFormat).format(icalTimeFormat)
    : moment().add(hoursToAddIfEmpty, 'h').format(icalTimeFormat);
  };

  validateDateStart = function (dtstart) {
    return validateDateStamp(dtstart, 0);
  };

  validateDateEnd = function (dtend) {
    return validateDateStamp(dtend, 1);
  };

  validatePerson = function (person) {
    var personIsValid = person && person.email && person.name;
    return personIsValid
    ? { name: person.name, email: person.email }
    : {};
  };

  validateOrganizer = function (organizer) {
    return validatePerson(organizer);
  };

  validateAttendees = function (attendees) {
    return _(attendees)
    .map(function (attendee) {
      var validatedAttendee = validatePerson(attendee);
      validatedAttendee.rsvp = attendee.rsvp ? attendee.rsvp : DEFAULT_ATTENDEE_RSVP;
      return validatedAttendee;
    })
    .filter(function (attendee) {
      return attendee.email;
    })
    .value();
  };

  validateFilePath = function (fileName, filePath) {
    if (filePath) {
      return filePath;
    }

    var validFileName = fileName ? fileName : DEFAULT_FILE_NAME;
    validFileName = _.endsWith(fileName, '.ics')
    ? fileName
    : fileName + '.ics';

    return path.join(TMPDIR, validFileName);
  };

  validateCalendarOptions = function (calendarOptions, filePath) {
    if (calendarOptions.isValid) {
      return calendarOptions;
    }

    var validatedCalendarOptions = {};
    validatedCalendarOptions.filePath = validateFilePath(calendarOptions.filename, filePath);

    var events = calendarOptions.events;
    if (events) {
      validatedCalendarOptions.events = _.map(calendarOptions.events, function (eventOptions) {
        return validateEventOptions(eventOptions);
      });

    } else {
      validatedCalendarOptions.events = [ validateEventOptions({}) ];

    }
    return validatedCalendarOptions;
  };

  validateEventOptions = function (eventOptions, filePath) {
    var validatedEventOptions = {};
    validatedEventOptions.dtstamp = validateDateStamp(eventOptions.dtstamp);
    validatedEventOptions.organizer = validateOrganizer(eventOptions.organizer);
    validatedEventOptions.dtstart = validateDateStart(eventOptions.dtstart);
    validatedEventOptions.dtend = validateDateEnd(eventOptions.dtend);
    validatedEventOptions.summary = eventOptions.eventName || DEFAULT_EVENT_NAME;
    validatedEventOptions.description = eventOptions.description || '';
    validatedEventOptions.location = eventOptions.location || false;
    validatedEventOptions.attendees = validateAttendees(eventOptions.attendees);
    return validatedEventOptions;
  };

  // Real formatter stuff
  formatCalendar = function (formattedEvents) {
    var parts = [ ICAL_FORMATTERS.calendarHeader(), formattedEvents, ICAL_FORMATTERS.calendarFooter() ];
    return _.join(parts, SYSTEM_LINE_BREAK);
  };

  formatEvent = function (validatedOptions) {
    var parts = [ ICAL_FORMATTERS.eventHeader(validatedOptions.dtstamp) ];

    var organizer = validatedOptions.organizer;
    if (organizer) {
      parts.push(ICAL_FORMATTERS.organizer(organizer));
    }

    var attendees = validatedOptions.attendees;
    if (attendees) {
      _.each(attendees, function (attendee) {
        parts.push(ICAL_FORMATTERS.attendee(attendee));
      });
    }

    parts.push(ICAL_FORMATTERS.dtstart(validatedOptions.dtstart));
    parts.push(ICAL_FORMATTERS.dtend(validatedOptions.dtend));

    if (validatedOptions.location) {
      parts.push(ICAL_FORMATTERS.location(validatedOptions.location));
    }

    parts.push(ICAL_FORMATTERS.description(validatedOptions.description));

    parts.push(ICAL_FORMATTERS.summary(validatedOptions.summary));
    parts.push(ICAL_FORMATTERS.eventFooter());

    return _.join(parts, SYSTEM_LINE_BREAK);
  };

  toFile = function (data, filePath, callback) {
    fs.writeFile(filePath, data, function (err) {
      if (err) { return callback(err); };
      return callback(null, destination);
    });
  };

  getEvent = function (eventOptions) {
    _.omit(eventOptions, 'isValid');
    var validatedEventOptions = validateEventOptions(eventOptions);
    validatedEventOptions.filePath = validateFilePath(eventOptions.filename);
    return formatCalendar(formatEvent(validatedEventOptions));
  };

  createEvent = function (eventOptions, filePath, callback) {
    _.omit(eventOptions, 'isValid');
    var validatedEventOptions = validateEventOptions(eventOptions, filePath);
    validatedEventOptions.filePath = validateFilePath(eventOptions.filename, filePath);
    toFile(getEvent(validatedEventOptions), validatedEventOptions.filePath, callback);
  };

  getCalendar = function (calendarOptions) {
    _.omit(calendarOptions, 'isValid');
    var validatedCalendarOptions = validateCalendarOptions(calendarOptions);
    var formattedEvents = _(validatedCalendarOptions.events)
    .map(formatEvent)
    .join(SYSTEM_LINE_BREAK);

    return formatCalendar(formattedEvents);
  };

  createCalendar = function (calendarOptions, filePath, callback) {
    _.omit(calendarOptions, 'isValid');
    var validatedCalendarOptions = validateCalendarOptions(calendarOptions, filePath);
    toFile(getCalendar(validatedCalendarOptions), validatedCalendarOptions.filePath, callback);
  };

  return {
    getEvent: util.deprecate(getEvent, 'This method is deprecated, please use getCalendar instead.'),
    createEvent: util.deprecate(createEvent, 'This method is deprecated, please use createCalendar instead.'),
    getCalendar: getCalendar,
    createCalendar: createCalendar
  };
}());
