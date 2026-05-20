import express from "express";
import Job from "../models/Job.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const applications = await Job.countDocuments();

    const interviews = await Job.countDocuments({
      status: "Interview",
    });

    const atsScore = 0;

    res.json({
      applications,
      interviews,
      atsScore,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch stats",
    });
  }
});

export default router;