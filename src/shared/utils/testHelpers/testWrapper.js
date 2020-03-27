import React, { useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import AuthProvider from '../../../contexts/AuthContext'
import { ToastContext } from '../../../contexts/ToastContext'
import { LoadingContext } from '../../../contexts/LoadingContext'

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default function TestContextWrapper({ children }) {
  const [loading, setLoading] = useState(false)
  const [state, dispatch] = useReducer(reducer, {})

  return (
    <AuthProvider>
      <LoadingContext.Provider value={{ loading, setLoading }}>
        <ToastContext.Provider value={{ state, dispatch }}>
          {children}
        </ToastContext.Provider>
      </LoadingContext.Provider>
    </AuthProvider>
  )
}

TestContextWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
}
