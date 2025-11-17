import { useState } from "react";
import { RefreshCw } from "lucide-react";

export default function ReloadButton() {
  const [rotating, setRotating] = useState(false);

  const handleReload = () => {
    setRotating(true);

    // Simulate reload logic (replace with your API call, page reload, etc.)
    setTimeout(() => {
      setRotating(false);
      window.location.reload(); // reloads the page
    }, 800);
  };

  return (
    <button
      onClick={handleReload}
      className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors"
      title="Reload"
    >
      <RefreshCw
        size={14}
        className={`text-white transition-transform duration-500 ${
          rotating ? "animate-spin" : ""
        }`}
      />
    </button>
  );
}
