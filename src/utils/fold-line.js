
import { runes } from 'runes2'

let te = new TextEncoder();

export default function foldLine(line) {
  const parts = []
  let length = 75

  let currentLine = ''
  let currentLength = 0;
  for (const r of runes(line)) {
    let runeSize = te.encode(r).length;

    if (currentLength + runeSize > length) {
      parts.push(currentLine);
      length = 74;
      currentLine = '';
      currentLength = 0;
    }

    currentLine += r;
    currentLength += runeSize;
  }

  parts.push(currentLine)
  return parts.join('\r\n\t')
}
