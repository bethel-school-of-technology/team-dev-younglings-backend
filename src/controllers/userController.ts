import { RequestHandler } from "express";
import { User } from "../models/user";
import { comparePasswords, hashedPassword, tokenAssigner } from "../services/auth";


export const getAllUsers: RequestHandler = async (req, res, next) => {
    let users : User[] = await User.findAll() 

    res.status(200).json(users);
}

export const registerUser: RequestHandler = async (req, res, next) => {
    let regUser: User = req.body;

    try{

            if(regUser.username && regUser.password) {
                let encryptedPass = await hashedPassword(regUser.password);
                regUser.password = encryptedPass;
        
                let createdUser = await User.create(regUser);
        
                res.status(201).json({
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

export const loginUser: RequestHandler = async (req, res, next) => {

    let existingUser: User | null = await User.findOne({
        where: {
            username: req.body.username
        }
    })

    if(existingUser){
        let passwordResult = await comparePasswords(req.body.password, existingUser.password)
        let userId = existingUser.userId

        if(passwordResult){
            let token = await tokenAssigner(existingUser);
            res.status(200).json({token, userId})
        }
        else{
            res.status(404).send('incorrect password')
        }
    }
    else{
        res.status(404).send(`username ${req.body.username} does not exist`)
    }
    
}