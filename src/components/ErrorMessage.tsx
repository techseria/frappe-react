
interface ErrorMessageProps {
  message?: string | Error
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  const getErrorMessage = () => {
    if (!message) return ''
    if (message instanceof Error) {
      return (message as any).messages || message.message
    }
    return message
  }

  const errorMessage = getErrorMessage()

  if (!errorMessage) return null

  return (
    <div 
      className="whitespace-pre-line text-sm text-ink-red-4" 
      role="alert"
      dangerouslySetInnerHTML={{ __html: errorMessage }}
    />
  )
}
