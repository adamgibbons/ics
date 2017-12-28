import _ from 'lodash'
import {
  buildEvent,
  validateEvent,
  formatEvent,
  formatCalendar
} from './pipeline'

export function generateEvent (attributes, cb) {
  if (!attributes) throw('attributes argument is required')

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
    if(event=="") Error('Not a valid events')

    return { error: null, value: event }
  }

  // Return a node-style callback
  const { error, value } = validateEvent(buildEvent(attributes))

  if (error) return cb(error)

  return cb(null, formatEvent(value))
}
export function createEvent (data,productId, cb) {
  let formatedEvents = ""
  let events = []
  if (!data || !productId) Error('attributes & productId is required')
  if(_.isObject(data) && !_.isArray(data)){
    events.push(data)
  }else{
    events = data
  }
  try {
    _.forEach(events, (attributes)=> {
      if (!attributes) throw Error('attributes argument is required')
      generateEvent(attributes,(error,val)=>{
        if(error) throw error
          formatedEvents+=val
      })
    })
    formatedEvents = formatCalendar(formatedEvents,productId)
  } catch(error) {
    if (!cb) return { error: error, value: null}
    return cb(error, null)
  }
  if (!cb) return { error: null, value: formatedEvents}
  return cb(null, formatedEvents)
}
