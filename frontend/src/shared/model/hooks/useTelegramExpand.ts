import { viewport } from '@telegram-apps/sdk-react'
import { useEffect } from 'react'

export function useTelegramViewport() {
	useEffect(() => {
		viewport
			.mount()
			.then(() => {
				if (!viewport.isExpanded()) {
					viewport.expand()
				}
			})
			.catch(e => {
				console.error('Failed to mount viewport', e)
			})
	}, [])
}
