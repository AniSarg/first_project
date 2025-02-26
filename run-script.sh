git clone https://github.com/AniSarg/first_project.git
cd techworld-js-docker-demo-app
#echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
#docker build -t web-app .
#docker tag web-app anilag/web-app:v1
#docker push anilag/web-app:v1
docker-compose up  -d
