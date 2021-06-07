FROM ringcentral/node:latest

ARG ENV

ENV ENV $env
ENV CURRENT_UID=$CURRENT_UID

RUN mkdir -p /api-tests
WORKDIR /api-tests
ADD . /api-tests

CMD ["npm", "test"]