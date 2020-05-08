import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import webWorkerLoader from 'rollup-plugin-web-worker-loader';

export default {
  input: "./src/bg-looper.ts",
  output: {
    file: './lib/index.js',
    format: 'esm'
  },
  plugins: [
    resolve(),
    commonjs(),
    webWorkerLoader({
      targetPlatform: 'browser'
    }),
    typescript({
      exclude: './dev/*.ts'
    })
  ]
}