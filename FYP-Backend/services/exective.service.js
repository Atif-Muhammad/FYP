import mongoose from "mongoose";
import Exective from "../models/exectiveModel.js"

export const create = async(payload)=>{
    try {
        return await Exective.create(payload);
    } catch (error) {
        throw new Error(error);
    }
}


export const update = async (payload)=>{
    try {
        // console.log(payload)
        return await Exective.findByIdAndUpdate(new mongoose.Types.ObjectId(payload?._id), {$set: payload}, {new: true})
    } catch (error) {
        throw new Error(error);
    }
}
export const remove = async (execID)=>{
    try {
        return await Exective.deleteOne({_id: execID})
    } catch (error) {
        throw new Error(error);
    }
}
export const findAll = async ()=>{
    try {
        return await Exective.find({});
    } catch (error) {
        throw new Error(error);
    }
}

export const findById = async (id)=>{
    try {
        return await Exective.find({_id: id});
    } catch (error) {
        throw new Error(error);
    }
}