FROM node:8.9.0
RUN mkdir -p /usr/src/app
RUN chmod 777 /usr/src/app
WORKDIR /usr/src/app
ENV NODE_ENV production
ENV OPENSHIFT_NODEJS_PORT 3000
COPY package.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY . /usr/src/app
CMD [ "npm", "start" ]
EXPOSE 3000

