FROM node:22-alpine AS build

RUN apk add gcompat
WORKDIR /web
COPY . .
RUN npm install typescript vite --global
RUN yarn install
RUN yarn global add vite typescript
RUN yarn run vite:build
ENTRYPOINT ["yarn", "run", "start"]

FROM nginx:1.25.4-alpine3.18

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /web/dist /var/www/html/
EXPOSE 3000
ENTRYPOINT ["nginx","-g","daemon off;"]