import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";

function Jobs() {
  const [applications, setApplications] =
    useState([]);

  const [company, setCompany] =
    useState("");

  const [role, setRole] =
    useState("");

  const [status, setStatus] =
    useState("Applied");

  const addApplication = () => {
    if (!company || !role) return;

    const newApplication = {
      company,
      role,
      status,
      date: new Date().toLocaleDateString(),
    };

    setApplications([
      newApplication,
      ...applications,
    ]);

    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  const getStatusColor = (status) => {
    if (status === "Interview") {
      return "bg-blue-500/20 text-blue-400";
    }

    if (status === "Rejected") {
      return "bg-red-500/20 text-red-400";
    }

    if (status === "Offer") {
      return "bg-green-500/20 text-green-400";
    }

    return "bg-yellow-500/20 text-yellow-400";
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto text-white">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Job Tracker 🚀
          </h1>

          <p className="text-zinc-400 mt-4 text-lg">
            Organize and manage your applications smartly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-zinc-400 text-lg">
              Applications
            </h2>

            <p className="text-5xl font-extrabold mt-4">
              {applications.length}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-zinc-400 text-lg">
              Interviews
            </h2>

            <p className="text-5xl font-extrabold mt-4 text-blue-400">
              {
                applications.filter(
                  (a) =>
                    a.status === "Interview"
                ).length
              }
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-zinc-400 text-lg">
              Offers
            </h2>

            <p className="text-5xl font-extrabold mt-4 text-green-400">
              {
                applications.filter(
                  (a) =>
                    a.status === "Offer"
                ).length
              }
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-zinc-400 text-lg">
              Rejections
            </h2>

            <p className="text-5xl font-extrabold mt-4 text-red-400">
              {
                applications.filter(
                  (a) =>
                    a.status === "Rejected"
                ).length
              }
            </p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl mb-12">
          <h2 className="text-3xl font-bold mb-8">
            Add New Application
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Company"
              value={company}
              onChange={(e) =>
                setCompany(e.target.value)
              }
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 outline-none"
            />

            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 outline-none"
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 outline-none"
            >
              <option>Applied</option>

              <option>Interview</option>

              <option>Offer</option>

              <option>Rejected</option>
            </select>

            <button
              onClick={addApplication}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
            >
              Add
            </button>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl overflow-x-auto">
          <h2 className="text-3xl font-bold mb-8">
            Application History
          </h2>

          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-zinc-700">
                <th className="pb-5">Company</th>

                <th className="pb-5">Role</th>

                <th className="pb-5">Status</th>

                <th className="pb-5">Date</th>
              </tr>
            </thead>

            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="py-20 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="text-7xl mb-6">
                        🚀
                      </div>

                      <h2 className="text-3xl font-bold">
                        No Applications Yet
                      </h2>

                      <p className="text-zinc-400 mt-4 text-lg">
                        Start tracking your job applications.
                      </p>
                    </div>
                  </td>
                </tr>

              ) : (
                applications.map(
                  (app, index) => (
                    <tr
                      key={index}
                      className="border-b border-zinc-800 hover:bg-white/5 transition-all"
                    >
                      <td className="py-6">
                        <div className="flex items-center gap-3">
                          <FaBuilding />

                          {app.company}
                        </div>
                      </td>

                      <td>
                        <div className="flex items-center gap-3">
                          <FaBriefcase />

                          {app.role}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </td>

                      <td>
                        <div className="flex items-center gap-3">
                          <FaCalendarAlt />

                          {app.date}
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-12 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-blue-400 mb-6">
            AI Insights 🤖
          </h2>

          {applications.length === 0 ? (
            <p className="text-zinc-400 text-lg">
              Add applications to receive AI-powered insights.
            </p>

          ) : (
            <div className="space-y-4 text-zinc-300 text-lg">
              <p>
                • Keep applying consistently to improve opportunities.
              </p>

              <p>
                • Focus on product-based companies for better growth.
              </p>

              <p>
                • Improve DSA and projects for higher callbacks.
              </p>

              <p>
                • Your interview preparation is progressing well.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Jobs;