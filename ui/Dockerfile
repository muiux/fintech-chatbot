FROM node:20

WORKDIR /usr/src/ui

COPY ./package.json ./package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]
