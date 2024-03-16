import { RequestHandler } from "express";
import { DogListing } from "../models/listing";

export const getAllDogs: RequestHandler = async (req, res, next) => {
    let dogs: DogListing[] = await DogListing.findAll();
    res.status(200).json(dogs)
}