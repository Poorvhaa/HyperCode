module.exports = [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/public/**",
      "**/*.pdf",
      "*.js"
    ]
  },
  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off"
    }
  }
];
