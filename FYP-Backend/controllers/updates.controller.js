import {
  create,
  findAll,
  remove,
  update,
} from "../services/updates.service.js";
import { uploadFile, removeFile } from "../services/cloudinary.service.js"
import { findById } from "../services/updates.service.js";

// admin controllers
export const addUpdate = async (req, res) => {
  try {
    // console.log(req.body)
    const { title, description, validity } = req.body;
    if (!title || !description || !validity)
      return res.status(400).send("Missing field(s)");
    if (!req.file)
      return res.status(400).send("Must provide an image for the update/news");
   
    const url = await uploadFile(req.file)
    const payload = {
      title,
      description,
      validity,
      image: url,
    };
    const newUpdate = await create(payload);
    if (!newUpdate) return res.status(500).send("Unexpected Error");

    res.status(200).json({ success: true, data: newUpdate });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};


export const editUpdate = async (req, res) => {
  try {
    const { title, description, validity, _id } = req.body;

    if (!title || !description || !_id || !validity)
      return res.status(400).send("Missing field(s)");

    // 🟡 Find existing record
    const existing = await findById(_id);
    if (!existing) return res.status(404).send("Record not found");

    let finalImage = existing.image;

    // 🟢 Case 1: new file uploaded → replace old
    if (req.file) {
      if (existing.image?.public_id) {
        await removeFile(existing.image.public_id);
      }
      const uploaded = await uploadFile(req.file);
      finalImage = uploaded;
    }

    // 🟢 Case 2: no new file, but image object sent → keep
    else if (req.body.image) {
      try {
        const parsed = JSON.parse(req.body.image);
        finalImage = parsed;
      } catch {
        finalImage = req.body.image;
      }
    }

    // 🟢 Case 3: no file and no image in body → remove existing
    else if (!req.file && !req.body.image && existing.image?.public_id) {
      await removeFile(existing.image.public_id);
      finalImage = undefined;
    }

    // 🧩 Final payload
    const payload = {
      _id,
      title,
      description,
      validity,
      image: finalImage,
    };

    const updated = await update(payload);
    if (!updated) return res.status(500).send("Unexpected Error");

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("Error editing update:", error);
    res.status(500).json({ cause: error.message });
  }
};


export const deleteUpdate = async (req, res) => {
  try {
    const { newsID } = req.query;
    if (!newsID) return res.status(400).send("news/update id required");
    const deletedNews = await remove(newsID);
    if (!deletedNews) return res.status(500).send("Unknown error");
    res.status(200).json({ success: true, data: deletedNews });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};

// client controllers
export const updates = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
        const limit = 30;
        const { data, total, pages} = await findAll(page, limit);
    
        res.status(200).json({ success: true, data, page, pages, total });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};
