export default function formatText (text) {
  return text
    .replace(/\r?\n/gm, "\\n")
    .replace(/\\/gm, "\\\\")
    .replace(/;/gm, "\\;")
    .replace(/,/gm, "\\,")
}