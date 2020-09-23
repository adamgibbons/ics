import uuidv1 from 'uuid/v1'
import { formatDate } from './utils'

const defaults = {
  title: 'Untitled event',
  productId: 'adamgibbons/ics',
  method: 'PUBLISH',
  uid: uuidv1(),
  timestamp: formatDate(null, 'utc'),
  start: formatDate(null, 'utc')
}

export default defaults
