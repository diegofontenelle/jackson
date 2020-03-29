import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function PrivateRoute({ path, ...rest }) {
  const { currentUser } = useContext(AuthContext)

  if (currentUser) return <Route path={path} {...rest} />

  return <Redirect to="/" />
}

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
}
