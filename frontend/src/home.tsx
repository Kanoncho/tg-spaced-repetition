import { Link, useSearchParams } from 'react-router'
import { useFolderContent } from './api/hooks/note/useFolderContent'

export function HomePage() {
	const [queryParams] = useSearchParams()
	const folderId = queryParams.get('folderId')
	const { data, isLoading, isError } = useFolderContent(folderId)

	if (isLoading) {
		return <div>Loading</div>
	}

	if (isError || !data) {
		return <div>Error</div>
	}

	return (
		<section>
			{data.folders.map(folder => {
				return (
					<Link
						key={folder.id}
						to={`/?folderId=${folder.id}`}
						className='bg-amber-950 p-3'
					>
						{folder.name}
					</Link>
				)
			})}
			{data.notes.map(note => {
				return (
					<Link
						key={note.id}
						to={`/note?noteId=${note.id}`}
						className='bg-amber-950 p-3'
					>
						{note.name}
					</Link>
				)
			})}
		</section>
	)
}
