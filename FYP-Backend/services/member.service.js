import mongoose from "mongoose";
import Member from "../models/memberModel.js"


// admin services
export const addMemberService = async (payload)=>{
    try {
        // console.log(payload)
        if(!payload) throw new Error("Missing Field(s)")
        return await Member.create(payload);
    } catch (error) {
        throw new Error(error)
    }
}

export const updateMemberService = async (payload)=>{
    try {
      if(!payload) throw new Error("No field detected");
      return await Member.findByIdAndUpdate(new mongoose.Types.ObjectId(payload?._id), {$set: payload}, {new: true})
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteMemberService = async (memberID)=>{
    try {
        if(!memberID) throw new Error("Member id required");
        return await Member.deleteOne({_id: memberID});
    } catch (error) {
        throw new Error(error);
    }
}

// client/admin services


export const findAll = async (page = 1, limit = 30) => {
  try {
    const skip = (page - 1) * limit;
    const members = await Member.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Member.countDocuments({});

    return { members, total, page, pages: Math.ceil(total / limit) };
  } catch (error) {
    throw new Error(error);
  }
};


export const findById = async (memberID) => {
  try {
    if (!memberID) throw new Error("Member id required");
    return await Member.findById(memberID);
  } catch (error) {
    throw new Error(error);
  }
};