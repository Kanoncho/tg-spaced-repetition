import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserService } from '../../api/user.service'

export const useCreateToken = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: UserService.createToken,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['token'] })
		},
	})
}
