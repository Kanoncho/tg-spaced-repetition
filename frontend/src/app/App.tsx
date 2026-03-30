import { useLaunchParams } from '@telegram-apps/sdk-react'
import { Outlet, useLocation } from 'react-router'
import { useTelegramBack } from '../shared/model/hooks/useTelegramBack'
import { useTelegramViewport } from '../shared/model/hooks/useTelegramExpand'
import { Tabs } from '../shared/ui/tabs'

function App() {
	useTelegramBack()
	useTelegramViewport()
	const initData = useLaunchParams().tgWebAppData
	const location = useLocation()

	const showTabs = ['/', '/configuration', '/main'].includes(location.pathname)

	if (!initData) {
		return <div>No initial data</div>
	}

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
