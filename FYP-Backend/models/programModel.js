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
    url: {
      type: String,
      require: true,
    },
    public_id: {
      type: String,
      require: true,
    },
  },
}, { timestamps: true });

programSchema.index({ createdAt: -1 });
export default mongoose.model("Program", programSchema);
