import { expect } from 'chai'
import { createEvent } from '../src'

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
  it('builds and formats an event supporting params', () => {
    const event = createEvent({
      uid: 'foobar',
      start: 'abc',
      alarms: [{ action: 'AUDIO', trigger: '-PT30M' }]
    })

    expect(event).to.contain('foobar')
    expect(event).to.contain('BEGIN:VALARM')
  })
})
