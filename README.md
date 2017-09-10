# indeed-webapp

### How to launch

#### Client:

```shell
cd client-app && npm start
```

#### Server
```shell
mkdir ~/data/redis
cd server
docker build -t indeed-app .
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up
```
