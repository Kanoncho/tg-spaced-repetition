import { useSearchParams } from 'react-router'
import { useNoteCards } from './api/hooks/note/useNoteCards'

export function NotePage() {
	const [queryParams] = useSearchParams()
	const noteId = queryParams.get('noteId')

	if (!noteId) {
		return <div>No note id</div>
	}

	const { data, isLoading, isError } = useNoteCards(noteId)

	if (isLoading) {
		return <div>Loading</div>
	}

	if (isError || !data) {
		return <div>Error</div>
	}

	return (
		<section>
			{data.cards.map(card => {
				return (
					<div key={card.id} className='bg-amber-950 p-3 flex gap-2'>
						<span className='font-bold'>{card.question}</span>
						<span>{card.answer}</span>
					</div>
				)
			})}
		</section>
	)
}
