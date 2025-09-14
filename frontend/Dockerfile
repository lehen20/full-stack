FROM node:18-alpine

WORKDIR /app

# Copy package files
# COPY package*.json ./
COPY package.json package-lock.json* ./

# Install dependencies
# RUN npm ci --only=production
RUN npm install

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S reactjs -u 1001

# Change ownership of the /app directory to the nodejs user
RUN chown -R reactjs:nodejs /app
USER reactjs

EXPOSE 3000

CMD ["npm", "start"]