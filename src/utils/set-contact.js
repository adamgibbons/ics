export default function setContact({ name, email, rsvp, dir, partstat }) {
  let formattedAttendee = ''
  formattedAttendee += partstat ? `PARTSTAT=${partstat};` : ''
  formattedAttendee += rsvp ? 'RSVP=TRUE;' : 'RSVP=FALSE;'
  formattedAttendee += dir ? `DIR=${dir};` : ''
  formattedAttendee += 'CN='
  formattedAttendee += name || 'Unnamed attendee'
  formattedAttendee += email ? `:mailto:${email}` : ''

  return formattedAttendee
}
