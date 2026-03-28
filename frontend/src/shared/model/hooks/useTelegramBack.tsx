import { backButton, on } from '@telegram-apps/sdk-react'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

export function useTelegramBack() {
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const folderId = searchParams.get('folderId')
	const noteId = searchParams.get('noteId')

	useEffect(() => {
		if (folderId || noteId) {
			backButton.show()
		} else {
			backButton.hide()
		}
	}, [folderId, noteId])

	useEffect(() => {
		const off = on('back_button_pressed', () => {
			navigate(-1)
		})

		return () => off()
	}, [navigate])
}
