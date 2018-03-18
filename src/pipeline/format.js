import {
  setAlarm,
  setContact,
  setOrganizer,
  setDate,
  setDescription,
  setGeolocation,
  formatDuration
} from '../utils'
import _ from 'lodash'

export default function formatEvent(attributes = {}) {
  const {
    title,
    productId,
    uid,
    timestamp,
    start,
    startType,
    duration,
    end,
    description,
    url,
    geo,
    location,
    status,
    categories,
    organizer,
    attendees,
    alarms
  } = attributes

  let icsFormat = ''
  icsFormat += 'BEGIN:VCALENDAR\r\n'
  icsFormat += 'VERSION:2.0\r\n'
  icsFormat += 'CALSCALE:GREGORIAN\r\n'
  icsFormat += `PRODID:${productId}\r\n`
  icsFormat += 'BEGIN:VEVENT\r\n'
  icsFormat += `UID:${uid}\r\n`
  icsFormat += `SUMMARY:${title}\r\n`
  icsFormat += `DTSTAMP:${timestamp}\r\n`

  // All day events like anniversaries must be specified as VALUE type DATE
  icsFormat += `DTSTART${start.length == 3 ? ";VALUE=DATE" : ""}:${setDate(start, startType)}\r\n`

  // End is not required for all day events on single days (like anniversaries)
  if (!(_.isEqual(start, end) && end.length == 3)) {
    if (end.length == 3) {
      icsFormat += `DTEND;VALUE=DATE:${setDate(end, startType)}\r\n`;
    } else {
      icsFormat += `DTEND:${setDate(end, startType)}\r\n`;
    }
  }
  
  icsFormat += description ? `DESCRIPTION:${setDescription(description)}\r\n` : ''
  icsFormat += url ? `URL:${url}\r\n` : ''
  icsFormat += geo ? `GEO:${setGeolocation(geo)}\r\n` : ''
  icsFormat += location ? `LOCATION:${location}\r\n` : ''
  icsFormat += status ? `STATUS:${status}\r\n` : ''
  icsFormat += categories ? `CATEGORIES:${categories}\r\n` : ''
  icsFormat += organizer ? `ORGANIZER;${setOrganizer(organizer)}\r\n` : ''

  if (attendees) {
    attendees.map(function (attendee) {
      icsFormat += `ATTENDEE;${setContact(attendee)}\r\n`
    })
  }

  if (alarms) {
    alarms.map(function (alarm) {
      icsFormat += setAlarm(alarm)
    })
  }

  icsFormat += duration ? `DURATION:${formatDuration(duration)}\r\n` : ''
  icsFormat += `END:VEVENT\r\n`
  icsFormat += `END:VCALENDAR\r\n`

  return icsFormat
}