import {
  addMemberService,
  deleteMemberService,
  findAll,
  topMembers,
  updateMemberService,
} from "../services/member.service.js";

// admin controllers
export const addMember = async (req, res) => {
  try {
    const {
      role,
      name,
      father_name,
      about,
      CNIC,
      pk,
      district,
      DOB,
      phone,
      email,
      socials,
    } = req.body;

    if (!role || !name || !father_name || !CNIC)
      return res.status(400).send("Missing Field(s)");
    if (!req.file)
      return res.status(400).send("Must provide an image of member");
    const { originalname, mimetype, buffer } = req.file;
    const payload = {
      name,
      father_name,
      role,
      about,
      CNIC,
      pk,
      district,
      DOB,
      phone,
      socials,
      email,
      image: {
        originalname,
        mimetype,
        base64: buffer.toString("base64"),
      },
    };

    const newMember = await addMemberService(payload);
    if (!newMember) {
      return res.status(500).send("Unuxpected error");
    }

    res.status(200).json({ success: true, data: newMember });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};

export const updateMember = async (req, res) => {
  try {
    const {
      _id,
      role,
      name,
      father_name,
      about,
      CNIC,
      pk,
      district,
      DOB,
      phone,
      email,
      socials,
    } = req.body;
    // console.log(req.body)
    if (!role || !name || !father_name || !CNIC || !_id)
      return res.status(400).send("Missing Field");
    
    const image = req.file
      ? {
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          base64: req.file.buffer.toString("base64"),
        }
      : undefined;

    const payload = {
      _id,
      name,
      father_name,
      role,
      about,
      CNIC,
      pk,
      district,
      DOB,
      phone,
      email,
      socials: socials,
    };
    if (image) payload.image = image;
    const updatedMember = await updateMemberService(payload);
    if (!updatedMember) {
      return res.status(500).send("Unexpected error");
    }

    res.status(200).json({ success: true, data: updatedMember });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { memberID } = req.query;
    if (!memberID) return res.status(400).send("Member id required");
    const deletedMember = await deleteMemberService(memberID);
    if (!deletedMember) return res.status(500).send("Unexpected error");
    res.status(200).json({ success: true, data: deletedMember });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};

// client controllers

export const allMembers = async (req, res) => {
  try {
    const top = await topMembers();
    const all = await findAll();
    const membersAll = [...top, ...all]
    res.status(200).json({ success: true, data: membersAll || [] });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};
