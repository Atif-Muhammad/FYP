// services/home.service.js
import Program from "../models/programModel.js";
import Member from "../models/memberModel.js";
import Event from "../models/eventModel.js";
import Gallery from "../models/galleryModel.js";
import Update from "../models/updatesModel.js";
import Exective from "../models/exectiveModel.js"


export const topPrograms = async () => {
  try {
    return await Program.find({}, { title: 1, description: 1, image: 1, _id: 1 })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
  } catch (error) {
    throw new Error(`topPrograms: ${error.message}`);
  }
};

export const execMembers = async () => {
  try {
    return await Exective.find(
      { role: { $in: ["Chairman", "Vice President", "General Secretary"] } },
      { name: 1, role: 1, image: 1, about: 1, socials: 1, _id: 1 }
    )
      .sort({ role: 1 })
      .lean();
  } catch (error) {
    throw new Error(`execMembers: ${error.message}`);
  }
};

export const topEvents = async () => {
  try {
    return await Event.find(
      {},
      { title: 1, description: 1, eventDate: 1, location: 1, _id: 1 }
    )
      .sort({ eventDate: 1 })
      .limit(3)
      .lean();
  } catch (error) {
    throw new Error(`topEvents: ${error.message}`);
  }
};

export const latestGalleryImages = async () => {
  try {
    return await Gallery.find({}, { image: 1, _id: 1 })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
  } catch (error) {
    throw new Error(`latestGalleryImages: ${error.message}`);
  }
};

export const latestNewsUpdates = async () => {
  try {
    return await Update.find(
      {},
      { image: 1, title: 1, description: 1, _id: 1 }
    )
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
  } catch (error) {
    throw new Error(`latestNewsUpdates: ${error.message}`);
  }
};
