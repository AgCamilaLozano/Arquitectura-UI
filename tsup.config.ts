import { defineConfig } from 'tsup'

export default defineConfig({
    entry: {
        index: 'lib/index.ts',
        fonts: 'lib/fonts.ts',
        styles: 'lib/styles.ts',
        components: 'lib/components/index.ts',
        toast: 'lib/toast.ts',
        utils: 'lib/utils.ts',
    },
    format: ['esm'],
    dts: {
        resolve: true,
        compilerOptions: {
            composite: false,
        },
    },
    tsconfig: 'tsconfig.lib.json',
    esbuildOptions(options) {
        options.loader = {
            ...options.loader,
            '.woff2': 'file',
            '.woff': 'file',
        }
    },
    injectStyle: false,
})