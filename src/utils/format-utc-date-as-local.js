// 
// DATE-TIME
// FORM #1: DATE WITH LOCAL TIME
// 
// The date with local time form is simply a DATE-TIME value that
// does not contain the UTC designator nor does it reference a time
// zone. DATE-TIME values of this type are said to be "floating" 
// and are not bound to any time zone in particular.
// 
// For example, the following represents
// January 18, 1998, at 11 PM:
// 
// 19980118T230000
// 

import moment from 'moment'

export default function formatLocalDateAsLocal(args = []) {
  if (args.length > 0) {
    const [year, month, date, hours = 0, minutes = 0, seconds = 0] = args
    const formattedDate = moment.utc([year, month - 1, date, hours, minutes, seconds]).format('YYYYMMDDTHHmmss')
    return formattedDate
  }

  return moment().utc().format('YYYYMMDDTHHmmss')
}
