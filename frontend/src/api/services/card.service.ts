import type { Card } from '../../types/card.type'
import { axiosWithAuth } from '../axios.instance'

export const CardService = {
	async getCardsDue(): Promise<Card[]> {
		const response = await axiosWithAuth.get(`/api/cards/due`)

		return response.data
	},
}
