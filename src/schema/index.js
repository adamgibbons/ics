import Joi from 'joi'

const contactSchema = Joi.object().keys({ name: Joi.string(), email: Joi.string().email() })

const schema = Joi.object().keys({
  title: Joi.string(),
  productId: Joi.string(),
  uid: Joi.string().required(),
  start: Joi.string().required(),
  // startType,
  // end,
  description: Joi.string(),
  url: Joi.string().uri(),
  geolocation: Joi.object().keys({ lat: Joi.number(), lon: Joi.number() }),
  location: Joi.string(),
  status: Joi.string().regex(/tentative|cancelled|confirmed/),
  categories: Joi.array().items(Joi.string()),
  organizer: contactSchema,
  attendees: Joi.array().items(contactSchema)
})

export default function validateEvent(candidate) {
  const { error, value } = Joi.validate(candidate, schema)
  // console.log(error)
  // console.log(value)
  return { error, value }
}
