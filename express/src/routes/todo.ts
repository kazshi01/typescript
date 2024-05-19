import { Router } from 'express';

// controllerからCRUD操作関数をインポート
import {
  allTodos,
  createTodo,
  editTodo,
  deleteTodo,
} from '../controllers/todo';

const router = Router();

// callback関数を使用せず、別ファイルのそれぞれの関数へルーティング
router.get('/allTodos', allTodos);
router.post('/createTodo', createTodo);
router.put('/editTodo/:id', editTodo);
router.delete('/deleteTodo/:id', deleteTodo);

// 他のファイルで使用できるようにrouterをエクスポート
export default router;
