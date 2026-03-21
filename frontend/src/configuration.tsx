import { openLink } from '@telegram-apps/sdk-react'
import { useCreateToken } from './api/hooks/telegram/useCreateToken'
import { useGetToken } from './api/hooks/telegram/useGetToken'
import { PaddingWrapper } from './components/padding-wrapper'

export function ConfigurationPage() {
	const { data, isLoading, isError } = useGetToken()
	const {
		mutate: createToken,
		isPending,
		isError: isCreateFailed,
	} = useCreateToken()

	if (isError) {
		return <div>Something went wrong</div>
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<PaddingWrapper>
			<section className='flex flex-col gap-10'>
				<div className='flex flex-col gap-2'>
					<h1 className='font-bold text-xl'>Configuration</h1>
					<span className='text-hint'>
						To use <span className='text-foreground'>*name* bot</span> you got
						to spend a few minutes setting it up first. But don’t worry, in this
						section i will go through this process step by step with you. Let’s
						start!
					</span>
				</div>
				<ol className='list-decimal list-inside ml-4 mr-4 flex flex-col gap-4'>
					<li>
						I assume that you are already using obsidian, but if not you can
						download it here:{' '}
						<span
							onClick={() => openLink('https://google.com')}
							className='text-purple-400'
						>
							https://google.com
						</span>
					</li>
					<li>
						Download Telegram spaced repetition plugin:{' '}
						<span
							onClick={() => openLink('https://google.com')}
							className='text-purple-400'
						>
							https://google.com
						</span>
					</li>
					<li>
						Generate your personal token by clickng the button below. <br />
						<span className='text-hint'>
							DO NOT share this token with anyone, it’s your personal
							identification key.
						</span>
						<div className='w-full p-3 bg-background-secondary rounded-lg flex flex-col gap-2 my-2'>
							<div className='p-2 rounded-lg bg-background'>
								{data?.token ? data.token : 'No token yet'}
							</div>
							<div className={isCreateFailed ? 'block' : 'hidden'}>
								Failed to create a new token
							</div>
							<button
								onClick={() => createToken()}
								className='bg-button w-[150px] rounded-lg text-background p-2'
							>
								{isPending ? 'Generating...' : 'Generate token'}
							</button>
						</div>
					</li>
					<li>
						Now copy the token you just created, open obsidian, then go to
						settings → community plugins, find plugin named TSR in installed
						plugins list and click settings symbol on the plugins card
					</li>
					<li>
						Paste your token in the “Token” field. Changes will be saved
						automatically.
					</li>
					<li>Done!</li>
				</ol>
				<div className='flex flex-col gap-2'>
					<h2 className='font-bold text-xl'>Usage</h2>
					<div className='text-hint flex flex-col gap-4'>
						<p>
							Now a few words about using the plugin. In any opened note you may
							hit <span className='text-foreground'>CTRL + ALT + T</span> or
							fire a command{' '}
							<span className='text-foreground'>TSR sync notes</span> from
							command pallete (if no note is currently open it will not work).
							This will add two properties to your note:{' '}
							<span className='text-foreground'>tsr-sync</span> and{' '}
							<span className='text-foreground'>tsr-path</span>.
						</p>
						<p>
							<span className='text-foreground'>tsr-sync</span> is a checkmark
							representing wether this file shoud be synchronized with the
							plugin or not
						</p>
						<p>
							<span className='text-foreground'>tsr-path</span> is the path
							where generated cards for the current file are going to be located
							in the mini app. By default it’s the same path where your file is
							found in the obsidian folder tree.
						</p>
						<p>
							Now whenever you want to{' '}
							<span className='text-foreground'>synchronize</span> choosen notes
							with the plugin or in other words generate cards, you just hit a{' '}
							<span className='text-foreground'>TSR synchronize</span> icon
							which can be found on the left icons pannel among other default
							actions
						</p>
						<p>
							That’s it. You will see a notification in obsidian about started
							synchronization. When the proccess will be finished you’ll get a
							notification from{' '}
							<span className='text-foreground'>*name* bot</span>.
						</p>
						<p>
							You can find and manage your cards in bot’s mini app. Also the bot
							will throw at you some of your cards from time to time accordingly
							to spaced repetition system called SuperMemo. You can read about
							it here if you’re intrested:
							<br />
							<span
								onClick={() => openLink('https://google.com')}
								className='text-purple-400'
							>
								https://google.com
							</span>
						</p>
						<p>Happy learning i guess? Happy indeed! :D</p>
					</div>
				</div>
				{/* <h1>Configuration: {data?.token ? data.token : 'No token'}</h1>
				<h1 className='mt-10'>
					{isCreateFailed && 'Failed to create a token'}
				</h1>
				<button
					className='p-1 mt-10 bg-button items-center justify-center text-background'
					onClick={() => createToken()}
				>
					{isPending
						? 'Pending...'
						: data?.token
							? 'Regenerate token'
							: 'Generate token'}
				</button> */}
			</section>
		</PaddingWrapper>
	)
}
