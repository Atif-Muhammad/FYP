import mongoose from "mongoose";
import Program from "../models/programModel.js"

// admin services

export const create = async (payload)=>{
    try {
        // console.log(payload)
        if(!payload) throw new Error("Missing Field(s)");
        return await Program.create(payload);
    } catch (error) {
        throw new Error(error)
    }
}

export const update = async (payload)=>{
    try {
        if(!payload) throw new Error("Missing Field(s)");
        return await Program.findByIdAndUpdate(new mongoose.Types.ObjectId(payload?._id), {$set: payload}, {new: true})
    } catch (error) {
        throw new Error(error)
    }
}

export const remove = async (programID)=>{
    try {
        return await Program.deleteOne({_id: programID});
    } catch (error) {
        throw new Error(error)
    }
}



// client services
export const findAll = async ()=>{
    try {
        return await Program.find({}).sort({createdAt: -1});
    } catch (error) {
        throw new Error(error)
    }
}