import express from "express";
import { Login, Logout, Profile, Signup } from "../controller/auth.controller.js";
import userAuth from "../middlewares/userAuth.js";

const authRouter = express.Router();

authRouter.route("/register").post(Signup);
authRouter.route("/login").post(Login);
authRouter.route("/logout").post(userAuth, Logout);
authRouter.route("/profile").get(userAuth, Profile);

export default authRouter;