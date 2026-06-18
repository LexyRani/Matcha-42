import authServices, { sendEmailWithRetry } from '../../services/auth.services';
import { UserModel } from '../../models/user.models';
import { TokenModel } from '../../models/token.model';
import { ApiError } from '../../utils/ApiError';
import { sendEmail } from '../../config/email';

beforeAll(() => {
    process.env.JWT_SECRET = 'test_secret';
    process.env.BACKEND_URL = 'http://localhost:3000';
});

jest.mock('../../models/user.models', () => ({
    UserModel: {
        findByUsername: jest.fn(),
        findByEmail: jest.fn(),
        createUser: jest.fn(),
        userIsVerify: jest.fn()
    }
}));

jest.mock('../../config/email', () => ({
    sendEmail: jest.fn().mockResolvedValue(undefined)
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn().mockReturnValue('fake_token'),
    verify: jest.fn()
}));

jest.mock('../../models/token.model', () => ({
    TokenModel: {
        createVerificationToken: jest.fn(),
        findValidVerificationToken: jest.fn(),
        deleteToken: jest.fn()
    }
}));

describe('register - username', () => {

    it('should throw 400 if username is missing', async () => {
        await expect(authServices.register({
            username: '',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        }))
        .rejects
        .toThrow(new ApiError(400, 'Missing required fields'));
    });

    it('should throw 400 if username already exists', async () => {
        (UserModel.findByUsername as jest.Mock).mockResolvedValueOnce({ user_id: 1 });

        await expect(authServices.register({
            username: 'johndoe',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        }))
        .rejects
        .toThrow(new ApiError(400, 'Username already exists'));
    });

});

describe ('register - email', () => {

    it('should throw 400 if email is missing', async () => {
        await expect(authServices.register({
            username: 'johndoe',
            email: '',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        }))
        .rejects
        .toThrow(new ApiError(400, 'Missing required fields'));
    });

    it('should throw 400 if email already exists', async () => {
        (UserModel.findByEmail as jest.Mock).mockResolvedValueOnce({ user_id: 1 });

        await expect(authServices.register({
            username: 'johndoe',
            email: 'john.doe@example.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        }))
        .rejects
        .toThrow(new ApiError(400, 'Email already exists'));
    });

});

describe('register - birthdate', () => {
    it('should throw 400 if user is under 18', async () => {
        const today = new Date();
        const underageDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate()).toISOString().split('T')[0];

        await expect(authServices.register({
            username: 'johndoe',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: underageDate,
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        }))
        .rejects
        .toThrow(new ApiError(400, 'User must be at least 18 years old'));
    });

});

describe('register - password', () => {

    it('should throw 400 if password is too weak', async () => {
        await expect(authServices.register({
            username: 'johndoe',
            email: 'test@test.com',
            password: 'weakweakweak',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        }))
        .rejects
        .toThrow(new ApiError(400, 'Password is too weak'));
    });

});

describe('register - success', () => {

    it('should register successfully with valid payload', async () => {
        (UserModel.createUser as jest.Mock).mockResolvedValueOnce({ 
            user_id: 1, 
            username: 'johnnydoe' 
        });

        (TokenModel.createVerificationToken as jest.Mock).mockResolvedValueOnce(undefined);

        const response = await authServices.register({
            username: 'johnnydoe',
            email: 'johnny@test.com',
            password: 'P@ssw0rd42J0yfull',
            birthdate: '1999-01-01',
            first_name: 'Johnny',
            last_name: 'Doe',
            gender: 'male'
        });

        expect(response).toEqual({ message: 'Inscription réussie, vérifie ton email.' });
    });

});

describe('verifyMail', () => {

    it('should throw 400 if token not found in DB', async () => {
        (TokenModel.findValidVerificationToken as jest.Mock).mockResolvedValueOnce(null); // ← simule "pas trouvé"

        await expect(authServices.verifyMail('valid-token'))
            .rejects
            .toThrow(new ApiError(400, 'Token invalid or expired'));
    });

    it('should throw 400 if token expires', async () => {
        (TokenModel.findValidVerificationToken as jest.Mock).mockResolvedValueOnce(null); // expiré = pas trouvé pour le service

        await expect(authServices.verifyMail('valid-token'))
            .rejects
            .toThrow(new ApiError(400, 'Token invalid or expired'));
    });

    it('should mark user as verified', async () => {
        (TokenModel.findValidVerificationToken as jest.Mock).mockResolvedValueOnce({ 
            user_id: 1, 
            email: 'johndoe@test.com', 
            is_verified: false 
        });

        (UserModel.userIsVerify as jest.Mock).mockResolvedValueOnce(undefined);
        (TokenModel.deleteToken as jest.Mock).mockResolvedValueOnce(undefined);

        await authServices.verifyMail('valid-token');

        expect(UserModel.userIsVerify).toHaveBeenCalledWith(1);
    });

    it('should delete token after verification', async () => {
        (TokenModel.findValidVerificationToken as jest.Mock).mockResolvedValueOnce({ 
            user_id: 1, 
            email: 'johndoe@test.com', 
            is_verified: false 
        });

        (TokenModel.deleteToken as jest.Mock).mockResolvedValueOnce(undefined);

        await authServices.verifyMail('valid-token');

        expect(TokenModel.deleteToken).toHaveBeenCalledWith('valid-token');
    });

    it('should return success message after verification', async () => {
        (TokenModel.findValidVerificationToken as jest.Mock).mockResolvedValueOnce({ 
            user_id: 1, 
            email: 'johndoe@test.com', 
            is_verified: false 
        });

        (UserModel.userIsVerify as jest.Mock).mockResolvedValueOnce(undefined);

        (TokenModel.deleteToken as jest.Mock).mockResolvedValueOnce(undefined);

        const response = await authServices.verifyMail('valid-token');
        expect(response).toEqual({ message: 'Email vérifié avec succès' });
    });

});

describe('sendEmailWithRetry', () => {

    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    it('should retry and succeed on second attempt', async () => {
        const sendEmailMock = sendEmail as jest.Mock;

        sendEmailMock
            .mockRejectedValueOnce(new Error('SMTP timeout'))
            .mockResolvedValueOnce({ messageId: '123' });

        const promise = sendEmailWithRetry('test@test.com', 'token123');

        await jest.advanceTimersByTimeAsync(1000);
        await expect(promise).resolves.toBeUndefined();

        expect(sendEmailMock).toHaveBeenCalledTimes(2);
    });

    it('should fail after max retries', async () => {
        const sendEmailMock = sendEmail as jest.Mock;
        sendEmailMock.mockRejectedValue(new Error('SMTP down'));

        const promise = sendEmailWithRetry('test@test.com', 'token123', 3);

        await jest.advanceTimersByTimeAsync(1000 + 2000);
        await expect(promise).rejects.toThrow('SMTP down');

        expect(sendEmailMock).toHaveBeenCalledTimes(3);
    });

    it('should respect exponential backoff timing', async () => {
        const sendEmailMock = sendEmail as jest.Mock;
        sendEmailMock
            .mockRejectedValueOnce(new Error('Error 1'))
            .mockRejectedValueOnce(new Error('Error 2'))
            .mockResolvedValueOnce({ messageId: '123' });

        const promise = sendEmailWithRetry('test@test.com', 'token123');

        expect(sendEmailMock).toHaveBeenCalledTimes(1);

        await jest.advanceTimersByTimeAsync(1000);
        expect(sendEmailMock).toHaveBeenCalledTimes(2);

        await jest.advanceTimersByTimeAsync(2000);
        expect(sendEmailMock).toHaveBeenCalledTimes(3);

        await expect(promise).resolves.toBeUndefined();
    });
});
