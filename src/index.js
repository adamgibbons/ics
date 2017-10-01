import _ from 'lodash'
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
