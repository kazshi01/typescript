import { Router } from 'express';
import { register, login, logout } from '../controllers/authControllers';

const router = Router();

// callback関数を使用せず、別ファイルのそれぞれの関数へルーティング
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
