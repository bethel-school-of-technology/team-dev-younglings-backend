import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user';

export const hashedPassword = async (inputtedText: string) => {
    const saltRound = 12;
    return await bcrypt.hash(inputtedText, saltRound);
}

export const comparePasswords = async (inputtedText: string, hashedPassword: string) => {
    return await bcrypt.compare(inputtedText, hashedPassword);
}

const secret = "We are secretly Jedi of the Old Republic!";

export const tokenAssigner = async (user:User) => {
    let token = jwt.sign(
        {userId: user.userId},
        secret,
        {expiresIn: '2hr'}
    )

    return token;
}