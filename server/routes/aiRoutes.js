import express from "express";

import upload from "../middleware/uploadMiddleware.js";

import protect from "../middleware/authMiddleware.js";

import { analyzeResume } from "../controllers/aiController.js";

const router = express.Router();

router.post(
  "/analyze",
  protect,
  upload.single("resume"),
  analyzeResume
);

export default router;