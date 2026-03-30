import { useQuery } from '@tanstack/react-query'
import { CardService } from '../../api/card.service'

export const useCardsDue = () => {
	return useQuery({
		queryKey: ['cards-due'],
		queryFn: () => CardService.getCardsDue(),
	})
}
