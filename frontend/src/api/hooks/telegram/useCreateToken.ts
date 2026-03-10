import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TelegramService } from '../../services/telegram.service'

export const useCreateToken = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: TelegramService.createToken,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['token'] })
		},
	})
}
