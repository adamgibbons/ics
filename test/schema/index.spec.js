import { expect } from 'chai'
import validateEvent from '../../src/schema'

describe.only('.validateEvent', () => {
  describe('must have one and only one occurance of', () => {
    it('uid', () => {
      const { error } = validateEvent({ title: 'foo' })
      expect(error.details.some(p => p.message === '"uid" is required')).to.be.true
    })  

    it('start', () => {
      const { error } = validateEvent({ title: 'foo', uid: 'foo' })
      expect(error.details.some(p => p.message === '"start" is required')).to.be.true
    })

  })
  describe('may have one and only one occurance of', () => {
    it('description', () => {
      const { details } = validateEvent({
        title: 'foo',
        uid: 'foo',
        start: 'bac',
        description: 1
      }).error

      expect(details.some(p => p.message === '"description" must be a string')).to.be.true

      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: 'bac',
        description: 'abc'
      }).value.description).to.exist
    })
    it('url', () => {
      const { details } = validateEvent({
        title: 'foo',
        uid: 'foo',
        start: 'bac',
        url: 'abc'
      }).error
      expect(details.some(p => p.message === '"url" must be a valid uri')).to.be.true
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: 'bac',
        url: 'abc'
      }).value.url).to.exist
    })
    it('geolocation', () => {
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: 'bac',
        geolocation: 'abc'
      }).error.details.some(p => p.message === '"geolocation" must be an object')).to.be.true

      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: 'bac',
        geolocation: { lat: 'thing', lon: 32.1 },
      }).error.details.some(p => p.path === 'geolocation.lat')).to.be.true

      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: 'bac',
        geolocation: { lat: 13.23, lon: 32.1 },
      }).value.geolocation).to.exist
    })
    it('location', () => {
      const { details } = validateEvent({
        title: 'foo',
        uid: 'foo',
        start: 'bac',
        location: 1
      }).error

      expect(details.some(p => p.message === '"location" must be a string')).to.be.true

      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: 'bac',
        location: 'abc'
      }).value.location).to.exist
    })
    it('status', () => {
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: 'bac',
        status: 'tentativo'
      }).error).to.exist
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: 'bac',
        status: 'tentative'
      }).value.status).to.equal('tentative')
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: 'bac',
        status: 'cancelled'
      }).value.status).to.equal('cancelled')
      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: 'bac',
        status: 'confirmed'
      }).value.status).to.equal('confirmed')
    })
    it('categories', () => {
      const { details } = validateEvent({
        title: 'foo',
        uid: 'foo',
        start: 'bac',
        categories: [1]
      }).error

      expect(details.some(p => p.message === '"0" must be a string')).to.be.true

      expect(validateEvent({
        title: 'foo',
        uid: 'foo',
        start: 'bac',
        categories: ['foo', 'bar']
      }).value.categories).to.exist
    })
    xit('organizer', () => {

    })
    xit('attendees', () => {

    })
  })

})