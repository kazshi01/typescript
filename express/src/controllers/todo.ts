import { RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// すべてのTODOを取得　(関数をエクスポート)
export const allTodos: RequestHandler = async (req, res, next) => {
  try {
    // 意図的にエラーを発生させる時は、下記コードのコメントアウトを外す
    // throw new Error('Something went wrong!');
    const getAllTodos = await prisma.todo.findMany();
    return res.json({ message: 'Todoを取得しました', タスク一覧: getAllTodos });
  } catch (error) {
    next(error);
  }
};

// TODOを作成　(関数をエクスポート)
export const createTodo: RequestHandler = async (req, res, next) => {
  try {
    const { title, isCompleted } = req.body;
    const newTodo = await prisma.todo.create({
      data: {
        title,
        isCompleted,
      },
    });
    return res.json({
      message: 'Todoを追加しました',
      追加したタスク: newTodo,
    });
  } catch (error) {
    next(error);
  }
};

// TODOを編集　(関数をエクスポート)
export const editTodo: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, isCompleted } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        isCompleted,
      },
    });
    return res.json({
      message: 'Todoを更新しました',
      更新したタスク: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
};

// TODOを削除　(関数をエクスポート)
export const deleteTodo: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deletedTodo = await prisma.todo.delete({
      where: { id },
    });
    return res.json({
      message: 'Todoを削除しました',
      削除したタスク: deletedTodo,
    });
  } catch (error) {
    next(error);
  }
};

// アプリケーション終了時にPrismaクライアントをクリーンアップ
const gracefulShutdown = async (signal: string) => {
  console.log(`Received ${signal}. Closing Prisma client...`);
  await prisma.$disconnect();
  console.log('Prisma client disconnected.');
  process.exit(0);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
