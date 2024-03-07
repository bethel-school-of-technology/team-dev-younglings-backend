"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const registerUser = async (req, res, next) => {
    let regUser = req.body;
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
};
exports.registerUser = registerUser;
