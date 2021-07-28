FROM node:alpine
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json .
COPY package-lock.json .
RUN npm install
EXPOSE 3000
COPY . .
CMD ["npm", "start"]