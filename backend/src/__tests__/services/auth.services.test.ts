import authServices from '../../services/auth.services';
import { ApiError } from '../../utils/ApiError';

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
        const { UserModel } = await import('../../models/user.models');
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
