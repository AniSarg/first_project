git pull https://github.com/AniSarg/first_project.git
cd techworld-js-docker-demo-app
docker login
docker build -t anilag/web-app .
docker tag anilag/web-app anilag/web-app:v1
docker push anilag/web-app:v1
docker-compose up  -d