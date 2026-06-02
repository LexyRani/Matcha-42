import { schema } from '../../middleware/validation.middleware';

describe('schema - username validation', () => {

    it('should reject username too short', () => {
        const result = schema.safeParse({
            username: 'te',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        });
        expect(result.success).toBe(false);
    });

    it('should reject username too long', () => {
        const result = schema.safeParse({
            username: 'abcdefghijklmnopqrstu',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        });
        expect(result.success).toBe(false);
    });

    it('should reject username starting with a number', () => {
        const result = schema.safeParse({
            username: '0abc',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        });
        expect(result.success).toBe(false);
    });

    it('should reject reserved username', () => {
        const result = schema.safeParse({
            username: 'admin',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        });
        expect(result.success).toBe(false);
    });

    it('should reject username with `__` or `--`', () => {
        const result = schema.safeParse({
            username: 'john__doe',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        });
        expect(result.success).toBe(false);
    });

    it('should reject username with `@`, `#`, etc', () => {
        const result = schema.safeParse({
            username: 'john@doe',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        });
        expect(result.success).toBe(false);
    });

    it('should normalize username', () => {
        const result = schema.safeParse({
            username: 'JohnDoe',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        });
        expect(result.success).toBe(true);
    });

});

describe ('schema - email validation', () => {

    it('should reject invalid email', () => {
        const result = schema.safeParse({
            username: 'johndoe',
            email: 'invalid_email',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        });
        expect(result.success).toBe(false);
    });

});

describe ('schema - username and email validation', () => {

    it('should reject invalid username and email', () => {
        const result = schema.safeParse({
            username: 'te',
            email: 'invalid_email',
            password: 'P@ssw0rd42J0yfull',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        });
        expect(result.success).toBe(false);
    });

});

describe ('schema - password validation', () => {

    it('should reject password too short', () => {
        const result = schema.safeParse({
            username: 'johndoe',
            email: 'test@test.com',
            password: 'weak',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        });
        expect(result.success).toBe(false);
    });

    it('should reject common passwords', () => {
        const result = schema.safeParse({
            username: 'johndoe',
            email: 'test@test.com',
            password: 'password',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        });
        expect(result.success).toBe(false);
    });

});

describe ('schema - birthdate validation', () => {

    it('should reject non-date birthdate', () => {
        const result = schema.safeParse({
            username: 'johndoe',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: 'not_a_date',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        });
        expect(result.success).toBe(false);
    });

});

describe ('schema - first_name and last_name validation', () => {

    it('should reject missing first_name', () => {
        const result = schema.safeParse({
            username: 'johndoe',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: '',
            last_name: 'Doe',
            gender: 'male'
        });
        expect(result.success).toBe(false);
    });

    it('should reject missing last_name', () => {
        const result = schema.safeParse({
            username: 'johndoe',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: '',
            gender: 'male'
        });
        expect(result.success).toBe(false);
    });

});

describe ('schema - gender validation', () => {

    it('should reject invalid gender', () => {
        const result = schema.safeParse({
            username: 'johndoe',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'invalid'
        });
        expect(result.success).toBe(false);
    });

    it('should accept valid gender', () => {
        const result = schema.safeParse({
            username: 'johndoe',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        });
        expect(result.success).toBe(true);
    });

    it('should accept valid gender', () => {
        const result = schema.safeParse({
            username: 'johndoe',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'female'
        });
        expect(result.success).toBe(true);
    });

    it('should accept valid gender', () => {
        const result = schema.safeParse({
            username: 'johndoe',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'other'
        });
        expect(result.success).toBe(true);
    });

});

describe ('schema - valid payload', () => {

    it('should accept valid payload', () => {
        const result = schema.safeParse({
            username: 'johndoe',
            email: 'test@test.com',
            password: 'P@ssw0rd42J0yfull',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe',
            gender: 'male'
        });
        expect(result.success).toBe(true);
    });

});

describe ('validate middleware', () => {

    it('should return 400 if validation fails', () => {
        const req: any = {
            body: {
                username: 'te',
                email: 'invalid_email',
                password: 'weak',
                birthdate: 'not_a_date',
                first_name: 'John',
                last_name: 'Doe',
                gender: 'invalid'
            }
        };
        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        const next = jest.fn();

        const middleware = require('../../middleware/validation.middleware').validate(schema);
        middleware(req, res, next);
        expect(next).not.toHaveBeenCalled(); // next() ne doit pas être appelé en cas d'erreur de validation - donc la requête ne doit pas passer au controller
        expect(res.status).toHaveBeenCalledWith(400); // Doit retourner un status 400
        expect(res.json).toHaveBeenCalled(); // Doit retourner une réponse JSON avec les détails de l'erreur
    });

    it('should call next() if validation succeeds', () => {
        const req: any = {
            body: {
                username: 'johndoe',
                email: 'test@test.com',
                password: 'P@ssw0rd42!',
                birthdate: '1999-01-01',
                first_name: 'John',
                last_name: 'Doe',
                gender: 'male'
            }
        };
        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        const next = jest.fn();
        const middleware = require('../../middleware/validation.middleware').validate(schema);
        middleware(req, res, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
    });
});
