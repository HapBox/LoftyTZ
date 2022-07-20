FROM node:14.18.2-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

# Установка зависимостей
RUN yarn install --frozen-lockfile

# Копируем 
COPY tsconfig.json ./
COPY src ./src/
COPY .sequelizerc ./

# Сборка проекта
RUN yarn tsc

#Команда для запуска сервера внутри контейнера
CMD [ "yarn", "global-stand" ]