import { uploadFile } from "../services/cloudinary.service.js";
import {
  create,
  findAll,
  findById,
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
    const url = await uploadFile(req.file);
    const payload = {
      title,
      description,
      image: url
    };
    // console.log(payload)
    const newProgram = await create(payload);
    if (!newProgram) return res.status(500).send("Unexpected Error");

    res.status(200).json({ success: true, data: newProgram });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};

export const updateProgram = async (req, res) => {
  try {
    const { _id, title, description } = req.body;
    if (!title || !description || !_id)
      return res.status(400).send("Missing field(s)");

    // Fetch existing program
    const program = await findById(_id);
    if (!program) return res.status(404).send("Program not found");

    let finalImage = program.image;

    // Case 1: New image uploaded → replace old one
    if (req.file) {
      if (program.image?.public_id) {
        await removeFile(program.image.public_id);
      }
      const uploaded = await uploadFile(req.file);
      finalImage = uploaded;
    }

    // Case 2: No new file, but existing image sent in body → keep that
    else if (req.body.image) {
      try {
        const parsed = JSON.parse(req.body.image);
        finalImage = parsed; // keep existing image
      } catch {
        finalImage = req.body.image; // in case frontend already sends as object
      }
    }

    // Case 3: No file, no image field → remove existing
    else if (!req.file && !req.body.image && program.image?.public_id) {
      await removeFile(program.image.public_id);
      finalImage = undefined;
    }

    const payload = {
      _id,
      title,
      description,
      image: finalImage,
    };

    const updated = await update(payload);
    if (!updated) return res.status(500).send("Unexpected Error during update");

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating program:", error);
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
