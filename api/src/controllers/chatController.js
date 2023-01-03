import Chat from "../models/Chat.js";
import Phrase from "../models/Phrase.js";
import User from "../models/User.js";

export const getPhrases = async (req, res) => {
  try {
    const phrases = await Phrase.find().select("phrase type").sort({ phrase: "asc" });
    let cotidianas = [];
    let saludos = [];
    phrases.forEach(phrase => {
      phrase.type === "saludos" ? saludos.push(phrase) : cotidianas.push(phrase);
    });
    return res.json({ cotidianas, saludos });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const createPhrase = async (req, res) => {
  const { phrase, type } = req.body;
  const { admin } = req;
  if (!admin) {
    const error = new Error("Unathorized User");
    return res.status(403).json({ msg: error.message });
  }
  try {
    const existsPhrase = await Phrase.findOne({ phrase });
    if (existsPhrase) {
      const error = new Error("Phrase already exists");
      return res.status(400).json({ msg: error.message });
    }
    const newPhrase = await new Phrase({ phrase, type });
    await newPhrase.save();
    return res.json({ phrase });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deletePhrase = async (req, res) => {
  const { phraseId } = req.params;
  const { admin } = req;
  if (!admin) {
    const error = new Error("Unathorized User");
    return res.status(403).json({ msg: error.message });
  }
  try {
    const deletedPhrase = await Phrase.findByIdAndDelete(phraseId);
    if (!deletedPhrase) {
      const error = new Error("Phrase don't exists");
      return res.status(404).json({ msg: error.message });
    }
    return res.json({ phrase: deletedPhrase.phrase });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getChat = async (req, res) => {
  const { userId } = req.params;
  const { userID } = req;

  try {
    const friend = await User.findById(userId);
    if (!friend) {
      const error = new Error("Friend id not exists");
      return res.status(403).json({ msg: error.message });
    }
    const user = await User.findById(userID).populate("chatHistories");
    if (user.chatHistories) {
      const currentChat = user.chatHistories.filter(
        chat =>
          (chat.firstUserId.toString() === userID && chat.secondUserId.toString() === userId) ||
          (chat.firstUserId.toString() === userId && chat.secondUserId.toString() === userID)
      );
      if (currentChat.length < 1) {
        const room = Date.now() + Math.floor(Math.random() * 1000);
        const newChat = new Chat({ firstUserId: userID, secondUserId: userId, room });
        user.chatHistories.push(newChat._id);
        friend.chatHistories.push(newChat._id);
        await newChat.save();
        await user.save();
        await friend.save();
        return res.json(newChat.messages);
      }
      return res.json(currentChat[0]);
    }
    return res.send("error");
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const setChat = async (req, res) => {
  const { chatId } = req.params;
  const { message, icon } = req.body;
  const { userID } = req;
  try {
    const currentChat = await Chat.findById(chatId);
    if (!currentChat) {
      const error = new Error("Chat not exists");
      return res.status(403).json({ msg: error.message });
    }
    currentChat.messages.push({ id: userID, message, icon });
    await currentChat.save();
    return res.json(currentChat);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
