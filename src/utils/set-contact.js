export default function setContact({ name, email, rsvp, dir }) {
  let formattedAttendee = ''
  formattedAttendee += rsvp ? 'RSVP=TRUE;' : 'RSVP=FALSE;'
  formattedAttendee += dir ? `DIR=${dir};` : ''
  formattedAttendee += 'CN='
  formattedAttendee += name || 'Unnamed attendee'
  formattedAttendee += email ? `:mailto:${email}` : ''

  return formattedAttendee
}
