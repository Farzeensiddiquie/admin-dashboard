import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dropdown() {
  const [selected, setSelected] = useState("Financial");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const options = ["Financial", "Transactions", "Invoices", "Payroll"];

  // Route mapping for navbar options
  const routeMap = {
    "Financial": "/",
    "Transactions": "/tasks",
    "Invoices": "/tasks",
    "Payroll": "/tasks",
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionSelect = (opt) => {
    setSelected(opt);
    setOpen(false);
    // Navigate based on selected option
    const route = routeMap[opt];
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 cursor-pointer text-[#FFFFFF]/70 text-sm"
      >
        {selected}
        <span className="text-xs transition-transform duration-200">
          {open ? "▴" : "▾"}
        </span>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute mt-2 w-44 bg-white/10 backdrop-blur-md border border-gray-500/20 rounded-md shadow-lg z-50 transform transition-all duration-200 origin-top ${
          open
            ? "opacity-100 scale-100 visible"
            : "opacity-0 scale-95 invisible"
        }`}
      >
        {options.map((opt) => (
          <button
            id={opt.toLowerCase().replace(/\s+/g, "-")}
            key={opt}
            onClick={() => handleOptionSelect(opt)}
            className="block w-full text-left rounded-sm px-4 py-2 hover:bg-gray-400/10 text-white text-sm transition-colors"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
