import React from 'react'
import PropTypes from 'prop-types'
import MuiAlert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default function Toast({
  autoHideDuration,
  handleClose,
  message,
  open,
  severity,
}) {
  return (
    <Snackbar
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      open={open}
    >
      <Alert
        data-testid="toast-message"
        onClose={handleClose}
        severity={severity}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

Toast.propTypes = {
  autoHideDuration: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
}
