import Gallery from "../models/galleryModel.js"


// admin services
export const create = async (payload)=>{
    try {
        return await Gallery.create(payload);
    } catch (error) {
        throw new Error(error)
    }
}
export const update = async (payload)=>{
    try {
        return await Gallery.findByIdAndUpdate(payload?._id, {$set: payload}, {new: true});
    } catch (error) {
        throw new Error(error)
    }
}
export const remove = async (mediaID)=>{
    try {
        return await Gallery.deleteOne({_id: mediaID});
    } catch (error) {
        throw new Error(error)
    }
}

// client services
export const findAll = async ()=>{
    try {
        return await Gallery.find({}).sort({createdAt: -1});
    } catch (error) {
        throw new Error(error)
    }
}