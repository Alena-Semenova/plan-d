import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Переменные окружения

/**
 * Создание подключения к базе данных PostgreSQL
 * @returns {Sequelize}
 */
const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

/**
 * Проверка соединения с базой данных PostgreSQL
 * @returns {void}
 * @throws {Error}
 */
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL соединение установлено');
  })
  .catch(err => {
    console.error('Не удалось подключиться к PostgreSQL:', err);
  });

  // Проверка соединения (1 мин)
setInterval(() => {
    sequelize.query('SELECT 1+1 AS result')
      .then(() => console.log('Connection is alive'))
      .catch(err => console.error('Connection lost:', err));
  }, 60000);

export default sequelize; 