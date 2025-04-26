import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ghPages from 'vite-plugin-gh-pages'

export default defineConfig({
  plugins: [react(), ghPages()],
  base: '/pokemon-pokedex/', // <-- sørg for at ændre dette til dit repo-navn
})
