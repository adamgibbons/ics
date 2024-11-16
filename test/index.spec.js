import { expect } from 'chai'
import { createEvent, createEvents, isValidURL } from '../src'

const invalidAttributes = { start: [] }
const validAttributes = { start: [2000, 10, 5, 5, 0], duration: { hours: 1 } }
const validAttributes2 = { start: [2001, 10, 5, 5, 0], duration: { hours: 1 } }
const validAttributes3 = { start: [2002, 10, 5, 5, 0], duration: { hours: 1 } }

describe('ics', () => {
  describe('.createEvent', () => {
    it('returns an error or value when not passed a callback', () => {
      const event1 = createEvent(validAttributes)
      const event2 = createEvent(invalidAttributes)

      expect(event1.error).to.be.null
      expect(event1.value).to.be.a('string')
      expect(event2.error).to.exist
    })

    it('returns an error when passed an empty object', (done) => {
      createEvent({}, (error, success) => {
        expect(error.name).to.equal('ValidationError')
        expect(success).not.to.exist
        done()
      })
    })

    it('returns a node-style callback', (done) => {
      createEvent(validAttributes, (error, success) => {
        expect(error).not.to.exist
        expect(success).to.contain('DTSTART:200010')
        done()
      })
    })

    it('returns UUIDs for multiple calls', () => {
      const event1 = createEvent(validAttributes);
      const event2 = createEvent(validAttributes2);

      var uidRegex = /UID:(.*)/;

      const event1Id = uidRegex.exec(event1.value)[1];
      const event2Id = uidRegex.exec(event2.value)[1];
      expect(event1Id).to.not.equal(event2Id);
    });
  })

  describe('.createEvents', () => {
    it('returns an error when no arguments are passed', () => {
      const events = createEvents()
      expect(events.error).to.exist
    })

    it('writes begin and end calendar tags', () => {
      const { error, value } = createEvents([validAttributes])
      expect(error).to.be.null
      expect(value).to.contain('BEGIN:VCALENDAR')
      expect(value).to.contain('END:VCALENDAR')
    })

    describe('when no callback is provided', () => {
      it('returns an iCal string and a null error when passed valid events', () => {
        const { error, value } = createEvents([validAttributes, validAttributes2, validAttributes3])
        expect(error).to.be.null
        expect(value).to.contain('BEGIN:VCALENDAR')
      })
      it('returns an error and a null value when passed an invalid event', () => {
        const { error, value } = createEvents([validAttributes, validAttributes2, invalidAttributes])
        expect(error).to.exist
        expect(value).not.to.exist
      })

      it('returns an iCal string when passed 0 events', () => {
        const { error, value } = createEvents([])
        expect(error).to.be.null
        expect(value).to.contain('BEGIN:VCALENDAR')
      })

      it('support header params', () => {
        const { error, value } = createEvents([], { calName: 'test' })
        expect(error).to.be.null
        expect(value).to.contain('X-WR-CALNAME:test')
      })

      it('writes timezone information', () => {
        const timezones = 'BEGIN:VTIMEZONE\r\nTZID:Europe/Zurich\r\nBEGIN:STANDARD\r\nTZNAME:CET\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nDTSTART:19961027T030000\r\nEND:STANDARD\r\nEND:VTIMEZONE';
        const { error, value } = createEvents([], { timezones })
        expect(error).to.be.null
        expect(value).to.contain(timezones + '\r\n')
      })
    })

    describe('when a callback is provided', () => {
      it('returns an iCal string as the second argument when passed valid events', (done) => {
        createEvents([validAttributes, validAttributes2, validAttributes3], (error, success) => {
          expect(error).not.to.exist
          expect(success).to.contain('BEGIN:VCALENDAR')
          done()
        })
      })

      it('returns an error when passed an invalid event', (done) => {
        createEvents([validAttributes, validAttributes2, invalidAttributes], (error, success) => {
          expect(error).to.exist
          expect(success).not.to.exist
          done()
        })
      })

      it('returns an iCal string when passed 0 events', (done) => {
        createEvents([], (error, value) => {
          expect(error).to.be.null
          expect(value).to.contain('BEGIN:VCALENDAR')
          done()
        })
      })

      it('support header params', (done) => {
        createEvents([], { calName: 'test' }, (error, value) => {
          expect(error).to.be.null
          expect(value).to.contain('X-WR-CALNAME:test')
          done()
        })
      })

      it('writes timezone information', (done) => {
        const timezones = 'BEGIN:VTIMEZONE\r\nTZID:Europe/Zurich\r\nBEGIN:STANDARD\r\nTZNAME:CET\r\nTZOFFSETFROM:+0200\r\nTZOFFSETTO:+0100\r\nDTSTART:19961027T030000\r\nEND:STANDARD\r\nEND:VTIMEZONE';
        createEvents([], { timezones }, (error, value) => {
          expect(error).to.be.null
          expect(value).to.contain(timezones + '\r\n')
          done()
        })
      })
    })
  })

  describe(".isValidURL", () => {
    [
      {
        result: true,
        condition: "http urls",
        url: "http://domain.com",
      },
      {
        result: true,
        condition: "https urls",
        url: "https://domain.com",
      },
      {
        result: true,
        condition: "localhost urls",
        url: "http://localhost:8080",
      },
      {
        result: false,
        condition: "urls that start with www",
        url: "www.domain.com",
      },
      {
        result: false,
        condition: "urls that start with domain",
        url: "domain.com",
      },
    ].forEach((test) => {
      it(`${test.result ? "passes" : "fails"} for ${test.condition}`, () => {
        const response = isValidURL(test.url);

        expect(response).equal(test.result);
      })
    })
  })
})
