var expect = require('chai').expect;
var path = require('path');

var TMPDIR = require('os').tmpdir();

var ics = require('../index.js');

describe('ics', function() {

  describe('getEvent()', function() {

    it('creates a default event when no options passed', function() {
      var evnt = ics.getEvent({});
      expect(evnt.search(/BEGIN:VCALENDAR\r\n/)).to.equal(0);
      expect(evnt.search(/VERSION:2.0\r\n/)).to.equal(17);
      expect(evnt.search(/BEGIN:VEVENT\r\n/)).to.equal(30);
      expect(evnt.search(/DESCRIPTION/)).to.equal(-1);
      expect(evnt.search(/SUMMARY:New Event\r\n/)).to.equal(120);
      expect(evnt.search(/END:VEVENT\r\n/)).to.equal(139);
      expect(evnt.search(/END:VCALENDAR/)).to.equal(151);
    })
  })

  xdescribe('createEvent()', function() {
    it('create event with every option passed', function() {
      var expected = path.join(TMPDIR, 'calendar-event.ics');

      ics.createEvent({
        eventName: 'Welcome Event to ICS',
        description: 'Meet Down at the index.js',
        fileName: 'example.ics',
        dtstart:'20160126T154700Z',
        dtend:'20160126T164700Z',
        location: 'Fort Worth, Texas',
        organizer: {
            name: 'greenpioneersolutions',
            email: 'info@greenpioneersolutions.com'
        },
        attendees:[{
            name: 'Support greenpioneersolutions',
            email: 'Support@greenpioneersolutions.com',
            rsvp:false

        },{
            name: 'Accounting greenpioneersolutions',
            email: 'Accounting@greenpioneersolutions.com',
            rsvp:true
        },{
            name: 'Sales greenpioneersolutions',
            email: 'Sales@greenpioneersolutions.com',
            rsvp:true
        },{
            name: 'no RSVP default to true',
            email: 'Sales@greenpioneersolutions.com'
        }]
      }, null, function(err, filepath) {
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
      })
    });

    it('returns a custom filepath when one is provided', function() {
      var expected = '/Users/gibber/Desktop/my-file.ics';

      ics.createEvent({}, '/Users/gibber/Desktop/my-file.ics', function(err, filepath) {
        if (err) throw err;
        expect(filepath).to.equal(expected);
      })
    })
  });

});
