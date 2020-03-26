import { useContext, useCallback } from 'react'
import { LoadingContext } from '../../contexts/LoadingContext'

export default function useLoading() {
  const { loading, setLoading } = useContext(LoadingContext)

  const showLoading = useCallback(() => setLoading(true), [setLoading])
  const hideLoading = useCallback(() => setLoading(false), [setLoading])

  return {
    loading,
    hideLoading,
    showLoading,
  }
}
