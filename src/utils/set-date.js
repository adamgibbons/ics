import moment from 'moment'
import {
  setDateWithLocalTime,
  setDateWithUTCtime
} from './index'

export default function setDate(args = [], type = 'utc') {
  const [year, month, date, hours, minutes, seconds] = args

  if (args.length === 3) {
    return moment([year, month - 1, date]).format('YYYYMMDD')
  }
  
  if (type === 'local') {
    return setDateWithLocalTime([year, month, date, hours, minutes, seconds || 0])
  }

  // type === 'utc'
  return setDateWithUTCtime([year, month, date, hours, minutes, seconds || 0])
}
