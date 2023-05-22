import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { urlsSchema } from "../schemas/urls.schema.js";
import { shortUrlPost, urlDelete, urlId, shortUrlGet } from "../controllers/urls.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateSchema(urlsSchema), authValidation, shortUrlPost)
urlsRouter.get("/urls/:id", urlId)
urlsRouter.get("/urls/open/:shortUrl", shortUrlGet)
urlsRouter.delete("/urls/:id", authValidation, urlDelete)

export default urlsRouter