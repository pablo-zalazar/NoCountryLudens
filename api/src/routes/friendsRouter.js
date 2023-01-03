import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import {
  getFriends,
  inviteFriend,
  responseInvitation,
  deleteFriend,
  getFriendRequest
} from "../controllers/friendsController.js";

const friendsRouter = express.Router();

friendsRouter.route("/:userId").get(checkAuth, getFriends);
friendsRouter.route("/invite/:friendId").post(checkAuth, inviteFriend);
friendsRouter.route("/accept/:friendId").post(checkAuth, responseInvitation);
friendsRouter.route("/refuse/:friendId").post(checkAuth, responseInvitation);
friendsRouter.route("/delete/:friendId").delete(checkAuth, deleteFriend);
friendsRouter.route("/friendRequest/:notificationId").get(checkAuth, getFriendRequest);

export default friendsRouter;
