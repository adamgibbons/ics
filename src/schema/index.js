import Joi from 'joi'

const dateTimeSchema = Joi.array().min(3).max(7).ordered(
  Joi.number().integer().positive(),
  Joi.number().integer().min(1).max(12),
  Joi.number().integer().min(1).max(31),
  Joi.number().integer().min(0).max(23),
  Joi.number().integer().min(0).max(60),
  Joi.number().integer().min(0).max(60)
)

const durationSchema = Joi.object().keys({
  before: Joi.boolean(),
  weeks: Joi.number(),
  days: Joi.number(),
  hours: Joi.number(),
  minutes: Joi.number(),
  seconds: Joi.number()
})

const contactSchema = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().email()
})

const alarmSchema = Joi.object().keys({
  action: Joi.string().regex(/AUDIO|DISPLAY|EMAIL/).required(),
  //Allowd array or durationSchema
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
  timestamp: Joi.any(),
  title: Joi.string(),
  productId: Joi.string(),
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
  organizer: contactSchema,
  attendees: Joi.array().items(contactSchema),
  alarms: Joi.array().items(alarmSchema)
})
.xor('end', 'duration')

export default function validateEvent(candidate) {
  const { error, value } = Joi.validate(candidate, schema)
  return { error, value }
}
