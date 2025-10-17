import Event from "../models/eventModel.js";

// admin services
export const create = async (payload) => {
    try {
        return await Event.create(payload);
    } catch (error) {
        throw new Error(error);
    }
};
export const update = async (payload) => {
    try {
        if (!payload) throw new Error("No field detected");
        return await Event.findByIdAndUpdate(
            payload?._id,
            { $set: payload },
            { new: true }
        );
    } catch (error) {
        throw new Error(error);
    }
};
export const remove = async (eventID) => {
    try {
        if (!eventID) throw new Error("Event id required");
        return await Event.deleteOne({ _id: eventID });
    } catch (error) {
        throw new Error(error);
    }
};

// client services
export const findAll = async () => {
    try {
        return await Event.find({}).sort({createdAt: -1});
    } catch (error) {
        throw new Error(error);
    }
};
