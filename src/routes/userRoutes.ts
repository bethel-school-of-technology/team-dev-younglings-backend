import { Router } from "express";
import { registerUser } from "../controllers/userController";


const router = Router();

router.get('/', registerUser);

export default router