import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import style from './SignInDialog.style'
import app from '../../firebase'

const useStyles = makeStyles(style)

export default function SignInDialog({ handleClose, open }) {
  const classes = useStyles()

  const handleSubmit = useCallback(async ({ email, password }) => {
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() =>
        app
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => <Redirect to="/home" />)
          .catch((error) => alert(error))
      )
      .catch((error) => alert(error))
  }, [])

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="signIn">Quase lá!</DialogTitle>
      <Container>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Digite um e-mail válido')
              .required('Informe o e-mail para fazer login'),
            password: Yup.string().required('Informe a senha'),
          })}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit: _handleSubmit,
            touched,
          }) => (
            <Form onSubmit={_handleSubmit} noValidate>
              <TextField
                label="E-mail"
                placeholder="E-mail"
                type="email"
                name="email"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.email}
                error={touched.email && Boolean(errors.email)}
              />
              <TextField
                label="Senha"
                placeholder="Senha"
                type="password"
                name="password"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.password}
                error={touched.password && Boolean(errors.password)}
              />
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                Cadastrar
              </Button>
              <Button
                variant="text"
                className={classes.button}
                onClick={handleClose}
                fullWidth
              >
                <Box color="text.secondary">Voltar</Box>
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Dialog>
  )
}

SignInDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
}

SignInDialog.defaultProps = {
  open: false,
}
