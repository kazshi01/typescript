import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ユーザー情報をデータベースから取得
// ローカル認証のためのPassportの設定
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // ユーザー名でユーザーを検索
      const user = await prisma.user.findUnique({
        where: { username },
      });
      if (!user) {
        return done(null, false, { message: 'ユーザー名が不正です' });
      }
      // パスワードを比較
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'パスワードが不正です' });
      }
      // 認証成功
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// ユーザーIDをシリアライズしてセッションに保存
passport.serializeUser((user, done) => {
  done(null, (user as any).id);
});

// セッションからユーザーIDをデシリアライズしてユーザーオブジェクトを取得
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
