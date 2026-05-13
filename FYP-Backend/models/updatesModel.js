import mongoose from "mongoose";


const updateSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    validityType: {
        type: String,
        enum: ["24hours", "2days", "3days", "4days","5days", "1week", "Until I Change"],
        require: true
    },
    validity: {
        type: Date,
        default: null,
    },
    image: {
        url: {
            type: String,
            require: true,
        },
        public_id: {
            type: String,
            require: true,
        },
    },
}, { timestamps: true },{expireAfterSeconds: 0});

updateSchema.index({ createdAt: -1 });

export default mongoose.model("Update", updateSchema)