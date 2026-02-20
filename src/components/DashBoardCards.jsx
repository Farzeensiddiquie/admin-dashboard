import { useContext } from 'react';
import { FaUserAlt, FaThLarge, FaClock, FaVideo } from "react-icons/fa";
import { TaskContext } from '../context/BillContext';

const Card = ({ icon, gradient, progressColor, topText, mainValue, bottomText, progress }) => {
  const circleLength = 126; // circumference of circle

  return (
    <div
      className={`relative rounded-xl sm:w-auto w-[240px] p-5 flex flex-col justify-between shadow-lg 
      bg-gradient-to-br ${gradient} backdrop-blur-sm`}
    >
      {/* Top Row */}
      <div className="flex justify-between items-start">
        <div className="text-white opacity-90">{icon}</div>
        {/* Progress Circle */}
        <div className="relative w-12 h-12">
          <svg className="absolute top-0 left-0 w-12 h-12">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              className="text-gray-500 opacity-30"
              fill="transparent"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              className={progressColor}
              fill="transparent"
              strokeDasharray={circleLength}
              strokeDashoffset={circleLength - (circleLength * progress) / 100}
              strokeLinecap="round"
              transform="rotate(-90 24 24)"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
            +{progress}%
          </span>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-white">
        <p className="text-sm opacity-75">{topText}</p>
        <p className="text-xl font-bold">{mainValue}</p>
        <p className="text-sm opacity-75">{bottomText}</p>
      </div>
    </div>
  );
};

export default function DashboardCards() {
  const { getTaskStats, tasks } = useContext(TaskContext);
  const stats = getTaskStats();

  // Calculate progress percentages
  const readyToAssignProgress = tasks.length > 0 ? Math.round((stats.readyToAssign / tasks.length) * 100) : 0;
  const completedProgress = tasks.length > 0 ? Math.round((stats.completed / tasks.length) * 100) : 0;
  const hoursLoggedProgress = Math.min(Math.round((stats.totalHoursLogged / (tasks.length * 10)) * 100), 100);
  const meetingsProgress = stats.scheduled > 0 ? 100 : 0;

  const cards = [
    {
      id: 1,
      icon: <FaUserAlt size={26} />,
      gradient: "card-gradient-purple",
      progressColor: "text-purple-400",
      topText: "Ready to Assign",
      mainValue: stats.readyToAssign,
      bottomText: `Total: ${tasks.length} tasks`,
      progress: readyToAssignProgress,
    },
    {
      id: 2,
      icon: <FaThLarge size={26} />,
      gradient: "card-gradient-green",
      progressColor: "text-green-400",
      topText: "Tasks Completed",
      mainValue: `${stats.completed} / ${tasks.length}`,
      bottomText: `Remaining: ${tasks.length - stats.completed}`,
      progress: completedProgress,
    },
    {
      id: 3,
      icon: <FaClock size={26} />,
      gradient: "card-gradient-amber",
      progressColor: "text-amber-400",
      topText: "Hours Logged",
      mainValue: `${stats.totalHoursLogged}h`,
      bottomText: `Target: ${tasks.length * 10}h`,
      progress: hoursLoggedProgress,
    },
    {
      id: 4,
      icon: <FaVideo size={26} />,
      gradient: "card-gradient-cyan",
      progressColor: "text-yellow-300",
      topText: "Meetings Scheduled",
      mainValue: `${stats.scheduled} Scheduled`,
      bottomText: `Status: Active`,
      progress: meetingsProgress,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Card
            key={card.id}
            icon={card.icon}
            gradient={card.gradient}
            progressColor={card.progressColor}
            topText={card.topText}
            mainValue={card.mainValue}
            bottomText={card.bottomText}
            progress={card.progress}
          />
        ))}
      </div>
    </div>
  );
}
