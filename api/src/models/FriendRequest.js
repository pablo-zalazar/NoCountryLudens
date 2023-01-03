import mongoose from "mongoose";

const friendRequestSchema = mongoose.Schema(
  {
    emmiterId: {
      type: String,
      require: true
    },
    reciverId: {
      type: String,
      require: true
    },
    notificationId: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);
export default FriendRequest;
