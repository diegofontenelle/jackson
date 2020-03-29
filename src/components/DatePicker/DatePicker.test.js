import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import DatePicker from './DatePicker'

describe('<DatePicker />', () => {
  it('should set value correctly', () => {
    const date = new Date()
    const setFieldValue = jest.fn((name, value) => ({ name, value }))
    const { getByTestId } = render(
      <DatePicker
        data-testid="test-datepicker"
        label="Test"
        value={date}
        setFieldValue={setFieldValue}
        name="TestDate"
      />
    )

    fireEvent.change(getByTestId('test-datepicker'), {
      target: { value: '27/04/2020' },
    })

    expect(setFieldValue).toHaveBeenCalled()
  })
})
