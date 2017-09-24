import {
    setAlarm,
    setContact,
    setDate,
    setGeolocation
} from '../utils'

function formatDuration ( attributes = {}) {
  const { weeks, days, hours, minutes, seconds } = attributes

  let formattedDuration = 'P'
  formattedDuration += weeks ? `${weeks}W` : ''
  formattedDuration += days ? `${days}D` : ''
  formattedDuration += 'T'
  formattedDuration += hours ? `${hours}H` : ''
  formattedDuration += minutes ? `${minutes}M` : ''
  formattedDuration += seconds ? `${seconds}S` : ''

  return formattedDuration
}

export default function formatEvent (attributes = {}) {
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
    icsFormat += `DTSTART:${setDate(start, startType)}\r\n`
    icsFormat += end ? `DTEND:${end}\r\n` : ''
    icsFormat += description ? `DESCRIPTION:${description}\r\n` : ''
    icsFormat += url ? `URL:${url}\r\n` : ''
    icsFormat += geo ? `GEO:${setGeolocation(geo)}\r\n` : ''
    icsFormat += location ? `LOCATION:${location}\r\n` : ''
    icsFormat += status ? `STATUS:${status}\r\n` : ''
    icsFormat += categories ? `CATEGORIES:${categories}\r\n` : ''
    icsFormat += organizer ? `ORGANIZER;${setContact(organizer)}\r\n` : ''
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
