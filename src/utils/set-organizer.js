export default function setOrganizer({ name, email, dir, sentBy }) {
  let formattedOrganizer = ''
  formattedOrganizer += dir ? `DIR="${dir}";` : ''
  formattedOrganizer += sentBy ? `SENT-BY="MAILTO:${sentBy}";` : ''
  formattedOrganizer += 'CN='
  formattedOrganizer += name || 'Organizer'
  formattedOrganizer += email ? `:MAILTO:${email}` : ''

  return formattedOrganizer
}
