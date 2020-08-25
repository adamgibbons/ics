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

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default function formatUTCDateAsUTC(args = []) {
  if (args.length > 0) {
    const [year, month, date, hours = 0, minutes = 0, seconds = 0] = args

    const formattedDate = dayjs.utc(Date.UTC(year, month - 1, date, hours, minutes, seconds))
      .format('YYYYMMDDTHHmmss') + 'Z'

    return formattedDate
  }

  return dayjs.utc().format('YYYYMMDDTHHmm00') + 'Z'
}
