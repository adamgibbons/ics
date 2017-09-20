import uuidv1 from 'uuid/v1'
import {
  setDateWithUTCtime,
  setDateWithLocalTime
} from './utils'

const defaults = {
  title: 'Untitled event',
  productId: 'adamgibbons/ics',
  uid: uuidv1(),
  timestamp: setDateWithUTCtime(),
  start: setDateWithUTCtime(),
  end: null
}

export default defaults