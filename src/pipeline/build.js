import defaultAttributes from '../defaults'

export default function buildEvent (attributes = {}) {
  const {
    title,
    productId,
    method,
    uid,
    sequence,
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
  const cleanOutput = {};
  for (let key in output) {
    if (output[key]) {
      cleanOutput[key] = output[key];
    }
  }

  return cleanOutput
}
