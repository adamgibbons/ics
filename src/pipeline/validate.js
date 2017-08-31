import Joi from 'joi'
import { schema } from '../schema'

export default function validateEvent(candidate, cb) {
  return Joi.validate(candidate, schema, cb)
}
