import express from "express";
import { login } from "../controllers/auth.js";

// set the router
const router = express.Router();

router.post("/login", login);

export default router;
