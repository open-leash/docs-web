FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/docs-web/package.json apps/docs-web/package.json
RUN npm ci --workspace @openleash/docs-web --include-workspace-root

FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_SITE_URL=https://docs.openleash.com
ARG NEXT_PUBLIC_DASHBOARD_URL=https://dashboard.openleash.com
ARG NEXT_PUBLIC_GITHUB_URL=https://github.com/openleash/openleash
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_DASHBOARD_URL=$NEXT_PUBLIC_DASHBOARD_URL
ENV NEXT_PUBLIC_GITHUB_URL=$NEXT_PUBLIC_GITHUB_URL
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY apps/docs-web ./apps/docs-web
RUN npm run build -w @openleash/docs-web

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080
COPY --from=builder /app/apps/docs-web/.next/static ./apps/docs-web/.next/static
COPY --from=builder /app/apps/docs-web/.next/standalone ./
EXPOSE 8080
CMD ["node", "apps/docs-web/server.js"]
