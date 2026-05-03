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
