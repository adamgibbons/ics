import { expect } from 'chai'
import { createEvent, createEvents } from '../src'

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
        done()
        expect(error.name).to.equal('ValidationError')
        expect(success).not.to.exist
      })
    })
    it('returns a node-style callback', (done) => {
      createEvent(validAttributes, (error, success) => {
        done()
        expect(error).not.to.exist
        expect(success).to.contain('DTSTART:200010')
      })
    })
  })

  describe('.createEvents', () => {
    it('returns an error when no arguments are passed', () => {
      const events = createEvents()
      expect(events.error).to.exist
    })
    it('writes begin and end calendar tags', () => {
      const { error, value } = createEvents([validAttributes])
      console.log(error, value)
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
    })
    describe('when a callback is provided', () => {
      it('returns an iCal string as the second argument when passed valid events', (done) => {
        createEvents([validAttributes, validAttributes2, validAttributes3], (error, success) => {
          done()
          expect(error).not.to.exist
          expect(success).to.contain('BEGIN:VCALENDAR')
        })
      })
      it('returns an error when passed an invalid event', (done) => {
        createEvents([validAttributes, validAttributes2, invalidAttributes], (error, success) => {
          done()
          expect(error).to.exist
          expect(success).not.to.exist
        })
      })
    })
  })
})