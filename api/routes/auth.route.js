import express from "express";
import {
  signUp,
  signIn,
  googleAuth,
  signOut,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/google", googleAuth);
router.post("/sign-out", signOut);

export default router;
