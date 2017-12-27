import _ from 'lodash'
import Promise from 'bluebird'
import {
  buildEvent,
  validateEvent,
  formatEvent,
  formatCalendar
} from './pipeline'

export function generateEvent (attributes, cb) {
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

    return { error: null, value: formatCalendar(event) }
  }

  // Return a node-style callback
  const { error, value } = validateEvent(buildEvent(attributes))

  if (error) return cb(error)

  return cb(null, formatEvent(value))
}
export function createEvent (data,productId, cb) {
  let formatedEvents = ""
  let events = []
  if (!data || !productId) {
    Error('attributes & productId is required')
  }
  if(_.isObject(data) && !_.isArray(data)){
    events.push(data)
  }else{
    events = data
  }
  Promise.each(events, (attributes)=> {
    if (!attributes)
    {
      Error('attributes argument is required')
    }
    return generateEvent(attributes,(error,val)=>{
      formatedEvents+=val
    })
  }).then((events)=>{
    return cb(null, formatCalendar(formatedEvents,productId))
  })
}
