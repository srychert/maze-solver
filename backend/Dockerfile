FROM node:19-alpine

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci

COPY . .
RUN npm run build

# Set the env to "production"
ENV NODE_ENV production

# Expose the port on which the app will be running
EXPOSE 5000

# Start the app
CMD [ "node", "dist/index.js" ]