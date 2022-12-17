module.exports = {
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:wc/recommended",
    "plugin:lit/all",
    "plugin:storybook/recommended",
    "prettier",
    "plugin:testing-library/dom"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
  },
  "plugins": [
    "@typescript-eslint",
    "testing-library"
  ],
  "env": {
    "browser": true
  },
  "rules": {
    "no-prototype-builtins": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": ["warn", {
      "argsIgnorePattern": "^_"
    }],
    "storybook/context-in-play-function": "off"
  },
  "overrides": [{
    "files": ["rollup.config.js", "web-test-runner.config.js", ".eslintrc.cjs", "*.cjs", ".storybook/*.cjs", "sb-addons/**/*"],
    "rules": {
      "@typescript-eslint/no-var-requires": "off"
    },
    "env": {
      "node": true
    }
  }, {
    "files": ["*_test.ts", "**/custom_typings/*.ts", "packages/labs/ssr/src/test/integration/tests/**", "packages/labs/ssr/src/lib/util/parse5-utils.ts"],
    "rules": {
      "@typescript-eslint/no-explicit-any": "off"
    }
  }]
};
