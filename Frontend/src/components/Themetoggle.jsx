import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    // Read from localStorage on mount
    const stored = localStorage.getItem("trackmyspend-darkmode");
    return stored === null ? false : stored === "true";
  });

  // Sync HTML class and persist to localStorage
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("trackmyspend-darkmode", dark);
  }, [dark]);

  return (
    <label className="relative inline-flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        className="sr-only"
        checked={dark}
        onChange={() => setDark(!dark)}
      />

      {/* track */}
      <div
        className={`
          w-16 h-8 rounded-full transition-colors duration-300
          ${dark ? "bg-customDarkBlue border border-customLavendar" : "bg-[#61738d] border border-customLavendar"}
        `}
      />

      {/* thumb */}
      <div
        className={`
          absolute top-1 left-1 w-6 h-6 rounded-full shadow-lg
          transform transition-transform duration-300
          ${dark ? "translate-x-8 bg-customLavender" : "translate-x-0 bg-customNearWhite"}
        `}
      />
    </label>
  );
}
