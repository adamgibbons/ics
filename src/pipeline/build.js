import _ from 'lodash'
import DEFAULTS from '../defaults'

import {
  setDate,
  maybe,
  isValidStatus,
  setGeolocation,
  setContact
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
    attendees
  } = attributes

  const eventObject = {
    title: maybe(title, DEFAULTS.title),
    productId: maybe(productId, DEFAULTS.productId),
    uid: maybe(uid, DEFAULTS.uid),
    start: setDate(start, startType),
    end: end ? setDate(end, startType) : null,
    description: maybe(description, null),
    url: maybe(url, null),
    geolocation: geolocation ? setGeolocation(geolocation) : null,
    location: maybe(location, null),
    status: isValidStatus(status) ? status : null,
    categories: _.isArray(categories) ? categories.map(function(c) {
      return c.trim()
    }).join(',') : null,
    organizer: organizer ? setContact(organizer) : null,
    attendees: attendees ? attendees.map(setContact) : null
  }

  const output = Object.assign({}, DEFAULTS, eventObject)

  return output
}