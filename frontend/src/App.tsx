import { themeParams, useLaunchParams } from '@telegram-apps/sdk-react'
import { useEffect } from 'react'
import { Link, Outlet } from 'react-router'

function App() {
	const initData = useLaunchParams().tgWebAppData

	if (!initData) {
		return <div>No initial data</div>
	}

	useEffect(() => {
		if (!themeParams.isCssVarsBound()) {
			return themeParams.bindCssVars()
		}
	}, [])

	return (
		<>
			<main>
				<Outlet />
			</main>

			<section className='p-2 flex gap-2 items-center fixed bottom-5 left-1/2 -translate-x-1/2 bg-amber-900'>
				<Link to='/configuration'>Configuration</Link>
				<Link to='/'>Main</Link>
			</section>
		</>
	)
}

export default App
