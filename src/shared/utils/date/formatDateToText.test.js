import formatDateToText from './formatDateToText'

describe('formatDateToText', () => {
  it('should return the date in the format: 26 Fev, 2020', () => {
    const date = new Date(2020, 1, 26)
    const formattedDate = '26 Fev, 2020'

    expect(formatDateToText(date)).toBe(formattedDate)
  })
})
