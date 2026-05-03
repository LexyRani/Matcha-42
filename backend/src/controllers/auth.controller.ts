import { Request, Response, NextFunction } from "express";
import { RegisterDTO } from "../dto/register.dto";
import authService from "../services/auth.services"


export const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const payload: RegisterDTO = req.body;

		const response = await authService.register(payload);

		return res.status(201).json({
			message: 'User registered successfully',
			user: {
				email: payload.email,
				username: payload.username,
				passwordHash: response
			}
		});
	} catch (error: any) {
		next(error);
	}
};

export	default	register;
