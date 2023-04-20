# STAGE 1: Install dependencies and build the app
FROM node:alpine
WORKDIR /dispatch
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

# RUN npm run build
CMD [ "npm", "start" ]
