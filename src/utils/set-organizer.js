export default function setContact({ name, email }) {
  let formattedAttendee = ''
  formattedAttendee += 'CN='
  formattedAttendee += name || 'Organizer'
  formattedAttendee += email ? `:mailto:${email}` : ''

  return formattedAttendee
}
