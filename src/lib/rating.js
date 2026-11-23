// Rating out of 5, colored by band
export function ratingBand(value) {
  if (value == null) return 'none'
  if (value >= 4.4) return 'top'
  if (value >= 4.0) return 'good'
  if (value >= 3.6) return 'ok'
  return 'low'
}
