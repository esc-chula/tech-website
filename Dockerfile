FROM node:20-alpine AS base

##### DEPENDENCIES

FROM base AS deps
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY prisma ./
COPY package.json pnpm-lock.yaml\* ./

RUN npm install -g pnpm && pnpm i

##### BUILDER

FROM base AS builder
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npx prisma generate
RUN npm install -g pnpm && SKIP_ENV_VALIDATION=1 pnpm run build

##### RUNNER

FROM base AS runner
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --chown=nextjs:nodejs prisma ./prisma/

EXPOSE 3000
ENV PORT=3000

CMD ["server.js"]
