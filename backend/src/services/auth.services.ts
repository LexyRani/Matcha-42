import { RegisterDTO } from "../dto/register.dto";
import { validatePassword } from "../utils/password.utils";
import { ApiError } from "../utils/ApiError";
import { UserModel } from "../models/user.models";
import { TokenModel } from "../models/token.model";
import { sendEmail } from "../config/email";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { LoginDTO } from "../dto/login.dto";

// ----------- HELPERS -----------

const validateRegisterPayload = async (payload: RegisterDTO): Promise<void> => {
    if (!payload.email || !payload.username)
        throw new ApiError(400, 'Missing required fields');
    if (await UserModel.findByUsername(payload.username))
        throw new ApiError(400, 'Username already exists');
    if (await UserModel.findByEmail(payload.email))
        throw new ApiError(400, 'Email already exists');
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
    // console.log("Registering user with payload:", payload);
    await validateRegisterPayload(payload);

    const hashPassword = await bcrypt.hash(payload.password, 12);
    const token = generateVerificationToken(payload.username);

    const result = await UserModel.createUser(
        payload.first_name,
        payload.last_name,
        payload.email,
        payload.username,
        hashPassword
    );

    await TokenModel.createVerificationToken(result.user_id, token);
    await sendVerificationEmail(payload.email, token);

    return { message: 'Inscription réussie, vérifie ton email.' };
};

// ----------- LOGIN -----------

const login = async (payload: LoginDTO) => {
    return { message: 'Inscription réussie, vérifie ton email.' };
};
export default { register, login };
