import './App.css'
import { ToastProvider } from './components/toast/ToastProvider'
import { ToastDemo } from './components/toast/ToastDemo'

function App() {
  return (
    <ToastProvider>
      <div className="app-container p-8">
        <h1 className="text-2xl font-bold mb-8">Toast System Demo</h1>
        <ToastDemo />
      </div>
    </ToastProvider>
  )
}

export default App
