import { Request, Response, NextFunction } from "express";
import { RegisterDTO } from "../dto/register.dto";
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

export const verifyMail = async (req: Request, res: Response) => {
	const token = req.query.token as string;
    if (!token) return res.status(400).json({ error: "Token manquant" });
    const result = await authService.verifyMail(token);
    res.json(result);
}

export default register;
