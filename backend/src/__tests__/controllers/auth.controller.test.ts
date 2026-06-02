import { register } from "../../controllers/auth.controller";
import { ApiError } from "../../utils/ApiError";
import authService from "../../services/auth.services";

jest.mock('../../services/auth.services', () => ({
	__esModule: true,
    default: {
        register: jest.fn().mockResolvedValue({ message: 'User registered successfully' }),
        verifyMail: jest.fn().mockResolvedValue({ message: 'Email vérifié avec succès' })
    }
}));

describe('register controller', () => {
	
	it('should return 201 and success message on successful registration', async () => {
		const req: any =  {
			body: {
				username: 'johnnydoe',
				email: 'johnnydoe@test.com',
				password: 'P@ssw0rd42!',
				birthdate: '1999-01-01',
				first_name: 'John',
				last_name: 'Doe',
				gender: 'male'
			}
		};
		const res: any = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis()
		};
		const next = jest.fn();
		await register(req, res, next);
		expect(res.status).toHaveBeenCalledWith(201);
		expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
	});

	it('should call next(error) when service throws', async () => {
		const req: any =  {
			body: {
				username: 'johnnydoe',
				email: 'johnnydoe@test.com',
				password: 'P@ssw0rd42!',
				birthdate: '1999-01-01',
				first_name: 'John',
				last_name: 'Doe',
				gender: 'male'
			}
		};
		const res: any = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis()
		};
		const next = jest.fn();const authServiceMock = authService as jest.Mocked<typeof authService>;
		authServiceMock.register.mockRejectedValue(new ApiError(400, 'Invalid input'));
		await register(req, res, next);
		expect(next).toHaveBeenCalledWith(new ApiError(400, 'Invalid input'));
	});
});
