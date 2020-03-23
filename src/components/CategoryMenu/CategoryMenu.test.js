import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CategoryMenu from '.'

const cb = jest.fn()
const handleClose = jest.fn()

describe('<CategoryMenu />', () => {
  it('should fire handleClose and callback', () => {
    const { getByText } = render(
      <CategoryMenu anchorEl={null} handleClose={handleClose} callback={cb} />
    )

    fireEvent.click(getByText('Comida'))
    fireEvent.click(getByText('Estudo'))
    fireEvent.click(getByText('Lazer'))
    fireEvent.click(getByText('Trabalho'))
    fireEvent.click(getByText('Transporte'))
    fireEvent.click(getByText('Tudo'))
    fireEvent.click(getByText('Não categorizado'))

    expect(cb.mock.calls.length).toBe(7)
    expect(handleClose.mock.calls.length).toBe(7)
  })
})
