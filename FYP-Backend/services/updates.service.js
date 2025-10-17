import mongoose from "mongoose";
import Update from "../models/updatesModel.js"


// admin services
export const create = async (payload)=>{
    try {
        return await Update.create(payload);
    } catch (error) {
        throw new Error(error)
    }
}
export const update = async (payload)=>{
    try {
        return await Update.findByIdAndUpdate(new mongoose.Types.ObjectId(payload?._id), {$set: payload}, {new: true});
    } catch (error) {
        throw new Error(error)
    }
}
export const remove = async (newsID)=>{
    try {
        return await Update.deleteOne({_id: newsID});
    } catch (error) {
        throw new Error(error)
    }
}

// client services
export const findAll = async ()=>{
    try {
        return await Update.find({}).sort({createdAt: -1})
    } catch (error) {
        throw new Error(error)
    }
}