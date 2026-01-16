import { ReactNode } from "react";

type StatCardColor =
  | "blue"
  | "green"
  | "yellow"
  | "purple"
  | "red";

interface StatCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  color?: StatCardColor;
}

const colorMap: Record<StatCardColor, string> = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  yellow: "bg-yellow-100 text-yellow-600",
  purple: "bg-purple-100 text-purple-600",
  red: "bg-red-100 text-red-600",
};

export default function StatCard({
  title,
  value,
  icon,
  color = "blue",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>

      {icon && (
        <div
          className={`h-12 w-12 rounded-lg flex items-center justify-center ${colorMap[color]}`}
        >
          {icon}
        </div>
      )}
    </div>
  );
}
