import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { cadastroSchema, loginSchema } from "../schemas/auth.schema.js";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { signInValidate, signUpValidate } from "../middlewares/auth.middleware.js";

const authRouter = Router()

authRouter.post("/signup", validateSchema(cadastroSchema), signUpValidate , signUp)
authRouter.post("/signin", validateSchema(loginSchema), signInValidate,signIn)

export default authRouter