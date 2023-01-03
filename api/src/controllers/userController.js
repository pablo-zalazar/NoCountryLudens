import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find()
      .select("-password -email -createdAt -updatedAt")
      .populate("friends", "_id username avatar")
      .populate("favorites", "_id name votes reviews imagePath");
    if (allUsers.length <= 0) {
      const error = new Error("There are not users in the database");
      return res.status(400).json({ msg: error.message });
    }
    return res.json({ users: allUsers });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getAllUsersAdmin = async (req, res) => {
  const { admin } = req;
  if (!admin) {
    const error = new Error("Unathorized User");
    return res.status(403).json({ msg: error.message });
  }
  try {
    const allUsers = await User.find()
      .select("-password -createdAt -updatedAt")
      .populate("friends", "_id username avatar")
      .populate("favorites", "_id name votes reviews imagePath");
    if (allUsers.length <= 0) {
      const error = new Error("There are not users in the database");
      return res.status(400).json({ msg: error.message });
    }
    return res.json({ users: allUsers });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
      .select("-password -email -admin -createdAt -updatedAt")
      .populate("friends", "_id username avatar")
      .populate("favorites", "_id name votes reviews imagePath");
    if (!user) {
      const error = new Error("User not found");
      return res.status(404).json({ msg: error.message });
    }
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const userProfile = async (req, res) => {
  const { id } = req.params;
  const { userID, admin } = req;
  try {
    if (userID === id || admin) {
      const user = await User.findById(userID).select("-password -createdAt -updatedAt");
      if (!user) {
        const error = new Error("User not found");
        return res.status(400).json({ msg: error.message });
      }
      return res.json(user);
    } else {
      const error = new Error("Unathorized User");
      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const userUpdate = async (req, res) => {
  const { id } = req.params;
  const { userID } = req;
  try {
    if (id === userID) {
      const updatedUser = await User.findByIdAndUpdate(userID, req.body, {
        new: true
      }).select("-password -createdAt -updatedAt");
      return res.json(updatedUser);
    } else {
      const error = new Error("Unathorized User");
      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const userDelete = async (req, res) => {
  const { id } = req.params;
  const { userID, admin } = req;
  try {
    if (id === userID || admin) {
      await User.findByIdAndDelete(userID);
      return res.json({ msg: "User deleted" });
    } else {
      const error = new Error("Unathorized User");
      return res.status(403).json({ msg: error.message });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
