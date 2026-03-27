import zxcvbn from 'zxcvbn-typescript';
import { ApiError } from './ApiError';

// validatePassword vérifie la force du mot de passe en utilisant zxcvbn
// et lance une ApiError si le mot de passe est trop faible ou trop court.

export const validatePassword = (password: string): void => {
  const score = zxcvbn(password).score;

  if (password.length < 10)
    throw new ApiError(400, 'Password must be at least 10 characters long');

  if (score < 3)
    throw new ApiError(400, 'Password is too weak');
};
