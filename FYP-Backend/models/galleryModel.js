import mongoose from "mongoose";

const gallerySchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        originalname: {
            type: String,
            require: true,
        },
        mimetype: {
            type: String,
            require: true,
        },
        base64: {
            type: String,
            require: true,
        },
    },
}, {timestamps: true});

gallerySchema.index({createdAt:-1});

export default mongoose.model("Gallery", gallerySchema);