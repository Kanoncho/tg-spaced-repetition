type Props = {
	question: string
	answer: string
}

export function QuestionCard({ question, answer }: Props) {
	return (
		<div className='w-full bg-background-secondary rounded-lg p-4 flex flex-col'>
			<span className='font-bold mb-1'>{question}</span>
			<span className='text-hint'>{answer}</span>
		</div>
	)
}
