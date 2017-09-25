import { expect } from 'chai'
import {
  createEventSync,
  createEvent
} from '../src'

describe('ics module', () => {
  describe('.createEventSync', () => {
    xit('builds and formats a default event when no params passed', () => {
      const event = createEventSync({
        start: [2000, 10, 5, 5, 0]
      })
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
    xit('handles arguments', () => {
      const event = createEventSync({
        title: 'Bolder Boulder',
        uid: 'xyz',
        productId: 'GibbonsInc',
        description: 'Annual Memorial Day 10k Race in Boulder, Colorado',
        url: 'http://bb10k.bolderboulder.com/',
        location: 'Folsom Field, University of Colorado at Boulder',
        geo: {
          lat: 40.0095,
          lon: -105.2669
        },
        status: 'tentative',
        categories: ['Memorial Day', '10k races'],
        organizer: {
          name: 'John Smith',
          email: 'jsmith@example.com'
        },
        attendees: [
          {
            name: 'Adam Gibbons',
            email: 'agibbons@example.com'
          },
          {
            name: 'Brittany Seaton',
            email: 'bseaton@example.com'
          }
        ],
        start: [1997, 6, 14, 11, 30, 0],
        duration: {
          hours: 1
        },
        alarms: [{
          action: 'audio',
          trigger: [1997, 2, 17, 1, 30],
          repeat: 4,
          duration: { minutes: 15 },
          attach: 'ftp://example.com/pub/sounds/bell-01.aud'
        }]
      })

      expect(event).to.contain('PRODID:GibbonsInc')
      expect(event).to.contain('SUMMARY:Bolder Boulder')
      expect(event).to.contain('DESCRIPTION:Annual Memorial Day 10k Race in Boulder, Colorado')
      expect(event).to.contain('UID:xyz')
      expect(event).to.contain('URL:http://bb10k.bolderboulder.com/')
      expect(event).to.contain('GEO:40.0095;-105.2669')
      expect(event).to.contain('LOCATION:Folsom Field, University of Colorado at Boulder')
      expect(event).to.contain('STATUS:tentative')
      expect(event).to.contain('CATEGORIES:Memorial Day,10k races')
      expect(event).to.contain('ORGANIZER;CN=John Smith:mailto:jsmith@example.com')
      expect(event).to.contain('ATTENDEE;CN=Adam Gibbons:mailto:agibbons@example.com')
      expect(event).to.contain('ATTENDEE;CN=Brittany Seaton:mailto:bseaton@example.com')
      expect(event).to.contain('DTSTART:1997071')
      expect(event).to.contain('BEGIN:VALARM')
      expect(event).to.contain('END:VALARM')
      expect(event).to.contain('DURATION:PT1H')
    })
  })

  describe('.createEvent', () => {
    it('returns a validation error when passed an empty object', (done) => {
      createEvent({}, (error, success) => {
        done()
        expect(error.name).to.equal('ValidationError')
        expect(success).not.to.exist
      })
    })
    it('returns an ics string in a callback', (done) => {
      createEvent({
        start: [2000, 10, 5, 5, 0]
      }, (error, success) => {
        expect(error).not.to.exist
        expect(success).to.contain('DTSTART:200010')
        done()
      })
    })
  })
})
