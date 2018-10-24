export default function setContact({ name, email, rsvp, dir, partstat }) {
  let formattedAttendee = ''
  formattedAttendee += `PARTSTAT=${partstat}`
  formattedAttendee += rsvp ? 'RSVP=TRUE;' : 'RSVP=FALSE;'
  formattedAttendee += dir ? `DIR=${dir};` : ''
  formattedAttendee += 'CN='
  formattedAttendee += name || 'Unnamed attendee'
  formattedAttendee += email ? `:mailto:${email}` : ''

  return formattedAttendee
}
