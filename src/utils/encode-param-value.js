export default function encodeParamValue (value) {
  return `"${value.replaceAll('"', '\\"')}"`
}
