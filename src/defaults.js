// change filename to config?

import uuidv1 from 'uuid/v1'
import {
  setDateWithUTCtime,
  setDateWithLocalTime
} from './utils'

const defaults = {
  isICSobject: true,
  title: 'Untitled event',
  productId: 'adamgibbons/ics',
  uid: uuidv1(),
  timestamp: setDateWithUTCtime(),
  start: setDateWithUTCtime(),
  end: null
}

export default defaults