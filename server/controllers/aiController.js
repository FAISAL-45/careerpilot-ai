import fs from "fs";

import pdfParse from "pdf-parse-new";

import Groq from "groq-sdk";

export const analyzeResume = async (req, res) => {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    console.log("File received:", req.file);

    const dataBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(dataBuffer);

    console.log("PDF parsed successfully");

    const resumeText = pdfData.text;

    console.log("Sending to Groq...");

    const { jobRole } = req.body;

    const prompt = `
You are an advanced ATS Resume Analyzer.

Analyze the resume for the target role:
${jobRole}

Return ONLY valid JSON.

Do NOT return explanation text.

Use this EXACT format:

{
  "atsScore": 85,
  "strengths": [
    "Strong MERN stack projects",
    "Good frontend knowledge"
  ],
  "weaknesses": [
    "No Docker experience",
    "No testing frameworks"
  ],
  "missingSkills": [
    "Docker",
    "TypeScript",
    "AWS"
  ],
  "recommendedJobs": [
    "Frontend Developer",
    "MERN Stack Developer"
  ],
  "suggestions": [
    "Add deployment projects",
    "Learn Docker and CI/CD",
    "Improve resume formatting"
  ]
}

Resume:
${resumeText}
`;

    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    const response =
      chatCompletion.choices[0]?.message?.content;

    const cleanedResponse = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let analysis;

    try {
      analysis = JSON.parse(cleanedResponse);

    } catch (error) {
      console.log("JSON Parse Error");

      console.log(cleanedResponse);

      return res.status(500).json({
        message: "Invalid AI response format",
      });
    }

    res.status(200).json({
      analysis,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};