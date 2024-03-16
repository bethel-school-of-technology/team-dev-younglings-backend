"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDog = exports.getDogInfo = exports.getAllDogs = void 0;
const listing_1 = require("../models/listing");
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
        res.status(200).json(created);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.addDog = addDog;
