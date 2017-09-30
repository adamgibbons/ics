export default function formatDuration ( attributes = {}) {
  const { weeks, days, hours, minutes, seconds } = attributes

  let formattedDuration = 'P'
  formattedDuration += weeks ? `${weeks}W` : ''
  formattedDuration += days ? `${days}D` : ''
  formattedDuration += 'T'
  formattedDuration += hours ? `${hours}H` : ''
  formattedDuration += minutes ? `${minutes}M` : ''
  formattedDuration += seconds ? `${seconds}S` : ''

  return formattedDuration
}