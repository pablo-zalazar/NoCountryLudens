import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    avatar: {
      type: String,
      default: ""
    },
    admin: {
      type: Boolean,
      default: false
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
      }
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    friendRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendRequest"
      }
    ],
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification"
      }
    ],
    chatHistories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        default: []
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.checkPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
