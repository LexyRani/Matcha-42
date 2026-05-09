import authServices from '../../services/auth.services';
import { ApiError } from '../../utils/ApiError';

beforeAll(() => {
    process.env.JWT_SECRET = 'test_secret';
    process.env.BACKEND_URL = 'http://localhost:3000';
});

jest.mock('../../database/connectionDb', () => ({
    default: { query: jest.fn() }
}));

jest.mock('../../models/user.models', () => ({
    UserModel: {
        findByUsername: jest.fn().mockResolvedValue(null),
        findByEmail: jest.fn().mockResolvedValue(null),
        createUser: jest.fn().mockResolvedValue({ user_id: 1 })
    }
}));

jest.mock('../../models/token.model', () => ({
    TokenModel: {
        createVerificationToken: jest.fn().mockResolvedValue(undefined)
    }
}));

jest.mock('../../config/email', () => ({
    sendEmail: jest.fn().mockResolvedValue(undefined)
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn().mockReturnValue('fake_token'),
    verify: jest.fn()
}));

describe('register - username', () => {

    it('should throw 400 if username is missing', async () => {
        await expect(authServices.register({
            username: '',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            first_name: 'John',
            last_name: 'Doe'
        }))
        .rejects
        .toThrow(new ApiError(400, 'Missing required fields'));
    });

    it('should throw 400 if username already exists', async () => {
        const { UserModel } = await import('../../models/user.models');
        (UserModel.findByUsername as jest.Mock).mockResolvedValueOnce({ user_id: 1 });

        await expect(authServices.register({
            username: 'johndoe',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            first_name: 'John',
            last_name: 'Doe'
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
            first_name: 'John',
            last_name: 'Doe'
        }))
        .rejects
        .toThrow(new ApiError(400, 'Missing required fields'));
    });

    it('should throw 400 if email already exists', async () => {
        const { UserModel } = await import('../../models/user.models');
        (UserModel.findByEmail as jest.Mock).mockResolvedValueOnce({ user_id: 1 });

        await expect(authServices.register({
            username: 'johndoe',
            email: 'john.doe@example.com',
            password: 'P@ssw0rd42!',
            first_name: 'John',
            last_name: 'Doe'
        }))
        .rejects
        .toThrow(new ApiError(400, 'Email already exists'));
    });

});

describe('register - password', () => {

    it('should throw 400 if password is too weak', async () => {
        await expect(authServices.register({
            username: 'johndoe',
            email: 'test@test.com',
            password: 'weakweakweak',
            first_name: 'John',
            last_name: 'Doe'
        }))
        .rejects
        .toThrow(new ApiError(400, 'Password is too weak'));
    });

});

describe('register - success', () => {

    it('should register successfully with valid payload', async () => {
        const response = await authServices.register({
            username: 'johnnydoe',
            email: 'johnny@test.com',
            password: 'P@ssw0rd42J0yfull',
            first_name: 'Johnny',
            last_name: 'Doe'
        });

        expect(response).toEqual({ message: 'Inscription réussie, vérifie ton email.' });
    });

});

describe('login - username', () => {

    it('should throw 400 if username is missing', async () => {
        await expect(authServices.login({
            username: '',
            password: 'P@ssw0rd42J0yfull'
        }))
        .rejects
        .toThrow(new ApiError(400, 'Missing required fields'));
    });

    it('should throw 400 if username does not exist', async () => {
        const { UserModel } = await import('../../models/user.models');
        (UserModel.findByUsername as jest.Mock).mockResolvedValueOnce(null);

        await expect(authServices.login({
            username: 'nonexistent',
            password: 'P@ssw0rd42J0yfull'
        }))
        .rejects
        .toThrow(new ApiError(400, 'Invalid username or password'));
    });
});
