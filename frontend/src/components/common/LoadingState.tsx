interface LoadingStateProps {
  message: string
}

export default function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center h-48 text-white">
      {message}
    </div>
  )
}