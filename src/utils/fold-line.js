
export default function foldLine (line) {
  let result = line.slice(0, 75);
  line = line.slice(75);
  while (line.length > 74) {
    result += '\r\n\t' + line.slice(0, 74);
    line = line.slice(74);
  }
  return result + (line ? '\r\n\t' + line : '');
}
