import Admin from "../models/adminUser.js"

export const findUserbyEmail = async (email)=>{
    try {
        return await Admin.findOne({email});
    } catch (error) {
        throw new Error(error)
    }
}
export const createAdmin = async (payload)=>{
    try {
        return await Admin.create(payload);
    } catch (error) {
        throw new Error(error)
    }
}

