import { Router } from "express";
import { editUserInformation, getAllUsers, getUser, loginUser, registerUser } from "../controllers/userController";


const router = Router();

router.get('/', getAllUsers)
router.get('/:id', getUser);

router.post('/register', registerUser);
router.post('/login', loginUser)

router.put('/:id', editUserInformation);

export default router