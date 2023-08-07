export default function setOrganizer({ name, email, dir, sentBy, scheduleAgent }) {
  let formattedOrganizer = ''
  formattedOrganizer += dir ? `DIR="${dir}";` : ''
  formattedOrganizer += sentBy ? `SENT-BY="MAILTO:${sentBy}";` : ''
  formattedOrganizer += scheduleAgent ? `SCHEDULE-AGENT=${scheduleAgent};` : ''
  formattedOrganizer += 'CN='
  formattedOrganizer += name || 'Organizer'
  formattedOrganizer += email ? `:MAILTO:${email}` : ''

  return formattedOrganizer
}
