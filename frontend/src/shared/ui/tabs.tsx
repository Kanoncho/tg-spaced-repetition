import { Link } from 'react-router'

export function Tabs() {
	return (
		<section className='p-2 flex gap-2 items-center fixed bottom-5 left-1/2 -translate-x-1/2 bg-amber-900'>
			<Link to='/configuration'>Configuration</Link>
			<Link to='/'>Main</Link>
		</section>
	)
}
