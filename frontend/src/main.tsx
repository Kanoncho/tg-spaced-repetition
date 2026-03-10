import { init, miniApp } from '@telegram-apps/sdk-react'
import eruda from 'eruda'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from './provider'

init()
miniApp.mountSync()
eruda.init()

const root = document.getElementById('root')

createRoot(root!).render(<Provider />)
