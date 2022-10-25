import {
    setAlarm,
    setContact,
    setOrganizer,
    formatDate,
    setDescription,
    setLocation,
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
    startInputType,
    startOutputType,
    duration,
    end,
    endInputType,
    endOutputType,
    description,
    url,
    geo,
    location,
    status,
    categories,
    organizer,
    attendees,
    alarms,
    recurrenceRule,
    busyStatus,
    classification,
    created,
    lastModified,
    calName,
    htmlContent
  } = attributes

  let icsFormat = ''
  icsFormat += 'BEGIN:VCALENDAR\r\n'
  icsFormat += 'VERSION:2.0\r\n'
  icsFormat += 'CALSCALE:GREGORIAN\r\n'
  icsFormat += foldLine(`PRODID:${productId}`) + '\r\n'
  icsFormat += foldLine(`METHOD:${method}`) + '\r\n'
  icsFormat += calName ? (foldLine(`X-WR-CALNAME:${calName}`) + '\r\n') : ''
  icsFormat += `X-PUBLISHED-TTL:PT1H\r\n`
  icsFormat += 'BEGIN:VEVENT\r\n'
  icsFormat += `UID:${uid}\r\n`
  icsFormat +=  foldLine(`SUMMARY:${title ? setSummary(title) : title}`) + '\r\n'
  icsFormat += `DTSTAMP:${timestamp}\r\n`

  // All day events like anniversaries must be specified as VALUE type DATE
  icsFormat += `DTSTART${start && start.length == 3 ? ";VALUE=DATE" : ""}:${formatDate(start, startOutputType || startType, startInputType)}\r\n`

  // End is not required for all day events on single days (like anniversaries)
  if (!end || end.length !== 3 || start.length !== end.length || start.some((val, i) => val !== end[i])) {
    if (end) {
      icsFormat += `DTEND${end.length === 3 ? ";VALUE=DATE" : ""}:${formatDate(end, endOutputType || startOutputType || startType, endInputType || startInputType)}\r\n`;
    }
  }

  icsFormat += typeof sequence !== 'undefined' ? (`SEQUENCE:${sequence}\r\n`) : ''
  icsFormat += description ? (foldLine(`DESCRIPTION:${setDescription(description)}`) + '\r\n') : ''
  icsFormat += url ? (foldLine(`URL:${url}`) + '\r\n') : ''
  icsFormat += geo ? (foldLine(`GEO:${setGeolocation(geo)}`) + '\r\n') : ''
  icsFormat += location ? (foldLine(`LOCATION:${setLocation(location)}`) + '\r\n') : ''
  icsFormat += status ? (foldLine(`STATUS:${status}`) + '\r\n') : ''
  icsFormat += categories ? (foldLine(`CATEGORIES:${categories}`) + '\r\n') : ''
  icsFormat += organizer ? (foldLine(`ORGANIZER;${setOrganizer(organizer)}`) + '\r\n') : ''
  icsFormat += busyStatus ? (foldLine(`X-MICROSOFT-CDO-BUSYSTATUS:${busyStatus}`) + '\r\n') : ''
  icsFormat += classification ? (foldLine(`CLASS:${classification}`) + '\r\n') : ''
  icsFormat += created ? ('CREATED:' + formatDate(created) + '\r\n') : ''
  icsFormat += lastModified ? ('LAST-MODIFIED:' + formatDate(lastModified) + '\r\n') : ''
  icsFormat += htmlContent ? (foldLine(`X-ALT-DESC;FMTTYPE=text/html:${htmlContent}`) + '\r\n') : ''
  if (attendees) {
    attendees.map(function (attendee) {
      icsFormat += foldLine(`ATTENDEE;${setContact(attendee)}`) + '\r\n'
    })
  }
  icsFormat += recurrenceRule ? `RRULE:${recurrenceRule}\r\n` : ''
  icsFormat += duration ? `DURATION:${formatDuration(duration)}\r\n` : ''
  if (alarms) {
    alarms.map(function (alarm) {
      icsFormat += setAlarm(alarm)
    })
  }
  icsFormat += `END:VEVENT\r\n`
  icsFormat += `END:VCALENDAR\r\n`

  return icsFormat
}
