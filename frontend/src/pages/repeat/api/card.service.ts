import { axiosWithAuth } from '../../../shared/api/axios.instance'
import type { Card } from '../../../shared/api/types/card.type'

export const CardService = {
	async getCardsDue(): Promise<Card[]> {
		const response = await axiosWithAuth.get(`/api/cards/due`)

		return response.data
	},

	async evaluateCard(mark: number, cardId: string) {
		const response = await axiosWithAuth.patch(`/api/cards/evaluate`, {
			mark,
			cardId,
		})

		return response.data
	},
}
