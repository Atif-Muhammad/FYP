import {
  create,
  findAll,
  remove,
  update,
} from "../services/updates.service.js";

// admin controllers
export const addUpdate = async (req, res) => {
  try {
    // console.log(req.body)
    const { title, description, validity } = req.body;
    if (!title || !description || !validity)
      return res.status(400).send("Missing field(s)");
    if (!req.file)
      return res.status(400).send("Must provide an image for the update/news");
    const { originalname, mimetype, buffer } = req.file;
    const payload = {
      title,
      description,
      validity,
      image: {
        originalname,
        mimetype,
        base64: buffer.toString("base64"),
      },
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
    // console.log(req.body);
    const { title, description, validity, _id } = req.body;
    if (!title || !description || !_id || !validity)
      return res.status(400).send("Missing field(s)");
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
      validity,
    };
    if (image) payload.image = image;
    const updated = await update(payload);
    if (!updated) return res.status(500).send("Unexpected Error");

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
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
    const allUpdates = await findAll();
    res.status(200).json({ success: true, data: allUpdates || [] });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};
