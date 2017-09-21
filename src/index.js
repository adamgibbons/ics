import _ from 'lodash'
import {
  buildEvent,
  validateEvent,
  formatEvent
} from './pipeline'

export function createEvent (attributes, cb) {
  
  if (!cb) {
    Error('callback argument is required')
  }

  const { error, value } = validateEvent(buildEvent(attributes))

  if (error) {
    return cb(error)
  }

  return cb(null, formatEvent(value))
}

export function createEventSync (attributes) {
  const { error, value } = validateEvent(attributes)

  if (error) return error

  return formatEvent(buildEvent(value))
}
