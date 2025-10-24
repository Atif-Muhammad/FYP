

import mongoose from "mongoose";
import Award from "../models/awardModel.js"

// admin services

export const create = async (payload) => {
    try {
        // console.log(payload)
        if (!payload) throw new Error("Missing Field(s)");
        return await Award.create(payload);
    } catch (error) {
        throw new Error(error)
    }
}

export const update = async (payload) => {
    try {
        if (!payload) throw new Error("Missing Field(s)");
        return await Award.findByIdAndUpdate(new mongoose.Types.ObjectId(payload?._id), { $set: payload }, { new: true })
    } catch (error) {
        throw new Error(error)
    }
}

export const remove = async (awardID) => {
    try {
        return await Award.deleteOne({ _id: awardID });
    } catch (error) {
        throw new Error(error)
    }
}


// client services
export const findAll = async (page = 1, limit = 30) => {
    try {
        const skip = (page - 1) * limit;
        const data = await Award.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Award.countDocuments();
        return { data, total, page, pages: Math.ceil(total / limit) };
    } catch (error) {
        throw new Error(error)
    }
}

export const findById = async (awardID) => {
    try {
        return await Award.findById(awardID);
    } catch (error) {
        throw new Error(error)
    }   
};