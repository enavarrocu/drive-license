# ---- build ----
FROM node:24.22.1-bookworm-slim AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# ---- run ----
FROM node:24.22.1-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
ENV NUXT_DB_PATH=/data/permis.db
ENV PORT=3000
ENV HOST=0.0.0.0
COPY --from=build /app/.output ./.output
RUN mkdir -p /data && chown -R node:node /data /app
USER node
VOLUME ["/data"]
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
