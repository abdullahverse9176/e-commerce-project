
import bcrypt from 'bcryptjs';
import rateLimit from "express-rate-limit";

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}


export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}

export const rateLimiter = () => {
    return rateLimit({
        windowMs: 1 * 60 * 1000,
        max: 5,
        message: {
            message: "Too many login attempts, please try again after 1 minute"
        }
    });
}
