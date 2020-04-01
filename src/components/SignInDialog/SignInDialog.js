import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/core'
import style from './SignInDialog.style'
import app from '../../firebase'
import useToast from '../../shared/hooks/useToast'
import useLoading from '../../shared/hooks/useLoading'

const useStyles = makeStyles(style)

export default function SignInDialog({ handleClose, history, open }) {
  const classes = useStyles()
  const { error } = useToast()
  const { loading, showLoading, hideLoading } = useLoading()

  const handleSubmit = useCallback(async ({ email, password }) => {
    showLoading()
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() =>
        app
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => history.push('home'))
          .catch((err) => error(err))
      )
      .catch((err) => error(err))
      .finally(hideLoading)
  }, [])

  return (
    <Dialog data-testid="signin-dialog" onClose={handleClose} open={open}>
      <DialogTitle id="signIn">
        Quase lá!{' '}
        <Typography variant="body2">
          <Box component="span" color="text.secondary">
            Digite seu e-mail e escolha uma senha para começar a acessar
          </Box>
        </Typography>
      </DialogTitle>
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
                error={touched.email && Boolean(errors.email)}
                fullWidth
                helperText={
                  touched.email && Boolean(errors.email) ? errors.email : ''
                }
                inputProps={{
                  'data-testid': 'signin-email',
                }}
                label="E-mail"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="E-mail"
                type="email"
              />
              <TextField
                error={touched.password && Boolean(errors.password)}
                fullWidth
                helperText={
                  touched.password && Boolean(errors.password)
                    ? errors.password
                    : ''
                }
                inputProps={{
                  'data-testid': 'signin-password',
                }}
                label="Senha"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Senha"
                type="password"
              />
              <Button
                className={classes.button}
                color="primary"
                data-testid="signin-submit"
                fullWidth
                variant="contained"
                type="submit"
              >
                {loading ? <CircularProgress /> : 'Cadastrar'}
              </Button>
              <Button
                className={classes.button}
                data-testid="signin-dialog-back"
                fullWidth
                onClick={handleClose}
                variant="text"
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
  history: PropTypes.object.isRequired,
  open: PropTypes.bool,
}

SignInDialog.defaultProps = {
  open: false,
}
