import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }, 
    eventDate: {
        type: String,
        require: true,
        index: true
    }, 
    location: {
        type: String,
        require: true
    }
}, {timestamps: true});
eventSchema.index({createdAt:-1});

export default mongoose.model("Event", eventSchema);