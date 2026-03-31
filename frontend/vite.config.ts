import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd())

	return {
		server: {
			allowedHosts: true,
			proxy: {
				'/api': {
					target:
						JSON.stringify(env.VITE_BACKEND_URL) || 'http://localhost:4000',
					changeOrigin: true,
				},
			},
		},
		plugins: [
			tailwindcss(),
			react({
				babel: {
					plugins: [['babel-plugin-react-compiler']],
				},
			}),
		],
	}
})
