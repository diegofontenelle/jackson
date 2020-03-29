import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useReducer,
} from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'
import EntryList from '../../components/EntryList'
import Filters from '../../components/Filters'
import AddEntry from '../../components/AddEntry'
import style from './Home.style'
import { db } from '../../firebase'
import { AuthContext } from '../../contexts/AuthContext'
import FilterData from '../../components/FilterData/FilterData'
import useLoading from '../../shared/hooks/useLoading'
import useToast from '../../shared/hooks/useToast'

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
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default function Home() {
  const classes = useStyles()
  const [showDialog, setShowDialog] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    period: 'all',
    category: 'all',
    data: [],
  })
  const { currentUser } = useContext(AuthContext)
  const { error } = useToast()
  const { showLoading, hideLoading } = useLoading()

  const hydrate = (doc) => ({ ...doc.data(), date: new Date(doc.data().date) })

  const queryEntries = useCallback((key, selector, value) => {
    if (currentUser) {
      showLoading()
      return db
        .collection('entry')
        .doc(currentUser.uid)
        .collection('entries')
        .where(key, selector, value)
    }

    return null
  })

  const callbackSuccess = useCallback(
    (snapshot) => {
      let data = []

      if (!snapshot.empty) data = snapshot.docs.map((doc) => hydrate(doc))

      dispatch({ type: 'data', payload: { data } })
    },
    [dispatch]
  )

  const fetchEntries = useCallback(() => {
    if (currentUser) {
      showLoading()
      db.collection('entry')
        .doc(currentUser.uid)
        .collection('entries')
        .orderBy('date', 'desc')
        .get()
        .then((ref) => {
          dispatch({
            type: 'data',
            payload: {
              data: ref.docs.map((doc) => hydrate(doc)),
            },
          })
        })
        .catch((err) => error(err))
        .finally(hideLoading)
    }
  }, [currentUser, error, hideLoading, showLoading])

  useEffect(() => {
    if (state.category === 'all') fetchEntries()

    if (currentUser && state.category !== 'all') {
      showLoading()
      queryEntries('category', '==', state.category)
        .orderBy('queryDate', 'desc')
        .get()
        .then(callbackSuccess)
        .catch((err) => error(err))
        .finally(hideLoading)
    }
  }, [currentUser, error, hideLoading, showLoading, state.category])

  useEffect(() => {
    if (state.period === 'all') fetchEntries()

    if (currentUser && state.period !== 'all') {
      showLoading()
      queryEntries('queryDate', '>=', state.period)
        .orderBy('queryDate', 'desc')
        .get()
        .then(callbackSuccess)
        .catch((err) => error(err))
        .finally(hideLoading)
    }
  }, [currentUser, error, hideLoading, showLoading, state.period])

  const callbackCategory = useCallback(
    (category) => dispatch({ type: 'change_category', payload: { category } }),
    []
  )

  const callbackPeriod = useCallback(
    (period) => dispatch({ type: 'change_period', payload: { period } }),
    []
  )

  return (
    <div className={classes.container} data-testid="home">
      <Filters
        className={classes.filters}
        callbackCategory={callbackCategory}
        callbackPeriod={callbackPeriod}
        callbackReset={fetchEntries}
        data-testid="filters"
      />
      <FilterData entries={state.data} fromDate={state.period} />
      <EntryList className={classes.entries} entries={state.data} />
      <Fab
        color="primary"
        className={classes.fab}
        onClick={() => setShowDialog(true)}
        data-testid="add-entry-fab"
      >
        <AddIcon />
      </Fab>
      <AddEntry
        callback={fetchEntries}
        onClose={() => setShowDialog(false)}
        open={showDialog}
      />
    </div>
  )
}
