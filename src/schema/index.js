import * as yup from 'yup'

// yup url validation blocks localhost, so use a more flexible regex instead
// taken from https://github.com/jquense/yup/issues/224#issuecomment-417172609
// This does mean that the url validation error is
// "url must match the following: ...." as opposed to "url must be a valid URL"
export const urlRegex = /^(?:([a-z0-9+.-]+):\/\/)(?:\S+(?::\S*)?@)?(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/

const dateTimeSchema = ({ required }) => yup.lazy((value) => {
  if (typeof value === 'number') {
    return yup.number().integer().min(0)
  }
  if (typeof value === 'string') {
    return yup.string().required()
  }
  if (!required && typeof value === 'undefined') {
    return yup.mixed().oneOf([undefined])
  }

  return yup.array().required().min(3).max(7).of(yup.lazy((item, options) => {
    const itemIndex = options.parent.indexOf(options.value)
    return [
      yup.number().integer(),
      yup.number().integer().min(1).max(12),
      yup.number().integer().min(1).max(31),
      yup.number().integer().min(0).max(23),
      yup.number().integer().min(0).max(60),
      yup.number().integer().min(0).max(60)
    ][itemIndex]
  }))
  }
)

const durationSchema = yup.object().shape({
  before: yup.boolean(),//option to set before alaram
  weeks: yup.number(),
  days: yup.number(),
  hours: yup.number(),
  minutes: yup.number(),
  seconds: yup.number()
}).noUnknown()

const contactSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  rsvp: yup.boolean(),
  dir: yup.string().matches(urlRegex),
  partstat: yup.string(),
  role: yup.string(),
  cutype: yup.string(),
  xNumGuests: yup.number()
}).noUnknown()

const organizerSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  dir: yup.string(),
  sentBy: yup.string()
}).noUnknown()

const alarmSchema = yup.object().shape({
  action: yup.string().matches(/^(audio|display|email)$/).required(),
  trigger: yup.mixed().required(),
  description: yup.string(),
  duration: durationSchema,
  repeat: yup.number(),
  attach: yup.string(),
  attachType: yup.string(),
  summary: yup.string(),
  attendee: contactSchema,
  'x-prop': yup.mixed(),
  'iana-prop': yup.mixed()
}).noUnknown()

const headerShape = {
  productId: yup.string(),
  method: yup.string(),
  calName: yup.string(),
  timezones: yup.string().matches(/^BEGIN:VTIMEZONE.*END:VTIMEZONE$/s)
}

const headerSchema = yup.object().shape(headerShape).noUnknown()

const eventShape = {
  summary: yup.string(),
  timestamp: dateTimeSchema({ required: false }),
  title: yup.string(),
  uid: yup.string(),
  sequence: yup.number().integer().max(2_147_483_647),
  start: dateTimeSchema({ required: true }),
  duration: durationSchema,
  startType: yup.string().matches(/^(utc|local)$/),
  startInputType: yup.string().matches(/^(utc|local)$/),
  startOutputType: yup.string().matches(/^(utc|local)$/),
  startTimezone: yup.string(),
  end: dateTimeSchema({ required: false }),
  endInputType: yup.string().matches(/^(utc|local)$/),
  endOutputType: yup.string().matches(/^(utc|local)$/),
  endTimezone: yup.string(),
  description: yup.string(),
  url: yup.string().matches(urlRegex),
  geo: yup.object().shape({lat: yup.number(), lon: yup.number()}),
  location: yup.string(),
  status: yup.string().matches(/^(TENTATIVE|CANCELLED|CONFIRMED)$/i),
  categories: yup.array().of(yup.string()),
  organizer: organizerSchema,
  attendees: yup.array().of(contactSchema),
  alarms: yup.array().of(alarmSchema),
  recurrenceRule: yup.string(),
  busyStatus: yup.string().matches(/^(TENTATIVE|FREE|BUSY|OOF)$/i),
  transp: yup.string().matches(/^(TRANSPARENT|OPAQUE)$/i),
  classification: yup.string(),
  created: dateTimeSchema({ required: false }),
  lastModified: dateTimeSchema({ required: false }),
  exclusionDates: yup.array().of(dateTimeSchema({ required: true })),
  exclusionDatesTimezone: yup.object().string,
  htmlContent: yup.string()
}

const headerAndEventSchema = yup.object().shape({ ...headerShape, ...eventShape }).test('xor', `object should have end or duration (but not both)`, val => {
  const hasEnd = !!val.end
  const hasDuration = !!val.duration
  return ((hasEnd && !hasDuration) || (!hasEnd && hasDuration) || (!hasEnd && !hasDuration))
}).noUnknown()


export function validateHeader (candidate) {
  try {
    const value = headerSchema.validateSync(candidate, {abortEarly: false, strict: true})
    return {error: null, value}
  } catch (error) {
    return {error: Object.assign({}, error), value: undefined}
  }
}

export function validateHeaderAndEvent (candidate) {
  try {
    const value = headerAndEventSchema.validateSync(candidate, {abortEarly: false, strict: true})
    return {error: null, value}
  } catch (error) {
    return {error: Object.assign({}, error), value: undefined}
  }
}
