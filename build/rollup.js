// ------------------------------------------------------------------------------------------
// setup
// ------------------------------------------------------------------------------------------

import path from 'path'
import license from 'rollup-plugin-license'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'

const pkg = require('../package.json')

const external = Object.keys(pkg.dependencies || {})
const name = pkg.name
const className = name.replace(/(^\w|-\w)/g, c => c.replace('-', '').toUpperCase())

function output (ext, format = 'umd') {
  return {
    // name: className,
    file: `dist/${name}.${ext}`,
    format: format,
    name: 'VueSmoothDnD',
    globals: {
      'smooth-dnd': 'SmoothDnD',
      'vue': 'Vue'
    }
  }
}

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
]

// ------------------------------------------------------------------------------------------
// build
// ------------------------------------------------------------------------------------------

const umd = {
  input: 'src/main.ts',
  // external: external,
  output: output('js'),
  plugins: [
    license({
      banner: {
        file: path.join(__dirname, 'banner.txt')
      },
    }),
    babel({
      extensions,
      include: ['src/**/*'],
      exclude: 'node_modules/**',
    }),
    commonjs({
      extensions
    }),
  ],
}

const min = Object.assign({}, umd, {
  output: output('min.js'),
  plugins: [...umd.plugins, uglify()]
})

const es = Object.assign({}, umd, {
  output: output('esm.js', 'es')
})

export default [umd, min, es]
