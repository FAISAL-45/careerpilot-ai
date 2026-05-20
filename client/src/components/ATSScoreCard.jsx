import { CircularProgressbar } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import { motion } from "framer-motion";

function ATSScoreCard({ score }) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black p-8 rounded-2xl"
    >

      <h2 className="text-3xl font-bold mb-8">
        ATS Score
      </h2>

      <div className="w-52 h-52 mx-auto">

        <CircularProgressbar
          value={score}
          text={`${score}%`}
        />

      </div>

    </motion.div>
  );
}

export default ATSScoreCard;