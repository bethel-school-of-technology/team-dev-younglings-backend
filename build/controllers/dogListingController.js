"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDogListing = exports.editDogInfo = exports.addDog = exports.getDogInfo = exports.getAllDogs = void 0;
const listing_1 = require("../models/listing");
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const getAllDogs = async (req, res, next) => {
    let dogs = await listing_1.DogListing.findAll();
    res.status(200).json(dogs);
};
exports.getAllDogs = getAllDogs;
const getDogInfo = async (req, res, next) => {
    let reqId = req.params.id;
    let dogInfo = await listing_1.DogListing.findByPk(reqId);
    if (dogInfo) {
        res.status(200).json(dogInfo);
    }
    else {
        res.status(400).send('sorry, dog does not exist ... please go back to the listings page');
    }
};
exports.getDogInfo = getDogInfo;
const addDog = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    let dogBody = req.body;
    if (!user) {
        return res.status(401).send('please sign in to add a listing');
    }
    try {
        dogBody.userId = user.userId;
        let created = await listing_1.DogListing.create(dogBody);
        res.status(201).json(created);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.addDog = addDog;
const editDogInfo = async (req, res, next) => {
    let dogBody = req.body;
    let reqId = req.params.id;
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(401).send('please sign in to edit a listing');
    }
    let idedDog = await listing_1.DogListing.findByPk(reqId);
    if (idedDog) {
        if (idedDog.userId === user.userId) {
            await listing_1.DogListing.update(dogBody, {
                where: {
                    dogId: reqId
                }
            });
            res.status(200).json({
                updated: true,
                dogId: reqId
            });
        }
        else {
            res.status(401).send("cannot edit another user's dog");
        }
    }
    else {
        res.status(400).send('no such dog exists');
    }
};
exports.editDogInfo = editDogInfo;
const deleteDogListing = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(401).send('please sign in to edit a listing');
    }
    let reqId = req.params.id;
    let idedDog = await listing_1.DogListing.findByPk(reqId);
    if (idedDog) {
        if (idedDog.userId === user.userId) {
            await user_1.User.destroy({
                where: {
                    userId: reqId
                }
            });
            res.status(200).json({
                userId: user.userId,
                deleted: true
            });
        }
        else {
            res.status(401).send("cannot delete another user's listing");
        }
    }
    else {
        res.status(400).send('dog listing does not exist');
    }
};
exports.deleteDogListing = deleteDogListing;
