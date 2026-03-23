import { useQuery } from '@tanstack/react-query'
import { NoteService } from '../../services/note.service'

export const useNoteCards = (id: string) => {
	return useQuery({
		queryKey: ['cards, id'],
		queryFn: () => NoteService.getNoteCards(id),
	})
}
