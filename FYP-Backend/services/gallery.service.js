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
export const findAll = async (page = 1, limit = 30)=>{
    try {
        const skip = (page - 1) * limit;
            const data = await Gallery.find({})
              .sort({ createdAt: -1 })
              .skip(skip)
              .limit(limit);
        
            const total = await Gallery.countDocuments();
            return { data, total, page, pages: Math.ceil(total / limit) };
    } catch (error) {
        throw new Error(error)
    }
}

export const findById = async (id)=>{
    try {
        return await Gallery.findById(id); 
    } catch (error) {
        throw new Error(error)
    }
}