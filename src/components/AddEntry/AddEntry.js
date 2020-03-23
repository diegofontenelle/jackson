import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Container from '@material-ui/core/Container'
import { InputLabel } from '@material-ui/core'

export default function AddEntry({ onClose, open }) {
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      data-testid="add-entry-dialog"
      onClose={handleClose}
      aria-labelledby="add-entry"
      open={open}
    >
      <DialogTitle id="add-entry">Adicionar um registro</DialogTitle>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="Título" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Valor (R$)" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <FormControl style={{ minWidth: '100%' }}>
              <InputLabel>Categoria</InputLabel>
              <Select label="Categoria" fullWidth>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" size="large" fullWidth>
              ADICIONAR
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth onClick={handleClose} size="large">
              VOLTAR
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  )
}

AddEntry.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}
