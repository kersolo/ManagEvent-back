FROM node:20.14.0-alpine3.20 AS build_stage

ENV TZ=Europe/Paris

RUN apk --update add --no-cache tzdata \
    && cp /usr/share/zoneinfo/Europe/Paris /etc/localtime \
    && echo "Europe/Paris" > /etc/timezone\
    && apk del tzdata

WORKDIR /app

COPY . /app

RUN npm install

# COPY . .

RUN npx prisma generate

RUN npm run build


FROM build_stage AS production_stage

COPY --from=build_stage /app/node_modules ./node_modules
COPY --from=build_stage /app/package.json ./package.json
COPY --from=build_stage /app/dist ./dist

# EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
