import type { Note } from './note.type'

export type Folder = {
	id: string
	name: string
	folders: Folder[]
	notes: Note[]
	parentId?: string
}
