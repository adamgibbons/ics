import moment from 'moment'
import {
  formatLocalDateAsLocal,
  formatLocalDateAsUTC,
  formatUTCDateAsLocal,
  formatUTCDateAsUTC
} from './index'

export default function formatDate(args = [], outputType = 'utc', inputType = 'local') {
  const [year, month, date, hours, minutes, seconds] = args

  if (args.length === 3) {
    return moment([year, month - 1, date]).format('YYYYMMDD')
  }
  
  if (inputType === 'local') {
    if (outputType == 'utc') {
      return formatLocalDateAsUTC([year, month, date, hours, minutes, seconds || 0])
    }
    return formatLocalDateAsLocal([year, month, date, hours, minutes, seconds || 0])
  }

  // type === 'utc'
  if (outputType == 'utc') {
    return formatUTCDateAsUTC([year, month, date, hours, minutes, seconds || 0])
  }
  return formatUTCDateAsLocal([year, month, date, hours, minutes, seconds || 0])
}
