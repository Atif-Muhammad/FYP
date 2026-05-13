import mongoose from "mongoose";
import Update from "../models/updatesModel.js"


// admin services
export const create = async (payload) => {
    try {
        return await Update.create(payload);
    } catch (error) {
        throw new Error(error)
    }
}
export const update = async (payload) => {
    try {
        return await Update.findByIdAndUpdate(new mongoose.Types.ObjectId(payload?._id), { $set: payload }, { new: true });
    } catch (error) {
        throw new Error(error)
    }
}
export const remove = async (newsID) => {
    try {
        return await Update.deleteOne({ _id: newsID });
    } catch (error) {
        throw new Error(error)
    }
}

// client services
export const findAll = async (page = 1, limit = 30) => {
    try {
        const skip = (page - 1) * limit;
        const data = await Update.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Update.countDocuments();
        return { data, total, page, pages: Math.ceil(total / limit) };

    } catch (error) {
        throw new Error(error)
    }
}

export const findById = async (newsID) => {
    try {
        return await Update.findById(newsID);   
    } catch (error) {
        throw new Error(error)
    }
}