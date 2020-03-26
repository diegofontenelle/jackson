import React from 'react'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Home from '../pages/Home'
import Login from '../pages/Login'

// import { Container } from './styles';

const browserHistory = createBrowserHistory()

export default function Routes() {
  return (
    <Router history={browserHistory}>
      <Route path="/" exact component={Login} />
      <Route path="/home" exact component={Home} />
    </Router>
  )
}
