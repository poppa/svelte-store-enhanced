import { join, resolve } from 'path'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

const base = join(__dirname, 'src', 'lib')

export default defineConfig({
  plugins: [dts({ entryRoot: './src/lib', tsconfigPath: './tsconfig.json' })],
  appType: 'custom',
  build: {
    sourcemap: true,
    lib: {
      formats: ['es', 'cjs'],
      entry: {
        index: resolve(base, 'index.ts'),
        toggle: resolve(base, 'toggle.ts'),
        'writable-enhanced': resolve(base, 'writable-enhanced.ts'),
      },
      name: '@poppanator/svelte-store-enhanced',
      fileName: (format, entryName) => {
        return `${entryName}.${format === 'cjs' ? 'cjs' : 'js'}`
      },
    },
  },
})
