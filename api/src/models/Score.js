import mongoose from "mongoose";

const scoreSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true
    },
    game: {
      type: String,
      require: true
    },
    score: {
      type: Number,
      require: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Score = mongoose.model("Score", scoreSchema);
export default Score;
