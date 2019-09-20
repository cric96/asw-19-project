FROM asw2019/base-node-server:latest

COPY . .
#install project dependecies
RUN ./build.sh
EXPOSE 3000

ENTRYPOINT /run.sh
