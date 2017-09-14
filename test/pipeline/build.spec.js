import { expect } from 'chai'
import { buildEvent } from '../../src/pipeline'

describe('pipeline.build properties', () => {
  describe('start', () => {
    xit('defaults to UTC date-time format', () => {
      const event = buildEvent({ start: [2017, 0, 19, 1, 30] })
      expect(event.start).to.equal('20170119T083000Z')
      expect(event.title).to.equal('Untitled event')
    })
    xit('sets local time when specified', () => {
      const event = buildEvent({
        start: [2017, 0, 19, 1, 30],
        startType: 'local'
      })
      expect(event.start).to.equal('20170119T013000')
    })
  })
  describe('end', () => {
    xit('defaults to UTC date-time format', () => {
      const event = buildEvent({ end: [2017, 0, 19, 22, 0] })
      expect(event.end).to.equal('20170120T050000Z')
      expect(event.title).to.equal('Untitled event')
    })
    xit('sets local time when local start time specified', () => {
      const event = buildEvent({
        end: [2017, 0, 19, 1, 30],
        startType: 'local'
      })
      expect(event.end).to.equal('20170119T013000')
    })
  })
  describe('title', () => {
    it('sets a default', () => {
      const event = buildEvent()
      expect(event.title).to.equal('Untitled event')
      expect(event.productId).to.equal('adamgibbons/ics')
    })
    it('sets an argument', () => {
      const event = buildEvent({ title: 'Hello event!' })
      expect(event.title).to.equal('Hello event!')
    })
  })
  describe.only('alarms', () => {
    it('sets a default', () => {
      const event = buildEvent({
        alarms: [{
          action: 'audio',
          trigger: [1997, 3, 17, 13, 30, 0],
          repeat: 4,
          duration: 'PT15M',
          description: 'Breakfast meeting with executive\nteam at 8:30 AM EST.'
        }]
      })
      console.log(event)
      expect(event.alarms).to.exist
    })
  })
  it('sets default values when no attributes passed', () => {
    const event = buildEvent()
    expect(event.title).to.equal('Untitled event')
    expect(event.uid.length).to.equal(36)
    expect(event.timestamp.length).to.equal(16)
    expect(event.productId).to.equal('adamgibbons/ics')
    expect(event.start).to.exist
    expect(event.url).not.to.exist
  })

  it('sets a productId', () => {
    const event = buildEvent({ productId: 'my-id' })
    expect(event.productId).to.equal('my-id')
    expect(event.title).to.equal('Untitled event')
  })
  it('sets a uid', () => {
    const event = buildEvent({ uid: 123 })
    expect(event.uid).to.equal(123)
    expect(event.title).to.equal('Untitled event')
  })
  it('sets a description', () => {
    const event = buildEvent({ description: 'chatanooga' })
    expect(event.description).to.equal('chatanooga')
    expect(event.title).to.equal('Untitled event')
  })
  it('sets a url', () => {
    const event = buildEvent({ url: 'http://www.example.com/' })
    expect(event.url).to.equal('http://www.example.com/')
    expect(event.title).to.equal('Untitled event')
  })
  it('sets a geolocation', () => {
    const event = buildEvent({ geolocation: { lat: 37.386013, lon: -122.082932 } })
    expect(event.geolocation).to.equal('37.386013;-122.082932')
    expect(event.title).to.equal('Untitled event')
  })
  it('sets a location', () => {
    const event = buildEvent({ location: 'Folsom Field, University of Colorado at Boulder' })
    expect(event.location).to.equal('Folsom Field, University of Colorado at Boulder')
  })
  it('sets no status when status is invalid', () => {
    const event = buildEvent({ status: 'foo' })
    expect(event.status).not.to.exist
  })
  it('sets a status when status is valid', () => {
    const event1 = buildEvent({ status: 'tentative' })
    const event2 = buildEvent({ status: 'confirmed' })
    const event3 = buildEvent({ status: 'cancelled' })
    
    expect(event1.status).to.equal('tentative')
    expect(event2.status).to.equal('confirmed')
    expect(event3.status).to.equal('cancelled')
  })
  it ('sets no categories when categories are invalid', () => {
    const event = buildEvent({ categories: 1 })
    expect(event.categories).not.to.exist
  })
  it('sets categories', () => {
    const event = buildEvent({ categories: ['running', 'races', 'boulder', 'huzzah'] })
    expect(event.categories).to.equal('running,races,boulder,huzzah')
  })
  it('sets attendees', () => {
    const event = buildEvent({ attendees: [
      { name: 'Adam Gibbons', email: 'adam@example.com' },
      { name: 'Brittany Seaton', email: 'brittany@example.com' }
    ]})

    expect(event.attendees.length).to.equal(2)
    expect(event.attendees).to.include('CN=Adam Gibbons:mailto:adam@example.com')
    expect(event.attendees).to.include('CN=Brittany Seaton:mailto:brittany@example.com')
  })
  it('sets an organizer', () => {
    const event = buildEvent({ organizer: {
      name: 'Adam Gibbons',
      email: 'adam@example.com'
    }})
    expect(event.organizer).to.include('CN=Adam Gibbons:mailto:adam@example.com')
  })
  it('sets an alarm', () => {
    const event = buildEvent({ organizer: {
      name: 'Adam Gibbons',
      email: 'adam@example.com'
    }})
    expect(event.organizer).to.include('CN=Adam Gibbons:mailto:adam@example.com')
  })
})