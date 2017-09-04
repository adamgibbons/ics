export default function setAlarm (attributes = {}) {
  const {
    action,
    trigger,
    repeat,
    attach,
    description,
    duration,
    summary
  } = attributes

  return {
    action,
    trigger,
    repeat,
    attach,
    description,
    duration,
    summary
  }
}
