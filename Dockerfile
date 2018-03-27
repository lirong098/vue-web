FROM daocloud.io/node:8

ENV LANG C.UTF-8
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo Asia/Shanghai > /etc/timezone

RUN mkdir -p /app
COPY dist /app/dist
COPY server /app
WORKDIR /app

RUN ls -l

RUN npm install

EXPOSE 80
CMD [ "npm", "start" ]
