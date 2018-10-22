import nanoid from 'nanoid';
import { setDateWithUTCtime } from './utils'

const now = new Date();

const defaults = {
  title: 'Untitled event',
  productId: 'adamgibbons/ics',
  method: 'PUBLISH',
  uid: nanoid(),
  timestamp: setDateWithUTCtime([
    now.getUTCFullYear(),
    now.getUTCMonth() + 1,
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
  ]),
  start: setDateWithUTCtime()
}

export default defaults
