export default function encodeNewLines (text) {
  return text.replace(/\r?\n/gm, "\\n")
}
