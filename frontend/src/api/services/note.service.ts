import type { Folder } from '../../types/folder.type'
import type { Note } from '../../types/note.type'
import { axiosWithAuth } from '../axios.instance'

export const NoteService = {
	async getFolderContent(id: string | null): Promise<Folder> {
		const queryParams = id ? `?folderId=${id}` : ''

		const response = await axiosWithAuth.get(`/api/notes/folder${queryParams}`)

		return response.data
	},

	async getNoteCards(id: string): Promise<Note> {
		const response = await axiosWithAuth.get(`/api/notes/cards?noteId=${id}`)

		return response.data
	},
}
