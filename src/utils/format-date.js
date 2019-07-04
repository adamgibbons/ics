import moment from 'moment'
import {
  formatLocalDateAsLocal,
  formatLocalDateAsUTC,
  formatUTCDateAsLocal,
  formatUTCDateAsUTC
} from './index'

function formatLocalDate(args = [], outputType) {
    if (outputType == 'utc') {
      return formatLocalDateAsUTC(args, outputType)
    }
    return formatLocalDateAsLocal(args, outputType)
}

function formatUTCDate(args = [], outputType) {
    if (outputType == 'utc') {
      return formatUTCDateAsUTC(args, outputType)
    }
    return formatUTCDateAsLocal(args, outputType)
}

export default function formatDate(args = [], outputType = 'utc', inputType = 'local') {
  const [year, month, date, hours, minutes, seconds] = args

  if (args.length === 3) {
    return moment([year, month - 1, date]).format('YYYYMMDD')
  }
  
  if (inputType === 'local') {
    return formatLocalDate([year, month, date, hours, minutes, seconds || 0], outputType);
  }

  // type === 'utc'
  return formatUTCDate([year, month, date, hours, minutes, seconds || 0], outputType);
}
