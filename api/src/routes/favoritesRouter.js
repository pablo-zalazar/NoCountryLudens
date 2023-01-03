import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import { favoritesData, addRemoveFavorite } from "../controllers/favoriteController.js";
const favoritesRouter = express.Router();

favoritesRouter.route("/").get(checkAuth, favoritesData);
favoritesRouter.route("/:gameId").post(checkAuth, addRemoveFavorite);

export default favoritesRouter;
