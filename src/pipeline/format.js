import {
    setAlarm,
    setContact,
    setOrganizer,
    formatDate,
    formatTzidParam,
    setDescription,
    setLocation,
    setSummary,
    setGeolocation,
    formatDuration,
    foldLine
} from '../utils'
import encodeNewLines from '../utils/encode-new-lines'

export function formatHeader(attributes = {}) {
  const {
    productId,
    method,
    calName,
    timezones
  } = attributes

  let icsFormat = ''
  icsFormat += 'BEGIN:VCALENDAR\r\n'
  icsFormat += 'VERSION:2.0\r\n'
  icsFormat += 'CALSCALE:GREGORIAN\r\n'
  icsFormat += foldLine(`PRODID:${encodeNewLines(productId)}`) + '\r\n'
  icsFormat += foldLine(`METHOD:${encodeNewLines(method)}`) + '\r\n'
  icsFormat += calName ? (foldLine(`X-WR-CALNAME:${encodeNewLines(calName)}`) + '\r\n') : ''
  icsFormat += `X-PUBLISHED-TTL:PT1H\r\n`
  icsFormat += timezones ? timezones + '\r\n' : ''

  return icsFormat
}

export function formatFooter() {
  return `END:VCALENDAR\r\n`
}

export function formatEvent(attributes = {}) {
  const {
    title,
    uid,
    sequence,
    timestamp,
    start,
    startType,
    startInputType,
    startOutputType,
    startTimezone,
    duration,
    end,
    endInputType,
    endOutputType,
    endTimezone,
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
    exclusionDates,
    exclusionDatesTimezone,
    busyStatus,
    transp,
    classification,
    created,
    lastModified,
    htmlContent
  } = attributes

  let icsFormat = ''
  icsFormat += 'BEGIN:VEVENT\r\n'
  icsFormat += foldLine(`UID:${encodeNewLines(uid)}`) + '\r\n'
  icsFormat += title ? foldLine(`SUMMARY:${encodeNewLines(setSummary(title))}`) + '\r\n' : ''
  icsFormat += foldLine(`DTSTAMP:${encodeNewLines(formatDate(timestamp))}`) + '\r\n'

  // All day events like anniversaries must be specified as VALUE type DATE
  icsFormat += foldLine(`DTSTART${start && start.length == 3 ? ";VALUE=DATE" : ""}${formatTzidParam(startTimezone)}:${encodeNewLines(formatDate(start, (startTimezone && 'local') || startOutputType || startType, startInputType))}`) + '\r\n'

  // End is not required for all day events on single days (like anniversaries)
  if (!end || end.length !== 3 || start.length !== end.length || start.some((val, i) => val !== end[i])) {
    if (end) {
      icsFormat += foldLine(`DTEND${end.length === 3 ? ";VALUE=DATE" : ""}${formatTzidParam(endTimezone)}:${encodeNewLines(formatDate(end, (endTimezone && 'local') || endOutputType || startOutputType || startType, endInputType || startInputType))}`) + '\r\n'
    }
  }

  icsFormat += typeof sequence !== 'undefined' ? (`SEQUENCE:${sequence}\r\n`) : ''
  icsFormat += description ? (foldLine(`DESCRIPTION:${encodeNewLines(setDescription(description))}`) + '\r\n') : ''
  icsFormat += url ? (foldLine(`URL:${encodeNewLines(url)}`) + '\r\n') : ''
  icsFormat += geo ? (foldLine(`GEO:${setGeolocation(geo)}`) + '\r\n') : ''
  icsFormat += location ? (foldLine(`LOCATION:${encodeNewLines(setLocation(location))}`) + '\r\n') : ''
  icsFormat += status ? (foldLine(`STATUS:${encodeNewLines(status)}`) + '\r\n') : ''
  icsFormat += categories ? (foldLine(`CATEGORIES:${encodeNewLines(categories.join(','))}`) + '\r\n') : ''
  icsFormat += organizer ? (foldLine(`ORGANIZER;${setOrganizer(organizer)}`) + '\r\n') : ''
  icsFormat += busyStatus ? (foldLine(`X-MICROSOFT-CDO-BUSYSTATUS:${encodeNewLines(busyStatus)}`) + '\r\n') : ''
  icsFormat += transp ? (foldLine(`TRANSP:${encodeNewLines(transp)}`) + '\r\n') : ''
  icsFormat += classification ? (foldLine(`CLASS:${encodeNewLines(classification)}`) + '\r\n') : ''
  icsFormat += created ? ('CREATED:' + encodeNewLines(formatDate(created)) + '\r\n') : ''
  icsFormat += lastModified ? ('LAST-MODIFIED:' + encodeNewLines(formatDate(lastModified)) + '\r\n') : ''
  icsFormat += htmlContent ? (foldLine(`X-ALT-DESC;FMTTYPE=text/html:${encodeNewLines(htmlContent)}`) + '\r\n') : ''
  if (attendees) {
    attendees.forEach((attendee) => {
      icsFormat += foldLine(`ATTENDEE;${encodeNewLines(setContact(attendee))}`) + '\r\n'
    })
  }
  icsFormat += recurrenceRule ? foldLine(`RRULE:${encodeNewLines(recurrenceRule)}`) + '\r\n' : ''
  icsFormat += exclusionDates ? foldLine(`EXDATE${formatTzidParam(exclusionDatesTimezone)}:${encodeNewLines(exclusionDates.map((a) => formatDate(a, exclusionDatesTimezone && 'local')).join(','))}`) + '\r\n': ''
  icsFormat += duration ? foldLine(`DURATION:${formatDuration(duration)}`) + '\r\n' : ''
  if (alarms) {
    alarms.forEach((alarm) => {
      icsFormat += setAlarm(alarm)
    })
  }
  icsFormat += `END:VEVENT\r\n`

  return icsFormat
}
