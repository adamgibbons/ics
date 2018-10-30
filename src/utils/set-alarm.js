import setDate from './set-date'
import foldLine from './fold-line'
import _ from 'lodash'

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

function setTrigger (trigger, dateType = 'utc') {
  let formattedString = ''
  if(_.isArray(trigger)){
    formattedString = `TRIGGER;VALUE=DATE-TIME:${setDate(trigger, dateType)}\r\n`
  }else{
    let alert = trigger.before ? '-' : ''
    formattedString = `TRIGGER:${alert+setDuration(trigger)}\r\n`
  }

  return formattedString
}

function setAction (action){
  return action.toUpperCase();
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
    triggerDateType,
    summary
  } = attributes

  let formattedString = 'BEGIN:VALARM\r\n'
  formattedString += foldLine(`ACTION:${setAction(action)}`) + '\r\n'
  formattedString += repeat ? foldLine(`REPEAT:${repeat}`) + '\r\n' : ''
  formattedString += description ? foldLine(`DESCRIPTION:${description}`) + '\r\n' : ''
  formattedString += duration ? foldLine(`DURATION:${setDuration(duration)}`) + '\r\n' : ''
  let attachInfo = attachType ? attachType : 'FMTTYPE=audio/basic'
  formattedString += attach ? foldLine(`ATTACH;${attachInfo}:${attach}`) + '\r\n' : ''
  formattedString += trigger ? setTrigger(trigger, triggerDateType) : ''
  formattedString += summary ? (foldLine(`SUMMARY:${summary}`) + '\r\n') : ''
  formattedString += 'END:VALARM\r\n'

  return formattedString
}

// Example:  A duration of 15 days, 5 hours, and 20 seconds would be:

// P15DT5H0M20S

// A duration of 7 weeks would be:

// P7W
