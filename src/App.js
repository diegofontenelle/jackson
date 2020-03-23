import React from 'react'
import 'typeface-roboto'
import { makeStyles } from '@material-ui/core'
import './App.css'
import style from './App.style'
import Navbar from './components/Navbar'
import Router from './routes'

const useStyles = makeStyles(style)

function App() {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Navbar />
      <Router />
    </div>
  )
}

export default App
