import { useQuery } from '@tanstack/react-query'
import { NoteService } from '../../../note/api/note.service'

export const useFolderContent = (id: string | null) => {
	return useQuery({
		queryKey: ['folder-content', id],
		queryFn: () => NoteService.getFolderContent(id),
	})
}
