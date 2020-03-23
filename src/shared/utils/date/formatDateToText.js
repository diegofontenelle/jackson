const MONTHS = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Maio',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Out',
  'Nov',
  'Dez',
]
export default function formatDateToText(date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`
}
