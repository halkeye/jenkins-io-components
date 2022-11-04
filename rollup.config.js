// Import rollup plugins
//import html from '@web/rollup-plugin-html';
//import polyfillsLoader from '@web/rollup-plugin-polyfills-loader';
import resolve from '@rollup/plugin-node-resolve';
import {getBabelOutputPlugin} from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';
import typescript from '@rollup/plugin-typescript';
import execute from 'rollup-plugin-execute'
import litcss from 'rollup-plugin-lit-css';
import postcss from 'postcss';

import {createRequire} from 'module';
const require = createRequire(import.meta.url);
const processor = postcss(require('./postcss.config.cjs'));

// Configure an instance of @web/rollup-plugin-html
//const htmlPlugin = html({
//  rootDir: './',
//  flattenOutput: false,
//});

export default {
  // Entry point for application build; can specify a glob to build multiple
  // HTML files for non-SPA app
  input: 'src/jio-components.ts',
  plugins: [
    // htmlPlugin,
    litcss({
      include: '/**/*.css',
      transform: (css, {filePath}) =>
        processor.process(css, {from: filePath})
          .css,
    }),
    typescript({
      sourceMap: false,
      inlineSources: false,
    }),
    //postcss({
    //  sourceMap: process.env.NODE_ENV === 'production',
    //  inject: false,
    //}),
    //postcssLit({
    //  importPackage: 'lit',
    //}),
    // Resolve bare module specifiers to relative paths
    resolve(),
    // Minify HTML template literals
    minifyHTML(),
    // Minify JS
    terser({
      module: true,
      warnings: true,
    }),
    execute('npm run analyze'),
    /*
    // Inject polyfills into HTML (core-js, regnerator-runtime, webcoponents,
    // lit/polyfill-support) and dynamically loads modern vs. legacy builds
    polyfillsLoader({
      modernOutput: {
        name: 'modern',
      },
      // Feature detection for loading legacy bundles
      legacyOutput: {
        name: 'legacy',
        test: '!!Array.prototype.flat',
        type: 'systemjs',
      },

      // List of polyfills to inject (each has individual feature detection)
      polyfills: {
        hash: true,
        coreJs: true,
        regeneratorRuntime: true,
        fetch: true,
        webcomponents: true,
        // Custom configuration for loading Lit's polyfill-support module,
        // required for interfacing with the webcomponents polyfills
        custom: [
          {
            name: 'lit-polyfill-support',
            path: 'node_modules/lit/polyfill-support.js',
            test: "!('attachShadow' in Element.prototype)",
            module: false,
          },
        ],
      },
    }),
    */
    // Print bundle summary
    summary(),
    // Optional: copy any static assets to build directory
    //copy({
    //  patterns: ['data/**/*', 'images/**/*'],
    //}),
  ],
  // Specifies two JS output configurations, modern and legacy, which the HTML plugin will
  // automatically choose between; the legacy build is compiled to ES5
  // and SystemJS modules
  output: [
    {
      // Modern JS bundles (no JS compilation, ES module output)
      format: 'esm',
      chunkFileNames: '[name]-[hash].ejs.js',
      entryFileNames: '[name].ejs.js',
      dir: 'build',
      // plugins: [htmlPlugin.api.addOutput('modern')],
      sourcemap: true,
    },
    {
      // Legacy JS bundles (ES5 compilation and SystemJS module output)
      format: 'esm',
      chunkFileNames: '[name]-[hash].cjs.js',
      entryFileNames: '[name].cjs.js',
      dir: 'build',
      sourcemap: true,
      plugins: [
        //htmlPlugin.api.addOutput('legacy'),
        // Uses babel to compile JS to ES5 and modules to SystemJS
        getBabelOutputPlugin({
          compact: true,
          presets: [
            [
              '@babel/preset-env',
              {
                modules: 'systemjs',
              },
            ],
          ],
        }),
      ],
    },
  ],
  preserveEntrySignatures: false,
};
