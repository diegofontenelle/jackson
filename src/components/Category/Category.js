import React from 'react'
import PropTypes from 'prop-types'
import FoodIcon from '@material-ui/icons/EmojiFoodBeverage'
import BeachIcon from '@material-ui/icons/BeachAccess'
import WorkIcon from '@material-ui/icons/Work'
import TransportIcon from '@material-ui/icons/Commute'
import UncategorizedIcon from '@material-ui/icons/CreditCard'

export default function Category({ category }) {
  switch (category) {
    case 'food':
      return <FoodIcon />
    case 'fun':
      return <BeachIcon />
    case 'work':
      return <WorkIcon />
    case 'transport':
      return <TransportIcon />
    default:
      return <UncategorizedIcon />
  }
}

Category.propTypes = {
  category: PropTypes.oneOf(['food', 'fun', 'work', 'transport']).isRequired,
}
