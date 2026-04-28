import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaBook, FaInfoCircle, FaPlus } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { AuthContext } from "../Context.jsx/AuthProvider";
import { ThemeContext } from "../Context.jsx/ThemeProvider";
import { TiAdjustBrightness } from "react-icons/ti";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const pages = [
    { name: "Home", icon: <HiHome />, link: "/" },
    { name: "Journal", icon: <FaBook />, link: "/journal" },
    { name: "About", icon: <FaInfoCircle />, link: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-4 backdrop-blur-xl shadow-lg transition-colors duration-500 ${
        darkMode
          ? "bg-black/50 text-gray-200"
          : "bg-white/20 text-gray-800"
      }`}
    >
      {/* Left Links */}
      <div className="flex space-x-4">
        {pages.map((page, index) => (
          <NavLink
            key={index}
            to={page.link}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 font-medium ${
                isActive
                  ? "bg-cyan-400/40 text-white shadow-md"
                  : "hover:bg-cyan-300/20"
              }`
            }
          >
            {page.icon} {page.name}
          </NavLink>
        ))}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`flex items-center justify-center w-10 h-10 rounded-full shadow-md transition-all duration-300 ${
            darkMode
              ? "bg-cyan-400/40 hover:bg-cyan-400/60 text-white"
              : "bg-cyan-200/40 hover:bg-cyan-300/60 text-gray-800"
          }`}
          title="Toggle Theme"
        >
          <TiAdjustBrightness className="text-xl" />
        </button>

        {/* Auth Buttons */}
        {user ? (
          <>
            <button
              onClick={logout}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-red-400/50 hover:bg-red-500/60 text-white shadow-md transition-all duration-300"
              title="Logout"
            >
              <BiLogOut className="text-lg" />
            </button>

            <NavLink
              to="/add_dairy"
              className={({ isActive }) =>
                `flex items-center justify-center w-10 h-10 rounded-full shadow-md transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-400/40 text-white hover:bg-cyan-500/50"
                    : "bg-white/20 text-gray-800 hover:bg-cyan-200/30"
                }`
              }
              title="Add Journal"
            >
              <FaPlus />
            </NavLink>
          </>
        ) : (
          <NavLink
            to="/login"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-400/40 hover:bg-cyan-500/50 text-white font-medium shadow-md transition-all duration-300"
          >
            <BiLogIn /> Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
