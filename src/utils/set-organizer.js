export default function setOrganizer({ name, email }) {
  let formattedOrganizer = ''
  formattedOrganizer += 'CN='
  formattedOrganizer += name || 'Organizer'
  formattedOrganizer += email ? `:mailto:${email}` : ''

  return formattedOrganizer
}
