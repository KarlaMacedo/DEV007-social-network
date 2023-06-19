/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
// additional config to direct the vite build to src directory
// https://vitejs.dev/config/#conditional-config
// https://vitejs.dev/config/shared-options.html#root
export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      root: 'src',
      build: {
        minify: false,
        rollupOptions: {
          output: {
            dir: './dist',
          },
        },
      },
    };
  }
  return {};
});
