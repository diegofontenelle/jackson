import getDifferenceInDays from './getDifferenceInDays'

describe('getDifferenceinDays', () => {
  it('Should calculate the difference correctly', () => {
    const today = new Date()
    const thirtyDaysBehind = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 30
    )

    expect(getDifferenceInDays(thirtyDaysBehind)).toBe(30)
  })
})
