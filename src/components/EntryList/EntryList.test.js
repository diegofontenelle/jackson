import React from 'react'
import { render } from '@testing-library/react'
import EntryList from '.'

describe('<EntryList />', () => {
  it('should render empty state', () => {
    const { getByTestId } = render(<EntryList />)

    expect(getByTestId('empty-state')).toBeDefined()
  })
  it('should render a list of entries', () => {
    const { getByText } = render(
      <EntryList
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
      <EntryList
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
