# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the entire project to the working directory inside the container
COPY . .


# Expose the port that the app will run on
EXPOSE 3000

# Set the environment variable for production
ENV NODE_ENV=production

# Run the app when the container starts
CMD ["npm", "start"]
