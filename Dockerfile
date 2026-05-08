# Build stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production --legacy-peer-deps
# Copy the build output from the build stage
COPY --from=build /app/dist ./dist
# Copy the server file
COPY server.js ./
# Expose the port
EXPOSE 3000
# Run the server
CMD ["node", "server.js"]
