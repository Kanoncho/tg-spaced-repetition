import { axiosWithAuth } from '../../../shared/api/axios.instance'
import type { Folder } from './types/folder.type'

export const NoteService = {
	async getFolderContent(id: string | null): Promise<Folder> {
		const queryParams = id ? `?folderId=${id}` : ''

		const response = await axiosWithAuth.get(`/api/notes/folder${queryParams}`)

		return response.data
	},
}
