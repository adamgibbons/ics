import { nanoid }  from 'nanoid'
import {
  buildEvent,
  validateEvent,
  formatEvent
} from './pipeline'

function assignUniqueId(event) {
  event.uid = event.uid || nanoid()
  return event
}
function validateAndBuildEvent(event) {
  return validateEvent(buildEvent(event))
}

function applyInitialFormatting({ error, value }) {
  if (error) {
    return { error, value: null }
  }

  return { error: null, value: formatEvent(value) }
}

function reformatEventsByPosition({ error, value }, idx, list) {
  if (error) return { error, value }

  if (idx === 0) {
    // beginning of list
    return { value: value.slice(0, value.indexOf('END:VCALENDAR')), error: null }
  }

  if (idx === list.length - 1) {
    // end of list
    return { value: value.slice(value.indexOf('BEGIN:VEVENT')), error: null}
  }

  return { error: null, value: value.slice(value.indexOf('BEGIN:VEVENT'), value.indexOf('END:VEVENT') + 12) }
}

function catenateEvents(accumulator, { error, value }, idx) {
  if (error) {
    accumulator.error = error
    accumulator.value = null
    return accumulator
  }

  if (accumulator.value) {
    accumulator.value = accumulator.value.concat(value)
    return accumulator
  }

  accumulator.value = value
  return accumulator
}

export function convertTimestampToArray(timestamp, inputType = 'local') {
  const dateArray = [];
  const d = new Date(timestamp);
  dateArray.push(inputType === 'local' ? d.getFullYear() : d.getUTCFullYear());
  dateArray.push((inputType === 'local' ? d.getMonth() : d.getUTCMonth()) + 1);
  dateArray.push(inputType === 'local' ? d.getDate() : d.getUTCDate());
  dateArray.push(inputType === 'local' ? d.getHours() : d.getUTCHours());
  dateArray.push(inputType === 'local' ? d.getMinutes() : d.getUTCMinutes());
  return dateArray;
}

export function createEvent (attributes, cb) {
  if (!attributes) { Error('Attributes argument is required') }

  assignUniqueId(attributes)

  if (!cb) {
    // No callback, so return error or value in an object
    const { error, value } = validateAndBuildEvent(attributes)

    if (error) return { error, value }

    let event = ''

    try {
      event = formatEvent(value)
    } catch(error) {
      return { error, value: null }
    }

    return { error: null, value: event }
  }

  // Return a node-style callback
  const { error, value } = validateAndBuildEvent(attributes)

  if (error) return cb(error)

  return cb(null, formatEvent(value))
}

export function createEvents (events, cb) {
  if (!events) {
    return { error: Error('one argument is required'), value: null }
  }

  if (events.length === 0) {
    const {error, value: dummy} = createEvent({
      start: [2000, 10, 5, 5, 0],
      duration: { hours: 1 }
    })
    if (error) return {error, value: null}

    return {
      error: null,
      value: (
        dummy.slice(0, dummy.indexOf('BEGIN:VEVENT')) +
        dummy.slice(dummy.indexOf('END:VEVENT') + 10 + 2)
      )
    }
  }

  if (events.length === 1) {
    return createEvent(events[0], cb)
  }

  const { error, value } = events.map(assignUniqueId)
    .map(validateAndBuildEvent)
    .map(applyInitialFormatting)
    .map(reformatEventsByPosition)
    .reduce(catenateEvents, { error: null, value: null })

  if (!cb) {
    return { error, value }
  }

  return cb(error, value)
}
