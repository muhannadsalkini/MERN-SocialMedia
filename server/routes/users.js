import express from "express";
import {
  getUser,
  getUserFirends,
  addRemoveFirend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

// set the router
const router = express.Router();

// read
router.get("/:id", verifyToken, getUser);
router.get("/:id/friedns", verifyToken, getUserFirends);

// update
router.patch("/:id/:friendId", verifyToken, addRemoveFirend);

export default router;
