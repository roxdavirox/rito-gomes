FROM node:16

WORKDIR /app

ENV PATH="./node_modules/.bin:$PATH"

COPY . . 

RUN npm install

RUN npm run build

EXPOSE 3100

CMD ["npm", "start"]
