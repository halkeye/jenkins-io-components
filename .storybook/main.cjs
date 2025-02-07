const postcss = require('postcss');

const processor = postcss(require('../postcss.config.cjs'));

module.exports = {
  core: {
    manager: "webpack5"
  },

  "stories": ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  "addons": [
    "storybook-dark-mode",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-coverage",
    "../sb-addons/locale-selector",
    "@storybook/addon-webpack5-compiler-babel",
    "@chromatic-com/storybook",
    "@storybook/addon-mdx-gfm"
  ],

  "framework": {
    "name": "@storybook/web-components-webpack5",
    "options": {}
  },

  features: {
    interactionsDebugger: true,
  },

  webpackFinal: async (config/*, {}*/) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    const cssRule = config.module.rules.find(rule => rule.test.toString() === '/\\.css$/');
    cssRule.use = [
      {
        loader: 'lit-css-loader',
        options: {
          transform: (rawCSS, {filePath}) => {
            const {css} = processor.process(rawCSS, {from: filePath})
            return css;
          }
        }
      }
    ];

    // Return the altered config
    return config;
  },

  docs: {}
}
