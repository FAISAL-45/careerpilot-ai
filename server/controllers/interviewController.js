import Groq from "groq-sdk";

export const generateQuestions = async (req, res) => {

  try {

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { role } = req.body;

    const prompt = `
Generate 10 interview questions for a ${role} role.

Return ONLY JSON array.

Example:
[
  "Question 1",
  "Question 2"
]
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

    const questions = JSON.parse(cleanedResponse);

    res.status(200).json({
      questions,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

export const evaluateAnswer = async (req, res) => {

  try {

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { question, answer } = req.body;

    const prompt = `
Evaluate this interview answer.

Question:
${question}

Answer:
${answer}

Provide:
1. Score out of 10
2. Strengths
3. Weaknesses
4. Improvements
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

    const feedback =
      chatCompletion.choices[0]?.message?.content;

    res.status(200).json({
      feedback,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};