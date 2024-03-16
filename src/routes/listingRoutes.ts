import { Router } from "express";
import { addDog, getAllDogs, getDogInfo } from "../controllers/dogListingController";

const router = Router();

router.get('/', getAllDogs);
router.get('/:id', getDogInfo);

router.post('/post-listing', addDog);

export default router;