import cloudinary from "../config/cloudinary.conf.js";
import crypto from "crypto";

export const uploadFile = async (file) => {
  

    const folder = `fyp/admin`;
    const fileHash = crypto.createHash("md5").update(file.buffer).digest("hex");
    const publicId = `${folder}/${fileHash}`;

    try {
      let existing;
      try {
        existing = await cloudinary.api.resource(publicId, { resource_type: "image" });
      } catch (err) {
        // Cloudinary returns 404 if not found — ignore that
        if (err?.error?.http_code !== 404) throw err;
      }

      if (existing) {
        return {
          url: existing.secure_url,
          public_id: existing.public_id,
        }
      }

      // Upload new image
      const uploaded = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
            public_id: fileHash,
            resource_type: "image",
            overwrite: false,
          },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
        stream.end(file.buffer);
      });

      return {
        type: "image",
        url: uploaded.secure_url,
        public_id: uploaded.public_id,
      };
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error("Failed to upload file(s) to Cloudinary");
    }
  }



export const removeFile = async (public_id) => {
  try {
    return await cloudinary.uploader.destroy(public_id, { resource_type: "image" });
  } catch (error) {
    console.error("Error deleting file from Cloudinary:", error);
    throw new Error("Failed to delete file from Cloudinary");
  }
};
