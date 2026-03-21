import { useQuery } from '@tanstack/react-query'
import { CardService } from '../../services/card.service'

export const useCardsDue = () => {
	return useQuery({
		queryKey: ['cards-due'],
		queryFn: () => CardService.getCardsDue(),
	})
}
