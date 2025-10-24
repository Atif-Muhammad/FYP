import {
    create,
    findAll,
    findById,
    remove,
    update,
} from "../services/gallery.service.js";
import {uploadFile, removeFile} from "../services/cloudinary.service.js"

// admin controllers
export const addMedia = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) return res.status(400).send("Missing Field(s)");
        if (!req.file)
            return res.status(400).send("Must provide an image for gallery");
        
        const url = await uploadFile(req.file);
        const payload = {
            title,
            description,
            image: url,
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

    const existing = await findById(_id);
    if (!existing) return res.status(404).send("Photo not found");

    let finalImage = existing.image;

    // 🟢 Case 1: New file uploaded → replace old one
    if (req.file) {
      if (existing.image?.public_id) {
        await removeFile(existing.image.public_id);
      }
      const uploaded = await uploadFile(req.file);
      finalImage = uploaded;
    }

    // 🟢 Case 2: No new file, but existing image object sent
    else if (req.body.image) {
      try {
        const parsed = JSON.parse(req.body.image);
        finalImage = parsed;
      } catch {
        finalImage = req.body.image;
      }
    }

    // 🟢 Case 3: No file and no image → remove
    else if (!req.file && !req.body.image && existing.image?.public_id) {
      await removeFile(existing.image.public_id);
      finalImage = undefined;
    }

    // 🧩 Update payload
    const payload = {
      _id,
      title,
      description,
      image: finalImage,
    };

    const updatedGallery = await update(payload);
    if (!updatedGallery)
      return res.status(500).send("Unexpected Error during update");

    res.status(200).json({ success: true, data: updatedGallery });
  } catch (error) {
    console.error("Error updating gallery:", error);
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
    const page = parseInt(req.query.page) || 1;
    const limit = 30;
    const { data, total, pages} = await findAll(page, limit);

    res.status(200).json({ success: true, data, page, pages, total });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};
