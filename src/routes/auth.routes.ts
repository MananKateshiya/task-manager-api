import authController from "@/controller/auth.controller";
import express from "express";

const router = express.Router();
const { register, login } = authController;

router.post("/register", register);
router.post("/login", login);

export default router;