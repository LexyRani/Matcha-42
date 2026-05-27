import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';

const router = Router();

router.get('/', (req: Request, res: Response) => {
	res.json({
		message: 'Welcome to Matcha API',
		version: '1.0',
		endpoints: ['/auth']
	});
});

router.get('/hello', (req: Request, res: Response) => {
	res.json({ message: 'Hello from Matcha API' });
});

router.use('/auth', authRoutes);

export default router;
