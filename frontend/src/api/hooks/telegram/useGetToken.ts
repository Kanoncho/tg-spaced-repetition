import { useQuery } from '@tanstack/react-query'
import { TelegramService } from '../../services/telegram.service'

export const useGetToken = () => {
	return useQuery({
		queryKey: ['token'],
		queryFn: () => TelegramService.getToken(),
	})
}
