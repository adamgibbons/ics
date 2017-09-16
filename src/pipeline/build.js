import _ from 'lodash'
import DEFAULTS from '../defaults'

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

  // console.log('foo alarm:')
  // console.log(attributes)
  // console.log('bar alarm:')

  const eventObject = {
    title:        title || DEFAULTS.title,
    productId:    productId || DEFAULTS.productId,
    uid:          uid || DEFAULTS.uid,
    start:        setDate(start, startType),
    end:          end ? setDate(end, startType) : null,
    description:  description || null,
    url:          url || null,
    geolocation:  geolocation ? setGeolocation(geolocation) : null,
    location:     location || null,
    status:       isValidStatus(status) ? status : null, // TODO remove
    categories:   _.isArray(categories) ? categories.map(function(c) {
                    return c.trim()
                  }).join(',') : null,
    organizer:    organizer ? setContact(organizer) : null,
    attendees:    attendees ? attendees.map(setContact) : null,
    alarms:       alarms ? alarms.map(setAlarm) : null
  }

  const output = Object.assign({}, DEFAULTS, eventObject)

  return output
}