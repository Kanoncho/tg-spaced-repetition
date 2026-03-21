import { useState } from 'react'

type Props = {
	question: string
	answer: string
}

export function LearnCard({ question, answer }: Props) {
	const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(false)

	const handleClick = () => {
		setIsAnswerVisible(true)
	}
	return (
		<section className=' h-screen flex items-center justify-center flex-col gap-3 mx-6'>
			<div className='w-full rounded-lg flex items-center gap-2 py-5 px-4 text-xl  bg-background-secondary'>
				{isAnswerVisible ? answer : question}
			</div>

			<div
				onClick={handleClick}
				className='w-full py-3 rounded-lg bg-background-secondary flex items-center px-4'
			>
				Show answer
			</div>
		</section>
	)
}
