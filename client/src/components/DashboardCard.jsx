import {
  FaRobot,
  FaMicrophone,
  FaFileAlt,
} from "react-icons/fa";

function DashboardCard({ title, value }) {

  const getIcon = () => {

    if (title === "Resume Analyzer") {
      return <FaFileAlt />;
    }

    if (title === "Interview Prep") {
      return <FaMicrophone />;
    }

    return <FaRobot />;
  };

  return (

    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl hover:scale-105 hover:border-purple-500/40 transition-all duration-300 group">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-zinc-400 text-lg font-medium">
            {title}
          </h2>

          <p className="text-4xl font-extrabold mt-5 leading-tight group-hover:text-purple-400 transition-all duration-300">
            {value}
          </p>

        </div>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg">

          {getIcon()}

        </div>

      </div>

    </div>

  );
}

export default DashboardCard;