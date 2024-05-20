import express from 'express';
import type { Express } from 'express';

// // エラーハンドリングミドルウェアをインポート
import errorHandler from './middlewares/errorHandler';

// routesからCRUD操作をインポート(todoRotesは任意の名前)
import todoRoutes from './routes/todo';

const app: Express = express();
const PORT = 8080;

app.use(express.json());

// todoRoutesを使用
app.use('/', todoRoutes);

// errorHandlerを使用
app.use(errorHandler);

// サーバーを起動
app.listen(PORT, () => console.log(`server is runnnig on port ${PORT}`));
