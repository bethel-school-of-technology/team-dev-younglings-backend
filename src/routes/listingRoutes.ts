import { Router } from "express";
import { getAllDogs } from "../controllers/dogListingController";

const router = Router();

router.get('/', getAllDogs);

export default router;