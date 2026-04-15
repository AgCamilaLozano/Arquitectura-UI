import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['lib/index.ts'],
    format: ['esm'],
    dts: true,
    clean: true,
    external: ['react', 'react-dom', 'next'],
    tsconfig: './tsconfig.build.json'
})