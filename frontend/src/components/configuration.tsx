import { useCreateToken } from '../api/hooks/telegram/useCreateToken'
import { useGetToken } from '../api/hooks/telegram/useGetToken'

export function ConfigurationPage() {
	const { data, isLoading, isError } = useGetToken()
	const {
		mutate: createToken,
		isPending,
		isError: isCreateFailed,
	} = useCreateToken()

	if (isError) {
		return <div>Something went wrong</div>
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<h1>Configuration: {data?.token ? data.token : 'No token'}</h1>
			<h1 className='mt-10'>{isCreateFailed && 'Failed to create a token'}</h1>
			<button
				className='p-1 mt-10 bg-button items-center justify-center text-background'
				onClick={() => createToken()}
			>
				{isPending
					? 'Pending...'
					: data?.token
						? 'Regenerate token'
						: 'Generate token'}
			</button>
		</div>
	)
}
