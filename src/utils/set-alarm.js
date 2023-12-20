import formatDate from './format-date'
import foldLine from './fold-line'
import encodeNewLines from './encode-new-lines'

function setDuration ({
  weeks,
  days,
  hours,
  minutes,
  seconds
}) {
  let formattedString = 'P'
  formattedString += weeks ? `${weeks}W` : ''
  formattedString += days ? `${days}D` : ''
  formattedString += 'T'
  formattedString += hours ? `${hours}H` : ''
  formattedString += minutes ? `${minutes}M` : ''
  formattedString += seconds ? `${seconds}S` : ''

  return formattedString
}

function setTrigger (trigger) {
  let formattedString = ''
  if(Array.isArray(trigger) || typeof trigger === 'number' || typeof trigger === 'string') {
    formattedString = `TRIGGER;VALUE=DATE-TIME:${encodeNewLines(formatDate(trigger))}\r\n`
  } else {
    let alert = trigger.before ? '-' : ''
    formattedString = `TRIGGER:${encodeNewLines(alert+setDuration(trigger))}\r\n`
  }

  return formattedString
}

function setAction (action){
  return action.toUpperCase()
}

export default function setAlarm(attributes = {}) {
  const {
    action,
    repeat,
    description,
    duration,
    attach,
    attachType,
    trigger,
    summary
  } = attributes

  let formattedString = 'BEGIN:VALARM\r\n'
  formattedString += foldLine(`ACTION:${encodeNewLines(setAction(action))}`) + '\r\n'
  formattedString += repeat ? foldLine(`REPEAT:${repeat}`) + '\r\n' : ''
  formattedString += description ? foldLine(`DESCRIPTION:${encodeNewLines(description)}`) + '\r\n' : ''
  formattedString += duration ? foldLine(`DURATION:${setDuration(duration)}`) + '\r\n' : ''
  let attachInfo = attachType ? attachType : 'FMTTYPE=audio/basic'
  formattedString += attach ? foldLine(encodeNewLines(`ATTACH;${attachInfo}:${attach}`)) + '\r\n' : ''
  formattedString += trigger ? (setTrigger(trigger)) : ''
  formattedString += summary ? (foldLine(`SUMMARY:${encodeNewLines(summary)}`) + '\r\n') : ''
  formattedString += 'END:VALARM\r\n'

  return formattedString
}

// Example:  A duration of 15 days, 5 hours, and 20 seconds would be:

// P15DT5H0M20S

// A duration of 7 weeks would be:

// P7W
