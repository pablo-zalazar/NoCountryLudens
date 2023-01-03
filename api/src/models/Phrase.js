import mongoose from "mongoose";

const PhraseSchema = mongoose.Schema(
  {
    phrase: {
      type: String,
      require: true,
      trim: true
    },
    type: {
      type: String,
      require: true,
      trim: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Phrase = mongoose.model("Phrase", PhraseSchema);
export default Phrase;
