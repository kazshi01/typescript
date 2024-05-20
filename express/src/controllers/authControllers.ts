import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import passport from '../middlewares/passport'; // passport.tsをインポート

const prisma = new PrismaClient();

// ユーザーの登録関数
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    res.json({ message: 'ユーザー登録が完了しました', user: newUser });
  } catch (error) {
    next(error);
  }
};

// ログイン関数
export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    (err: Error | null, user: Express.User | false, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({ message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.json({ message: 'ログインに成功しました', user });
      });
    }
  )(req, res, next);
};

// ログアウト関数
export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({ message: 'ログアウトしました' });
  });
};
