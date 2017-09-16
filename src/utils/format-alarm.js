import setDate from './set-date'

function formatDuration (attributes = {}) {
  const {
    weeks,
    days,
    hours,
    minutes,
    seconds
  } = attributes

  let formattedDuration = 'P'
  formattedDuration += weeks ? `${weeks}W` : ''
  formattedDuration += days ? `${days}D` : ''
  formattedDuration += 'T'
  formattedDuration += hours ? `${hours}H` : ''
  formattedDuration += minutes ? `${minutes}M` : ''
  formattedDuration += seconds ? `${seconds}S` : ''

  return formattedDuration
}

export default function formatAlarm (attributes = {}) {
  const {
    action,
    trigger,
    repeat,
    duration,
    attach,
    description,
    summary
  } = attributes

  let formattedAlarm = 'BEGIN:VALARM\r\n'
  formattedAlarm += action ? `ACTION:${action}\r\n` : ''
  formattedAlarm += attach ? `ATTACH;FMTTYPE=audio/basic:${attach}\r\n` : ''
  formattedAlarm += repeat ? `REPEAT:${repeat}\r\n` : ''
  formattedAlarm += duration ? `DURATION:${formatDuration(duration)}\r\n` : ''
  formattedAlarm += trigger ? `TRIGGER;VALUE=DATE-TIME:${setDate(trigger)}\r\n` : ''
  formattedAlarm += description ? `DESCRIPTION:${description}\r\n` : ''
  formattedAlarm += summary ? `SUMMARY:${summary}\r\n` : ''
  formattedAlarm += 'END:VALARM\r\n'

  return formattedAlarm
}
