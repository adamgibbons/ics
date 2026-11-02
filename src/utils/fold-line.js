import { runes } from 'runes2'

const encoder = new TextEncoder()

// RFC 5545 section 3.1: lines SHOULD NOT be longer than 75 octets,
// excluding the line break. Continuation lines start with a tab, so they
// can hold 74 octets of content. Characters are never split.
export default function foldLine(line) {
  const parts = []
  let current = ''
  let currentLength = 0
  let limit = 75
  for (const char of runes(line)) {
    const charLength = encoder.encode(char).length
    if (currentLength + charLength > limit) {
      parts.push(current)
      current = ''
      currentLength = 0
      limit = 74
    }
    current += char
    currentLength += charLength
  }
  parts.push(current)
  return parts.join('\r\n\t')
}
