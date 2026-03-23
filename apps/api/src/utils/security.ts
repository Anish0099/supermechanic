import crypto from 'crypto';

export const hashPassword = (password: string): string => {
    return crypto.createHash('sha256').update(password).digest('hex');
};

export const comparePasswords = (password: string, hashedPassword: string): boolean => {
    const hashedInput = hashPassword(password);
    return hashedInput === hashedPassword;
};

export const generateToken = (length: number): string => {
    return crypto.randomBytes(length).toString('hex');
};