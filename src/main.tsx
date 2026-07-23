import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { useStore } from './store/projectStore'

function Root() {
  const theme = useStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return <App />
}

createRoot(document.getElementById('root')!).render(<Root />)
