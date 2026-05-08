# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
# Since we might have peer dependency issues, we'll use --legacy-peer-deps
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built React app
COPY --from=build /app/dist /usr/share/nginx/html
# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
