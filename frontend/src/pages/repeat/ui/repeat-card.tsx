import type { UseMutateFunction } from '@tanstack/react-query'
import { type Dispatch, type SetStateAction } from 'react'

type Props = {
	question: string
	answer: string
	cardId: string
	mutate: UseMutateFunction<any, Error, any, unknown>
	setIsAnswered: Dispatch<SetStateAction<boolean>>
	isAnswered: boolean
}

const options = [
	{ text: 'No clue' },
	{ text: 'Hardly knew' },
	{ text: 'Forgot, but knew' },
	{ text: 'Took effort' },
	{ text: 'Felt easy' },
	{ text: 'Nailed it' },
]

export function RepeatCard({
	question,
	answer,
	cardId,
	mutate,
	setIsAnswered,
	isAnswered,
}: Props) {
	const handleClick = async (mark: number) => {
		setIsAnswered(true)

		try {
			mutate({ mark, cardId })
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<section className=' h-screen flex items-center justify-center flex-col gap-3 mx-6'>
			<div className='w-full rounded-lg flex items-center gap-2 py-5 px-4 text-xl  bg-background-secondary'>
				{isAnswered ? answer : question}
			</div>
			{Array.from(options, (option, i) => {
				return (
					<button
						disabled={isAnswered}
						onClick={() => handleClick(i)}
						className={`w-full py-3 rounded-lg bg-background-secondary flex items-center px-4 ${isAnswered && 'text-foreground/50'}`}
					>
						{`${i} - ${option.text}`}
					</button>
				)
			})}
		</section>
	)
}
