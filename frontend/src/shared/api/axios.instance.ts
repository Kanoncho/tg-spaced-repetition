import { retrieveRawInitData } from '@telegram-apps/sdk-react'
import axios from 'axios'

export const axiosWithAuth = axios.create({
	baseURL: '/',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
})

axiosWithAuth.interceptors.request.use(config => {
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
