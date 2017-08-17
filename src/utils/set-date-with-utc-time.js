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

import moment from 'moment'

export default function setDateWithUTCtime(args) {
  if (args) {
    const [ year, month, day, hour, minute ] = args
    const formattedDate = moment([year, month, day, hour, minute]).utc().format('YYYYMMDDTHHmm00') + 'Z'
    return formattedDate    
  }

  return moment().utc().format('YYYYMMDDTHHmm00') + 'Z'
}
