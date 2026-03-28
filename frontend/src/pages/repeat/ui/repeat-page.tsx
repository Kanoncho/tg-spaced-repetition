import { mainButton } from '@telegram-apps/sdk-react'
import { useEffect, useState } from 'react'
import { useCardsDue } from '../model/hooks/useCardsDue'
import { useEvaluateCard } from '../model/hooks/useEvaluateCard'
import { RepeatCard } from './repeat-card'

export function RepeatPage() {
	const { data, isLoading, isError } = useCardsDue()
	const [cardCounter, setCardCounter] = useState<number>(0)
	const { mutate, isPending } = useEvaluateCard()
	const [isAnswered, setIsAnswered] = useState(false)

	useEffect(() => {
		mainButton.setParams({ isVisible: true })

		return () => {
			mainButton.setParams({ isVisible: false })
		}
	}, [])

	useEffect(() => {
		mainButton.setParams({
			text: 'Next',
			isEnabled: isAnswered && !isPending,
			isLoaderVisible: isPending,
		})
	}, [isPending])

	useEffect(() => {
		const handleClick = () => {
			setCardCounter(prev => prev + 1)
			setIsAnswered(false)
		}

		mainButton.onClick(handleClick)

		return () => {
			mainButton.offClick(handleClick)
		}
	}, [cardCounter])

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
			setIsAnswered={setIsAnswered}
			isAnswered={isAnswered}
		/>
	) : (
		<div>Looks like you repeated all the cards</div>
	)
}
