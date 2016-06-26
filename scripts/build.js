
'use strict';

const fs = require('fs');
const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');

const pkg = require('../package.json');

del(['dist/*'])
  .then(() => rollup.rollup({
  entry: 'src/index.js',
  external: Object.keys(pkg.dependencies),
  plugins: [
    nodeResolve(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: ['stage-3'],
      plugins: [
        'external-helpers',
        'transform-es2015-destructuring',
        'transform-es2015-function-name',
        'transform-es2015-parameters'
      ]
    })
  ],
})
  .then(bundle => bundle.write({
    dest: 'dist/main.js',
    format: 'cjs',
    sourceMap: true
  })))
  .catch(err => console.log(err, err.stack))
