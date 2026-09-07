# SSIL CMS API — Google Cloud Run
FROM node:20-slim

WORKDIR /app

ENV NODE_ENV=production
# Cloud Run sets PORT=8080 at runtime; EXPOSE documents the container port
ENV PORT=8080
ENV HOST=0.0.0.0

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY src ./src

# Non-root user (Cloud Run best practice)
RUN useradd --system --uid 1001 --create-home appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8080

# Cloud Run health checks hit /health
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||8080)+'/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "src/server.js"]
