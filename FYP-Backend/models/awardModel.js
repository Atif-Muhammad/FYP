import mongoose from "mongoose";

const awardSchema = mongoose.Schema({
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
awardSchema.index({createdAt:-1});

export default mongoose.model("Award", awardSchema);