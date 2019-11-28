import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

function onwarn(warning) {
  if (warning.code === 'THIS_IS_UNDEFINED')
    return;
  console.error(warning.message);
}

export default [
  {
    input: './src/wired-elements.js',
    output: {
      file: `./dist/wired-elements-bundle.js`,
      format: 'iife',
      name: 'WiredElements'
    },
    onwarn,
    plugins: [resolve(), terser()]
  }
];