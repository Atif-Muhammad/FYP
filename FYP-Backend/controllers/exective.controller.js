import { removeFile, uploadFile } from "../services/cloudinary.service.js";
import { create, findAll, findById, remove, update } from "../services/exective.service.js";



export const createExective = async (req, res) => {
    try {
        // console.log(req.body)
        const { name, role, about, district, livingIn, message } = req.body;
        if (!name || !role) return res.status(400).send("Missing Field(s)");

        if (!req.file)
            return res.status(400).send("Must provide an image of member");
        const url = await uploadFile(req.file);

        const payload = {
            name, role, about, district, livingIn, message, image: url, socials: JSON.parse(req.body.socials)
        }

        const newMember = await create(payload);
        if (!newMember) return res.status(500).send("Unuxpected error");
        res.status(200).json({ success: true, data: newMember });
    } catch (error) {
        res.status(500).json({ cause: error.message })
    }
}
export const updateExective = async (req, res) => {
    try {
        const { _id, name, role, about, district, livingIn, message, socials } = req.body;

        if (!name || !role || !_id)
            return res.status(400).send("Missing required field");

        // Find existing member
        const member = await findById(_id);
        if (!member) return res.status(404).send("Executive not found");

        let finalImage = member.image;

        // Case 1: New image uploaded → replace old one
        if (req.file) {
            if (member.image?.public_id) {
                await removeFile(member.image.public_id);
            }
            const uploaded = await uploadFile(req.file);
            finalImage = uploaded; // { url, public_id }
        }

        // Case 2: Existing image sent → keep it
        else if (req.body.image) {
            try {
                const parsed = JSON.parse(req.body.image);
                finalImage = parsed;
            } catch {
                finalImage = req.body.image;
            }
        }

        // Case 3: Image removed intentionally → delete from cloud
        else if (!req.file && !req.body.image && member.image?.public_id) {
            await removeFile(member.image.public_id);
            finalImage = undefined;
        }

        // 🧩 Normalize socials (FormData sends as string)
        const normalizedSocials =
            typeof socials === "string" ? JSON.parse(socials) : socials;

        const payload = {
            _id,
            name,
            role,
            about,
            district,
            livingIn,
            message,
            image: finalImage,
            socials: normalizedSocials,
        };

        const updatedMember = await update(payload);
        if (!updatedMember)
            return res.status(500).send("Unexpected error during update");

        res.status(200).json({ success: true, data: updatedMember });
    } catch (error) {
        console.error("Error updating executive:", error);
        res.status(500).json({ cause: error.message });
    }
};

export const deleteExective = async (req, res) => {
    try {
        const { execID } = req.query;
        if (!execID) return res.status(400).send("Exec id required");

        const member = await findById(execID);
        if (!member) return res.status(404).json({ message: "Executive not found" });

        if (member.image?.public_id) {
            await removeFile(member.image.public_id);
        }

        const deletedMember = await remove(execID);
        if (!deletedMember) return res.status(500).send("Unexpected error");
        res.status(200).json({ success: true, data: deletedMember });

    } catch (error) {
        res.status(500).json({ cause: error.message })
    }
}
export const allExecs = async (req, res) => {
    try {
        const execs = await findAll();
        if (execs?.length === 0) return res.status(200).json({ success: false, data: [] })
        res.status(200).json({
            success: true,
            data: execs
        })
    } catch (error) {
        res.status(500).json({ cause: error.message })
    }
}
export const allExecsClient = async (req, res) => {
    try {
        const execs = await findAll();
        if (!execs || execs.length === 0)
            return res.status(200).json({ success: false, data: [] });

        const grouped = {
            main: execs.filter((e) =>
                ["General Secretary", "Vice President", "Chairman"].includes(e.role)
            ),
            patron: execs.filter((e) => ["Patron in Chief"].includes(e.role)),
            advisors: execs.filter((e) =>
                ["Legal Advisor",
                    "Technical Advisor",
                    "Political Advisor",
                    "Financial Advisor"].includes(e.role)
            ),
            others: execs.filter((e) =>
                ["Chief Election Officer", "Youth Governor"].includes(e.role)
            ),
        };

        res.status(200).json({
            success: true,
            data: grouped,
        });
    } catch (error) {
        res.status(500).json({ cause: error.message });
    }
}


