import type React from "react";

interface ThemeToggleProps {
  dark: boolean;
  setDark: (val: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ dark, setDark }) => (
  <button
    aria-label="Toggle dark mode"
    className="rounded-full border-2 border-current px-4 py-1 font-semibold focus:outline-none focus:ring-2 transition-colors duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
    onClick={() => setDark(!dark)}
  >
    {dark ? "Light Mode" : "Dark Mode"}
  </button>
);

export default ThemeToggle;
