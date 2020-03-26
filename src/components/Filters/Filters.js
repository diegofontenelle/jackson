import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import style from './Filters.style'
import CategoryMenu from '../CategoryMenu'
import PeriodMenu from '../PeriodMenu/PeriodMenu'

const useStyles = makeStyles((theme) => style(theme))

export default function Filters({
  callbackCategory,
  callbackPeriod,
  callbackReset,
  ...rest
}) {
  const classes = useStyles()
  const [categoryAnchor, setCategoryAnchor] = useState(null)
  const [periodAnchor, setPeriodAnchor] = useState(null)

  return (
    <Box
      {...rest}
      display="flex"
      justifyContent="center"
      className={classes.container}
    >
      <ButtonGroup>
        <Button
          onClick={(event) => setCategoryAnchor(event.currentTarget)}
          data-testid="category"
        >
          <Box color="text.secondary">Categoria</Box>
        </Button>

        <Button
          onClick={(event) => setPeriodAnchor(event.currentTarget)}
          data-testid="period"
        >
          <Box color="text.secondary">Período</Box>
        </Button>
        <Button>
          <Box color="text.secondary" onClick={callbackReset}>
            Resetar
          </Box>
        </Button>
      </ButtonGroup>

      <CategoryMenu
        anchorEl={categoryAnchor}
        callback={callbackCategory}
        handleClose={() => setCategoryAnchor(null)}
      />
      <PeriodMenu
        anchorEl={periodAnchor}
        callback={callbackPeriod}
        handleClose={() => setPeriodAnchor(null)}
      />
    </Box>
  )
}

Filters.propTypes = {
  callbackCategory: PropTypes.func.isRequired,
  callbackPeriod: PropTypes.func.isRequired,
  callbackReset: PropTypes.func.isRequired,
}
