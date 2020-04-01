import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import style from './ErrorBoundary.style'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    })
  }

  render() {
    const { error, errorInfo } = this.state
    const { children } = this.props
    if (errorInfo) {
      return (
        <div style={style.container}>
          <Typography variant="h3">Opa, algo deu errado.</Typography>
          <Typography variant="body1">
            Esse proavelmente é um problema de nossa parte :(
          </Typography>
          <Typography variant="body1">{error && error.toString()}</Typography>
        </div>
      )
    }

    return children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
}
