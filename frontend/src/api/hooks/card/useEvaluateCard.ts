import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CardService } from '../../services/card.service'

type mutateProps = {
	mark: number
	cardId: string
}

export const useEvaluateCard = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ mark, cardId }: mutateProps) =>
			CardService.evaluateCard(mark, cardId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['evaluate-card'] })
		},
	})
}
