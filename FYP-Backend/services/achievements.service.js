

import mongoose from "mongoose";
import Achievement from "../models/achievementModel.js"

// admin services

export const create = async (payload) => {
    try {
        // console.log(payload)
        if (!payload) throw new Error("Missing Field(s)");
        return await Achievement.create(payload);
    } catch (error) {
        throw new Error(error)
    }
}

export const update = async (payload) => {
    try {
        if (!payload) throw new Error("Missing Field(s)");
        return await Achievement.findByIdAndUpdate(new mongoose.Types.ObjectId(payload?._id), { $set: payload }, { new: true })
    } catch (error) {
        throw new Error(error)
    }
}

export const remove = async (achieveID) => {
    try {
        return await Achievement.deleteOne({ _id: achieveID });
    } catch (error) {
        throw new Error(error)
    }
}


// client services
export const findAll = async (page = 1, limit = 30) => {
    try {
        const skip = (page - 1) * limit;
        const data = await Achievement.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Achievement.countDocuments();
        return { data, total, page, pages: Math.ceil(total / limit) };
    } catch (error) {
        throw new Error(error)
    }
}

export const findById = async (achieveID) => {
    try {
        return await Achievement.findById(achieveID);
    } catch (error) {
        throw new Error(error)
    }   
};