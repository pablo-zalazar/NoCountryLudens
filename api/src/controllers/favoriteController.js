import User from "../models/User.js";
import Game from "../models/Game.js";

export const addRemoveFavorite = async (req, res) => {
  const { gameId } = req.params;
  const { userID } = req;
  try {
    const game = await Game.findById(gameId);
    if (!game) {
      const error = new Error("Game not exists");
      return res.status(400).json({ msg: error.message });
    }
    const user = await User.findById(userID);
    const newFavorites = user.favorites.filter(favorite => favorite._id.toString() !== gameId);
    if (newFavorites.length !== user.favorites.length) {
      user.favorites = newFavorites;
      await user.save();
      return res.json({ msg: "Game removed from favorites" });
    } else {
      user.favorites.push(gameId);
      await user.save();
      return res.json({ msg: "Game added to favorites" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const favoritesData = async (req, res) => {
  const { userID } = req;

  try {
    // const user = await User.findById(userID).populate("favorites", "-_id -createdAt -updatedAt");
    const user = await User.findById(userID).populate({
      path: "favorites",
      select: "-createdAt -updatedAt",
      populate: {
        path: "cover"
      }
    });

    return res.json(user.favorites);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
