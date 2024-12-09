import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User'; 

const router = Router();

/**
 * POST /register
 * Регистрация нового пользователя
 * 
 * Request body:
 * {
 *   "username": "string",
 *   "password": "string"
 * }
 * 
 * Response:
 * {
 *   "id": "number",
 *   "username": "string",
 *   "createdAt": "string",
 *   "updatedAt": "string"
 * }
 */
router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Проверка на существование пользователя с таким же именем
  try {
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return res.status(400).send('Пользователь с таким именем уже существует');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword
    });

    res.status(201).send('Пользователь успешно зарегистрирован');
    res.json(newUser);
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    res.status(500).send('Ошибка при регистрации пользователя');
  }
});


/**
 * POST /login
 * Вход пользователя
 * 
 * Request body:
 * {
 *   "username": "string",
 *   "password": "string"
 * }
 * 
 * Response:
 * {
 *   "token": "string"
 * }
 */
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).send('Неверное имя пользователя или пароль');
    }

    // Проверка наличия JWT_SECRET
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).send('Ошибка при входе. JWT Secret не установлен.'); 
    }

    // токен
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
