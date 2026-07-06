FROM node:24-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/system-api/package.json apps/system-api/package.json

RUN corepack enable && pnpm install --filter @epos/system-api

COPY tsconfig.json ./
COPY apps/system-api apps/system-api

RUN pnpm --filter @epos/system-api build

WORKDIR /app/apps/system-api

EXPOSE 3000

CMD ["node", "dist/index.js"]