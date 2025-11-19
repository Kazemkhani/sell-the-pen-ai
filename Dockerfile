# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Accept build arguments from Railway
ARG VITE_DUMMY=false
ARG VITE_API_BASE_URL
ARG VITE_VAPI_PUBLIC_KEY
ARG VITE_VAPI_ASSISTANT_ID
ARG VITE_MAX_CALL_DURATION_MINUTES=5

# Make them available as env vars during build
ENV VITE_DUMMY=$VITE_DUMMY
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_VAPI_PUBLIC_KEY=$VITE_VAPI_PUBLIC_KEY
ENV VITE_VAPI_ASSISTANT_ID=$VITE_VAPI_ASSISTANT_ID
ENV VITE_MAX_CALL_DURATION_MINUTES=$VITE_MAX_CALL_DURATION_MINUTES

# Build the app (Vite will now see the env vars)
RUN npm run build

# Production stage
FROM nginx:alpine

# Install curl for healthcheck
RUN apk add --no-cache curl

# Copy built files to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config (we'll create this next)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
