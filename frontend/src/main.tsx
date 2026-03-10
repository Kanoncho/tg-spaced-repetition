import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from './provider'

const root = document.getElementById('root')

createRoot(root!).render(<Provider />)
