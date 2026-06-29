import { useRef, useState, useCallback } from 'react'

export function useDirtyForm<T>(values: T) {
  const initialValuesRef = useRef<T>(values)
  const pendingResetRef = useRef(false)
  const [, setVersion] = useState(0)

  // During render, if a reset was requested, capture the current values
  // as the new initial reference.
  if (pendingResetRef.current) {
    pendingResetRef.current = false
    initialValuesRef.current = values
  }

  const reset = useCallback(() => {
    pendingResetRef.current = true
    setVersion(v => v + 1)
  }, [])

  const isDirty = JSON.stringify(initialValuesRef.current) !== JSON.stringify(values)

  return { isDirty, reset, markClean: reset }
}
