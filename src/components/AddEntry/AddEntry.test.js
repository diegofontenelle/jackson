import React from 'react'
import { act, render, fireEvent, wait } from '@testing-library/react'
import AddEntry from './AddEntry'
import TestContextWrapper from '../../shared/utils/testHelpers/testWrapper'

const onClose = jest.fn()
const callback = jest.fn()

describe('<AddEntry />', () => {
  it('should call onClose', async () => {
    const { getByText } = render(
      <TestContextWrapper>
        <AddEntry callback={callback} onClose={onClose} open />
      </TestContextWrapper>
    )

    act(() => {
      fireEvent.click(getByText('VOLTAR'))

      return undefined
    })

    expect(onClose.mock.calls.length).toBe(1)

    await wait()
  })
  it('should change values', async () => {
    const { getByTestId, getByText } = render(
      <TestContextWrapper>
        <AddEntry callback={callback} onClose={onClose} open />
      </TestContextWrapper>
    )
    const date = new Date()
    const month =
      date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    const formattedDate = `${date.getDate()}/${month}/${date.getFullYear()}`
    const selector = document.getElementById('123')

    fireEvent.change(getByTestId('amount-input'), {
      target: { value: '25' },
    })

    fireEvent.mouseDown(selector)

    fireEvent.click(getByText('Comida'))

    fireEvent.change(getByTestId('title-input'), {
      target: { value: 'Test buy' },
    })

    fireEvent.click(getByTestId('submit-add-entry'))

    await wait(() => {
      expect(getByTestId('amount-input').value).toBe('25')
      expect(getByTestId('title-input').value).toBe('Test buy')
      expect(getByTestId('category-input').value).toBe('food')
      expect(getByTestId('type-select').value).toBe('debit')
      expect(getByTestId('date-input').value).toBe(formattedDate)
    })
  })
  it('should show toast for failed submit', async () => {
    const { getByTestId, getByText } = render(
      <TestContextWrapper>
        <AddEntry callback={callback} onClose={onClose} open />
      </TestContextWrapper>
    )
    const date = new Date()
    const month =
      date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    const formattedDate = `${date.getDate()}/${month}/${date.getFullYear()}`
    const selector = document.getElementById('123')

    fireEvent.change(getByTestId('amount-input'), {
      target: { value: '25' },
    })

    fireEvent.mouseDown(selector)

    fireEvent.click(getByText('Comida'))

    fireEvent.change(getByTestId('title-input'), {
      target: { value: 'fail' },
    })

    fireEvent.click(getByTestId('submit-add-entry'))

    await wait(() => {
      expect(getByTestId('amount-input').value).toBe('25')
      expect(getByTestId('title-input').value).toBe('fail')
      expect(getByTestId('category-input').value).toBe('food')
      expect(getByTestId('type-select').value).toBe('debit')
      expect(getByTestId('date-input').value).toBe(formattedDate)
    })

    await wait(() => expect(getByTestId('toast-message')).toBeDefined())
  })
})
