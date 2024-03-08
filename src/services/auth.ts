import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user';
import { Request } from 'express';

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

export const verifyUser = async (req: Request) => {

    const authHeader = req.headers.authorization;

    if (authHeader){
        const token = authHeader.split(' ')[1];

        try{
            let decodedUserId: any = await jwt.verify(token, secret);
            return User.findByPk(decodedUserId.userId)
        }
        catch(err){
            return null
        }

    }
    else{
        return null;
    }

}