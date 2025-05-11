import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
);

const defaultPlan = {
  Monday: { workout: "Chest & Triceps", exercises: "Bench Press, Dips" },
  Tuesday: { workout: "Back & Biceps", exercises: "Pull Ups, Deadlifts" },
  Wednesday: { workout: "Legs", exercises: "Squats, Lunges" },
  Thursday: { workout: "Shoulders", exercises: "Military Press, Lateral Raises" },
  Friday: { workout: "Core", exercises: "Planks, Russian Twists" },
  Saturday: { workout: "Cardio/HIIT", exercises: "Sprints, Jump Rope" },
  Sunday: { workout: "Rest", exercises: "-" },
};

const PLAN_KEY = "monochrome-gym-weekly-plan";
const TODO_KEY = "monochrome-gym-workout-todo";

const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const getToday = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[new Date().getDay()];
};

const WeeklyWorkoutPlan = () => {
  const [plan, setPlan] = useState(defaultPlan);
  const [editMode, setEditMode] = useState(false);
  const [today] = useState(getToday());
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // Load/persist
  useEffect(() => {
    const stored = localStorage.getItem(PLAN_KEY);
    if (stored) setPlan(JSON.parse(stored));
    const todo = localStorage.getItem(TODO_KEY);
    if (todo) setChecked(JSON.parse(todo));
  }, []);
  useEffect(() => {
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan]);
  useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(checked));
  }, [checked]);

  const handleChange = (day: string, field: string, value: string) => {
    setPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const toggleCheck = (exercise: string) => {
    setChecked((prev) => ({ ...prev, [exercise]: !prev[exercise] }));
  };

  const todayExercises = plan[today]?.exercises
    ? plan[today].exercises.split(",").map((e: string) => e.trim()).filter(Boolean)
    : [];

  // CHART.JS DATA for Progress Tracker (number of exercises entered per day)
  const exercisesPerDay = daysOrder.map(
    (day) => plan[day].exercises.split(",").filter((e: string) => e.trim() && e.trim() !== "-").length
  );
  const useDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const lineData = {
    labels: daysOrder,
    datasets: [
      {
        label: "Exercises",
        data: exercisesPerDay,
        backgroundColor: useDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.11)",
        borderColor: useDark ? "#fff" : "#181818",
        pointBackgroundColor: useDark ? "#fff" : "#181818",
        pointBorderColor: useDark ? "#fff" : "#181818",
        fill: true,
        tension: 0.45,
        pointRadius: 6,
      },
    ],
  };
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: useDark ? "#181a20" : "#fff",
        titleColor: useDark ? "#fff" : "#000",
        bodyColor: useDark ? "#fff" : "#181818",
      },
    },
    scales: {
      x: {
        title: { display: false },
        ticks: { color: useDark ? "#eaeaea" : "#222", font: { size: 14 } },
        grid: { color: useDark ? "#353535" : "#eee" },
      },
      y: {
        title: { display: false },
        beginAtZero: true,
        ticks: { color: useDark ? "#eaeaea" : "#222", stepSize: 1, precision: 0, font: { size: 14 } },
        grid: { color: useDark ? "#353535" : "#eee" },
      },
    },
  };

  return (
    <section id="workout" className="text-black dark:text-white bg-white dark:bg-black p-6 rounded-lg shadow-md mt-6 border border-neutral-200 dark:border-neutral-800 transition-colors duration-500">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Weekly Workout Plan</h2>
        <button
          onClick={() => setEditMode((prev) => !prev)}
          className="border border-black dark:border-white font-semibold px-4 py-1 rounded hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          {editMode ? "Save" : "Edit"}
        </button>
      </div>

      {/* Grid view */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-4 min-w-[950px]">
          {daysOrder.map((day) => (
            <div
              key={day}
              className="bg-gradient-to-b from-black via-neutral-900 to-neutral-200 dark:from-white dark:via-neutral-300 dark:to-neutral-900 border border-neutral-700 rounded-xl p-2 md:p-3 shadow transition-colors min-h-[210px] flex flex-col"
            >
              <h3 className="font-bold text-base md:text-lg mb-2 tracking-wide text-white dark:text-black text-center">
                {day}
              </h3>
              <div className="bg-white text-black dark:bg-neutral-900 dark:text-white rounded-lg p-2 md:p-3 flex-1 shadow-inner min-h-[110px] flex flex-col justify-between">
                {editMode ? (
                  <>
                    <input
                      value={plan[day].workout}
                      onChange={e => handleChange(day, "workout", e.target.value)}
                      className="w-full px-2 py-1 mb-2 text-sm md:text-base rounded bg-neutral-100 dark:bg-[#23232b] border border-neutral-400 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                    <textarea
                      value={plan[day].exercises}
                      onChange={e => handleChange(day, "exercises", e.target.value)}
                      className="w-full px-2 py-1 text-sm md:text-base rounded bg-neutral-100 dark:bg-[#23232b] border border-neutral-400 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                      rows={3}
                    />
                  </>
                ) : (
                  <>
                    <p className="mb-1 leading-relaxed"><span className="font-semibold text-xs md:text-sm">Workout:</span> <span className="text-base md:text-lg">{plan[day].workout}</span></p>
                    <p className="mb-1"><span className="font-semibold text-xs md:text-sm">Exercises:</span></p>
                    <ul className="space-y-1 ml-1">
                      {plan[day].exercises.split(",").map(
                        (e, i) =>
                          e.trim() ? (
                            <li key={i} className="text-base md:text-lg leading-snug">• {e.trim()}</li>
                          ) : null
                      )}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart.js Progress Line Chart */}
      <div className="mt-8 md:col-span-2 bg-white dark:bg-[#101014] rounded-xl shadow border border-neutral-300 dark:border-neutral-800 px-4 py-6">
        <h3 className="text-2xl font-semibold mb-3">Progress Tracker</h3>
        <div className="w-full max-w-xl mx-auto bg-neutral-100 dark:bg-[#181920] rounded-lg p-3 shadow-inner dark:shadow-white/[0.03]">
          <Line data={lineData} options={lineOptions as any} />
        </div>
      </div>

      {/* Today's Workout (Saturday) - minimal, premium */}
      <div className="mt-8 bg-white dark:bg-[#111215] p-4 rounded-xl shadow-md border border-neutral-700 dark:border-neutral-800">
        <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Today's Workout: {today}</h3>
        {today === "Saturday" ? (
          <div className="flex flex-col gap-2 items-start bg-white dark:bg-[#181920] rounded-lg px-6 py-5 border-l-4 border-black dark:border-white max-w-md mx-auto shadow-inner dark:shadow-white/[0.04]">
            <div className="font-semibold text-lg mb-1 text-black dark:text-white">{plan[today].workout}</div>
            {plan[today].exercises && plan[today].exercises !== "-" ? (
              <ul className="flex flex-wrap gap-2 mt-2">
                {plan[today].exercises.split(",").map((exercise, i) => (
                  <li
                    key={exercise + i}
                    className="px-3 py-1 rounded-full bg-neutral-200 dark:bg-[#23232b] text-black dark:text-white font-medium text-sm shadow-sm border border-neutral-300 dark:border-neutral-700"
                  >
                    {exercise.trim()}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="italic text-neutral-400">No exercises planned.</div>
            )}
          </div>
        ) : (
          // Checklist/all other days
          todayExercises.length > 0 ? (
            <ul className="space-y-2">
              {todayExercises.map((exercise, index) => (
                <li key={exercise} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={!!checked[exercise]}
                    onChange={() => toggleCheck(exercise)}
                    className="mr-2 accent-black dark:accent-white"
                  />
                  <span className={checked[exercise] ? "line-through text-neutral-400 dark:text-neutral-600" : "text-base md:text-lg text-black dark:text-white"}>
                    {exercise}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-neutral-400 dark:text-neutral-700">No exercises planned.</p>
          )
        )}
      </div>
    </section>
  );
};

export default WeeklyWorkoutPlan;
