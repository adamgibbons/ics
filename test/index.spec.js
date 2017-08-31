import { expect } from 'chai'
import { createEvent } from '../src'
import {
  buildEvent,
  formatEvent
} from '../src/pipeline'

describe('.createEvent', () => {
  it('builds and formats a default event when no params passed', () => {
    const event = createEvent()
    expect(event).to.contain('BEGIN:VCALENDAR')
    expect(event).to.contain('VERSION:2.0')
    expect(event).to.contain('PRODID:adamgibbons/ics')
    expect(event).to.contain('BEGIN:VEVENT')
    expect(event).to.contain('SUMMARY:Untitled event')
    expect(event).to.contain('UID:')
    expect(event).to.contain('DTSTART:')
    expect(event).to.contain('DTSTAMP:20')
    expect(event).to.contain('END:VEVENT')
    expect(event).to.contain('END:VCALENDAR')
  })
  it('builds and formats an event supporting all params passed', () => {
    const event = createEvent({
      productId: 'my-event'
    })
    expect(event).to.contain('my-event')
  })
})

// describe('ICS', function() {

//   var sampleEvent = {

//     fileName: 'example.ics',

//     attachments: ['/Users/gibber/img/chip.png', '/Users/gibber/img/hokie.jpg'],

//     organizer: {
//         name: 'greenpioneersolutions',
//         email: 'info@greenpioneersolutions.com'
//     },
//     attendees:[
//       {
//         name: 'Support Team',
//         email: 'Support@greenpioneersolutions.com',
//         rsvp: true
//       },
//       {
//         name: 'Accounting Team',
//         email: 'Accountin.com'
//       }
//     ],
//     alarms:[
//       {
//         description: 'Reminder',
//         trigger: '-PT24H',
//         repeat: true,
//         duration: 'PT15M',
//         action: 'DISPLAY'
//       }
//     ]
//   };



//   describe('buildEvent(attributes)', function() {
//     var ics = new ICS();

//     it('sets a DATE-typed DTSTART property when passed a DATE-typed start param', function() {
//       expect(ics.buildEvent({start: '1985-09-25'}).search('DTSTART;VALUE=DATE:19850925\r\n'))
//         .to.be.greaterThan(-1);
//     });

//     it('sets a DATE-typed DTEND value one day after DTSTART value when passed a DATE-typed start param but no end date', function() {
//       expect(ics.buildEvent({start: '1985-09-25'}).search('DTEND;VALUE=DATE:19850926\r\n'))
//         .to.be.greaterThan(-1);
//     });

//     it('sets a DATE-typed DTEND property when passed a DATE-typed start param', function() {
//       expect(ics.buildEvent({start: '1985-09-25', end: '9-26-1985'}).search('DTEND;VALUE=DATE:19850926\r\n'))
//         .to.be.greaterThan(-1);

//       expect(ics.buildEvent({start: '1985-09-25', end: '09-26-1985 2:20'}).search('DTEND;VALUE=DATE:19850926\r\n'))
//         .to.be.greaterThan(-1);
//     });

//     it('sets a floating, DATE-TIME-typed DTSTART when passed a DATE-TIME-typed start param with neither a UTC designator nor a timezone', function() {
//       expect(ics.buildEvent({start: '2017-09-25 02:30:00'}).search('DTSTART:20170925T023000\r\n'))
//         .to.be.greaterThan(-1);
//     });

//     it('sets an absolute, DATE-TIME-typed DTSTART when passed a DATE-TIME-typed start param with a UTC designator and no timezone', function() {
//       expect(ics.buildEvent({start: '2017-09-25T02:30:00.000Z'}).search('DTSTART:20170925T023000Z\r\n'))
//         .to.be.greaterThan(-1);
//     });

//     it('sets a floating, DATE-TIME-typed DTEND with same value as DTSTART when passed a DATE-TIME-typed start param with neither a UTC designator nor a timezone', function() {
//       expect(ics.buildEvent({start: '2017-09-25 02:30:00'}).search('DTEND:20170925T023000\r\n'))
//         .to.be.greaterThan(-1);
//     });

//     it('sets the same time zone ID on DTSTART and DTEND when only a start TZID is provided', function() {
//       var evnt = ics.buildEvent({start: '2008-09-15 15:45', end: '2008-09-15 17:00', timeZone: 'America/New_York'});

//       expect(evnt.search('DTSTART;TZID=America/New_York:20080915T154500\r\n')).to.be.greaterThan(-1);
//       expect(evnt.search('DTEND;TZID=America/New_York:20080915T170000\r\n')).to.be.greaterThan(-1);
//     });

//     it('sets separate start and end time zone IDs if provided', function() {
//       var evnt = ics.buildEvent({start: '2008-09-15 15:45', end: '2008-09-15 17:00', timeZone: 'America/New_York', timeZoneEnd:'America/Chicago'});

//       expect(evnt.search('DTSTART;TZID=America/New_York:20080915T154500\r\n')).to.be.greaterThan(-1);
//       expect(evnt.search('DTEND;TZID=America/Chicago:20080915T170000\r\n')).to.be.greaterThan(-1);
//     });

//     it('sets event properties when passed', function() {
//       expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('ATTACH:/Users/gibber/img/chip.png')).to.be.greaterThan(-1);
//       expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('ATTACH:/Users/gibber/img/hokie.jpg')).to.be.greaterThan(-1);
//       expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('BEGIN:VALARM')).to.be.greaterThan(-1);
//       expect(ics.buildEvent(sampleEvent).split('\r\n').indexOf('END:VALARM')).to.be.greaterThan(-1);
//     });


//     it('adds one alarm', function() {
//       var alarms = [
//         {
//           trigger: '-PT24H',
//           action: 'DISPLAY'
//         }
//       ];
//       var evnt = ics.buildEvent({ alarms: alarms });
//       expect(evnt.split('\r\n').indexOf('BEGIN:VALARM')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('TRIGGER:-PT24H')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('ACTION:DISPLAY')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('END:VALARM')).to.be.greaterThan(-1);
//     });

//     it('adds one alarm with a description', function() {
//       var alarms = [
//         {
//           trigger: '-PT24H',
//           action: 'DISPLAY',
//           description: 'Reminder'
//         }
//       ];
//       var evnt = ics.buildEvent({ alarms: alarms });
//       expect(evnt.split('\r\n').indexOf('BEGIN:VALARM')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('TRIGGER:-PT24H')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('ACTION:DISPLAY')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('DESCRIPTION:Reminder')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('END:VALARM')).to.be.greaterThan(-1);
//     });

//     it('adds one repeating alarm', function() {
//       var alarms = [
//         {
//           trigger: '-PT24H',
//           action: 'DISPLAY',
//           repeat: true,
//           duration: 'PT15M'
//         }
//       ];
//       var evnt = ics.buildEvent({ alarms: alarms });
//       expect(evnt.split('\r\n').indexOf('BEGIN:VALARM')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('TRIGGER:-PT24H')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('ACTION:DISPLAY')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('REPEAT:1')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('DURATION:PT15M')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('END:VALARM')).to.be.greaterThan(-1);
//     });

//     it('adds one alarm not repeating without both repeat and duration', function() {
//       var alarms = [
//         {
//           trigger: '-PT24H',
//           action: 'DISPLAY',
//           repeat: true
//         }
//       ];
//       var evnt = ics.buildEvent({ alarms: alarms });
//       expect(evnt.split('\r\n').indexOf('BEGIN:VALARM')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('TRIGGER:-PT24H')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('ACTION:DISPLAY')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('REPEAT:1')).to.equal(-1);
//       expect(evnt.split('\r\n').indexOf('DURATION:PT15M')).to.equal(-1);
//       expect(evnt.split('\r\n').indexOf('END:VALARM')).to.be.greaterThan(-1);
//     });

//     it('adds one alarm not repeating without both repeat and duration', function() {
//       var alarms = [
//         {
//           trigger: '-PT24H',
//           action: 'DISPLAY',
//           duration: 'PT15M'
//         }
//       ];
//       var evnt = ics.buildEvent({ alarms: alarms });
//       expect(evnt.split('\r\n').indexOf('BEGIN:VALARM')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('TRIGGER:-PT24H')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('ACTION:DISPLAY')).to.be.greaterThan(-1);
//       expect(evnt.split('\r\n').indexOf('REPEAT:1')).to.equal(-1);
//       expect(evnt.split('\r\n').indexOf('DURATION:PT15M')).to.equal(-1);
//       expect(evnt.split('\r\n').indexOf('END:VALARM')).to.be.greaterThan(-1);
//     });


//     it('adds one organizer', function() {
//       var evnt = ics.buildEvent({ organizer: { name: 'Grandpa', email: 'grandpa@example.com' } });
//       expect(evnt.search('ORGANIZER;CN=Grandpa:mailto:grandpa@example.com')).to.be.greaterThan(-1);
//     });

//   }); 

// });
