import { FaUserAlt, FaThLarge, FaClock, FaVideo } from "react-icons/fa";
import '../App.css';
const cards = [
  {
    id: 1,
    icon: <FaUserAlt size={26} />,
    gradient: "card-gradient-purple",
    progressColor: "text-purple-400",
    topText: "Ready to assign",
    mainValue: "200 - 42",
    bottomText: "Bill in this week 221",
    progress: 42, // make progress also dynamic
  },
  {
    id: 2,
    icon: <FaThLarge size={26} />,
    gradient: "card-gradient-green",
    progressColor: "text-green-400",
    topText: "Tasks Completed",
    mainValue: "120 / 200",
    bottomText: "Remaining: 80",
    progress: 60,
  },
];

const Card = ({ icon, gradient, progressColor, topText, mainValue, bottomText, progress }) => {
  const circleLength = 126; // circumference of circle

  return (
    <div
      className={`relative rounded-xl sm:w-80 w-[240px] p-5 flex flex-col justify-between shadow-lg 
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

export default function InvoiceCards() {
  return (
    <div>
      <div className="flex flex-col  gap-6">
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
