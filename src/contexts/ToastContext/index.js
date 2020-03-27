import React, { createContext } from 'react'
import PropTypes from 'prop-types'

export const ToastContext = createContext()

export default function ToastProvider({ children, dispatch, state }) {
  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
}
