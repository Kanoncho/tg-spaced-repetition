import { Link } from 'react-router'

type Props = {
	name: string
	type: 'folder' | 'note'
	link: string
}

export function TreeElement({ name, type, link }: Props) {
	return (
		<Link
			to={link}
			className='relative w-full rounded-lg py-4 flex items-center overflow-hidden justify-center gap-1 bg-background-secondary'
		>
			<div
				className={`absolute top-0 left-0 h-full w-1.5 ${type === 'folder' ? 'bg-amber-600' : 'bg-fuchsia-600'}`}
			></div>
			<span>{name}</span>
		</Link>
	)
}
