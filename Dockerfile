FROM node:10

COPY . .

#install project dependecies
RUN ./build.sh
EXPOSE 3000

CMD ["bash", "./run.sh"]
