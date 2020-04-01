import React, { useReducer, useState } from 'react'
import 'typeface-roboto'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core'
import './App.css'
import style from './App.style'
import Router from './routes'
import AuthProvider from './contexts/AuthContext'
import LoadingProvider from './contexts/LoadingContext'
import ToastProvider from './contexts/ToastContext'
import Toast from './components/Toast/Toast'
import ErrorBoundary from './components/ErrorBoundary'

const useStyles = makeStyles(style)

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

function App() {
  const classes = useStyles()
  const [state, dispatch] = useReducer(reducer, {
    autoHideDuration: 4000,
    handleClose: () => dispatch({ type: 'close' }),
    message: '',
    open: false,
    severity: 'info',
  })
  const [loading, setLoading] = useState(false)

  return (
    <div className={classes.container} data-testid="main-app">
      {loading && <LinearProgress />}
      <LoadingProvider loading={loading} setLoading={setLoading}>
        <ToastProvider state={state} dispatch={dispatch}>
          <AuthProvider>
            <ErrorBoundary>
              <Router />
            </ErrorBoundary>
          </AuthProvider>
        </ToastProvider>
      </LoadingProvider>
      <Toast {...state} />
    </div>
  )
}

export default App
