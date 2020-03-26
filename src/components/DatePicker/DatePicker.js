import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

export default function DatePicker({ label, name, setFieldValue, value }) {
  const handleChange = useCallback(
    (date) => {
      setFieldValue(name, date)
    },
    [name, setFieldValue]
  )

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        format="dd/MM/yyyy"
        fullWidth
        id="date-picker-dialog"
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        label={label}
        margin="normal"
        onChange={handleChange}
        value={value}
      />
    </MuiPickersUtilsProvider>
  )
}

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
}
