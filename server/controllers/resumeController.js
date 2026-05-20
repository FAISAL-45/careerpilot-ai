import cloudinary from "../config/cloudinary.js";

import User from "../models/User.js";

export const uploadResume = async (req, res) => {
  try {

    
    const result = await cloudinary.uploader.upload(
      req.file.path,
      {
        resource_type: "raw",
        folder: "resumes",
      }
    );


    const user = await User.findById(req.user._id);

    user.resume = result.secure_url;

    await user.save();

    res.status(200).json({
      message: "Resume uploaded successfully",
      resumeUrl: result.secure_url,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};