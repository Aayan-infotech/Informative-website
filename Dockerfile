# Use an official Node.js image as a base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container
COPY . .

# Install http-server globally
RUN npm install -g http-server

# Expose the port on which the HTTP server will run
EXPOSE 2026

# Command to run the HTTP server and serve the files
CMD [ "http-server", "-p", "2026" ]
