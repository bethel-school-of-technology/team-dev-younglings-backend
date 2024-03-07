import { RequestHandler } from "express";
import { User } from "../models/user";
import { hashedPassword } from "../services/auth";


export const getAllUsers: RequestHandler = async (req, res, next) => {
    let users : User[] = await User.findAll() 

    res.status(200).json(users);
}

export const registerUser: RequestHandler = async (req, res, next) => {
    let regUser: User = req.body;

    let foundUser: User[] = await User.findAll({
        where: {
            username: regUser.username
        }
    })

    try{

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
    catch(error){
        res.status(400).send(error)
    }
}