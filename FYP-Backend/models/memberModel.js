import mongoose from "mongoose";

const memberSchema = mongoose.Schema({
  role: {
    type: String,
    enum: ["member", "vice president", "president", "general secretary"],
    require: true,
  },
  name: {
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
  },
  socials: {
    fb: String,
    insta: String,
    twitter: String
  }
}, {timestamps: true});

export default mongoose.model("Member", memberSchema)
