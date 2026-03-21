import { createBrowserRouter } from 'react-router'
import App from './App'
import { ConfigurationPage } from './configuration'
import { HomePage } from './home'
import { LearnPage } from './learn-page'
import { NotePage } from './note-page'
import { RepeatPage } from './repeat-page'

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
				path: 'configuration',
				element: <ConfigurationPage />,
			},
			{
				path: 'note',
				element: <NotePage />,
			},
			{
				path: 'note/learn',
				element: <LearnPage />,
			},
			{
				path: 'repeat',
				element: <RepeatPage />,
			},
		],
	},
])
