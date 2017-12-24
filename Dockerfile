FROM node@sha256:8b8c1cb9a647587dc4fa21b4a857352e67a9e8ae623e29841d6672f2fb56255b
RUN mkdir -p /usr/src/app
RUN chmod 777 /usr/src/app
WORKDIR /usr/src/app
ENV NODE_ENV production
ENV OPENSHIFT_NODEJS_PORT 8080
COPY package.json /usr/src/app/
RUN npm install && npm cache clean --force
COPY . /usr/src/app
CMD [ "npm", "start" ]
EXPOSE 8080
ENV "OPENSHIFT_BUILD_NAME"="backoffice-11" "OPENSHIFT_BUILD_NAMESPACE"="e-brochure"
ENV "OPENSHIFT_BUILD_NAME"="brochure-61" "OPENSHIFT_BUILD_NAMESPACE"="e-brochure"