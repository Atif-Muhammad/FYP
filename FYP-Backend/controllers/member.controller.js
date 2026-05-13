import { uploadFile, removeFile } from "../services/cloudinary.service.js";
import {
  addMemberService,
  deleteMemberService,
  findAll,
  findById,
  updateMemberService,
} from "../services/member.service.js";

// admin controllers
export const addMember = async (req, res) => {
  try {
    const {
      name,
      father_name,
      about,
      CNIC,
      pk,
      district,
      DOB,
      phone,
      email,
    } = req.body;

    if (!name || !father_name || !CNIC)
      return res.status(400).send("Missing Field(s)");
    if (!req.file)
      return res.status(400).send("Must provide an image of member");
    // add to cloudinary
    const url = await uploadFile(req.file)

    const payload = {
      name,
      father_name,
      about,
      CNIC,
      pk,
      district,
      DOB,
      phone,
      email,
      image: url,
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
      name,
      father_name,
      about,
      CNIC,
      pk,
      district,
      DOB,
      phone,
      email,
    } = req.body;

    if (!name || !father_name || !CNIC || !_id)
      return res.status(400).send("Missing required field");


    const member = await findById(_id)
    if (!member) return res.status(404).send("Member not found");

    let finalImage = member.image;

    // Case 1: New image uploaded → replace old one
    if (req.file) {
      if (member.image?.public_id) {
        await removeFile(member.image.public_id);
      }
      const uploaded = await uploadFile(req.file);
      finalImage = uploaded;
    }

    // Case 2: No new file, but existing image sent in body → keep that
    else if (req.body.image) {
      try {
        const parsed = JSON.parse(req.body.image);
        finalImage = parsed; // use existing
      } catch {
        finalImage = req.body.image; // in case frontend already sends as stringified object
      }
    }

    // Case 3: No image in file or body → remove image
    else if (!req.file && !req.body.image && member.image?.public_id) {
      await removeFile(member.image.public_id);
      finalImage = undefined;
    }

    const payload = {
      _id,
      name,
      father_name,
      about,
      CNIC,
      pk,
      district,
      DOB,
      phone,
      email,
      image: finalImage,
    };

    const updatedMember = await updateMemberService(payload);
    if (!updatedMember) return res.status(500).send("Unexpected error during update");

    res.status(200).json({ success: true, data: updatedMember });
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ cause: error.message });
  }
};


export const deleteMember = async (req, res) => {
  try {
    const { memberID } = req.query;
    if (!memberID) return res.status(400).send("Member id required");

    // Find member to get image public_id
    const member = await findById(memberID);
    if (!member) return res.status(404).send("Member not found");

    if (member.image?.public_id) {
      await removeFile(member.image.public_id);
    }

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
    const page = parseInt(req.query.page) || 1;
    const limit = 30;
    const { members, total, pages } = await findAll(page, limit);


    res.status(200).json({
      success: true,
      data: members,
      page,
      pages,
      total,
    });
  } catch (error) {
    res.status(500).json({ cause: error.message });
  }
};