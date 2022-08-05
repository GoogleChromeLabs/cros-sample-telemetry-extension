set -e

tsc -b
npm run test:ci
