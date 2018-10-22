// 
// FORM #2: DATE WITH UTC TIME
// 
// The date with UTC time, or absolute time, is identified by a LATIN
// CAPITAL LETTER Z suffix character, the UTC designator, appended to
// the time value.  For example, the following represents January 19,
// 1998, at 0700 UTC:
// 
// 19980119T070000Z
// 
// The "TZID" property parameter MUST NOT be applied to DATE-TIME
// properties whose time values are specified in UTC.
// 
import { formatDateUTC } from './date';

export default function setDateWithUTCtime(args = []) {
  let date;
  if (args.length > 0) {
    const [year, month, _date, hours = 0, minutes = 0, seconds = 0] = args
    date = new Date(Date.UTC(year, month - 1, _date, hours, minutes, seconds))
  } else {
    date = new Date()
  }

  const formattedDate = formatDateUTC(date)

  return formattedDate
}
