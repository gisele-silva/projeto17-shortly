import { Router } from "express";
import { ranking, userMe } from "../controllers/user.controller.js";

const userRouter = Router()

userRouter.get("/users/me", userMe)
userRouter.get("/ranking", ranking)

export default userRouter