import dayjs from 'dayjs';
import { expect } from 'chai'
import {
  formatEvent,
  buildEvent,
  formatHeader,
  buildHeader
} from '../../src/pipeline'
import {foldLine} from "../../src/utils";

describe('pipeline.formatHeader', () => {
  it('writes default values when no attributes passed', () => {
    const header = buildHeader()
    const formattedHeader = formatHeader(header)
    expect(formattedHeader).to.contain('BEGIN:VCALENDAR')
    expect(formattedHeader).to.contain('VERSION:2.0')
    expect(formattedHeader).to.contain('PRODID:adamgibbons/ics')
  })
  it('writes a product id', () => {
    const header = buildHeader({ productId: 'productId'})
    const formattedHeader = formatHeader(header)
    expect(formattedHeader).to.contain('PRODID:productId')
  })
  it('writes a method', () => {
    const header = buildHeader({ method: 'method'})
    const formattedHeader = formatHeader(header)
    expect(formattedHeader).to.contain('METHOD:method')
  })
  it('writes a calName', () => {
    const header = buildHeader({ calName: 'calName'})
    const formattedHeader = formatHeader(header)
    expect(formattedHeader).to.contain('X-WR-CALNAME:calName')
  })
})

describe('pipeline.formatEvent', () => {
  it('writes default values when no attributes passed', () => {
    const event = buildEvent()
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('BEGIN:VEVENT')
    expect(formattedEvent).to.contain('SUMMARY:Untitled event')
    expect(formattedEvent).to.contain('UID:')
    expect(formattedEvent).to.not.contain('SEQUENCE:')
    expect(formattedEvent).to.contain('DTSTART:')
    expect(formattedEvent).to.contain('DTSTAMP:20')
    expect(formattedEvent).to.contain('END:VEVENT')
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
  it('writes a start date-time, taking the given date as local by default and outputting is as UTC by default', () => {
    const event = buildEvent({ start: [2017, 5, 15, 10, 0] })
    const formattedEvent = formatEvent(event)
    const now = dayjs(new Date(2017, 5 - 1, 15, 10, 0)).utc().format('YYYYMMDDTHHmm00')
    expect(formattedEvent).to.contain('DTSTART:'+now+'Z')
  })
  it('writes a start date-time, taking the given date as local by default and outputting is as UTC if requested', () => {
    const event = buildEvent({ start: [2017, 5, 15, 10, 0], startOutputType: 'utc' })
    const formattedEvent = formatEvent(event)
    const now = dayjs(new Date(2017, 5 - 1, 15, 10, 0)).utc().format('YYYYMMDDTHHmm00')
    expect(formattedEvent).to.contain('DTSTART:'+now+'Z')
  })
  it('writes a start date-time, taking the given date as local by default and outputting is as Local (floating) if requested', () => {
    const event = buildEvent({ start: [2017, 5, 15, 10, 0], startOutputType: 'local' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DTSTART:20170515T100000')
    expect(formattedEvent).to.not.contain('DTSTART:20170515T100000Z')
  })
  it('writes a start date-time, taking the given date as local if requested and outputting is as UTC by default', () => {
    const event = buildEvent({ start: [2017, 5, 15, 10, 0], startInputType: 'local' })
    const formattedEvent = formatEvent(event)
    const now = dayjs(new Date(2017, 5 - 1, 15, 10, 0)).utc().format('YYYYMMDDTHHmm00')
    expect(formattedEvent).to.contain('DTSTART:'+now+'Z')
  })
  it('writes a start date-time, taking the given date as local if requested and outputting is as UTC if requested', () => {
    const event = buildEvent({ start: [2017, 5, 15, 10, 0], startInputType: 'local', startOutputType: 'utc' })
    const formattedEvent = formatEvent(event)
    const now = dayjs(new Date(2017, 5 - 1, 15, 10, 0)).utc().format('YYYYMMDDTHHmm00')
    expect(formattedEvent).to.contain('DTSTART:'+now+'Z')
  })
  it('writes a start date-time, taking the given date as local if requested and outputting is as Local (floating) if requested', () => {
    const event = buildEvent({ start: [2017, 5, 15, 10, 0], startInputType: 'local', startOutputType: 'local' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DTSTART:20170515T100000')
    expect(formattedEvent).to.not.contain('DTSTART:20170515T100000Z')
  })
  it('writes a start date-time, taking the given date as UTC if requested and outputting is as UTC by default', () => {
    const event = buildEvent({ start: [2017, 5, 15, 10, 0], startInputType: 'utc' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DTSTART:20170515T100000Z')
  })
  it('writes a start date-time, taking the given date as UTC if requested and outputting is as UTC if requested', () => {
    const event = buildEvent({ start: [2017, 5, 15, 10, 0], startInputType: 'utc', startOutputType: 'utc' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('DTSTART:20170515T100000Z')
  })
  it('writes a start date-time, taking the given date as UTC if requested and outputting is as Local (floating) if requested', () => {
    const event = buildEvent({ start: [2017, 5, 15, 10, 0], startInputType: 'utc', startOutputType: 'local' })
    const formattedEvent = formatEvent(event)
    const now = dayjs(Date.UTC(2017, 5 - 1, 15, 10, 0)).format('YYYYMMDDTHHmm00')
    expect(formattedEvent).to.contain('DTSTART:'+now)
    expect(formattedEvent).to.not.contain('DTSTART:'+now+'Z')
  })
  it('writes a created timestamp', () => {
    const event = buildEvent({ created: [2017, 5, 15, 10, 0] })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('CREATED:20170515')
  })
  it('writes a lastModified timestamp', () => {
    const event = buildEvent({ lastModified: [2017, 5, 15, 10, 0] })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('LAST-MODIFIED:20170515')
  })
  it('writes a html content and folds correctly', () => {
    const event = buildEvent({ htmlContent: '<!DOCTYPE html><html><body><p>This is<br>test<br>html code.</p></body></html>' })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain(`X-ALT-DESC;FMTTYPE=text/html:<!DOCTYPE html><html><body><p>This is<br>test<\r\n\tbr>html code.</p></body></html>`)
  })
  it('writes a sequence', () => {
    const event = buildEvent({ sequence: 8 })
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('SEQUENCE:8')
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
    expect(formattedEvent).to.contain('LOCATION:Folsom Field\\, University of Colorado at Boulder')
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

  it('writes timezone ids', () => {
    const event = buildEvent({ 
      start: [2024, 11, 16], 
      startTimezone: 'Europe/Zurich', 
      end: [2024, 11, 16, 19, 54, 32], 
      endTimezone: 'America/Chicago', 
      exclusionDates: [
        [2024, 5, 6, 15, 36, 21],
        [2024, 7, 21, 9, 38, 7]
      ],
      exclusionDatesTimezone: 'Africa/Nairobi' 
    })
    const formattedEvent = formatEvent(event)
    // match against \r\n to ensure times are written in local time (no 'Z' at the end)
    expect(formattedEvent).to.contain('DTSTART;VALUE=DATE;TZID=Europe/Zurich:20241116\r\n')
    expect(formattedEvent).to.contain('DTEND;TZID=America/Chicago:20241116T195432\r\n')
    expect(formattedEvent).to.contain('EXDATE;TZID=Africa/Nairobi:20240506T153621,20240721T093807\r\n')
  })

  it('writes attendees', () => {
    const event = buildEvent({ attendees: [
      {name: 'Adam Gibbons', email: 'adam@example.com'},
      {name: 'Brittany Seaton', email: 'brittany@example.com', rsvp: true }
    ]})
    const formattedEvent = formatEvent(event)
    expect(formattedEvent).to.contain('ATTENDEE;CN="Adam Gibbons":mailto:adam@example.com')
    expect(formattedEvent).to.contain('ATTENDEE;RSVP=TRUE;CN="Brittany Seaton":mailto:brittany@example.com')
  })
  it('writes a busystatus', () => {
    const eventFree = buildEvent({ busyStatus: "FREE" })
    const eventBusy = buildEvent({ busyStatus: "BUSY"})
    const eventTent = buildEvent({ busyStatus: "TENTATIVE"})
    const eventOOF = buildEvent({ busyStatus: "OOF" })
    const formattedEventFree = formatEvent(eventFree)
    const formattedEventBusy = formatEvent(eventBusy)
    const formattedEventTent = formatEvent(eventTent)
    const formattedEventOOF = formatEvent(eventOOF)
    expect(formattedEventFree).to.contain('X-MICROSOFT-CDO-BUSYSTATUS:FREE')
    expect(formattedEventBusy).to.contain('X-MICROSOFT-CDO-BUSYSTATUS:BUSY')
    expect(formattedEventTent).to.contain('X-MICROSOFT-CDO-BUSYSTATUS:TENTATIVE')
    expect(formattedEventOOF).to.contain('X-MICROSOFT-CDO-BUSYSTATUS:OOF')
  })
  it('writes a transp', () => {
    const eventFree = buildEvent({ transp: "TRANSPARENT" })
    const eventBusy = buildEvent({ transp: "OPAQUE"})
    const formattedEventFree = formatEvent(eventFree)
    const formattedEventBusy = formatEvent(eventBusy)
    expect(formattedEventFree).to.contain('TRANSP:TRANSPARENT')
    expect(formattedEventBusy).to.contain('TRANSP:OPAQUE')
  })
  it('writes a access classification', () => {
    const eventPublic = buildEvent({ classification: "PUBLIC" })
    const eventPrivate = buildEvent({ classification: "PRIVATE"})
    const eventConfidential = buildEvent({ classification: "CONFIDENTIAL"})
    const eventAnyClass = buildEvent({ classification: "non-standard-property" })
    const formattedEventPublic = formatEvent(eventPublic)
    const formattedEventPrivate = formatEvent(eventPrivate)
    const formattedEventConfidential = formatEvent(eventConfidential)
    const formattedEventAnyClass = formatEvent(eventAnyClass)
    expect(formattedEventPublic).to.contain('CLASS:PUBLIC')
    expect(formattedEventPrivate).to.contain('CLASS:PRIVATE')
    expect(formattedEventConfidential).to.contain('CLASS:CONFIDENTIAL')
    expect(formattedEventAnyClass).to.contain('CLASS:non-standard-property')
  })
  it('writes an organizer', () => {
    const formattedEvent = formatEvent({
      productId: 'productId',
      method: 'method',
      uid: 'uid',
      timestamp: 'timestamp',
      organizer: {
        name: 'Adam Gibbons',
        email: 'adam@example.com',
        dir: 'test-dir-value',
        sentBy: 'test@example.com',
      }
    })
    expect(formattedEvent).to.contain(foldLine('ORGANIZER;DIR="test-dir-value";SENT-BY="MAILTO:test@example.com";CN="Adam Gibbons":MAILTO:adam@example.com'))
  })
  it('writes an alarm', () => {
    const formattedEvent = formatEvent({
      productId: 'productId',
      method: 'method',
      uid: 'uid',
      timestamp: 'timestamp',
      alarms: [{
        action: 'audio',
        trigger: [1997, 2, 17, 1, 30],
        repeat: 4,
        duration: { minutes: 15 },
        attach: 'ftp://example.com/pub/sounds/bell-01.aud'
      }]
    })

    expect(formattedEvent).to.contain('BEGIN:VALARM')
    expect(formattedEvent).to.contain('TRIGGER;VALUE=DATE-TIME:199702')
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
      timestamp: '*'.repeat(1000),
      uid: '*'.repeat(1000),
      title: '*'.repeat(1000),
      description: '*'.repeat(1000),
      url: '*'.repeat(1000),
      geo: '*'.repeat(1000),
      location: '*'.repeat(1000),
      status: '*'.repeat(1000),
      categories: ['*'.repeat(1000)],
      organizer: '*'.repeat(1000),
      attendees: [
        {name: '*'.repeat(1000), email: '*'.repeat(1000)},
        {name: '*'.repeat(1000), email: '*'.repeat(1000), rsvp: true}
      ]
    })
    const max = Math.max(...formattedEvent.split('\r\n').map(line => line.length))
    expect(max).to.be.at.most(75)
  })
  it('writes a recurrence rule', () => {
    const formattedEvent = formatEvent({
      productId: 'productId',
      method: 'method',
      uid: 'uid',
      timestamp: 'timestamp',
      recurrenceRule: 'FREQ=DAILY'
    })

    expect(formattedEvent).to.contain('RRULE:FREQ=DAILY')
  })
  it('writes exception date-time', () => {
    const date1 = new Date(0);
    date1.setUTCFullYear(2000);
    date1.setUTCMonth(6);
    date1.setUTCDate(20);
    date1.setUTCHours(1);
    date1.setUTCMinutes(0);
    date1.setUTCSeconds(0);

    const date2 = new Date(date1);
    date2.setUTCDate(21);

    const formattedEvent = formatEvent({
      productId: 'productId',
      method: 'method',
      uid: 'uid',
      timestamp: 'timestamp',
      exclusionDates: [
        [date1.getFullYear(), date1.getMonth(), date1.getDate(), date1.getHours(), date1.getMinutes(), date1.getSeconds()],
        [date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes(), date2.getSeconds()]
      ]
    })
    expect(formattedEvent).to.contain('EXDATE:20000620T010000Z,20000621T010000Z')
  })
})
