set -e

pnpm install --production --frozen-lockfile

pnpm start:prod
