import crypto from 'crypto';

function hashPassword(password : string) {
    try {
        const hash = crypto.createHash('sha256');
        hash.update(password);
        return hash.digest('hex');
    } catch (e) {
        console.error(e);
        return null;
    }
}

function verifyPassword(password: string, hashedPassword: string) {
    const hashedInputPassword = hashPassword(password);
    return hashedInputPassword !== null && hashedInputPassword === hashedPassword;
}

export { hashPassword, verifyPassword };