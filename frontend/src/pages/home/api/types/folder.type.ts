import type { Note } from '../../../../shared/api/types/note.type'

export type Folder = {
	id: string
	name: string
	folders: Folder[]
	notes: Note[]
	parentId?: string
}
