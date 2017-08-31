import {
  buildEvent,
  validateEvent,
  formatEvent
} from './pipeline'

const createEvent = (attributes) => {
  if (attributes) {
    return formatEvent(buildEvent(attributes))
  }
  return formatEvent(buildEvent())
}

export { createEvent }
