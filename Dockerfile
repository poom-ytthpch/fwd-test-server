FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --omit=dev

COPY . .

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

RUN npm config set strict-ssl false

RUN npm run prisma:gen

RUN npm run build

RUN ls -l dist/

EXPOSE 8000

CMD ["node", "dist/src/index.js"]

