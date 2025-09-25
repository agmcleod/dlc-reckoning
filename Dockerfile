FROM node:24.8-alpine

WORKDIR /app

COPY . /app

RUN npm install

RUN ls -l

CMD ["npm", "run", "dev"]
