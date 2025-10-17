import mongoose from "mongoose";

const programSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    originalname: {
      type: String,
      require: true,
    },
    mimetype: {
      type: String,
      require: true,
    },
    base64: {
      type: String,
      require: true,
    },
  },
}, {timestamps: true});

export default mongoose.model("Program", programSchema);
