import type { UseMutateFunction } from '@tanstack/react-query'
import { useState } from 'react'

type Props = {
	question: string
	answer: string
	cardId: string
	mutate: UseMutateFunction<any, Error, any, unknown>
}

const options = [
	{ text: 'Do not recognize at all' },
	{ text: 'Maybe heard about this' },
	{ text: "Can't remember the answer" },
	{ text: 'Answered after thinking' },
	{ text: 'Answered almost instantly' },
	{ text: 'Completely now it' },
]

export function RepeatCard({ question, answer, cardId, mutate }: Props) {
	const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(false)

	const handleClick = async (mark: number) => {
		setIsAnswerVisible(true)

		try {
			mutate({ mark, cardId })
		} catch (e) {
			console.log(e)
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
