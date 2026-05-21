import { useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashboardLayout";

function Interview() {
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});

  const generateQuestions = async () => {
    if (!role) return;

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/interview/questions`,
        {
          role,
        }
      );

      setQuestions(response.data.questions);

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  const evaluateAnswer = async (
    question,
    answer,
    index
  ) => {
    if (!answer) return;

    try {
      const response = await axios.post(
       `${import.meta.env.VITE_API_URL}/api/interview/evaluate`,
        {
          question,
          answer,
        }
      );

      setEvaluations((prev) => ({
        ...prev,
        [index]: response.data.feedback,
      }));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="text-white max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Interview Prep 🎤
          </h1>

          <p className="text-zinc-400 mt-4 text-lg">
            Practice AI-powered mock interviews and get instant feedback.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter role (Frontend Developer)"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="flex-1 bg-zinc-800 p-5 rounded-2xl border border-zinc-700 outline-none"
            />

            <button
              onClick={generateQuestions}
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-10 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
            >
              Generate
            </button>
          </div>
        </div>

        {loading && (
          <div className="mt-10 text-center text-blue-400 text-2xl animate-pulse">
            Generating interview questions...
          </div>
        )}

        {questions.length > 0 && (
          <div className="mt-12 space-y-8">
            {questions.map((question, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 p-8 rounded-3xl shadow-xl"
              >
                <h2 className="text-2xl font-bold text-purple-400 mb-4">
                  Question {index + 1}
                </h2>

                <p className="text-lg leading-9 mb-6">
                  {question}
                </p>

                <textarea
                  rows="5"
                  placeholder="Write your answer..."
                  value={answers[index] || ""}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [index]: e.target.value,
                    })
                  }
                  className="w-full bg-black/40 border border-zinc-700 rounded-2xl p-5 outline-none"
                />

                <button
                  onClick={() =>
                    evaluateAnswer(
                      question,
                      answers[index],
                      index
                    )
                  }
                  className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
                >
                  Evaluate Answer
                </button>

                {evaluations[index] && (
                  <div className="mt-8 bg-black/40 border border-zinc-700 rounded-2xl p-6">
                    <h3 className="text-2xl font-bold text-blue-400 mb-4">
                      AI Feedback
                    </h3>

                    <div className="text-zinc-300 leading-9 whitespace-pre-wrap">
                      {evaluations[index]}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Interview;