import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

export const uploadImage = async (file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(buffer).pipe(stream);
    } catch (err) {
      reject(err);
    }
  });
};