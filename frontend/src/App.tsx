import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import WorkoutPlan from "./WorkoutPlan";
import Nutrition from "./Nutrition";
import Progress from "./Progress";
import Testimonials from "./Testimonials";
import Mentors from "./Mentors";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  // Dark/light mode state
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <Router>
      <div className="min-h-screen font-sans bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
        <Header dark={dark} setDark={setDark} />
        <main>
          <Routes>
            {/* Allow only / and /login routes */}
            <Route path="/" element={
              <>
                <WorkoutPlan />
                <Nutrition />
                <Progress />
                <Testimonials />
                <Mentors />
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Redirect any other route to the default "/" page */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
