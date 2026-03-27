import { themeParams, useLaunchParams } from '@telegram-apps/sdk-react'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Tabs } from '../shared/ui/tabs'
import { useTelegramBack } from './ui/back-button'

function App() {
	useTelegramBack()
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
			<main>
				<Outlet />
			</main>

			{showTabs && <Tabs />}
		</>
	)
}

export default App
