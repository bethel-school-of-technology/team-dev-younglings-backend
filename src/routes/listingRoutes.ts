import { Router } from "express";
import { addDog, deleteDogListing, editDogInfo, findByBreed, getAllDogs, getDogInfo } from "../controllers/dogListingController";

const router = Router();

router.get('/', getAllDogs);
router.get('/:id', getDogInfo);
router.get('/:breed', findByBreed);
// router.get('/:location', findByLocation)

router.post('/post-listing', addDog);

router.put('/edit/:id', editDogInfo);

router.delete('/delete/:id', deleteDogListing);

export default router;