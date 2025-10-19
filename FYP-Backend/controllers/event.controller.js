import { create, findAll, remove, update } from "../services/event.service.js";


// admin controllers
export const addEvent = async (req, res)=>{
    try {
        const {title, description, eventDate, location} = req.body;
        if(!title || !description || !eventDate || !location) return res.status(400).send("Missing Field(s)");
        const addedEvent = await create({title, description, eventDate, location});
        if(!addedEvent) return res.status(500).send("Unknown Error");
        res.status(200).json({ success: true, data: addedEvent });
    } catch (error) {
        res.status(500).send({cause: error.message})
    }
}
export const updateEvent = async (req, res)=>{
    try {
        const {title, description, eventDate, location, _id} = req.body;
        if(!title || !description || !eventDate || !location || !_id) return res.status(400).send("Missing Field(s)");
        const updatedEvent = await update({_id, title, description, eventDate, location});
        if(!updatedEvent) return res.status(500).send("Unknown Error");
        res.status(200).json({ success: true, data: updatedEvent });
    } catch (error) {
        res.status(500).send({cause: error.message})
    }
}
export const removeEvent = async (req, res)=>{
    try {
        const {eventID} = req.query;
        if(!eventID) return res.status(400).send("event id required");
        const deletedEvent = await remove(eventID);
        if(!deletedEvent) return res.status(500).send("Unknown Error");
        res.status(200).json({ success: true, data: deletedEvent });
    } catch (error) {
        res.status(500).send({cause: error.message});
    }
}
// client controllers
export const allEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 30;
    const result = await findAll(page, limit);

    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};