import { useState, type SetStateAction } from 'react'
import { CardService } from '../api/services/card.service'

type Props = {
	question: string
	answer: string
	cardId: string
	setIsEvaluating: React.Dispatch<SetStateAction<boolean>>
}

const options = [
	{ text: 'Do not recognize at all' },
	{ text: 'Maybe heard about this' },
	{ text: "Can't remember the answer" },
	{ text: 'Answered after thinking' },
	{ text: 'Answered almost instantly' },
	{ text: 'Completely now it' },
]

export function RepeatCard({
	question,
	answer,
	cardId,
	setIsEvaluating,
}: Props) {
	const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(false)

	const handleClick = async (mark: number) => {
		setIsEvaluating(true)
		setIsAnswerVisible(true)

		try {
			await CardService.evaluateCard(mark, cardId)
		} catch (e) {
			console.log(e)
		} finally {
			setIsEvaluating(false)
		}
	}
	return (
		<section className=' h-screen flex items-center justify-center flex-col gap-3 mx-6'>
			<div className='w-full rounded-lg flex items-center gap-2 py-5 px-4 text-xl  bg-background-secondary'>
				{isAnswerVisible ? answer : question}
			</div>
			{Array.from(options, (option, i) => {
				return (
					<div
						onClick={() => handleClick(i)}
						className='w-full py-3 rounded-lg bg-background-secondary flex items-center px-4'
					>
						{`${i} - ${option.text}`}
					</div>
				)
			})}
		</section>
	)
}
