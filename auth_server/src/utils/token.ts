import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Generate JWT Access Token
export const generateAccessToken = (username: string, badgeNumber: string) => {
    return jwt.sign({
        data: JSON.stringify({username, badgeNumber})}, process.env.TOKEN_SECRET, {expiresIn: '1d'});
};

// Verify users access token
export const verifyAccessToken = (token: string) => {
    let valid = false;

    jwt.verify(token, process.env.TOKEN_SECRET, (err: any, verifiedJwt: any) => {
        if (err) {
            valid = false;
        } else {
            valid = true;
        }
    });
    return valid;
};