import { schema } from '../../middleware/validation.middleware';

describe('schema - username validation', () => {

    it('should reject username too short', () => {
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

    it('should reject username too long', () => {
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

    it('should reject username starting with a number', () => {
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

    it('should reject reserved username', () => {
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

});

describe ('schema - email validation', () => {

    it('should reject invalid email', () => {
        const result = schema.safeParse({
            username: 'johndoe',
            email: 'invalid_email',
            password: 'P@ssw0rd42!',
            birthdate: '1999-01-01',
            first_name: 'John',
            last_name: 'Doe'
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
            last_name: 'Doe'
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
            last_name: 'Doe'
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
