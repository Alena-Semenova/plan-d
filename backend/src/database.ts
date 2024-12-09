import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Переменные окружения

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
  throw new Error("Необходимые переменные окружения не установлены");
}

/**
 * Создание подключения к базе данных PostgreSQL
 * @returns {Sequelize}
 */

const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  host: 'database',
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
const connectWithRetry = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL соединение установлено');
  } catch (err) {
    console.error('Не удалось подключиться к PostgreSQL:', err);
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

/**
 * Проверка соединения с базой данных PostgreSQL каждую 1 минуту
 */
setInterval(() => {
  sequelize.query('SELECT 1+1 AS result')
    .then(() => console.log('Connection is alive'))
    .catch(err => console.error('Connection lost:', err));
}, 60000);

export default sequelize;  