import {
  setDateWithLocalTime,
  setDateWithUTCtime
} from './index'

export default function setDate(args = [], type = 'utc') {
  const [year, month, date, hours, minutes, seconds] = args
  
  if (type === 'local') {
    return setDateWithLocalTime([year, month, date, hours, minutes, seconds || 0])
  }

  // type === 'utc'
  return setDateWithUTCtime([year, month, date, hours, minutes, seconds || 0])
}
