import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Instructor } from "../types/domain";

type DutyDistributionChartProps = {
  instructors: Instructor[];
};

const DutyDistributionChart = ({ instructors }: DutyDistributionChartProps) => {
  const data = instructors.map((instructor) => ({
    name: instructor.full_name,
    duties: instructor.total_duties,
  }));

  return (
    <div className="h-72 w-full rounded-xl bg-surface-container-lowest p-4">
      <h3 className="mb-2 text-sm font-semibold text-on-surface">Duty Distribution</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" hide />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="duties" fill="#0b1a7d" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DutyDistributionChart;
