import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import AddEntry from './AddEntry'

describe('<AddEntry />', () => {
  it('should call onClose', () => {
    const onClose = jest.fn()
    const { getByText } = render(<AddEntry onClose={onClose} open />)

    fireEvent.click(getByText('VOLTAR'))

    expect(onClose.mock.calls.length).toBe(1)
  })
})
