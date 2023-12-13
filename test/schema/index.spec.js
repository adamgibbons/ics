import { expect } from 'chai'
import validateEvent from '../../src/schema'

describe('.validateEvent', () => {
  describe('must have one and only one occurrence of', () => {
    it('uid', () => {
      const {error} = validateEvent({title: 'foo'})
      expect(error.errors.some(p => p === 'uid is a required field')).to.be.true
    })

    it('start', () => {
      const {error} = validateEvent({title: 'foo', uid: 'foo'})
      expect(error.errors.some(p => p === 'start is a required field')).to.be.true
    })
  })

  describe('must have duration XOR end', () => {
    it('duration and end are not allowed together', () => {
      const {error, value} = validateEvent({
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        duration: {hours: 1},
        end: [2018, 12, 1, 11, 45]
      })
      expect(error).to.exist
    })
  })

  describe('may have one and only one occurrence of', () => {
    it('summary', () => {
      const {errors} = validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        summary: 1
      }).error

      expect(errors.some(p => p.match(/summary must be a `string` type/))).to.be.true

      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        summary: 'be concise'
      }).value.summary).to.exist
    })

    it('description', () => {
      const {errors} = validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        description: 1
      }).error
      expect(errors.some(p => p.match(/description must be a `string` type/))).to.be.true

      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        description: 'abc'
      }).value.description).to.exist

    })
    it('url', () => {
      const {errors} = validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        url: 'abc'
      }).error
      expect(errors.some(p => p.match(/url must/))).to.be.true
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        url: 'http://github.com'
      }).value.url).to.exist
    })

    it('geo', () => {
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        geo: 'abc'
      }).error.name === 'ValidationError')

      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        geo: {lat: 'thing', lon: 32.1},
      }).error.name === 'ValidationError')

      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        geo: {lat: 13.23, lon: 32.1},
      }).value.geo).to.exist
    })
    it('location', () => {
      const {errors} = validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        location: 1
      }).error
      expect(errors.some(p => p.match(/location must be a `string` type/))).to.be.true

      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        location: 'abc'
      }).value.location).to.exist
    })

    it('status', () => {
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        status: 'tentativo'
      }).error).to.exist
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        status: 'tentative'
      }).value.status).to.equal('tentative')
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        status: 'cancelled'
      }).value.status).to.equal('cancelled')
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        status: 'confirmed'
      }).value.status).to.equal('confirmed')
    })

    it('categories', () => {
      const {errors} = validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        categories: [1]
      }).error

      expect(errors.some(p => p.match(/categories\[0] must be a `string` type/))).to.be.true

      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        categories: ['foo', 'bar']
      }).value.categories).to.include('foo', 'bar')
    })

    it('organizer', () => {
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        organizer: {name: 'Adam', email: 'adam@example.com'}
      }).value.organizer).to.include({name: 'Adam', email: 'adam@example.com'})

      const {errors} = validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        organizer: {foo: 'Adam'}
      }).error
      expect(errors.some(p => p === 'organizer field has unspecified keys: foo')).to.be.true
    })

    it('attendees', () => {
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        attendees: [
          {name: 'Adam', email: 'adam@example.com'},
          {name: 'Brittany', email: 'brittany@example.com'}]
      }).value.attendees).to.be.an('array').that.is.not.empty

      const {errors} = validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        attendees: [
          {foo: 'Adam', email: 'adam@example.com'},
          {name: 'Brittany', email: 'brittany@example.com'}]
      }).error
      expect(errors.some(p => p === 'attendees[0] field has unspecified keys: foo')).to.be.true

      const res = validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        end: [2018, 12, 1, 11, 0],
        attendees: [
          {name: 'toto', email: 'toto@toto.fr', role: 'REQ-PARTICIPANT', partstat: 'ACCEPTED'}
        ]
      }).error
      expect(res).to.be.null
    })

    it('created', () => {
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        created: [2018, 12, 1, 9, 30]
      }).value.created).to.exist
    })

    it('transp', () => {
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        transp: 'TRANSPARENT'
      }).value.transp).to.exist
    })

    it('lastModified', () => {
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        lastModified: [2018, 12, 1, 9, 30]
      }).value.lastModified).to.exist
    })

    it('calName', () => {
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        calName: 'John\'s Calendar',
        start: [2018, 12, 1, 10, 30],
      }).value.calName).to.exist
    })

    it('htmlContent', () => {
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        htmlContent: '<!DOCTYPE html><html><body><p>This is<br>test<br>html code.</p></body></html>',
        start: [2018, 12, 1, 10, 30],
      }).value.htmlContent).to.exist
    })
  })

  describe('may have one or more occurrences of', () => {
    it('alarm component', () => {
      const event = validateEvent({
        uid: 'foo',
        start: [2018, 12, 1, 10, 30],
        duration: {hours: 1},
        alarms: [{
          action: 'audio',
          trigger: []
        }]
      })

      expect(event.error).to.be.null
      expect(event.value.alarms).to.be.an('array')
      expect(event.value.alarms[0]).to.have.all.keys('action', 'trigger')
    })
  })
})
