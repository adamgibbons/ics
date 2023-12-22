
import { runes, substring } from 'runes2'

export default function foldLine(line) {
  const parts = []
  let length = 75
  while (runes(line).length > length) {
    parts.push(substring(line, 0, length))
    line = substring(line, length)
    length = 74
  }
  parts.push(line)
  return parts.join('\r\n\t')
}
