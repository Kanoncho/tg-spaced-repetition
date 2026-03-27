import { axiosWithAuth } from '../../../shared/api/axios.instance'
import type { Note } from '../../../shared/api/types/note.type'

export const NoteService = {
	async getNoteCards(id: string): Promise<Note> {
		const response = await axiosWithAuth.get(`/api/notes/cards?noteId=${id}`)

		return response.data
	},
}
