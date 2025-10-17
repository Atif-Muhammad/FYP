import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format."],
  },
  password: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Admin", adminSchema)

