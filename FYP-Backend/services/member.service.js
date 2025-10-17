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

export const topMembers = async ()=>{
    try {
        return await Member.find({$or: [{role: "president"}, {role: "vice president"}, {role: "general secretary"}]});
    } catch (error) {
        throw new Error(error)
    }

}

export const findAll = async ()=>{
    try {
        return await Member.find({$nor: [{role: "president"}, {role: "vice president"}, {role: "general secretary"}]}).sort({createdAt: -1});
    } catch (error) {
        throw new Error(error);
    }
}