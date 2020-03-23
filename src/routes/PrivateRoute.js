import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRoute({ path, ...rest }) {
  const isAuthenticated = !!localStorage.getItem('token')

  if (isAuthenticated) return <Route path={path} {...rest} />

  return <Redirect to="/" />
}

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
}
