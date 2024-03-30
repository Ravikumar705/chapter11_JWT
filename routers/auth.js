import express from "express";
const authRouter = express.Router();
import { signupUser, loginUser } from "../Controller/auth.js";

authRouter.post("/signup", signupUser).post("/login", loginUser);

export { authRouter };
