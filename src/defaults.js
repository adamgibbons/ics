import uuidv1 from 'uuid/v1'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import { formatUTCDateAsUTC } from './utils'

dayjs.extend(utc);

const now = dayjs().utc()

const defaults = {
  title: 'Untitled event',
  productId: 'jmsunseri/ics-dayjs',
  method: 'PUBLISH',
  uid: uuidv1(),
  timestamp: formatUTCDateAsUTC([
    now.get('year'),
    now.get('month') + 1,
    now.get('date'),
    now.get('hours'),
    now.get('minutes'),
    now.get('seconds')
  ]),
  start: formatUTCDateAsUTC()
}

export default defaults
