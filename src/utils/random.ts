import crypto from 'crypto';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const generateRandomString = (length: number): string => {
    return Array.from(crypto.randomFillSync(new Uint8Array(length))).map((n) => chars[n % chars.length]).join('');
}