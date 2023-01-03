import express from "express";
import {
  getPhrases,
  createPhrase,
  deletePhrase,
  getChat,
  setChat
} from "../controllers/chatController.js";
import checkAuth from "../middlewares/checkAuth.js";

const chatRouter = express.Router();

chatRouter.route("/phrases").get(checkAuth, getPhrases).post(checkAuth, createPhrase);
chatRouter.route("/phrases/:phraseId").delete(checkAuth, deletePhrase);
chatRouter.route("/:userId").get(checkAuth, getChat);
chatRouter.route("/:chatId").post(checkAuth, setChat);
export default chatRouter;
