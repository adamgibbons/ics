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
import { formatDate } from './date';

export default function setDateWithLocalTime(args = []) {
  let date;
  if (args.length > 0) {
    const [year, month, _date, hours = 0, minutes = 0, seconds = 0] = args
    date = new Date(year, month - 1, _date, hours, minutes, seconds)
  } else {
    date = new Date()
  }

  const formattedDate = formatDate(date)

  return formattedDate
}
