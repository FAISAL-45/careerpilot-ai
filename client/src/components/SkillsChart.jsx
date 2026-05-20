import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SkillsChart({ skills }) {

  if (!skills || skills.length === 0) {

    return null;

  }

  const data = skills.map((skill) => ({
    name: skill,
    value: Math.floor(
      Math.random() * 40
    ) + 60,
  }));

  return (

    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl">

      <h2 className="text-3xl font-bold mb-10 text-yellow-400">

        Missing Skills Analysis

      </h2>

      <div className="h-[400px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" radius={[10,10,0,0]} />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}

export default SkillsChart;