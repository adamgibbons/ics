import nanoid from 'nanoid'
import {
  buildEvent,
  validateEvent,
  formatEvent
} from './pipeline'

function assignUniqueId(event) {
  event.uid = event.uid || nanoid()
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

export function createEvent (attributes, cb) {
  if (!attributes) { Error('Attributes argument is required') }

  if (!cb) {
    // No callback, so return error or value in an object
    const { error, value } = validateEvent(buildEvent(attributes))

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
  const { error, value } = validateEvent(buildEvent(attributes))
  
  if (error) return cb(error)

  return cb(null, formatEvent(value))
}

export function createEvents (events, cb) {
  if (!events) {
    return { error: Error('one argument is required'), value: null }
  }

  if (events.length === 1) {
    return createEvent(events[0], cb)
  }

  const { error, value } = events.map(assignUniqueId)
    .map(applyInitialFormatting)
    .map(reformatEventsByPosition)
    .reduce(catenateEvents, { error: null, value: null })

  if (!cb) {
    return { error, value }
  }

  return cb(error, value)
}
