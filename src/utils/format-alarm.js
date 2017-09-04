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

  formattedAlarm += 'END:VALARM\r\n'

  return formattedAlarm
}

// trigger: [1997, 3, 17, 13, 30],
// duration: [0, 15],

// expect(formattedAlarm).to.contain('TRIGGER;VALUE=DATE-TIME:19970317T133000Z')
// expect(formattedAlarm).to.contain('DURATION:PT15M')
