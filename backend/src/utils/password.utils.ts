import zxcvbn from 'zxcvbn-typescript';
import { ApiError } from './ApiError';
import { PASSWORD_BLACKLIST } from './passwordBlacklist';

// validatePassword vérifie la force du mot de passe en utilisant zxcvbn
// et lance une ApiError si le mot de passe est trop faible ou trop court.

export const validatePassword = (password: string): void => {
  if (PASSWORD_BLACKLIST.includes(password.toLowerCase()))
        throw new ApiError(400, 'Password is too common');
  const score = zxcvbn(password).score;

  // ⚠️ Ces règles doivent rester synchronisées avec le schema Zod dans validation.middleware.ts
  if (password.length < 10)
    throw new ApiError(400, 'Password must be at least 10 characters long');

  if (score < 3)
    throw new ApiError(400, 'Password is too weak');
};
