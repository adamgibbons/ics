import {
    setAlarm,
    setContact,
    setOrganizer,
    setDate,
    setDescription,
    setGeolocation,
    formatDuration
} from '../utils'

export default function formatCalendar (attributes = {}) {
  const {icsEvents,productId} = attributes
  let icsFormat = ''
  icsFormat += 'BEGIN:VCALENDAR\r\n'
  icsFormat += 'VERSION:2.0\r\n'
  icsFormat += 'CALSCALE:GREGORIAN\r\n'
  icsFormat += `PRODID:${productId}\r\n`
  icsFormat += `METHOD:PUBLISH\r\n`
  icsFormat += `X-PUBLISHED-TTL:PT1H\r\n`
  icsFormat += icsEvents

  icsFormat += `END:VCALENDAR\r\n`
  return icsFormat
}
