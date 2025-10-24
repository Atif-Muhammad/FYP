import mongoose from "mongoose";

const memberSchema = mongoose.Schema({
  name: {
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
  father_name: {
    type: String,
    require: true,
  },
  about: {
    type: String,
    require: true,
  },
  CNIC: {
    type: String,
    require: true
  },
  pk: {
    type: String,
  },
  district: {
    type: String,
  },
  DOB: {
    type: String,
  },
  phone: {
    type: String,
  },
  email:{
    type: String
  }
}, {timestamps: true});

memberSchema.index({role: 1, createdAt: -1})

export default mongoose.model("Member", memberSchema)
