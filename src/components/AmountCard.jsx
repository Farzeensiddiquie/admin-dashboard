import React from "react";
import "../App.css";

const AmountCard = ({
  TradesDone =90,
  TradesLeft= 45,
  label = "Your Trading Performance",
}) => {
  // Gauge settings
  const totalTrades = TradesDone + TradesLeft;
  const percent = totalTrades > 0 ? Math.round((TradesDone / totalTrades) * 100) : 0;
  const radius = 65;
  const centerX = 80;
  const centerY = 110;
  const arcStartX = centerX - radius;
  const arcStartY = centerY;
  const arcEndX = centerX + radius;
  const arcEndY = centerY;
  const circumference = Math.PI * radius;
  const progress = (percent / 100) * circumference;

  // Needle
  const angle = Math.PI * (1 - percent / 100);
  const needleStartLength = radius - 18;
  const needleEndLength = radius + 19;
  const needleStartX = centerX + needleStartLength * Math.cos(angle);
  const needleStartY = centerY - needleStartLength * Math.sin(angle);
  const needleEndX = centerX + needleEndLength * Math.cos(angle);
  const needleEndY = centerY - needleEndLength * Math.sin(angle);

  return (
    <div
      className="card-gradient-cyan rounded-2xl mb-5 sm:mb-0 sm:w-[320px] w-[240px] h-[335px] shadow-lg p-5 relative overflow-hidden flex flex-col justify-start"
    >
      {/* Dots menu */}
      <div className="absolute top-4 right-4">
        <svg width="24" height="24">
          <circle cx="5" cy="6" r="2" fill="#fff8" />
          <circle cx="12" cy="6" r="2" fill="#fff8" />
          <circle cx="19" cy="6" r="2" fill="#fff8" />
        </svg>
      </div>
      {/* Gauge */}
      <div className="w-full h-[110px] overflow-hidden -mt-10 mb-2.5 flex justify-center">
        <svg width="160" height="140">
          {/* Track */}
          <path
            d={`M${arcStartX},${arcStartY} A${radius},${radius} 0 0,1 ${arcEndX},${arcEndY}`}
            fill="none"
            stroke="#B9B921"
            strokeWidth="30"
          />
          {/* Progress */}
          <path
            d={`M${arcStartX},${arcStartY} A${radius},${radius} 0 0,1 ${arcEndX},${arcEndY}`}
            fill="none"
            stroke="#9CCA3F"
            strokeWidth="30"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{ transition: "stroke-dashoffset 0.6s" }}
          />
          {/* Needle */}
          <line
            x1={needleStartX}
            y1={needleStartY}
            x2={needleEndX}
            y2={needleEndY}
            stroke="#fff"
            strokeWidth="2"
          />
          {/* Percentage */}
          <text
            x={centerX}
            y={centerY - 5}
            textAnchor="middle"
            fill="#fff"
            fontSize="30"
            fontWeight="bold"
            style={{ textShadow: "0 2px 8px #000a" }}
          >
            {percent}%
          </text>
        </svg>
      </div>
      {/* Card Content */}
      <div
        className="border border-white/20 rounded-xl mt-0 px-3 py-6 text-center relative min-h-[120px] bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center"
      >
        {/* Shuffle Icon */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          className="mx-auto mb-2 block"
        >
          <path
            d="M4 9V4h5M20 15v5h-5M15 4h5v5M4 15v5h5"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          />
        </svg>
        <div className="text-[#A1A1A1] font-semibold text-[17px] opacity-80 mb-2 mt-1">
          {label}
        </div>
        <div className="text-white flex font-extrabold text-[0.9rem] gap-1 tracking-wide mb-1">
          <p className="text-[#A1A1A1]">Trades Performed:</p> {TradesDone}
        </div>
        <div className="text-white font-semibold text-[16px] opacity-80 flex gap-1 items-center">
       <p className="text-xs text-[#A1A1A1]">Trades Left in This Month :</p>{TradesLeft}
        </div>
      </div>
    </div>
  );
};

export default AmountCard;