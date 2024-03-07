"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.getAllUsers = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const getAllUsers = async (req, res, next) => {
    let users = await user_1.User.findAll();
    res.status(200).json(users);
};
exports.getAllUsers = getAllUsers;
const registerUser = async (req, res, next) => {
    let regUser = req.body;
    let foundUser = await user_1.User.findAll({
        where: {
            username: regUser.username
        }
    });
    try {
        if (regUser.username && regUser.password) {
            let encryptedPass = await (0, auth_1.hashedPassword)(regUser.password);
            regUser.password = encryptedPass;
            let createdUser = await user_1.User.create(regUser);
            res.status(200).json({
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
