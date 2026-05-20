import { useState } from "react";
import toast from "react-hot-toast";
import { analyzeResume } from "../services/aiService";
import ATSScoreCard from "./ATSScoreCard";
import SkillsChart from "./SkillsChart";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [jobRole, setJobRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return toast.error(
        "Please upload resume"
      );
    }

    if (!jobRole) {
      return toast.error(
        "Enter target job role"
      );
    }

    try {
      setLoading(true);

      const data = await analyzeResume(
        file,
        jobRole
      );

      console.log(data);

      setAnalysis(data.analysis);

      toast.success(
        "Resume analyzed successfully"
      );

    } catch (error) {
      console.log(error);

      toast.error("Analysis failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-10 rounded-[2rem] mt-16 shadow-2xl">
      <div className="mb-10">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          AI Resume Analyzer 🚀
        </h2>

        <p className="text-zinc-400 mt-4 text-lg">
          Upload your resume and get AI-powered ATS insights.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <input
          type="text"
          placeholder="Enter target role (Frontend Developer)"
          value={jobRole}
          onChange={(e) =>
            setJobRole(e.target.value)
          }
          className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 outline-none focus:border-blue-500 transition-all"
        />

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-700 text-white file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 file:text-white hover:file:opacity-90"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.01] transition-all duration-300 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl disabled:opacity-50"
        >
          {loading
            ? "Analyzing Resume..."
            : "Analyze Resume"}
        </button>
      </form>

      {loading && (
        <div className="mt-12 text-center">
          <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />

          <p className="mt-6 text-blue-400 text-2xl">
            AI is analyzing your resume...
          </p>
        </div>
      )}

      {analysis && (
        <div className="mt-14 space-y-10">
          <ATSScoreCard
            score={analysis.atsScore}
          />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 p-8 rounded-3xl">
              <h3 className="text-3xl font-bold text-green-400 mb-6">
                Strengths 💪
              </h3>

              <div className="space-y-4">
                {analysis.strengths?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="bg-black/30 p-4 rounded-2xl border border-green-500/10"
                    >
                      • {item}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20 p-8 rounded-3xl">
              <h3 className="text-3xl font-bold text-red-400 mb-6">
                Weaknesses ⚠️
              </h3>

              <div className="space-y-4">
                {analysis.weaknesses?.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="bg-black/30 p-4 rounded-2xl border border-red-500/10"
                    >
                      • {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 p-8 rounded-3xl">
            <h3 className="text-3xl font-bold text-yellow-400 mb-8">
              Missing Skills 🔥
            </h3>

            <div className="flex flex-wrap gap-4">
              {analysis.missingSkills?.map(
                (skill, index) => (
                  <span
                    key={index}
                    className="bg-yellow-500/20 text-yellow-300 px-5 py-3 rounded-full border border-yellow-500/30 font-semibold"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          <SkillsChart
            skills={
              analysis.missingSkills || []
            }
          />

          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 p-8 rounded-3xl">
            <h3 className="text-3xl font-bold text-purple-400 mb-8">
              Suggested Improvements 🚀
            </h3>

            <div className="space-y-4">
              {analysis.suggestions?.map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-black/30 p-5 rounded-2xl border border-purple-500/10"
                  >
                    • {item}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-8 rounded-3xl">
            <h3 className="text-3xl font-bold text-blue-400 mb-8">
              Recommended Jobs 💼
            </h3>

            <div className="flex flex-wrap gap-4">
              {analysis.recommendedJobs?.map(
                (job, index) => (
                  <span
                    key={index}
                    className="bg-blue-500/20 text-blue-300 px-5 py-3 rounded-full border border-blue-500/30 font-semibold"
                  >
                    {job}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;