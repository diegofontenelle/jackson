import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Login from '../pages/Login'
import Home from '../pages/Home/Home'

// import { Container } from './styles';

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <PrivateRoute path="/home" component={Login} />
    </BrowserRouter>
  )
}
