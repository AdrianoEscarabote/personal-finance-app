FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:18

WORKDIR /app

COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/package*.json ./
COPY --from=build /app/next.config.ts ./
COPY --from=build /app/tailwind.config.ts ./

RUN npm install --production --legacy-peer-deps

EXPOSE 3000

CMD ["npx", "next", "start", "-p", "3000"]