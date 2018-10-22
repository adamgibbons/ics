import {
    setAlarm,
    setContact,
    setOrganizer,
    setDate,
    setDescription,
    setSummary,
    setGeolocation,
    formatDuration,
    foldLine
} from '../utils'

export default function formatEvent(attributes = {}) {
  const {
    title,
    productId,
    method,
    uid,
    sequence,
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
  icsFormat += foldLine(`PRODID:${productId}`) + '\r\n'
  icsFormat += foldLine(`METHOD:${method}`) + '\r\n'
  icsFormat += `X-PUBLISHED-TTL:PT1H\r\n`
  icsFormat += 'BEGIN:VEVENT\r\n'
  icsFormat += `UID:${uid}\r\n`
  icsFormat +=  foldLine(`SUMMARY:${title ? setSummary(title) : title}`) + '\r\n'
  icsFormat += `DTSTAMP:${timestamp}\r\n`

  // All day events like anniversaries must be specified as VALUE type DATE
  icsFormat += `DTSTART${start && start.length == 3 ? ";VALUE=DATE" : ""}:${setDate(start, startType)}\r\n`

  // End is not required for all day events on single days (like anniversaries)
  if (!(end && end.length === 3 && Array.isArray(start) && start.every((v, i) => v == end[i]))) {
    if (end && end.length === 3) {
      icsFormat += `DTEND;VALUE=DATE:${setDate(end, startType)}\r\n`;
    } else if (end) {
      icsFormat += `DTEND:${setDate(end, startType)}\r\n`;
    }
  }

  icsFormat += sequence ? (`SEQUENCE:${sequence}\r\n`) : ''
  icsFormat += description ? (foldLine(`DESCRIPTION:${setDescription(description)}`) + '\r\n') : ''
  icsFormat += url ? (foldLine(`URL:${url}`) + '\r\n') : ''
  icsFormat += geo ? (foldLine(`GEO:${setGeolocation(geo)}`) + '\r\n') : ''
  icsFormat += location ? (foldLine(`LOCATION:${location}`) + '\r\n') : ''
  icsFormat += status ? (foldLine(`STATUS:${status}`) + '\r\n') : ''
  icsFormat += categories ? (foldLine(`CATEGORIES:${categories}`) + '\r\n') : ''
  icsFormat += organizer ? (foldLine(`ORGANIZER;${setOrganizer(organizer)}`) + '\r\n') : ''

  if (attendees) {
    attendees.map(function (attendee) {
      icsFormat += foldLine(`ATTENDEE;${setContact(attendee)}`) + '\r\n'
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
