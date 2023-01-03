import express from "express";
import {
  userProfile,
  userUpdate,
  userDelete,
  getAllUsers,
  getAllUsersAdmin,
  getUser
} from "../controllers/userController.js";
import checkAuth from "../middlewares/checkAuth.js";

const usersRouter = express.Router();

usersRouter.route("/").get(getAllUsers);
usersRouter.route("/admin").get(checkAuth, getAllUsersAdmin);
usersRouter.route("/:id").get(getUser).put(checkAuth, userUpdate).delete(checkAuth, userDelete);
usersRouter.route("/:id/private").get(checkAuth, userProfile);

export default usersRouter;
