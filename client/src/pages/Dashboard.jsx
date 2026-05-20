import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import ResumeUpload from "../components/ResumeUpload";
import { useState } from "react";

function Dashboard() {
  const navigate = useNavigate();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  useEffect(() => {
    const userInfo =
      localStorage.getItem("userInfo");

    if (!userInfo) {
      navigate("/");
    }

  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");

    navigate("/");
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center flex-wrap gap-6">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Welcome back, {userInfo?.name} 🚀
          </h1>

          <p className="text-zinc-400 mt-4 text-lg">
            Manage your AI-powered career journey
          </p>
        </div>

        <button
          onClick={logoutHandler}
          className="bg-gradient-to-r from-red-500 to-pink-500 px-8 py-4 rounded-2xl font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-14">
        <DashboardCard
          title="Resume Analyzer"
          value="AI Powered"
        />

        <DashboardCard
          title="Interview Prep"
          value="Active"
        />

        <DashboardCard
          title="Career Assistant"
          value="Online"
        />
      </div>

      <div className="mt-16">
        <ResumeUpload />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;