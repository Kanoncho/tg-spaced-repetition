import { mainButton } from '@telegram-apps/sdk-react'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { useNoteCards } from '../../../shared/model'
import { PaddingWrapper } from '../../../shared/ui'
import { QuestionCard } from './question-card'

export function NotePage() {
	const [queryParams] = useSearchParams()
	const navigate = useNavigate()
	const noteId = queryParams.get('noteId')

	const { data, isLoading, isError } = useNoteCards(noteId!)

	useEffect(() => {
		const handleClick = () => navigate(`/note/learn?noteId=${noteId}`)
		mainButton.setParams({ text: 'Learn', isVisible: true, isEnabled: true })

		mainButton.onClick(handleClick)

		return () => {
			mainButton.setParams({ isVisible: false })
			mainButton.offClick(handleClick)
		}
	}, [])

	if (isLoading) {
		return <div>Loading</div>
	}

	if (isError || !data) {
		return <div>Error</div>
	}

	return (
		<PaddingWrapper>
			<section className='flex gap-2 flex-col'>
				{data.cards.map(card => {
					return <QuestionCard question={card.question} answer={card.answer} />
				})}
			</section>
		</PaddingWrapper>
	)
}
