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
  return createEvents([attributes], cb)
}

export function createEvents (events, headerAttributesOrCb, cb) {
  const resolvedHeaderAttributes = typeof headerAttributesOrCb === 'object' ? headerAttributesOrCb : {};
  const resolvedCb = arguments.length === 3 ? cb : (typeof headerAttributesOrCb === 'function' ? headerAttributesOrCb : null);

  const run = () => {
    if (!events) {
      return { error: new Error('one argument is required'), value: null }
    }

    const { error: headerError, value: headerValue } = events.length === 0
      ? buildHeaderAndValidate(resolvedHeaderAttributes)
      : buildHeaderAndEventAndValidate({...events[0], ...resolvedHeaderAttributes});

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

  if (!resolvedCb) {
    return returnValue
  }

  return resolvedCb(returnValue.error, returnValue.value)
}
