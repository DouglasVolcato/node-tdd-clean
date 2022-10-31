FROM node:19
WORKDIR /usr/src/node-tdd-clean
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 5000
CMD npm start