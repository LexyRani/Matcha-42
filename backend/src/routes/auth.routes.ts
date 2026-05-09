import { Router } from 'express'
import { login, register } from '../controllers/auth.controller'
import {
			registerSchema,
			loginSchema,
			validate
		} from '../middleware/validation.middleware';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;
