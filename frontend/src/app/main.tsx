import { backButton, init, mainButton, miniApp } from '@telegram-apps/sdk-react'
import eruda from 'eruda'
import { createRoot } from 'react-dom/client'
import { Provider } from './providers/provider'
import './styles/index.css'

init()
miniApp.mountSync()
eruda.init()
backButton.mount()
mainButton.mount()

const root = document.getElementById('root')

createRoot(root!).render(<Provider />)
