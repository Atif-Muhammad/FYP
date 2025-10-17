import Member from "../models/memberModel.js"
import Program from "../models/programModel.js"
import Event from "../models/eventModel.js"
import Update from "../models/updatesModel.js"

export const totalMembers = async ()=>{
    try {
        return await Member.countDocuments({role: "member"})
    } catch (error) {
        throw new Error(error);
    }
}

export const totalPrograms = async ()=>{
    try {
        return await Program.countDocuments();
    } catch (error) {
        throw new Error(error);
    }
}

export const totalEvents = async ()=>{
    try {
        return await Event.countDocuments();
    } catch (error) {
        throw new Error(error);
    }
}

export const totalUpdates = async ()=>{
    try {
        return await Update.countDocuments()
    } catch (error) {
        throw new Error(error);
    }
}