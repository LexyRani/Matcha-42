import { RegisterDTO } from "../dto/register.dto";
import { validatePassword } from "../utils/password.utils";
import { ApiError } from "../utils/ApiError";
import { UserModel } from "../models/user.models";
import { TokenModel } from "../models/token.model";
import { sendEmail } from "../config/email";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// ----------- HELPERS -----------

const isAdult = (birthdate: string): boolean => {
    const today = new Date();
    const adultDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return new Date(birthdate) <= adultDate;
};

const validateRegisterPayload = async (payload: RegisterDTO): Promise<void> => {
    if (!payload.email || !payload.username)
        throw new ApiError(400, 'Missing required fields');
    if (await UserModel.findByUsername(payload.username))
        throw new ApiError(400, 'Username already exists');
    if (await UserModel.findByEmail(payload.email))
        throw new ApiError(400, 'Email already exists');
    if (!payload.birthdate || !isAdult(payload.birthdate))
        throw new ApiError(400, 'User must be at least 18 years old');
    validatePassword(payload.password);
};

const generateVerificationToken = (username: string): string => {
    if (!process.env.JWT_SECRET)
        throw new ApiError(500, 'JWT_SECRET not configured');
    return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
    if (!process.env.BACKEND_URL)
        throw new ApiError(500, 'BACKEND_URL not configured');
    const url = `${process.env.BACKEND_URL}/api/auth/verify?token=${token}`;
    await sendEmail(
        email,
        '✨ Vérification de ton compte Matcha',
        `
            <h1>Bienvenue sur Matcha !</h1>
            <p>Clique sur le lien ci-dessous pour vérifier ton compte :</p>
            <a href="${url}">Vérifier mon compte</a>
            <p>Ce lien expire dans 24h.</p>
        `
    );
};

// ----------- REGISTER -----------

const register = async (payload: RegisterDTO) => {
    await validateRegisterPayload(payload);

    const hashPassword = await bcrypt.hash(payload.password, 12);
    const result = await UserModel.createUser(
        payload.first_name,
        payload.last_name,
        payload.email,
        payload.username,
        hashPassword,
        payload.birthdate,
        payload.gender
    );

    const token = generateVerificationToken(payload.username);
    await TokenModel.createVerificationToken(result.user_id, token);
    await sendVerificationEmail(payload.email, token);

    return { message: 'Inscription réussie, vérifie ton email.' };
};

const verifyMail = async (token: string) => {
    const token_data = await TokenModel.findValidVerificationToken(token)
    if (!token_data)
        throw new ApiError(400, "Token invalid or expired");

    await UserModel.userIsVerify(token_data.user_id);

    await TokenModel.deleteToken(token);
    return { message: "Email vérifié avec succès" };
}

export default { register, verifyMail };
