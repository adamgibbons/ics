var expect = require('chai').expect;
var path = require('path');
var TMPDIR = require('os').tmpdir();

var ics = require('../index.js');

describe('ics', function() {

  var sampleEvent = {
    eventName: 'Bolder Boulder 10k',
    description: 'Annual 10-kilometer run',
    fileName: 'example.ics',
    dtstart:'Sat Nov 02 2014 13:15:00 GMT-0700 (PDT)',
    dtend:'Sat Nov 02 2014 15:20:00 GMT-0700 (PDT)',
    location: 'Boulder, Colorado',
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

  var sampleEvent2 = {
    eventName: 'Bolder Boulder 10k',
    description: 'Annual 10-kilometer run',
    fileName: 'example.ics',
    dtstart:'Thu Oct 06 2016 19:00:00 GMT-0600 (MDT)',
    dtend:'Thu Oct 06 2016 20:30:00 GMT-0600 (MDT)',
    location: 'Boulder, Colorado',
    tzid: 'America/Denver'
  };

  describe('getEvent()', function() {
    it('creates a default event when no params are passed', function() {
      var defaultEvent = ics.getEvent({});
      expect(defaultEvent.search(/BEGIN:VCALENDAR\r\n/)).to.equal(0);
      expect(defaultEvent.search(/VERSION:2.0\r\n/)).to.equal(17);
      expect(defaultEvent.search(/BEGIN:VEVENT\r\n/)).to.equal(30);
      expect(defaultEvent.search(/DESCRIPTION/)).to.equal(-1);
      expect(defaultEvent.search(/SUMMARY:New Event\r\n/)).to.equal(120);
      expect(defaultEvent.search(/END:VEVENT\r\n/)).to.equal(139);
      expect(defaultEvent.search(/END:VCALENDAR/)).to.equal(151);
    });

    it('sets event properties passed as params', function() {
      expect(ics.getEvent(sampleEvent).split('\r\n').indexOf('SUMMARY:Bolder Boulder 10k')).to.be.greaterThan(-1);
      expect(ics.getEvent(sampleEvent).split('\r\n').indexOf('LOCATION:Boulder, Colorado')).to.be.greaterThan(-1);
      expect(ics.getEvent(sampleEvent).split('\r\n').indexOf('DESCRIPTION:Annual 10-kilometer run')).to.be.greaterThan(-1);
    });

    it('defaults to UTC time', function() {
      expect(ics.getEvent(sampleEvent).split('\r\n').indexOf('DTSTART:20141102T201500Z')).to.be.greaterThan(-1);
      expect(ics.getEvent(sampleEvent).split('\r\n').indexOf('DTEND:20141102T222000Z')).to.be.greaterThan(-1);
    });

    it('removes UTC formatting when passed a time zone identifier', function() {
      expect(ics.getEvent(sampleEvent2).split('\r\n').indexOf('DTSTART;TZID=America/Denver:20161006T190000')).to.be.greaterThan(-1);
      expect(ics.getEvent(sampleEvent2).split('\r\n').indexOf('DTEND;TZID=America/Denver:20161006T203000')).to.be.greaterThan(-1);
    });
  });

  describe('createEvent()', function() {
    it('creates event with every option passed', function() {
      var expected = path.join(TMPDIR, 'calendar-event.ics');

      ics.createEvent(sampleEvent, null, function(err, filepath) {
        if (err) throw err;
        expect(filepath).to.equal(expected);
      });
    });

    it('returns a default filepath when no filename or filepath provided', function() {
      var expected = path.join(TMPDIR, 'calendar-event.ics');

      ics.createEvent({}, null, function(err, filepath) {
        if (err) throw err;
        expect(filepath).to.equal(expected);
      });
    });

    it('returns a default filepath and custom filename when filename provided', function() {
      var expected = path.join(TMPDIR, 'custom-name.ics');

      ics.createEvent({filename: 'custom-name'}, null, function(err, filepath) {
        if (err) throw err;
        expect(filepath).to.equal(expected);
      });
    });

    it('returns a custom filepath when one is provided', function() {
      var expected = '/Users/gibber/Desktop/my-file.ics';

      ics.createEvent({}, '/Users/gibber/Desktop/my-file.ics', function(err, filepath) {
        if (err) throw err;
        expect(filepath).to.equal(expected);
      });
    });
  });
});
