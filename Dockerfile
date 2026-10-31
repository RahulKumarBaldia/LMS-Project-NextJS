# ---- Stage 1: Build ----
FROM node:20-alpine AS builder
WORKDIR /app

# Pehle sirf package files copy karo, taaki dependencies cache ho jaayein
COPY package*.json ./
RUN npm install

# Ab poora project copy karo aur build karo
COPY . .
RUN npm run build

# ---- Stage 2: Run (Production) ----
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Sirf zaroori files le rahe hain builder stage se
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]