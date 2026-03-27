import { axiosWithAuth } from '../axios.instance'

export const UserService = {
	async getToken(): Promise<{ token: string }> {
		const response = await axiosWithAuth.get('/api/user/token')

		return response.data
	},

	async createToken(): Promise<{ token: string }> {
		const response = await axiosWithAuth.post('/api/user/token')

		return response.data
	},
}
