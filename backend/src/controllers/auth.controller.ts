import { Request, Response, NextFunction } from "express";
import { RegisterDTO } from "../dto/register.dto";
import { LoginDTO } from "../dto/login.dto";
import authService from "../services/auth.services"


export const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const payload: RegisterDTO = req.body;

		const response = await authService.register(payload);

		return res.status(201).json(response);
	} catch (error: any) {
		next(error);
	}
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const payload: LoginDTO = req.body;

		// console.log("Login payload received in controller:", payload);

		const response = await authService.login(payload);

		return res.status(201).json(response);
	} catch (error: any) {
		next(error);
	}
};

export	default	register;
