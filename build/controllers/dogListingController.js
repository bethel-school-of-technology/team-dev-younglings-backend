"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDogs = void 0;
const listing_1 = require("../models/listing");
const getAllDogs = async (req, res, next) => {
    let dogs = await listing_1.DogListing.findAll();
    res.status(200).json(dogs);
};
exports.getAllDogs = getAllDogs;
