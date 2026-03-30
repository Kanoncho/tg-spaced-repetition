import { useQuery } from '@tanstack/react-query'
import { NoteService } from '../../api/note.service'

export const useFolderContent = (id: string | null) => {
	return useQuery({
		queryKey: ['folder-content', id],
		queryFn: () => NoteService.getFolderContent(id),
	})
}
