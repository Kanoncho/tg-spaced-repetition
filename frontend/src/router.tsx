import { createBrowserRouter } from 'react-router'
import App from './App'
import { ConfigurationPage } from './components/configuration'
import { HomePage } from './home'
import { NotePage } from './note-page'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: '/configuration',
				element: <ConfigurationPage />,
			},
			{
				path: '/note',
				element: <NotePage />,
			},
		],
	},
])
