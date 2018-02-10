import _ from 'lodash'
import uuid from 'uuid/v4'
import {
  buildEvent,
  validateEvent,
  formatEvent
} from './pipeline'

export function createEvent (attributes, cb) {
  if (!attributes) {
    Error('attributes argument is required')
  }

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

function format({ error, value }) {
  if (error) {
    return { error, value: null }
  }

  return { error: null, value: formatEvent(value) }
}

function bookend({ error, value }, idx, list) {

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
    return accumulator
  }

  if (accumulator.value) {
    accumulator.value = accumulator.value.concat(value)
    return accumulator
  }

  accumulator.value = value
  return accumulator
}

export function createEvents (events, cb) {
  if (!events) {
    return { error: Error('one argument is required'), value: null }
  }

  const result = events.map((event) => {
    event.uid = event.uid || uuid()

    return validateEvent(buildEvent(event))
  }).map(format).map(bookend).reduce(catenateEvents, { error: null, value: null })

  if (!cb) {
    return result
  }

  return cb(null, result)
}