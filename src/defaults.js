import uuidv1 from 'uuid/v1'
import moment from 'moment'
import { setDateWithUTCtime } from './utils'

const now = moment().utc()

const defaults = {
  title: 'Untitled event',
  productId: 'adamgibbons/ics',
  method: 'PUBLISH',
  uid: uuidv1(),
  timestamp: setDateWithUTCtime([
    now.get('year'),
    now.get('month') + 1,
    now.get('date'),
    now.get('hours'),
    now.get('minutes'),
    now.get('seconds')
  ]),
  start: setDateWithUTCtime()
}

export default defaults