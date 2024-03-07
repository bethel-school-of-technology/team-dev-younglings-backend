import { RequestHandler } from "express";
import { User } from "../models/user";
import { hashedPassword } from "../services/auth";


export const registerUser: RequestHandler = async (req, res, next) => {
    let regUser: User = req.body;

    if(regUser.username && regUser.password) {
        let encryptedPass = await hashedPassword(regUser.password);
        regUser.password = encryptedPass;

        let createdUser = await User.create(regUser);

        res.status(200).json({
            userId:  createdUser.userId,
            password: createdUser.password
        })
    }
    else{
        res.status(400).send('Please enter the username & pasword')
    }
}