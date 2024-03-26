import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      // exclude: [...configDefaults.exclude, 'e2e/*'],
      include: [
        "src/**/*.js",
        "src/**/*.vue",
        // 其他需要包含的文件或目录  
      ], 
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
