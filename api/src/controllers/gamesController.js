import Game from "../models/Game.js";
import validateId from "../helpers/idValidator.js";
import deleteFilefromFS from "../helpers/fileManager.js";
import { addImage, deleteImage } from "./imagesController.js";

// [GET] Find all Games

export const findAllGames = async (req, res) => {
  try {
    const allGames = await Game.find().populate("cover", "path");
    if (allGames.length == 0)
      return res.status(404).json({ msg: "There are no games in the database" });

    return res.status(200).json({ games: allGames });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// [GET] Find a Game by Id (params id);

export const findGameById = async (req, res) => {
  const { id } = req.params;

  if (!validateId(id)) return res.status(400).json({ msg: "The Id is not a valid ID" });
  try {
    const foundGame = await Game.findById(id, "-createdAt -updatedAt").populate("cover");
    console.log(foundGame);

    if (!foundGame) return res.status(404).json({ msg: "Game not found" });

    return res.status(200).json({ game: foundGame });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

// [POST] Create a new game (req.file("image"), req.Body(name(string), description(string), devices (array), audiencies(string), comingSoon (boolean)))

export const createNewGame = async (req, res) => {
  const { name, description, devices, folder, audiencies, comingSoon } = req.body;
  const { admin } = req;

  const imagefile = req.file?.path;

  if (!admin) {
    if (req.file) await deleteFilefromFS(imagefile, req);
    return res.status(401).json({ msg: "Unathorized User" });
  }

  const existingGame = await Game.find({ name });

  if (existingGame.length !== 0) {
    if (req.file) await deleteFilefromFS(imagefile, req);
    return res.status(400).json({ msg: "The game's name already exist in the Database" });
  }

  if (!name || !description || !req.file) {
    if (req.file) await deleteFilefromFS(imagefile, req);
    return res.status(400).json({ msg: "Missing relevant values" });
  }
  try {
    // create new image in cloudinary
    if (!req.file) {
      res.status(400).json({ message: "Not uploaded Files" });
    } else {
      const result = await addImage(
        req,
        `${name.trim().replace(/:/g, "-").replace(" ", "_")}-cover`,
        `Foto del juego ${name}`
      );
      if (result) {
        const newGame = new Game({
          name,
          description,
          devices,
          audiencies,
          comingSoon,
          folder: folder || null,
          cover: result.image._id
        });

        const savedGame = await newGame.save();
        console.log("imagen juego: ", result);
        return res.status(200).json({
          game: { id: savedGame._id, cover: result.image.path, name: savedGame.name }
        });
      }
    }
  } catch (error) {
    if (req.file) await deleteFilefromFS(imagefile, req);
    return res.status(500).json({ msg: "We had an error please try again later" });
  }
};

// Modify Game

export const modifyExistingGame = async (req, res) => {
  const { id } = req.params;
  const { name, description, devices, folder, comingSoon, audience } = req.body;
  const { admin } = req;
  const newPathfile = req.file?.path;

  if (!validateId(id)) {
    if (req.file) await deleteFilefromFS(newPathfile, req);
    return res.status(400).json({ msg: "The Id is not a valid ID" });
  }

  if (!admin) {
    if (req.file) await deleteFilefromFS(newPathfile, req);
    return res.status(401).json({ msg: "Unathorized User" });
  }

  try {
    const existingGame = await Game.findById(id);

    if (!existingGame)
      return res.status(400).json({ msg: "There's no registered game with the ID received" });

    let newCover;
    if (req.file) {
      try {
        let filename = existingGame.name;
        if (req.body.name !== existingGame.name) {
          filename = req.body.name;
        }
        let newCover = await addImage(
          req,
          `${filename.trim().replace(/:/g, "-").replace(" ", "_")}-cover`,
          `Foto del juego ${filename}`
        );
        console.log("existing game", existingGame);
        if (newCover) {
          await deleteImage(existingGame.cover._id);
          existingGame.cover = newCover.image._id;
        }
        // agregar  nueva foto con el nombre modfiicado
      } catch (err) {
        console.log(err);
      }
    }

    if (name) existingGame.name = name;
    if (description) existingGame.description = description;
    if (devices) existingGame.devices = devices;
    if (audience) existingGame.audience = audience;
    if (comingSoon) existingGame.cominSoon = comingSoon;
    if (folder) existingGame.folder = folder;

    const updatedGame = await existingGame.save();
    const answerGame = newCover ? { ...updatedGame, cover: newCover } : updatedGame;
    console.log("ansergame: ", answerGame);
    return res.status(200).json({ game: answerGame });
  } catch (error) {
    if (req.file) {
      await deleteFilefromFS(newPathfile, req);
    }
    return res.status(500).json({ msg: error.message });
  }
};

export const eliminateGame = async (req, res) => {
  const { id } = req.params;
  const { admin } = req;

  if (!id) return res.status(400).status({ msg: "Missing Game Id" });

  if (!validateId(id)) return res.status(400).json({ msg: "The Id is not a valid ID" });

  if (!admin)
    return res
      .status(403)
      .json({ msg: "The user doesn't have the right permissions to delete a game" });

  try {
    const foundGame = await Game.findById(id);

    if (!foundGame) {
      return res.status(404).json({ msg: "The game ID is not associated with an existing game" });
    } else {
      const result = await Game.deleteById(id);
      if (result) deleteImage(foundGame.cover._id);
      return res.status(200).json({
        game: foundGame
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Sorry, an error occured please try again later" });
  }
};

export const getGameReview = async (req, res) => {
  const { gameId } = req.params;
  const { userID } = req;
  try {
    const game = await Game.findById(gameId);
    if (!game) {
      const error = new Error("Game not exists");
      return res.status(403).json({ msg: error.message });
    }
    const userReview = game.reviews.filter(review => review.user === userID);
    return res.json({ review: userReview });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const setGameReview = async (req, res) => {
  const { gameId } = req.params;
  let { review } = req.body;
  const { userID } = req;

  try {
    const game = await Game.findById(gameId);
    if (!game) {
      const error = new Error("Game not exists");
      return res.status(403).json({ msg: error.message });
    }
    const newReviews = game.reviews.filter(review => review.user !== userID);
    let newStars = 0;
    newReviews.forEach(review => {
      newStars += review.stars;
    });
    game.stars = Math.floor((newStars + review) / (newReviews.length + 1));
    if (newReviews.length === game.reviews.length) {
      game.reviews.push({ user: userID, stars: review });
      await game.save();
      return res.json({ msg: "Review added" });
    } else {
      game.reviews = [...newReviews, { user: userID, stars: review }];
      await game.save();
      return res.json({ msg: "Review modified" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
