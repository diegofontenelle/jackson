import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import Login from './Login'
import TestContextWrapper from '../../shared/utils/testHelpers/testWrapper'

const push = jest.fn()
const email = 'testeman@gg.com'
const pw = '123456'
const failEmail = 'fail@fail.com'
const failPw = 'fail'

describe('<Login />', () => {
  it('should render sign in dialog, when user clicks on sign button', async () => {
    const { getByTestId, queryByTestId } = render(
      <TestContextWrapper currentUser={null}>
        <Login
          history={{
            push,
          }}
        />
      </TestContextWrapper>
    )

    const signInBtn = getByTestId('signin-button')

    expect(queryByTestId('signin-dialog')).toBeNull()

    fireEvent.click(signInBtn)

    expect(getByTestId('signin-dialog')).toBeDefined()

    await wait()
  })
  it('should unmount sign in dialog, when user clicks on back button', async () => {
    const { getByTestId, queryByTestId } = render(
      <TestContextWrapper currentUser={null}>
        <Login
          history={{
            push,
          }}
        />
      </TestContextWrapper>
    )

    const signInBtn = getByTestId('signin-button')
    const dialog = queryByTestId('signin-dialog')

    expect(dialog).toBeNull()

    fireEvent.click(signInBtn)

    expect(getByTestId('signin-dialog')).toBeDefined()

    fireEvent.click(getByTestId('signin-dialog-back'))

    expect(dialog).toBeNull()

    await wait()
  })
  it('should redirect to Home page if user has an active session', () => {
    render(
      <TestContextWrapper
        currentUser={{
          currentUser: {
            uid: '12345',
          },
        }}
      >
        <Login
          history={{
            push,
          }}
        />
      </TestContextWrapper>
    )

    expect(push).toHaveBeenCalled()
  })
  describe('When not valid', () => {
    it('should not submit without email and password', async () => {
      const { getByTestId } = render(
        <TestContextWrapper currentUser={null}>
          <Login
            history={{
              push,
            }}
          />
        </TestContextWrapper>
      )

      const submitBtn = getByTestId('login-submit')

      fireEvent.click(submitBtn)

      expect(push).not.toHaveBeenCalled()

      await wait()
    })
  })
  describe('On submit', () => {
    it('should submit with email and password', async () => {
      const { getByTestId, getByPlaceholderText } = render(
        <TestContextWrapper currentUser={null}>
          <Login
            history={{
              push,
            }}
          />
        </TestContextWrapper>
      )

      const submitBtn = getByTestId('login-submit')
      const emailInput = getByPlaceholderText('E-mail')
      const passwordInput = getByPlaceholderText('Senha')

      fireEvent.change(emailInput, {
        target: { value: email },
      })

      fireEvent.change(passwordInput, {
        target: { value: pw },
      })

      fireEvent.click(submitBtn)

      await wait(() => expect(push).toHaveBeenCalled())

      await wait()
    })
    it('should reject and show toast with error message, with bad credentials', async () => {
      const { getByTestId, getByPlaceholderText } = render(
        <TestContextWrapper currentUser={null}>
          <Login
            history={{
              push,
            }}
          />
        </TestContextWrapper>
      )

      const submitBtn = getByTestId('login-submit')
      const emailInput = getByPlaceholderText('E-mail')
      const passwordInput = getByPlaceholderText('Senha')

      fireEvent.change(emailInput, {
        target: { value: failEmail },
      })

      fireEvent.change(passwordInput, {
        target: { value: failPw },
      })

      fireEvent.click(submitBtn)

      await wait(() => expect(push).not.toHaveBeenCalled())

      await wait(() => expect(getByTestId('toast-message')).toBeDefined())

      await wait()
    })
  })
})
