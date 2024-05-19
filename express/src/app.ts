import express from 'express';
import type { Express } from 'express';
import type { Request, Response, NextFunction } from 'express';

// routesからCRUD操作をインポート(todoRotesは任意の名前)
import todoRoutes from './routes/todo';

const app: Express = express();
const PORT = 8080;

app.use(express.json());

// todoRoutesを使用
app.use('/', todoRoutes);

// エラーハンドリングミドルウェア
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
});

// サーバーを起動
app.listen(PORT, () => console.log(`server is runnnig on port ${PORT}`));
