const pad = n => n < 10 ? `0${n}` : `${n}`

export default function formatDate(args = [], outputType = 'utc', inputType = 'local') {
  if (Array.isArray(args) && args.length === 3) {
    const [year, month, date] = args
    return `${year}${pad(month)}${pad(date)}`
  }

  let outDate = new Date()
  if (Array.isArray(args) && args.length > 0 && args[0]) {
    const [year, month, date, hours = 0, minutes = 0, seconds = 0] = args
    if (inputType === 'local') {
      outDate = new Date(year, month - 1, date, hours, minutes, seconds)
    } else {
      outDate = new Date(Date.UTC(year, month - 1, date, hours, minutes, seconds))
    }
  }

  if (outputType === 'local') {
    return [
      outDate.getFullYear(),
      pad(outDate.getMonth() + 1),
      pad(outDate.getDate()),
      'T',
      pad(outDate.getHours()),
      pad(outDate.getMinutes()),
      pad(outDate.getSeconds())
    ].join('')
  }

  return [
    outDate.getUTCFullYear(),
    pad(outDate.getUTCMonth() + 1),
    pad(outDate.getUTCDate()),
    'T',
    pad(outDate.getUTCHours()),
    pad(outDate.getUTCMinutes()),
    pad(outDate.getUTCSeconds()),
    'Z'
  ].join('')
}
