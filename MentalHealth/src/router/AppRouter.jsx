import React, { useContext } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import Navbar from "./Navbar";
import About from "../page/About";
import Journal from "../page/Journal";
import HomePage from "../page/HomePage";
import Login from "../page/Login";
import SignupPage from "../page/SignupPage";
import AddBlog from "../page/AddBlog";
import Day10 from "../page/Day10";
import MentalFrom from "../component/MetalForm";
import Help from "../component/Help";
import MentalHealthPage from "../component/SciencePage";
import Button from "../component/button/Button";
import Health from "../component/Health";

import { AuthContext } from "../Context.jsx/AuthProvider";

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ✅ Public Routes (only if NOT logged in) */}
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

        {/* ✅ Protected Routes (only if logged in) */}
        {user && (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/about" element={<About />} />
            <Route path="/add_dairy" element={<AddBlog />} />
            <Route path="/day10" element={<Day10 />} />
            <Route path="/assessment" element={<MentalFrom />} />
            <Route path="/help" element={<Help />} />
            <Route path="/science" element={<MentalHealthPage />} />
            <Route path="/button" element={<Button />} />
            <Route path="/health" element={<Health />} />

            {/* 🚫 Prevent logged-in user from going to login/signup */}
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/signup" element={<Navigate to="/" />} />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;