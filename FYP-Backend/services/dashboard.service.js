import Member from "../models/memberModel.js"
import Program from "../models/programModel.js"
import Event from "../models/eventModel.js"
import Update from "../models/updatesModel.js"

// Members
export const totalMembers = async () => {
  try {
    const members = await Member.find({}, { createdAt: 1 }).sort({ createdAt: 1 });
    return {
      count: members.length,
      createdAt: members.map((m) => m.createdAt),
    };
  } catch (error) {
    throw new Error(error);
  }
};

// Programs
export const totalPrograms = async () => {
  try {
    const programs = await Program.find({}, { createdAt: 1 }).sort({ createdAt: 1 });
    return {
      count: programs.length,
      createdAt: programs.map((p) => p.createdAt),
    };
  } catch (error) {
    throw new Error(error);
  }
};

// Events
export const totalEvents = async () => {
  try {
    const events = await Event.find({}, { createdAt: 1 }).sort({ createdAt: 1 });
    return {
      count: events.length,
      createdAt: events.map((e) => e.createdAt),
    };
  } catch (error) {
    throw new Error(error);
  }
};

// Updates/News
export const totalUpdates = async () => {
  try {
    const updates = await Update.find({}, { createdAt: 1 }).sort({ createdAt: 1 });
    return {
      count: updates.length,
      createdAt: updates.map((u) => u.createdAt),
    };
  } catch (error) {
    throw new Error(error);
  }
};
