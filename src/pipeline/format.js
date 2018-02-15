import {
    setAlarm,
    setContact,
    setOrganizer,
    setDate,
    setDescription,
    setGeolocation,
    formatDuration
} from '../utils'

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
    icsFormat += 'BEGIN:VEVENT\r\n'
    icsFormat += `UID:${uid}\r\n`
    icsFormat += `SUMMARY:${title}\r\n`
    icsFormat += `DTSTAMP:${timestamp}\r\n`
    icsFormat += `DTSTART:${setDate(start, startType)}\r\n`
    icsFormat += end ? `DTEND:${setDate(end, startType)}\r\n` : ''
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

    return icsFormat
}
