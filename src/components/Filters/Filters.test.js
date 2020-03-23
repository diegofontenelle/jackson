import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Filters from '.'

const categoryCb = jest.fn()
const periodCb = jest.fn()

describe('<Filters />', () => {
  it('should call category and period callback', () => {
    const { getByTestId, getByText } = render(
      <Filters callbackCategory={categoryCb} callbackPeriod={periodCb} />
    )

    fireEvent.click(getByTestId('category'))
    fireEvent.click(getByTestId('period'))
    fireEvent.click(getByText('Comida'))
    fireEvent.click(getByText('7 dias'))

    expect(categoryCb.mock.calls.length).toBe(1)
    expect(periodCb).toHaveBeenCalledTimes(1)
  })
})
