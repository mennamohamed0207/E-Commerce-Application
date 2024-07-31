FROM node:20
WORKDIR /Ecommerce
COPY package.json /Ecommerce
RUN npm install
COPY . .
EXPOSE 4000
CMD ["nodemon", "server.js"]