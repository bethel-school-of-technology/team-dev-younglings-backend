"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.getAllUsers = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const getAllUsers = async (req, res, next) => {
    let users = await user_1.User.findAll();
    res.status(200).json(users);
};
exports.getAllUsers = getAllUsers;
const registerUser = async (req, res, next) => {
    let regUser = req.body;
    try {
        if (regUser.username && regUser.password) {
            let encryptedPass = await (0, auth_1.hashedPassword)(regUser.password);
            regUser.password = encryptedPass;
            let createdUser = await user_1.User.create(regUser);
            res.status(201).json({
                userId: createdUser.userId,
                password: createdUser.password
            });
        }
        else {
            res.status(400).send('Please enter the username & pasword');
        }
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    let existingUser = await user_1.User.findOne({
        where: {
            username: req.body.username
        }
    });
    if (existingUser) {
        let passwordResult = await (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
        let userId = existingUser.userId;
        if (passwordResult) {
            let token = await (0, auth_1.tokenAssigner)(existingUser);
            res.status(200).json({ token, userId });
        }
        else {
            res.status(404).send('incorrect password');
        }
    }
    else {
        res.status(404).send(`username ${req.body.username} does not exist`);
    }
};
exports.loginUser = loginUser;
