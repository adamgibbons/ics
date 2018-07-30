import { expect } from 'chai'
import {
  formatEvent,
  buildEvent
} from '../../src/pipeline'

describe('pipeline.formatEvent', () => {
  it('writes default values when no attributes passed', () => {
    const event = buildEvent()
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('BEGIN:VCALENDAR')
    expect(formattedEvent).to.contain('VERSION:2.0')
    expect(formattedEvent).to.contain('X-PUBLISHED-TTL:PT1H')
    expect(formattedEvent).to.contain('PRODID:adamgibbons/ics')
    expect(formattedEvent).to.contain('BEGIN:VEVENT')
    expect(formattedEvent).to.contain('SUMMARY:Untitled event')
    expect(formattedEvent).to.contain('UID:')
    expect(formattedEvent).to.contain('DTSTART:')
    expect(formattedEvent).to.contain('DTSTAMP:20')
    expect(formattedEvent).to.contain('END:VEVENT')
    expect(formattedEvent).to.contain('END:VCALENDAR')
  })
  it('writes a calendar name', () => {
    const event = buildEvent({ calendarName: 'bar baz' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('X-WR-CALNAME:bar baz')
  })
  it('writes a published TTL', () => {
    const event = buildEvent({ ttl: { minutes: 30 } })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('X-PUBLISHED-TTL:PT30M')
  })
  it('writes a title', () => {
    const event = buildEvent({ title: 'foo bar' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('SUMMARY:foo bar')
  })
  it('writes a start date-time', () => {
    const event = buildEvent({ start: [2017, 5, 15, 10, 0] })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DTSTART:2017051')
  })
  it('writes an end date-time', () => {
    const event = buildEvent({ end: [2017, 5, 15, 11, 0] })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DTEND:2017051')
  })
  it('writes a description', () => {
    const event = buildEvent({ description: 'bar baz' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DESCRIPTION:bar baz')
  })
  it('escapes characters in text types', () => {
    const event = buildEvent({ title: 'colon: semi; comma, period. slash\\', description: 'colon: semi; comma, period. slash\\' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DESCRIPTION:colon: semi\\; comma\\, period. slash\\\\')
    expect(formattedEvent).to.contain('SUMMARY:colon: semi\\; comma\\, period. slash\\\\')
  })
  it('folds a long description', () => {
    const event = buildEvent({ description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DESCRIPTION:Lorem ipsum dolor sit amet\\, consectetur adipiscing elit\\, sed \r\n\tdo eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad \r\n\tminim veniam\\, quis nostrud exercitation ullamco laboris nisi ut aliquip e\r\n\tx ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptat\r\n\te velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaec\r\n\tat cupidatat non proident\\, sunt in culpa qui officia deserunt mollit anim\r\n\t id est laborum.')
  })
  it('writes a url', () => {
    const event = buildEvent({ url: 'http://www.example.com/' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('URL:http://www.example.com/')
  })
  it('writes a geo', () => {
    const event = buildEvent({ geo: { lat: 1.234, lon: -9.876 } })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('GEO:1.234;-9.876')
  })
  it('writes a location', () => {
    const event = buildEvent({ location: 'Folsom Field, University of Colorado at Boulder' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('LOCATION:Folsom Field, University of Colorado at Boulder')
  })
  it('writes a status', () => {
    const event = buildEvent({ status: 'tentative' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('STATUS:tentative')
  })
  it('writes categories', () => {
    const event = buildEvent({ categories: ['boulder', 'running'] })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('CATEGORIES:boulder,running')
  })

  it('writes all-day events', () => {
    const eventWithOnlyStart = buildEvent({ start: [2017, 5, 15] })
    const formattedStartEvent = formatEvent(eventWithOnlyStart)
    expect(formattedStartEvent).to.contain('DTSTART;VALUE=DATE:20170515')
    expect(formattedStartEvent).to.not.contain('DTEND')

    const eventWithStartAndEnd = buildEvent({ start: [2017, 5, 15], end: [2017, 5, 18] })
    const formattedStartEndEvent = formatEvent(eventWithStartAndEnd)
    expect(formattedStartEndEvent).to.contain('DTSTART;VALUE=DATE:20170515')
    expect(formattedStartEndEvent).to.contain('DTEND;VALUE=DATE:20170518')
  })

  it('writes attendees', () => {
    const event = buildEvent({ attendees: [
      {name: 'Adam Gibbons', email: 'adam@example.com'},
      {name: 'Brittany Seaton', email: 'brittany@example.com', rsvp: true }
    ]})
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('ATTENDEE;RSVP=FALSE;CN=Adam Gibbons:mailto:adam@example.com')
    expect(formattedEvent).to.contain('ATTENDEE;RSVP=TRUE;CN=Brittany Seaton:mailto:brittany@example.com')
  })
  it('writes an organizer', () => {
    const event = formatEvent({ organizer: {
      name: 'Adam Gibbons',
      email: 'adam@example.com'
    }})
    const formattedEvent = formatEvent(event)
    expect(event).to.contain('ORGANIZER;CN=Adam Gibbons:mailto:adam@example.com')
  })
  it('writes an alarm', () => {
    const formattedEvent = formatEvent({ alarms: [{
      action: 'audio',
      trigger: [1997, 2, 17, 1, 30],
      repeat: 4,
      duration: { minutes: 15 },
      attach: 'ftp://example.com/pub/sounds/bell-01.aud'
    }]})

    expect(formattedEvent).to.contain('BEGIN:VALARM')
    expect(formattedEvent).to.contain('TRIGGER;VALUE=DATE-TIME:19970217T')
    expect(formattedEvent).to.contain('REPEAT:4')
    expect(formattedEvent).to.contain('DURATION:PT15M')
    expect(formattedEvent).to.contain('ACTION:AUDIO')
    expect(formattedEvent).to.contain('ATTACH;FMTTYPE=audio/basic:ftp://example.com/pub/sounds/bell-01.aud')
    expect(formattedEvent).to.contain('END:VALARM')
  })
  it('never writes lines longer than 75 characters, excluding CRLF', () => {
    const formattedEvent = formatEvent({
      productId: '*'.repeat(1000),
      method: '*'.repeat(1000),
      title: '*'.repeat(1000),
      description: '*'.repeat(1000),
      url: '*'.repeat(1000),
      geo: '*'.repeat(1000),
      location: '*'.repeat(1000),
      status: '*'.repeat(1000),
      categories: '*'.repeat(1000),
      organizer: '*'.repeat(1000),
      attendees: [
        {name: '*'.repeat(1000), email: '*'.repeat(1000)},
        {name: '*'.repeat(1000), email: '*'.repeat(1000), rsvp: true}
      ]
    })
    const max = Math.max(...formattedEvent.split('\r\n').map(line => line.length))
    expect(max).to.be.at.most(75)
  })
})
