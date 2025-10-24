import mongoose from "mongoose";

const achieveSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        url: String,
        public_id: String
    }
}, {timestamps: true});
achieveSchema.index({createdAt:-1});

export default mongoose.model("Achievement", achieveSchema);