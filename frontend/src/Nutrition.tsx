import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

const MEALS_KEY = "monochrome-gym-meals";
const defaultMeals = [
  { name: "Oatmeal & Berries", cals: 250 },
  { name: "Chicken Avocado Wrap", cals: 400 },
];

export default function Nutrition() {
  const [meals, setMeals] = useState(defaultMeals);
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(MEALS_KEY);
    if (stored) setMeals(JSON.parse(stored));
  }, []);
  useEffect(() => {
    localStorage.setItem(MEALS_KEY, JSON.stringify(meals));
  }, [meals]);

  function addMeal(e: React.FormEvent) {
    e.preventDefault();
    if (!mealName.trim() || !calories.trim() || Number(calories) <= 0) return;
    setMeals((prev) => [...prev, { name: mealName.trim(), cals: Number(calories) }]);
    setMealName("");
    setCalories("");
    nameRef.current?.focus();
  }
  function deleteMeal(idx: number) {
    setMeals(prev => prev.filter((_, i) => i !== idx));
  }

  const segmentColors = ["#222", "#555", "#aaa", "#eee", "#999", "#444", "#ccc"];
  const doughnutData = {
    labels: meals.map((m) => m.name),
    datasets: [
      {
        data: meals.map((m) => m.cals),
        backgroundColor: segmentColors.slice(0, meals.length),
        borderWidth: 2,
        borderColor: "#fff",
        hoverOffset: 8,
      },
    ],
  };
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: { color: "#fff", font: { weight: "bold" } },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#222",
        titleColor: "#fff",
        bodyColor: "#fff",
        callbacks: {
          label: (ctx: any) => {
            const total = ctx.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percent = `${((ctx.raw / total) * 100).toFixed(1)}%`;
            return `${ctx.label}: ${ctx.raw} kcal (${percent})`;
          },
        },
      },
    },
    cutout: "70%",
  };

  return (
    <section id="nutrition" className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center tracking-tight text-white">Nutrition Guidance</h2>
      <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-[#101014] rounded-2xl shadow-lg p-6 border border-neutral-300 dark:border-neutral-800">
        {/* Chart */}
        <div className="flex-1 flex flex-col items-center justify-center min-w-[220px] pb-8 md:pb-0 md:pr-6">
          <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Calorie Share</h3>
          {meals.length > 0 ? (
            <div className="p-4 bg-neutral-100 dark:bg-[#17181c] rounded-xl w-full flex justify-center shadow dark:shadow-white/[0.05]">
              <Doughnut data={doughnutData} options={doughnutOptions as any} />
            </div>
          ) : (
            <div className="text-neutral-400 italic mt-8">No data</div>
          )}
        </div>
        {/* Meal Logger + List */}
        <div className="flex-1 min-w-[260px] flex flex-col gap-2">
          <h3 className="text-xl font-bold mb-4 text-black dark:text-white">Log Your Meal</h3>
          <form onSubmit={addMeal} className="flex flex-col gap-3 mb-6">
            <input
              ref={nameRef}
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              className="bg-neutral-100 dark:bg-[#17181c] border border-neutral-300 dark:border-neutral-700 rounded px-3 py-2 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-600 dark:focus:ring-white text-base transition-shadow shadow dark:shadow-white/[0.03]"
              placeholder="Meal Name"
            />
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="bg-neutral-100 dark:bg-[#17181c] border border-neutral-300 dark:border-neutral-700 rounded px-3 py-2 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-600 dark:focus:ring-white text-base transition-shadow shadow dark:shadow-white/[0.03]"
              placeholder="Calories (kcal)"
              min={1}
            />
            <button
              type="submit"
              className="w-full border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black rounded-xl py-2 px-6 font-semibold text-base transition hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white"
            >
              Add Meal
            </button>
          </form>
          <div className="max-h-52 overflow-y-auto custom-scroll bg-white dark:bg-[#15161a] rounded-md p-2 border border-neutral-200 dark:border-neutral-800 shadow-sm dark:shadow-white/[0.04]">
            {meals.length === 0 && (
              <p className="text-neutral-400 py-2 text-center">No meals logged yet.</p>
            )}
            <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {meals.map((meal, i) => (
                <li key={meal.name + i} className="flex justify-between items-center py-2 text-sm md:text-base text-black dark:text-neutral-50">
                  <span>
                    <span className="font-semibold">{meal.name}</span>
                    <span className="mx-1 text-neutral-400">|</span>
                    <span className="">{meal.cals} kcal</span>
                  </span>
                  <button
                    title="Remove meal"
                    className="ml-4 px-2 py-1 rounded border border-transparent hover:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-[#181a20] transition"
                    onClick={() => deleteMeal(i)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-black dark:text-white"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
