# Use LTS Node 10 base image
FROM node:10

# Create application's home directory
WORKDIR /usr/src/app

# Copy all package* files into WORKDIR
COPY package*.json ./

# Install all dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose container's port
EXPOSE 3000

# Start client server
CMD ["npm", "start"]
