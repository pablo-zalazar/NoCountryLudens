import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    message: {
      type: String,
      require: true
    },
    imagePath: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
