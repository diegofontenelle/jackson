import React, { useCallback, useEffect, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import { TextField, makeStyles } from '@material-ui/core'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import app from '../../firebase'
import style from './Login.style'
import SignInDialog from '../../components/SignInDialog/SignInDialog'
import { AuthContext } from '../../contexts/AuthContext'
import useToast from '../../shared/hooks/useToast'

const useStyles = makeStyles(style)

export default function Login({ history }) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { currentUser } = useContext(AuthContext)
  const { error } = useToast()

  const handleSubmit = useCallback(
    async ({ email, password }) => {
      app
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => history.push('/home'))
        .catch(() => error('Usuário ou senha incorretos.'))
    },
    [error, history]
  )

  useEffect(() => {
    if (currentUser) history.push('/home')
  }, [currentUser, history])

  return (
    <Container className={classes.container}>
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
          handleSubmit: onSubmit,
          touched,
        }) => (
          <Form onSubmit={onSubmit}>
            <TextField
              error={touched.email && Boolean(errors.email)}
              fullWidth
              helperText={touched.email ? errors.email : ''}
              label="E-mail"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="E-mail"
              type="email"
            />
            <TextField
              error={touched.password && Boolean(errors.password)}
              fullWidth
              helperText={touched.password ? errors.password : ''}
              label="Senha"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Senha"
              type="password"
            />
            <Button
              className={classes.button}
              color="primary"
              data-testid="login-submit"
              fullWidth
              type="submit"
              variant="contained"
            >
              Entrar
            </Button>
            <Button
              className={classes.button}
              data-testid="signin-button"
              fullWidth
              onClick={() => setOpen(true)}
            >
              <Box color="text.secondary">Novo por aqui? Cadastre-se</Box>
            </Button>
          </Form>
        )}
      </Formik>
      <SignInDialog
        handleClose={() => setOpen(false)}
        history={history}
        open={open}
      />
    </Container>
  )
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
}
