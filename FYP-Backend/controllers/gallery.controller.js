import {
    create,
    findAll,
    remove,
    update,
} from "../services/gallery.service.js";

// admin controllers
export const addMedia = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) return res.status(400).send("Missing Field(s)");
        if (!req.file)
            return res.status(400).send("Must provide an image for gallery");
        const { originalname, mimetype, buffer } = req.file;
        const payload = {
            title,
            description,
            image: {
                originalname,
                mimetype,
                base64: buffer.toString("base64"),
            },
        };
        const newMedia = await create(payload);
        if (!newMedia) return res.status(500).send("Unexpected Error");

        res.status(200).json({ success: true, data: newMedia });
    } catch (error) {
        res.status(500).send({ cause: error.message });
    }
};
export const updateMedia = async (req, res) => {
    try {
        const { title, description, _id } = req.body;
        if (!title || !description || !_id)
            return res.status(400).send("Missing Field(s)");
        const image = req.file
            ? {
                originalname: req.file.originalname,
                mimetype: req.file.mimetype,
                base64: req.file.buffer.toString("base64"),
            }
            : undefined;
        const payload = {
            _id,
            title,
            description,
        };
        if (image) payload.image = image;
        const updatedGallery = await update(payload);
        if (!updatedGallery) return res.status(500).send("Unexpected Error");

        res.status(200).json({ success: true, data: updatedGallery });
    } catch (error) {
        res.status(500).send({ cause: error.message });
    }
};
export const removeMedia = async (req, res) => {
    try {
        const { mediaID } = req.query;
        if (!mediaID) return res.status(400).send("Media id required");

        const removedMedia = await remove(mediaID);
        if (!removedMedia) return res.status(500).send("Unexpected Error");

        res.status(200).json({ success: true, data: removedMedia });
    } catch (error) {
        res.status(500).send({ cause: error.message });
    }
};

// client controllers
export const gallery = async (req, res) => {
    try {
        const allMedia = await findAll();
        if (!allMedia) return res.status(500).send("Unexpected Error");

        res.status(200).json({ success: true, data: allMedia || [] });
    } catch (error) {
        res.status(500).send({ cause: error.message });
    }
};
