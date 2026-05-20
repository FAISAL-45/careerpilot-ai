import {
  FaHome,
  FaFileAlt,
  FaBriefcase,
  FaRobot,
  FaMicrophone,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-blue-500 to-purple-600"
        : "hover:bg-zinc-800"
    }`;

  return (
    <div className="w-72 min-h-screen bg-[#0f172a] p-6 border-r border-zinc-800">

      <h1 className="text-4xl font-extrabold mb-14 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        CareerPilot AI
      </h1>

      <div className="flex flex-col gap-4">

        <NavLink
          to="/dashboard"
          className={navLinkClass}
        >
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/dashboard"
          className={navLinkClass}
        >
          <FaFileAlt />
          <span>Resume Analyzer</span>
        </NavLink>

        <NavLink
          to="/jobs"
          className={navLinkClass}
        >
          <FaBriefcase />
          <span>Job Tracker</span>
        </NavLink>

        <NavLink
          to="/assistant"
          className={navLinkClass}
        >
          <FaRobot />
          <span>AI Assistant</span>
        </NavLink>

        <NavLink
          to="/interview"
          className={navLinkClass}
        >
          <FaMicrophone />
          <span>Interview Prep</span>
        </NavLink>

      </div>

    </div>
  );
}

export default Sidebar;