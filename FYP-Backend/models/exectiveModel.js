import mongoose from "mongoose";

const exectiveSchema = mongoose.Schema({
  role: {
    type: String,
    enum: ["General Secretary", "Vice President", "Chairman", "Patron in Chief", "Legal Advisor", "Technical Advisor", "Political Advisor", "Financial Advisor", "Chief Election Officer", "Youth Governor"],
    require: true,
    index: true
  },
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
  about: {
    type: String,
  }, 
  district: {
    type: String,
  },
  livingIn: {
    type: String
  },
  message: {
    type: String,
  },
  socials: {
    fb: String,
    insta: String,
    twitter: String
  },
  province: String
}, {timestamps: true});

exectiveSchema.index({role: 1, createdAt: -1})

export default mongoose.model("Exective", exectiveSchema)
