import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Filters from '.'

const categoryCb = jest.fn()
const periodCb = jest.fn()
const resetCb = jest.fn()

describe('<Filters />', () => {
  it('should call category and period callback', () => {
    const { getByTestId, getByText } = render(
      <Filters
        callbackCategory={categoryCb}
        callbackPeriod={periodCb}
        callbackReset={resetCb}
      />
    )

    fireEvent.click(getByTestId('category'))
    fireEvent.click(getByTestId('period'))
    fireEvent.click(getByText(/comida/i))
    fireEvent.click(getByText(/7 dias/i))
    fireEvent.click(getByTestId('reset-filters'))

    expect(categoryCb.mock.calls.length).toBe(1)
    expect(periodCb).toHaveBeenCalledTimes(1)
    expect(resetCb).toHaveBeenCalled()
  })
})
