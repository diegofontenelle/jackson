import React from 'react'
import { render } from '@testing-library/react'
import Category from './Category'

describe('<Category />', () => {
  it('should return UncategorizedIcon as default', () => {
    const { getByTestId } = render(<Category />)

    expect(getByTestId('uncategorized-icon')).toBeDefined()
  })
  it('should return FoodIcon for category="food"', () => {
    const { getByTestId } = render(<Category category="food" />)

    expect(getByTestId('food-icon')).toBeDefined()
  })
  it('should return BeachIcon for category="fun"', () => {
    const { getByTestId } = render(<Category category="fun" />)

    expect(getByTestId('fun-icon')).toBeDefined()
  })
  it('should return WorkIcon for category="work"', () => {
    const { getByTestId } = render(<Category category="work" />)

    expect(getByTestId('work-icon')).toBeDefined()
  })
  it('should return Transport for category="work"', () => {
    const { getByTestId } = render(<Category category="transport" />)

    expect(getByTestId('transport-icon')).toBeDefined()
  })
})
