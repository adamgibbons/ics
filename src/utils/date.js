export function getDateStringComponents(date) {
  return ['' + date.getFullYear(), ...[date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()].map(v => ('0' + v).slice(-2))];
}

export function formatDate(date) {
  const [Y, m, d, H, M, S] = getDateStringComponents(date);
  return Y + m + d + 'T' + H + M + '00'
}

export function formatDateUTC(date) {
  const Y = date.getUTCFullYear()
  const [m, d, H, M, S] = [
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  ].map(v => ('0' + v).slice(-2))

  return Y + m + d + 'T' + H + M + '00Z'
}
