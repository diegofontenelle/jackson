import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { Formik } from 'formik'
import * as Yup from 'yup'
import AddEntryForm from './Form'
import { db } from '../../firebase'
import useToast from '../../shared/hooks/useToast'
import { AuthContext } from '../../contexts/AuthContext'

export default function AddEntry({ callback, onClose, open }) {
  const { error, success } = useToast()
  const { currentUser } = useContext(AuthContext)

  function handleSubmit({ amount, category, date, title, type }) {
    const uid = new Date().getTime().toString()

    db.collection('entry')
      .doc(currentUser.uid.toString())
      .collection('entries')
      .doc(uid)
      .set({
        id: uid,
        amount: parseFloat(amount).toFixed(2),
        category,
        date: `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`,
        queryDate: date,
        title,
        type,
      })
      .then(() => {
        success('Novo registro adicionado!')
        callback()
        onClose()
      })
      .catch((err) => error(err))
  }

  return (
    <Dialog
      data-testid="add-entry-dialog"
      onClose={onClose}
      aria-labelledby="add-entry"
      open={open}
    >
      <DialogTitle id="add-entry">Adicione um registro</DialogTitle>
      <Formik
        initialValues={{
          amount: '',
          date: new Date(),
          category: '',
          title: '',
          type: 'debit',
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          amount: Yup.number().required('Não existe almoço grátis!'),
          category: Yup.string()
            .oneOf([
              'food',
              'fun',
              'study',
              'transport',
              'work',
              'uncategorized',
            ])
            .required('Escolha uma categoria'),
          title: Yup.string().required('Obrigatório'),
        })}
      >
        {(formikProps) => (
          <AddEntryForm {...formikProps} handleClose={onClose} />
        )}
      </Formik>
    </Dialog>
  )
}

AddEntry.propTypes = {
  callback: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}
