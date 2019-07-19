# Supported node version: 12, 12.2.0, 12.5.0
FROM node:12

# Creating the directory to setup docker image in.
RUN mkdir -p /app
WORKDIR /app

# Installing node dependencies
COPY ./app/package.json .
RUN npm install
COPY ./app .

# PORT to run docker container on
EXPOSE 4000
# Commands to run the node app
CMD ["npm", "start"]
