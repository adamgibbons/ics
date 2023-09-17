import encodeParamValue from "./encode-param-value"

export default function setOrganizer({ name, email, dir, sentBy }) {
  let formattedOrganizer = ''
  formattedOrganizer += dir ? `DIR=${encodeParamValue(dir)};` : ''
  formattedOrganizer += sentBy ? `SENT-BY=${encodeParamValue(`MAILTO:${sentBy}`)};` : ''
  formattedOrganizer += 'CN='
  formattedOrganizer += encodeParamValue(name || 'Organizer')
  formattedOrganizer += email ? `:MAILTO:${email}` : ''

  return formattedOrganizer
}
