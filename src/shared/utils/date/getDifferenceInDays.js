export default function getDifferenceInDays(date) {
  const today = new Date()
  const diffTime = Math.abs(today - date)

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24) - 1)
}
