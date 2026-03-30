import { createBrowserRouter } from 'react-router'
import { ConfigurationPage } from '../../pages/configuration'
import { HomePage } from '../../pages/home'
import { LearnPage } from '../../pages/learn'
import { NotePage } from '../../pages/note'
import { RepeatPage } from '../../pages/repeat'
import App from '../App'

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
