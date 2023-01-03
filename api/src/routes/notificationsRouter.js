import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import {
  getNotifications,
  deleteNotification,
  createNotification
} from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.route("/").get(checkAuth, getNotifications).post(checkAuth, createNotification);
notificationRouter.route("/:notificationId").delete(checkAuth, deleteNotification);

export default notificationRouter;
