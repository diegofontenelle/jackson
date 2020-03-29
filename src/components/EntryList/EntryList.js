import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'
import Category from '../Category'
import style from './EntryList.style'
import formatDateToText from '../../shared/utils/date/formatDateToText'
import { LoadingContext } from '../../contexts/LoadingContext'

const useStyles = makeStyles(style)

export default function EntryList({ entries, ...rest }) {
  const classes = useStyles()
  const { loading } = useContext(LoadingContext)

  if (loading)
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    )

  if (Array.isArray(entries) && entries.length === 0)
    return (
      <Typography variant="subtitle1" align="center" data-testid="empty-state">
        <Box color="text.secondary">
          Wow nada para ver aqui, que tal fazer seu primeiro registro?
        </Box>
      </Typography>
    )

  return (
    <List {...rest}>
      {entries.map(({ id, title, amount, type, date, category }) => (
        <ListItem key={id} divider>
          <ListItemAvatar>
            <Avatar>
              <Category category={category} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={title}
            secondary={
              <Box
                component="span"
                color={type === 'credit' ? 'success.main' : 'error.main'}
                className={classes.secondaryText}
              >
                R$ {amount}{' '}
                <Box component="span" color="text.secondary">
                  {formatDateToText(date)}
                </Box>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  )
}

EntryList.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.object).isRequired,
}
