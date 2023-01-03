import mongoose from "mongoose";

const Message = mongoose.Schema(
  {
    id: {
      type: String
    },
    message: {
      type: String
    },
    icon: {
      type: Boolean,
      default: false
    }
  },
  { _id: false }
);

const chatSchema = mongoose.Schema(
  {
    firstUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true
    },
    secondUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true
    },
    room: {
      type: String,
      require: true,
      default: ""
    },
    messages: {
      type: [Message],
      default: []
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
