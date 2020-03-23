import React, { useEffect, useState, useReducer } from 'react'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import EntryList from '../../components/EntryList'
import Filters from '../../components/Filters'
import AddEntry from '../../components/AddEntry'
import style from './Home.style'
import data from './__TRASH__'

const useStyles = makeStyles((theme) => style(theme))

const reducer = (state, action) => {
  switch (action.type) {
    case 'change_category':
      return { ...state, category: action.payload.category }
    case 'change_period':
      return { ...state, period: action.payload.period }
    case 'data':
      return { ...state, data: action.payload.data }
    default:
      return data
  }
}

export default function Home() {
  const classes = useStyles()
  const [showDialog, setShowDialog] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    period: 'all',
    category: 'all',
    data,
  })

  useEffect(() => {
    const { category, period } = state
    let filteredData =
      category === 'all'
        ? data
        : data.filter((item) => item.category === category)
    if (period !== 'all')
      filteredData = filteredData.filter((item) => item.period <= period)

    dispatch({ type: 'data', payload: { data: filteredData } })
  }, [state.category, state.period])

  return (
    <div className={classes.container} data-testid="home">
      <Filters
        className={classes.filters}
        callbackCategory={(category) =>
          dispatch({ type: 'change_category', payload: { category } })
        }
        callbackPeriod={(period) =>
          dispatch({ type: 'change_period', payload: { period } })
        }
        data-testid="filters"
      />
      <Box className={classes.filterData}>
        <Typography variant="subtitle1" align="center">
          <Box component="span" color="success.main">
            + R$ 130,45
          </Box>{' '}
          <Box color="text.secondary">nos últimos 30 dias</Box>
        </Typography>
      </Box>
      <EntryList className={classes.entries} entries={state.data} />
      <Fab
        color="primary"
        className={classes.fab}
        onClick={() => setShowDialog(true)}
        data-testid="add-entry-fab"
      >
        <AddIcon />
      </Fab>
      <AddEntry open={showDialog} onClose={() => setShowDialog(false)} />
    </div>
  )
}
