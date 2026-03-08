import ReactDOM from 'react-dom/client'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <div>Hello world</div>,
	},
])

const root = document.getElementById('root')

ReactDOM.createRoot(root as ReactDOM.Container).render(
	<RouterProvider router={router} />,
)
