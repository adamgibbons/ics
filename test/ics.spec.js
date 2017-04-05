var expect = require('chai').expect;
var path = require('path');
var TMPDIR = require('os').tmpdir();

var ICS = require('../index.js');

var moment = require('moment-timezone');

describe('ICS', function() {

  var sampleEvent = {
    title: 'Bolder Boulder 10k',
    description: 'Annual 10-kilometer run',
    fileName: 'example.ics',
    start:'',
    end:'',
    url: 'http://www.google.com',
    location: 'Folsom Field, University of Colorado at Boulder',
    categories: ['running', 'races', 'boulder', 'huzzah'],
    attachments: ['/Users/gibber/img/chip.png', '/Users/gibber/img/hokie.jpg'],
    geo: { lat: 37.386013, lon: -122.082932 },
    status: 'TENTATIVE',
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
    ],
    alarms:[
      {
        description: 'Reminder',
        trigger: '-PT24H',
        repeat: true,
        duration: 'PT15M',
        action: 'DISPLAY'
      }
    ]
  };

  describe('init', function() {
    it('initializes with default properties', function() {
      var ics = new ICS();
      expect(ics.options).to.exist;
      expect(ics.options).not.to.be.empty;
    });

    it('overwrites default properties when passed options', function() {
      var ics = new ICS({filename: 'foo'});
      expect(ics.options.filename).to.equal('foo');
    });
  });

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
      expect(ics.buildEvent({start: '1985-09-25'}).search('DTSTART;VALUE=DATE:19850925\r\n'))
        .to.be.greaterThan(-1);
    });

    it('sets a DATE-typed DTEND value one day after DTSTART value when passed a DATE-typed start param but no end date', function() {
      expect(ics.buildEvent({start: '1985-09-25'}).search('DTEND;VALUE=DATE:19850926\r\n'))
        .to.be.greaterThan(-1);
    });

    it('sets a DATE-typed DTEND property when passed a DATE-typed start param', function() {
      expect(ics.buildEvent({start: '1985-09-25', end: '9-26-1985'}).search('DTEND;VALUE=DATE:19850926\r\n'))
        .to.be.greaterThan(-1);

      expect(ics.buildEvent({start: '1985-09-25', end: '09-26-1985 2:20'}).search('DTEND;VALUE=DATE:19850926\r\n'))
        .to.be.greaterThan(-1);
    });

    it('sets a floating, DATE-TIME-typed DTSTART when passed a DATE-TIME-typed start param with neither a UTC designator nor a timezone', function() {
      expect(ics.buildEvent({start: '2017-09-25 02:30:00'}).search('DTSTART:20170925T023000\r\n'))
        .to.be.greaterThan(-1);
    });

    it('sets an absolute, DATE-TIME-typed DTSTART when passed a DATE-TIME-typed start param with a UTC designator and no timezone', function() {
      expect(ics.buildEvent({start: '2017-09-25T02:30:00.000Z'}).search('DTSTART:20170925T023000Z\r\n'))
        .to.be.greaterThan(-1);
    });

    it('sets a floating, DATE-TIME-typed DTEND with same value as DTSTART when passed a DATE-TIME-typed start param with neither a UTC designator nor a timezone', function() {
      expect(ics.buildEvent({start: '2017-09-25 02:30:00'}).search('DTEND:20170925T023000\r\n'))
        .to.be.greaterThan(-1);
    });

    it('sets the same time zone ID on DTSTART and DTEND when only a start TZID is provided', function() {
      var evnt = ics.buildEvent({start: '2008-09-15 15:45', end: '2008-09-15 17:00', timeZone: 'America/New_York'});

      expect(evnt.search('DTSTART;TZID=America/New_York:20080915T154500\r\n')).to.be.greaterThan(-1);
      expect(evnt.search('DTEND;TZID=America/New_York:20080915T170000\r\n')).to.be.greaterThan(-1);
    });

    it('sets separate start and end time zone IDs if provided', function() {
      var evnt = ics.buildEvent({start: '2008-09-15 15:45', end: '2008-09-15 17:00', timeZone: 'America/New_York', timeZoneEnd:'America/Chicago'});

      expect(evnt.search('DTSTART;TZID=America/New_York:20080915T154500\r\n')).to.be.greaterThan(-1);
      expect(evnt.search('DTEND;TZID=America/Chicago:20080915T170000\r\n')).to.be.greaterThan(-1);
    });

    it('sets event properties when passed', function() {
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('SUMMARY:Bolder Boulder 10k')).to.be.greaterThan(-1);
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('DESCRIPTION:Annual 10-kilometer run')).to.be.greaterThan(-1);
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('URL:http://www.google.com')).to.be.greaterThan(-1);
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('CATEGORIES:running,races,boulder,huzzah')).to.be.greaterThan(-1);
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('ATTACH:/Users/gibber/img/chip.png')).to.be.greaterThan(-1);
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('ATTACH:/Users/gibber/img/hokie.jpg')).to.be.greaterThan(-1);
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('GEO:37.386013;-122.082932')).to.be.greaterThan(-1);
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('LOCATION:Folsom Field, University of Colorado at Boulder')).to.be.greaterThan(-1);
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('STATUS:TENTATIVE')).to.be.greaterThan(-1);
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('BEGIN:VALARM')).to.be.greaterThan(-1);
      expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('END:VALARM')).to.be.greaterThan(-1);
    });

    it('adds one attendee', function() {
      var evnt = ics.buildEvent({ attendees: [{ name: 'Dad', email: 'dad@example.com' }] });
      expect(evnt.search('ATTENDEE;CN=Dad:mailto:dad@example.com')).to.be.greaterThan(-1);
    });

    it('adds multiple attendees', function() {
      var attendees = [
        { name: 'Dad', email: 'dad@example.com' },
        { name: 'Mom', email: 'mom@example.com' }
      ];
      var evnt = ics.buildEvent({ attendees: attendees });
      expect(evnt.search('ATTENDEE;CN=Dad:mailto:dad@example.com')).to.be.greaterThan(-1);
      expect(evnt.search('ATTENDEE;CN=Mom:mailto:mom@example.com')).to.be.greaterThan(-1);
    });

    it('adds one alarm', function() {
      var alarms = [
        {
          trigger: '-PT24H',
          action: 'DISPLAY'
        }
      ];
      var evnt = ics.buildEvent({ alarms: alarms });
      expect(evnt.split('\r\n').indexOf('BEGIN:VALARM')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('TRIGGER:-PT24H')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('ACTION:DISPLAY')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('END:VALARM')).to.be.greaterThan(-1);
    });

    it('adds one alarm with a description', function() {
      var alarms = [
        {
          trigger: '-PT24H',
          action: 'DISPLAY',
          description: 'Reminder'
        }
      ];
      var evnt = ics.buildEvent({ alarms: alarms });
      expect(evnt.split('\r\n').indexOf('BEGIN:VALARM')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('TRIGGER:-PT24H')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('ACTION:DISPLAY')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('DESCRIPTION:Reminder')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('END:VALARM')).to.be.greaterThan(-1);
    });

    it('adds one repeating alarm', function() {
      var alarms = [
        {
          trigger: '-PT24H',
          action: 'DISPLAY',
          repeat: true,
          duration: 'PT15M'
        }
      ];
      var evnt = ics.buildEvent({ alarms: alarms });
      expect(evnt.split('\r\n').indexOf('BEGIN:VALARM')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('TRIGGER:-PT24H')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('ACTION:DISPLAY')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('REPEAT:1')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('DURATION:PT15M')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('END:VALARM')).to.be.greaterThan(-1);
    });

    it('adds one alarm not repeating without both repeat and duration', function() {
      var alarms = [
        {
          trigger: '-PT24H',
          action: 'DISPLAY',
          repeat: true
        }
      ];
      var evnt = ics.buildEvent({ alarms: alarms });
      expect(evnt.split('\r\n').indexOf('BEGIN:VALARM')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('TRIGGER:-PT24H')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('ACTION:DISPLAY')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('REPEAT:1')).to.equal(-1);
      expect(evnt.split('\r\n').indexOf('DURATION:PT15M')).to.equal(-1);
      expect(evnt.split('\r\n').indexOf('END:VALARM')).to.be.greaterThan(-1);
    });

    it('adds one alarm not repeating without both repeat and duration', function() {
      var alarms = [
        {
          trigger: '-PT24H',
          action: 'DISPLAY',
          duration: 'PT15M'
        }
      ];
      var evnt = ics.buildEvent({ alarms: alarms });
      expect(evnt.split('\r\n').indexOf('BEGIN:VALARM')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('TRIGGER:-PT24H')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('ACTION:DISPLAY')).to.be.greaterThan(-1);
      expect(evnt.split('\r\n').indexOf('REPEAT:1')).to.equal(-1);
      expect(evnt.split('\r\n').indexOf('DURATION:PT15M')).to.equal(-1);
      expect(evnt.split('\r\n').indexOf('END:VALARM')).to.be.greaterThan(-1);
    });


    it('adds one organizer', function() {
      var evnt = ics.buildEvent({ organizer: { name: 'Grandpa', email: 'grandpa@example.com' } });
      expect(evnt.search('ORGANIZER;CN=Grandpa:mailto:grandpa@example.com')).to.be.greaterThan(-1);
    });

    it('sets uid if one is provided', function() {
      var uid = 'some-event-uid';
      var evnt = ics.buildEvent({uid: uid});
      expect(evnt.search('UID:' + uid)).to.be.greaterThan(-1);
    });
  });

  describe('getDestination()', function() {
    var ics = new ICS();

    it('returns the default filename when no argument passsed', function() {
      expect(ics.getDestination().indexOf('event.ics')).to.be.greaterThan(-1);
    });

    it('returns the default filename when falsy arguments passsed', function() {
      expect(ics.getDestination(null).indexOf('event.ics')).to.be.greaterThan(-1);
      expect(ics.getDestination(false).indexOf('event.ics')).to.be.greaterThan(-1);
      expect(ics.getDestination(0).indexOf('event.ics')).to.be.greaterThan(-1);
    });

    it('returns an ics file in the cwd when passed only a filename', function() {
      expect(ics.getDestination('foo.ics')).to.equal(path.join(process.cwd(), 'foo.ics'));
      expect(ics.getDestination('foo')).to.equal(path.join(process.cwd(), 'foo.ics'));
    });

    it('returns an ics file in another directory when passed a relative path', function() {
      expect(ics.getDestination('../foo/bar')).to.equal(path.resolve(path.join(process.cwd(), '../foo', 'bar.ics')));
      expect(ics.getDestination('../baz.ics')).to.equal(path.resolve(path.join(process.cwd(), '..', 'baz.ics')));
    });

    it('returns an ics file when passed an absoute path', function() {
      expect(ics.getDestination('/foo.ics')).to.equal('/foo.ics');
      expect(ics.getDestination('/foo')).to.equal('/foo.ics');
    });
  });  

});
