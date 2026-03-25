import {
  buildHeader,
  buildEvent,
  validateHeader,
  validateHeaderAndEvent,
  formatHeader,
  formatEvent,
  formatFooter,
  urlRegex,
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

export async function createEventsAsync (events, headerAttributes = {}) {
  // Yield to the event loop periodically so huge inputs don’t block too badly.
  const tick = typeof globalThis?.setImmediate === 'function'
    ? () => new Promise((resolve) => globalThis.setImmediate(resolve))
    : () => new Promise((resolve) => setTimeout(resolve, 0))

  const runAsync = async () => {
    if (!events) {
      return { error: new Error('one argument is required'), value: null }
    }

    const { error: headerError, value: headerValue } = events.length === 0
      ? buildHeaderAndValidate(headerAttributes)
      : buildHeaderAndEventAndValidate({...events[0], ...headerAttributes});

    if (headerError) {
      return {error: headerError, value: null}
    }

    // Build up the calendar in parts to avoid quadratic string concatenation costs.
    const parts = [formatHeader(headerValue)];

    // Yield every N events; tuneable but intentionally conservative.
    const yieldEvery = 1000;

    for (let i = 0; i < events.length; i++) {
      const { error: eventError, value: eventValue } = buildHeaderAndEventAndValidate(events[i])
      if (eventError) return {error: eventError, value: null}

      parts.push(formatEvent(eventValue));

      if (i > 0 && i % yieldEvery === 0) await tick()
    }

    parts.push(formatFooter());

    return { error: null, value: parts.join('') }
  }

  let returnValue;
  try {
    returnValue = await runAsync();
  } catch (e) {
    returnValue = { error: e, value: null }
  }

  return returnValue
}

export function isValidURL(url) {
  return urlRegex.test(url);
}
