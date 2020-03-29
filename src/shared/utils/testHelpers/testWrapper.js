import React, { useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from '../../../contexts/AuthContext'
import { ToastContext } from '../../../contexts/ToastContext'
import { LoadingContext } from '../../../contexts/LoadingContext'
import Toast from '../../../components/Toast/Toast'

const reducer = (state, action) => {
  switch (action.type) {
    case 'close':
      return {
        ...state,
        open: false,
      }
    case 'error':
      return {
        ...state,
        ...action.payload,
        open: true,
      }
    case 'success':
      return {
        ...state,
        open: true,
        ...action.payload,
      }
    default:
      return state
  }
}

export default function TestContextWrapper({ children, currentUser }) {
  const [loading, setLoading] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    autoHideDuration: 4000,
    handleClose: () => dispatch({ type: 'close' }),
    message: '',
    open: false,
    severity: 'info',
  })

  return (
    <>
      <AuthContext.Provider value={{ currentUser }}>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <ToastContext.Provider value={{ state, dispatch }}>
            {children}
          </ToastContext.Provider>
        </LoadingContext.Provider>
      </AuthContext.Provider>
      <Toast {...state} />
    </>
  )
}

TestContextWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  currentUser: PropTypes.any,
}

TestContextWrapper.defaultProps = {
  currentUser: { uid: '1234' },
}
