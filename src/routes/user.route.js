import { Router } from "express";
import { ranking, userMe } from "../controllers/user.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";

const userRouter = Router()

userRouter.get("/users/me",  authValidation, userMe)
userRouter.get("/ranking",ranking)

export default userRouter