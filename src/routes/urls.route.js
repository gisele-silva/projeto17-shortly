import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { urlsSchema } from "../schemas/urls.schema.js";
import { urlDelete, urlGet, urlGetDois, urlPost } from "../controllers/urls.controller.js";

const urlsRouter = Router()

urlsRouter.post("/urls/shorten", validateSchema(urlsSchema), urlPost)
urlsRouter.get("/urls/:id", urlGet)
urlsRouter.get("/urls/open/:shortUrl", urlGetDois)
urlsRouter.delete("/urls/:id", urlDelete)

export default urlsRouter