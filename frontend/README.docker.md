# Build frontend

docker build -t {image name} .

#Run image

docker run -it -p 8080:80 {image name}

#Pull image

docker login --username={your username}
docker pull asw2019/frontend:{tag name}

#Push image

first of all, you need to tag the image

docker tag {image id} asw2019/frontend:{tag name}
docker push asw2019/frontend

