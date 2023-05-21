import { Router } from "express";
import userRouter from "./user.route.js";
import authRouter from "./auth.route.js";
import urlsRouter from "./urls.route.js";

const router = Router()

router.use(userRouter)
router.use(authRouter)
router.use(urlsRouter)

export default router;