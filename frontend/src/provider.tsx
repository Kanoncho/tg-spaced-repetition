import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'
import { router } from './router'

export function Provider() {
	return (
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	)
}
