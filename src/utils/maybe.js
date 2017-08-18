export default function maybe(truthy, fallback) {
  if (truthy) {
    return truthy
  }

  return fallback
}