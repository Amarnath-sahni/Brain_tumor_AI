import React, { useContext } from "react";
import { ThemeContext } from '../Context.jsx/ThemeProvider';
import { TiAdjustBrightness } from "react-icons/ti";

const DarkModeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="fixed top-[70px] right-5 z-50">
      <button
        onClick={toggleTheme}
        className={`flex items-center justify-center w-12 h-12 rounded-full shadow-lg
          transition-all duration-300
          ${darkMode ? "bg-yellow-400 hover:bg-yellow-300" : "bg-gray-900 hover:bg-gray-700"}
        `}
      >
        <TiAdjustBrightness
          className={`text-xl transition-colors duration-300 ${darkMode ? "text-black" : "text-white"}`}
        />
      </button>
    </div>
  );
};

export default DarkModeToggle;
