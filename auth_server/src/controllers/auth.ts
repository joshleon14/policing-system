import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateAccessToken, verifyAccessToken } from '../utils';
import { ErrorMessages } from '../shared/messages';

const prisma = new PrismaClient();
const saltCount = 12;

// Controller for handling Signup Request.
export const SignUpController = async (req: Request, res: Response) =>{
    const { first_name, last_name, username, email, password_one, password_two } = req.body;

    // verify that all data is filled out and not null
    if (!first_name || !last_name || !username || !email || !password_one || !password_two) {
        return res.status(400).send({"message": ErrorMessages.MISSING_DATA});
    }

    // verify that the username provide is not taken.
    const existingUser = await prisma.user.findUnique({where: {username}});

    if (existingUser) {
        return res.status(400).send({"message": ErrorMessages.USER_EXISTS});
    }

    // Validate that the two passwords provided are equal and match constraints
    if (password_two !== password_one) {
        return res.status(400).send({"message": ErrorMessages.PASS_NO_MATCH});
    }

    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (!passwordRegex.test(password_one)) {
        return res.status(400).send({"message": ErrorMessages.PASS_FAIL_VALID});
    }

    // *** validation completed, begin saving user to system.

    // Hash password.

    const salt = await bcrypt.genSalt(saltCount);
    const hashedPass = await bcrypt.hash(password_one, salt);

    // save user to database.

    try {
        const newUser = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                username,
                password: hashedPass,
                badge: `${Math.floor(Math.random() * 1000)}`
            }
        });

        return res.status(200).send({"user": {
            id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            username: newUser.username,
            email: newUser.email,
            badge: newUser.badge,
            is_active: newUser.is_active
        }});

    } catch (err) {
        console.error("Failed to save user.");
        console.error(err.message);
        res.status(500).send({"message": `Failed to create -> ${err.message}`});
    }

};

// Controller for handling Login for users
export const LoginController = async (req: Request, res: Response) => {

    // Pull username and password value from body.
    const { username, password } = req.body;

    // Do a look up for the username.
    const user = await prisma.user.findUnique({where: {username}});

    if (!user) {
        return res.status(401).send({"message": "Login Failed. Username does not exists."});
    }

    // validate that the password supplied is the same as the one saved.

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(400).send({"message": "Password or username is incorrect."});
    }

    // Password is valid, save user last login
    try {
        const lastLoginRecord = await prisma.loginHistory.create({
            data: {
                userId: user.id,
            }
        });
    } catch (err) {
        console.error("Failed to save last login");
    }


    // Generate Access Tokens
    const accessToken = generateAccessToken(user.username, user.badge);
    res.status(200).send({access_token: accessToken})

};

// Controller for verifying token
export const VerifyTokenController = (req: Request, res: Response) => {

    // Get Token from authorization header
    const authToken = req.header('Authorization');

    if (!authToken) {
        return res.status(400).send({"message": "Access Token not provided."})
    }

    // split token to remove bearer from the beginning
    const token = authToken.split(' ')[1];

    // Verify Token
    const valid = verifyAccessToken(token);

    return res.status(200).send({"valid": valid})

};