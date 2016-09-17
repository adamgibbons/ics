var expect = require('chai').expect;
var path = require('path');

var os = require('os');
var _ = require('lodash');
var TMPDIR = os.tmpdir();
var SYSTEM_LINE_BREAK = os.EOL;

var ics = require('../index.js');

describe('ics', function () {

  var sampleEvent = {
    eventName: 'Welcome Event to ICS',
    description: 'Meet Down at the index.js',
    fileName: 'example.ics',
    dtstart:'Sat Nov 02 2014 13:15:00 GMT-0700 (PDT)',
    dtend:'Sat Nov 02 2014 15:20:00 GMT-0700 (PDT)',
    location: 'Fort Worth, Texas',
    organizer: {
        name: 'greenpioneersolutions',
        email: 'info@greenpioneersolutions.com'
      },
    attendees:[
      {
        name: 'Support Team',
        email: 'Support@greenpioneersolutions.com',
        rsvp: true
      },
      {
        name: 'Accounting Team',
        email: 'Accounting@greenpioneersolutions.com'
      }
    ]
  };

  describe('getEvent()', function () {
    it('creates a default event when no options passed', function () {
      var defaultEvent = ics.getEvent({});
      var beginCalendarPosition = defaultEvent.search(new RegExp('BEGIN:VCALENDAR' + SYSTEM_LINE_BREAK));
      var versionLinePosition = defaultEvent.search(new RegExp('VERSION:2.0' + SYSTEM_LINE_BREAK));
      var beginEventPosition = defaultEvent.search(new RegExp('BEGIN:VEVENT' + SYSTEM_LINE_BREAK));
      var descriptionPosition = defaultEvent.search(/DESCRIPTION/);
      var summaryPosition = defaultEvent.search(new RegExp('SUMMARY:New Event' + SYSTEM_LINE_BREAK));
      var endEventPosition = defaultEvent.search(new RegExp('END:VEVENT' + SYSTEM_LINE_BREAK));
      var endCalendarPosition = defaultEvent.search(/END:VCALENDAR/);

      var orderedPositions = [ beginCalendarPosition, versionLinePosition, beginEventPosition, descriptionPosition,
        summaryPosition, endEventPosition, endCalendarPosition ];

      expect(_.indexOf(orderedPositions, -1)).to.equal(-1);
      expect(_.isEqual(_.sortBy(orderedPositions), orderedPositions)).to.equal(true);
    });

    it('has an event name', function () {
      expect(ics.getEvent(sampleEvent).split(SYSTEM_LINE_BREAK).indexOf('SUMMARY:' + sampleEvent.eventName)).to.be.greaterThan(-1);
    });
  });

  describe('createEvent()', function () {
    it('creates event with every option passed', function () {
      var expected = path.join(TMPDIR, 'calendar-event.ics');

      ics.createEvent(sampleEvent, null, function (err, filepath) {
        if (err) throw err;
        expect(filepath).to.equal(expected);
      });
    });

    it('returns a default filepath when no filename or filepath provided', function () {
      var expected = path.join(TMPDIR, 'calendar-event.ics');

      ics.createEvent({}, null, function (err, filepath) {
        if (err) throw err;
        expect(filepath).to.equal(expected);
      });
    });

    it('returns a default filepath and custom filename when filename provided', function () {
      var expected = path.join(TMPDIR, 'custom-name.ics');

      ics.createEvent({filename: 'custom-name'}, null, function (err, filepath) {
        if (err) throw err;
        expect(filepath).to.equal(expected);
      });
    });

    it('returns a custom filepath when one is provided', function () {
      var expected = '/Users/gibber/Desktop/my-file.ics';

      ics.createEvent({}, '/Users/gibber/Desktop/my-file.ics', function (err, filepath) {
        if (err) throw err;
        expect(filepath).to.equal(expected);
      });
    });
  });

  describe('getCalendar()', function () {
    it('creates a default event when no options passed', function () {
      var defaultEvent = ics.getCalendar({});
      var beginCalendarPosition = defaultEvent.search(new RegExp('BEGIN:VCALENDAR' + SYSTEM_LINE_BREAK));
      var versionLinePosition = defaultEvent.search(new RegExp('VERSION:2.0' + SYSTEM_LINE_BREAK));
      var beginEventPosition = defaultEvent.search(new RegExp('BEGIN:VEVENT' + SYSTEM_LINE_BREAK));
      var descriptionPosition = defaultEvent.search(/DESCRIPTION/);
      var summaryPosition = defaultEvent.search(new RegExp('SUMMARY:New Event' + SYSTEM_LINE_BREAK));
      var endEventPosition = defaultEvent.search(new RegExp('END:VEVENT' + SYSTEM_LINE_BREAK));
      var endCalendarPosition = defaultEvent.search(/END:VCALENDAR/);

      var orderedPositions = [ beginCalendarPosition, versionLinePosition, beginEventPosition, descriptionPosition,
        summaryPosition, endEventPosition, endCalendarPosition ];

      expect(_.indexOf(orderedPositions, -1)).to.equal(-1);
      expect(_.isEqual(_.sortBy(orderedPositions), orderedPositions)).to.equal(true);
    });

    it('has an event name', function () {
      var calendarLines = ics.getCalendar({events: [ sampleEvent ]}).split(SYSTEM_LINE_BREAK);
      expect(calendarLines.indexOf('SUMMARY:' + sampleEvent.eventName)).to.be.greaterThan(-1);
    });

    it('has multiple events', function () {
      var calendarLines = ics.getCalendar({events: [ sampleEvent, sampleEvent ]}).split(SYSTEM_LINE_BREAK);
      expect(_.countBy(calendarLines, function (value) {
        return value === 'SUMMARY:' + sampleEvent.eventName;
      }).true).to.equal(2);
    });
  });

  describe('createCalendar()', function () {
    it('creates event with every option passed', function () {
      var expected = path.join(TMPDIR, 'calendar-event.ics');

      ics.createCalendar({events: sampleEvent}, null, function (err, filepath) {
        if (err) throw err;
        expect(filepath).to.equal(expected);
      });
    });

    it('returns a default filepath when no filename or filepath provided', function () {
      var expected = path.join(TMPDIR, 'calendar-event.ics');

      ics.createCalendar({}, null, function (err, filepath) {
        if (err) throw err;
        expect(filepath).to.equal(expected);
      });
    });

    it('returns a default filepath and custom filename when filename provided', function () {
      var expected = path.join(TMPDIR, 'custom-name.ics');

      ics.createCalendar({filename: 'custom-name'}, null, function (err, filepath) {
        if (err) throw err;
        expect(filepath).to.equal(expected);
      });
    });

    it('returns a custom filepath when one is provided', function () {
      var expected = '/Users/gibber/Desktop/my-file.ics';

      ics.createCalendar({}, '/Users/gibber/Desktop/my-file.ics', function (err, filepath) {
        if (err) throw err;
        expect(filepath).to.equal(expected);
      });
    });
  });

});
