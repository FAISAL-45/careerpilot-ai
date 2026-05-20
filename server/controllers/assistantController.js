import Groq from "groq-sdk";

export const chatWithAssistant = async (
  req,
  res
) => {

  try {

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { message } = req.body;

    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "system",
           content: `
You are a premium AI career assistant.

Always answer in a BEAUTIFUL structured format.

Rules:
- Use headings
- Use bullet points
- Use spacing
- Use short paragraphs
- Use markdown formatting
- Highlight important points
- Keep answers visually clean

Help users with:
- resumes
- coding
- interviews
- placements
- learning roadmaps
- career guidance
- software projects
`,
          },
          {
            role: "user",
            content: message,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    const reply =
      chatCompletion.choices[0]?.message?.content;

    res.status(200).json({
      reply,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};