import { RegisterDTO } from "../dto/register.dto";
import { validatePassword } from "../utils/password.utils";
import { ApiError } from "../utils/ApiError";
import { UserModel } from "../models/user.models";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TokenModel } from "../models/token.model";
import { sendEmail } from "../config/email";

// ----------- REGISTER -----------

function isAdult(birthdate: string): boolean {
	const today = new Date();
	const adultDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
	return new Date(birthdate) <= adultDate;
}

// On doit vérifier l'email, l'username et le mdp
// On doit aussi vérifier que l'utilisateur a au moins 18 ans
// Et le reste, c'est à dire le prénom et le nom de famille ne sont pas à vérifier, car ils sont optionnels

const register = async (payload: RegisterDTO) => {

	if (!payload.email || !payload.username)
		throw new ApiError(400, 'Missing required fields');


	if (await UserModel.findByUsername(payload.username))
		throw new ApiError(400, 'Username already exists');
	else if (await UserModel.findByEmail(payload.email))
		throw new ApiError(400, 'Email already exists');
	else if (!payload.birthdate || !isAdult(payload.birthdate!))
		throw new ApiError(400, 'User must be at least 18 years old');

	validatePassword(payload.password);
	const hashPassword = await bcrypt.hash(payload.password, 12)

	const token = jwt.sign(
		{ username: payload.username },
		process.env.JWT_SECRET!,
		{ expiresIn: '24h' }
	);

	// TODO: Faire la sauvegarde de l'utilisateur en BDD
	// (first_name: string, last_name: string, username: string, email: string, password: string, birthdate: string, gender: string)
	const result = await UserModel.createUser(payload.first_name, payload.last_name, payload.email, payload.username, hashPassword, payload.birthdate, payload.gender)
	await TokenModel.createVerificationToken(result.user_id, token);
	await sendEmail(
		payload.email,
		'✨ Vérification de ton compte Matcha',
		`
			<h1>Bienvenue sur Matcha !</h1>
			<p>Clique sur le lien ci-dessous pour vérifier ton compte :</p>
			<a href="${process.env.BACKEND_URL}/api/auth/verify?token=${token}">
				Vérifier mon compte
			</a>
			<p>Ce lien expire dans 24h.</p>
		`
	);

	return { message: 'Inscription réussie, vérifie ton email.' };
}

export default { register };
