#### Setup

1. `$ npm install`
2. create .env file example below <br/>
`DATABASE_URL=  "postgresql://user:passwd@localhost:5432/fwd?schema=public"` <br/>
`BASE_URL="https://fgt9jf-8080.csb.app"` <br/>
`API_KEY="1399da23-715d-42af-beb3-2008fd652622"` <br/>
`PORT=8000` <br/>
3. `$ npm run migrate:dev`
4. `$ npm run prisma:gen`
5. `$ npm run dev`


#### Test
`$ npm run jest:test`
