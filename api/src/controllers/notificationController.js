import Notification from "../models/Notification.js";
import User from "../models/User.js";

export const getNotifications = async (req, res) => {
  const { userID } = req;

  try {
    const user = await User.findById(userID).populate({
      path: "notifications",
      select: "-createdAt -updatedAt"
    });

    return res.json({ notifications: user.notifications });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const createNotification = async (req, res) => {
  const { userID } = req;
  const { title, message, friendId } = req.body;
  try {
    const notification = await new Notification({ title, message });
    const user = await User.findById(userID);
    user.notifications.push(notification);
    await user.save();
    await notification.save();
    return res.json(notification);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  const { notificationId } = req.params;
  const { userID } = req;
  try {
    const user = await User.findById(userID).populate("notifications");
    console.log(user.notifications);
    user.notifications = user.notifications.filter(
      notification => notification._id.toString() !== notificationId
    );

    const notification = await Notification.findByIdAndDelete(notificationId);
    if (!notification) {
      const error = new Error("Notification not exists");
      return res.status(400).json({ msg: error.message });
    }

    await user.save();
    return res.json(user.notifications);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
