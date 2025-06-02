# Step 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Step 2: Serve the built app using a Node-based static file server
FROM node:20-alpine AS runner

WORKDIR /app

# Install a simple static file server
RUN npm install -g serve

# Copy build output from builder
COPY --from=builder /app/dist ./dist

# Expose the port serve uses by default
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "dist", "-l", "3000"]
