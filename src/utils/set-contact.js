export default function setContact({ name, email, rsvp, dir, partstat, role }) {
  let formattedAttendee = ''
  formattedAttendee += rsvp ? 'RSVP=TRUE;' : 'RSVP=FALSE;'
  formattedAttendee += role ? `ROLE=${role};` : ''
  formattedAttendee += partstat ? `PARTSTAT=${partstat};` : ''
  formattedAttendee += dir ? `DIR=${dir};` : ''
  formattedAttendee += 'CN='
  formattedAttendee += name || 'Unnamed attendee'
  formattedAttendee += email ? `:mailto:${email}` : ''

  return formattedAttendee
}
