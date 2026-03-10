import { axiosWithAuth } from '../axios.instance'

export const TelegramService = {
	async getToken(): Promise<{ token: string }> {
		const response = await axiosWithAuth.get('/api/telegram/token')

		return response.data
	},

	async createToken(): Promise<{ token: string }> {
		const response = await axiosWithAuth.post('/api/telegram/token')

		return response.data
	},
}
