import express from 'express';
import {getMe,signup , login , logout} from "../controllers/auth.js";
import {protectRoute} from "../middleware/protectRoute.js";
const router = express.Router();

router.get("/me",protectRoute,getMe);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

export default router;