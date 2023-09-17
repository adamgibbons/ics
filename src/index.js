import {
  buildHeader,
  buildEvent,
  validateHeader,
  validateHeaderAndEvent,
  formatHeader,
  formatEvent,
  formatFooter,
} from './pipeline'

function buildHeaderAndValidate(header) {
  return validateHeader(buildHeader(header))
}

function buildHeaderAndEventAndValidate(event) {
  return validateHeaderAndEvent({...buildHeader(event), ...buildEvent(event) })
}

export function convertTimestampToArray(timestamp, inputType = 'local') {
  const dateArray = [];
  const d = new Date(timestamp);
  dateArray.push(inputType === 'local' ? d.getFullYear() : d.getUTCFullYear());
  dateArray.push((inputType === 'local' ? d.getMonth() : d.getUTCMonth()) + 1);
  dateArray.push(inputType === 'local' ? d.getDate() : d.getUTCDate());
  dateArray.push(inputType === 'local' ? d.getHours() : d.getUTCHours());
  dateArray.push(inputType === 'local' ? d.getMinutes() : d.getUTCMinutes());
  return dateArray;
}

export function createEvent (attributes, cb) {
  const run = () => {
    if (!attributes) {
      return { error: new Error('Attributes argument is required'), value: null }
    }

    const { error, value } = buildHeaderAndEventAndValidate(attributes)
    if (error) return { error, value }

    const event = formatHeader(value) + formatEvent(value) + formatFooter()
    return { error: null, value: event }
  }

  let returnValue;
  try {
    returnValue = run();
  } catch (e) {
    returnValue = { error: e, value: null }
  }

  if (!cb) {
    return returnValue
  }

  return cb(returnValue.error, returnValue.value)
}

export function createEvents (events, cb) {
  const run = () => {
    if (!events) {
      return { error: new Error('one argument is required'), value: null }
    }

    if (events.length === 1) {
      return createEvent(events[0])
    }

    if (events.length === 0) {
      const { error, value } = buildHeaderAndValidate({});
      if (error) return {error, value: null}

      return {
        error: null,
        value: formatHeader(value) + formatFooter()
      }
    }


    const { error: headerError, value: headerValue } = buildHeaderAndEventAndValidate(events[0]);
    if (headerError) {
      return {error: headerError, value: null}
    }

    let value = ''
    value += formatHeader(headerValue)

    for (let i = 0; i < events.length; i++) {
      const { error: eventError, value: eventValue } = buildHeaderAndEventAndValidate(events[i])
      if (eventError) return {error: eventError, value: null}

      value += formatEvent(eventValue);
    }

    value += formatFooter();

    return { error: null, value }
  }

  let returnValue;
  try {
    returnValue = run();
  } catch (e) {
    returnValue = { error: e, value: null }
  }

  if (!cb) {
    return returnValue
  }

  return cb(returnValue.error, returnValue.value)
}
