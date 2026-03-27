import type { Card } from './card.type'

export type Note = {
	id: string
	name: string
	cards: Card[]
	folderId?: string
}
