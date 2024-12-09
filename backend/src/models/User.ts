import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

/**
 * Интерфейс IUser
 * @interface IUserAttributes
 * @property {number} id - id пользователя
 * @property {string} username - имя пользователя
 * @property {string} password - пароль пользователя
 * @property {string} [email] - email пользователя
 * @property {string} diabetesType - тип диабета
 * @property {number} [age] - возраст пользователя
 * @property {string} [gender] - пол пользователя
 * @property {number} [height] - рост пользователя
 * @property {number} [weight] - вес пользователя 
 */
interface IUserAttributes {
  id: number;
  username: string;
  password: string;
  email?: string;
  diabetesType?: 'type 1' | 'type 2' | 'gestational' | 'other';
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
}

// Опциональные свойства
interface IUserCreationAttributes extends Optional<IUserAttributes, 'id'> { }

/**
 * Модель пользователя
 * @class User
 * @extends {Model<IUserAttributes, IUserCreationAttributes>}
 * @implements {IUserAttributes}
 * @property {number} id - id пользователя
 * @property {string} username - имя пользователя
 * @property {string} password - пароль пользователя
 * @property {string} [email] - email пользователя
 * @property {string} diabetesType - тип диабета
 * @property {number} [age] - возраст пользователя
 * @property {string} [gender] - пол пользователя
 * @property {number} [height] - рост пользователя
 * @property {number} [weight] - вес пользователя 
 */
class User extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public email?: string;
  public diabetesType?: 'type 1' | 'type 2' | 'gestational' | 'other';
  public age?: number;
  public gender?: string;
  public height?: number;
  public weight?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/**
 * Инициализация модели пользователя
 */
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: true, unique: true },
  diabetesType: { type: DataTypes.ENUM('type 1', 'type 2', 'gestational', 'other'), allowNull: true },
  age: { type: DataTypes.INTEGER, allowNull: true },
  gender: { type: DataTypes.STRING, allowNull: true },
  height: { type: DataTypes.INTEGER, allowNull: true },
  weight: { type: DataTypes.INTEGER, allowNull: true },
}, {
  sequelize,
  tableName: 'users',
});

export default User;
