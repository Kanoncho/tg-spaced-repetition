import type { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

export function PaddingWrapper({ children }: Props) {
	return <div className='w-full px-2 box-border'>{children}</div>
}
