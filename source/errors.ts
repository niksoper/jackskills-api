import type { ErrorRequestHandler, NextFunction } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  console.error('IT IS ME THE ERROR', err);
  res.status(500).send('Something broke!');
};
