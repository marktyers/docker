
# Running a Deno API in a Docker Container

clone the respository then run the following command in the project route:

```
docker compose watch
```

```
docker build -t api . && docker run -it -p 1993:1993 api
docker compose watch

docker exec -it everyware-api-1  sh
```

sync
rebuild
sync+restart

docker volume create neo4jdata

docker run \
    --name everyware-neo4j \
    --restart always \
    --publish=7474:7474 --publish=7687:7687 \
    --env NEO4J_AUTH=neo4j/Tg9rJv4bDf \
    --volume neo4jdata:/data \
    neo4j:5.23.0

http://localhost:7474/ = browser
http://localhost:7687 = API?

docker volume create mysqldata

$ docker run \
    --name everyware-mysql \
    -e MYSQL_ROOT_PASSWORD=Tg9rJv4bDf \
    mysql:9.0.1

docker volume create mosquittodata
docker volume create mosquittolog


docker run -it \
    --restart always \
    --publish 1883:1883 --publish 9001:9001 \
    --volume ./mosquitto/mosquitto.conf:/mosquitto/config/mosquitto.conf \
    --volume mosquittodata:/mosquitto/data \
    --volume mosquittolog:/mosquitto/log \
    eclipse-mosquitto:2.0.18

docker run -it \
 --name everyware-mosquitto \
 --publish 1883:1883 --publish 9001:9001 \
 eclipse-mosquitto


```
brew services start mysql
brew services stop mysql
brew services restart mysql
```