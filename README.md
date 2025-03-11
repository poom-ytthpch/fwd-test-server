####Setup

1. `$ npm install`
2. create .env file example below
 		DATABASE_URL=  "postgresql://user:passwd@localhost:5432/fwd?schema=public"
		BASE_URL="https://fgt9jf-8080.csb.app"
		API_KEY="1399da23-715d-42af-beb3-2008fd652622"
		PORT=8000
		TOKEN_KEY="myVeryStrongPassword"
3. `$ npm run migrate:dev`
4. `$ npm run prisma:gen`
5. `$ npm run dev`


####Test
`$ npm run jest:test`
