import mongoose from "mongoose";

const Review = mongoose.Schema(
  {
    user: {
      type: String
    },
    stars: {
      type: Number
    }
  },
  { _id: false }
);

const gameSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      require: true,
      trim: true
    },
    cover: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image"
    },
    devices: {
      type: [String]
    },
    audiencies: {
      type: String,
      enum: ["tp", "+3", "+7"],
      default: "tp"
    },
    stars: {
      type: Number,
      default: 0
    },
    comingSoon: {
      type: Boolean,
      default: false
    },
    reviews: {
      type: [Review],
      default: []
    },
    folder: {
      type: String,
      unique: true,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

gameSchema.statics.deleteById = function (id) {
  return this.deleteOne({ _id: id });
};

const Game = mongoose.model("Game", gameSchema);

export default Game;
