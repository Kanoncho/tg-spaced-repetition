import { useQuery } from '@tanstack/react-query'
import { NoteService } from '../../services/note.service'

export const useFolderContent = (id: string | null) => {
	return useQuery({
		queryKey: ['folder-content', id],
		queryFn: () => NoteService.getFolderContent(id),
	})
}
