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
export const findAll = async (page = 1, limit = 30) => {
  try {
    const skip = (page - 1) * limit;
    const data = await Event.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Event.countDocuments();
    return { data, total, page, pages: Math.ceil(total / limit) };
  } catch (error) {
    throw new Error(error);
  }
};
