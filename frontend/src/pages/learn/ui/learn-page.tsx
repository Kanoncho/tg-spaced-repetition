import { mainButton } from '@telegram-apps/sdk-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useNoteCards } from '../../../shared/model'
import { LearnCard } from './learn-card'

export function LearnPage() {
	const [queryParams] = useSearchParams()
	const noteId = queryParams.get('noteId')
	const [cardCounter, setCardCounter] = useState<number>(0)
	const { data, isLoading, isError } = useNoteCards(noteId!)

	useEffect(() => {
		if (!data?.cards.length) return

		let handleClick = () => {
			setCardCounter(prev => {
				return (prev + 1) % data.cards.length
			})
		}

		mainButton.setParams({ text: 'Next', isVisible: true, isEnabled: true })

		mainButton.onClick(handleClick)

		return () => {
			mainButton.setParams({ isVisible: false })
			mainButton.offClick(handleClick)
		}
	}, [data])

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (isError || !data) {
		return <div>Error</div>
	}

	return (
		<LearnCard
			key={data.cards[cardCounter].id}
			question={data.cards[cardCounter].question}
			answer={data.cards[cardCounter].answer}
		/>
	)
}
