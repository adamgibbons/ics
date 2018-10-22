import {
  setDateWithLocalTime,
  setDateWithUTCtime
} from './index'

import { getDateStringComponents } from './date';

export default function setDate(args = [], type = 'utc') {

  if (args.length === 3) {
    const [year, month, _date] = args
    const date = new Date(year, month - 1, _date);
    const [Y, m, d] = getDateStringComponents(date);
    return Y + m + d;
  }
  
  if (type === 'local') {
    return setDateWithLocalTime(args);
  }

  // type === 'utc'
  return setDateWithUTCtime(args);
}
