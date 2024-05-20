import express from 'express';
import type { Express } from 'express';

// エラーハンドリングミドルウェアをインポート
import errorHandler from './middlewares/errorHandler';

// routesからCRUD操作をインポート(todoRoutesは任意の名前)
import todoRoutes from './routes/todoRoutes';

// ログイン認証機能をインポート
import session from 'express-session';
import crypto from 'crypto'; // 暗号化ライブラリをインポート
import passport from './middlewares/passport'; // passport.tsをインポート
import authRoutes from './routes/authRoutes'; // routesから認証機能関数をimport

const app: Express = express();
const PORT = 8080;

app.use(express.json()); // JSON形式のデータを受け取れるようにする

// 64バイトのランダムな文字列を生成して秘密鍵とする
const secretKey = crypto.randomBytes(64).toString('hex');

// セッション管理ミドルウェアを設定
app.use(
  session({
    secret: secretKey, // ランダムな秘密鍵を使用
    resave: false,
    saveUninitialized: false,
  })
);

// パスポートの初期化ミドルウェア
app.use(passport.initialize());
app.use(passport.session());

// 関数を使用するためのルーティング
app.use('/todo', todoRoutes); // todoRoutesを使用
app.use('/auth', authRoutes); // authRoutesを使用

// エラーハンドリングミドルウェアを使用
app.use(errorHandler); // errorHandlerを使用

// サーバーを起動
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
