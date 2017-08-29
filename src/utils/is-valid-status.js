import Joi from 'joi'

const schema = {
  status: Joi.string().valid('tentative', 'confirmed', 'cancelled')
}

export default function isValidStatus(status) {
  const { error, value } = Joi.validate({ status }, schema)

  if (error) { return false }

  return true
}
