# We select node because nestjs needs node to run, also alpine because it's smaller image#
FROM node:20-alpine
# Set the working directory inside the container #
WORKDIR /app 
# Copy package.json and package-lock.json to the working directory to...#
COPY package*.json ./
# ...Install the dependencies #
RUN npm ci
# Copy the the whole application code to the container (working directory) #
COPY . .
# Build the nestjs application in the container, creates dist/ folder #
RUN npm run build
# Expose the port the app runs on #
EXPOSE 3001
# Command to run the application with hot reload in development #
CMD ["npm", "run", "dev"]
