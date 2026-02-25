export default {
  '*.{ts,tsx}': ['eslint --fix', 'vitest --run --passWithNoTests'],
  '*.{json,css,md}': ['prettier --write']
}
