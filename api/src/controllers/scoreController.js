import Score from "../models/Score.js";
import Game from "../models/Game.js";
import User from "../models/User.js";

export const getGameScore = async (req, res) => {
  const { gameId } = req.params;
  try {
    // exist game
    const existGame = await Game.findById({ _id: gameId });
    if (!existGame) {
      const error = new Error("Game dont exist");
      return res.status(400).json({ msg: error.message });
    }
    const gameScores = await Score.find({ game: existGame.name }, "-_id score game")
      .sort({
        score: "desc"
      })
      .populate("userId", "-_id username")
      .limit(5);
    const resp = gameScores.map(score => {
      return {
        username: score.userId.username,
        game: score.game,
        score: score.score
      };
    });
    return res.json({ scores: resp });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const setGameScore = async (req, res) => {
  const { score } = req.body;
  const { gameId } = req.params;
  const { userID } = req;

  if (!userID || !score) return res.status(400).json({ msg: "missing userId or score" });
  try {
    // exist game
    const existGame = await Game.findOne({ _id: gameId });
    if (!existGame) {
      const error = new Error("Game dont exist");
      return res.status(400).json({ msg: error.message });
    }
    // exists user
    const existUser = await User.findById(userID);
    if (!existUser) {
      const error = new Error("User dont exist");
      return res.status(400).json({ msg: error.message });
    }
    // user have score in the game
    const existGameScore = await Score.findOne({ game: existGame.name, userId: userID });

    if (!existGameScore) {
      // create new score
      const newScore = await new Score({ userId: userID, game: existGame.name, score });
      await newScore.save();
    } else {
      // update user score of the game if it's greater
      if (score > existGameScore.score) {
        existGameScore.score = score;
        await existGameScore.save();
      }
    }
    return res.json({ score });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
