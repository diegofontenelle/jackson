import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Home from './Home'

describe('<Home />', () => {
  it('Should have filters', () => {
    const { getByTestId } = render(<Home />)

    expect(getByTestId('filters')).toBeDefined()
  })
  it('Should render add entry dialog when clicking on Fab', () => {
    const { getByTestId } = render(<Home />)

    fireEvent.click(getByTestId('add-entry-fab'))

    expect(getByTestId('add-entry-dialog')).toBeDefined()
  })
})
