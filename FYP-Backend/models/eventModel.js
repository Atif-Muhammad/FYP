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
        require: true
    }, 
    location: {
        type: String,
        require: true
    }
}, {timestamps: true});
eventSchema.createIndex({createdAt:-1});

export default mongoose.model("Event", eventSchema);