import { init, miniApp } from '@telegram-apps/sdk-react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from './provider'

init()
miniApp.mountSync()

const root = document.getElementById('root')

createRoot(root!).render(<Provider />)
