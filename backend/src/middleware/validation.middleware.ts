import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const schema = z.object({
	username: z.string()
	.min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
	.max(20, "Le nom d'utilisateur ne peut pas dépasser 20 caractères")
	.regex(
		/^[a-zA-Z][a-zA-Z0-9_-]*$/,
		"Le nom d'utilisateur doit commencer par une lettre et ne contenir que des lettres, chiffres, tirets et underscores"
	)
	.regex(
		/^(?!.*[_-]{2})/,
		"Le nom d'utilisateur ne peut pas contenir deux tirets ou underscores consécutifs"
	)
	.toLowerCase()
	.refine(
		(username) => !['admin', 'root', 'moderator', 'null', 'undefined'].includes(username),
		"Ce nom d'utilisateur est réservé"
	),
	password: z.string(), //TO DO: Définir sa taille, les caractères autorisés, normalement fait dans password.utils.ts
	email: z.email({ pattern: z.regexes.rfc5322Email }),
	first_name: z.string(),
	last_name: z.string(),
	gender: z.enum(['female', 'male', 'other']).optional(),
	birthdate: z.iso.date()
})

export const validate = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                error: 'Validation échouée',
                details: result.error.issues
            });
        }
        next();
    };
};
