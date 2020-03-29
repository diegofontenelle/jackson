import React from 'react'
import PropTypes from 'prop-types'
import BeachIcon from '@material-ui/icons/BeachAccess'
import FoodIcon from '@material-ui/icons/EmojiFoodBeverage'
import StudyIcon from '@material-ui/icons/Book'
import TransportIcon from '@material-ui/icons/Commute'
import UncategorizedIcon from '@material-ui/icons/CreditCard'
import WorkIcon from '@material-ui/icons/Work'

export default function Category({ category }) {
  switch (category) {
    case 'food':
      return <FoodIcon data-testid="food-icon" />
    case 'fun':
      return <BeachIcon data-testid="fun-icon" />
    case 'work':
      return <WorkIcon data-testid="work-icon" />
    case 'study':
      return <StudyIcon data-testid="study-icon" />
    case 'transport':
      return <TransportIcon data-testid="transport-icon" />
    default:
      return <UncategorizedIcon data-testid="uncategorized-icon" />
  }
}

Category.propTypes = {
  category: PropTypes.oneOf([
    'food',
    'fun',
    'study',
    'transport',
    'work',
    'uncategorized',
    '',
  ]),
}

Category.defaultProps = {
  category: '',
}
