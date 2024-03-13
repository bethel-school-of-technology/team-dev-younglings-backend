"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserInformation = exports.getUser = exports.loginUser = exports.registerUser = exports.getAllUsers = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const getAllUsers = async (req, res, next) => {
    let users = await user_1.User.findAll();
    res.status(200).json(users);
};
exports.getAllUsers = getAllUsers;
const registerUser = async (req, res, next) => {
    let regUser = req.body;
    let foundUser = await user_1.User.findOne({
        where: {
            username: regUser.username
        }
    });
    if (!foundUser) {
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
    }
    else {
        res.status(401).send('Username is already being used');
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
const getUser = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    let reqId = parseInt(req.params.id);
    if (user) {
        let idedUser = await user_1.User.findByPk(reqId);
        res.status(200).json({ idedUser });
    }
    else {
        res.status(401).send();
    }
};
exports.getUser = getUser;
const editUserInformation = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    let reqId = parseInt(req.params.id);
    if (!user) {
        return res.status(401).send("please sign in if you want to edit user information");
    }
    let userUpdatedInfo = req.body;
    let idedUser = await user_1.User.findByPk(reqId);
    if (idedUser) {
        if (idedUser.username === user.username) {
            await user_1.User.update(userUpdatedInfo, {
                where: {
                    userId: reqId
                }
            });
            res.status(200).json({ userUpdatedInfo });
        }
        else {
            res.status(401).send("cannot edit another users page");
        }
    }
    else {
        res.status(400).send("user is non-existent");
    }
};
exports.editUserInformation = editUserInformation;
//delete user function
