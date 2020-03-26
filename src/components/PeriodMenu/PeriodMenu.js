import React from 'react'
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

export default function PeriodMenu({ anchorEl, handleClose, callback }) {
  const date = new Date()
  const week = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
  const biweek = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 15
  )
  const month = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - 30
  )

  function handleClick(value) {
    callback(value)
    handleClose()
  }

  return (
    <Menu
      id="period-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={() => handleClick('all')}>Tudo</MenuItem>
      <MenuItem onClick={() => handleClick(week)}>7 dias</MenuItem>
      <MenuItem onClick={() => handleClick(biweek)}>15 dias</MenuItem>
      <MenuItem onClick={() => handleClick(month)}>30 dias</MenuItem>
    </Menu>
  )
}

PeriodMenu.propTypes = {
  anchorEl: PropTypes.any,
  callback: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
}

PeriodMenu.defaultProps = {
  anchorEl: null,
}
