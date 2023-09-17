import { nanoid } from 'nanoid'
import { formatDate } from './utils'

const defaults = {
  title: 'Untitled event',
  productId: 'adamgibbons/ics',
  method: 'PUBLISH',
  uid: nanoid(),
  timestamp: Date.now(),
}

export default defaults
