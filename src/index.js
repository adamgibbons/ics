import {
  buildEvent,
  validateEvent,
  formatEvent
} from './pipeline'

const createEvent = (attributes) => {

  const { error, value } = validateEvent(attributes)

  if (error) return error

  return formatEvent(buildEvent(value))
}

export { createEvent }
