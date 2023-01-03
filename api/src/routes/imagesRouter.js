import { Router } from "express";
import {
  // imageGet,
  imageAdd
  // imageModify,
  // imageGetById,
  // imageDelete
} from "../controllers/imagesController.js";
import upload from "../middlewares/multer-config.js";

const imagesRouter = Router();

// imagesRouter
//   .route("/:id")
//   .get(imageGetById)
//   .put(upload.single("image"), imageModify)
//   .delete(imageDelete);
imagesRouter.route("/").post(upload.single("image"), imageAdd);

export default imagesRouter;
