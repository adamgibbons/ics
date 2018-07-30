import { expect } from 'chai'
import { buildEvent } from '../../src/pipeline'

describe('pipeline.build properties', () => {
  describe('calendarName', () => {
    it('removes a falsey value', () => {
      const event = buildEvent()
      expect(event.description).not.to.exist
    })
    it('sets a calendar name', () => {
      const event = buildEvent({ calendarName: 'feels so good' })
      expect(event.calendarName).to.equal('feels so good')
    })
  })
  describe('title', () => {
    it('sets a default', () => {
      const event = buildEvent()
      expect(event.title).to.equal('Untitled event')
    })
    it('sets a title', () => {
      const event = buildEvent({ title: 'Hello event!' })
      expect(event.title).to.equal('Hello event!')
    })
  })
  describe('productId', () => {
    it('sets a default', () => {
      const event = buildEvent()
      expect(event.productId).to.equal('adamgibbons/ics')
    })
    it('sets a product id', () => {
      const event = buildEvent({ productId: 'myProductId' })
      expect(event.productId).to.equal('myProductId')
    })
  })
  describe('method', () => {
    it('sets a default', () => {
      const event = buildEvent()
      expect(event.method).to.equal('PUBLISH')
    })
    it('sets a method', () => {
      const event = buildEvent({ method: 'REQUEST' })
      expect(event.method).to.equal('REQUEST')
    })
  })
  describe('uid', () => {
    it('sets a default', () => {
      const event = buildEvent()
      expect(event.uid).to.exist
    })
    it('sets a product id', () => {
      const event = buildEvent({ uid: 'myuid' })
      expect(event.uid).to.equal('myuid')
    })
  })  
  describe('start and end', () => {
    it('defaults to UTC date-time format', () => {
      const event = buildEvent({
        start: [2017, 1, 19, 1, 30],
        end: [2017, 1, 19, 12, 0]
      })
      expect(event.start).to.be.an('array')
      expect(event.end).to.be.an('array')
    })
  })
  describe('end', () => {
    it('defaults to UTC date-time format', () => {
      const event = buildEvent({ start: [2017, 1, 19, 1, 30] })
      expect(event.start).to.be.an('array')
    })
  })
  describe('description', () => {
    it('removes a falsey value', () => {
      const event = buildEvent()
      expect(event.description).not.to.exist
    })
    it('sets a description', () => {
      const event = buildEvent({ description: 'feels so good' })
      expect(event.description).to.equal('feels so good')
    })
  })
  describe('url', () => {
    it('removes a falsey value', () => {
      const event = buildEvent()
      expect(event.url).not.to.exist
    })
    it('sets a url', () => {
      const event = buildEvent({ url: 'http://www.google.com' })
      expect(event.url).to.equal('http://www.google.com')
    })
  })
  describe('geo', () => {
    it('removes a falsey value', () => {
      const event = buildEvent()
      expect(event.geo).not.to.exist
    })
    it('sets a url', () => {
      const event = buildEvent({ geo: {lat: 1, lon: 2} })
      expect(event.geo).to.deep.equal({lat: 1, lon: 2})
    })
  })
  describe('location', () => {
    it('removes a falsey value', () => {
      const event = buildEvent()
      expect(event.location).not.to.exist
    })
    it('sets a url', () => {
      const event = buildEvent({ location: 'little boxes' })
      expect(event.location).to.equal('little boxes')
    })
  })
  describe('categories', () => {
    it('removes a falsey value', () => {
      const event = buildEvent()
      expect(event.categories).not.to.exist
    })
    it('sets categories', () => {
      const event = buildEvent({ categories: ['foo', 'bar', 'baz'] })
      expect(event.categories).to.include('foo', 'bar', 'baz')
    })
  })
  describe('organizer', () => {
    it('removes a falsey value', () => {
      const event = buildEvent()
      expect(event.organizer).not.to.exist
    })
    it('sets an organizer', () => {
      const event = buildEvent({ organizer: {
        name: 'Adam Gibbons',
        email: 'adam@example.com'
      }})
      expect(event.organizer).to.deep.equal({
        name: 'Adam Gibbons',
        email: 'adam@example.com'
      })
    })
  })
  describe('attendees', () => {
    it('removes a falsey value', () => {
      const event = buildEvent()
      expect(event.attendees).not.to.exist
    })
    it('sets attendees', () => {
      const event = buildEvent({ attendees: [
        { name: 'Adam Gibbons', email: 'adam@example.com' },
        { name: 'Brittany Seaton', email: 'brittany@example.com' }
      ]})
      expect(event.attendees).to.be.an('array').to.have.length(2)
    })
  })
  describe('alarms', () => {
    it('removes falsey values', () => {
      const event = buildEvent()
      expect(event.alarms).not.to.exist
    })
    it('sets alarms', () => {
      const event = buildEvent({
        alarms: [{
          action: 'audio',
          trigger: [1997, 3, 17, 13, 30, 0],
          repeat: 4,
          duration: {
            hours: 1
          },
          description: 'Breakfast meeting with executive\nteam.'
        }]
      })
      expect(event.alarms).to.be.an('array')
    })
  })
})