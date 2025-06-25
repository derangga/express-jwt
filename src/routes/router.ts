import express from "express";
import auth from "../middleware/auth";
import { getMe } from "../controllers/user.controller";
import { login, register } from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

// Fetch logged in user
router.get("/me", auth, getMe);

export default router;
