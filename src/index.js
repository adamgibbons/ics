import {
  buildEvent,
  validateEvent,
  formatEvent
} from './pipeline'

const createEventSync = (attributes) => {
  const { error, value } = validateEvent(attributes)

  if (error) return error

  return formatEvent(buildEvent(value))
}

export { createEventSync }
