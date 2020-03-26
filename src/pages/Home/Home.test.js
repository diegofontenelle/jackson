import React, { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'
import Home from './Home'
import { AuthContext } from '../../contexts/AuthContext'
import LoadingProvider from '../../contexts/LoadingContext'

const HomeWithContext = () => {
  const [loading, setLoading] = useState(false)

  return (
    <AuthContext.Provider
      value={{ currentUser: { uid: '1234' } }}
      currentUser={{ uid: '1234' }}
    >
      <LoadingProvider loading={loading} setLoading={setLoading}>
        <Home />
      </LoadingProvider>
    </AuthContext.Provider>
  )
}

describe('<Home />', () => {
  it('Should have filters', () => {
    const { getByTestId } = render(<HomeWithContext />)

    expect(getByTestId('filters')).toBeDefined()
  })
  it('Should render add entry dialog when clicking on Fab', () => {
    const { getByTestId } = render(<HomeWithContext />)

    fireEvent.click(getByTestId('add-entry-fab'))

    expect(getByTestId('add-entry-dialog')).toBeDefined()
  })
})
