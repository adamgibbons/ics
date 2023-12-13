export default function formatText (text) {
  return text
    .replace(/\\/gm, "\\\\")
    .replace(/\r?\n/gm, "\\n")
    .replace(/;/gm, "\\;")
    .replace(/,/gm, "\\,")
}