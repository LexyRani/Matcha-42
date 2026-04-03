import { schema } from "../../middleware/validation.middleware";
import authServices from "../../services/auth.services";
import { ApiError } from "../../utils/ApiError";

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
	it('should throw 400 if username is too short', async () => {
		const result = schema.safeParse({
            username: 'te',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe'
        });
        expect(result.success).toBe(false);
	});
	it('should throw 400 if username is too long', async () => {
		const result = schema.safeParse({
            username: 'abcdefghijklmnopqrstu',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe'
        });
        expect(result.success).toBe(false);
	});
	it('should throw 400 if username starts with a number', async () => {
		const result = schema.safeParse({
            username: '0abc',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe'
        });
        expect(result.success).toBe(false);
	});
	it('should throw 400 if username is reserved', async () => {
		const result = schema.safeParse({
            username: 'admin',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe'
        });
        expect(result.success).toBe(false);
	});
	it('should throw 400 if username is missing', async () => {
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
		.toThrow(new ApiError(400, 'Username is already used'));
	});
});
