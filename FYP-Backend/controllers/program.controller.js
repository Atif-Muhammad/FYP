import {
  create,
  findAll,
  remove,
  update,
} from "../services/program.service.js";

// admin controllers
export const addProgram = async (req, res) => {
  try {
    // console.log(req.body)
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).send("Missing field(s)");
    if (!req.file)
      return res.status(400).send("Must provide an image for program");
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
    const newProgram = await create(payload);
    if (!newProgram) return res.status(500).send("Unexpected Error");

    res.status(200).json({ success: true, data: newProgram });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};
export const updateProgram = async (req, res) => {
  try {
    const { title, description, _id } = req.body;
    if (!title || !description || !_id)
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
    };
    if (image) payload.image = image;
    const updated = await update(payload);
    if (!updated) return res.status(500).send("Unexpected Error");

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};

export const deleteProgram = async (req, res) => {
  try {
    const { programID } = req.query;
    if (!programID) return res.status(400).send("program id required");
    const deletedProgram = await remove(programID);
    if (!deletedProgram) return res.status(500).send("Unknown error");
    res.status(200).json({ success: true, data: deletedProgram });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};

// client controllers
export const programs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 30;
    const { data, total, pages } = await findAll(page, limit);

    res.status(200).json({ success: true, data, page, pages, total });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};

export const program = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: "newMember" });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};
