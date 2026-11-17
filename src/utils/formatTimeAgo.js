const MINUTE = 60
const HOUR = 3600
const DAY = 86400

export function formatTimeAgo(
  createdUtc,
  nowUtc = Math.floor(Date.now() / 1000),
) {
  const seconds = nowUtc - createdUtc

  if (seconds < MINUTE) {
    return 'just now'
  }
  if (seconds < HOUR) {
    return `${Math.floor(seconds / MINUTE)}m ago`
  }
  if (seconds < DAY) {
    return `${Math.floor(seconds / HOUR)}h ago`
  }
  return `${Math.floor(seconds / DAY)}d ago`
}