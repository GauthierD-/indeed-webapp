FROM node:8.4.0-alpine

MAINTAINER Gauthier Deroo <g.deroo@gmail.com>

ENV DOCKER_USER node
ENV HOME /home/$DOCKER_USER
ENV PORT 8000

RUN apk add --no-cache make gcc g++ python ca-certificates openssl libc6-compat
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64
RUN chmod +x /usr/local/bin/dumb-init

WORKDIR $HOME

USER $DOCKER_USER

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]

COPY package.json .

RUN npm set progress=false && npm config set depth 0
RUN npm install --production

COPY config config/
COPY src src/

EXPOSE $PORT
CMD ["npm", "start"]
