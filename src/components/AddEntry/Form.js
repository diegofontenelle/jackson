import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'formik'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import DatePicker from '../DatePicker'

export default function AddEntryForm({
  errors,
  handleBlur,
  handleChange,
  handleClose,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  touched,
  values: { category, date, type },
}) {
  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Título"
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              fullWidth
              helperText={
                touched.title && Boolean(errors.title) ? errors.title : ''
              }
              error={touched.title && Boolean(errors.title)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              error={touched.amount && Boolean(errors.amount)}
              fullWidth
              helperText={
                touched.amount && Boolean(errors.amount) ? errors.amount : ''
              }
              label="Valor (R$)"
              name="amount"
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={touched.category && Boolean(errors.category)}
              fullWidth
              helperText={errors.category}
              label="Categoria"
              name="category"
              onBlur={handleBlur}
              onChange={handleChange}
              select
              value={category}
            >
              <MenuItem value="study">Estudo</MenuItem>
              <MenuItem value="food">Comida</MenuItem>
              <MenuItem value="fun">Lazer</MenuItem>
              <MenuItem value="work">Trabalho</MenuItem>
              <MenuItem value="transport">Transporte</MenuItem>
              <MenuItem value="uncategorized">Sem categoria</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={touched.type && Boolean(errors.type)}
              fullWidth
              helperText={errors.type}
              label="Tipo"
              name="type"
              onBlur={handleBlur}
              onChange={handleChange}
              select
              value={type}
            >
              <MenuItem value="debit">Despesa</MenuItem>
              <MenuItem value="credit">Lucro</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              setFieldValue={setFieldValue}
              name="date"
              label="Data"
              value={date}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress /> : 'ADICIONAR'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={handleClose} size="large">
              VOLTAR
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Form>
  )
}

AddEntryForm.propTypes = {
  errors: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
}
