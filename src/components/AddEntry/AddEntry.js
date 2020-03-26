import React from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { Formik } from 'formik'
import * as Yup from 'yup'
import AddEntryForm from './Form'
import app, { db } from '../../firebase'

export default function AddEntry({ callback, onClose, open }) {
  function handleSubmit({ amount, category, date, title, type }) {
    const uid = new Date().getTime().toString()

    db.collection('entry')
      .doc(app.auth().currentUser.uid.toString())
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
        callback()
        onClose()
      })
      .catch((error) => alert(error))
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
