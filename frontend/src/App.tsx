import { themeParams, useLaunchParams } from '@telegram-apps/sdk-react'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { BackButton } from './back-button'
import { Tabs } from './components/tabs'

function App() {
	const initData = useLaunchParams().tgWebAppData
	const location = useLocation()

	const showTabs = ['/', '/configuration', '/main'].includes(location.pathname)

	if (!initData) {
		return <div>No initial data</div>
	}

	useEffect(() => {
		if (!themeParams.isCssVarsBound()) {
			return themeParams.bindCssVars()
		}
	}, [themeParams])

	return (
		<>
			<BackButton />

			<main>
				<Outlet />
			</main>

			{showTabs && <Tabs />}
		</>
	)
}

export default App
