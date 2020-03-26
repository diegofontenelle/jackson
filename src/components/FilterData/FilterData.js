import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import style from './FiterData.style'
import getDifferenceInDays from '../../shared/utils/date/getDifferenceInDays'

const useStyles = makeStyles(style)

export default function FilterData({ entries, fromDate }) {
  const classes = useStyles()
  const [debit, setDebit] = useState(0)
  const [credit, setCredit] = useState(0)

  let period = 'desde o início.'

  if (typeof fromDate.getDate === 'function') {
    const diffDays = getDifferenceInDays(fromDate)
    period = `nos últimos ${diffDays} dias`
  }

  useEffect(() => {
    setDebit(
      entries.reduce(
        (acc, curr) =>
          curr.type === 'debit' ? acc + parseFloat(curr.amount) : acc,
        0
      )
    )
    setCredit(
      entries.reduce(
        (acc, curr) =>
          curr.type === 'credit' ? acc + parseFloat(curr.amount) : acc,
        0
      )
    )
  }, [entries])

  if (debit === 0 && credit === 0) return null

  return (
    <Box className={classes.filterData}>
      <Typography variant="subtitle1" align="center">
        Você recebeu{' '}
        <Box component="span" color="success.main">
          R$ {credit.toFixed(2)}
        </Box>
        , e gastou{' '}
        <Box component="span" color="error.main">
          R$ {debit.toFixed(2)}
        </Box>{' '}
        <Box component="p" color="text.secondary" className={classes.text}>
          {period}
        </Box>
      </Typography>
    </Box>
  )
}

FilterData.propTypes = {
  entries: PropTypes.array.isRequired,
  fromDate: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
    .isRequired,
}
