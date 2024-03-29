# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "builder"
FROM node:lts AS builder
# Prevent Husky from installing git hooks during build
ENV HUSKY 0
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .
# install node modules and build assets
RUN npm ci && npm run build --prod

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist/show-dancer .
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Insert environment variables into the frontend build
# Containers run nginx with global directives and daemon off
ENTRYPOINT envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js &&\
           nginx -g "daemon off;"
