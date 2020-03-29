import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import Home from './Home'
import TestContextWrapper from '../../shared/utils/testHelpers/testWrapper'

describe('<Home />', () => {
  it('should have filters', async () => {
    const { getByTestId } = render(
      <TestContextWrapper>
        <Home />
      </TestContextWrapper>
    )

    expect(getByTestId('filters')).toBeDefined()

    await wait()
  })
  it('should render add entry dialog when clicking on Fab', async () => {
    const { getByTestId, getByText } = render(
      <TestContextWrapper>
        <Home />
      </TestContextWrapper>
    )

    fireEvent.click(getByTestId('add-entry-fab'))

    expect(getByText(/adicione um registro/i)).toBeDefined()

    await wait()
  })
  it('should unmount <AddEntry /> dialog', async () => {
    const { getByTestId, getByText, queryByText } = render(
      <TestContextWrapper>
        <Home />
      </TestContextWrapper>
    )

    fireEvent.click(getByTestId('add-entry-fab'))

    fireEvent.click(getByTestId('category'))

    fireEvent.click(getByText(/comida/i))

    fireEvent.click(getByTestId('category'))

    fireEvent.click(getByText(/7 dias/i))

    expect(getByText(/adicione um registro/i)).toBeDefined()

    fireEvent.click(getByTestId('add-entry-back'))

    expect(queryByText(/adicione um registro/i))

    await wait()
  })
})
