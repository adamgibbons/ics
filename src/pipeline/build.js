import _ from 'lodash'
import defaultAttributes from '../defaults'

export default function buildEvent (attributes = {}) {
  const {
    calendarName,
    ttl,
    title,
    productId,
    method,
    uid,
    start,
    startType,
    duration,
    end,
    description,
    url,
    geo,
    location,
    status,
    categories,
    organizer,
    attendees,
    alarms
  } = attributes

  // fill in default values where necessary
  const output = Object.assign({}, defaultAttributes, attributes)

  // remove falsey values
  const cleanOutput = _.pickBy(output, _.identity)

  return cleanOutput
}
