import { useSearchParams } from 'react-router'
import { PaddingWrapper } from '../../../shared/ui/padding-wrapper'
import { useFolderContent } from '../model/hooks/useFolderContent'
import { TreeElement } from './tree-element'

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
		<PaddingWrapper>
			{' '}
			<section className='grid grid-cols-2 gap-2'>
				{data.folders.map(folder => {
					return (
						<TreeElement
							name={folder.name}
							link={`/?folderId=${folder.id}`}
							type='folder'
						/>
					)
				})}
				{data.notes.map(note => {
					return (
						<TreeElement
							name={note.name}
							link={`/note?noteId=${note.id}`}
							type='note'
						/>
					)
				})}
			</section>
		</PaddingWrapper>
	)
}
