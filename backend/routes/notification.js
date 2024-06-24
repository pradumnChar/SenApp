import express from "express";
import {
  getNotifications,
  deleteNotifications,
} from "../controllers/notifications.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);

export default router;
