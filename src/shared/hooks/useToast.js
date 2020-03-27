import { useCallback, useContext } from 'react'
import { ToastContext } from '../../contexts/ToastContext'

export default function useToast() {
  const { dispatch } = useContext(ToastContext)

  const success = useCallback(
    (message) =>
      dispatch({ type: 'success', payload: { message, severity: 'success' } }),
    [dispatch]
  )

  const error = useCallback(
    (message) =>
      dispatch({
        type: 'error',
        payload: {
          message:
            typeof message !== 'string'
              ? 'Algo deu errado, tente novamente.'
              : message,
          severity: 'error',
        },
      }),
    [dispatch]
  )

  return {
    error,
    success,
  }
}
