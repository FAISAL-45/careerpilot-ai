import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

function SkillsChart({ skills }) {

  const data = skills.map(
    (skill, index) => ({
      name: skill,
      value: 100 - index * 10,
    })
  );

  const colors = [
    "#3B82F6",
    "#8B5CF6",
    "#06B6D4",
    "#10B981",
    "#F59E0B",
    "#EF4444",
  ];

  return (

    <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-3xl border border-zinc-800 shadow-2xl">

      <h2 className="text-3xl font-bold text-white mb-8">

        Skills Analysis 📊

      </h2>

      <div className="h-[400px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#27272a"
            />

            <XAxis
              dataKey="name"
              stroke="#ffffff"
            />

            <YAxis stroke="#ffffff" />

            <Tooltip />

            <Bar
              dataKey="value"
              radius={[12, 12, 0, 0]}
            >

              {data.map((entry, index) => (

                <Cell
                  key={`cell-${index}`}
                  fill={
                    colors[
                      index % colors.length
                    ]
                  }
                />

              ))}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}

export default SkillsChart;