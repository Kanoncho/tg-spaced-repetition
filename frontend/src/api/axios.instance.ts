import { retrieveRawInitData } from '@telegram-apps/sdk-react'
import axios from 'axios'

export const api = axios.create({
	baseURL: '/',
})

api.interceptors.request.use(config => {
	try {
		const initDataRaw = retrieveRawInitData()

		if (initDataRaw) {
			config.headers.Authorization = `tma ${initDataRaw}`
		}
	} catch (e) {
		console.error('Telegram SDK not initialized or data missing')
	}

	return config
})
