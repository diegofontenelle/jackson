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

const useStyles = makeStyles(style)

export default function Login({ history }) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { currentUser } = useContext(AuthContext)

  const handleSubmit = useCallback(
    async ({ email, password }) => {
      app
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => history.push('/home'))
        .catch((error) => alert(error))
    },
    [history]
  )

  useEffect(() => history.push('/home'), [currentUser])

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
              label="E-mail"
              placeholder="E-mail"
              type="email"
              name="email"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={errors.email}
              error={touched.email && Boolean(errors.email)}
            />
            <TextField
              label="Senha"
              type="password"
              name="password"
              fullWidth
              onBlur={handleBlur}
              onChange={handleChange}
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
              Entrar
            </Button>
            <Button
              className={classes.button}
              fullWidth
              onClick={() => setOpen(true)}
            >
              <Box color="text.secondary">Novo por aqui? Cadastre-se</Box>
            </Button>
          </Form>
        )}
      </Formik>
      <SignInDialog open={open} handleClose={() => setOpen(false)} />
    </Container>
  )
}

Login.propTypes = {
  history: PropTypes.object.isRequired,
}
