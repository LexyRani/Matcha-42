import { registerSchema } from '../../middleware/validation.middleware';

describe('schema - username validation', () => {

    it('should reject username too short', () => {
        const result = registerSchema.safeParse({
            username: 'te',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            first_name: 'John',
            last_name: 'Doe'
        });
        expect(result.success).toBe(false);
    });

    it('should reject username too long', () => {
        const result = registerSchema.safeParse({
            username: 'abcdefghijklmnopqrstu',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            first_name: 'John',
            last_name: 'Doe'
        });
        expect(result.success).toBe(false);
    });

    it('should reject username starting with a number', () => {
        const result = registerSchema.safeParse({
            username: '0abc',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            first_name: 'John',
            last_name: 'Doe'
        });
        expect(result.success).toBe(false);
    });

    it('should reject reserved username', () => {
        const result = registerSchema.safeParse({
            username: 'admin',
            email: 'test@test.com',
            password: 'P@ssw0rd42!',
            first_name: 'John',
            last_name: 'Doe'
        });
        expect(result.success).toBe(false);
    });

});

describe ('schema - email validation', () => {

    it('should reject invalid email', () => {
        const result = registerSchema.safeParse({
            username: 'johndoe',
            email: 'invalid_email',
            password: 'P@ssw0rd42!',
            first_name: 'John',
            last_name: 'Doe'
        });
        expect(result.success).toBe(false);
    });

});

describe ('schema - password validation', () => {

    it('should reject password too short', () => {
        const result = registerSchema.safeParse({
            username: 'johndoe',
            email: 'test@test.com',
            password: 'weak',
            first_name: 'John',
            last_name: 'Doe'
        });
        expect(result.success).toBe(false);
    });

});

describe ('schema - valid payload', () => {

    it('should accept valid payload', () => {
        const result = registerSchema.safeParse({
            username: 'johndoet',
            email: 'test@test.com',
            password: 'P@ssw0rd42J0yfull',
            first_name: 'John',
            last_name: 'Doe'
        });
        expect(result.success).toBe(true);
    });

});
