import setDate from './set-date'

function formatDuration (duration = []) {
  const [hours, minutes, seconds] = duration

  let formattedDuration = 'PT'
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
    attach
  } = attributes

  let formattedAlarm = 'BEGIN:VALARM\r\n'
  formattedAlarm += action ? `ACTION:${action}\r\n` : ''
  formattedAlarm += attach ? `ATTACH;FMTTYPE=audio/basic:${attach}\r\n` : ''
  formattedAlarm += repeat ? `REPEAT:${repeat}\r\n` : ''
  formattedAlarm += duration ? `DURATION:${formatDuration(duration)}\r\n` : ''
  formattedAlarm += trigger ? `TRIGGER;VALUE=DATE-TIME:${setDate(trigger)}\r\n` : ''

  formattedAlarm += 'END:VALARM\r\n'

  return formattedAlarm
}
