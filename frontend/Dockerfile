FROM node:18-alpine as build

WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Production environment
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]