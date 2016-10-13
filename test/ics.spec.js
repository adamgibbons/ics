var expect = require('chai').expect;
var path = require('path');
var TMPDIR = require('os').tmpdir();

var ICS = require('../index.js');

describe('ICS', function() {

  var sampleEvent = {
    eventName: 'Bolder Boulder 10k',
    description: 'Annual 10-kilometer run',
    fileName: 'example.ics',
    start:'Sat Nov 02 2014 13:15:00 GMT-0700 (PDT)',
    end:'Sat Nov 02 2014 15:20:00 GMT-0700 (PDT)',
    location: 'Boulder, Colorado',
    url: 'http://www.google.com',
    categories: ['running', 'races', 'boulder', 'huzzah'],
    attachments: ['/Users/gibber/img/chip.png', '/Users/gibber/img/hokie.jpg'],
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
    dtstart:'Thu Oct 06 2016 19:00:00',
    dtend:'Thu Oct 06 2016 20:30:00',
    location: 'Boulder, Colorado',
    tzid: 'America/Denver'
  };

  describe('buildEvent(attributes)', function() {
    var ics = new ICS();

    it('returns a default event if no attributes are passed', function() {
      var defaultEvent = ics.buildEvent();
      expect(defaultEvent.search('BEGIN:VCALENDAR')).to.equal(0);
      expect(defaultEvent.search('VERSION:2.0')).to.be.greaterThan(-1);
      expect(defaultEvent.search('PRODID:')).to.be.greaterThan(-1);
      expect(defaultEvent.search('BEGIN:VEVENT')).to.be.greaterThan(-1);
      expect(defaultEvent.search('UID:')).to.be.greaterThan(-1);
      expect(defaultEvent.search('DTSTAMP:20')).to.be.greaterThan(-1);
      expect(defaultEvent.search('END:VEVENT')).to.be.greaterThan(-1);
      expect(defaultEvent.search('END:VCALENDAR')).to.be.greaterThan(-1);
    });

    it('returns a default event if an empty object is passed', function() {
      var defaultEvent = ics.buildEvent({});
      expect(defaultEvent.search('BEGIN:VCALENDAR')).to.equal(0);
      expect(defaultEvent.search('VERSION:2.0')).to.be.greaterThan(-1);
      expect(defaultEvent.search('PRODID:')).to.be.greaterThan(-1);
      expect(defaultEvent.search('BEGIN:VEVENT')).to.be.greaterThan(-1);
      expect(defaultEvent.search('UID:')).to.be.greaterThan(-1);
      expect(defaultEvent.search('DTSTAMP:20')).to.be.greaterThan(-1);
      expect(defaultEvent.search('END:VEVENT')).to.be.greaterThan(-1);
      expect(defaultEvent.search('END:VCALENDAR')).to.be.greaterThan(-1);
    });

    it('sets a DATE-typed DTSTART property when passed a DATE-typed start param', function() {
      var calEvent = ics.buildEvent({start: '9-25-1985'});
      expect(calEvent.search('DTSTART:19850925\r\n'))
        .to.be.greaterThan(-1);
    });

    it('sets a DATE-typed DTEND property when passed a DATE-typed start param', function() {
      var calEvent = ics.buildEvent({start: '9-25-1985', end: '9-26-1985'});
      expect(calEvent.search('DTEND:19850926\r\n')).to.be.greaterThan(-1);
    });

    it('sets a DATE-TIME-typed DTSTART when passed a DATE-TIME-typed start param', function() {
      var calEvent = ics.buildEvent({start: '9-25-1985 02:30'});
      expect(calEvent.search('DTSTART:19850925T023000Z\r\n')).to.be.greaterThan(-1);
    });

    it('sets a DATE-TIME-typed DTEND when passed a DATE-TIME-typed start param', function() {
      var calEvent = ics.buildEvent({start: '9-25-1985 02:30', end: '9-25-1985 20:30'});
      expect(calEvent.search('DTEND:19850925T203000Z\r\n')).to.be.greaterThan(-1);
    });

    it('sets a DATE-typed DTEND value of same day as DTSTART when DTSTART is DATE-typed and no DTEND param is passed', function() {
      var calEvent = ics.buildEvent({start: '9-25-1985'});
      expect(calEvent.search('DTEND:19850925\r\n')).to.be.greaterThan(-1);
    });

    it('sets DTEND to same value as DTSTART when DTSTART is DATE-TIME-typed and no DTEND param is passed', function() {
      var calEvent = ics.buildEvent({start: '9-25-1985 02:30'});
      expect(calEvent.search('DTEND:19850925T023000Z\r\n')).to.be.greaterThan(-1);
    });

    it('sets event properties when passed', function() {
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('SUMMARY:Bolder Boulder 10k')).to.be.greaterThan(-1);
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('LOCATION:Boulder, Colorado')).to.be.greaterThan(-1);
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('DESCRIPTION:Annual 10-kilometer run')).to.be.greaterThan(-1);
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('URL:http://www.google.com')).to.be.greaterThan(-1);
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('CATEGORIES:running,races,boulder,huzzah')).to.be.greaterThan(-1);
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('ATTACH:/Users/gibber/img/chip.png')).to.be.greaterThan(-1);
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('ATTACH:/Users/gibber/img/hokie.jpg')).to.be.greaterThan(-1);
    });

    // it('defaults to UTC time', function() {
    //   expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('DTSTART:20141102T201500Z')).to.be.greaterThan(-1);
    //   expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('DTEND:20141102T222000Z')).to.be.greaterThan(-1);
    // });

    // it('removes UTC formatting when passed a time zone identifier', function() {
    //   expect(ics.buildEvent(sampleEvent2).split('\r\n').indexOf('DTSTART;TZID=America/Denver:20161006T190000')).to.be.greaterThan(-1);
    //   expect(ics.buildEvent(sampleEvent2).split('\r\n').indexOf('DTEND;TZID=America/Denver:20161006T203000')).to.be.greaterThan(-1);
    // });
  });

  // describe('createEvent()', function() {
  //   it('creates event with every option passed', function() {
  //     var expected = path.join(TMPDIR, 'calendar-event.ics');

  //     ics.createEvent(sampleEvent, null, function(err, filepath) {
  //       if (err) throw err;
  //       expect(filepath).to.equal(expected);
  //     });
  //   });

  //   it('returns a default filepath when no filename or filepath provided', function() {
  //     var expected = path.join(TMPDIR, 'calendar-event.ics');

  //     ics.createEvent({}, null, function(err, filepath) {
  //       if (err) throw err;
  //       expect(filepath).to.equal(expected);
  //     });
  //   });

  //   it('returns a default filepath and custom filename when filename provided', function() {
  //     var expected = path.join(TMPDIR, 'custom-name.ics');

  //     ics.createEvent({filename: 'custom-name'}, null, function(err, filepath) {
  //       if (err) throw err;
  //       expect(filepath).to.equal(expected);
  //     });
  //   });

  //   it('returns a custom filepath when one is provided', function() {
  //     var expected = '/Users/gibber/Desktop/my-file.ics';

  //     ics.createEvent({}, '/Users/gibber/Desktop/my-file.ics', function(err, filepath) {
  //       if (err) throw err;
  //       expect(filepath).to.equal(expected);
  //     });
  //   });
  // });

  

});
