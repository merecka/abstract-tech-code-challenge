FROM mhart/alpine-node:16
RUN apk add --no-cache git python3 make g++
WORKDIR /build
ADD . /build
RUN yarn


FROM mhart/alpine-node:slim-16
WORKDIR /
COPY --from=0 /build/node_modules /node_modules
