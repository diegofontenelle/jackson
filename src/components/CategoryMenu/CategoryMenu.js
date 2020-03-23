import React from 'react'
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

export default function CategoryMenu({ anchorEl, handleClose, callback }) {
  function handleClick(value) {
    callback(value)
    handleClose()
  }

  return (
    <Menu
      id="category-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={() => handleClick('food')}>Comida</MenuItem>
      <MenuItem onClick={() => handleClick('study')}>Estudo</MenuItem>
      <MenuItem onClick={() => handleClick('fun')}>Lazer</MenuItem>
      <MenuItem onClick={() => handleClick('work')}>Trabalho</MenuItem>
      <MenuItem onClick={() => handleClick('transport')}>Transporte</MenuItem>
      <MenuItem onClick={() => handleClick('all')}>Tudo</MenuItem>
      <MenuItem onClick={() => handleClick('uncategorized')}>
        Não categorizado
      </MenuItem>
    </Menu>
  )
}

CategoryMenu.propTypes = {
  anchorEl: PropTypes.any,
  callback: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
}

CategoryMenu.defaultProps = {
  anchorEl: null,
}
