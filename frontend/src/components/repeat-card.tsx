import { useState } from 'react'

type Props = {
	question: string
	answer: string
}

const options = [
	{ text: 'Do not recognize at all' },
	{ text: 'Maybe heard about this' },
	{ text: "Can't remember the answer" },
	{ text: 'Answered after thinking' },
	{ text: 'Answered almost instantly' },
	{ text: 'Completely now it' },
]

export function RepeatCard({ question, answer }: Props) {
	const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(false)

	const handleClick = () => {
		setIsAnswerVisible(true)
	}
	return (
		<section className=' h-screen flex items-center justify-center flex-col gap-3 mx-6'>
			<div className='w-full rounded-lg flex items-center gap-2 py-5 px-4 text-xl  bg-background-secondary'>
				{isAnswerVisible ? answer : question}
			</div>
			{Array.from(options, (option, i) => {
				return (
					<div
						onClick={handleClick}
						className='w-full py-3 rounded-lg bg-background-secondary flex items-center px-4'
					>
						{`${i} - ${option.text}`}
					</div>
				)
			})}
		</section>
	)
}
