import React, { useState } from 'react'
import 'typeface-roboto'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core'
import './App.css'
import style from './App.style'
import Router from './routes'
import AuthProvider from './contexts/AuthContext'
import LoadingProvider from './contexts/LoadingContext'

const useStyles = makeStyles(style)

function App() {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)

  return (
    <div className={classes.container}>
      {loading && <LinearProgress />}
      <AuthProvider>
        <LoadingProvider loading={loading} setLoading={setLoading}>
          <Router />
        </LoadingProvider>
      </AuthProvider>
    </div>
  )
}

export default App
