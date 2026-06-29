import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'

interface UseAsyncActionOptions {
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}

export function useAsyncAction<TArgs extends any[]>(action: (...args: TArgs) => Promise<any>, options?: UseAsyncActionOptions) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const execute = useCallback(async (...args: TArgs) => {
    options?.onStart?.(); // Call onStart before setting loading state
    setIsLoading(true)
    setError(null)
    try {
      if (options?.loadingMessage) {
        toast.info(options.loadingMessage)
      }
      const result = await action(...args)
      if (options?.successMessage) {
        toast.success(options.successMessage)
      }
      options?.onSuccess?.()
      return result
    } catch (err) {
      setError(err)
      const message = options?.errorMessage || (err instanceof Error ? err.message : 'An unknown error occurred.')
      toast.error(message)
      options?.onError?.(err)
      throw err // Re-throw to allow further handling if needed
    } finally {
      setIsLoading(false)
    }
  }, [action, options])

  return { execute, isLoading, error }
}
