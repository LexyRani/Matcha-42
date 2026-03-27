import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

// errorHandler va être utilisé pour gérer les erreurs dans toute l'application.
// Il vérifie si l'erreur est une instance de ApiError et renvoie une réponse appropriée.
// Sinon, il renvoie une erreur générique 500.

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
};
