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
// @args [year, month, day, hour, minute]
// note: month is zero-indexed
// note: hour is military time
// 

import moment from 'moment'

export default function setDateWithLocalTime(args) {
  if (args) {
    const [year, month, day, hour, minute ] = args
    const formattedDate = moment(args).format('YYYYMMDDTHHmm00')
    return formattedDate
  }

  return moment().format('YYYYMMDDTHHmm00')
}
