FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/docs-web/package.json apps/docs-web/package.json
RUN npm ci --workspace @openleash/docs-web --include-workspace-root

FROM deps AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_SITE_URL=https://docs.openleash.com
ARG NEXT_PUBLIC_DASHBOARD_URL=https://app.openleash.com
ARG NEXT_PUBLIC_GITHUB_URL=https://github.com/open-leash
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_DASHBOARD_URL=$NEXT_PUBLIC_DASHBOARD_URL
ENV NEXT_PUBLIC_GITHUB_URL=$NEXT_PUBLIC_GITHUB_URL
COPY apps/docs-web apps/docs-web
RUN npm run build -w @openleash/docs-web

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080
COPY --from=build /app/apps/docs-web/.next/standalone ./
COPY --from=build /app/apps/docs-web/.next/static ./apps/docs-web/.next/static
COPY --from=build /app/apps/docs-web/public ./apps/docs-web/public
EXPOSE 8080
CMD ["node", "apps/docs-web/server.js"]
