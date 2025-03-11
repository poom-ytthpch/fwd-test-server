#### Setup

1. `$ npm install`
2. create .env , example below <br/>
`DATABASE_URL=  "postgresql://user:passwd@localhost:5432/fwd?schema=public"` <br/>
`BASE_URL="https://fgt9jf-8080.csb.app"` <br/>
`API_KEY="1399da23-715d-42af-beb3-2008fd652622"` <br/>
`PORT=8000` <br/>
`API_VERSION=v1`
3. `$ npm run migrate:dev`
4. `$ npm run prisma:gen`
5. `$ npm run dev`


#### Test
`$ npm run jest:test`

#### Build
1. create database.env example below
`POSTGRES_USER=user` <br/>
`POSTGRES_PASSWORD=passwd` <br/>
`POSTGRES_DB=fwd` <br/>
2. `$ docker-compose up -d --build`
3. `$ npm run migrate:dev`
