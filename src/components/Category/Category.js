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
      return <FoodIcon data-testid="food-icon" />
    case 'fun':
      return <BeachIcon data-testid="fun-icon" />
    case 'work':
      return <WorkIcon data-testid="work-icon" />
    case 'transport':
      return <TransportIcon data-testid="transport-icon" />
    default:
      return <UncategorizedIcon data-testid="uncategorized-icon" />
  }
}

Category.propTypes = {
  category: PropTypes.oneOf(['food', 'fun', 'work', 'transport', '']),
}

Category.defaultProps = {
  category: '',
}
