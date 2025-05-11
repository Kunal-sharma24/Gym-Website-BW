import React from "react";
import ThemeToggle from "./ThemeToggle";
import Login from "./Login";

export default function Header({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  return (
    <header className="w-full bg-white dark:bg-black transition-colors duration-500">
      {/* Top bar */}
      <div className="flex justify-between items-center px-6 pt-6 pb-2 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-black dark:text-white">Fit Me</h1>
        <div className="flex items-center gap-6">
          <nav>
            <ul className="flex gap-6 text-lg font-medium">
              {[
                "Workout Plan",
                "Nutrition",
                "Progress",
                "Testimonials",
                "Mentors",
              ].map((item) => {
                const id = item.toLowerCase().replace(/\s+/g, "");
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="transition-colors duration-300 text-black dark:text-white hover:underline"
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <ThemeToggle dark={dark} setDark={setDark} />
          {/* Auth Buttons */}
          <div className="flex gap-4">
            <a href="/login" className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition">
              Login
            </a>
            <a href="/signup" className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-blue-700 transition">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
