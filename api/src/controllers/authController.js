import jwtGenerate from "../helpers/jwtGenerator.js";
import User from "../models/User.js";

export const userRegister = async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    const error = new Error("Some value is missing");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const emailUsed = await User.findOne({ email });
    if (emailUsed) {
      const error = new Error("Email in use");
      return res.status(403).json({ msg: error.message });
    }
    const usernameUsed = await User.findOne({ username });
    if (usernameUsed) {
      const error = new Error("Username in use");
      return res.status(403).json({ msg: error.message });
    }
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json({ msg: "User created" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.checkPassword(password))) {
      const error = new Error("Email or password is incorrect");
      return res.status(403).json({ msg: error.message });
    }
    const jwt = jwtGenerate(user._id, user.admin);
    return res.json({ user: { id: user._doc._id, admin: user._doc.admin }, auth: jwt });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const userChangePassword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    if (id === req.userID) {
      const user = await User.findById(req.userID);
      if (!user) {
        const error = new Error("User not found");
        return res.status(404).json({ msg: error.message });
      }
      user.password = password;
      await user.save();
      return res.json({ msg: "Password changed" });
    } else {
      const error = new Error("User not authenticated");
      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
