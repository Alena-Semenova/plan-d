# Dockerfile для фронтенд-приложения

FROM node:20

# Рабочая директория
WORKDIR /app

COPY package*.json ./

# Переменная окружения
ENV NODE_ENV=development

# Зависимости с учетом devDependencies
RUN npm install --legacy-peer-deps

# Копирование всех файлов проекта
COPY . .

# Запуск
CMD ["npm", "run", "dev"]
