import { useQuery } from '@tanstack/react-query'
import { UserService } from '../../services/user.service'

export const useGetToken = () => {
	return useQuery({
		queryKey: ['token'],
		queryFn: () => UserService.getToken(),
	})
}
