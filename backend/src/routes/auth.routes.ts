import { Router } from 'express'
import { register } from '../controllers/auth.controller'
import { schema, validate } from '../middleware/validation.middleware';

const router = Router();

router.post('/register', validate(schema), register);

export default router;
