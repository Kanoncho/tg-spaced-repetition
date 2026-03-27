import { mainButton } from '@telegram-apps/sdk-react'
import { useEffect, useState } from 'react'
import { useCardsDue } from './api/hooks/card/useCardsDue'
import { useEvaluateCard } from './api/hooks/card/useEvaluateCard'
import { RepeatCard } from './components/repeat-card'

export function RepeatPage() {
	const { data, isLoading, isError } = useCardsDue()
	const [cardCounter, setCardCounter] = useState<number>(0)
	const { mutate, isPending } = useEvaluateCard()

	useEffect(() => {
		const handleClick = () => setCardCounter(prev => prev + 1)
		mainButton.setParams({
			text: 'Next',
			isVisible: true,
			isEnabled: !isPending,
		})

		mainButton.onClick(handleClick)

		return () => {
			mainButton.setParams({ isVisible: false })
			mainButton.offClick(handleClick)
		}
	}, [isPending])

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (isError || !data) {
		return <div>Error</div>
	}

	return data[cardCounter] ? (
		<RepeatCard
			key={data[cardCounter].id}
			cardId={data[cardCounter].id}
			mutate={mutate}
			question={data[cardCounter].question}
			answer={data[cardCounter].answer}
		/>
	) : (
		<div>Looks like you repeated all the cards</div>
	)
}
