import { NotebookText, Settings } from 'lucide-react'
import { Link } from 'react-router'

export function Tabs() {
	return (
		<section className='py-2 px-8 flex gap-12 items-center fixed bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-background-secondary'>
			<Link to='/configuration' className='flex flex-col gap-1 items-center'>
				<Settings width={32} height={32} />
				<span className='text-xs'>Config</span>
			</Link>
			<Link to='/' className='flex flex-col gap-1 items-center'>
				<NotebookText width={32} height={32} />
				<span className='text-xs'>Notes</span>
			</Link>
		</section>
	)
}
