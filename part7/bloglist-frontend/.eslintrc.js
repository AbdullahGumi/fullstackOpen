module.exports = {
  "env": {
      "browser": true,
      "es6": true
  },
  "extends": [ 
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "rules": {
    "no-mixed-spaces-and-tabs": 0,
      "linebreak-style": [
          "error",
          "windows"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "eqeqeq": "error",
      "object-curly-spacing": [
          "error", "always"
      ],
      "no-console": 0,
      "react/prop-types": 0
  },
    "settings": {
    "react": {
      "version": "detect"
    }
  }
}