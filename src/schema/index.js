import Joi from 'joi'

const dateTimeSchema = Joi.array().min(3).max(7).ordered(
  Joi.number().integer(),
  Joi.number().integer().min(1).max(12),
  Joi.number().integer().min(1).max(31),
  Joi.number().integer().min(0).max(23),
  Joi.number().integer().min(0).max(60),
  Joi.number().integer().min(0).max(60)
)

const durationSchema = Joi.object().keys({
  before: Joi.boolean(),//option to set before alaram
  weeks: Joi.number(),
  days: Joi.number(),
  hours: Joi.number(),
  minutes: Joi.number(),
  seconds: Joi.number()
})

const contactSchema = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().email(),
  rsvp: Joi.boolean()
})

const organizerSchema = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().email()
})

const alarmSchema = Joi.object().keys({
  action: Joi.string().regex(/audio|display|email/).required(),
  trigger: Joi.any().required(),
  description: Joi.string(),
  duration: durationSchema,
  repeat: Joi.number(),
  attach: Joi.string(),
  attachType: Joi.string(),
  summary: Joi.string(),
  attendee: contactSchema,
  'x-prop': Joi.any(),
  'iana-prop': Joi.any()
})

const schema = Joi.object().keys({
  calendarName: Joi.string(),
  ttl: durationSchema,
  timestamp: Joi.any(),
  title: Joi.string(),
  productId: Joi.string(),
  method: Joi.string(),
  uid: Joi.string().required(),
  start: dateTimeSchema.required(),
  duration: durationSchema,
  startType: Joi.string(),
  end: dateTimeSchema,
  description: Joi.string(),
  url: Joi.string().uri(),
  geo: Joi.object().keys({ lat: Joi.number(), lon: Joi.number() }),
  location: Joi.string(),
  status: Joi.string().regex(/TENTATIVE|CANCELLED|CONFIRMED/),
  categories: Joi.array().items(Joi.string()),
  organizer: organizerSchema,
  attendees: Joi.array().items(contactSchema),
  alarms: Joi.array().items(alarmSchema)
}).xor('end', 'duration')

export default function validateEvent(candidate) {
  const { error, value } = Joi.validate(candidate, schema)
  return { error, value }
}
