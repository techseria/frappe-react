import { useToast } from './ToastProvider'

export function ToastDemo() {
  const { toast } = useToast() // Removed unused dismissToast

  const showToast = (position: string) => {
    // Removed unused id assignment
    toast({
      title: `${position} Toast`,
      text: 'This is a demo toast message',
      position: position as any, // Keep position for the toast function call
      timeout: 5,
      icon: 'info'
    })
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <button 
        className="btn btn-primary"
        onClick={() => showToast('top-left')}
      >
        Top Left
      </button>
      <button 
        className="btn btn-primary"
        onClick={() => showToast('top-center')}
      >
        Top Center
      </button>
      <button 
        className="btn btn-primary"
        onClick={() => showToast('top-right')}
      >
        Top Right
      </button>
      <button 
        className="btn btn-primary"
        onClick={() => showToast('bottom-left')}
      >
        Bottom Left
      </button>
      <button 
        className="btn btn-primary"
        onClick={() => showToast('bottom-center')}
      >
        Bottom Center
      </button>
      <button 
        className="btn btn-primary"
        onClick={() => showToast('bottom-right')}
      >
        Bottom Right
      </button>
    </div>
  )
}
