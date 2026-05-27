import { Router } from 'express'
import { register, verifyMail } from '../controllers/auth.controller'
import { schema, validate } from '../middleware/validation.middleware';

const router = Router();

router.post('/register', validate(schema), register);

router.get('/verify', verifyMail);

export default router;
