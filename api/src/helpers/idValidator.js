import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const validateId = id => {
  return ObjectId.isValid(id) ? true : false;
};

export default validateId;
