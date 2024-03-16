import { RequestHandler } from "express";
import { DogListing } from "../models/listing";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

export const getAllDogs: RequestHandler = async (req, res, next) => {
    let dogs: DogListing[] = await DogListing.findAll();
    res.status(200).json(dogs)
}

export const getDogInfo: RequestHandler = async (req, res, next) =>{
    let reqId = req.params.id
    let dogInfo: DogListing | null = await DogListing.findByPk(reqId);

    if(dogInfo){

        res.status(200).json(dogInfo);
    }else{
        res.status(400).send('sorry, dog does not exist ... please go back to the listings page')
    }
}

export const addDog: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);
    let dogBody: DogListing = req.body;

    if(!user){
        return res.status(401).send('please sign in to add a listing')
    }

    try{

        dogBody.userId = user.userId;

        let created = await DogListing.create(dogBody);
        res.status(201).json(created);

    }
    catch(error){
        res.status(400).send(error)
    }
}

export const editDogInfo: RequestHandler = async (req, res, next) => {
    let dogBody: DogListing = req.body;
    let reqId = req.params.id;
    let user: User | null = await verifyUser(req);

    if(!user){
        return res.status(401).send('please sign in to edit a listing')
    }

    let idedDog: DogListing | null = await DogListing.findByPk(reqId);

    if(idedDog){
        if(idedDog.userId === user.userId){
            await DogListing.update(dogBody, {
                where: {
                    dogId: reqId
                }
            })
            res.status(200).json({
                updated: true,
                dogId: reqId
            })
        }
        else{
            res.status(401).send("cannot edit another user's dog")
        }
        
    }
    else{
        res.status(400).send('no such dog exists')
    }
}

export const deleteDogListing: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if(!user){
        return res.status(401).send('please sign in to edit a listing')
    }

    let reqId = req.params.id;
    let idedDog: DogListing | null = await DogListing.findByPk(reqId);

    if(idedDog){

        if(idedDog.userId === user.userId){
            await User.destroy({
                where: {
                    userId: reqId
                }
            })

            res.status(200).json({
                userId: user.userId,
                deleted: true
            })
        }
        else{
            res.status(401).send("cannot delete another user's listing")
        }
    }
    else{
        res.status(400).send('dog listing does not exist')
    }


}