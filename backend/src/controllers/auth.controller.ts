import { Router, Request, Response } from "express";
import { RegisterDTO } from "../dto/register.dto";
import authService from "../services/auth.services"

const router = Router();

// email
// username
// lastname
// firstname
// passwordhash

export const register = async (req: Request, res: Response) => {
	try {
		const payload: RegisterDTO = req.body;

		if (!payload.email || !payload.username || !payload.password) {
			return res.status(400).json({
				error: 'Missing required fields'
			});
		}

		const response = await authService.register(payload);

		return res.status(201).json({
			message: 'User registered successfully',
			user: {
				email: payload.email,
				username: payload.username,
				password: payload.password,
				passwordHash: response
			}
		});
	} catch (error) {
		return res.status(500).json({
			error: 'Internal server error'
		});
	}
};

export	default	register;
