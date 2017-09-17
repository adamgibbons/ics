import _ from 'lodash'
import defaultAttributes from '../defaults'

import {
  setDate,
  maybe,
  isValidStatus,
  setGeolocation,
  setContact,
  setAlarm
} from '../utils'

export default function buildEvent (attributes = {}) {
  const {
    title,
    productId,
    uid,
    start,
    startType,
    end,
    description,
    url,
    geolocation,
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

// categories:   _.isArray(categories) ? categories.map(function(c) {
//                 return c.trim()
//               }).join(',') : null,
// organizer:    organizer ? setContact(organizer) : null,
// attendees:    attendees ? attendees.map(setContact) : null,
// alarms:       alarms ? alarms.map(setAlarm) : null