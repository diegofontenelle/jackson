import React from 'react'
import { render } from '@testing-library/react'
import EntryList from '.'
import { AuthContext } from '../../contexts/AuthContext'

const EntriesWithContext = (props) => {
  return (
    <AuthContext.Provider
      value={{ currentUser: { uid: '1234' } }}
      currentUser={{ uid: '1234' }}
    >
      <EntryList {...props} />
    </AuthContext.Provider>
  )
}

describe('<EntryList />', () => {
  it('should render empty state', () => {
    const { getByTestId } = render(<EntriesWithContext entries={[]} />)

    expect(getByTestId('empty-state')).toBeDefined()
  })
  it('should render a list of entries', () => {
    const { getByText } = render(
      <EntriesWithContext
        entries={[
          {
            id: 1,
            title: 'teste',
            amount: 20,
            category: 'food',
            date: new Date(),
            type: 'debit',
          },
        ]}
      />
    )

    expect(getByText('teste')).toBeDefined()
  })
  it('should render a entry with credit styling', () => {
    const { getByText } = render(
      <EntriesWithContext
        entries={[
          {
            id: 1,
            title: 'teste',
            amount: 20,
            category: 'food',
            date: new Date(),
            type: 'credit',
          },
        ]}
      />
    )

    expect(getByText('teste')).toBeDefined()
  })
})
