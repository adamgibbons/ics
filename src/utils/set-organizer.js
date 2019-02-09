export default function setOrganizer({ name, email, dir }) {
  let formattedOrganizer = ''
  formattedOrganizer += dir ? `DIR=${dir};` : ''
  formattedOrganizer += 'CN='
  formattedOrganizer += name || 'Organizer'
  formattedOrganizer += email ? `:mailto:${email}` : ''

  return formattedOrganizer
}
