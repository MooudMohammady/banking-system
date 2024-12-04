FROM node:23alpine3.19
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]