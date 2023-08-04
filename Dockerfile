# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:18 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if using Yarn) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Angular app
RUN npm run build

# Use the official Nginx image as the base image for serving the app
FROM nginx:alpine

# Copy the built Angular app from the previous stage to Nginx's default public directory
COPY --from=build /app/dist/task_app /usr/share/nginx/html

# Expose the port that Nginx listens on (default: 80)
EXPOSE 80

# Start Nginx when the container is run
CMD ["nginx", "-g", "daemon off;"]
