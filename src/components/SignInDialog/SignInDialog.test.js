import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import SignInDialog from './SignInDialog'
import TestContextWrapper from '../../shared/utils/testHelpers/testWrapper'

const push = jest.fn()
const email = 'testeman@gg.com'
const pw = '123456'
const failEmail = 'fail@fail.com'
const failPw = 'fail'

describe('<SignInDialog />', () => {
  it('should submit with valid email and password', async () => {
    const { getByTestId } = render(
      <TestContextWrapper currentUser={null}>
        <SignInDialog
          handleClose={jest.fn}
          history={{
            push,
          }}
          open
        />
      </TestContextWrapper>
    )

    fireEvent.change(getByTestId('signin-email'), {
      target: {
        value: email,
      },
    })

    fireEvent.change(getByTestId('signin-password'), {
      target: {
        value: pw,
      },
    })

    fireEvent.click(getByTestId('signin-submit'))

    await wait(() => expect(push).toHaveBeenCalled())
  })

  it('should submit with valid email and password', async () => {
    const { getByTestId } = render(
      <TestContextWrapper currentUser={null}>
        <SignInDialog
          handleClose={jest.fn}
          history={{
            push,
          }}
          open
        />
      </TestContextWrapper>
    )

    fireEvent.change(getByTestId('signin-email'), {
      target: {
        value: failEmail,
      },
    })

    fireEvent.change(getByTestId('signin-password'), {
      target: {
        value: failPw,
      },
    })

    fireEvent.click(getByTestId('signin-submit'))

    await wait(() => expect(push).not.toHaveBeenCalled())
  })
})
