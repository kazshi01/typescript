import { Router } from 'express';

// controllerからCRUD操作関数をインポート
import {
  allTodos,
  createTodo,
  editTodo,
  deleteTodo,
} from '../controllers/todoControllers';
import isAuthenticated from '../middlewares/isAuthenticated';

const router = Router();

// callback関数を使用せず、別ファイルのそれぞれの関数へルーティング
router.get('/allTodos', isAuthenticated, allTodos);
router.post('/createTodo', isAuthenticated, createTodo);
router.put('/editTodo/:id', isAuthenticated, editTodo);
router.delete('/deleteTodo/:id', isAuthenticated, deleteTodo);

// 他のファイルで使用できるようにrouterをエクスポート
export default router;
