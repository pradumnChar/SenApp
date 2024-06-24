import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserProfile } from "../controllers/user.js";
import { followUnfollowUser } from "../controllers/user.js";
import { getSuggestedUsers } from "../controllers/user.js";
import { updateUser } from "../controllers/user.js";
const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.post("/update", protectRoute, updateUser);

export default router;
