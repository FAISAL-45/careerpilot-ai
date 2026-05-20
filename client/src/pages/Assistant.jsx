import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import DashboardLayout from "../components/DashboardLayout";
import { FaRobot, FaUser } from "react-icons/fa";

function Assistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message) return;

    const userMessage = {
      role: "user",
      text: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/assistant/chat",
        {
          message,
        }
      );

      const aiMessage = {
        role: "assistant",
        text: response.data.reply,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      setMessage("");

    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="text-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              AI Career Assistant 🤖
            </h1>

            <p className="text-zinc-400 mt-4 text-lg">
              Ask anything about coding, resumes, interviews, placements, or careers.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden">
            <div className="h-[70vh] overflow-y-auto p-8 space-y-8">
              {messages.length === 0 && (
                <div className="text-center mt-28">
                  <h2 className="text-4xl font-bold mb-6">
                    Start chatting with AI 🚀
                  </h2>

                  <p className="text-zinc-400 text-xl">
                    Try asking:
                    <br />
                    “How do I improve my resume?”
                    <br />
                    “Best MERN projects for placements?”
                  </p>
                </div>
              )}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-4 ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                      <FaRobot />
                    </div>
                  )}

                  <div
                    className={`max-w-4xl p-6 rounded-3xl leading-8 text-lg ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl"
                        : "bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 shadow-xl"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <div className="prose prose-invert max-w-none prose-headings:text-blue-400 prose-strong:text-yellow-400 prose-li:marker:text-purple-400">
                        <ReactMarkdown>
                          {msg.text}
                        </ReactMarkdown>
                      </div>

                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center shrink-0">
                      <FaUser />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <FaRobot />
                  </div>

                  <div className="bg-zinc-800 px-8 py-5 rounded-3xl animate-pulse text-zinc-400">
                    AI is thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-zinc-800 p-6 flex gap-4 bg-black/20">
              <input
                type="text"
                placeholder="Ask anything..."
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                className="flex-1 bg-zinc-800 p-5 rounded-2xl border border-zinc-700 outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }

                }}
              />

              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-10 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Assistant;