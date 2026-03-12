import React, { useState, useContext, useMemo } from "react";
import { TaskContext } from "../context/BillContext";

const BAR_COLORS = ["#b6d13a", "#b6d13a", "#b6d13a", "#b6d13a", "#b6d13a", "#b6d13a"];
const HIGHLIGHT_COLOR = "#a2d13a";

const Chart = () => {
  const { tasks } = useContext(TaskContext);
  const [hovered, setHovered] = useState(null);

  // Generate months: 3 before current, current, 2 after
  const monthlyData = useMemo(() => {
    const currentDate = new Date();

    return Array.from({ length: 6 }, (_, i) => {
      const date = new Date(currentDate);
      date.setMonth(currentDate.getMonth() - 3 + i);

      return {
        label: date.toLocaleString("default", { month: "short" }),
        tooltip: date.toLocaleString("default", { month: "long" }),
        monthIndex: date.getMonth(),
        year: date.getFullYear(),
      };
    });
  }, []);

  // Calculate hours per month
  const data = useMemo(() => {
    return monthlyData.map((month) => {
      const monthSum = tasks.reduce((sum, task) => {
        if (!task?.dueDate) return sum;

        const taskDate = new Date(task.dueDate);

        if (
          taskDate.getMonth() === month.monthIndex &&
          taskDate.getFullYear() === month.year
        ) {
          return sum + (task.hoursLogged || 0);
        }

        return sum;
      }, 0);

      return {
        label: month.label,
        value: monthSum,
        tooltip: `${month.tooltip}: ${monthSum}h`,
      };
    });
  }, [tasks, monthlyData]);

  const width = 500;
  const height = 320;
  const chartBottom = 270;
  const barHeightMax = 220;
  const barWidth = 44;
  const gap = 24;
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="w-full ml-2 sm:ml-20 max-w-[500px] flex items-end relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="xMidYMid meet"
        className="block"
      >
        {data.map((d, i) => {
          const barHeight = (d.value / maxValue) * barHeightMax;
          const x = i * (barWidth + gap) + 10;
          const y = chartBottom - barHeight;
          const isHovered = hovered === i;

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={8}
                fill={isHovered ? HIGHLIGHT_COLOR : BAR_COLORS[i % BAR_COLORS.length]}
                style={{
                  filter: isHovered
                    ? "drop-shadow(0 2px 12px #b6d13a88)"
                    : "drop-shadow(0 2px 8px #0006)",
                  cursor: "pointer",
                  transition: "fill 0.2s, filter 0.2s",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />

              <text
                x={x + barWidth / 2}
                y={chartBottom + 24}
                textAnchor="middle"
                fill="#bdbdbd"
                fontSize="16"
                fontWeight="500"
                style={{ letterSpacing: 1 }}
              >
                {d.label}
              </text>
            </g>
          );
        })}

        {hovered !== null && (() => {
          const i = hovered;
          const d = data[i];
          const barHeight = (d.value / maxValue) * barHeightMax;
          const x = i * (barWidth + gap) + 10;
          const y = chartBottom - barHeight;

          return (
            <g>
              <foreignObject
                x={x - 16}
                y={y - 48}
                width="120"
                height="40"
                style={{ pointerEvents: "none" }}
              >
                <div
                  className="bg-white text-black text-[16px] font-bold rounded-md px-3 py-1 shadow-lg"
                  style={{
                    position: "relative",
                    width: "max-content",
                    minWidth: 90,
                  }}
                >
                  {d.tooltip}

                  <div
                    style={{
                      position: "absolute",
                      left: 32,
                      bottom: -10,
                      width: 0,
                      height: 0,
                      borderLeft: "8px solid transparent",
                      borderRight: "8px solid transparent",
                      borderTop: "10px solid #fff",
                    }}
                  />
                </div>
              </foreignObject>
            </g>
          );
        })()}
      </svg>
    </div>
  );
};

export default Chart;